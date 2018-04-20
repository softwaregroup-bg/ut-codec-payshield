var bitsyntax = require('ut-bitsyntax');
var merge = require('lodash.merge');
var defaultFormat = require('./messages');

function PayshieldCodec(config, val, log) {
    this.logFactory = log;
    this.log = {};
    this.val = val;
    this.commands = {};
    this.headerPattern = null;
    this.commandNames = {};
    this.errors = require('./errors')(config.defineError);
    this.init(config);
}

PayshieldCodec.prototype.init = function(config) {
    this.logFactory && (this.log = this.logFactory.createLog(config.logLevel, {
        name: config.id,
        context: 'PayShield codec'
    }));
    if (this.log.info) {
        this.log.info('Initializing Payshield parser! headerFormat: ' + config.headerFormat + ',messageFormat:' + config.messageFormat);
    }
    this.headerPattern = bitsyntax.parse('headerNo:' + config.headerFormat + ', code:2/string, body/binary');
    this.headerMatcher = bitsyntax.matcher('headerNo:' + config.headerFormat + ', code:2/string, body/binary');
    this.errorMatcher = bitsyntax.matcher('errorCode:2/string, rest/binary');

    var commandsObj = merge({}, defaultFormat, config.messageFormat);

    if (this.headerPattern === false) {
        throw this.errors.parserHeader();
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
                    throw this.errors.parserRequest({params: {command: property}});
                }
                this.commands[property + ':request'] = {
                    pattern: requestPattern,
                    matcher: bitsyntax.matcher(commandsObj[property].requestPattern),
                    code: commandsObj[property].requestCode,
                    method: property,
                    mtid: 'request'
                };
                this.commandNames[commandsObj[property].requestCode] = property + ':request';
            }

            if (commandsObj[property].responsePattern) {
                var responsePattern = bitsyntax.parse(commandsObj[property].responsePattern);
                if (!responsePattern) {
                    throw this.errors.parserResponse({params: {command: property}});
                }
                this.commands[property + ':response'] = {
                    pattern: responsePattern,
                    matcher: bitsyntax.matcher(commandsObj[property].responsePattern),
                    errorMatcher: commandsObj[property].errorPattern && bitsyntax.matcher(commandsObj[property].errorPattern),
                    code: commandsObj[property].responseCode,
                    method: property,
                    mtid: 'response'
                };
                this.commandNames[commandsObj[property].responseCode] = property + ':response';
            }
        }
    }
};

PayshieldCodec.prototype.decode = function(buff, $meta) {
    if (this.log.debug) {
        this.log.debug('PayshieldParser.decode buffer:' + buff.toString());
    }
    var headObj = this.headerMatcher(buff);
    if (!headObj) {
        throw this.errors.unableMatchingHeaderPattern();
    }

    var commandName = this.commandNames[headObj.code];
    if (!commandName) {
        throw this.errors.unknownResponseCode({params: {code: headObj.code}});
    }
    var cmd = this.commands[commandName];
    if (!cmd) {
        throw this.errors.notimplemented({params: {opcode: commandName}});
    }

    var bodyObj = this.errorMatcher(headObj.body);
    if (!bodyObj) {
        throw this.errors.unableMatchingResponseECode();
    }
    // 00 = No error
    // 02 = Key inappropriate length for algorithm (in some cases is warning)
    if (['00', '02'].includes(bodyObj.errorCode)) {
        bodyObj = cmd.matcher(headObj.body);
        if (!bodyObj) {
            throw this.errors.unableMatchingPattern({params: {opcode: commandName}});
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
        let e = this.errors[`${cmd.method}.${defErrCode}`]();
        this.log.error && this.log.error(e);
        return e;
    }
    return bodyObj;
};

PayshieldCodec.prototype.encode = function(data, $meta, context) {
    // TODO: add validation
    this.log.debug && this.log.debug('PayshieldParser.encode data:' + data);
    var commandName = $meta.method.split('.').pop() + ':' + $meta.mtid;

    if (this.commands[commandName] === undefined) {
        throw this.errors.notimplemented({params: {opcode: commandName}});
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
        throw this.errors.parserBody({params: {command: commandName}});
    }

    var cmdCode = this.commands[commandName].code;

    return bitsyntax.build(this.headerPattern, {
        headerNo: headerNo,
        code: cmdCode,
        body: bodyBuff
    });
};

module.exports = PayshieldCodec;
