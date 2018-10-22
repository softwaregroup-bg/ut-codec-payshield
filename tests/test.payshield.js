function test(bdd, PayshieldParser, assert, Validator) {
    var encodeTestData = {
        echo: {
            data: {
                $$: {
                    opcode: 'echo',
                    trace: 234
                },
                msgSize: '4',
                macMessage: 'ping'
            },
            buf: Buffer.from('000234B20004ping')
        },

        generateKey: {
            data: {
                $$: {
                    opcode: 'generateKey',
                    trace: 234
                },
                mode: '0',
                keyType: '003',
                keyScheme: 'U'
            },
            buf: Buffer.from('000234A00003U')
        },

        generateKeyTmk: {
            data: {},
            buf: Buffer.from('')
        },

        generateTpk: {
            data: {
                $$: {
                    opcode: 'generateTpk',
                    trace: 234
                },
                tmk: 'UB15E645AFC1A3F4444A48D58EE983BD3',
                keyScheme: 'X',
                keyScheme1: '0'
            },
            buf: Buffer.from('000234HCUB15E645AFC1A3F4444A48D58EE983BD3;X00')
        },

        generateTak: {
            data: {
                $$: {
                    opcode: 'generateTak',
                    trace: 234
                },
                tmk: 'UB15E645AFC1A3F4444A48D58EE983BD3',
                keyScheme: 'U',
                keyScheme1: '0'
            },
            buf: Buffer.from('000234HAUB15E645AFC1A3F4444A48D58EE983BD3;U00')
        },

        generateMac: {
            data: {
                $$: {
                    opcode: 'generateMac',
                    trace: 234
                },
                macMode: '0',
                macInputFormat: '2',
                macAlgorithm: '03',
                macPaddingMethod: '0',
                macKeyType: '003',
                macKey: 'U78C6FD3889386436C41F3874A5DE1F48',
                msgSize: 8,
                macMessage: 'testtesttest'
            },
            buf: Buffer.from('000234M602030003U78C6FD3889386436C41F3874A5DE1F480008testtest')
        },

        verifyMac: {
            data: {
                $$: {
                    opcode: 'verifyMac',
                    trace: 234
                },
                macMode: '0',
                macInputFormat: '2',
                macAlgorithm: '03',
                macPaddingMethod: '0',
                macKeyType: '003',
                macKey: 'U78C6FD3889386436C41F3874A5DE1F48',
                msgSize: 8,
                macMessage: 'testtest',
                mac: '341C677E'
            },
            buf: Buffer.from('000234M802030003U78C6FD3889386436C41F3874A5DE1F480008testtest341C677E')
        },

        formKey: {
            data: {
                $$: {
                    opcode: 'formKey',
                    trace: 234
                },
                numberOfComponents: '2',
                keyType: '003',
                keyScheme: 'U',
                keyComponent1: 'U78C6FD3889386436C41F3874A5DE1F48',
                keyComponent2: 'U78C6FD3889386436C41F3874A5DE1F48'
            },
            buf: Buffer.from('000234A42003UU78C6FD3889386436C41F3874A5DE1F48U78C6FD3889386436C41F3874A5DE1F48')
        },

        generateKeycheckvalue: {
            data: {
                $$: {
                    opcode: 'generateKeycheckvalue',
                    trace: 234
                },
                keyTypeCode: '02',
                keyLengthFlag: '1',
                keyA32: 'X614BCB4CE30FE4FF13C9CFDD180AA182'
            },
            buf: Buffer.from('000234BU021X614BCB4CE30FE4FF13C9CFDD180AA182')
        },

        derivePinIbm: {
            data: {
                $$: {
                    opcode: 'derivePinIbm',
                    trace: 234
                },
                pvk: 'X614BCB4CE30FE4FF13C9CFDD180AA182',
                offset: '0000FFFFFFFF',
                checkLength: '4',
                account: '123456789012',
                decimalisationTable: '1234567812345678',
                pinValidationData: '23456N543210'
            },
            buf: Buffer.from('000234EEX614BCB4CE30FE4FF13C9CFDD180AA1820000FFFFFFFF04123456789012123456781234567823456N543210')
        },

        generatePin: {
            data: {
                $$: {
                    opcode: 'generatePin',
                    trace: 234
                },
                account: '123456789012',
                checkLength: 4
            },
            buf: Buffer.from('000234JA12345678901204')
        },

        generateOffsetIbm: {
            data: {
                $$: {
                    opcode: 'generateOffsetIbm',
                    trace: 234
                },
                keyType: '002',
                keyA32: 'X614BCB4CE30FE4FF13C9CFDD180AA182',
                pvk: 'X614BCB4CE30FE4FF13C9CFDD180AA182',
                pinBlock: '0592789FFFEDCBA9',
                pinBlockFormat: '01',
                checkLength: 4,
                account: '123456789012',
                decimalisationTable: '1234567812345678',
                pinValidationData: '23456N543210'
            },
            buf: Buffer.from(
                '000234BK002X614BCB4CE30FE4FF13C9CFDD180AA182X614BCB4CE30FE4FF13C9CFDD180AA1820592789FFFEDCBA90104123456789012123456781234567823456N543210'
            )
        },

        verifyTermPinIbm: {
            data: {
                $$: {
                    opcode: 'verifyTermPinIbm',
                    trace: 234
                },
                tpk: 'X725D74BD3FDC0AA910EB213487423466',
                pvk: 'X614BCB4CE30FE4FF13C9CFDD180AA182',
                maximumPinLength: 12,
                pinBlock: '0592789FFFEDCBA9',
                pinBlockFormat: '01',
                checkLength: 4,
                account: '123456789012',
                decimalisationTable: '1234567812345678',
                pinValidationData: '23456N543210',
                offset: 'FFFF34523421'
            },
            buf: Buffer.from(
                '000234DAX725D74BD3FDC0AA910EB213487423466X614BCB4CE30FE4FF13C9CFDD180AA182120592789FFFEDCBA90104123456789012123456781234567823456N543210FFFF34523421'
            )
        },

        importKey: {
            data: {
                $$: {
                    opcode: 'importKey',
                    trace: 234
                },
                keyType: '001',
                zmk: 'U71979DEB8587E2734F1E99D5DCAEF9AC',
                keyA32: 'U482C4E722BB0CF1845E1E5BD16310119',
                keyScheme: 'U'
            },
            buf: Buffer.from('000234A6001U71979DEB8587E2734F1E99D5DCAEF9ACU482C4E722BB0CF1845E1E5BD16310119U')
        },

        translateTpkZpk: {
            data: {
                $$: {
                    opcode: 'translateTpkZpk',
                    trace: 234
                },
                sourceTpk: 'U8463435FC4B4DAA0C49025272C29B12C',
                destinationZpk: 'U1EF828AA8F6B80EB83E19FBC373F3A85',
                sourcePinBlock: '6428EB94035AF53B',
                sourcePinBlockFormat: '01',
                destinationPinBlockFormat: '01',
                account: '550000025321'
            },
            buf: Buffer.from('000234CAU8463435FC4B4DAA0C49025272C29B12CU1EF828AA8F6B80EB83E19FBC373F3A85126428EB94035AF53B0101550000025321')
        },

        printPin: {
            data: {
                $$: {
                    opcode: 'printPin',
                    trace: 234
                },
                documentType: 'A',
                account: '123456789012',
                pin: '0592789FFFEDCBA9',
                printFields: '1'
            },
            buf: Buffer.from('000234PEA1234567890120592789FFFEDCBA91')
        },

        printFormat: {
            data: {
                $$: {
                    opcode: 'printFormat',
                    trace: 234
                },
                printFields: '1'
            },
            buf: Buffer.from('000234PA1')
        },

        translateTpkLmk: {
            data: {
                $$: {
                    opcode: 'translateTpkLmk',
                    trace: 234
                },
                sourceTpk: 'U8463435FC4B4DAA0C49025272C29B12C',
                sourcePinBlock: '6428EB94035AF53B',
                sourcePinBlockFormat: '01',
                account: '550000025321'
            },
            buf: Buffer.from('000234JCU8463435FC4B4DAA0C49025272C29B12C6428EB94035AF53B01550000025321')
        },

        translateZpkLmk: {
            data: {
                $$: {
                    opcode: 'translateZpkLmk',
                    trace: 234
                },
                sourceZpk: 'U1EF828AA8F6B80EB83E19FBC373F3A85',
                sourcePinBlock: '91DDDA0A7C12CFAA',
                sourcePinBlockFormat: '01',
                account: '550000025321'
            },
            buf: Buffer.from('000234JEU1EF828AA8F6B80EB83E19FBC373F3A8591DDDA0A7C12CFAA01550000025321')
        },

        generateOffsetIbmLmk: {
            data: {
                $$: {
                    opcode: 'generateOffsetIbmLmk',
                    trace: 234
                },
                pvk: 'X614BCB4CE30FE4FF13C9CFDD180AA182',
                pin: '07692',
                checkLength: 4,
                account: '123456789012',
                decimalisationTable: '1234567812345678',
                pinValidationData: '23456N543210'
            },
            buf: Buffer.from('000234DEX614BCB4CE30FE4FF13C9CFDD180AA1820769204123456789012123456781234567823456N543210')
        }

    };

    var decodeTestData = {

        echoResp: {
            data: {
                errorCode: '00',
                macMessage: 'ping',
                $$: {
                    trace: '000234',
                    mtid: 'discard',
                    opcode: 'echoResp'
                }
            },
            buf: Buffer.from('000234B300ping')
        },

        generateKeyResp: {
            data: {
                errorCode: '00',
                keyA32: 'UD1D3196BE8CE804392F764CDC2ABD75E',
                keyCheckValue: 'F232C4',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'generateKeyResp'
                }
            },
            buf: Buffer.from('000234A100UD1D3196BE8CE804392F764CDC2ABD75EF232C4')
        },

        generateTpkResp: {
            data: {
                errorCode: '00',
                tpk: 'X6F6FFAD40F6B6B72A5764A5DE9AB7FB5',
                keyA32: '3E24796511C304FC99935DD4A24C9F1F',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'generateTpkResp'
                }
            },
            buf: Buffer.from('000234HD00X6F6FFAD40F6B6B72A5764A5DE9AB7FB53E24796511C304FC99935DD4A24C9F1F')
        },

        generateTakResp: {
            data: {
                errorCode: '00',
                tpk: 'UFC66FDA4146813DDD555649C8ED2C6DE',
                keyA32: '86CD971D58CB0CF630C6796F56EBEDA4',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'generateTakResp'
                }
            },
            buf: Buffer.from('000234HB00UFC66FDA4146813DDD555649C8ED2C6DE86CD971D58CB0CF630C6796F56EBEDA4')
        },

        generateMacResp: {
            data: {
                errorCode: '00',
                mac: '0008341C677E',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'generateMacResp'
                }
            },
            buf: Buffer.from('000234M7000008341C677E')
        },

        verifyMacResp: {
            data: {
                errorCode: '00',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'verifyMacResp'
                }
            },
            buf: Buffer.from('000234M900')
        },

        formKeyResp: {
            data: {
                errorCode: '00',
                keyA32: 'U5D3BF8844DC17252864ABBF21BF42999',
                keyCheckValue: '000000',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'formKeyResp'
                }
            },
            buf: Buffer.from('000234A500U5D3BF8844DC17252864ABBF21BF42999000000')
        },

        generateKeycheckvalueResp: {
            data: {
                errorCode: '00',
                keyCheckValue16: '1519597E659476B0',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'generateKeycheckvalueResp'
                }
            },
            buf: Buffer.from('000234BV001519597E659476B0')
        },

        derivePinIbmResp: {
            data: {
                errorCode: '00',
                pin: '00034',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'derivePinIbmResp'
                }
            },
            buf: Buffer.from('000234EF0000034')
        },

        generatePinResp: {
            data: {
                errorCode: '00',
                pin: '03218',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'generatePinResp'
                }
            },
            buf: Buffer.from('000234JB0003218')
        },

        generateOffsetIbmResp: {
            data: {},
            buf: Buffer.from('')
        },

        verifyTermPinIbmResp: {
            data: {
                errorCode: '10',
                rest: Buffer.from(0),
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'verifyTermPinIbmResp'
                }
            },
            buf: Buffer.from('000234DB10')
        },

        importKeyResp: {
            data: {
                errorCode: '00',
                keyA32: 'U0E07CDC0161A0DE3B5AA44DF227EC9DE',
                keyCheckValue: 'ABDEBC',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'importKeyResp'
                }
            },
            buf: Buffer.from('000234A700U0E07CDC0161A0DE3B5AA44DF227EC9DEABDEBC')
        },

        translateTpkZpkResp: {
            data: {
                errorCode: '00',
                checkLength: '04',
                destinationPinBlock: '91DDDA0A7C12CFAA',
                pinBlockFormat: '01',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'translateTpkZpkResp'
                }
            },
            buf: Buffer.from('000234CB000491DDDA0A7C12CFAA01')
        },

        printPinStart: {
            data: {
                errorCode: '00',
                $$: {
                    trace: '000234',
                    mtid: 'notification',
                    opcode: 'printPinStart'
                }
            },
            buf: Buffer.from('000234PF00')
        },

        printPinResp: {
            data: {
                errorCode: '00',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'printPinResp'
                }
            },
            buf: Buffer.from('000234PZ00')
        },

        printFormatResp: {
            data: {
                errorCode: '00',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'printFormatResp'
                }
            },
            buf: Buffer.from('000234PB00')
        },

        translateTpkLmkResp: {
            data: {
                errorCode: '00',
                pin: '01234',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'translateTpkLmkResp'
                }
            },
            buf: Buffer.from('000234JD0001234')
        },

        translateZpkLmkResp: {
            data: {
                errorCode: '00',
                pin: '01234',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'translateZpkLmkResp'
                }
            },
            buf: Buffer.from('000234JF0001234')
        },

        generateOffsetIbmLmkResp: {
            data: {
                errorCode: '00',
                offset: '7668FFFFFFFF',
                $$: {
                    trace: '000234',
                    mtid: 'response',
                    opcode: 'generateOffsetIbmLmkResp'
                }
            },
            buf: Buffer.from('000234DF007668FFFFFFFF')
        }
    };

    var log = function() {};
    log.createLog = function(v) {
        return {
            info: function(v) {},
            debug: function(v) {}
        };
    };

    bdd.describe('payshield messages', function() {
        var fieldFormat = {};
        var messageFormat = {};

        bdd.it(' ##Initial template parsing', function() {
            var parser = new PayshieldParser({
                headerFormat: '6/string-left-zero',
                fieldFormat: fieldFormat,
                messageFormat: messageFormat
            }, log, null);
            var defaultPvk = parser.commands.generateOffsetIbmLmk.pattern[0].size;
            assert.equal(defaultPvk, 33, 'Default pvk size of opCode: generateOffsetIbmLmk NOT OK!');
        });
        var parser = new PayshieldParser({
            headerFormat: '6/string-left-zero',
            fieldFormat: fieldFormat,
            messageFormat: messageFormat
        }, log, null);
        bdd.describe('#Testing [Encode] on every initialized operation codes', function() {
            var commandArr = parser.commands;

            var countt = 0;
            for (var cmdName in commandArr) {
                if (!encodeTestData[cmdName]) { // || (cmdName != 'generateKey' && cmdName != 'echo'))
                    // console.log(cmdName);
                    continue;
                }

                var testWithData = function(cmdName1) {
                    return function() {
                        if (cmdName1 === 'generateKeyTmk' || cmdName1 === 'generateOffsetIbm') {
                            assert.fail(cmdName1, cmdName1, 'Nqma test case za tazi komanda!', '=');
                            return;
                        }

                        var actualBuff = parser.encode(encodeTestData[cmdName1].data);

                        assert.deepEqual(actualBuff, encodeTestData[cmdName1].buf, 'invalid encoded buffer');
                    };
                };
                bdd.it('#operation code:' + cmdName, testWithData(cmdName));

                countt++;
            }
            bdd.it('#Have parsed templates', function() {
                assert.notEqual(countt, 0);
            });
        });

        bdd.describe('#Testing [Decode] on every initialized operation codes', function() {
            var commandArr = parser.commands;

            for (var cmdName in commandArr) {
                if (!decodeTestData[cmdName]) {
                    // console.log(cmdName);
                    continue;
                }

                var testWithData = function(cmdName1) {
                    return function() {
                        if (cmdName1 === 'generateKeyTmk' || cmdName1 === 'generateOffsetIbmResp') {
                            assert.fail(cmdName1, cmdName1, 'Nqma test case za tazi komanda!', '=');
                            return;
                        }

                        var actualData = parser.decode(decodeTestData[cmdName1].buf);
                        assert.deepEqual(actualData, decodeTestData[cmdName1].data, 'invalid decoded object');
                    };
                };
                bdd.it('#operation code:' + cmdName, testWithData(cmdName));
            }

            bdd.it('#Buffer with error code', function() {
                var data = {
                    errorCode: '10',
                    rest: Buffer.from(0),
                    $$: {
                        trace: '000234',
                        mtid: 'response',
                        opcode: 'importKeyResp'
                    }
                };
                var actualData = parser.decode(Buffer.from('000234A710'));
                assert.deepEqual(actualData, data, 'invalid decoded object');
            });
        });

        bdd.describe('#Testing custom formats', function() {
            bdd.it(' ##custom fieldFormat ', function() {
                var fieldFormat = {
                    pvk: 16
                };
                var messageFormat = {};
                var parser = new PayshieldParser({
                    headerFormat: '6/string-left-zero',
                    fieldFormat: fieldFormat,
                    messageFormat: messageFormat
                }, log, null);
                var commandArr = parser.commands;
                var custPvk = commandArr.generateOffsetIbmLmk.pattern[0].size;
                assert.equal(custPvk, 16, 'Custom pvk size of opCode: generateOffsetIbmLmk NOT OK!');
            });

            bdd.it(' ##custom messageFormat ', function() {
                var fieldFormat = {};
                var messageFormat = {
                    generateTpk: {
                        Code: 'zzz',
                        Pattern: 'tmk:21/string, ";", keyScheme:1/string, keyScheme1:1/string, "0"'
                    }
                };
                var parser = new PayshieldParser({
                    headerFormat: '6/string-left-zero',
                    fieldFormat: fieldFormat,
                    messageFormat: messageFormat
                }, log, null);
                assert.equal(parser.commands.generateTpk.code, 'zzz', 'Custom message code NOT OK!');
                assert.equal(parser.commands.generateTpk.pattern[0].size, 21, 'Custom pattern NOT OK!');
            });
        });
    });
};

test();
