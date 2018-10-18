var bitsyntax = require('ut-bitsyntax');
var merge = require('lodash.merge');
var defaultFormat = require('./messages');

function maskLogRecord(buffer, data, pattern, maskedKeys) {
    let endIndex = 0;
    let size;
    let asterisk = '*'.charCodeAt(0);
    let returnBuffer = Buffer.from(buffer);
    pattern
        .map((v, i) => {
            let currentElement = {
                name: v.name
            };
            if (isNaN(v.size)) {
                size = parseInt(data[v.size]);
            } else {
                size = v.size;
            }
            currentElement.startIndex = endIndex ? endIndex + 1 : 0;
            currentElement.endIndex = endIndex ? endIndex + size : size - 1;
            endIndex = currentElement.endIndex;
            return currentElement;
        })
        .filter((toFilter) => (maskedKeys.includes(toFilter.name)))
        .forEach((value) => {
            for (var index = value.startIndex; index <= value.endIndex; index++) {
                returnBuffer[index] = asterisk;
            }
        });
    return returnBuffer;
}

function PayshieldCodec(config) {
    this.commands = {};
    this.headerPattern = null;
    this.commandNames = {};
    this.errors = require('./errors')(config);
    this.maskedKeys = null;
    this.init(config);
}

PayshieldCodec.prototype.init = function(config) {
    this.headerPattern = bitsyntax.parse('headerNo:' + config.headerFormat + ', code:2/string, body/binary');
    this.headerMatcher = bitsyntax.matcher('headerNo:' + config.headerFormat + ', code:2/string, body/binary');
    this.errorMatcher = bitsyntax.matcher('errorCode:2/string, rest/binary');
    this.maskedKeys = config.maskedKeys || [];

    var commandsObj = merge({}, defaultFormat, config.messageFormat);

    if (this.headerPattern === false) {
        throw this.errors['payshield.parser.header']({});
    }

    this.headerNoSize = this.headerPattern.filter(function(value) {
        return value.name === 'headerNo';
    }).pop().size;
    this.maxTrace = parseInt('9'.repeat(this.headerNoSize));

    for (var property in commandsObj) {
        if (commandsObj.hasOwnProperty(property)) {
            if (commandsObj[property].requestPattern) {
                var requestPattern = bitsyntax.parse(commandsObj[property].requestPattern);
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
                var responsePattern = bitsyntax.parse(commandsObj[property].responsePattern);
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
    if (log && log.trace) {
        // todo mask
        log.trace({$meta: {mtid: 'frame', method: 'payshield.decode'}, message: buff, log: context && context.session && context.session.log});
    }
    var headObj = this.headerMatcher(buff);
    if (!headObj) {
        throw this.errors['payshield.unableMatchingHeaderPattern']({});
    }

    var commandName = this.commandNames[headObj.code];
    if (!commandName) {
        throw this.errors['payshield.unknownResponseCode']({params: {code: headObj.code}});
    }
    var cmd = this.commands[commandName];
    if (!cmd) {
        throw this.errors['payshield.notimplemented']({params: {opcode: commandName}});
    }

    var bodyObj = this.errorMatcher(headObj.body);
    if (!bodyObj) {
        throw this.errors['payshield.unableMatchingResponseECode']({});
    }
    // 00 = No error
    // 02 = Key inappropriate length for algorithm (in some cases is warning)
    var warningsList = (cmd.warnings && ['00', '02'].concat(cmd.warnings)) || ['00', '02'];
    if (warningsList.includes(bodyObj.errorCode)) {
        bodyObj = cmd.matcher(headObj.body);
        if (!bodyObj) {
            throw this.errors['payshield.unableMatchingPattern']({params: {opcode: commandName}});
        }
        $meta.trace = headObj.headerNo;
        $meta.mtid = cmd.mtid;
        $meta.method = cmd.method;
    } else {
        var defErrCode = 'generic';
        $meta.trace = headObj.headerNo;
        $meta.mtid = 'error';
        $meta.method = cmd.method;
        if (cmd.errorMatcher) { // try to match errorPattern if it exists
            defErrCode = (cmd.errorMatcher(headObj.body) || bodyObj).errorCode || defErrCode;
        } else if (bodyObj && bodyObj.errorCode) {
            defErrCode = bodyObj.errorCode;
        }
        let e = this.errors[`payshield.${cmd.method}.${defErrCode}`]({});
        log && log.error && log.error(e);
        return e;
    }
    return bodyObj;
};

PayshieldCodec.prototype.encode = function(data, $meta, context, log) {
    // TODO: add validation
    var commandName = $meta.method.split('.').pop() + ':' + $meta.mtid;

    if (this.commands[commandName] === undefined) {
        throw this.errors['payshield.notimplemented']({params: {opcode: commandName}});
    }

    var headerNo = $meta.trace;
    if (headerNo === undefined || headerNo === null) {
        headerNo = $meta.trace = ('0'.repeat(this.headerNoSize) + context.trace).substr(-this.headerNoSize);
        context.trace += 1;
        if (context.trace > this.maxTrace) {
            context.trace = 0;
        }
    }

    var bodyBuff = bitsyntax.build(this.commands[commandName].pattern, data);
    if (!bodyBuff) {
        throw this.errors['payshield.parser.body']({params: {command: commandName}});
    }

    var cmdCode = this.commands[commandName].code;

    let buffer = bitsyntax.build(this.headerPattern, {
        headerNo: headerNo,
        code: cmdCode,
        body: bodyBuff
    });
    if (log && log.trace) {
        // todo mask
        log.trace({$meta: {mtid: 'frame', method: 'payshield.encode'}, message: maskLogRecord(buffer, data, [].concat(this.headerPattern[0], this.headerPattern[1], this.commands[commandName].pattern), this.maskedKeys), log: context && context.session && context.session.log});
    }
    return buffer;
};

module.exports = PayshieldCodec;
