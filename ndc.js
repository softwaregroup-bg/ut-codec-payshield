(function(define) { define(function(require) {
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
     * @tutorial ndc
     * @param {Object} config Input configuration parameters
     * @param {Function} validator
     * @param {Function} logger
     */
    function NDC(config, validator, logger) {
        /**
         * @param {String} fieldSeparator
         * @description Buffer field separator for
         */
        this.fieldSeparator = config.fieldSeparator || '\u001c';
        /**
         * @param {Object} messageFormat
         * @description List of all fields within a message
         */
        this.messageFormat = new nconf.Provider({
            stores: [
                {name: 'impl'   , type: 'literal', store: config.messageFormatOverride || {}},
                {name: 'default', type: 'file', file: path.join(__dirname, 'ndc.messages.json')}
            ]
        }).get();
        /**
         * @function val
         * @description Empty validation method
         */
        this.val = validator;
        /**
         * @function log
         * @description Empty log method
         */
        this.log = logger;
        /**
         * Split each message fields by comma and assign the array to message.fieldSplit variable
         */
        Object.keys(this.messageFormat).forEach(function(message) {
            this.messageFormat[message].fieldsSplit = this.messageFormat[message].fields.split(',');
        }.bind(this));

        return this;
    }
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

            Object.keys(this.messageFormat).forEach(function(opcode) {
                var command = this.messageFormat[opcode];
                if (command.messageClass === messageClass && command.messageSubclass === messageSubclass) {
                    message = {
                        _mtid: command._mtid,
                        _opcode: opcode,
                        messageClass: command.messageClass,
                        messageSubclass: command.messageSubclass
                    };
                    if (opcode !== 'unknownCommand') {
                        command.fieldsSplit.filter(function(field) {
                            return field !== 'FS';
                        }).reduce(function(previous, element, key) {
                            if (element === '' || element === 'messageSubclass') {
                                return previous;
                            }
                            previous[element] = tokens[key] || '';
                            return previous;
                        }, message);
                    }
                    message.payload = buffer.toString();
                }
            }.bind(this));
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

        if (typeof this.val === 'function') {
            this.val(json);
        }
        var bufferString = '';

        Object.keys(this.messageFormat).forEach(function(opcode) {
            var command = this.messageFormat[opcode];
            if (command._mtid === json._mtid && opcode === json._opcode) {
                json.messageSubclass = command.messageSubclass;
                bufferString += command.messageClass;
                command.fieldsSplit.forEach(function(field) {
                    if (field.length) {
                        if (field === 'FS') {
                            bufferString += this.fieldSeparator;
                        } else {
                            bufferString += json[field] || '';
                        }
                    }
                });
            }
        }.bind(this));

        return new Buffer(bufferString);

    };

    return NDC;

});})(typeof define === 'function' && define.amd ?  define : function(factory) { module.exports = factory(require); });
