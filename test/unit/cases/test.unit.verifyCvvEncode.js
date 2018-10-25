const tap = require('tap');
const config = require('../config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../../../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'verifyCvv';
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
    t.same(payshield.encode(testData[0].request, $meta, context).toString('hex').toUpperCase(), testResults[0].response, 'verifyCvv encode, set 1');
    t.same(payshield.encode(testData[1].request, $meta, context).toString('hex').toUpperCase(), testResults[1].response, 'verifyCvv encode, set 2');

    t.end();
});
