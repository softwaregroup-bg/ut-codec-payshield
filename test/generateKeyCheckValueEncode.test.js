const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'generateKeyCheckValue';
const testData = config.test[`${method}Encode`];
const testResults = config.test[`${method}Encode`];
const $meta = {
    method,
    mtid: 'request',
    trace: 11
};
const context = {
    trace: 11
};
tap.test(`${method}Encode`, (t) => {
    t.same(payshield.encode(testData[0].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[0].response, 'generateKeyCheckValue variant encode, set 1, keyType');
    t.same(payshield.encode(testData[1].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[1].response, 'generateKeyCheckValue variant encode, set 2, keyType');
    t.same(payshield.encode(testData[2].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[2].response, 'generateKeyCheckValue variant encode, set 3, keyTypeCode');
    t.same(payshield.encode(testData[3].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[3].response, 'generateKeyCheckValue keyblock encode, set 4, keyType');

    t.end();
});
