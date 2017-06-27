'use strict';
const errors = require('./jsonrpcErrors');

module.exports = class JsonRpc {
    constructor({version = '2.0', encoding = 'utf8', nullId = false, fractionalId = false}) {
        this.version = version;
        this.encoding = encoding;
        this.nullId = nullId;
        this.fractionalId = fractionalId;
    }

    getId(context) {
        if (Number.isSafeInteger(context.trace + 1)) {
            return ++context.trace;
        } else {
            context.trace = 0;
            return 0;
        }
    }

    parseJson(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            throw errors.invalidJson(e);
        }
    }

    decode(msg, $meta, context) {
        const packet = msg.toString(this.encoding);
        const json = this.parseJson(packet);

        if (json.jsonrpc !== this.version) {
            throw errors.invalidVersion(`Expected version ${this.version} but received ${json.jsonrpc}`);
        } else if (!this.nullId && json.id === null) {
            throw errors.invalidMessageID('Received null id value. nullId option is set to false');
        } else if (!['string', 'number', 'undefined'].includes(typeof json.id)) {
            throw errors.invalidMessageID('Received Invalid id type');
        } else if (!this.fractionalId && typeof json.id === 'number' && json.id % 1 > 0) {
            throw errors.invalidMessageID('Received fractional number as id. fractionalId option is set to false');
        } else if (json.id === '') {
            throw errors.invalidMessageID('Received empty id');
        } else if (json.id === undefined && typeof json.params !== 'object') {
            throw errors.invalidPayload('Received notification with missing or invalid payload member');
        } else if (typeof json.params !== 'object' && typeof json.result !== 'object' && typeof json.error !== 'object') {
            throw errors.invalidPayload('Received invalid payload');
        } else if (['params', 'result', 'error'].filter(key => !!json[key]).length > 1) {
            throw errors.invalidPayload('Received more than one payload member');
        }

        const payloadMember = ['params', 'result', 'error'].find(key => key in json);
        $meta.trace = json.id;
        $meta.mtid = {
            error: 'error',
            result: 'response',
            params: 'request',
            notification: 'notification'
        }[json.id ? payloadMember : 'notification'];
        if ($meta.mtid === 'request') {
            if (json.method !== 'string' || json.method === '') {
                throw errors.invalidMethod('Received invalid method type or empty');
            }
            $meta.method = $meta.opcode = json.method;
        }
        return json[payloadMember];
    }

    encode(msg = {}, $meta, context) {
        if (($meta.mtid === 'error' || $meta.mtid === 'response') && !$meta.trace) {
            throw errors.invalidMessageID('Cannot send response without trace');
        } else if (!$meta.opcode) {
            throw errors.invalidMethod('Missing opcode');
        }
        const json = {
            jsonrpc: this.version,
            method: $meta.opcode
        };
        switch ($meta.mtid) {
            case 'request':
                $meta.trace = this.getId(context);
                json.id = $meta.trace;
                json.params = msg;
                break;
            case 'notification':
                json.params = msg;
                break;
            case 'response':
                json.id = $meta.trace;
                json.result = msg;
                break;
            case 'error':
                json.id = $meta.trace;
                json.error = msg;
                break;
        }
        return new Buffer(JSON.stringify(json), this.encoding);
    }
};
