module.exports = (tap, lib) => {
    const method = 'generateKeyCheckValue';
    const inst = lib.mainLib.payshield;
    const testData = lib.config.test[`${method}Encode`];
    const testResults = lib.config.test[`${method}Encode`];
    const $meta = {
        method: method,
        mtid: 'request',
        trace: 11
    };
    const context = {
        trace: 11
    };
    tap.test(`${method}Encode`, (t) => {
        t.same(inst.encode(testData[0].request, $meta, context).toString('hex').toUpperCase(), testResults[0].response, 'generateKeyCheckValue encode, set 1, keyType');
        t.same(inst.encode(testData[1].request, $meta, context).toString('hex').toUpperCase(), testResults[1].response, 'generateKeyCheckValue encode, set 2, keyType');
        t.same(inst.encode(testData[2].request, $meta, context).toString('hex').toUpperCase(), testResults[2].response, 'generateKeyCheckValue encode, set 1, keyTypeCode');

        t.end();
    });
};
