const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'verifyPinGeneratePvv';
const testData = config.test[`${method}Decode`];
const testResults = config.test[`${method}Decode`];
const $meta = {
    method: method,
    mtid: 'response',
    trace: 3
};
const context = {
    trace: 3
};
tap.test(`${method}Decode`, (t) => {
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'verifyPinGeneratePvv decode, success');
    t.same(payshield.decode(testData[1].request, $meta, context).type, testResults[1].response, 'verifyPinGeneratePvv decode, PIN Verification failure');
    t.same(payshield.decode(testData[2].request, $meta, context).type, testResults[2].response, 'verifyPinGeneratePvv decode, PIN Block Key parity error');
    t.same(payshield.decode(testData[3].request, $meta, context).type, testResults[3].response, 'verifyPinGeneratePvv decode, PVK parity error');
    t.same(payshield.decode(testData[4].request, $meta, context).type, testResults[4].response, 'verifyPinGeneratePvv decode, PIN block does not contain valid values');

    t.end();
});
