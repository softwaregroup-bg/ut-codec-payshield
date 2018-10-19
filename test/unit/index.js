const config = require('../config/test');
const {define, get, fetch} = require('ut-error');
const errorApi = {defineError: define, getError: get, fetchErrors: fetch};
const errors = require('../../errors')(errorApi);
const Payshield = require('../../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const lib = {
    config,
    mainLib: {payshield}
};

// test cases
require('./cases/generateKey')(lib);
