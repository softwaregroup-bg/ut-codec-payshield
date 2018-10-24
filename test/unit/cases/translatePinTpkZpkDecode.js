module.exports = (tap, lib) => {
    const method = 'translatePinTpkZpk';
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
        t.same(inst.decode(testData[0].request, $meta, context), testResults[0].response, 'translatePinTpkZpk decode, set 1, success');
        t.same(inst.decode(testData[1].request, $meta, context), testResults[1].response, 'translatePinTpkZpk decode, set 2, success');
        t.same(inst.decode(testData[2].request, $meta, context).type, testResults[2].response, 'translatePinTpkZpk decode, source TPK parity error');
        t.same(inst.decode(testData[3].request, $meta, context).type, testResults[3].response, 'translatePinTpkZpk decode, destination ZPK parity error');
        t.same(inst.decode(testData[4].request, $meta, context).type, testResults[4].response, 'translatePinTpkZpk decode, invalid PIN block format code');
        t.same(inst.decode(testData[5].request, $meta, context).type, testResults[5].response, 'translatePinTpkZpk decode, PIN block does not contain valid values');

        t.end();
    });
};
