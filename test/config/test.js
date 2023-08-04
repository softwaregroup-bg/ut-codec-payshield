const bufferize = function(request) {
    return Buffer.from(request, 'hex');
};

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
        notImplementedEncode: {
            0: {
                request: {},
                response: 'payshield.notimplemented'
            }
        },
        notImplementedDecode: {
            0: {
                request: bufferize('303337358888'),
                response: 'payshield.unknownResponseCode'
            }
        },
        echoEncode: {
            0: {
                request: {
                    length: 4,
                    data: 'ping'
                },
                response: '3939393942323030303450494E47'
            }
        },
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
                    ksnLength: 0,
                    mode: '0',
                    zkaMasterKeyTypeLength: 0,
                    zkaMasterKeyType: '',
                    zkaMasterKeyLength: 0,
                    zkaMasterKey: '',
                    zkaOptionLength: 0,
                    zkaOption: '',
                    zkaRndiLength: 0,
                    zkaRndi: '',
                    tr31BlockDataLen: 0,
                    tr31BlockData: '',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
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
                    ksnLength: 0,
                    mode: '1',
                    zkaMasterKeyTypeLength: 0,
                    zkaMasterKeyType: '',
                    zkaMasterKeyLength: 0,
                    zkaMasterKey: '',
                    zkaOptionLength: 0,
                    zkaOption: '',
                    zkaRndiLength: 0,
                    zkaRndi: '',
                    tr31BlockDataLen: 0,
                    tr31BlockData: '',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303030413031303032553B3055393944384643373738303535423633443346443533434441394545454642394558'
            }
        },
        generateKeyDecode: {
            0: {
                request: bufferize('3033373541313030553844364534324533334343444437433141424232463443373445334233444538413234363637'),
                response: {
                    errorCode: '00',
                    key: 'U8D6E42E33CCDD7C1ABB2F4C74E3B3DE8',
                    rest: bufferize([65, 50, 52, 54, 54, 55])
                }
            },
            1: {
                request: bufferize('3030373941313030554145373942344646413430443742323239434336383344453436314243373334583444433542393338314438393343363632364133374432463430383039464541314339364236'),
                response: {
                    errorCode: '00',
                    key: 'UAE79B4FFA40D7B229CC683DE461BC734',
                    rest: bufferize([88, 52, 68, 67, 53, 66, 57, 51, 56, 49, 68, 56, 57, 51, 67, 54, 54, 50, 54, 65, 51, 55, 68, 50, 70, 52, 48, 56, 48, 57, 70, 69, 65, 49, 67, 57, 54, 66, 54])
                }
            },
            2: {
                request: bufferize('3033383441313130'),
                response: 'payshield.generateKey.10'
            },
            3: {
                request: bufferize('3033393241313135'),
                response: 'payshield.generateKey.15'
            }
        },
        formKeyFromComponentsEncode: {
            0: {
                request: {
                    numberOfComponents: 3,
                    keyType: '402',
                    keySchemeLmk: 'U',
                    keyComponentsLength: 99,
                    keyComponents: 'U78D68FB4966305485C74466DACDE4E65UA128A7F7102F48B8582065D7B411A558UE8DA2D69626452A0CB47C6C4C142F17B',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030303641343334303255553738443638464234393636333035343835433734343636444143444534453635554131323841374637313032463438423835383230363544374234313141353538554538444132443639363236343532413043423437433643344331343246313742'
            },
            1: {
                request: {
                    numberOfComponents: 2,
                    keyType: '402',
                    keySchemeLmk: 'U',
                    keyComponentsLength: 66,
                    keyComponents: 'U78D68FB4966305485C74466DACDE4E65UA128A7F7102F48B8582065D7B411A558',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030303641343234303255553738443638464234393636333035343835433734343636444143444534453635554131323841374637313032463438423835383230363544374234313141353538'
            }
        },
        formKeyFromComponentsDecode: {
            0: {
                request: bufferize('30303032383141353030554332424434433942453341423339353745323346313135344438394244353332443035333837'),
                response: {
                    errorCode: '00',
                    key: 'UC2BD4C9BE3AB3957E23F1154D89BD532',
                    keyCheckValue: 'D05387'
                }
            },
            1: {
                request: bufferize('30303031323341353030554537464436304244453632363042464138423736423741374433313234433835304338304631'),
                response: {
                    errorCode: '00',
                    key: 'UE7FD60BDE6260BFA8B76B7A7D3124C85',
                    keyCheckValue: '0C80F1'
                }
            },
            2: {
                request: bufferize('30303032393141353130'),
                response: 'payshield.formKeyFromComponents.10'
            },
            3: {
                request: bufferize('30303037313641353033'),
                response: 'payshield.formKeyFromComponents.03'
            },
            4: {
                request: bufferize('30303037323941353135'),
                response: 'payshield.formKeyFromComponents.15'
            }
        },
        importKeyEncode: {
            0: {
                request: {
                    keyType: '002',
                    zmk: 'UE6565E2D55B9463120398E7729DA524E',
                    key: 'XA921158D2F2571942EA0B770637F005C',
                    keyScheme: 'U',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303032413630303255453635363545324435354239343633313230333938453737323944413532344558413932313135384432463235373139343245413042373730363337463030354355'
            },
            1: {
                request: {
                    keyType: '109',
                    zmk: 'UE6565E2D55B9463120398E7729DA524E',
                    key: 'X7292BCCA0CD4563354F627B0E8E852B2',
                    keyScheme: 'U',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303032413631303955453635363545324435354239343633313230333938453737323944413532344558373239324243434130434434353633333534463632374230453845383532423255'
            }
        },
        importKeyDecode: {
            0: {
                request: bufferize('3039343641373030554331334539453932444241303546324446323337394238323143353736364133384646454431'),
                response: {
                    errorCode: '00',
                    key: 'UC13E9E92DBA05F2DF2379B821C5766A3',
                    keyCheckValue: '8FFED1'
                }
            },
            1: {
                request: bufferize('3039353941373030553737333338463734413139453342423339303632413541343739343733464338364145374344'),
                response: {
                    errorCode: '00',
                    key: 'U77338F74A19E3BB39062A5A479473FC8',
                    keyCheckValue: '6AE7CD'
                }
            },
            2: {
                request: bufferize('3039383041373130'),
                response: 'payshield.importKey.10'
            },
            3: {
                request: bufferize('3039393841373236'),
                response: 'payshield.importKey.26'
            },
            4: {
                request: bufferize('3130303841373135'),
                response: 'payshield.importKey.15'
            },
            5: {
                request: bufferize('3130303841373031'),
                response: 'payshield.unableMatchingPattern'
            },
            6: {
                request: bufferize('313030384137'),
                response: 'payshield.unableMatchingResponseECode'
            }
        },
        exportKeyEncode: {
            0: {
                request: {
                    keyType: '109',
                    zmk: 'U773F7C1902633996DCCBE4EC5F2986AE',
                    key: 'U7E717639AE951BBD85C280216DD3289E',
                    keyScheme: 'T',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303034413831303955373733463743313930323633333939364443434245344543354632393836414555374537313736333941453935314242443835433238303231364444333238394554'
            },
            1: {
                request: {
                    keyType: '402',
                    zmk: 'U773F7C1902633996DCCBE4EC5F2986AD',
                    key: 'U7E717639AE951BBD85C280216DD3289F',
                    keyScheme: 'X',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303034413834303255373733463743313930323633333939364443434245344543354632393836414455374537313736333941453935314242443835433238303231364444333238394658'
            }
        },
        exportKeyDecode: {
            0: {
                request: bufferize('3130333441393030584139323131353844324632353731393432454130423737303633374630303543364145374344'),
                response: {
                    errorCode: '00',
                    key: 'XA921158D2F2571942EA0B770637F005C',
                    keyCheckValue: '6AE7CD'
                }
            },
            1: {
                request: bufferize('3130343941393030583732393242434341304344343536333335344636323742304538453835324232384646454431'),
                response: {
                    errorCode: '00',
                    key: 'X7292BCCA0CD4563354F627B0E8E852B2',
                    keyCheckValue: '8FFED1'
                }
            },
            2: {
                request: bufferize('3130373941393130'),
                response: 'payshield.exportKey.10'
            },
            3: {
                request: bufferize('3130393141393131'),
                response: 'payshield.exportKey.11'
            },
            4: {
                request: bufferize('3131353141393236'),
                response: 'payshield.exportKey.26'
            },
            5: {
                request: bufferize('3131353741393135'),
                response: 'payshield.exportKey.15'
            }
        },
        generateOffsetIbmEncode: {
            0: {
                request: {
                    keyType: '002',
                    key: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pvkLength: 33,
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    maximumPinLength: '12',
                    checkLength: '04',
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5022654000N2',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303039424B303032553330323743383935313831443931324139314437444630454437384143364642553830414533463844363342303846394331333635324535343136443736453844413639463945373634363930344236383031303435343030303839303030303930313233343536373839313233343536353032323635343030304E32'
            },
            1: {
                request: {
                    keyType: '002',
                    key: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pvkLength: 33,
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    maximumPinLength: '12',
                    checkLength: '06',
                    pan: '540008900009',
                    decimalisationTable: '5432109876543210',
                    pinValidationData: '5022654000N2',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303039424B303032553330323743383935313831443931324139314437444630454437384143364642553830414533463844363342303846394331333635324535343136443736453844413639463945373634363930344236383031303635343030303839303030303935343332313039383736353433323130353032323635343030304E32'
            }
        },
        generateOffsetIbmDecode: {
            0: {
                request: bufferize('30313630424C3032373537373938464646464646'),
                response: {
                    errorCode: '02',
                    offset: '757798FFFFFF'
                }
            },
            1: {
                request: bufferize('30333036424C3032383836303635464646464646'),
                response: {
                    errorCode: '02',
                    offset: '886065FFFFFF'
                }
            },
            2: {
                request: bufferize('30303036424C3130'),
                response: 'payshield.generateOffsetIbm.10'
            },
            3: {
                request: bufferize('30303235424C3131'),
                response: 'payshield.generateOffsetIbm.11'
            },
            4: {
                request: bufferize('30303433424C3235'),
                response: 'payshield.generateOffsetIbm.25'
            },
            5: {
                request: bufferize('30303332424C3135'),
                response: 'payshield.generateOffsetIbm.15'
            }
        },
        translatePinLmkLmkEncode: {
            0: {
                request: {
                    account: '540008900009',
                    pinLength: 7,
                    pin: '0567899',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303238424735343030303839303030303930353637383939'
            }
        },
        translatePinLmkLmkDecode: {
            0: {
                request: bufferize('303030334248303030393938373635'),
                response: {
                    errorCode: '00',
                    pin: bufferize('30393938373635', 'ascii')
                }
            },
            1: {
                request: bufferize('3030303342483134'),
                response: 'payshield.translatePinLmkLmk.14'
            }
        },
        translateKeyLmkLmkEncode: {
            0: {
                request: {
                    keyTypeCode: '00',
                    keyLengthFlag: 1,
                    key: 'UB7A1DC09C990EC0F6EC5AD811FD1E4E0',
                    delimiter1Length: 0,
                    delimiter1: '',
                    keyTypeLength: 0,
                    keyType: '',
                    delimiter2Length: 1,
                    delimiter2: ';',
                    reserved1Length: 1,
                    reserved1: '0',
                    keySchemeLmkLength: 1,
                    keySchemeLmk: 'U',
                    reserved2Length: 1,
                    reserved2: '0',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030323542573030315542374131444330394339393045433046364543354144383131464431453445303B305530'
            }
        },
        translateKeyLmkLmkDecode: {
            0: {
                request: bufferize('3030303142583030553530323634443130334445323741353437373039343441464541413943454546'),
                response: {
                    errorCode: '00',
                    keyTranslated: 'U50264D103DE27A54770944AFEAA9CEEF'
                }
            },
            1: {
                request: bufferize('3030303142583333'),
                response: 'payshield.translateKeyLmkLmk.33'
            },
            2: {
                request: bufferize('3030303042583130'),
                response: 'payshield.translateKeyLmkLmk.10'
            }
        },
        eraseKeyChangeStorageEncode: {
            0: {
                request: {},
                response: '303032384253'
            }
        },
        eraseKeyChangeStorageDecode: {
            0: {
                request: bufferize('3030323842543030'),
                response: {
                    errorCode: '00'
                }
            },
            1: {
                request: bufferize('3030323842543638'),
                response: 'payshield.eraseKeyChangeStorage.68'
            }
        },
        generateKeyCheckValueEncode: {
            0: {
                request: {
                    keyTypeCode: 'FF',
                    keyLengthFlag: '1',
                    key: 'U77338F74A19E3BB39062A5A479473FC8',
                    keyLength: 33,
                    delimiter1: ';',
                    delimiter1Length: 1,
                    keyType: '002',
                    keyTypeLength: 3,
                    delimiter2: ';',
                    delimiter2Length: 1,
                    reserved: '00',
                    reservedLength: 2,
                    kcvType: '1',
                    kcvTypeLength: 1,
                    hashId: '',
                    hashIdLength: 0,
                    hmacKeyLengthBytes: 0,
                    hmacKeyLengthBytesLength: 0,
                    hmacKey: '',
                    hmacKeyLength: 0,
                    delimiter3: '',
                    delimiter3Length: 0,
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313142554646315537373333384637344131394533424233393036324135413437393437334643383B3030323B303031'
            },
            1: {
                request: {
                    keyTypeCode: 'FF',
                    keyLengthFlag: '1',
                    key: 'UC13E9E92DBA05F2DF2379B821C5766A3',
                    keyLength: 33,
                    delimiter1: ';',
                    delimiter1Length: 1,
                    keyType: '109',
                    keyTypeLength: 3,
                    delimiter2: ';',
                    delimiter2Length: 1,
                    reserved: '00',
                    reservedLength: 2,
                    kcvType: '0',
                    kcvTypeLength: 1,
                    hashId: '',
                    hashIdLength: 0,
                    hmacKeyLengthBytes: 0,
                    hmacKeyLengthBytesLength: 0,
                    hmacKey: '',
                    hmacKeyLength: 0,
                    delimiter3: '',
                    delimiter3Length: 0,
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313142554646315543313345394539324442413035463244463233373942383231433537363641333B3130393B303030'
            },
            2: {
                request: {
                    keyTypeCode: '02',
                    keyLengthFlag: '1',
                    key: 'U77338F74A19E3BB39062A5A479473FC8',
                    keyLength: 33,
                    delimiter1: '',
                    delimiter1Length: 0,
                    keyType: '',
                    keyTypeLength: 0,
                    delimiter2: ';',
                    delimiter2Length: 1,
                    reserved: '00',
                    reservedLength: 2,
                    kcvType: '1',
                    kcvTypeLength: 1,
                    hashId: '',
                    hashIdLength: 0,
                    hmacKeyLengthBytes: 0,
                    hmacKeyLengthBytesLength: 0,
                    hmacKey: '',
                    hmacKeyLength: 0,
                    delimiter3: '',
                    delimiter3Length: 0,
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313142553032315537373333384637344131394533424233393036324135413437393437334643383B303031'
            }
        },
        generateKeyCheckValueDecode: {
            0: {
                request: bufferize('3030313342563030384646454431'),
                response: {
                    errorCode: '00',
                    keyCheckValue: bufferize([56, 70, 70, 69, 68, 49])
                }
            },
            1: {
                request: bufferize('303031304256303036414537434433444642364637384630'),
                response: {
                    errorCode: '00',
                    keyCheckValue: bufferize([54, 65, 69, 55, 67, 68, 51, 68, 70, 66, 54, 70, 55, 56, 70, 48])
                }
            },
            2: {
                request: bufferize('3031303542563130'),
                response: 'payshield.generateKeyCheckValue.10'
            },
            3: {
                request: bufferize('3030363342563238'),
                response: 'payshield.generateKeyCheckValue.28'
            },
            4: {
                request: bufferize('3030373042563035'),
                response: 'payshield.generateKeyCheckValue.05'
            },
            5: {
                request: bufferize('3030373542563135'),
                response: 'payshield.generateKeyCheckValue.15'
            }
        },
        translatePinTpkZpkEncode: {
            0: {
                request: {
                    sourceTpk: 'U6C091AE30ABB19B3EB6C4C3B8D08C071',
                    destinationZpk: 'UBB224A0D70899E7D216A4DDDA615C078',
                    maximumPinLength: '12',
                    sourcePinBlock: '3C7C732E667A9BC6',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '540028800010',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303131434155364330393141453330414242313942334542364334433342384430384330373155424232323441304437303839394537443231364134444444413631354330373831323343374337333245363637413942433630313031353430303238383030303130'
            },
            1: {
                request: {
                    sourceTpk: 'U6C091AE30ABB19B3EB6C4C3B8D08C071',
                    destinationZpk: 'UBB224A0D70899E7D216A4DDDA615C078',
                    maximumPinLength: '12',
                    sourcePinBlock: 'C5ED6A332BAD3FE7',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '239010000012',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303131434155364330393141453330414242313942334542364334433342384430384330373155424232323441304437303839394537443231364134444444413631354330373831324335454436413333324241443346453730313031323339303130303030303132'
            }
        },
        translatePinTpkZpkDecode: {
            0: {
                request: bufferize('30383531434230303036313444334530394344334236343536453031'),
                response: {
                    errorCode: '00',
                    checkLength: '06',
                    pinBlock: '14D3E09CD3B6456E',
                    pinBlockFormat: '01'
                }
            },
            1: {
                request: bufferize('30363139434230303034453837304344433845303637454232453031'),
                response: {
                    errorCode: '00',
                    checkLength: '04',
                    pinBlock: 'E870CDC8E067EB2E',
                    pinBlockFormat: '01'
                }
            },
            2: {
                request: bufferize('3039393143423130'),
                response: 'payshield.translatePinTpkZpk.10'
            },
            3: {
                request: bufferize('3130303143423131'),
                response: 'payshield.translatePinTpkZpk.11'
            },
            4: {
                request: bufferize('3130313043423233'),
                response: 'payshield.translatePinTpkZpk.23'
            },
            5: {
                request: bufferize('3130323543423230'),
                response: 'payshield.translatePinTpkZpk.20'
            }
        },
        translatePinZpkLmkEncode: {
            0: {
                request: {
                    zpk: 'U592A36AE05F8E181AB3939B1D29BD8D1',
                    pinBlock: '87C832F7179E9CCE',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303031314A45553539324133364145303546384531383141423339333942314432394244384431383743383332463731373945394343453031353430303038393030303039'
            }
        },
        translatePinZpkLmkDecode: {
            0: {
                request: bufferize('303030314A46303035303439323438'),
                response: {
                    errorCode: '00',
                    pin: bufferize([53, 48, 52, 57, 50, 52, 56])
                }
            },
            1: {
                request: bufferize('303033334A463130'),
                response: 'payshield.translatePinZpkLmk.10'
            },
            2: {
                request: bufferize('303034334A463233'),
                response: 'payshield.translatePinZpkLmk.23'
            }
        },
        translatePinTpkLmkEncode: {
            0: {
                request: {
                    tpk: 'U95F693B7A4DF212C165A8D2FF44550D8',
                    pinBlock: '8475B774B6C63C52',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303031344A43553935463639334237413444463231324331363541384432464634343535304438383437354237373442364336334335323031353430303038393030303039'
            }
        },
        translatePinTpkLmkDecode: {
            0: {
                request: bufferize('303030304A44303030333935373032'),
                response: {
                    errorCode: '00',
                    pin: bufferize([48, 51, 57, 53, 55, 48, 50])
                }
            },
            1: {
                request: bufferize('303032384A443130'),
                response: 'payshield.translatePinTpkLmk.10'
            },
            2: {
                request: bufferize('303032394A443233'),
                response: 'payshield.translatePinTpkLmk.23'
            }
        },
        translatePinLmkZpkEncode: {
            0: {
                request: {
                    zpk: 'U592A36AE05F8E181AB3939B1D29BD8D1',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    delimiter: '',
                    delimiterLength: 0,
                    pin: '5049248',
                    pinLength: 7,
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303031324A47553539324133364145303546384531383141423339333942314432394244384431303135343030303839303030303935303439323438'
            }
        },
        translatePinLmkZpkDecode: {
            0: {
                request: bufferize('303030324A48303038374338333246373137394539434345'),
                response: {
                    errorCode: '00',
                    pinBlock: '87C832F7179E9CCE'
                }
            },
            1: {
                request: bufferize('303031304A483131'),
                response: 'payshield.translatePinLmkZpk.11'
            },
            2: {
                request: bufferize('303032304A483233'),
                response: 'payshield.translatePinLmkZpk.23'
            },
            3: {
                request: {},
                response: {}
            }
        },
        translatePinZpkZpkEncode: {
            0: {
                request: {
                    sourceZpk: 'UBB224A0D70899E7D216A4DDDA615C078',
                    destinationZpk: 'UEE424E608E9CF0071E239F9E15032C81',
                    maximumPinLength: '12',
                    sourcePinBlock: '14D3E09CD3B6456E',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '540028800010',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303131434355424232323441304437303839394537443231364134444444413631354330373855454534323445363038453943463030373145323339463945313530333243383131323134443345303943443342363435364530313031353430303238383030303130'
            },
            1: {
                request: {
                    sourceZpk: 'UBB224A0D70899E7D216A4DDDA615C078',
                    destinationZpk: 'UEE424E608E9CF0071E239F9E15032C81',
                    maximumPinLength: '12',
                    sourcePinBlock: 'E870CDC8E067EB2E',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '239010000012',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303131434355424232323441304437303839394537443231364134444444413631354330373855454534323445363038453943463030373145323339463945313530333243383131324538373043444338453036374542324530313031323339303130303030303132'
            }
        },
        translatePinZpkZpkDecode: {
            0: {
                request: bufferize('30323438434430303036304534413242464137384532343446463031'),
                response: {
                    errorCode: '00',
                    checkLength: '06',
                    pinBlock: '0E4A2BFA78E244FF',
                    pinBlockFormat: '01'
                }
            },
            1: {
                request: bufferize('30313930434430303034424542433338454235383646453432353031'),
                response: {
                    errorCode: '00',
                    checkLength: '04',
                    pinBlock: 'BEBC38EB586FE425',
                    pinBlockFormat: '01'
                }
            },
            2: {
                request: bufferize('3032373143443130'),
                response: 'payshield.translatePinZpkZpk.10'
            },
            3: {
                request: bufferize('3032373643443131'),
                response: 'payshield.translatePinZpkZpk.11'
            },
            4: {
                request: bufferize('3033303143443233'),
                response: 'payshield.translatePinZpkZpk.23'
            },
            5: {
                request: bufferize('3033313043443230'),
                response: 'payshield.translatePinZpkZpk.20'
            }
        },
        translatePinBdkBdkZpkEncode: {
            0: {
                request: {
                    sourceKeyFlag: '',
                    sourceKeyFlagLength: 0,
                    sourceKey: 'U3702EF0DEF15CB6DD5367784A7102C3E',
                    destinationKeyFlag: '',
                    destinationKeyFlagLength: 0,
                    destinationKey: 'U3CBFC71309FC372E9A32EA67BE4C81C9',
                    sourceKsnDescriptor: 'A05',
                    sourceKsnLength: 20,
                    sourceKsn: 'FFFF000001315240003A',
                    destinationKsnDescriptor: '',
                    destinationKsnDescriptorLength: 0,
                    destinationKsn: '',
                    destinationKsnLength: 0,
                    sourcePinBlock: '496F07B85222517D',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '540008900009',
                    destinationPanDelimiter: '',
                    destinationPanDelimiterLength: 0,
                    destinationPan: '',
                    destinationPanLength: 0,
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303131473055333730324546304445463135434236444435333637373834413731303243334555334342464337313330394643333732453941333245413637424534433831433941303546464646303030303031333135323430303033413439364630374238353232323531374430313031353430303038393030303039'
            }
        },
        translatePinBdkBdkZpkDecode: {
            0: {
                request: bufferize('30303034473130303036373544423044314144443937354346383031'),
                response: {
                    errorCode: '00',
                    checkLength: '06',
                    pinBlock: '75DB0D1ADD975CF8',
                    pinBlockFormat: '01'
                }
            },
            1: {
                request: bufferize('3032373147313130'),
                response: 'payshield.translatePinBdkBdkZpk.10'
            },
            2: {
                request: bufferize('3032373147313131'),
                response: 'payshield.translatePinBdkBdkZpk.11'
            },
            3: {
                request: bufferize('3032373147313233'),
                response: 'payshield.translatePinBdkBdkZpk.23'
            },
            4: {
                request: bufferize('3032373147313230'),
                response: 'payshield.translatePinBdkBdkZpk.20'
            }
        },
        generateCvvEncode: {
            0: {
                request: {
                    cvk: 'UE16D4CD9EAB610034BDE2A50935BCFBE',
                    panLength: 18,
                    pan: '502265400089000092',
                    expirationDate: '2010',
                    serviceCode: '620',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313143575545313644344344394541423631303033344244453241353039333542434642453530323236353430303038393030303039323B32303130363230'
            },
            1: {
                request: {
                    cvk: 'UE16D4CD9EAB610034BDE2A50935BCFBE',
                    panLength: 12,
                    pan: '502265000092',
                    expirationDate: '2010',
                    serviceCode: '999',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313143575545313644344344394541423631303033344244453241353039333542434642453530323236353030303039323B32303130393939'
            }
        },
        generateCvvDecode: {
            0: {
                request: bufferize('3030343643583030373035'),
                response: {
                    errorCode: '00',
                    cvv: '705'
                }
            },
            1: {
                request: bufferize('3031373143583030343633'),
                response: {
                    errorCode: '00',
                    cvv: '463'
                }
            },
            2: {
                request: bufferize('3030303243583130'),
                response: 'payshield.generateCvv.10'
            },
            3: {
                request: bufferize('3030313343583135'),
                response: 'payshield.generateCvv.15'
            }
        },
        verifyCvvEncode: {
            0: {
                request: {
                    cvk: 'UE16D4CD9EAB610034BDE2A50935BCFBE',
                    panLength: 18,
                    pan: '502265400089000092',
                    expirationDate: '2010',
                    cvv: '463',
                    serviceCode: '620',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313143595545313644344344394541423631303033344244453241353039333542434642453436333530323236353430303038393030303039323B32303130363230'
            },
            1: {
                request: {
                    cvk: 'UE16D4CD9EAB610034BDE2A50935BCFBE',
                    cvv: '705',
                    panLength: 12,
                    pan: '502265000092',
                    expirationDate: '2010',
                    serviceCode: '999',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313143595545313644344344394541423631303033344244453241353039333542434642453730353530323236353030303039323B32303130393939'
            }
        },
        verifyCvvDecode: {
            0: {
                request: bufferize('30323631435A3030'),
                response: {
                    errorCode: '00'
                }
            },
            1: {
                request: bufferize('30313131435A3030'),
                response: {
                    errorCode: '00'
                }
            },
            2: {
                request: bufferize('30323739435A3031'),
                response: 'payshield.verifyCvv.01'
            },
            3: {
                request: bufferize('30323836435A3130'),
                response: 'payshield.verifyCvv.10'
            },
            4: {
                request: bufferize('30323934435A3135'),
                response: 'payshield.verifyCvv.15'
            }
        },
        verifyTermPinIbmEncode: {
            0: {
                request: {
                    tpk: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    maximumPinLength: '12',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    checkLength: '06',
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5022654000N2',
                    offset: '876955ffffff',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313144415533303237433839353138314439313241393144374446304544373841433646425538304145334638443633423038463943313336353245353431364437364538443132413639463945373634363930344236383031303635343030303839303030303930313233343536373839313233343536353032323635343030304E32383736393535464646464646'
            },
            1: {
                request: {
                    tpk: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    maximumPinLength: '12',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    checkLength: '06',
                    pan: '540008900009',
                    decimalisationTable: '5432109876543210',
                    pinValidationData: '5022654000N2',
                    offset: '757798ffffff',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313144415533303237433839353138314439313241393144374446304544373841433646425538304145334638443633423038463943313336353245353431364437364538443132413639463945373634363930344236383031303635343030303839303030303935343332313039383736353433323130353032323635343030304E32373537373938464646464646'
            }
        },
        verifyTermPinIbmDecode: {
            0: {
                request: bufferize('3132333244423032'),
                response: {
                    errorCode: '02'
                }
            },
            1: {
                request: bufferize('3132323344423032'),
                response: {
                    errorCode: '02'
                }
            },
            2: {
                request: bufferize('3030333944423031'),
                response: 'payshield.verifyTermPinIbm.01'
            },
            3: {
                request: bufferize('3030353444423131'),
                response: 'payshield.verifyTermPinIbm.11'
            },
            4: {
                request: bufferize('3030363244423130'),
                response: 'payshield.verifyTermPinIbm.10'
            },
            5: {
                request: bufferize('3030363744423135'),
                response: 'payshield.verifyTermPinIbm.15'
            }
        },
        generateOffsetIbmLmkEncode: {
            0: {
                request: {
                    account: '654000890009',
                    checkLength: '6',
                    decimalisationTable: '0123456789012345',
                    encryptedPinLength: 8,
                    pin: '73638636',
                    pinValidationData: '5022654000N2',
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    pvkLength: 33,
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313144455537373333384637344131394533424233393036324135413437393437334643383733363338363336303636353430303038393030303930313233343536373839303132333435353032323635343030304E32'
            },
            1: {
                request: {
                    account: '502265000092',
                    checkLength: '4',
                    decimalisationTable: '6543210987654321',
                    encryptedPinLength: 8,
                    pin: '58652088',
                    pinValidationData: '5022650000N2',
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    pvkLength: 33,
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030313144455537373333384637344131394533424233393036324135413437393437334643383538363532303838303435303232363530303030393236353433323130393837363534333231353032323635303030304E32'
            }
        },
        generateOffsetIbmLmkDecode: {
            0: {
                request: bufferize('3031353944463032303030303030464646464646'),
                response: {
                    errorCode: '02',
                    offset: '000000FFFFFF'
                }
            },
            1: {
                request: bufferize('3031363344463032303030304646464646464646'),
                response: {
                    errorCode: '02',
                    offset: '0000FFFFFFFF'
                }
            },
            2: {
                request: bufferize('3030303144463130'),
                response: 'payshield.generateOffsetIbmLmk.10'
            },
            3: {
                request: bufferize('3030303844463235'),
                response: 'payshield.generateOffsetIbmLmk.25'
            },
            4: {
                request: bufferize('3030313344463135'),
                response: 'payshield.generateOffsetIbmLmk.15'
            }
        },
        generatePvvLmkEncode: {
            0: {
                request: {
                    pvkLength: 33,
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    encryptedPinLength: 8,
                    pin: '73638636',
                    account: '654000890009',
                    pvki: '1',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324447553737333338463734413139453342423339303632413541343739343733464338373336333836333636353430303038393030303931'
            },
            1: {
                request: {
                    pvkLength: 33,
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    encryptedPinLength: 8,
                    pin: '58652088',
                    account: '502265000092',
                    pvki: '4',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324447553737333338463734413139453342423339303632413541343739343733464338353836353230383835303232363530303030393234'
            }
        },
        generatePvvLmkDecode: {
            0: {
                request: bufferize('303031364448303038313536'),
                response: {
                    errorCode: '00',
                    pvv: '8156'
                }
            },
            1: {
                request: bufferize('303032374448303031343931'),
                response: {
                    errorCode: '00',
                    pvv: '1491'
                }
            },
            2: {
                request: bufferize('3030303044483130'),
                response: 'payshield.generatePvvLmk.10'
            },
            3: {
                request: bufferize('3030313144483135'),
                response: 'payshield.generatePvvLmk.15'
            }
        },
        derivePinIbmEncode: {
            0: {
                request: {
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    pvkLength: 33,
                    offset: '000000ffffff',
                    checkLength: '6',
                    account: '654000890009',
                    decimalisationTable: '0123456789012345',
                    pinValidationData: '5022654000N2',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303031314545553737333338463734413139453342423339303632413541343739343733464338303030303030464646464646303636353430303038393030303930313233343536373839303132333435353032323635343030304E32'
            },
            1: {
                request: {
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    pvkLength: 33,
                    offset: '0000ffffffff',
                    checkLength: '4',
                    account: '502265000092',
                    decimalisationTable: '6543210987654321',
                    pinValidationData: '5022650000N2',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303031314545553737333338463734413139453342423339303632413541343739343733464338303030304646464646464646303435303232363530303030393236353433323130393837363534333231353032323635303030304E32'
            }
        },
        derivePinIbmDecode: {
            0: {
                request: bufferize('30303531454630323733363338363336'),
                response: {
                    errorCode: '02',
                    pin: bufferize([55, 51, 54, 51, 56, 54, 51, 54])
                }
            },
            1: {
                request: bufferize('30303838454630323538363532303838'),
                response: {
                    errorCode: '02',
                    pin: bufferize([53, 56, 54, 53, 50, 48, 56, 56])
                }
            },
            2: {
                request: bufferize('3030393145463130'),
                response: 'payshield.derivePinIbm.10'
            },
            3: {
                request: bufferize('3030393945463235'),
                response: 'payshield.derivePinIbm.25'
            },
            4: {
                request: bufferize('3031313445463135'),
                response: 'payshield.derivePinIbm.15'
            }
        },
        hashDataBlockEncode: {
            0: {
                request: {
                    hashId: '06',
                    messageDataLength: 16,
                    messageData: '77338F74A19E3BB39062A5A479473FC8',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303032474D3036303030313677338F74A19E3BB39062A5A479473FC8'
            },
            1: {
                request: {
                    hashId: '01',
                    messageDataLength: 17,
                    messageData: '736F6D65206461746120746F2068617368',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303032474D30313030303137736F6D65206461746120746F2068617368'
            }
        },
        hashDataBlockDecode: {
            0: {
                request: bufferize('30353938474E303068EBB852B948D5A06F1F309580D3EBD85C5F8697B4B42C5656584A37A2DDB96C'),
                response: {
                    errorCode: '00',
                    hash: bufferize([104, 235, 184, 82, 185, 72, 213, 160, 111, 31, 48, 149, 128, 211, 235, 216, 92, 95, 134, 151, 180, 180, 44, 86, 86, 88, 74, 55, 162, 221, 185, 108])
                }
            },
            1: {
                request: bufferize('30303030474E30303D22CA807AD75C9FF3CA07C4E6C396B7D99F7206'),
                response: {
                    errorCode: '00',
                    hash: bufferize([61, 34, 202, 128, 122, 215, 92, 159, 243, 202, 7, 196, 230, 195, 150, 183, 217, 159, 114, 6])
                }
            },
            2: {
                request: bufferize('30303031474E3035'),
                response: 'payshield.hashDataBlock.05'
            }
        },
        generateArqc3Encode: {
            0: {
                request: {
                    modeFlag: 0,
                    schemeId: 0,
                    mkac: 'U562B7C198A58D28851F15517CDABA60E',
                    mksmiLength: 0,
                    mksmi: '',
                    panSeqNo: '7804020000000000',
                    atc: '0018',
                    unpredictableNumber: '84F01F9D',
                    transactionDataLengthLength: 2,
                    transactionDataLengthDec: 40,
                    transactionDataLengthHex: '28',
                    transactionData: '0000000000000000000000000288800004800002881712200184F01F9D1402030018000018000000',
                    delimiterLength: 1,
                    delimiter: ';',
                    arqc: '0A994C22203060C4',
                    arcLength: 0,
                    arc: '',
                    discretionaryDataMacLength: 0,
                    discretionaryDataMac: '',
                    discretionaryDataBytesLength: 0,
                    discretionaryDataBytes: '',
                    discretionaryDataLength: 0,
                    discretionaryData: '',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324B5130305535363242374331393841353844323838353146313535313743444142413630457804020000000000001884F01F9D32380000000000000000000000000288800004800002881712200184F01F9D14020300180000180000003B0A994C22203060C4'
            },
            1: {
                request: {
                    modeFlag: 2,
                    schemeId: 0,
                    mkac: 'U562B7C198A58D28851F15517CDABA60E',
                    mksmiLength: 0,
                    mksmi: '',
                    panSeqNo: '7804020000000000',
                    atc: '0018',
                    unpredictableNumber: '84F01F9D',
                    transactionDataLengthLength: 0,
                    transactionDataLengthDec: '',
                    transactionDataLengthHex: '',
                    transactionData: '',
                    delimiterLength: 0,
                    delimiter: '',
                    arqc: '0A994C22203060C4',
                    arcLength: 2,
                    arc: '',
                    discretionaryDataMacLength: 0,
                    discretionaryDataMac: '',
                    discretionaryDataBytesLength: 0,
                    discretionaryDataBytes: '',
                    discretionaryDataLength: 0,
                    discretionaryData: '',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324B5132305535363242374331393841353844323838353146313535313743444142413630457804020000000000001884F01F9D0A994C22203060C40000'
            },
            2: {
                request: {
                    modeFlag: 3,
                    schemeId: 0,
                    mkac: 'U562B7C198A58D28851F15517CDABA60E',
                    mksmiLength: 33,
                    mksmi: 'U0A955B42C931A7FD3F2B12B1595CB3FB',
                    panSeqNo: '7804020000000000',
                    atc: '0018',
                    unpredictableNumber: '84F01F9D',
                    transactionDataLengthLength: 2,
                    transactionDataLengthDec: 40,
                    transactionDataLengthHex: '28',
                    transactionData: '0000000000000000000000000288800004800002881712200184F01F9D1402030018000018000000',
                    delimiterLength: 1,
                    delimiter: ';',
                    arqc: '0A994C22203060C4',
                    arcLength: 0,
                    arc: '',
                    discretionaryDataMacLength: 4,
                    discretionaryDataMac: '63EB7F42',
                    discretionaryDataBytesLength: 2,
                    discretionaryDataBytes: '08',
                    discretionaryDataLength: 8,
                    discretionaryData: '4E6F772069732074',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324B5133305535363242374331393841353844323838353146313535313743444142413630455530413935354234324339333141374644334632423132423135393543423346427804020000000000001884F01F9D32380000000000000000000000000288800004800002881712200184F01F9D14020300180000180000003B0A994C22203060C463EB7F4230384E6F772069732074'
            },
            3: {
                request: {
                    modeFlag: 4,
                    schemeId: 0,
                    mkac: 'U562B7C198A58D28851F15517CDABA60E',
                    mksmiLength: 33,
                    mksmi: 'U0A955B42C931A7FD3F2B12B1595CB3FB',
                    panSeqNo: '7804020000000000',
                    atc: '0018',
                    unpredictableNumber: '84F01F9D',
                    transactionDataLengthLength: 2,
                    transactionDataLengthDec: 40,
                    transactionDataLengthHex: '28',
                    transactionData: '0000000000000000000000000288800004800002881712200184F01F9D1402030018000018000000',
                    delimiterLength: 1,
                    delimiter: ';',
                    arqc: '0A994C22203060C4',
                    arcLength: 2,
                    arc: '3030',
                    discretionaryDataMacLength: 4,
                    discretionaryDataMac: '63EB7F42',
                    discretionaryDataBytesLength: 2,
                    discretionaryDataBytes: '08',
                    discretionaryDataLength: 8,
                    discretionaryData: '4E6F772069732074',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324B5134305535363242374331393841353844323838353146313535313743444142413630455530413935354234324339333141374644334632423132423135393543423346427804020000000000001884F01F9D32380000000000000000000000000288800004800002881712200184F01F9D14020300180000180000003B0A994C22203060C4303063EB7F4230384E6F772069732074'
            }
        },
        generateArqc3Decode: {
            0: {
                request: bufferize('323034304B523030'),
                response: {
                    errorCode: '00',
                    arpc: bufferize([])
                }
            },
            1: {
                request: bufferize('303038384B52303095BD8DFD502CA21F'),
                response: {
                    errorCode: '00',
                    arpc: bufferize([149, 189, 141, 253, 80, 44, 162, 31])
                }
            },
            2: {
                request: bufferize('303030314B523030'),
                response: {
                    errorCode: '00',
                    arpc: bufferize([])
                }
            },
            3: {
                request: bufferize('303031304B52303095BD8DFD502CA21F'),
                response: {
                    errorCode: '00',
                    arpc: bufferize([149, 189, 141, 253, 80, 44, 162, 31])
                }
            },
            4: {
                request: bufferize('303230324B5230310A994C22203060C4'),
                response: 'payshield.generateArqc3.01'
            },
            5: {
                request: bufferize('303236354B523033'),
                response: 'payshield.generateArqc3.03'
            },
            6: {
                request: bufferize('303238374B523034'),
                response: 'payshield.generateArqc3.04'
            },
            7: {
                request: bufferize('303330324B523035'),
                response: 'payshield.generateArqc3.05'
            },
            8: {
                request: bufferize('303332304B523130'),
                response: 'payshield.generateArqc3.10'
            },
            9: {
                request: bufferize('303332384B523131'),
                response: 'payshield.generateArqc3.11'
            }
        },
        generateArqc4Encode: {
            0: {
                request: {
                    modeFlag: 0,
                    schemeId: 2,
                    mkac: 'U418E7E54279CEA4D298485F9F8F4AFD2',
                    ivacLength: 0,
                    ivac: '',
                    panSeqNoLengthLength: 0,
                    panLength: '',
                    panSeqNoLength: 8,
                    panSeqNo: '7804020000001800',
                    delimiter1Length: 0,
                    delimiter1: '',
                    branchHeightParamsLength: 0,
                    branchHeightParams: '',
                    atc: '0003',
                    transactionDataLengthLength: 2,
                    transactionDataLengthDec: 72,
                    transactionDataLengthHex: '48',
                    transactionData: '00000001000000000000000006088010040000060818010201B21BB356180000030FA501803000000000000000000000000F00000000000000000000000000000000000000000000',
                    delimiter2Length: 1,
                    delimiter2: ';',
                    arqc: 'F67B7E07A55DF243',
                    arcLength: 0,
                    arc: '',
                    csuLength: 0,
                    csu: '',
                    padLengthLength: 0,
                    padLength: '',
                    pad: '',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324B57303255343138453745353432373943454134443239383438354639463846344146443278040200000018000003343800000001000000000000000006088010040000060818010201B21BB356180000030FA501803000000000000000000000000F000000000000000000000000000000000000000000003BF67B7E07A55DF243'
            },
            1: {
                request: {
                    modeFlag: 0,
                    schemeId: 2,
                    mkac: 'U518763AC61FB53E22306C1D85978C39C',
                    ivacLength: 0,
                    ivac: '',
                    panSeqNoLengthLength: 0,
                    panLength: '',
                    panSeqNoLength: 8,
                    panSeqNo: '3239010000012101',
                    delimiter1Length: 0,
                    delimiter1: '',
                    branchHeightParamsLength: 0,
                    branchHeightParams: '',
                    atc: '005B',
                    transactionDataLengthLength: 2,
                    transactionDataLengthDec: 32,
                    transactionDataLengthHex: '20',
                    transactionData: '0FA501A13102000000000000000000000F010000000000000000000000000000',
                    delimiter2Length: 1,
                    delimiter2: ';',
                    arqc: 'DDA6BCC881C093AD',
                    arcLength: 0,
                    arc: '',
                    csuLength: 0,
                    csu: '',
                    padLengthLength: 0,
                    padLength: '',
                    pad: '',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324B5730325535313837363341433631464235334532323330364331443835393738433339433239010000012101005B32300FA501A13102000000000000000000000F0100000000000000000000000000003BDDA6BCC881C093AD'
            },
            2: {
                request: {
                    modeFlag: 4,
                    schemeId: 2,
                    mkac: 'U518763AC61FB53E22306C1D85978C39C',
                    ivacLength: 0,
                    ivac: '',
                    panSeqNoLengthLength: 0,
                    panLength: '',
                    panSeqNoLength: 8,
                    panSeqNo: '3239010000012101',
                    delimiter1Length: 0,
                    delimiter1: '',
                    branchHeightParamsLength: 0,
                    branchHeightParams: '',
                    atc: '005B',
                    transactionDataLengthLength: 0,
                    transactionDataLengthDec: '',
                    transactionDataLengthHex: '',
                    transactionData: '',
                    delimiter2Length: 0,
                    delimiter2: '',
                    arqc: 'DDA6BCC881C093AD',
                    arcLength: 0,
                    arc: '',
                    csuLength: 4,
                    csu: '00000000',
                    padLengthLength: 1,
                    padLength: 5,
                    pad: '8080040000',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324B5734325535313837363341433631464235334532323330364331443835393738433339433239010000012101005BDDA6BCC881C093AD00000000358080040000'
            }
        },
        generateArqc4Decode: {
            0: {
                request: bufferize('303030364B583030'),
                response: {
                    errorCode: '00',
                    arpc: bufferize([])
                }
            },
            1: {
                request: bufferize('303032344B583030'),
                response: {
                    errorCode: '00',
                    arpc: bufferize([])
                }
            },
            2: {
                request: bufferize('303236334B583030A62169F300000000'),
                response: {
                    errorCode: '00',
                    arpc: bufferize([166, 33, 105, 243, 0, 0, 0, 0])
                }
            },
            3: {
                request: bufferize('303239324B583031F67B7E07A55DF243'),
                response: 'payshield.generateArqc4.01'
            },
            4: {
                request: bufferize('303330304B583034'),
                response: 'payshield.generateArqc4.04'
            },
            5: {
                request: bufferize('303330374B583035'),
                response: 'payshield.generateArqc4.05'
            },
            6: {
                request: bufferize('303338374B583130'),
                response: 'payshield.generateArqc4.10'
            }
        },
        translateDtabEncode: {
            0: {
                request: {
                    decimalisationTable: 'ABCDEF1231234567'
                },
                response: '303032324C4F41424344454631323331323334353637'
            }
        },
        translateDtabDecode: {
            0: {
                request: bufferize('303030304C50303037363534333231333231464544434241'),
                response: {
                    errorCode: '00',
                    decimalisationTableTranslated: '7654321321FEDCBA'
                }
            },
            1: {
                request: bufferize('303030304C503333'),
                response: 'payshield.translateDtab.33'
            }
        },
        encryptDataBlockEncode: {
            0: {
                request: {
                    modeFlag: '00',
                    inputFormatFlag: '1',
                    outputFormatFlag: '1',
                    keyType: '00B',
                    key: 'UB190F7FBB802EA14FAC7917D3F6EDB67',
                    ksnDescriptorLength: 0,
                    ksnDescriptor: '',
                    ksnLength: 0,
                    ksn: '',
                    ivLength: 0,
                    iv: '',
                    messageDataLengthHex: '20',
                    messageDataLength: 32,
                    messageData: '0400980C0002AE900AF140D0C21230D7',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324D3030303131303042554231393046374642423830324541313446414337393137443346364544423637303032303034303039383043303030324145393030414631343044304332313233304437'
            },
            1: {
                request: {
                    modeFlag: '00',
                    inputFormatFlag: '2',
                    outputFormatFlag: '1',
                    keyType: '00B',
                    key: 'UB190F7FBB802EA14FAC7917D3F6EDB67',
                    ksnDescriptorLength: 0,
                    ksnDescriptor: '',
                    ksnLength: 0,
                    ksn: '',
                    ivLength: 0,
                    iv: '',
                    messageDataLengthHex: '20',
                    messageDataLength: 32,
                    messageData: '0400980C0002AE900AF140D0C21230D7',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324D3030303231303042554231393046374642423830324541313446414337393137443346364544423637303032303034303039383043303030324145393030414631343044304332313233304437'
            }
        },
        encryptDataBlockDecode: {
            0: {
                request: bufferize('303030364D313030303032303331314438443133463843363137454638333834343143333645333341364441'),
                response: {
                    errorCode: '00',
                    rest: bufferize([48, 48, 50, 48, 51, 49, 49, 68, 56, 68, 49, 51, 70, 56, 67, 54, 49, 55, 69, 70, 56, 51, 56, 52, 52, 49, 67, 51, 54, 69, 51, 51, 65, 54, 68, 65])
                }
            },
            1: {
                request: bufferize('303038334D3130303030343038314536424446333530433733454431333639384532433133353642353836323243333837314432383436464331313044443745374139443130323445433038'),
                response: {
                    errorCode: '00',
                    rest: bufferize([48, 48, 52, 48, 56, 49, 69, 54, 66, 68, 70, 51, 53, 48, 67, 55, 51, 69, 68, 49, 51, 54, 57, 56, 69, 50, 67, 49, 51, 53, 54, 66, 53, 56, 54, 50, 50, 67, 51, 56, 55, 49, 68, 50, 56, 52, 54, 70, 67, 49, 49, 48, 68, 68, 55, 69, 55, 65, 57, 68, 49, 48, 50, 52, 69, 67, 48, 56])
                }
            },
            2: {
                request: bufferize('303030354D313032'),
                response: 'payshield.encryptDataBlock.02'
            },
            3: {
                request: bufferize('303030304D313033'),
                response: 'payshield.encryptDataBlock.03'
            },
            4: {
                request: bufferize('303030314D313034'),
                response: 'payshield.encryptDataBlock.04'
            },
            5: {
                request: bufferize('303030304D313035'),
                response: 'payshield.encryptDataBlock.05'
            },
            6: {
                request: bufferize('303030314D313130'),
                response: 'payshield.encryptDataBlock.10'
            }
        },
        decryptDataBlockEncode: {
            0: {
                request: {
                    modeFlag: '00',
                    bpsRadixFlag: '',
                    bpsRadixFlagLength: 0,
                    bpsRadixValue: '',
                    bpsRadixValueLength: 0,
                    bpsTweak: '',
                    bpsTweakLength: 0,
                    inputFormatFlag: '1',
                    outputFormatFlag: '1',
                    keyType: '00B',
                    key: 'UB190F7FBB802EA14FAC7917D3F6EDB67',
                    ksnDescriptor: '',
                    ksnDescriptorLength: 0,
                    ksn: '',
                    ksnLength: 0,
                    iv: '',
                    ivLength: 0,
                    messageDataLengthHex: '20',
                    messageData: '311D8D13F8C617EF838441C36E33A6DA',
                    messageDataLength: 32,
                    deliminaterLmk: '%',
                    deliminaterLmkLen: 1,
                    lmkIdentifier: '00',
                    lmkIdentifierLen: 2
                },
                response: '303030324D3230303131303042554231393046374642423830324541313446414337393137443346364544423637303032303331314438443133463843363137454638333834343143333645333341364441253030'
            },
            1: {
                request: {
                    modeFlag: '00',
                    bpsRadixFlag: '',
                    bpsRadixFlagLength: 0,
                    bpsRadixValue: '',
                    bpsRadixValueLength: 0,
                    bpsTweak: '',
                    bpsTweakLength: 0,
                    inputFormatFlag: '1',
                    outputFormatFlag: '2',
                    keyType: '00B',
                    key: 'UB190F7FBB802EA14FAC7917D3F6EDB67',
                    ksnDescriptor: '',
                    ksnDescriptorLength: 0,
                    ksn: '',
                    ksnLength: 0,
                    iv: '',
                    ivLength: 0,
                    messageDataLengthHex: '40',
                    messageData: '81E6BDF350C73ED13698E2C1356B58622C3871D2846FC110DD7E7A9D1024EC08',
                    messageDataLength: 64,
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324D32303031323030425542313930463746424238303245413134464143373931374433463645444236373030343038314536424446333530433733454431333639384532433133353642353836323243333837314432383436464331313044443745374139443130323445433038'
            }
        },
        decryptDataBlockDecode: {
            0: {
                request: bufferize('303031334D333030303032303034303039383043303030324145393030414631343044304332313233304437'),
                response: {
                    errorCode: '00',
                    rest: bufferize([48, 48, 50, 48, 48, 52, 48, 48, 57, 56, 48, 67, 48, 48, 48, 50, 65, 69, 57, 48, 48, 65, 70, 49, 52, 48, 68, 48, 67, 50, 49, 50, 51, 48, 68, 55])
                }
            },
            1: {
                request: bufferize('303033364D333030303032303034303039383043303030324145393030414631343044304332313233304437'),
                response: {
                    errorCode: '00',
                    rest: bufferize([48, 48, 50, 48, 48, 52, 48, 48, 57, 56, 48, 67, 48, 48, 48, 50, 65, 69, 57, 48, 48, 65, 70, 49, 52, 48, 68, 48, 67, 50, 49, 50, 51, 48, 68, 55])
                }
            },
            2: {
                request: bufferize('303030304D333032'),
                response: 'payshield.decryptDataBlock.02'
            },
            3: {
                request: bufferize('303030304D333034'),
                response: 'payshield.decryptDataBlock.04'
            },
            4: {
                request: bufferize('303030304D333033'),
                response: 'payshield.decryptDataBlock.03'
            },
            5: {
                request: bufferize('303030304D333035'),
                response: 'payshield.decryptDataBlock.05'
            },
            6: {
                request: bufferize('303030304D333130'),
                response: 'payshield.decryptDataBlock.10'
            }
        },
        translateDataBlockEncode: {
            0: {
                request: {
                    sourceModeFlag: '00',
                    destinationModeFlag: '00',
                    inputFormatFlag: '1',
                    outputFormatFlag: '1',
                    sourceKeyType: '00B',
                    sourceKey: 'UB190F7FBB802EA14FAC7917D3F6EDB67',
                    sourceKsnDescriptor: '',
                    sourceKsnDescriptorLength: 0,
                    sourceKsn: '',
                    sourceKsnLength: 0,
                    destinationKeyType: '00B',
                    destinationKey: 'U69721302D9FB7876D98CDDA0FDE1A09B',
                    destinationKsnDescriptor: '',
                    destinationKsnDescriptorLength: 0,
                    destinationKsn: '',
                    destinationKsnLength: 0,
                    sourceIv: '',
                    sourceIvLength: 0,
                    destinationIv: '',
                    destinationIvLength: 0,
                    messageDataLengthHex: '20',
                    messageData: '311D8D13F8C617EF838441C36E33A6DA',
                    messageDataLength: 32,
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324D34303030303131303042554231393046374642423830324541313446414337393137443346364544423637303042553639373231333032443946423738373644393843444441304644453141303942303032303331314438443133463843363137454638333834343143333645333341364441'
            }
        },
        translateDataBlockDecode: {
            0: {
                request: bufferize('303031384D353030303032304644364146423545433834314530384144313731414531344133393732303938'),
                response: {
                    errorCode: '00',
                    rest: bufferize([48, 48, 50, 48, 70, 68, 54, 65, 70, 66, 53, 69, 67, 56, 52, 49, 69, 48, 56, 65, 68, 49, 55, 49, 65, 69, 49, 52, 65, 51, 57, 55, 50, 48, 57, 56])
                }
            },
            1: {
                request: bufferize('303036334D353032'),
                response: 'payshield.translateDataBlock.02'
            },
            2: {
                request: bufferize('303036394D353037'),
                response: 'payshield.translateDataBlock.07'
            },
            3: {
                request: bufferize('303038314D353131'),
                response: 'payshield.translateDataBlock.11'
            }
        },
        generateMacEncode: {
            0: {
                request: {
                    modeFlag: '0',
                    inputFormatFlag: '2',
                    macSize: '0',
                    macAlgorithm: '3',
                    paddingMethod: '1',
                    keyType: '003',
                    key: 'U5FFE8014DA383D44C24AB41E37DB252F',
                    ivLength: 0,
                    iv: '',
                    macDataLengthHex: '1E',
                    macDataLength: 30,
                    macData: '22\u001c002000001\u001c\u001c05151009\u001cF\u001c60000',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324D3630323033313030335535464645383031344441333833443434433234414234314533374442323532463030314532321C3030323030303030311C1C30353135313030391C461C3630303030'
            },
            1: {
                request: {
                    modeFlag: '0',
                    inputFormatFlag: '0',
                    macSize: '0',
                    macAlgorithm: '3',
                    paddingMethod: '1',
                    keyType: '008',
                    key: 'UF759EF72F15F88933CB9B86E54C9DC83',
                    ivLength: 0,
                    iv: '',
                    macDataLengthHex: '1E',
                    macDataLength: 30,
                    macData: '22\u001c002000001\u001c\u001c05151009\u001cF\u001c60000',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324D3630303033313030385546373539454637324631354638383933334342394238364535344339444338333030314532321C3030323030303030311C1C30353135313030391C461C3630303030'
            }
        },
        generateMacDecode: {
            0: {
                request: bufferize('303034384D3730304335374534323935'),
                response: {
                    errorCode: '00',
                    rest: bufferize([67, 53, 55, 69, 52, 50, 57, 53])
                }
            },
            1: {
                request: bufferize('303034384D3730304246323637363545'),
                response: {
                    errorCode: '00',
                    rest: bufferize([66, 70, 50, 54, 55, 54, 53, 69])
                }
            },
            2: {
                request: bufferize('303030304D373032'),
                response: 'payshield.generateMac.02'
            },
            3: {
                request: bufferize('303030344D373033'),
                response: 'payshield.generateMac.03'
            },
            4: {
                request: bufferize('303030314D373035'),
                response: 'payshield.generateMac.05'
            },
            5: {
                request: bufferize('303030384D373130'),
                response: 'payshield.generateMac.10'
            }
        },
        verifyMacEncode: {
            0: {
                request: {
                    modeFlag: '0',
                    inputFormatFlag: '2',
                    macSize: '0',
                    macAlgorithm: '3',
                    paddingMethod: '1',
                    keyType: '003',
                    key: 'U5FFE8014DA383D44C24AB41E37DB252F',
                    ivLength: 0,
                    iv: '',
                    macDataLengthHex: '1E',
                    macDataLength: 30,
                    macData: '22\u001c002000001\u001c\u001c05151009\u001cF\u001c60000',
                    macLength: 8,
                    mac: 'C57E4295',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324D3830323033313030335535464645383031344441333833443434433234414234314533374442323532463030314532321C3030323030303030311C1C30353135313030391C461C36303030304335374534323935'
            },
            1: {
                request: {
                    modeFlag: '0',
                    inputFormatFlag: '0',
                    macSize: '0',
                    macAlgorithm: '3',
                    paddingMethod: '1',
                    keyType: '008',
                    key: 'UF759EF72F15F88933CB9B86E54C9DC83',
                    ivLength: 0,
                    iv: '',
                    macDataLengthHex: '1E',
                    macDataLength: 30,
                    macData: '22\u001c002000001\u001c\u001c05151009\u001cF\u001c60000',
                    macLength: 8,
                    mac: 'BF26765E',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324D3830303033313030385546373539454637324631354638383933334342394238364535344339444338333030314532321C3030323030303030311C1C30353135313030391C461C36303030304246323637363545'
            }
        },
        verifyMacDecode: {
            0: {
                request: bufferize('303034324D393030'),
                response: {
                    errorCode: '00',
                    rest: bufferize([])
                }
            },
            1: {
                request: bufferize('303036334D393030'),
                response: {
                    errorCode: '00',
                    rest: bufferize([])
                }
            },
            2: {
                request: bufferize('303030304D393031'),
                response: 'payshield.verifyMac.01'
            },
            3: {
                request: bufferize('303031314D393032'),
                response: 'payshield.verifyMac.02'
            },
            4: {
                request: bufferize('303031374D393033'),
                response: 'payshield.verifyMac.03'
            },
            5: {
                request: bufferize('303032384D393033'),
                response: 'payshield.verifyMac.03'
            },
            6: {
                request: bufferize('303033354D393130'),
                response: 'payshield.verifyMac.10'
            }
        },
        printFormatEncode: {
            0: {
                request: {
                    dataLength: 54,
                    data: '>L>L>L>L>005^1>L>L>005^3>L>L>L>L>L>L>L>030^P>L>L>L>L>L'
                },
                response: '3030303250413E4C3E4C3E4C3E4C3E3030355E313E4C3E4C3E3030355E333E4C3E4C3E4C3E4C3E4C3E4C3E4C3E3033305E503E4C3E4C3E4C3E4C3E4C'
            }
        },
        printFormatDecode: {
            0: {
                request: bufferize('3035333450423030'),
                response: {
                    errorCode: '00'
                }
            }
        },
        printPinEncode: {
            0: {
                request: {
                    documentType: 'C',
                    account: '540008900009',
                    pin: '0302477',
                    encryptedPinLength: 7,
                    printFieldsLength: 13,
                    printFields: ';Krasi;;Kolev',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303032504543353430303038393030303039303330323437373B4B726173693B3B4B6F6C6576'
            }
        },
        printPinDecode: {
            0: {
                request: bufferize('303035305046303034393634393238343135343439333337323735'),
                response: {
                    errorCode: '00',
                    checkValue: bufferize([52, 57, 54, 52, 57, 50, 56, 52, 49, 53, 52, 52, 57, 51, 51, 55, 50, 55, 53])
                }
            },
            1: {
                request: bufferize('3031313050463135'),
                response: 'payshield.printPin.15'
            }
        },
        printPinEndDecode: {
            0: {
                request: bufferize('30313335505A3030'),
                response: {
                    errorCode: '00'
                }
            },
            1: {
                request: bufferize('3030363350463136'),
                response: 'payshield.printPin.16'
            }
        },
        translateAccountNumberEncode: {
            0: {
                request: {
                    pinLength: '5',
                    pin: '01234',
                    oldAccountNumber: '1234560000001234',
                    newAccountNumber: '6543210000004321',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303330514B3031323334313233343536303030303030313233343635343332313030'
            }
        },
        translateAccountNumberDecode: {
            0: {
                request: bufferize('30303330514C30303433323130'),
                response: {
                    errorCode: '00',
                    pin: bufferize('3433323130')
                }
            },
            1: {
                request: bufferize('30303330514C3135'),
                response: 'payshield.translateAccountNumber.15'
            }
        },
        printTmkMailerEncode: {
            0: {
                request: {
                    tmk: 'U653BDD7BF37AC36B160D787BD306877B',
                    printFieldsLength: 25,
                    printFields: 'field0;Krasi;Kolev;444A82',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030303254415536353342444437424633374143333642313630443738374244333036383737426669656C64303B4B726173693B4B6F6C65763B343434413832'
            }
        },
        printTmkMailerDecode: {
            0: {
                request: bufferize('3033393054423030'),
                response: {
                    errorCode: '00'
                }
            },
            1: {
                request: bufferize('3030303054423130'),
                response: 'payshield.printTmkMailer.10'
            },
            2: {
                request: bufferize('3030303054423136'),
                response: 'payshield.printTmkMailer.16'
            }
        },
        printTmkMailerEndDecode: {
            0: {
                request: bufferize('30333930545A3030'),
                response: {
                    errorCode: '00'
                }
            }
        },
        generatePvvEncode: {
            0: {
                request: {
                    keyType: '002',
                    key: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    pvki: '4',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303032465730303255333032374338393531383144393132413931443744463045443738414336464255383041453346384436334230384639433133363532453534313644373645384441363946394537363436393034423638303135343030303839303030303934'
            },
            1: {
                request: {
                    keyType: '001',
                    key: 'UBB224A0D70899E7D216A4DDDA615C078',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pinBlock: 'ED42DE5980AB024B',
                    pinBlockFormat: '01',
                    pan: '600000000000',
                    pvki: '4',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '30303032465730303155424232323441304437303839394537443231364134444444413631354330373855383041453346384436334230384639433133363532453534313644373645384445443432444535393830414230323442303136303030303030303030303034'
            }
        },
        generatePvvDecode: {
            0: {
                request: bufferize('303033304658303032393134'),
                response: {
                    errorCode: '00',
                    pvv: '2914'
                }
            },
            1: {
                request: bufferize('303038314658303031383335'),
                response: {
                    errorCode: '00',
                    pvv: '1835'
                }
            },
            2: {
                request: bufferize('3030303746583130'),
                response: 'payshield.generatePvv.10'
            },
            3: {
                request: bufferize('3030323646583233'),
                response: 'payshield.generatePvv.23'
            }
        },
        verifyTermPinPvvEncode: {
            0: {
                request: {
                    tpk: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pvkLength: 33,
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    pvki: '4',
                    pvv: '2914',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030303244435533303237433839353138314439313241393144374446304544373841433646425538304145334638443633423038463943313336353245353431364437364538444136394639453736343639303442363830313534303030383930303030393432393134'
            }
        },
        verifyTermPinPvvDecode: {
            0: {
                request: bufferize('3032323044443030'),
                response: {
                    errorCode: '00'
                }
            },
            1: {
                request: bufferize('3032323544443031'),
                response: 'payshield.verifyTermPinPvv.01'
            },
            2: {
                request: bufferize('3032323844443130'),
                response: 'payshield.verifyTermPinPvv.10'
            },
            3: {
                request: bufferize('3032323944443131'),
                response: 'payshield.verifyTermPinPvv.11'
            },
            4: {
                request: bufferize('3032333344443135'),
                response: 'payshield.verifyTermPinPvv.15'
            }
        },
        verifyPinGeneratePvvEncode: {
            0: {
                request: {
                    keyType: '002',
                    key: 'U948B74933EAAD46C6B8BDEAD1550AF2A',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    sourcePinBlock: '2FDC581AC25C9640',
                    sourcePinBlockFormat: '01',
                    pan: '540008900009',
                    pvki: '4',
                    sourcePvv: '2914',
                    destinationPinBlock: 'B2766AACF790B197',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303030324355303032553934384237343933334541414434364336423842444541443135353041463241553830414533463844363342303846394331333635324535343136443736453844324644433538314143323543393634303031353430303038393030303039343239313442323736364141434637393042313937'
            }
        },
        verifyPinGeneratePvvDecode: {
            0: {
                request: bufferize('303030314356303033383736'),
                response: {
                    errorCode: '00',
                    pvv: '3876'
                }
            },
            1: {
                request: bufferize('3030303343563031'),
                response: 'payshield.verifyPinGeneratePvv.01'
            },
            2: {
                request: bufferize('3030303543563130'),
                response: 'payshield.verifyPinGeneratePvv.10'
            },
            3: {
                request: bufferize('3030303843563131'),
                response: 'payshield.verifyPinGeneratePvv.11'
            },
            4: {
                request: bufferize('3030313043563230'),
                response: 'payshield.verifyPinGeneratePvv.20'
            }
        },
        verifyPinGenerateOffsetEncode: {
            0: {
                request: {
                    keyType: '002',
                    key: 'U948B74933EAAD46C6B8BDEAD1550AF2A',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    sourcePinBlock: '2FDC581AC25C9640',
                    sourcePinBlockFormat: '01',
                    checkLength: 6,
                    pan: '540008900009',
                    decimalisationTable: 'FD64FC3FAD504BB3',
                    pinValidationData: '5022654000N2',
                    sourceOffset: '123456FFFFFF',
                    destinationPinBlock: 'B2766AACF790B197',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '303032394455303032553934384237343933334541414434364336423842444541443135353041463241553830414533463844363342303846394331333635324535343136443736453844324644433538314143323543393634303031303635343030303839303030303946443634464333464144353034424233353032323635343030304E3231323334353646464646464642323736364141434637393042313937'
            }
        },
        verifyPinGenerateOffsetDecode: {
            0: {
                request: bufferize('3030303144563030363534333231464646464646'),
                response: {
                    errorCode: '00',
                    offset: '654321FFFFFF'
                }
            },
            1: {
                request: bufferize('3030303344563031'),
                response: 'payshield.verifyPinGenerateOffset.01'
            },
            2: {
                request: bufferize('3030303544563130'),
                response: 'payshield.verifyPinGenerateOffset.10'
            },
            3: {
                request: bufferize('3030303844563131'),
                response: 'payshield.verifyPinGenerateOffset.11'
            },
            4: {
                request: bufferize('3030313044563230'),
                response: 'payshield.verifyPinGenerateOffset.20'
            }
        },
        verifyInterPinIbmEncode: {
            0: {
                request: {
                    zpk: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    maximumPinLength: '12',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    checkLength: '06',
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5022654000N2',
                    offset: '876955ffffff',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030323845415533303237433839353138314439313241393144374446304544373841433646425538304145334638443633423038463943313336353245353431364437364538443132413639463945373634363930344236383031303635343030303839303030303930313233343536373839313233343536353032323635343030304E32383736393535464646464646'
            }
        },
        verifyInterPinIbmDecode: {
            0: {
                request: bufferize('3132333245423032'),
                response: {
                    errorCode: '02'
                }
            },
            1: {
                request: bufferize('3030333945423031'),
                response: 'payshield.verifyInterPinIbm.01'
            },
            2: {
                request: bufferize('3030353445423131'),
                response: 'payshield.verifyInterPinIbm.11'
            },
            3: {
                request: bufferize('3030363245423130'),
                response: 'payshield.verifyInterPinIbm.10'
            },
            4: {
                request: bufferize('3030363745423135'),
                response: 'payshield.verifyInterPinIbm.15'
            }
        },
        verifyInterPinPvvEncode: {
            0: {
                request: {
                    zpk: 'UBB224A0D70899E7D216A4DDDA615C078',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pinBlock: 'ED42DE5980AB024B',
                    pinBlockFormat: '01',
                    pan: '600000000000',
                    delimiterLength: 0,
                    delimiter: '',
                    verificationPanLength: 0,
                    verificationPan: '',
                    pvki: '4',
                    pvv: '1835',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: '3030303245435542423232344130443730383939453744323136413444444441363135433037385538304145334638443633423038463943313336353245353431364437364538444544343244453539383041423032344230313630303030303030303030303431383335'
            }
        },
        verifyInterPinPvvDecode: {
            0: {
                request: bufferize('3030303445443030'),
                response: {
                    errorCode: '00'
                }
            },
            1: {
                request: bufferize('3031313345443031'),
                response: 'payshield.verifyInterPinPvv.01'
            },
            2: {
                request: bufferize('3031313545443130'),
                response: 'payshield.verifyInterPinPvv.10'
            },
            3: {
                request: bufferize('3031313745443131'),
                response: 'payshield.verifyInterPinPvv.11'
            },
            4: {
                request: bufferize('3031313845443135'),
                response: 'payshield.verifyInterPinPvv.15'
            }
        },
        verifyOffsetIbmDukptEncode: {
            0: {
                request: {
                    mode: '0',
                    macModeLength: 0,
                    macMode: '',
                    macMethodLength: 0,
                    macMethod: '',
                    bdk: 'UAADAFCC8551ADAB246EA1176FD691EDF',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    ksnDescriptor: 'A05',
                    ksnLength: 20,
                    ksn: 'FFFF0000010020000026',
                    pinBlock: 'BC786E28753DD4B2',
                    pinBlockFormat: '01',
                    checkLength: 4,
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5052654000N2',
                    offset: '1234ffffffff',
                    macLength: 0,
                    mac: '',
                    messageDataLengthBytesLength: 0,
                    messageDataLengthBytes: '',
                    messageDataLength: 0,
                    messageData: '',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: bufferize('30303134474F305541414441464343383535314144414232343645413131373646443639314544465538304145334638443633423038463943313336353245353431364437364538444130354646464630303030303130303230303030303236424337383645323837353344443442323031303435343030303839303030303930313233343536373839313233343536353035323635343030304E32313233344646464646464646')
            },
            1: {
                request: {
                    mode: '0',
                    macModeLength: 1,
                    macMode: '1',
                    macMethodLength: 1,
                    macMethod: '1',
                    bdk: 'UAADAFCC8551ADAB246EA1176FD691EDF',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    ksnDescriptor: 'A05',
                    ksnLength: 20,
                    ksn: 'FFFF0000010020000026',
                    pinBlock: 'BC786E28753DD4B2',
                    pinBlockFormat: '01',
                    checkLength: 4,
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5052654000N2',
                    offset: '1234ffffffff',
                    macLength: 16,
                    mac: 'ABCD1234EF098765',
                    messageDataLengthBytesLength: 4,
                    messageDataLengthBytes: '16',
                    messageDataLength: 16,
                    messageData: '424C41424C414D455353414745000000',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: bufferize('30303134474F3031315541414441464343383535314144414232343645413131373646443639314544465538304145334638443633423038463943313336353245353431364437364538444130354646464630303030303130303230303030303236424337383645323837353344443442323031303435343030303839303030303930313233343536373839313233343536353035323635343030304E323132333446464646464646464142434431323334454630393837363530303136424C41424C414D455353414745000000')
            }
        },
        verifyOffsetIbmDukptDecode: {
            0: {
                request: bufferize('30303138475030303030'),
                response: {
                    errorCode: '00',
                    rest: bufferize('3030')
                }
            },
            1: {
                request: bufferize('30303138475030313031'),
                response: 'payshield.verifyOffsetIbmDukpt.01'
            },
            2: {
                request: bufferize('3030313847503130'),
                response: 'payshield.verifyOffsetIbmDukpt.10'
            }
        },
        verifyPvvDukptEncode: {
            0: {
                request: {
                    mode: '0',
                    macModeLength: 0,
                    macMode: '',
                    macMethodLength: 0,
                    macMethod: '',
                    bdk: 'UAADAFCC8551ADAB246EA1176FD691EDF',
                    pvkLength: 33,
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    ksnDescriptor: 'A05',
                    ksnLength: 20,
                    ksn: 'FFFF0000010020000026',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    delimiterLength: 0,
                    delimiter: '',
                    verificationPanLength: 0,
                    verificationPan: '',
                    pvki: '1',
                    pvv: '8156',
                    macLength: 0,
                    mac: '',
                    messageDataLengthBytesLength: 0,
                    messageDataLengthBytes: '',
                    messageDataLength: 0,
                    messageData: '',
                    deliminaterLmk: '%',
                    deliminaterLmkLen: 1,
                    lmkIdentifier: '00',
                    lmkIdentifierLen: 2
                },
                response: bufferize('3030333147513055414144414643433835353141444142323436454131313736464436393145444655383041453346384436334230384639433133363532453534313644373645384441303546464646303030303031303032303030303032364136394639453736343639303442363830313534303030383930303030393138313536253030')
            }
        },
        verifyPvvDukptDecode: {
            0: {
                request: bufferize('3030333147523030'),
                response: {
                    errorCode: '00',
                    rest: bufferize([])
                }
            },
            1: {
                request: bufferize('3030333147523031'),
                response: 'payshield.verifyPvvDukpt.01'
            },
            2: {
                request: bufferize('3030333147523130'),
                response: 'payshield.verifyPvvDukpt.10'
            },
            3: {
                request: bufferize('3030333147523131'),
                response: 'payshield.verifyPvvDukpt.11'
            },
            4: {
                request: bufferize('3030333147523237'),
                response: 'payshield.verifyPvvDukpt.27'
            }
        },
        generateVerifyMacDukptEncode: {
            0: {
                request: {
                    macMode: '4',
                    macMethod: '1',
                    bdk: 'U99805903FDC563240A118DE88DAE0536',
                    ksnDescriptor: 'A05',
                    ksnLength: 20,
                    ksn: 'FFFF000001315240000F',
                    macLength: 0,
                    mac: '',
                    messageDataLengthBytes: 8,
                    messageData: 'ABCABCABCDEF8000',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: bufferize('3030303247573431553939383035393033464443353633323430413131384445383844414530353336413035464646463030303030313331353234303030304630303038ABCABCABCDEF8000')
            },
            1: {
                request: {
                    macMode: '1',
                    macMethod: '1',
                    bdk: 'U99805903FDC563240A118DE88DAE0536',
                    ksnDescriptor: 'A05',
                    ksnLength: 20,
                    ksn: 'FFFF000001315240000F',
                    macLength: 16,
                    mac: '40BDD0ED6B9FBCBE',
                    messageDataLengthBytes: 8,
                    messageData: 'ABCABCABCDEF8000',
                    deliminaterLmk: '',
                    deliminaterLmkLen: 0,
                    lmkIdentifier: '',
                    lmkIdentifierLen: 0
                },
                response: bufferize('303030324757313155393938303539303346444335363332343041313138444538384441453035333641303546464646303030303031333135323430303030463430424444304544364239464243424530303038ABCABCABCDEF8000')
            }
        },
        generateVerifyMacDukptDecode: {
            0: {
                request: bufferize('303030304758303034304244443045443642394642434245'),
                response: {
                    errorCode: '00',
                    rest: bufferize([52, 48, 66, 68, 68, 48, 69, 68, 54, 66, 57, 70, 66, 67, 66, 69])
                }
            },
            1: {
                request: bufferize('3030303147583030'),
                response: {
                    errorCode: '00',
                    rest: bufferize([])
                }
            },
            2: {
                request: bufferize('3030303647583031'),
                response: 'payshield.generateVerifyMacDukpt.01'
            },
            3: {
                request: bufferize('3030303747583130'),
                response: 'payshield.generateVerifyMacDukpt.10'
            },
            4: {
                request: bufferize('3030303947583135'),
                response: 'payshield.generateVerifyMacDukpt.15'
            }
        }
    }
};
