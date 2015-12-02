function Plain(config, validator, logger) {
    this.val = validator;
    this.log = logger;
}

Plain.prototype.decode = function(buffer) {
    var bufferString = buffer.toString();
    return bufferString;
};

Plain.prototype.encode = function(message, context) {
    return new Buffer(message.payload);
};

module.exports = Plain;
