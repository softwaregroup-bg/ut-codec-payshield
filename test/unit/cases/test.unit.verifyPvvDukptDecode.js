const tap = require('tap');
const config = require('../config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../../../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'verifyPvvDukpt';
const testData = config.test[`${method}Decode`];
const testResults = config.test[`${method}Decode`];
const $meta = {
    method: method,
    mtid: 'response',
    trace: 31
};
const context = {
    trace: 31
};
tap.test(`${method}Decode`, (t) => {
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'verifyPvvDukpt decode, success');
    t.same(payshield.decode(testData[1].request, $meta, context).type, testResults[1].response, 'verifyPvvDukpt decode, PIN Verification failure');
    t.same(payshield.decode(testData[2].request, $meta, context).type, testResults[2].response, 'verifyPvvDukpt decode, BDK parity error');
    t.same(payshield.decode(testData[3].request, $meta, context).type, testResults[3].response, 'verifyPvvDukpt decode, PVK error');
    t.same(payshield.decode(testData[4].request, $meta, context).type, testResults[4].response, 'verifyPvvDukpt decode, BDK not double or triple length');

    t.end();
});
