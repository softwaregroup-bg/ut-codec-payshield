/**
    * @module ndc
    * @author UT Route Team
    * @description Parser module to handle I/O for the NDC protocol
    * @requires nconf
    */
var assign = require('lodash.assign');

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
    this.messageFormat = assign({}, require('./ndc.messages.json'), config.messageFormat);

    /**
        * @function val
        * @description Empty validation method
        */
    this.val = validator || null;
    /**
        * @function log
        * @description Empty log method
        */
    this.log = logger || {};
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
                    $$: {mtid: command._mtid, opcode: opcode},
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
    * @param {Object} message JSON object
    * @return {String} bufferString ASCII string
    */
NDC.prototype.encode = function(message) {
    if (typeof this.val === 'function') {
        this.val(message);
    }
    var bufferString = '';

    Object.keys(this.messageFormat).forEach(function(opcode) {
        var command = this.messageFormat[opcode];
        if (command._mtid === message.$$.mtid && opcode === message.$$.opcode) {
            message.messageSubclass = command.messageSubclass;
            bufferString += command.messageClass;
            command.fieldsSplit.forEach(function(field) {
                if (field.length) {
                    if (field === 'FS') {
                        bufferString += this.fieldSeparator;
                    } else {
                        bufferString += message[field] || '';
                    }
                }
            }.bind(this));
        }
    }.bind(this));

    return new Buffer(bufferString);
};

module.exports = NDC;
