module.exports = (tap, lib) => {
    const method = 'generateKey';
    const inst = lib.mainLib.payshield;
    const testData = lib.config.test[`${method}Decode`];
    const testResults = lib.config.test[`${method}Decode`];
    const $meta = {
        method: method,
        mtid: 'response',
        trace: 1
    };
    const context = {
        trace: 1
    };
    tap.test(`${method}Decode`, (t) => {
        t.same(inst.decode(testData[0].request, $meta, context), testResults[0].response, 'generateKey decode, simple, success');
        t.same(inst.decode(testData[1].request, $meta, context), testResults[1].response, 'generateKey decode, under ZMK, success');
        t.same(inst.decode(testData[2].request, $meta, context).type, testResults[2].response, 'generateKey decode, under ZMK, ZMK or TMK parity error');
        t.same(inst.decode(testData[3].request, $meta, context).type, testResults[3].response, 'generateKey decode, invalid input data');

        t.end();
    });
};
