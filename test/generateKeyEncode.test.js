const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'generateKey';
const testData = config.test[`${method}Encode`];
const testResults = config.test[`${method}Encode`];
const $meta = {
    method,
    mtid: 'request',
    trace: 0
};
const context = {
    trace: 0
};
tap.test(`${method}Encode`, (t) => {
    t.same(payshield.encode(testData[0].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[0].response, 'generateKey variant encode, simple');
    t.same(payshield.encode(testData[1].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[1].response, 'generateKey variant encode, under ZMK');
    t.same(payshield.encode(testData[2].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[2].response, 'generateKey keyblock encode, simple');
    t.same(payshield.encode(testData[3].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[3].response, 'generateKey keyblock encode, under ZMK');

    t.end();
});
