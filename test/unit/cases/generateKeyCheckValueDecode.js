module.exports = (tap, lib) => {
    const method = 'generateKeyCheckValue';
    const inst = lib.mainLib.payshield;
    const testData = lib.config.test[`${method}Decode`];
    const testResults = lib.config.test[`${method}Decode`];
    const $meta = {
        method: method,
        mtid: 'response',
        trace: 3
    };
    const context = {
        trace: 3
    };
    tap.test(`${method}Decode`, (t) => {
        t.same(inst.decode(testData[0].request, $meta, context), testResults[0].response, 'generateKeyCheckValue decode, kcv 6, success');
        t.same(inst.decode(testData[1].request, $meta, context), testResults[1].response, 'generateKeyCheckValue decode, kcv 16, success');
        t.same(inst.decode(testData[2].request, $meta, context).type, testResults[2].response, 'generateKeyCheckValue decode, key parity error');
        t.same(inst.decode(testData[3].request, $meta, context).type, testResults[3].response, 'generateKeyCheckValue decode, invalid key type code');
        t.same(inst.decode(testData[4].request, $meta, context).type, testResults[4].response, 'generateKeyCheckValue decode, invalid key length flag');
        t.same(inst.decode(testData[5].request, $meta, context).type, testResults[5].response, 'generateKeyCheckValue decode, invalid input data');

        t.end();
    });
};
