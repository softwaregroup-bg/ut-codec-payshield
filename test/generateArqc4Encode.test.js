const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'generateArqc4';
const testData = config.test[`${method}Encode`];
const testResults = config.test[`${method}Encode`];
const $meta = {
    method,
    mtid: 'request',
    trace: 2
};
const context = {
    trace: 2
};
tap.test(`${method}Encode`, (t) => {
    t.same(payshield.encode(testData[0].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[0].response, 'generateArqc4 variant encode, verify ARQC set 1');
    t.same(payshield.encode(testData[1].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[1].response, 'generateArqc4 variant encode, verify ARQC set 2');
    t.same(payshield.encode(testData[2].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[2].response, 'generateArqc4 variant encode, generate ARPC');
    t.same(payshield.encode(testData[3].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[3].response, 'generateArqc4 keyblock encode, verify ARQC set 3');
    t.same(payshield.encode(testData[4].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[4].response, 'generateArqc4 keyblock encode, verify ARQC set 4');
    t.same(payshield.encode(testData[5].request, $meta, {trace: context.trace}).toString('hex').toUpperCase(), testResults[5].response, 'generateArqc4 keyblock encode, generate ARPC');

    t.end();
});
