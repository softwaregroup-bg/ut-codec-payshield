//D:\Node\ut5\lib\ut\node_modules\bitsyntax>node node_modules\pegjs\bin\pegjs lib\grammar.pegjs lib\parser.js
var NDC = require('../').get('ndc');
var BitSyntax = require('bitsyntax');
var mocha = require('mocha');
var expect = require('chai').expect;
var assert = require('chai').assert;
var ndcComms = require('./ndc').tests;

var ndc = new NDC({
    validator: require('ut-validate').get('joi').validateNdc
    //logger: require('ut-log/ut-log-winston').log
});

function processBuffer(buffer, pattern, callback) {
    var buf = pattern(buffer);
    while(buf.frame) {
        callback(buf.frame);
        if (!buf.rest.length) break;
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
                message_class: '2',
                message_subclass: '2',
                luno: '001000001',
                status_descriptor: '9',
                status_information1: '',
                status_information2: '',
                status_information3: '',
                status_information4: '',
                status_information5: '',
                status_information6: '',
                status_information7: '',
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
                      message_class: '1',
                      message_subclass: '1',
                      luno: '001000001',
                      time_variant: '08115112',
                      trtf_mcn: '11',
                      track2: ';5859870012033949=15122011143857589?',
                      track3: '',
                      operation_code: '       A',
                      amount_entry: '',
                      pin_block: '66>69221>8?:5474',
                      buffer_b: '',
                      buffer_c: '',
                      data: '3BF9B5E6',
                      payload: msg.toString()
                });
                // Central->Terminal
                var buffer = ndc.encode({
                    _mtid: 'request',
                    _opcode: 'transaction_reply',
                    luno: '001',
                    next_state: '007',
                    type1_notes: '00',
                    type2_notes: '00',
                    type3_notes: '00',
                    type4_notes: '00',
                    sernum: '0000',
                    function: '5',
                    coordination: decodedMsg.trtf_mcn.charAt(1),
                    card_return: '0',
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
                    message_class: '1',
                    message_subclass: '1',
                    luno: '001000001',
                    time_variant: '08115119',
                    trtf_mcn: '12',
                    track2: ';5859870012033949=15122011143857589?',
                    track3: '',
                    operation_code: '  I  C B',
                    amount_entry: '',
                    pin_block: '',
                    buffer_b: '',
                    buffer_c: '',
                    data: '48973289',
                    payload: msg.toString()
                });
                // Central->Terminal
                var buffer = ndc.encode({
                    _mtid: 'request',
                    _opcode: 'transaction_reply',
                    luno: '001',
                    next_state: '133',
                    type1_notes: '00',
                    type2_notes: '00',
                    type3_notes: '00',
                    type4_notes: '00',
                    sernum: '0000',
                    function: '5066066PEUTSwitchCFC_066.BMP\[00;F4;80m[00;F4;80mF11013159529537I13014383698356L14012747875107',
                    coordination: decodedMsg.trtf_mcn.charAt(1),
                    card_return: '0',
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
                    message_class: '1',
                    message_subclass: '1',
                    luno: '001000001',
                    time_variant: '08115123',
                    trtf_mcn: '13',
                    track2: ';5859870012033949=15122011143857589?',
                    track3: '',
                    operation_code: ' II  C D',
                    amount_entry: '00000000',
                    pin_block: '66>69221>8?:5474',
                    buffer_b: '1',
                    buffer_c: '',
                    data: '',
                    payload: msg.toString()
                });
                // Central->Terminal
                var buffer = ndc.encode({
                    _mtid: 'request',
                    _opcode: 'transaction_reply',
                    luno: '001',
                    next_state: '055',
                    type1_notes: '00',
                    type2_notes: '00',
                    type3_notes: '00',
                    type4_notes: '00',
                    sernum: '0686',
                    function: '5046046PEUTSwitchCFC_046.BMP\[00;F4;80mHKIK3.03',
                    coordination: decodedMsg.trtf_mcn.charAt(1),
                    card_return: '0',
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
                    message_class: '1',
                    message_subclass: '1',
                    luno: '001000001',
                    time_variant: '08115123',
                    trtf_mcn: '13',
                    track2: ';5859870012033949=15122011143857589?',
                    track3: '',
                    operation_code: ' II  C D',
                    amount_entry: '00000000',
                    pin_block: '66>69221>8?:5474',
                    buffer_b: '1',
                    buffer_c: '',
                    data: '',
                    payload: msg.toString()
                });
                // Central->Terminal
                var buffer = ndc.encode({
                    _mtid: 'request',
                    _opcode: 'transaction_reply',
                    luno: '001',
                    next_state: '055',
                    type1_notes: '22',
                    type2_notes: '00',
                    type3_notes: '00',
                    type4_notes: '00',
                    sernum: '0686',
                    function: '5046046PEUTSwitchCFC_046.BMP\[00;F4;80mHKIK3.03',
                    coordination: decodedMsg.trtf_mcn.charAt(1),
                    card_return: '0',
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