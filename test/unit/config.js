const buferize = function(request) {
    return Buffer.from(request, 'hex');
}

module.exports = {
    headerFormat: '4/string-left-zero',
    messageFormat: {},
    maskedKeys: [
        'pan',
        'panSeqNo',
        'account',
        'pinValidationData',
        'offset'
    ],
    test: {
        generateKeyEncode: {
            0: {
                request: {
                    delimiter: '',
                    delimiterLength: 0,
                    deriveKeyMode: '',
                    deriveKeyModeLen: 0,
                    dukptMasterKey: '',
                    dukptMasterKeyLen: 0,
                    dukptMasterKeyType: '',
                    dukptMasterKeyTypeLen: 0,
                    keySchemeLmk: 'U',
                    keySchemeZmkTmk: '',
                    keySchemeZmkTmkLength: '',
                    keyType: '002',
                    keyZmkTmk: '',
                    keyZmkTmkFlag: '',
                    keyZmkTmkFlagLength: '',
                    keyZmkTmkLength: '',
                    ksn: '',
                    ksnLen: 0,
                    mode: '0',
                    tr31BlockData: '',
                    tr31BlockDataLen: 0
                },
                response: '3030303041303030303255'
            },
            1: {
                request: {
                    delimiter: ';',
                    delimiterLength: 1,
                    deriveKeyMode: '',
                    deriveKeyModeLen: 0,
                    dukptMasterKey: '',
                    dukptMasterKeyLen: 0,
                    dukptMasterKeyType: '',
                    dukptMasterKeyTypeLen: 0,
                    keySchemeLmk: 'U',
                    keySchemeZmkTmk: 'X',
                    keySchemeZmkTmkLength: 1,
                    keyType: '002',
                    keyZmkTmk: 'U99D8FC778055B63D3FD53CDA9EEEFB9E',
                    keyZmkTmkFlag: '0',
                    keyZmkTmkFlagLength: 1,
                    keyZmkTmkLength: 33,
                    ksn: '',
                    ksnLen: 0,
                    mode: '1',
                    tr31BlockData: '',
                    tr31BlockDataLen: 0
                },
                response: '30303030413031303032553B3055393944384643373738303535423633443346443533434441394545454642394558'
            }
        },
        generateKeyDecode: {
            0: {
                request: buferize('3033373541313030553844364534324533334343444437433141424232463443373445334233444538413234363637'),
                response: {
                    errorCode: '00',
                    key: 'U8D6E42E33CCDD7C1ABB2F4C74E3B3DE8',
                    rest: buferize([65 ,50 ,52 ,54 ,54 ,55])
                }
            },
            1: {
                request: buferize('3030373941313030554145373942344646413430443742323239434336383344453436314243373334583444433542393338314438393343363632364133374432463430383039464541314339364236'),
                response: {
                    'errorCode': '00',
                    'key': 'UAE79B4FFA40D7B229CC683DE461BC734',
                    'rest': buferize([88, 52, 68, 67, 53, 66, 57, 51, 56, 49, 68, 56, 57, 51, 67, 54, 54, 50, 54, 65, 51, 55, 68, 50, 70, 52, 48, 56, 48, 57, 70, 69, 65, 49, 67, 57, 54, 66, 54])
                }
            },
            2: {
                request: buferize('3033383441313130'),
                response: 'payshield.generateKey.10'
            },
            3: {
                request: buferize('3033393241313135'),
                response: 'payshield.generateKey.15'
            }
        },
        importKeyEncode: {
            0: {
                request: {
                    'keyType': '002',
                    'zmk': 'UE6565E2D55B9463120398E7729DA524E',
                    'key': 'XA921158D2F2571942EA0B770637F005C',
                    'keyScheme': 'U'
                },
                response: '30303032413630303255453635363545324435354239343633313230333938453737323944413532344558413932313135384432463235373139343245413042373730363337463030354355'
            },
            1: {
                request: {
                    'keyType': '109',
                    'zmk': 'UE6565E2D55B9463120398E7729DA524E',
                    'key': 'X7292BCCA0CD4563354F627B0E8E852B2',
                    'keyScheme': 'U'
                },
                response: '30303032413631303955453635363545324435354239343633313230333938453737323944413532344558373239324243434130434434353633333534463632374230453845383532423255'
            }
        },
        importKeyDecode: {
            0: {
                request: buferize('3039343641373030554331334539453932444241303546324446323337394238323143353736364133384646454431'),
                response: {
                    'errorCode': '00',
                    'key': 'UC13E9E92DBA05F2DF2379B821C5766A3',
                    'keyCheckValue': '8FFED1'
                }
            },
            1: {
                request: buferize('3039353941373030553737333338463734413139453342423339303632413541343739343733464338364145374344'),
                response: {
                    'errorCode': '00',
                    'key': 'U77338F74A19E3BB39062A5A479473FC8',
                    'keyCheckValue': '6AE7CD'
                }
            },
            2: {
                request: buferize('3039383041373130'),
                response: 'payshield.importKey.10'
            },
            3: {
                request: buferize('3039393841373236'),
                response: 'payshield.importKey.26'
            },
            4: {
                request: buferize('3130303841373135'),
                response: 'payshield.importKey.15'
            }
        },
        exportKeyEncode: {
            0: {
                request: {
                    'keyType': '109',
                    'zmk': 'U773F7C1902633996DCCBE4EC5F2986AE',
                    'key': 'U7E717639AE951BBD85C280216DD3289E',
                    'keyScheme': 'T'
                },
                response: '30303034413831303955373733463743313930323633333939364443434245344543354632393836414555374537313736333941453935314242443835433238303231364444333238394554'
            },
            1: {
                request: {
                    'keyType': '402',
                    'zmk': 'U773F7C1902633996DCCBE4EC5F2986AD',
                    'key': 'U7E717639AE951BBD85C280216DD3289F',
                    'keyScheme': 'X'
                },
                response: '30303034413834303255373733463743313930323633333939364443434245344543354632393836414455374537313736333941453935314242443835433238303231364444333238394658'
            }
        },
        exportKeyDecode: {
            0: {
                request: buferize('3130333441393030584139323131353844324632353731393432454130423737303633374630303543364145374344'),
                response: {
                    'errorCode': '00',
                    'key': 'XA921158D2F2571942EA0B770637F005C',
                    'keyCheckValue': '6AE7CD'
                }
            },
            1: {
                request: buferize('3130343941393030583732393242434341304344343536333335344636323742304538453835324232384646454431'),
                response: {
                    'errorCode': '00',
                    'key': 'X7292BCCA0CD4563354F627B0E8E852B2',
                    'keyCheckValue': '8FFED1'
                }
            },
            2: {
                request: buferize('3130373941393130'),
                response: 'payshield.exportKey.10'
            },
            3: {
                request: buferize('3130393141393131'),
                response: 'payshield.exportKey.11'
            },
            4: {
                request: buferize('3131353141393236'),
                response: 'payshield.exportKey.26'
            },
            5: {
                request: buferize('3131353741393135'),
                response: 'payshield.exportKey.15'
            }
        }
    }
};
