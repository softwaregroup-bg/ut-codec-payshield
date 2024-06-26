const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'verifyInterPinPvv';
const testData = config.test[`${method}Decode`];
const testResults = config.test[`${method}Decode`];
const $meta = {
    method,
    mtid: 'request',
    trace: 2
};
const context = {
    trace: 2
};
tap.test(`${method}Decode`, (t) => {
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'verifyInterPinPvv decode, success');
    t.same(payshield.decode(testData[1].request, $meta, context).type, testResults[1].response, 'verifyInterPinPvv decode, PIN verification failure');
    t.same(payshield.decode(testData[2].request, $meta, context).type, testResults[2].response, 'verifyInterPinPvv decode, ZPK parity error');
    t.same(payshield.decode(testData[3].request, $meta, context).type, testResults[3].response, 'verifyInterPinPvv decode, PVK parity error');
    t.same(payshield.decode(testData[4].request, $meta, context).type, testResults[4].response, 'verifyInterPinPvv decode, Invalid input data');

    t.end();
});
