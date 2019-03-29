const tap = require('tap');
const config = require('../config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../../../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'translatePinLmkLmk';
const testData = config.test[`${method}Decode`];
const testResults = config.test[`${method}Decode`];
const $meta = {
    method: method,
    mtid: 'response',
    trace: 12
};
const context = {
    trace: 12
};
tap.test(`${method}Decode`, (t) => {
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'translatePinLmkLmk decode, success');
    t.same(payshield.decode(testData[1].request, $meta, context).type, testResults[1].response, 'translatePinLmkLmk decode, PIN encrypted under LMK pair 02-03 is invalid');

    t.end();
});
