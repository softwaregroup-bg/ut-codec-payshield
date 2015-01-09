var bitsyntax = require('bitsyntax');

/**
 * HSM payShield commands parser
 *
 * @module PayshieldParser
 * @version 1.0
 */
function PayshieldParser(config, val, log) {
    this.log = log;
    this.logLevel = null;
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
    this.logLevel = this.log.initLevels(config.logLevel);
    if (this.logLevel.info) {
        this.log.info('Initializing Payshield parser! headerFormat: ' + config.headerFormat + ', fieldFormat: ' +
        config.fieldFormat + ',messageFormat:' + config.messageFormat);
    }

    this.headerPattern = bitsyntax.parse('headerNo:' + config.headerFormat + ', code:2/string, body/binary');

    var nconf = require('nconf');
    var path = require('path');

    var commandsObj = new nconf.Provider({
        stores: [
            {name: 'impl'   , type: 'literal', store: config.messageFormat},
            {name: 'default', type: 'file', file: path.join(__dirname, 'payshield.messages.json')}
        ]
    }).get();

    var fieldFormat = new nconf.Provider({
        stores: [
            {name: 'impl'   , type: 'literal', store: config.fieldFormat},
            {name: 'default', type: 'file', file: path.join(__dirname, 'payshield.fields.json')}
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
 * @returns {JSON}  json object with extracted values from buffer with property names from message pattern
 *  and 'headerNo', 'headerCode', 'mtid', 'opcode'
 */
PayshieldParser.prototype.decode = function (buff) {
    if (this.logLevel.debug) { this.log.debug('PayshieldParser.decode buffer:' + buff.toString()); }
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
        throw new Error('Not implemented _opcode:' + commandName + '!');
    }

    var bodyObj = bitsyntax.match(bitsyntax.parse('errorcode:2/string, rest/binary'), headObj.body);
    if (!bodyObj) {
        throw new Error('Unable to match response errorcode!');
    }
    if (bodyObj.errorcode === '00' || bodyObj.errorcode === '02') {

        bodyObj = bitsyntax.match(cmd.pattern, headObj.body);
        if (!bodyObj) {
            throw new Error('Unable to match pattern for _opcode:' + commandName + '!');
        }

    }
    bodyObj.headerNo = headObj.headerNo;
    bodyObj.headerCode = headObj.code;
    bodyObj.mtid = cmd.mtid;
    bodyObj.opcode = commandName;
    return bodyObj;
};

/**
 * Convert object to Buffer
 * @param {JSON} data - json object with fields:{_opcode - required, _trace - required,  rest are field names from message pattern}
 * @returns {buffer}  encoded buffer
 */
PayshieldParser.prototype.encode = function(data) {
    //TODO: add validation
    this.logLevel.debug && this.log.debug('PayshieldParser.encode data:' + data);
    var commandName = data._opcode;
    var headerNo = data._trace;

    if (this.commands[commandName] === undefined) {
        throw new Error('Not implemented _opcode:' + commandName + '!');
    }

    if (!headerNo) {
        throw new Error('Missing _trace number!');
    }

    var bodyBuff = bitsyntax.build(this.commands[commandName].pattern, data);
    if (!bodyBuff) {
        throw new Error('Unable to match body of _opcode:' + commandName + '!');
    }

    var cmdCode = this.commands[commandName].code;

    var buff = bitsyntax.build(this.headerPattern, {headerNo: headerNo, code: cmdCode, body: bodyBuff});

    return buff;
};
module.exports = PayshieldParser;
