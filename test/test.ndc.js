//D:\Node\ut5\lib\ut\node_modules\bitsyntax>node node_modules\pegjs\bin\pegjs lib\grammar.pegjs lib\parser.js
var NDC = require('../').get('ndc');
var BitSyntax = require('bitsyntax');
//var mocha = require('mocha');
var expect = require('chai').expect;
var assert = require('chai').assert;
var ndcComms = require('./ndc/data').tests;

var ndc = new NDC(
    {
        //fieldSeparator: '\u001c',
        //messageFormatOverride: {}
    },
    require('ut-validate').get('joi').validateNdc
    //require logger
);

function processBuffer(buffer, pattern, callback) {
    var buf = pattern(buffer);
    while(buf.frame) {
        callback(buf.frame);
        if (!buf.rest.length) {
            break;
        }
        buffer = buf.rest;
    }
}

var framePattern = BitSyntax.matcher('len:16/integer, frame:len/binary, rest/binary');

describe('SolicitedMessage', function() {
    it('Terminal->Central Solicited Status Message', function() {
        processBuffer(ndcComms.solicited, framePattern, function(msg) {
            var decodedMsg = ndc.decode(msg);
            expect(decodedMsg).to.be.a('object');
            assert.deepEqual(decodedMsg, {
                _mtid: 'response',
                _opcode: 'solicited_status',
                messageClass: '2',
                messageSubclass: '2',
                luno: '001000001',
                statusDescriptor: '9',
                statusInformation1: '',
                statusInformation2: '',
                statusInformation3: '',
                statusInformation4: '',
                statusInformation5: '',
                statusInformation6: '',
                statusInformation7: '',
                payload: msg.toString()
            })
        });
    });
});

describe('TransactionReply:Terminal->Central->Terminal', function() {
    describe('OperationCodeA', function() {
        it('Terminal->Central->Terminal Transaction Reply with Operation Code A', function() {
            processBuffer(ndcComms.opCodeA, framePattern, function(msg) {
                // Terminal->Central
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.deepEqual(decodedMsg, {
                      _mtid: 'notification',
                      _opcode: 'transaction',
                      messageClass: '1',
                      messageSubclass: '1',
                      luno: '001000001',
                      timeVariant: '08115112',
                      trtfMcn: '11',
                      track2: ';5859870012033949=15122011143857589?',
                      track3: '',
                      operationCode: '       A',
                      amountEntry: '',
                      pinBlock: '66>69221>8?:5474',
                      bufferB: '',
                      bufferC: '',
                      data: '3BF9B5E6',
                      payload: msg.toString()
                });
                // Central->Terminal
                var buffer = ndc.encode({
                    _mtid: 'request',
                    _opcode: 'transaction_reply',
                    luno: '001',
                    nextState: '007',
                    type1Notes: '00',
                    type2Notes: '00',
                    type3Notes: '00',
                    type4Notes: '00',
                    sernum: '0000',
                    function: '5',
                    coordination: decodedMsg.trtfMcn.charAt(1),
                    cardReturn: '0',
                    printer: '1CARD: 5859 8700 1203 3949'
                });
                var pattern = BitSyntax.parse('size:16, bin:size/binary');
                var out1 = BitSyntax.build(pattern, {
                    size: buffer.length,
                    bin: new Buffer(buffer)
                });
                var out2 = BitSyntax.build(pattern, {
                    size: ndcComms.opCodeAResp.length,
                    bin: new Buffer(ndcComms.opCodeAResp)
                });
                expect(out1.length).to.be.equal(out2.length);
                assert.deepEqual(out1, out2);
            });
        });
    });
    describe('OperationCodeB', function() {
        it('Terminal->Central->Terminal Transaction Reply with Operation Code B', function() {
            processBuffer(ndcComms.opCodeB, framePattern, function(msg) {
                // Terminal->Central
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.deepEqual(decodedMsg, {
                    _mtid: 'notification',
                    _opcode: 'transaction',
                    messageClass: '1',
                    messageSubclass: '1',
                    luno: '001000001',
                    timeVariant: '08115119',
                    trtfMcn: '12',
                    track2: ';5859870012033949=15122011143857589?',
                    track3: '',
                    operationCode: '  I  C B',
                    amountEntry: '',
                    pinBlock: '',
                    bufferB: '',
                    bufferC: '',
                    data: '48973289',
                    payload: msg.toString()
                });
                // Central->Terminal
                var buffer = ndc.encode({
                    _mtid: 'request',
                    _opcode: 'transaction_reply',
                    luno: '001',
                    nextState: '133',
                    type1Notes: '00',
                    type2Notes: '00',
                    type3Notes: '00',
                    type4Notes: '00',
                    sernum: '0000',
                    function: '5066066PEUTSwitchCFC_066.BMP\[00;F4;80m[00;F4;80mF11013159529537I13014383698356L14012747875107',
                    coordination: decodedMsg.trtfMcn.charAt(1),
                    cardReturn: '0',
                    printer: '0'
                });
                var pattern = BitSyntax.parse('size:16, bin:size/binary');
                var out1 = BitSyntax.build(pattern, {
                    size: buffer.length,
                    bin: new Buffer(buffer)
                });
                var out2 = BitSyntax.build(pattern, {
                    size: ndcComms.opCodeBResp.length,
                    bin: new Buffer(ndcComms.opCodeBResp)
                });
                expect(out1.length).to.be.equal(out2.length);
                assert.deepEqual(out1, out2);
            });
        });
    });
    describe('OperationCodeD', function() {
        it('Terminal->Central->Terminal Transaction Reply with Operation Code D', function() {
            processBuffer(ndcComms.opCodeD, framePattern, function(msg) {
                // Terminal->Central
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.deepEqual(decodedMsg, {
                    _mtid: 'notification',
                    _opcode: 'transaction',
                    messageClass: '1',
                    messageSubclass: '1',
                    luno: '001000001',
                    timeVariant: '08115123',
                    trtfMcn: '13',
                    track2: ';5859870012033949=15122011143857589?',
                    track3: '',
                    operationCode: ' II  C D',
                    amountEntry: '00000000',
                    pinBlock: '66>69221>8?:5474',
                    bufferB: '1',
                    bufferC: '',
                    data: '',
                    payload: msg.toString()
                });
                // Central->Terminal
                var buffer = ndc.encode({
                    _mtid: 'request',
                    _opcode: 'transaction_reply',
                    luno: '001',
                    nextState: '055',
                    type1Notes: '00',
                    type2Notes: '00',
                    type3Notes: '00',
                    type4Notes: '00',
                    sernum: '0686',
                    function: '5046046PEUTSwitchCFC_046.BMP\[00;F4;80mHKIK3.03',
                    coordination: decodedMsg.trtfMcn.charAt(1),
                    cardReturn: '0',
                    printer: '3[000p[040q(I\n\n\n\n\n\nBALANCE INQUIRY\n\nDATE\t\tTIME\tSEQ#\n\n02-12-2014 14:53:28\t0686\n\nCARD: 5859XXXXXXXX3949\nACCOUNT: 1013159529537\n\nATM ID: Accra\nTRANSACTION#: 8067\n\nAVAILABLE: 3.03'
                });
                var pattern = BitSyntax.parse('size:16, bin:size/binary');
                var out1 = BitSyntax.build(pattern, {
                    size: buffer.length,
                    bin: new Buffer(buffer)
                });
                var out2 = BitSyntax.build(pattern, {
                    size: ndcComms.opCodeDResp.length,
                    bin: new Buffer(ndcComms.opCodeDResp)
                });
                expect(out1.length).to.be.equal(out2.length);
                assert.deepEqual(out1, out2);
            });
        });
    });
    describe('NegativeOperationCodeD', function() {
        it('Terminal->Central->Terminal Transaction Reply with Operation Code D Negative Test Case', function() {
            processBuffer(ndcComms.opCodeD, framePattern, function(msg) {
                // Terminal->Central
                var decodedMsg = ndc.decode(msg);
                expect(decodedMsg).to.be.a('object');
                assert.notDeepEqual(decodedMsg, {
                    _mtid: 'notification ',
                    _opcode: 'transaction',
                    messageClass: '1',
                    messageSubclass: '1',
                    luno: '001000001',
                    timeVariant: '08115123',
                    trtfMcn: '13',
                    track2: ';5859870012033949=15122011143857589?',
                    track3: '',
                    operationCode: ' II  C D',
                    amountEntry: '00000000',
                    pinBlock: '66>69221>8?:5474',
                    bufferB: '1',
                    bufferC: '',
                    data: '',
                    payload: msg.toString()
                });
                // Central->Terminal
                var buffer = ndc.encode({
                    _mtid: 'request',
                    _opcode: 'transaction_reply',
                    luno: '001',
                    nextState: '055',
                    type1Notes: '22',
                    type2Notes: '00',
                    type3Notes: '00',
                    type4Notes: '00',
                    sernum: '0686',
                    function: '5046046PEUTSwitchCFC_046.BMP\[00;F4;80mHKIK3.03',
                    coordination: decodedMsg.trtfMcn.charAt(1),
                    cardReturn: '0',
                    printer: '3[000p[040q(I\n\n\n\n\n\nBALANCE INQUIRY\n\nDATE\t\tTIME\tSEQ#\n\n02-12-2014 14:53:28\t0686\n\nCARD: 5859XXXXXXXX3949\nACCOUNT: 1013159529537\n\nATM ID: Accra\nTRANSACTION#: 8067\n\nAVAILABLE: 3.03'
                });
                var pattern = BitSyntax.parse('size:16, bin:size/binary');
                var out1 = BitSyntax.build(pattern, {
                    size: buffer.length,
                    bin: new Buffer(buffer)
                });
                var out2 = BitSyntax.build(pattern, {
                    size: ndcComms.opCodeDResp.length,
                    bin: new Buffer(ndcComms.opCodeDResp)
                });
                expect(out1.length).to.be.equal(out2.length);
                assert.notDeepEqual(out1, out2);
            });
        });
    });
});