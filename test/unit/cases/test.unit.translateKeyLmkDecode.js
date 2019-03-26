const tap = require('tap');
const config = require('../config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../../../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'translateKeyLmk';
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
    t.same(payshield.decode(testData[0].request, $meta, context), testResults[0].response, 'translateKeyLmk decode, success');
    t.same(payshield.decode(testData[1].request, $meta, context).type, testResults[1].response, 'translateKeyLmk decode, LMK key change storage is corrupted');
    t.same(payshield.decode(testData[2].request, $meta, context).type, testResults[2].response, 'translateKeyLmk decode, Key parity error');

    t.end();
});
