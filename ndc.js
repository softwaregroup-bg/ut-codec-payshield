/**
 * @module ndc
 * @author UT Route Team
 * @description Parser module to handle I/O for the NDC protocol
 * @requires ut-validate-joi
 */

/**
 * @class NDC
 * @description Creates new NDC object instance
 * @param {Object} params Input configuration parameters
 */
function NDC(params) {
    /**
     * @param {String} fieldSeparator
     * @description Buffer field separator for 
     */
    this.fieldSeparator = params.fieldSeparator;
    /** 
     * @param {Array} fieldFormat
     * @description List of all fields witihin a message
     */
    this.fieldFormat = params.fieldFormat;
    /**
     * @function val
     * @description Empty validation method
     */
    this.val = params.validator || null;
    /**
     * @function log
     * @description Empty log method
     */
    this.log = params.logger || null;

    this.fieldFormat.msgs.forEach(function(msg) {
        msg.fieldsSplit = msg.fields.split(',');
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

        if (typeof tokens[0] !== 'undefined' && tokens[0].length) {
            messageClass = tokens[0].charAt(0);
            messageSubclass = tokens[0].charAt(1) || '';
        }

        var command = this.fieldFormat.msgs.filter(function(c) {
            return c.message_class === messageClass
                && c.message_subclass === messageSubclass;
        });

        if (command.length) {
            message = {
                _mtid : command[0]._mtid,
                _opcode : command[0]._opcode,
                message_class : command[0].message_class,
                message_subclass : command[0].message_subclass
            };

            if (command[0]._opcode !== 'unknown_command') {
                command[0].fieldsSplit.filter(function(field) {
                    return field !== 'FS';
                }).reduce(function(previous, element, key) {
                    if (element === '' || element === 'message_sub_class') return previous;
                    previous[element] = tokens[key] || '';
                    return previous;
                }, message);
            }

            message.payload = buffer.toString();
        }
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

    var command = this.fieldFormat.msgs.filter(function(c) {
        return c._mtid === json._mtid
            && c._opcode === json._opcode;
    });

    if (command.length) {
        json.message_sub_class = command[0].message_subclass;

        bufferString += command[0].message_class;

        command[0].fieldsSplit.forEach(function(field, key) {
            if (field.length) {
                if (field === 'FS') {
                    bufferString += $self.fieldSeparator;
                } else {
                    bufferString += json[field] || '';
                }
            }
        });
    }

    return new Buffer(bufferString);
};

module.exports = NDC;