module.exports = (tap, lib) => {
    const method = 'generateKey';
    const inst = lib.mainLib.payshield;
    const testData = lib.config.test[method];
    const testResults = lib.config.test[method];
    const $meta = {
        method: method,
        mtid: 'request',
        trace: 0
    };
    const context = {
        trace: 0
    };
    tap.test(method, (t) => {
        t.same(inst.encode(testData[0].request, $meta, context).toString('hex').toUpperCase(), testResults[0].response, 'generateKey simple');
        t.same(inst.encode(testData[1].request, $meta, context).toString('hex').toUpperCase(), testResults[1].response, 'generateKey under ZMK');

        t.end();
    });
};
