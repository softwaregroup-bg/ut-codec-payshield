module.exports = (tap, lib) => {
    const method = 'exportKey';
    const inst = lib.mainLib.payshield;
    const testData = lib.config.test[`${method}Encode`];
    const testResults = lib.config.test[`${method}Encode`];
    const $meta = {
        method: method,
        mtid: 'request',
        trace: 4
    };
    const context = {
        trace: 4
    };
    tap.test(`${method}Encode`, (t) => {
        t.same(inst.encode(testData[0].request, $meta, context).toString('hex').toUpperCase(), testResults[0].response, 'exportKey encode, set 1');
        t.same(inst.encode(testData[1].request, $meta, context).toString('hex').toUpperCase(), testResults[1].response, 'exportKey encode, set 2');

        t.end();
    });
};
