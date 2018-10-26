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
                    keyComponents: 'U78D68FB4966305485C74466DACDE4E65UA128A7F7102F48B8582065D7B411A558UE8DA2D69626452A0CB47C6C4C142F17B'
                },
                response: '3030303641343334303255553738443638464234393636333035343835433734343636444143444534453635554131323841374637313032463438423835383230363544374234313141353538554538444132443639363236343532413043423437433643344331343246313742'
            },
            1: {
                request: {
                    numberOfComponents: 2,
                    keyType: '402',
                    keySchemeLmk: 'U',
                    keyComponentsLength: 66,
                    keyComponents: 'U78D68FB4966305485C74466DACDE4E65UA128A7F7102F48B8582065D7B411A558'
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
                    keyScheme: 'U'
                },
                response: '30303032413630303255453635363545324435354239343633313230333938453737323944413532344558413932313135384432463235373139343245413042373730363337463030354355'
            },
            1: {
                request: {
                    keyType: '109',
                    zmk: 'UE6565E2D55B9463120398E7729DA524E',
                    key: 'X7292BCCA0CD4563354F627B0E8E852B2',
                    keyScheme: 'U'
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
            }
        },
        exportKeyEncode: {
            0: {
                request: {
                    keyType: '109',
                    zmk: 'U773F7C1902633996DCCBE4EC5F2986AE',
                    key: 'U7E717639AE951BBD85C280216DD3289E',
                    keyScheme: 'T'
                },
                response: '30303034413831303955373733463743313930323633333939364443434245344543354632393836414555374537313736333941453935314242443835433238303231364444333238394554'
            },
            1: {
                request: {
                    keyType: '402',
                    zmk: 'U773F7C1902633996DCCBE4EC5F2986AD',
                    key: 'U7E717639AE951BBD85C280216DD3289F',
                    keyScheme: 'X'
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
                    pinKey: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pvkLength: 33,
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    maximumPinLength: '12',
                    checkLength: '04',
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5022654000N2'
                },
                response: '30303039424B303032553330323743383935313831443931324139314437444630454437384143364642553830414533463844363342303846394331333635324535343136443736453844413639463945373634363930344236383031303435343030303839303030303930313233343536373839313233343536353032323635343030304E32'
            },
            1: {
                request: {
                    keyType: '002',
                    pinKey: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pvkLength: 33,
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    maximumPinLength: '12',
                    checkLength: '06',
                    pan: '540008900009',
                    decimalisationTable: '5432109876543210',
                    pinValidationData: '5022654000N2'
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
                    hmacKeyLength: 0,
                    hmacKeyLengthLength: 0,
                    hmac: '',
                    hmacLength: 0,
                    delimiter3: '',
                    delimiter3Length: 0
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
                    hmacKeyLength: 0,
                    hmacKeyLengthLength: 0,
                    hmac: '',
                    hmacLength: 0,
                    delimiter3: '',
                    delimiter3Length: 0
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
                    hmacKeyLength: 0,
                    hmacKeyLengthLength: 0,
                    hmac: '',
                    hmacLength: 0,
                    delimiter3: '',
                    delimiter3Length: 0
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
                    pan: '540028800010'
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
                    pan: '239010000012'
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
                    destinationPinBlock: '14D3E09CD3B6456E',
                    pinBlockFormat: '01'
                }
            },
            1: {
                request: bufferize('30363139434230303034453837304344433845303637454232453031'),
                response: {
                    errorCode: '00',
                    checkLength: '04',
                    destinationPinBlock: 'E870CDC8E067EB2E',
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
        translatePinZpkZpkEncode: {
            0: {
                request: {
                    sourceZpk: 'UBB224A0D70899E7D216A4DDDA615C078',
                    destinationZpk: 'UEE424E608E9CF0071E239F9E15032C81',
                    maximumPinLength: '12',
                    sourcePinBlock: '14D3E09CD3B6456E',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '540028800010'
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
                    pan: '239010000012'
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
                    destinationPinBlock: '0E4A2BFA78E244FF',
                    pinBlockFormat: '01'
                }
            },
            1: {
                request: bufferize('30313930434430303034424542433338454235383646453432353031'),
                response: {
                    errorCode: '00',
                    checkLength: '04',
                    destinationPinBlock: 'BEBC38EB586FE425',
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
        generateCvvEncode: {
            0: {
                request: {
                    cvk: 'UE16D4CD9EAB610034BDE2A50935BCFBE',
                    panLength: 18,
                    pan: '502265400089000092',
                    expirationDate: '2010',
                    serviceCode: '620'
                },
                response: '3030313143575545313644344344394541423631303033344244453241353039333542434642453530323236353430303038393030303039323B32303130363230'
            },
            1: {
                request: {
                    cvk: 'UE16D4CD9EAB610034BDE2A50935BCFBE',
                    panLength: 12,
                    pan: '502265000092',
                    expirationDate: '2010',
                    serviceCode: '999'
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
                    serviceCode: '620'
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
                    serviceCode: '999'
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
                    account: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5022654000N2',
                    offset: '876955FFFFFF'
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
                    account: '540008900009',
                    decimalisationTable: '5432109876543210',
                    pinValidationData: '5022654000N2',
                    offset: '757798FFFFFF'
                },
                response: '3030313144415533303237433839353138314439313241393144374446304544373841433646425538304145334638443633423038463943313336353245353431364437364538443132413639463945373634363930344236383031303635343030303839303030303935343332313039383736353433323130353032323635343030304E32373537373938464646464646'
            }
        },
        verifyTermPinIbmDecode: {
            0: {
                request: bufferize('3132333244423032'),
                response: {
                    'errorCode': '02'
                }
            },
            1: {
                request: bufferize('3132323344423032'),
                response: {
                    'errorCode': '02'
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
                    pvkLength: 33
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
                    pvkLength: 33
                },
                response: '3030313144455537373333384637344131394533424233393036324135413437393437334643383538363532303838303435303232363530303030393236353433323130393837363534333231353032323635303030304E32'
            }
        },
        generateOffsetIbmLmkDecode: {
            0: {
                request: bufferize('3031353944463032303030303030464646464646'),
                response: {
                    'errorCode': '02',
                    'offset': '000000FFFFFF'
                }
            },
            1: {
                request: bufferize('3031363344463032303030304646464646464646'),
                response: {
                    'errorCode': '02',
                    'offset': '0000FFFFFFFF'
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
        getPvvEncode: {

        },
        getPvvDecode: {

        },
        derivePinIbmEncode: {
            0: {
                request: {
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    pvkLength: 33,
                    offset: '000000FFFFFF',
                    checkLength: '6',
                    account: '654000890009',
                    decimalisationTable: '0123456789012345',
                    pinValidationData: '5022654000N2'
                },
                response: '303031314545553737333338463734413139453342423339303632413541343739343733464338303030303030464646464646303636353430303038393030303930313233343536373839303132333435353032323635343030304E32'
            },
            1: {
                request: {
                    'pvk': 'U77338F74A19E3BB39062A5A479473FC8',
                    'pvkLength': 33,
                    'offset': '0000FFFFFFFF',
                    'checkLength': '4',
                    'account': '502265000092',
                    'decimalisationTable': '6543210987654321',
                    'pinValidationData': '5022650000N2'
                },
                response: '303031314545553737333338463734413139453342423339303632413541343739343733464338303030304646464646464646303435303232363530303030393236353433323130393837363534333231353032323635303030304E32'
            }
        },
        derivePinIbmDecode: {
            0: {
                request: bufferize('30303531454630323733363338363336'),
                response: {
                    'errorCode': '02',
                    'pin': bufferize([55, 51, 54, 51, 56, 54, 51, 54])
                }
            },
            1: {
                request: bufferize('30303838454630323538363532303838'),
                response: {
                    'errorCode': '02',
                    'pin': bufferize([53, 56, 54, 53, 50, 48, 56, 56])
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
                request: {},
                response: {}
            },
            1: {
                request: {},
                response: {}
            }
        },
        hashDataBlockDecode: {
            0: {
                request: {},
                response: {}
            },
            1: {
                request: {},
                response: {}
            },
            2: {
                request: {},
                response: {}
            },
            3: {
                request: {},
                response: {}
            },
            4: {
                request: {},
                response: {}
            }
        }
    }
};
