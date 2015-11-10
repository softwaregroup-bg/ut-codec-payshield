var bitsyntax = require('ut-bitsyntax');

/**
 * HSM payShield commands parser
 *
 * @module PayshieldParser
 * @version 1.0
 */
function PayshieldParser(config, val, log) {
    this.logFactory = log;
    this.log = {};
    this.val = val;
    this.commands = [];
    this.headerPattern = null;
    this.commandNames = [];
    this.init(config);
}

/**
 * Initializing parser defaults
 * @param {JSON} config - json object with initial parameters
 *  config = {
     *   headerFormat: pattern for header size e.g. '6/string-left-zero';
     *   fieldFormat: json object with field parameters for overriding default parameters e.g.{pvk:33};
     *   messageFormat: json object for overriding default messages e.g. {generate_offset_ibm_lmk:{...}};
     * }
 */
PayshieldParser.prototype.init = function(config) {
    //config.fieldFormat {pvk:33}
    //config.messageFormat {generate_offset_ibm_lmk:{...}}
    //config.headerFormat = '4/string'
    this.logFactory && (this.log = this.logFactory.createLog(config.logLevel, {name:config.id, context:'PayShield codec'}));
    if (this.log.info) {
        this.log.info('Initializing Payshield parser! headerFormat: ' + config.headerFormat + ', fieldFormat: ' +
        config.fieldFormat + ',messageFormat:' + config.messageFormat);
    }

    this.headerPattern = bitsyntax.parse('headerNo:' + config.headerFormat + ', code:2/string, body/binary');

    var nconf = require('nconf'); //todo remove nconf instead use _.assign and loading file with require

    var commandsObj = new nconf.Provider({
        stores: [
            {name: 'impl'   , type: 'literal', store: config.messageFormat || {}},
            {name: 'default', type: 'file', file: require.resolve('./payshield.messages.json')}
        ]
    }).get();

    var fieldFormat = new nconf.Provider({
        stores: [
            {name: 'impl'   , type: 'literal', store: config.fieldFormat || {}},
            {name: 'default', type: 'file', file: require.resolve('./payshield.fields.json')}
        ]
    }).get();

    if (this.headerPattern === false) {
        throw new Error('Cant parse headerPattern pattern!');
    }
    for (var property in commandsObj) {
        if (commandsObj.hasOwnProperty(property)) {
            var cmdPattern = bitsyntax.parse(commandsObj[property].Pattern);
            if (cmdPattern === false) {
                throw new Error('Cant parse Pattern for command:' + property + '!');
            }
            cmdPattern.forEach(function(value) {
                var currSize = value.size;
                if (typeof (currSize) === 'string') {
                    if (fieldFormat[currSize]) {
                        var sizee = fieldFormat[currSize];
                        if (isNaN(sizee)) {
                            throw new Error('Invalid value for size field:' + currSize + '!');
                        }
                        value.size = parseInt(sizee);
                    }
                }
            });

            this.commands[property] = {pattern: cmdPattern, code: commandsObj[property].Code, mtid: commandsObj[property].mtid};
            this.commandNames[commandsObj[property].Code] = property;
        }
    }
};

/**
 * Decoding Buffer
 * @param {Buffer} buff - buffer for decoding.
 * @param {object} $meta - metadata
 * @returns {JSON}  json object with extracted values from buffer with property names from message pattern
 *  and system field $$:{'trace', 'mtid', 'opcode'}
 */
PayshieldParser.prototype.decode = function(buff, $meta) {
    if (this.log.debug) { this.log.debug('PayshieldParser.decode buffer:' + buff.toString()); }
    var headObj = bitsyntax.match(this.headerPattern, buff);
    if (!headObj) {
        throw new Error('Unable to match header to header pattern!');
    }

    var commandName = this.commandNames[headObj.code];
    if (!commandName) {
        throw new Error('Unknown response code:' + headObj.code);
    }
    var cmd = this.commands[commandName];
    if (!cmd) {
        throw new Error('Not implemented opcode:' + commandName + '!');
    }

    var bodyObj = bitsyntax.match(bitsyntax.parse('errorCode:2/string, rest/binary'), headObj.body);
    if (!bodyObj) {
        throw new Error('Unable to match response errorCode!');
    }
    if (bodyObj.errorCode === '00' || bodyObj.errorCode === '02') {

        bodyObj = bitsyntax.match(cmd.pattern, headObj.body);
        if (!bodyObj) {
            throw new Error('Unable to match pattern for opcode:' + commandName + '!');
        }
        $meta.trace = headObj.headerNo;
        $meta.mtid = cmd.mtid;
        $meta.opcode = commandName;
    } else {
        $meta.trace = headObj.headerNo;
        $meta.mtid = 'error';
        $meta.errorCode = bodyObj.errorCode; //todo also return the error message as per payshield documentation
        bodyObj = {};
    }
    return bodyObj;
};

/**
 * Convert object to Buffer
 * @param {object} data - json object with fields:{$$:{opcode - required, trace - required},  rest are field names from message pattern}
 * @param {object} $meta - metadata
 * @param {object} context - the connection context
 * @returns {buffer}  encoded buffer
 */
PayshieldParser.prototype.encode = function(data, $meta, context) {
    //TODO: add validation
    this.log.debug && this.log.debug('PayshieldParser.encode data:' + data);
    var commandName = $meta.opcode;

    if (this.commands[commandName] === undefined) {
        throw new Error('Not implemented opcode:' + commandName + '!');
    }

    var headerNo = $meta.trace;
    if (headerNo === undefined || headerNo === null) {
        headerNo = $meta.trace = ('000000' + context.trace).substr(-6);
        context.trace += 1;
        if (context.trace > 999999) {
            context.trace = 0;
        }
    }

    var bodyBuff = bitsyntax.build(this.commands[commandName].pattern, data);
    if (!bodyBuff) {
        throw new Error('Unable to build body of opcode:' + commandName + '!');
    }

    var cmdCode = this.commands[commandName].code;

    return bitsyntax.build(this.headerPattern, {headerNo: headerNo, code: cmdCode, body: bodyBuff});
};

module.exports = PayshieldParser;
