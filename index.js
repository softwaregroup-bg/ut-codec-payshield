require('./iso8583');
require('./ndc');
require('./payshield');
require('./smpp');

module.exports = {
    get: function(c) {
        var codec = require('ut-codec/' + c);
        return codec;
    }
};
