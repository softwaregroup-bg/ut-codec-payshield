const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'verifyOffsetIbmDukpt';
const testData = config.test[`${method}Encode`];
const testResults = config.test[`${method}Encode`];
const $meta = {
    method: method,
    mtid: 'request',
    trace: 14
};
const context = {
    trace: 14
};
tap.test(`${method}Encode`, (t) => {
    t.same(payshield.encode(testData[0].request, $meta, context), testResults[0].response, 'verifyOffsetIbmDukpt encode, PIN verify');
    t.same(payshield.encode(testData[1].request, $meta, context), testResults[1].response, 'verifyOffsetIbmDukpt encode, PIN verify, MAC verify');

    t.end();
});
