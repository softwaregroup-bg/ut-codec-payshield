const tap = require('tap');
const config = require('../config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../../../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'generateKey';
const testData = config.test[`${method}Decode`];
const testResults = config.test[`${method}Decode`];
const $meta = {
    method: method,
    mtid: 'response',
    trace: 1
};
const context = {
    trace: 1
};
tap.test(`${method}Decode`, (t) => {
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'generateKey decode, simple, success');
    t.same(payshield.decode(testData[1].request, $meta, context), testResults[1].response, 'generateKey decode, under ZMK, success');
    t.same(payshield.decode(testData[2].request, $meta, context).type, testResults[2].response, 'generateKey decode, under ZMK, ZMK or TMK parity error');
    t.same(payshield.decode(testData[3].request, $meta, context).type, testResults[3].response, 'generateKey decode, invalid input data');

    t.end();
});
