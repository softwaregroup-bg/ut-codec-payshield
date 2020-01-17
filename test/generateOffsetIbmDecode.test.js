const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'generateOffsetIbm';
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
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'generateOffsetIbm decode, set 1, success');
    t.same(payshield.decode(testData[1].request, $meta, context), testResults[1].response, 'generateOffsetIbm decode, set 2, success');
    t.same(payshield.decode(testData[2].request, $meta, context).type, testResults[2].response, 'generateOffsetIbm decode, TPK or ZPK parity error');
    t.same(payshield.decode(testData[3].request, $meta, context).type, testResults[3].response, 'generateOffsetIbm decode, PVK parity error');
    t.same(payshield.decode(testData[4].request, $meta, context).type, testResults[4].response, 'generateOffsetIbm decode, decimalisation table error');
    t.same(payshield.decode(testData[5].request, $meta, context).type, testResults[5].response, 'generateOffsetIbm decode, invalid input data');

    t.end();
});
