const tap = require('tap');
const config = require('./config/test');
const {get, fetch, define} = require('ut-unittest/errorApi')();
const errorApi = { getError: get, fetchErrors: fetch, defineError: define };

const Payshield = require('../index');
const payshield = new Payshield(Object.assign({}, config, errorApi));

const method = 'notImplemented';
const testData = config.test[`${method}Decode`];
const testResults = config.test[`${method}Decode`];
const $meta = {
    method,
    mtid: 'request',
    trace: 44
};
const context = {
    trace: 44
};
tap.test(`${method}Decode`, async(t) => {
    try {
        payshield.decode(testData[0].request, $meta, context);
    } catch (e) {
        t.same(e.type, testResults[0].response, 'unknownResponseCode decode');
    }

    t.end();
});
