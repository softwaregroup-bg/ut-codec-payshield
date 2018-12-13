const tap = require('tap');
const config = require('../config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../../../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'generateVerifyMacDukpt';
const testData = config.test[`${method}Encode`];
const testResults = config.test[`${method}Encode`];
const $meta = {
    method: method,
    mtid: 'request',
    trace: 2
};
const context = {
    trace: 2
};
tap.test(`${method}Encode`, (t) => {
    t.same(payshield.encode(testData[0].request, $meta, context), testResults[0].response, 'generateVerifyMacDukpt encode, set 1, generate MAC');
    t.same(payshield.encode(testData[1].request, $meta, context), testResults[1].response, 'generateVerifyMacDukpt encode, set 2, verify MAC');

    t.end();
});
