var create = require('ut-error').define;

var Iso = create('iso8583');

var errors0 = require('./iso0').errors;
var errors1 = require('./iso1').errors;
var Generic = create('generic', Iso, 'generic error');

function convert(msg) {
    return Object.keys(msg).reduce((prev, current) => {
        prev[(/^[^A-Za-z_]/.test(current) ? 'iso' : '') + current] = msg[current];
        return prev;
    }, {});
}

module.exports = {
    generic: cause => new Generic(convert(cause))
};

var iterate = errors => Object.keys(errors).forEach(name => {
    var Err = create(name, Iso, errors[name]);
    module.exports[name] = cause => new Err(convert(cause));
});

iterate(errors0);
iterate(errors1);
