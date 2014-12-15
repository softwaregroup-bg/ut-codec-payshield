/**
 * @module ndc
 * @author UT Route Team
 * @description Parser module to handle I/O for the NDC protocol
 * @requires nconf
 */
var nconf = require('nconf');
var path = require('path');

/**
 * @class NDC
 * @description Creates new NDC object instance
 * @param {Object} config Input configuration parameters
 */
function NDC(config, validator, logger) {
    /**
     * @param {String} fieldSeparator
     * @description Buffer field separator for
     */
    this.fieldSeparator = config.fieldSeparator || '\u001c';
    /**
     * @param {Array} fieldFormat
     * @description List of all fields within a message
     */
    this.fieldFormat = new nconf.Provider({
        stores: [
            { name: 'impl'   , type: 'literal', store: config.messageFormatOverride || {} },
            { name: 'default', type: 'file', file: path.join(__dirname, 'ndc.messages.json') }
        ]
    }).get();
    /**
     * @function val
     * @description Empty validation method
     */
    this.val = validator || null;
    /**
     * @function log
     * @description Empty log method
     */
    this.log = logger || null;
    /**
     * Split each message fields by comma and assign the array to message.fieldSplit variable
     */
    var $self = this;
    Object.keys(this.fieldFormat).forEach(function(message) {
        $self.fieldFormat[message].fieldsSplit = $self.fieldFormat[message].fields.split(',');
    });

    return this;
};

/**
 * @function decode
 * @description Decodes input buffer to JSON object
 * @param {Buffer} buffer NDC buffer
 * @return {Object} message JSON object
 */
NDC.prototype.decode = function(buffer) {
    var message = {};
    var bufferString = buffer.toString();

    if (buffer.length > 0) {
        var messageClass = '';
        var messageSubclass = '';
        var tokens = bufferString.split(this.fieldSeparator);

        if (tokens[0]) {
            messageClass = tokens[0].charAt(0);
            messageSubclass = tokens[0].charAt(1) || '';
        }

        var $self = this;
        Object.keys($self.fieldFormat).forEach(function(opcode) {
            var command = $self.fieldFormat[opcode];
            if (command.message_class === messageClass && command.message_subclass === messageSubclass) {
                message = {
                    _mtid: command._mtid,
                    _opcode: opcode,
                    message_class: command.message_class,
                    message_subclass: command.message_subclass
                };
                if (opcode !== 'unknown_command') {
                    command.fieldsSplit.filter(function(field) {
                        return field !== 'FS';
                    }).reduce(function(previous, element, key) {
                        if (element === '' || element === 'message_sub_class') return previous;
                        previous[element] = tokens[key] || '';
                        return previous;
                    }, message);
                }
                message.payload = buffer.toString();
            }
        });
    }

    return message;
};

/**
 * @function encode
 * @description Encodes input JSON object to ASCII string
 * @param {Object} json JSON object
 * @return {String} bufferString ASCII string
 */
NDC.prototype.encode = function(json) {

    if (this.val !== null) {
        this.val(json);
    }

    var $self = this;
    var bufferString = '';

    Object.keys($self.fieldFormat).forEach(function(opcode) {
        var command = $self.fieldFormat[opcode];
        if (command._mtid === json._mtid && opcode === json._opcode) {
            json.message_sub_class = command.message_subclass;
            bufferString += command.message_class;
            command.fieldsSplit.forEach(function(field) {
                if (field.length) {
                    if (field === 'FS') {
                        bufferString += $self.fieldSeparator;
                    } else {
                        bufferString += json[field] || '';
                    }
                }
            });
        }
    });

    return new Buffer(bufferString);
};

module.exports = NDC;