const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'translatePinTpkZpkBdk';
const testData = config.test[`${method}Encode`];
const testResults = config.test[`${method}Encode`];
const $meta = {
    method: method,
    mtid: 'request',
    trace: 11
};
const context = {
    trace: 11
};
tap.test(`${method}Encode`, (t) => {
    t.same(payshield.encode(testData[0].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[0].response, 'translatePinTpkZpk variant encode, set 1');
    t.same(payshield.encode(testData[1].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[1].response, 'translatePinTpkZpk variant encode, set 2');
    t.same(payshield.encode(testData[2].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[2].response, 'translatePinTpkZpk keyblock encode, set 3');
    t.same(payshield.encode(testData[3].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[3].response, 'translatePinTpkZpk keyblock BDK encode, set 4');

    t.end();
});
