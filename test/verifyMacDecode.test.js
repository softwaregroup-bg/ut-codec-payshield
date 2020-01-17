const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'verifyMac';
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
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'verifyMac decode, set 1, success');
    t.same(payshield.decode(testData[1].request, $meta, context), testResults[1].response, 'verifyMac decode, set 2, success');
    t.same(payshield.decode(testData[2].request, $meta, context).type, testResults[2].response, 'verifyMac decode, MAC verification failed');
    t.same(payshield.decode(testData[3].request, $meta, context).type, testResults[3].response, 'verifyMac decode, Invalid Mode Flag field');
    t.same(payshield.decode(testData[4].request, $meta, context).type, testResults[4].response, 'verifyMac decode, Invalid Input Format Flag field');
    t.same(payshield.decode(testData[5].request, $meta, context).type, testResults[5].response, 'verifyMac decode, Invalid Key Type field');
    t.same(payshield.decode(testData[6].request, $meta, context).type, testResults[6].response, 'verifyMac decode, MAC Key Parity Error');

    t.end();
});
