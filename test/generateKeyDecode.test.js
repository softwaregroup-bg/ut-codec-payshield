const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'generateKey';
const testData = config.test[`${method}Decode`];
const testResults = config.test[`${method}Decode`];
const testContext = config.test[`${method}Decode`];
const $meta = {
    method,
    mtid: 'response',
    trace: 1
};

const context = {
    trace: 1
};

tap.test(`${method}Decode`, (t) => {
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'generateKey variant decode, simple, success');
    t.same(payshield.decode(testData[1].request, $meta, {...context, ...testContext[1].context}), testResults[1].response, 'generateKey variant decode, under ZMK, success');
    t.same(payshield.decode(testData[2].request, $meta, context), testResults[2].response, 'generateKey keyblock decode, simple, success');
    t.same(payshield.decode(testData[3].request, $meta, {...context, ...testContext[3].context}), testResults[3].response, 'generateKey keyblock decode, under ZMK, success');
    t.same(payshield.decode(testData[4].request, $meta, context).type, testResults[4].response, 'generateKey decode, under ZMK, ZMK or TMK parity error');
    t.same(payshield.decode(testData[5].request, $meta, context).type, testResults[5].response, 'generateKey decode, invalid input data');

    t.end();
});
