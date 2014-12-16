var mocha = require('mocha');
var assert = require('assert');
var PayshieldParser = require('../payshield.js');


encode_test_data = {
    echo: {
        data: { _opcode: 'echo', _trace: 234, msgsize: '4', mac_message: 'ping' },
        buf: new Buffer("000234B20004ping")
    },

    generate_key: {
        data: { _opcode: 'generate_key', _trace: 234, mode: '0', key_type: '003', key_scheme: 'U' },
        buf: new Buffer("000234A00003U")
    },
    
    generate_key_tmk: {
        data: {},
        buf: new Buffer("")
    },
    
    generate_tpk: {
        data: { _opcode: 'generate_tpk', _trace: 234, tmk: 'UB15E645AFC1A3F4444A48D58EE983BD3', key_scheme: 'X', key_scheme1: '0'},
        buf: new Buffer("000234HCUB15E645AFC1A3F4444A48D58EE983BD3;X00")
    },
    
    generate_tak: {
        data: { _opcode: 'generate_tak', _trace: 234, tmk: 'UB15E645AFC1A3F4444A48D58EE983BD3', key_scheme: 'U', key_scheme1: '0'},
        buf: new Buffer("000234HAUB15E645AFC1A3F4444A48D58EE983BD3;U00")
    },
    
    generate_mac: {
        data: { _opcode: 'generate_mac', _trace: 234, mac_mode: '0', mac_input_format: '2', mac_algorithm: '03', mac_padding_method: '0', mac_key_type: '003', mac_key: 'U78C6FD3889386436C41F3874A5DE1F48', msgsize: 8, mac_message: 'testtesttest' },
        buf: new Buffer("000234M602030003U78C6FD3889386436C41F3874A5DE1F480008testtest")
    },
    
    verify_mac: {
        data: {_opcode: 'verify_mac', _trace: 234, mac_mode: '0', mac_input_format: '2', mac_algorithm: '03', mac_padding_method: '0', mac_key_type: '003', mac_key: 'U78C6FD3889386436C41F3874A5DE1F48', msgsize: 8
            , mac_message: 'testtest', mac: '341C677E'},
        buf: new Buffer("000234M802030003U78C6FD3889386436C41F3874A5DE1F480008testtest341C677E")
    },
    
    form_key: {
        data: { _opcode: 'form_key', _trace: 234, number_of_components: '2', key_type: '003', key_scheme: 'U', key_component1: 'U78C6FD3889386436C41F3874A5DE1F48', key_component2: 'U78C6FD3889386436C41F3874A5DE1F48'},
        buf: new Buffer("000234A42003UU78C6FD3889386436C41F3874A5DE1F48U78C6FD3889386436C41F3874A5DE1F48")
    },
    
    generate_keycheckvalue: {
        data: { _opcode: 'generate_keycheckvalue', _trace: 234, key_type_code: '02', key_length_flag: '1', keyA32: 'X614BCB4CE30FE4FF13C9CFDD180AA182'},
        buf: new Buffer("000234BU021X614BCB4CE30FE4FF13C9CFDD180AA182")
    },
    
    derive_pin_ibm: {
        data: {_opcode: 'derive_pin_ibm', _trace: 234, pvk: 'X614BCB4CE30FE4FF13C9CFDD180AA182', offset: '0000FFFFFFFF', check_length: '4', account: '123456789012', decimalisation_table: '1234567812345678',
            pin_validation_data: '23456N543210' },
        buf: new Buffer("000234EEX614BCB4CE30FE4FF13C9CFDD180AA1820000FFFFFFFF04123456789012123456781234567823456N543210")
    },
    
    generate_pin: {
        data: { _opcode: 'generate_pin', _trace: 234, account: '123456789012', check_length: 4},
        buf: new Buffer("000234JA12345678901204")
    },
    
    generate_offset_ibm: {
        data: {_opcode: 'generate_offset_ibm', _trace: 234, key_type: '002', keyA32: 'X614BCB4CE30FE4FF13C9CFDD180AA182', pvk: 'X614BCB4CE30FE4FF13C9CFDD180AA182', pin_block: '0592789FFFEDCBA9', pin_block_format: '01', 
            check_length: 4, account: '123456789012', decimalisation_table: '1234567812345678', pin_validation_data: '23456N543210'},
        buf: new Buffer("000234BK002X614BCB4CE30FE4FF13C9CFDD180AA182X614BCB4CE30FE4FF13C9CFDD180AA1820592789FFFEDCBA90104123456789012123456781234567823456N543210")
    },
    
    verify_term_pin_ibm: {
        data: {_opcode: 'verify_term_pin_ibm', _trace: 234, tpk: 'X725D74BD3FDC0AA910EB213487423466', pvk: 'X614BCB4CE30FE4FF13C9CFDD180AA182', maximum_pin_length: 12, pin_block: '0592789FFFEDCBA9', pin_block_format: '01', check_length: 4
            , account: '123456789012', decimalisation_table: '1234567812345678', pin_validation_data: '23456N543210', offset: 'FFFF34523421'},
        buf: new Buffer("000234DAX725D74BD3FDC0AA910EB213487423466X614BCB4CE30FE4FF13C9CFDD180AA182120592789FFFEDCBA90104123456789012123456781234567823456N543210FFFF34523421")
    },

    import_key: {
        data: { _opcode: 'import_key', _trace: 234, key_type: '001', zmk: 'U71979DEB8587E2734F1E99D5DCAEF9AC', keyA32: 'U482C4E722BB0CF1845E1E5BD16310119', key_scheme: 'U'},
        buf: new Buffer("000234A6001U71979DEB8587E2734F1E99D5DCAEF9ACU482C4E722BB0CF1845E1E5BD16310119U")
    },

    translate_tpk_zpk: {
        data: { _opcode: 'translate_tpk_zpk', _trace: 234, source_tpk: 'U8463435FC4B4DAA0C49025272C29B12C', destination_zpk: 'U1EF828AA8F6B80EB83E19FBC373F3A85', source_pin_block: '6428EB94035AF53B', source_pin_block_format: '01', destination_pin_block_format: '01', account: '550000025321' },
        buf: new Buffer("000234CAU8463435FC4B4DAA0C49025272C29B12CU1EF828AA8F6B80EB83E19FBC373F3A85126428EB94035AF53B0101550000025321")
    },

    print_pin: {
        data: { _opcode: 'print_pin', _trace: 234, document_type: 'A', account: '123456789012', pin: '0592789FFFEDCBA9', print_fields: '1'},
        buf: new Buffer("000234PEA1234567890120592789FFFEDCBA91")
    },

    print_format: {
        data: { _opcode: 'print_format', _trace: 234, print_fields: '1'},
        buf: new Buffer("000234PA1")
    },

    translate_tpk_lmk: {
        data: { _opcode: 'translate_tpk_lmk', _trace: 234, source_tpk: 'U8463435FC4B4DAA0C49025272C29B12C', source_pin_block: '6428EB94035AF53B', source_pin_block_format: '01', account: '550000025321'},
        buf: new Buffer("000234JCU8463435FC4B4DAA0C49025272C29B12C6428EB94035AF53B01550000025321")
    },

    translate_zpk_lmk: {
        data: { _opcode: 'translate_zpk_lmk', _trace: 234, source_zpk: 'U1EF828AA8F6B80EB83E19FBC373F3A85', source_pin_block: '91DDDA0A7C12CFAA', source_pin_block_format: '01', account: '550000025321'},
        buf: new Buffer("000234JEU1EF828AA8F6B80EB83E19FBC373F3A8591DDDA0A7C12CFAA01550000025321")
    },

    generate_offset_ibm_lmk: {
        data: {_opcode: 'generate_offset_ibm_lmk', _trace: 234, pvk: 'X614BCB4CE30FE4FF13C9CFDD180AA182', pin: '07692', check_length: 4, account: '123456789012', decimalisation_table: '1234567812345678'
            , pin_validation_data: '23456N543210'},
        buf: new Buffer("000234DEX614BCB4CE30FE4FF13C9CFDD180AA1820769204123456789012123456781234567823456N543210")
    },
    
};

decode_test_data = {

    echo_resp: {
        data: { errorcode: '00', mac_message: 'ping', headerNo: '000234', headerCode: 'B3', mtid: 'discard', opcode: 'echo_resp'},
        buf: new Buffer("000234B300ping")
    },

    generate_key_resp: {
        data: { errorcode: '00', keyA32: 'UD1D3196BE8CE804392F764CDC2ABD75E', key_check_value: 'F232C4', headerNo: '000234', headerCode: 'A1',
            mtid: 'response', opcode: 'generate_key_resp'
        },
        buf: new Buffer("000234A100UD1D3196BE8CE804392F764CDC2ABD75EF232C4")
    },

    generate_tpk_resp: {
        data: {errorcode: '00',
            tpk: 'X6F6FFAD40F6B6B72A5764A5DE9AB7FB5',
            keyA32: '3E24796511C304FC99935DD4A24C9F1F',
            headerNo: '000234',
            headerCode: 'HD',
            mtid: 'response',
            opcode: 'generate_tpk_resp'
        },
        buf: new Buffer("000234HD00X6F6FFAD40F6B6B72A5764A5DE9AB7FB53E24796511C304FC99935DD4A24C9F1F")
    },

    generate_tak_resp: {
        data: {errorcode: '00',
            tpk: 'UFC66FDA4146813DDD555649C8ED2C6DE',
            keyA32: '86CD971D58CB0CF630C6796F56EBEDA4',
            headerNo: '000234',
            headerCode: 'HB',
            mtid: 'response',
            opcode: 'generate_tak_resp'
        },
        buf: new Buffer("000234HB00UFC66FDA4146813DDD555649C8ED2C6DE86CD971D58CB0CF630C6796F56EBEDA4")
    },

    generate_mac_resp: {
        data: {errorcode: '00', mac: '0008341C677E', headerNo: '000234', headerCode: 'M7', mtid: 'response', opcode: 'generate_mac_resp'},
        buf: new Buffer("000234M7000008341C677E")
    },

    verify_mac_resp: {
        data: {errorcode: '00', headerNo: '000234', headerCode: 'M9', mtid: 'response', opcode: 'verify_mac_resp'},
        buf: new Buffer("000234M900")
    },

    form_key_resp: {
        data: {errorcode: '00', keyA32: 'U5D3BF8844DC17252864ABBF21BF42999', key_check_value: '000000', headerNo: '000234', headerCode: 'A5', mtid: 'response', opcode: 'form_key_resp'},
        buf: new Buffer("000234A500U5D3BF8844DC17252864ABBF21BF42999000000")
    },

    generate_keycheckvalue_resp: {
        data: {errorcode: '00', key_check_value16: '1519597E659476B0', headerNo: '000234', headerCode: 'BV', mtid: 'response',opcode: 'generate_keycheckvalue_resp'},
        buf: new Buffer("000234BV001519597E659476B0")
    },

    derive_pin_ibm_resp: {
        data: {errorcode: '00', pin: '00034', headerNo: '000234', headerCode: 'EF', mtid: 'response',opcode: 'derive_pin_ibm_resp'},
        buf: new Buffer("000234EF0000034")
    },

    generate_pin_resp: {
        data: {errorcode: '00', pin: '03218', headerNo: '000234', headerCode: 'JB', mtid: 'response', opcode: 'generate_pin_resp'},
        buf: new Buffer("000234JB0003218")
    },

    generate_offset_ibm_resp: {
        data: {},
        buf: new Buffer("")
    },

    verify_term_pin_ibm_resp: {
        data: {errorcode: '10', rest: new Buffer(0), headerNo: '000234', headerCode: 'DB', mtid: 'response', opcode: 'verify_term_pin_ibm_resp'},
        buf: new Buffer("000234DB10")
    },

    import_key_resp: {
        data: {errorcode: '00', keyA32: 'U0E07CDC0161A0DE3B5AA44DF227EC9DE', key_check_value: 'ABDEBC', headerNo: '000234', headerCode: 'A7', mtid: 'response', opcode: 'import_key_resp'},
        buf: new Buffer("000234A700U0E07CDC0161A0DE3B5AA44DF227EC9DEABDEBC")
    },

    translate_tpk_zpk_resp: {
        data: {errorcode: '00',
            check_length: '04',
            destination_pin_block: '91DDDA0A7C12CFAA',
            pin_block_format: '01',
            headerNo: '000234',
            headerCode: 'CB',
            mtid: 'response',
            opcode: 'translate_tpk_zpk_resp'
        },
        buf: new Buffer("000234CB000491DDDA0A7C12CFAA01")
    },
    
    print_pin_start: {
        data: {errorcode: '00', headerNo: '000234', headerCode: 'PF', mtid: 'notification', opcode: 'print_pin_start'},
        buf: new Buffer("000234PF00")
    },

    print_pin_resp: {
        data: { errorcode: '00', headerNo: '000234', headerCode: 'PZ', mtid: 'response', opcode: 'print_pin_resp'},
        buf: new Buffer("000234PZ00")
    },

    print_format_resp: {
        data: {errorcode: '00', headerNo: '000234', headerCode: 'PB', mtid: 'response', opcode: 'print_format_resp'},
        buf: new Buffer("000234PB00")
    },

    translate_tpk_lmk_resp: {
        data: {errorcode: '00', pin: '01234', headerNo: '000234', headerCode: 'JD', mtid: 'response', opcode: 'translate_tpk_lmk_resp'},
        buf: new Buffer("000234JD0001234")
    },

    translate_zpk_lmk_resp: {
        data: {errorcode: '00', pin: '01234', headerNo: '000234', headerCode: 'JF', mtid: 'response', opcode: 'translate_zpk_lmk_resp'},
        buf: new Buffer("000234JF0001234")
    },
 
    generate_offset_ibm_lmk_resp: {
        data: {errorcode: '00', offset: '7668FFFFFFFF', headerNo: '000234', headerCode: 'DF', mtid: 'response', opcode: 'generate_offset_ibm_lmk_resp'},
        buf: new Buffer("000234DF007668FFFFFFFF")
    }
};

var log = function () { }
log.info = function (v) {  };
log.debug = function (v) {  };


describe('payshield messages', function () {

    var fieldFormat = {};
    var messageFormat = {};
    
    it(' ##Initial template parsing', function () {
        
        var parser = new PayshieldParser({ headerFormat: "6/string-left-zero", fieldFormat: fieldFormat, messageFormat: messageFormat }, log, null);
        var defaultPvk = parser.commands.generate_offset_ibm_lmk.pattern[0].size;
        assert.equal(defaultPvk, 33, "Default pvk size of opCode: generate_offset_ibm_lmk NOT OK!")
    });
    var parser = new PayshieldParser({ headerFormat: "6/string-left-zero", fieldFormat: fieldFormat, messageFormat: messageFormat }, log, null);
    describe('#Testing [Encode] on every initialized operation codes', function () {
        
        var commandArr = parser.commands;
    
        var countt = 0;
        for (var cmdName in commandArr) {
            if (!encode_test_data[cmdName])// || (cmdName != "generate_key" && cmdName != "echo")) 
            {
                //console.log(cmdName);
                continue;
            }
            
            var testWithData = function (cmdName1) {
                return function () {
                    if (cmdName1 == "generate_key_tmk" || cmdName1 == "generate_offset_ibm") {
                        assert.fail(cmdName1, cmdName1, "Nqma test case za tazi komana!", "=")
                        return;
                    }

                    var actualBuff = parser.encode(encode_test_data[cmdName1].data);
                
                    assert.deepEqual(actualBuff, encode_test_data[cmdName1].buf, "invalid encoded buffer");
                };
            };
            it('#operation code:' + cmdName, testWithData(cmdName));
                
            countt++;
        }
        it('#Have parsed templates', function () {
            assert.notEqual(countt, 0);
        });
    });
    
    describe('#Testing [Decode] on every initialized operation codes', function () {
        
        var commandArr = parser.commands;
        
        var countt = 0;
        for (var cmdName in commandArr) {
            if (!decode_test_data[cmdName])
            {
                //console.log(cmdName);
                continue;
            }
            
            var testWithData = function (cmdName1) {
                return function () {
                    if (cmdName1 == "generate_key_tmk" || cmdName1 == "generate_offset_ibm") {
                        assert.fail(cmdName1, cmdName1, "Nqma test case za tazi komana!", "=")
                        return;
                    }
                    
                    var actualData = parser.decode(decode_test_data[cmdName1].buf);
                    assert.deepEqual(actualData, decode_test_data[cmdName1].data, "invalid decoded object");
                };
            };
            it('#operation code:' + cmdName, testWithData(cmdName));
            
            countt++;
        }

        it('#Buffer with error code', function () {
            var data = { errorcode: '10', rest: new Buffer(0), headerNo: '000234', headerCode: 'A7', mtid: 'response', opcode: 'import_key_resp' };
            var actualData = parser.decode(new Buffer("000234A710"));
            assert.deepEqual(actualData, data, "invalid decoded object");
        });
    });

    describe('#Testing custom formats', function () {

        it(' ##custom fieldFormat ', function () {
            var fieldFormat = {pvk:16};
            var messageFormat = {};
            var parser = new PayshieldParser({ headerFormat: "6/string-left-zero", fieldFormat: fieldFormat, messageFormat: messageFormat }, log, null);
            var commandArr = parser.commands;
            var custPvk = commandArr.generate_offset_ibm_lmk.pattern[0].size;
            assert.equal(custPvk, 16, "Custom pvk size of opCode: generate_offset_ibm_lmk NOT OK!")
        });

        it(' ##custom messageFormat ', function () {
            var fieldFormat = {};
            var messageFormat = {
                generate_tpk: {
                    Code: "zzz",
                    Pattern: 'tmk:21/string, ";", key_scheme:1/string, key_scheme1:1/string, "0"'
                }
            };
            var parser = new PayshieldParser({ headerFormat: "6/string-left-zero", fieldFormat: fieldFormat, messageFormat: messageFormat }, log, null);
            assert.equal(parser.commands.generate_tpk.code, "zzz", "Custom message code NOT OK!")
            assert.equal(parser.commands.generate_tpk.pattern[0].size, 21, "Custom pattern NOT OK!")
        });
    });
});
