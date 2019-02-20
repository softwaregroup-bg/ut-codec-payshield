const tap = require('tap');
const config = require('../config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../../../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'translatePinLmkZpk';
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
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'translatePinLmkZpk decode, success');
    t.same(payshield.decode(testData[1].request, $meta, context).type, testResults[1].response, 'translatePinLmkZpk decode, ZPK parity error');
    t.same(payshield.decode(testData[2].request, $meta, context).type, testResults[2].response, 'translatePinLmkZpk decode, invalid PIN block format code');

    t.end();
});
