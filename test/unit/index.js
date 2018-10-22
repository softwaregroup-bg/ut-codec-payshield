const tap = require('tap');
const config = require('./config');
const {define, get, fetch} = require('ut-error');
const errorApi = {defineError: define, getError: get, fetchErrors: fetch};
// const errors = require('../../errors/')(errorApi);
const Payshield = require('../../index');

const lib = {
    config,
    // errors,
    mainLib: {payshield: new Payshield(Object.assign({}, config, errorApi))}
};

// test cases
require('./cases/generateKeyEncode')(tap, lib);
require('./cases/generateKeyDecode')(tap, lib);
require('./cases/importKeyEncode')(tap, lib);
require('./cases/importKeyDecode')(tap, lib);
require('./cases/exportKeyEncode')(tap, lib);
require('./cases/exportKeyDecode')(tap, lib);
