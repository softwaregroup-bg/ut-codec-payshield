module.exports = (tap, lib) => {
    const method = 'translatePinZpkZpk';
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
        t.same(inst.decode(testData[0].request, $meta, context), testResults[0].response, 'translatePinZpkZpk decode, set 1, success');
        t.same(inst.decode(testData[1].request, $meta, context), testResults[1].response, 'translatePinZpkZpk decode, set 2, success');
        t.same(inst.decode(testData[2].request, $meta, context).type, testResults[2].response, 'translatePinZpkZpk decode, source ZPK parity error');
        t.same(inst.decode(testData[3].request, $meta, context).type, testResults[3].response, 'translatePinZpkZpk decode, destination ZPK parity error');
        t.same(inst.decode(testData[4].request, $meta, context).type, testResults[4].response, 'translatePinZpkZpk decode, invalid PIN block format code');
        t.same(inst.decode(testData[5].request, $meta, context).type, testResults[5].response, 'translatePinZpkZpk decode, PIN block does not contain valid values');

        t.end();
    });
};
