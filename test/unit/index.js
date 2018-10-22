const tap = require('tap');
const config = require('./config');
const {define, get, fetch} = require('ut-error');
const errorApi = {defineError: define, getError: get, fetchErrors: fetch};
const Payshield = require('../../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const lib = {
    config,
    mainLib: {payshield}
};

// test cases
require('./cases/generateKey')(tap, lib);
