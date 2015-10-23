require('./iso8583');
require('./ndc');
require('./payshield');
require('./smpp');

(function(define) {define(function(require) {

    return {
        get: function(c) {
            var codec = require('ut-codec/' + c);
            return codec;
        }
    };

});}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
