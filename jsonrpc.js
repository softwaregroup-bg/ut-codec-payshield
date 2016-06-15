'use strict';

var maxInteger = isFinite(Number.MAX_SAFE_INTEGER) ? Number.MAX_SAFE_INTEGER : 2147483647;
var omit = require('lodash.omit');

function JsonRpc(config, validator, logger) {
    this._config = config;
    this.val = validator;
    this.log = logger;
}

JsonRpc.prototype.decode = function(buffer, $meta, context) {
    // TODO: There must be options in config to define encoding, now use UTF-8.
    var data = buffer.toString('utf8');

    // TODO: Use ut-error to return better error that "SyntaxError" here.
    data = JSON.parse(data);

    if ($meta.mtid === 'request') {
        return decodeRequest(this, data, $meta, context);
    }
    if ($meta.mtid === 'response') {
        return decodeResponse(this, data, $meta, context);
    }
    if ($meta.mtid == null) {
        return decodeGuess(this, data, $meta, context);
    }
    $meta.mtid = 'discard';
    return data;
};

JsonRpc.prototype.encode = function(message, $meta, context) {
    if ($meta.mtid === 'request') {
        message = encodeRequest(this, message, $meta, context);
    } else if ($meta.mtid === 'response') {
        message = encodeResponse(this, message, $meta, context);
    } else if ($meta.mtid === 'error') {
        message = encodeError(this, message, $meta, context);
    } else if ($meta.mtid === 'notification') {
        message = encodeNotification(this, message, $meta, context);
    } else {
        $meta.mtid = 'discard';
        return message;
    }
    var data = JSON.stringify(message);
    return new Buffer(data, 'utf8');
};

function decodeRequest(codec, data, $meta, context) {
    // A request received from remote side is encoded and must be decoded, but BUS is buggy right now.
    // TODO: This check should apply when config.version is '2.0' or more with more version-based checking.
    if (data.jsonrpc !== '2.0') {
        throw new Error('Invalid JSON-RPC request: unsupported version');
    }
    if (data.method == null) {
        throw new Error('Invalid JSON-RPC request: missing method');
    }
    $meta.opcode = data.method;
    if (data.id == null) {
        $meta.mtid = 'notification';
    } else {
        var traceType = typeof data.id;
        if (traceType === 'number' || traceType === 'string') {
            $meta.mtid = 'request';
            $meta.trace = data.id;
        } else {
            throw new Error('Invalid JSON-RPC request: invalid request id');
        }
    }
    if (data.params == null) {
        data.params = {};
    } else if (typeof data.params !== 'object') {
        throw new Error('Invalid JSON-RPC request: invalid parameters');
    }
    return data.params;
}

function decodeResponse(codec, data, $meta, context) {
    // TODO: This check should apply when config.version is '2.0' or more with more version-based checking.
    if (data.jsonrpc !== '2.0') {
        throw new Error('Invalid JSON-RPC version');
    }
    if (data.id == null) {
        throw new Error('Invalid JSON-RPC response');
    }
    $meta.trace = data.id;
    if (data.hasOwnProperty('result')) {
        if (data.hasOwnProperty('error')) {
            throw new Error('Invalid JSON-RPC response');
        }
        return data.result;
    }
    if (!data.hasOwnProperty('error')) {
        throw new Error('Invalid JSON-RPC response');
    }
    $meta.mtid = 'error';
    return validateError(data.error);
}

function encodeRequest(codec, data, $meta, context) {
    if (data == null || typeof data !== 'object') {
        throw new Error('Invalid JSON-RPC request');
    }
    if (typeof $meta.opcode !== 'string') {
        throw new Error('Invalid JSON-RPC request');
    }
    return {
        jsonrpc: '2.0', // TODO: Add this if and only if config.version specify it with value '2.0' or greater.
        method: $meta.opcode,
        params: data,
        id: $meta.trace = nextTrace(context)
    };
}

function encodeResponse(codec, data, $meta, context) {
    if (data instanceof Error) {
        return encodeError(codec, data, $meta, context);
    }
    if (data === undefined) {
        data = null;
    }
    if ($meta.trace == null) {
        throw new Error('Invalid JSON-RPC response: no trace to request found.');
    }
    return {
        jsonrpc: '2.0', // TODO: Add this if and only if config.version specify it with value '2.0' or greater.
        id: $meta.trace,
        result: data
    };
}

function encodeError(codec, data, $meta, context) {
    if (data instanceof Error) {
        data = errToResponse(data);
    }
    data = validateError(data);
    var trace = null;
    var traceType = typeof $meta.trace;
    if (traceType === 'number' || traceType === 'string') {
        trace = $meta.trace;
    }
    return {
        jsonrpc: '2.0', // TODO: Add this if and only if config.version specify it with value '2.0' or greater.
        id: trace,
        error: data
    };
}

function encodeNotification(codec, data, $meta, context) {
    if (data == null || typeof data !== 'object') {
        throw new Error('Invalid JSON-RPC request');
    }
    if (typeof $meta.opcode !== 'string') {
        throw new Error('Invalid JSON-RPC request');
    }
    return {
        jsonrpc: '2.0', // TODO: Add this if and only if config.version specify it with value '2.0' or greater.
        method: $meta.opcode,
        params: data,
        id: null
    };
}

function decodeGuess(codec, data, $meta, context) {
    // We have some data and empty $meta.
    if (data.jsonrpc !== '2.0') {
        throw new Error('Invalid JSON-RPC request: unsupported version');
    }
    if (data.id == null) {
        if (data.hasOwnProperty('error') && data.hasOwnProperty('result')) {
            throw new Error('Invalid JSON-RPC: It looks like request and notification in one');
        }
        $meta.mtid = 'notification';
        if (typeof data.method !== 'string') {
            throw new Error('Invalid JSON-RPC request: invalid method');
        }
        $meta.opcode = data.method;
        if (data.params == null) {
            return {};
        }
        if (typeof data.params !== 'object') {
            throw new Error('Invalid JSON-RPC request: invalid parameters');
        }
        return data.params;
    }
    var traceType = typeof data.id;
    if (traceType === 'number' || traceType === 'string') {
        $meta.trace = data.id;
    } else {
        throw new Error('Invalid JSON-RPC request: invalid request id');
    }
    if (data.hasOwnProperty('method')) {
        if (data.hasOwnProperty('error') || data.hasOwnProperty('result')) {
            throw new Error('Invalid JSON-RPC: It looks like request and response in one');
        }
        if (typeof data.method !== 'string') {
            throw new Error('Invalid JSON-RPC request: invalid method');
        }
        if (data.params == null) {
            return {};
        }
        if (typeof data.params !== 'object') {
            throw new Error('Invalid JSON-RPC request: invalid parameters');
        }
        $meta.mtid = 'request';
        $meta.opcode = data.method;
        return data.params;
    }
    if (data.hasOwnProperty('error')) {
        if (data.hasOwnProperty('result')) {
            throw new Error('Invalid JSON-RPC: It looks like request and response in one');
        }
        var err = validateError(data.error);
        $meta.mtid = 'error';
        return err;
    }
    if (data.hasOwnProperty('result')) {
        $meta.mtid = 'response';
        return data.result;
    }
    throw new Error('Invalid JSON-RPC: data is not request, response or notification');
}

function errToResponse(err) {
    var res = {};
    res.message = err.message;
    if (err.hasOwnProperty('code')) {
        res.code = err.code;
    }
    res.data = omit(err, ['message', 'code']); // All enumerable own properties are here, this exclude stack trace.
}

function nextTrace(context) {
    if (!context.trace) {
        context.trace = 2;
        return 1;
    }
    var trace = context.trace;
    if (trace === maxInteger) {
        context.trace = 1;
    } else {
        context.trace = trace + 1;
    }
    return trace;
}

function validateError(err) {
    if (typeof err !== 'object') {
        return new Error('Invalid JSON-RPC error response: invalid error object');
    }
    if (typeof err.message !== 'string') {
        throw new Error('Invalid JSON-RPC error response: invalid error message');
    }
    // Note: see http://www.jsonrpc.org/specification section 5.1. Error object
    // Quote:
    // - code
    // - A Number that indicates the error type that occurred.
    // - This MUST be an integer.
    // RFC2119: 1. MUST   This word, or the terms "REQUIRED" or "SHALL", mean that the definition is an absolute requirement of the specification.
    if (!isFinite(err.code)) {
        err.code = -1; // TODO: Probably there is better work-around (it SHOULD throw error usually).
    } else {
        err.code = parseInt(err.code); // Convert floating-point to integer.
    }
    return err;
}

module.exports = JsonRpc;
