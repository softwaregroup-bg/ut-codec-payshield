const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'decryptDataBlock';
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
    t.same(payshield.encode(testData[0].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[0].response, 'decryptDataBlock encode, set 1');
    t.same(payshield.encode(testData[1].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[1].response, 'decryptDataBlock encode, set 2');
    t.same(payshield.encode(testData[2].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[2].response, 'decryptDataBlock encode, set 3');

    t.end();
});
