const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'generateArqc3';
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
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'generateArqc3 decode, verify ARQC');
    t.same(payshield.decode(testData[1].request, $meta, context), testResults[1].response, 'generateArqc3 decode, generate ARPC');
    t.same(payshield.decode(testData[2].request, $meta, context), testResults[2].response, 'generateArqc3 decode, verify MAC');
    t.same(payshield.decode(testData[3].request, $meta, context), testResults[3].response, 'generateArqc3 decode, verify ARQC && verify MAC && generate ARPC');
    t.same(payshield.decode(testData[4].request, $meta, context).type, testResults[4].response, 'generateArqc3 decode, ARQC/TC/AAC verification failed');
    t.same(payshield.decode(testData[5].request, $meta, context).type, testResults[5].response, 'generateArqc3 decode, mode = 3 or 4 but scheme ID ≠ 0');
    t.same(payshield.decode(testData[6].request, $meta, context).type, testResults[6].response, 'generateArqc3 decode, invalid mode value');
    t.same(payshield.decode(testData[7].request, $meta, context).type, testResults[7].response, 'generateArqc3 decode, unrecognized scheme ID');
    t.same(payshield.decode(testData[8].request, $meta, context).type, testResults[8].response, 'generateArqc3 decode, MK-AC parity error');
    t.same(payshield.decode(testData[9].request, $meta, context).type, testResults[9].response, 'generateArqc3 decode, MK-SMI parity error');

    t.end();
});
