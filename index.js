const bitsyntax = require('ut-bitsyntax');
const merge = require('lodash.merge');
const defaultFormat = require('./messages');
const defaultMaskSymbol = '*'.charCodeAt(0).toString(16);
const nonCorrectableFields = require('./constants.json').nonCorrectableFields;
const processResponse = require('./processResponse');

function maskLogRecord(buffer, data, {pattern, maskedKeys, maskSymbol}) {
    return maskedKeys
        .filter((key) => (pattern.find((element) => (element.name === key))))
        .map((k) => {
            const patternElement = pattern.find((v) => (k === v.name));
            switch (patternElement.type) {
                case 'string':
                    if (patternElement.binhex) {
                        return (data[k] && {key: k, value: data[k], replaceValue: maskSymbol.repeat(data[k].length * 2)}) || false;
                    } else if (patternElement.hexbin) {
                        return (data[k] && {key: k, value: Buffer.from(Buffer.from(data[k]).toString('hex')).toString('hex'), replaceValue: maskSymbol.repeat(data[k].length * 2)}) || false;
                    } else if (patternElement.binary) {
                        return false;
                    } else if (patternElement.z) {
                        return false;
                    } else {
                        return (data[k] && {key: k, value: Buffer.from(data[k]).toString('hex'), replaceValue: maskSymbol.repeat(data[k].length)}) || false;
                    }
                default:
                    return false;
            }
        })
        .filter(f => f)
        .reduce((buf, maskThis) => (
            buf.split(maskThis.value).join(maskThis.replaceValue)
        ),
        buffer.toString('hex'))
        .toUpperCase();
}

function upperCaseObject(data, nonCorrectableFields) {
    return Object.keys(data).reduce((acc, curr) => {
        const param = (!nonCorrectableFields[curr] && typeof data[curr] === 'string' && data[curr].toUpperCase()) || data[curr];
        return Object.assign(acc, {[curr]: param});
    }
    , {});
}

function getLmkIdentifierParam(data) {
    const {lmkIdentifier} = data;
    const params = (lmkIdentifier === '' || isNaN(lmkIdentifier)) ? {
        delimiterLmk: '',
        lmkIdentifier: ''
    } : {
        delimiterLmk: '%',
        lmkIdentifier: `00${lmkIdentifier}`.slice(-2)
    };
    return {...data, ...params};
}
function PayshieldCodec(config) {
    this.commands = {};
    this.headerPattern = null;
    this.commandNames = {};
    this.errors = require('./errors')(config);
    this.maskedKeys = null;
    this.nonCorrectableFields = Object.assign({}, nonCorrectableFields, config.nonCorrectableFields);
    this.init(config);
}

PayshieldCodec.prototype.init = function(config) {
    this.headerPattern = bitsyntax.parse('headerNo:' + config.headerFormat + ', code:2/string, body/binary');
    this.headerMatcher = bitsyntax.matcher('headerNo:' + config.headerFormat + ', code:2/string, body/binary');
    this.errorMatcher = bitsyntax.matcher('errorCode:2/string, rest/binary');
    this.maskedKeys = config.maskedKeys || [];

    const commandsObj = merge({}, defaultFormat, config.messageFormat);

    if (this.headerPattern === false) {
        throw this.errors['payshield.parser.header']({});
    }

    this.headerNoSize = this.headerPattern.filter(function(value) {
        return value.name === 'headerNo';
    }).pop().size;
    this.maxTrace = parseInt('9'.repeat(this.headerNoSize));

    for (const property in commandsObj) {
        if (Object.prototype.hasOwnProperty.call(commandsObj, property)) {
            if (commandsObj[property].requestPattern) {
                const requestPattern = bitsyntax.parse(commandsObj[property].requestPattern);
                if (!requestPattern) {
                    throw this.errors['payshield.parser.request']({params: {command: property}});
                }
                this.commands[property + ':request'] = {
                    pattern: requestPattern,
                    matcher: bitsyntax.matcher(commandsObj[property].requestPattern),
                    code: commandsObj[property].requestCode,
                    warnings: commandsObj[property].warnings,
                    method: property,
                    mtid: 'request'
                };
                this.commandNames[commandsObj[property].requestCode] = property + ':request';
            }

            if (commandsObj[property].responsePattern) {
                const responsePattern = bitsyntax.parse(commandsObj[property].responsePattern);
                if (!responsePattern) {
                    throw this.errors['payshield.parser.parserResponse']({params: {command: property}});
                }
                this.commands[property + ':response'] = {
                    pattern: responsePattern,
                    matcher: bitsyntax.matcher(commandsObj[property].responsePattern),
                    errorMatcher: commandsObj[property].errorPattern && bitsyntax.matcher(commandsObj[property].errorPattern),
                    code: commandsObj[property].responseCode,
                    warnings: commandsObj[property].warnings,
                    method: property,
                    mtid: 'response'
                };
                this.commandNames[commandsObj[property].responseCode] = property + ':response';
            }
        }
    }
};

PayshieldCodec.prototype.decode = function(buff, $meta, context, log) {
    if (log?.trace) {
        // todo mask
        log.trace({$meta: {mtid: 'frame', method: 'payshield.decode'}, message: buff, log: context?.session?.log});
    }
    const headObj = this.headerMatcher(buff);
    if (!headObj) {
        throw this.errors['payshield.unableMatchingHeaderPattern']({});
    }

    const commandName = this.commandNames[headObj.code];
    if (!commandName) {
        throw this.errors['payshield.unknownResponseCode']({params: {code: headObj.code}});
    }
    const cmd = this.commands[commandName];
    if (!cmd) {
        throw this.errors['payshield.notimplemented']({params: {opcode: commandName}});
    }

    let bodyObj = this.errorMatcher(headObj.body);
    if (!bodyObj) {
        throw this.errors['payshield.unableMatchingResponseECode']({});
    }
    // 00 = No error
    // 02 = Key inappropriate length for algorithm (in some cases is warning)
    const warningsList = (cmd.warnings && ['00'].concat(cmd.warnings)) || ['00'];
    if (warningsList.includes(bodyObj.errorCode)) {
        bodyObj = cmd.matcher(headObj.body);
        if (!bodyObj) {
            throw this.errors['payshield.unableMatchingPattern']({params: {opcode: commandName}});
        }
        $meta.trace = headObj.headerNo;
        $meta.mtid = cmd.mtid;
        $meta.method = cmd.method;
    } else {
        let defErrCode = 'generic';
        $meta.trace = headObj.headerNo;
        $meta.mtid = 'error';
        $meta.method = cmd.method;
        if (cmd.errorMatcher) { // try to match errorPattern if it exists
            defErrCode = (cmd.errorMatcher(headObj.body) || bodyObj).errorCode || defErrCode;
        } else if (bodyObj?.errorCode) {
            defErrCode = bodyObj.errorCode;
        }
        const e = this.errors[`payshield.${cmd.method}.${defErrCode}`]({});
        log?.error?.(e);
        return e;
    }
    let request = {};
    if ($meta.mtid === 'response') {
        request = context.requests?.get('out/' + headObj.headerNo)?.$meta?.request ?? {};
    }
    return processResponse[headObj.code]?.(bodyObj, request) ?? bodyObj;
};

PayshieldCodec.prototype.encode = function(data, $meta, context, log) {
    // TODO: add validation
    const commandName = $meta.method.split('.').pop() + ':' + $meta.mtid;

    if (this.commands[commandName] === undefined) {
        throw this.errors['payshield.notimplemented']({params: {opcode: commandName}});
    }

    let headerNo = ($meta.mtid === 'request') ? null : $meta.trace;
    if (headerNo === undefined || headerNo === null) {
        headerNo = $meta.trace = ('0'.repeat(this.headerNoSize) + context.trace).substr(-this.headerNoSize);
        context.trace += 1;
        if (context.trace > this.maxTrace) {
            context.trace = 0;
        }
    }
    const dataCorrected = upperCaseObject(getLmkIdentifierParam(data), this.nonCorrectableFields);
    const bodyBuff = bitsyntax.build(this.commands[commandName].pattern, dataCorrected);
    if (!bodyBuff) {
        throw this.errors['payshield.parser.body']({params: {command: commandName}});
    }

    const cmdCode = this.commands[commandName].code;

    const buffer = bitsyntax.build(this.headerPattern, {
        headerNo,
        code: cmdCode,
        body: bodyBuff
    });
    if (log?.trace) {
        log.trace({$meta: {mtid: 'frame', method: 'payshield.encode'}, message: maskLogRecord(buffer, dataCorrected, {pattern: this.commands[commandName].pattern, maskedKeys: this.maskedKeys, maskSymbol: defaultMaskSymbol}), log: context?.session?.log});
    }
    $meta.request = data;
    return buffer;
};

module.exports = PayshieldCodec;
