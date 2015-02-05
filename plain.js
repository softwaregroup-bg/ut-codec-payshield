(function(define) { define(function(require) {


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

    return Plain;

});})(typeof define === 'function' && define.amd ?  define : function(factory) { module.exports = factory(require); });
