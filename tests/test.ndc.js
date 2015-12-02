function testme(bdd, assert, expect, BitSyntax, NDC, validators, samples) {
    function processBuffer(buffer, pattern, callback) {
        var buf = pattern(buffer);
        while (buf.frame) {
            callback(buf.frame);
            if (!buf.rest.length) {
                break;
            }
            buffer = buf.rest;
        }
    }

    samples = samples.tests;
    var ndc = new NDC({
        fieldSeparator: '\u001c',
        messageFormatOverride: {}
    }, validators.get('joi').validateNdc);

    var framePattern = BitSyntax.matcher('len:16/integer, frame:len/binary, rest/binary');

    bdd.describe('NDC', function() {
        bdd.before(function() {
            console.log('Start NDC protocol testing...\n');
        });
        bdd.after(function() {
            console.log('\nFinished testing NDC protocol...\n');
        });
        bdd.it('solicitedStatus: should succeed', function() {
            processBuffer(samples.solicited, framePattern, function(msg) {
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.deepEqual(decodedMsg, {
                    $$: {mtid: 'response', opcode: 'solicitedStatus'}, messageClass: '2', messageSubclass: '2', luno: '001000001',
                    statusDescriptor: '9', statusInformation1: '', statusInformation2: '', statusInformation3: '', statusInformation4: '',
                    statusInformation5: '', statusInformation6: '', statusInformation7: '', payload: msg.toString()
                });
            });
        });
        bdd.it('solicitedStatus: should fail', function() {
            processBuffer(samples.solicited, framePattern, function(msg) {
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.notDeepEqual(decodedMsg, {
                    $$: {mtid: 'response', opcode: 'solicitedStatus'}, messageSubclass: '2', luno: '001000001',
                    statusDescriptor: '9', statusInformation1: '', statusInformation2: '', statusInformation3: '', statusInformation4: '',
                    statusInformation5: '', statusInformation6: '', statusInformation7: '', payload: msg.toString()
                });
            });
        });
        bdd.it('transactionReply(opCode=A): should succeed', function() {
            processBuffer(samples.opCodeA, framePattern, function(msg) {
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.deepEqual(decodedMsg, {
                    $$: {mtid: 'notification', opcode: 'transaction'}, messageClass: '1', messageSubclass: '1', luno: '001000001', timeVariant: '08115112',
                    trtfMcn: '11', track2: ';5859870012033949=15122011143857589?', track3: '', operationCode: '       A', amountEntry: '',
                    pinBlock: '66>69221>8?:5474', bufferB: '', bufferC: '', data: '3BF9B5E6', payload: msg.toString()
                });
                var buffer = ndc.encode({
                    $$: {mtid: 'request', opcode: 'transactionReply'}, luno: '001', nextState: '007', type1Notes: '00', type2Notes: '00',
                    type3Notes: '00', type4Notes: '00', sernum: '0000', function: '5', coordination: decodedMsg.trtfMcn.charAt(1),
                    cardReturn: '0', printer: '1CARD: 5859 8700 1203 3949'
                });
                var pattern = BitSyntax.parse('size:16, bin:size/binary');
                var out1 = BitSyntax.build(pattern, {
                    size: buffer.length,
                    bin: new Buffer(buffer)
                });
                var out2 = BitSyntax.build(pattern, {
                    size: samples.opCodeAResp.length,
                    bin: new Buffer(samples.opCodeAResp)
                });
                expect(out1.length).to.be.equal(out2.length);
                assert.deepEqual(out1.toString(), out2.toString());
            });
        });
        bdd.it('transactionReply(opCode=A): should fail', function() {
            processBuffer(samples.opCodeA, framePattern, function(msg) {
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.deepEqual(decodedMsg, {
                    $$: {mtid: 'notification', opcode: 'transaction'}, messageClass: '1', messageSubclass: '1', luno: '001000001', timeVariant: '08115112',
                    trtfMcn: '11', track2: ';5859870012033949=15122011143857589?', track3: '', operationCode: '       A', amountEntry: '',
                    pinBlock: '66>69221>8?:5474', bufferB: '', bufferC: '', data: '3BF9B5E6', payload: msg.toString()
                });
                var buffer = ndc.encode({
                    $$: {mtid: 'request', opcode: 'transactionReply'}, luno: '001', nextState: '007', type1Notes: '00', type2Notes: '00',
                    type3Notes: '00', type4Notes: '00', sernum: '0000', function: '5', coordination: decodedMsg.trtfMcn.charAt(1),
                    cardReturn: '0', printer: '1CARD: 5859 8700 1203 3949'
                });
                try {
                    var pattern = BitSyntax.parse('size:16, something is wrong with the pattern :)');
                    var out1 = BitSyntax.build(pattern, {
                        size: buffer.length,
                        bin: new Buffer(buffer)
                    });
                    var out2 = BitSyntax.build(pattern, {
                        size: samples.opCodeAResp.length,
                        bin: new Buffer(samples.opCodeAResp)
                    });
                    expect(out1.length).to.be.equal(out2.length);
                    assert.deepEqual(out1.toString(), out2.toString());
                } catch (e) {
                    expect(e.message.replace(/"/g, '')).to.be.equal('Expected , or [ \\t\\n] but i found.');
                }
            });
        });
        bdd.it('transactionReply(opCode=B): should succeed', function() {
            processBuffer(samples.opCodeB, framePattern, function(msg) {
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.deepEqual(decodedMsg, {
                    $$: {mtid: 'notification', opcode: 'transaction'}, messageClass: '1', messageSubclass: '1', luno: '001000001',
                    timeVariant: '08115119', trtfMcn: '12', track2: ';5859870012033949=15122011143857589?', track3: '', operationCode: '  I  C B',
                    amountEntry: '', pinBlock: '', bufferB: '', bufferC: '', data: '48973289', payload: msg.toString()
                });
                var buffer = ndc.encode({
                    $$: {mtid: 'request', opcode: 'transactionReply'}, luno: '001', nextState: '133', type1Notes: '00', type2Notes: '00', type3Notes: '00',
                    type4Notes: '00', sernum: '0000',
                    function: '5066066PEUTSwitchCFC_066.BMP\[00;F4;80m[00;F4;80mF11013159529537I13014383698356L14012747875107',
                    coordination: decodedMsg.trtfMcn.charAt(1), cardReturn: '0', printer: '0'
                });
                var pattern = BitSyntax.parse('size:16, bin:size/binary');
                var out1 = BitSyntax.build(pattern, {
                    size: buffer.length,
                    bin: new Buffer(buffer)
                });
                var out2 = BitSyntax.build(pattern, {
                    size: samples.opCodeBResp.length,
                    bin: new Buffer(samples.opCodeBResp)
                });
                expect(out1.length).to.be.equal(out2.length);
                assert.deepEqual(out1.toString(), out2.toString());
            });
        });
        bdd.it('transactionReply(opCode=B): should fail', function() {
            try {
                processBuffer(samples.opCodeB, framePattern, function(msg) {
                    var decodedMsg = ndc.decode(msg);
                    expect(decodedMsg).to.be.a('object');
                    assert.deepEqual(decodedMsg, {
                        $$: {mtid: 'notification', opcode: 'transaction'}, messageClass: '1', messageSubclass: '1', luno: '001000001',
                        timeVariant: '08115119', trtfMcn: '12', track2: ';5859870012033949=15122011143857589?', track3: '', operationCode: '  I  C B',
                        amountEntry: '', pinBlock: '', bufferB: '', bufferC: '', data: '48973289', payload: msg.toString()
                    });
                    var buffer = ndc.encode({
                        $$: {mtid: '', opcode: ''}, luno: '001', nextState: '133', type1Notes: '00', type2Notes: '00', type3Notes: '00',
                        type4Notes: '00', sernum: '0000',
                        function: '5066066PEUTSwitchCFC_066.BMP\[00;F4;80m[00;F4;80mF11013159529537I13014383698356L14012747875107',
                        coordination: decodedMsg.trtfMcn.charAt(1), cardReturn: '0', printer: '0'
                    });
                    var pattern = BitSyntax.parse('size:16, bin:size/binary');
                    var out1 = BitSyntax.build(pattern, {
                        size: buffer.length,
                        bin: new Buffer(buffer)
                    });
                    var out2 = BitSyntax.build(pattern, {
                        size: samples.opCodeBResp.length,
                        bin: new Buffer(samples.opCodeBResp)
                    });
                    expect(out1.length).to.be.equal(out2.length);
                    assert.deepEqual(out1.toString(), out2.toString());
                });
            } catch (e) {
                expect(e.message).to.be.equal('child "&#x24;&#x24;" fails because [child "mtid" fails because ["mtid" is not allowed to be empty]]');
            }
        });
        bdd.it('transactionReply(opCode=D): should succeed', function() {
            processBuffer(samples.opCodeD, framePattern, function(msg) {
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.deepEqual(decodedMsg, {
                    $$: {mtid: 'notification', opcode: 'transaction'}, messageClass: '1', messageSubclass: '1', luno: '001000001',
                    timeVariant: '08115123', trtfMcn: '13', track2: ';5859870012033949=15122011143857589?', track3: '',
                    operationCode: ' II  C D', amountEntry: '00000000', pinBlock: '66>69221>8?:5474', bufferB: '1',
                    bufferC: '', data: '', payload: msg.toString()
                });
                var buffer = ndc.encode({
                    $$: {mtid: 'request', opcode: 'transactionReply'}, luno: '001', nextState: '055', type1Notes: '00', type2Notes: '00',
                    type3Notes: '00', type4Notes: '00', sernum: '0686', function: '5046046PEUTSwitchCFC_046.BMP\[00;F4;80mHKIK3.03',
                    coordination: decodedMsg.trtfMcn.charAt(1), cardReturn: '0',
                    printer: '3[000p[040q(I\n\n\n\n\n\nBALANCE INQUIRY\n\nDATE\t\tTIME\tSEQ#\n\n02-12-2014 14:53:28\t0686\n\nCARD: 5859XXXXXXXX3949\nACCOUNT: 1013159529537\n\nATM ID: Accra\nTRANSACTION#: 8067\n\nAVAILABLE: 3.03'
                });
                var pattern = BitSyntax.parse('size:16, bin:size/binary');
                var out1 = BitSyntax.build(pattern, {
                    size: buffer.length,
                    bin: new Buffer(buffer)
                });
                var out2 = BitSyntax.build(pattern, {
                    size: samples.opCodeDResp.length,
                    bin: new Buffer(samples.opCodeDResp)
                });
                expect(out1.length).to.be.equal(out2.length);
                assert.deepEqual(out1.toString(), out2.toString());
            });
        });
        bdd.it('transactionReply(opCode=D): should fail', function() {
            processBuffer(samples.opCodeD, framePattern, function(msg) {
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.notDeepEqual(decodedMsg, {
                    $$: {mtid: 'notification', opcode: 'transactions'}, messageClass: '1', messageSubclass: '1', luno: '001000001',
                    timeVariant: '08115123', trtfMcn: '13', track2: ';5859870012033949=15122011143857589?', track3: '',
                    operationCode: ' II  C D', amountEntry: '00000000', pinBlock: '66>69221>8?:5474', bufferB: '1',
                    bufferC: '', data: '', payload: msg.toString()
                });
                var buffer = ndc.encode({
                    $$: {mtid: 'request', opcode: 'transactionReply'}, luno: '001', nextState: '055', type1Notes: '00', type2Notes: '00',
                    type3Notes: '00', type4Notes: '00', sernum: '0686', function: '5046046PEUTSwitchCFC_046.BMP\[00;F4;80mHKIK3.03',
                    coordination: decodedMsg.trtfMcn.charAt(1), cardReturn: '0',
                    printer: '3[000p[040q(I\n\n\n\n\n\nBALANCE INQUIRY\n\nDATE\t\tTIME\tSEQ#\n\n02-12-2014 14:53:28\t0686\n\nCARD: 5859XXXXXXXX3949\nACCOUNT: 1013159529537\n\nATM ID: Accra\nTRANSACTION#: 8067\n\nAVAILABLE: 3.03'
                });
                var pattern = BitSyntax.parse('size:16, bin:size/binary');
                var out1 = BitSyntax.build(pattern, {
                    size: buffer.length,
                    bin: new Buffer(buffer)
                });
                var out2 = BitSyntax.build(pattern, {
                    size: samples.opCodeDResp.length,
                    bin: new Buffer(samples.opCodeDResp)
                });
                expect(out1.length).to.be.equal(out2.length);
                assert.deepEqual(out1.toString(), out2.toString());
            });
        });
    });
};

testme();
