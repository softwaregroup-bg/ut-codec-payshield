const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'generateArqc4';
const testData = config.test[`${method}Decode`];
const testResults = config.test[`${method}Decode`];
const $meta = {
    method: method,
    mtid: 'response',
    trace: 3
};
const context = {
    trace: 3
};
tap.test(`${method}Decode`, (t) => {
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'generateArqc4 decode, verify ARQC set 1, success');
    t.same(payshield.decode(testData[1].request, $meta, context), testResults[1].response, 'generateArqc4 decode, verify ARQC set 2, success');
    t.same(payshield.decode(testData[2].request, $meta, context), testResults[2].response, 'generateArqc4 decode, generate ARPC, success');
    t.same(payshield.decode(testData[3].request, $meta, context).type, testResults[3].response, 'generateArqc4 decode, verify ARQC, ARQC/TC/AAC/MPVV verification failure');
    t.same(payshield.decode(testData[4].request, $meta, context).type, testResults[4].response, 'generateArqc4 decode, verify ARQC, Unrecognized Mode Flag');
    t.same(payshield.decode(testData[5].request, $meta, context).type, testResults[5].response, 'generateArqc4 decode, verify ARQC, Unrecognized Scheme ID');
    t.same(payshield.decode(testData[6].request, $meta, context).type, testResults[6].response, 'generateArqc4 decode, verify ARQC, MK parity error');

    t.end();
});
