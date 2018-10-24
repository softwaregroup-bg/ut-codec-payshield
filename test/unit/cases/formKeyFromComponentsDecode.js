module.exports = (tap, lib) => {
    const method = 'exportKey';
    const inst = lib.mainLib.payshield;
    const testData = lib.config.test[`${method}Decode`];
    const testResults = lib.config.test[`${method}Decode`];
    const $meta = {
        method: method,
        mtid: 'response',
        trace: 7
    };
    const context = {
        trace: 7
    };
    tap.test(`${method}Decode`, (t) => {
        t.same(inst.decode(testData[0].request, $meta, context), testResults[0].response, 'exportKey decode, set 1, success');
        t.same(inst.decode(testData[1].request, $meta, context), testResults[1].response, 'exportKey decode, set 2, success');
        t.same(inst.decode(testData[2].request, $meta, context).type, testResults[2].response, 'exportKey decode, component parity error');
        t.same(inst.decode(testData[3].request, $meta, context).type, testResults[3].response, 'exportKey decode, invalid number of components');
        t.same(inst.decode(testData[4].request, $meta, context).type, testResults[4].response, 'exportKey decode, invalid input data');

        t.end();
    });
};