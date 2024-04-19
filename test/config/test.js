const bufferize = function(request) {
    return Buffer.from(request, 'hex');
};
const context = function({request, headerNo}) {
    const requests = new Map();
    requests.set(`out/${headerNo}`, {
        $meta: {
            request
        }
    });
    return {
        requests
    };
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
            // variant LMK
            0: {
                request: {
                    mode: '0',
                    keyType: '002',
                    keySchemeLmk: 'U',
                    deriveKeyMode: '',
                    dukptMasterKeyType: '',
                    dukptMasterKey: '',
                    ksn: '',
                    zkaMasterKeyType: '',
                    zkaMasterKey: '',
                    zkaOption: '',
                    zkaRndi: '',
                    delimiterZmkTmk: '',
                    keyZmkTmkFlag: '',
                    keyZmkTmk: '',
                    keySchemeZmkTmk: '',
                    delimiterKeyblock: '',
                    keyUsageKeyblock: '',
                    algorithmKeyblock: '',
                    modeOfUseKeyblock: '',
                    keyVersionNumberKeyblock: '',
                    exportabilityKeyblock: '',
                    optionalBlocksCountKeyblock: '',
                    optionalBlocksDataKeyblock: '',
                    delimiterExportKeyblock: '',
                    modExportabilityKeyblock: '',
                    delimiterVersionIdKeyblock: '',
                    keyBlockVersionIdKeyblock: '',
                    delimiterVariant: '',
                    keyUsageVariant: '',
                    modeOfUseVariant: '',
                    keyVersionNumberVariant: '',
                    exportabilityVariant: '',
                    optionalBlocksCountVariant: '',
                    optionalBlocksDataVariant: '',
                    delimiterVersionIdVariant: '',
                    keyBlockVersionIdVariant: ''
                },
                response: '3030303041303030303255'
            },
            // variant LMK
            1: {
                request: {
                    mode: '1',
                    keyType: '002',
                    keySchemeLmk: 'U',
                    deriveKeyMode: '',
                    dukptMasterKeyType: '',
                    dukptMasterKey: '',
                    ksn: '',
                    zkaMasterKeyType: '',
                    zkaMasterKey: '',
                    zkaOption: '',
                    zkaRndi: '',
                    delimiterZmkTmk: ';',
                    keyZmkTmkFlag: '0',
                    keyZmkTmk: 'U99D8FC778055B63D3FD53CDA9EEEFB9E',
                    keySchemeZmkTmk: 'X',
                    delimiterKeyblock: '',
                    keyUsageKeyblock: '',
                    algorithmKeyblock: '',
                    modeOfUseKeyblock: '',
                    keyVersionNumberKeyblock: '',
                    exportabilityKeyblock: '',
                    optionalBlocksCountKeyblock: '',
                    optionalBlocksDataKeyblock: '',
                    delimiterExportKeyblock: '',
                    modExportabilityKeyblock: '',
                    delimiterVersionIdKeyblock: '',
                    keyBlockVersionIdKeyblock: '',
                    delimiterVariant: '',
                    keyUsageVariant: '',
                    modeOfUseVariant: '',
                    keyVersionNumberVariant: '',
                    exportabilityVariant: '',
                    optionalBlocksCountVariant: '',
                    optionalBlocksDataVariant: '',
                    delimiterVersionIdVariant: '',
                    keyBlockVersionIdVariant: ''
                },
                response: '30303030413031303032553B3055393944384643373738303535423633443346443533434441394545454642394558'
            },
            // keyblock LMK
            2: {
                request: {
                    mode: '0',
                    keyType: 'FFF',
                    keySchemeLmk: 'S',
                    deriveKeyMode: '',
                    dukptMasterKeyType: '',
                    dukptMasterKey: '',
                    ksn: '',
                    zkaMasterKeyType: '',
                    zkaMasterKey: '',
                    zkaOption: '',
                    zkaRndi: '',
                    delimiterZmkTmk: '',
                    keyZmkTmkFlag: '',
                    keyZmkTmk: '',
                    keySchemeZmkTmk: '',
                    lmkIdentifier: '01',
                    delimiterKeyblock: '#',
                    keyUsageKeyblock: 'K0',
                    algorithmKeyblock: 'T2',
                    modeOfUseKeyblock: 'B',
                    keyVersionNumberKeyblock: '00',
                    exportabilityKeyblock: 'E',
                    optionalBlocksCountKeyblock: '00',
                    optionalBlocksDataKeyblock: '',
                    delimiterExportKeyblock: '',
                    modExportabilityKeyblock: '',
                    delimiterVersionIdKeyblock: '',
                    keyBlockVersionIdKeyblock: '',
                    delimiterVariant: '',
                    keyUsageVariant: '',
                    modeOfUseVariant: '',
                    keyVersionNumberVariant: '',
                    exportabilityVariant: '',
                    optionalBlocksCountVariant: '',
                    optionalBlocksDataVariant: '',
                    delimiterVersionIdVariant: '',
                    keyBlockVersionIdVariant: ''
                },
                response: '3030303041303046464653253031234B305432423030453030'
            },
            // keyblock LMK
            3: {
                request: {
                    mode: '1',
                    keyType: 'FFF',
                    keySchemeLmk: 'S',
                    deriveKeyMode: '',
                    dukptMasterKeyType: '',
                    dukptMasterKey: '',
                    ksn: '',
                    zkaMasterKeyType: '',
                    zkaMasterKey: '',
                    zkaOption: '',
                    zkaRndi: '',
                    delimiterZmkTmk: '',
                    keyZmkTmkFlag: '0',
                    keyZmkTmk: 'S00072K0TB00E00017CECF0FB9210B3CC93B9FFB304963C39CFFF94B837D318E1A6F1F058',
                    keySchemeZmkTmk: 'S',
                    lmkIdentifier: '01',
                    delimiterKeyblock: '#',
                    keyUsageKeyblock: 'K0',
                    algorithmKeyblock: 'T2',
                    modeOfUseKeyblock: 'B',
                    keyVersionNumberKeyblock: '00',
                    exportabilityKeyblock: 'E',
                    optionalBlocksCountKeyblock: '00',
                    optionalBlocksDataKeyblock: '',
                    delimiterExportKeyblock: '',
                    modExportabilityKeyblock: '',
                    delimiterVersionIdKeyblock: '',
                    keyBlockVersionIdKeyblock: '',
                    delimiterVariant: '',
                    keyUsageVariant: '',
                    modeOfUseVariant: '',
                    keyVersionNumberVariant: '',
                    exportabilityVariant: '',
                    optionalBlocksCountVariant: '',
                    optionalBlocksDataVariant: '',
                    delimiterVersionIdVariant: '',
                    keyBlockVersionIdVariant: ''
                },
                response: '3030303041303146464653305330303037324B30544230304530303031374345434630464239323130423343433933423946464233303439363343333943464646393442383337443331384531413646314630353853253031234B305432423030453030'
            }
        },
        generateKeyDecode: {
            0: {
                request: bufferize('3033373541313030553844364534324533334343444437433141424232463443373445334233444538413234363637'),
                response: {
                    kcv: 'A24667',
                    key: 'U8D6E42E33CCDD7C1ABB2F4C74E3B3DE8'
                }
            },
            1: {
                request: bufferize('3030373941313030554145373942344646413430443742323239434336383344453436314243373334583444433542393338314438393343363632364133374432463430383039464541314339364236'),
                response: {
                    kcv: '1C96B6',
                    key: 'UAE79B4FFA40D7B229CC683DE461BC734',
                    keyZmk: 'X4DC5B9381D893C6626A37D2F40809FEA'
                },
                context: context({
                    request: {
                        mode: '1',
                        keySchemeLmk: 'U',
                        keySchemeZmkTmk: 'X'
                    },
                    headerNo: '0079'
                })
            },
            2: {
                request: bufferize('30303939413130305330303037324b305442303045303030314642384134393532424645343231373941423844373941383139343344463146414436374346303135313137454538353238453739393030443441334538'),
                response: {
                    kcv: 'D4A3E8',
                    key: 'S00072K0TB00E0001FB8A4952BFE42179AB8D79A81943DF1FAD67CF015117EE8528E79900'
                }
            },
            3: {
                request: bufferize('30304040413130305330303037324b3054423030453030303135314643344431413631443538344241324131334535384634313544333143313643464331333030443632373231303941393532463238445330303037324b305442303045303046463532313436443744374531324446454645353742374342444337384639424344343438394538313033413532353637363035323934333734453941423136'),
                response: {
                    kcv: 'E9AB16',
                    key: 'S00072K0TB00E000151FC4D1A61D584BA2A13E58F415D31C16CFC1300D6272109A952F28D',
                    keyZmk: 'S00072K0TB00E00FF52146D7D7E12DFEFE57B7CBDC78F9BCD4489E8103A52567605294374'
                },
                context: context({
                    request: {
                        mode: '1',
                        keySchemeLmk: 'S',
                        keySchemeZmkTmk: 'S'
                    },
                    headerNo: '00@@'
                })
            },
            4: {
                request: bufferize('3033383441313130'),
                response: 'payshield.generateKey.10'
            },
            5: {
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
                    keyComponents: 'U78D68FB4966305485C74466DACDE4E65UA128A7F7102F48B8582065D7B411A558UE8DA2D69626452A0CB47C6C4C142F17B',
                    delimiterKeyBlock: '',
                    keyVersionNumber: '',
                    optionalBlocksCount: ''
                },
                response: '3030303641343334303255553738443638464234393636333035343835433734343636444143444534453635554131323841374637313032463438423835383230363544374234313141353538554538444132443639363236343532413043423437433643344331343246313742'
            },
            1: {
                request: {
                    numberOfComponents: 2,
                    keyType: '402',
                    keySchemeLmk: 'U',
                    keyComponents: 'U78D68FB4966305485C74466DACDE4E65UA128A7F7102F48B8582065D7B411A558',
                    delimiterKeyBlock: '',
                    keyVersionNumber: '',
                    optionalBlocksCount: ''
                },
                response: '3030303641343234303255553738443638464234393636333035343835433734343636444143444534453635554131323841374637313032463438423835383230363544374234313141353538'
            },
            2: {
                request: {
                    numberOfComponents: 2,
                    keyType: 'FFF',
                    keySchemeLmk: 'S',
                    keyComponents: 'S0007252TBc1E0001C9ED3207A1A79BCA1CAB8C05FEC9429E2232067D1F9E908F15E9DCA7S0007252TBc2E000125276E9C8BC0FA0F70109274FAB9647EF89A189C019465182A345009',
                    delimiterKeyBlock: '#',
                    keyVersionNumber: '00',
                    optionalBlocksCount: '00'
                },
                response: '303030364134324646465353303030373235325442633145303030314339454433323037413141373942434131434142384330354645433934323945323233323036374431463945393038463135453944434137533030303732353254426332453030303132353237364539433842433046413046373031303932373446414239363437454638394131383943303139343635313832413334353030392330303030'
            }
        },
        formKeyFromComponentsDecode: {
            0: {
                request: bufferize('3032383141353030554332424434433942453341423339353745323346313135344438394244353332443035333837'),
                response: {
                    key: 'UC2BD4C9BE3AB3957E23F1154D89BD532',
                    keyCheckValue: 'D05387'
                }
            },
            1: {
                request: bufferize('3031323341353030554537464436304244453632363042464138423736423741374433313234433835304338304631'),
                response: {
                    key: 'UE7FD60BDE6260BFA8B76B7A7D3124C85',
                    keyCheckValue: '0C80F1'
                }
            },
            2: {
                request: bufferize('303030304135303053303030373235325442303045303030314434423441323635433532373346333533373239463135334643314332414441323344463244393443373641354546333034363643424142324145303832'),
                response: {
                    key: 'S0007252TB00E0001D4B4A265C5273F353729F153FC1C2ADA23DF2D94C76A5EF30466CBAB',
                    keyCheckValue: '2AE082'
                }
            },

            3: {
                request: bufferize('3032393141353130'),
                response: 'payshield.formKeyFromComponents.10'
            },
            4: {
                request: bufferize('3037313641353033'),
                response: 'payshield.formKeyFromComponents.03'
            },
            5: {
                request: bufferize('3037323941353135'),
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
                    delimiterTr31: '',
                    keyUsageTr31: '',
                    optionalBlocksCountTr31: '',
                    optionalBlocksDataTr31: '',
                    delimiterKeyblock: '',
                    keyUsageKeyblock: '',
                    modeOfUseKeyblock: '',
                    keyVersionNumberKeyblock: '',
                    exportabilityKeyblock: '',
                    optionalBlocksCountKeyblock: '',
                    optionalBlocksDataKeyblock: ''
                },
                response: '30303032413630303255453635363545324435354239343633313230333938453737323944413532344558413932313135384432463235373139343245413042373730363337463030354355'
            },
            1: {
                request: {
                    keyType: '109',
                    zmk: 'UE6565E2D55B9463120398E7729DA524E',
                    key: 'X7292BCCA0CD4563354F627B0E8E852B2',
                    keyScheme: 'U',
                    delimiterTr31: '',
                    keyUsageTr31: '',
                    optionalBlocksCountTr31: '',
                    optionalBlocksDataTr31: '',
                    delimiterKeyblock: '',
                    keyUsageKeyblock: '',
                    modeOfUseKeyblock: '',
                    keyVersionNumberKeyblock: '',
                    exportabilityKeyblock: '',
                    optionalBlocksCountKeyblock: '',
                    optionalBlocksDataKeyblock: ''
                },
                response: '30303032413631303955453635363545324435354239343633313230333938453737323944413532344558373239324243434130434434353633333534463632374230453845383532423255'
            },
            2: {
                request: {
                    keyType: 'FFF',
                    zmk: 'S00072K0TB00E0001DB045F29C053EEFF7B9425B3A88C7258EB7EA7E40E2C47878647072A',
                    key: 'S00072P0TB00N00FFE1D89671C973C7F0DAF91CB2EBF379493C08975679001172C89A0AF8',
                    keyScheme: 'S',
                    lmkIdentifier: '01',
                    delimiterTr31: '',
                    keyUsageTr31: '',
                    optionalBlocksCountTr31: '',
                    optionalBlocksDataTr31: '',
                    delimiterKeyblock: '',
                    keyUsageKeyblock: '',
                    modeOfUseKeyblock: '',
                    keyVersionNumberKeyblock: '',
                    exportabilityKeyblock: '',
                    optionalBlocksCountKeyblock: '',
                    optionalBlocksDataKeyblock: ''
                },
                response: '3030303241364646465330303037324B3054423030453030303144423034354632394330353345454646374239343235423341383843373235384542374541374534304532433437383738363437303732415330303037325030544230304E30304646453144383936373143393733433746304441463931434232454246333739343933433038393735363739303031313732433839413041463853253031'
            }
        },
        importKeyDecode: {
            0: {
                request: bufferize('3039343641373030554331334539453932444241303546324446323337394238323143353736364133384646454431'),
                response: {
                    key: 'UC13E9E92DBA05F2DF2379B821C5766A3',
                    keyCheckValue: '8FFED1'
                }
            },
            1: {
                request: bufferize('3039353941373030553737333338463734413139453342423339303632413541343739343733464338364145374344'),
                response: {
                    key: 'U77338F74A19E3BB39062A5A479473FC8',
                    keyCheckValue: '6AE7CD'
                }
            },
            2: {
                request: bufferize('30303030413730305330303037325030544230304e303030314541343231363138423334463546413141373746374346363438303131314239323146303239373344464335413036463334354233344642344645394644'),
                response: {
                    key: 'S00072P0TB00N0001EA421618B34F5FA1A77F7CF6480111B921F02973DFC5A06F345B34FB',
                    keyCheckValue: '4FE9FD'
                }
            },
            3: {
                request: bufferize('3039383041373130'),
                response: 'payshield.importKey.10'
            },
            4: {
                request: bufferize('3039393841373236'),
                response: 'payshield.importKey.26'
            },
            5: {
                request: bufferize('3130303841373135'),
                response: 'payshield.importKey.15'
            },
            6: {
                request: bufferize('3130303841373031'),
                response: 'payshield.unableMatchingPattern'
            },
            7: {
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
                    delimiterKeyblock: '',
                    modExportabilityKeyblock: '',
                    delimiterVersionIdKeyblock: '',
                    keyBlockVersionIdKeyblock: '',
                    delimiterVariant: '',
                    keyUsageVariant: '',
                    modeOfUseVariant: '',
                    keyVersionNumberVariant: '',
                    exportabilityVariant: '',
                    optionalBlocksCountVariant: '',
                    optionalBlocksDataVariant: '',
                    delimiterVersionIdVariant: '',
                    keyBlockVersionIdVariant: ''
                },
                response: '30303034413831303955373733463743313930323633333939364443434245344543354632393836414555374537313736333941453935314242443835433238303231364444333238394554'
            },
            1: {
                request: {
                    keyType: '402',
                    zmk: 'U773F7C1902633996DCCBE4EC5F2986AD',
                    key: 'U7E717639AE951BBD85C280216DD3289F',
                    keyScheme: 'X',
                    delimiterKeyblock: '',
                    modExportabilityKeyblock: '',
                    delimiterVersionIdKeyblock: '',
                    keyBlockVersionIdKeyblock: '',
                    delimiterVariant: '',
                    keyUsageVariant: '',
                    modeOfUseVariant: '',
                    keyVersionNumberVariant: '',
                    exportabilityVariant: '',
                    optionalBlocksCountVariant: '',
                    optionalBlocksDataVariant: '',
                    delimiterVersionIdVariant: '',
                    keyBlockVersionIdVariant: ''
                },
                response: '30303034413834303255373733463743313930323633333939364443434245344543354632393836414455374537313736333941453935314242443835433238303231364444333238394658'
            },
            2: {
                request: {
                    keyType: 'FFF',
                    zmk: 'S00072K0TB00E0001DB045F29C053EEFF7B9425B3A88C7258EB7EA7E40E2C47878647072A',
                    key: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    keyScheme: 'S',
                    lmkIdentifier: '01',
                    delimiterKeyblock: '&',
                    modExportabilityKeyblock: 'N',
                    delimiterVersionIdKeyblock: '',
                    keyBlockVersionIdKeyblock: '',
                    delimiterVariant: '',
                    keyUsageVariant: '',
                    modeOfUseVariant: '',
                    keyVersionNumberVariant: '',
                    exportabilityVariant: '',
                    optionalBlocksCountVariant: '',
                    optionalBlocksDataVariant: '',
                    delimiterVersionIdVariant: '',
                    keyBlockVersionIdVariant: ''
                },
                response: '3030303441384646465330303037324B3054423030453030303144423034354632394330353345454646374239343235423341383843373235384542374541374534304532433437383738363437303732415330303037325030544230304530303031454134323136313842333446354641314137374637434636343830313131423937434630464145374244373744353839454339323145463953253031264E'
            }
        },
        exportKeyDecode: {
            0: {
                request: bufferize('3130333441393030584139323131353844324632353731393432454130423737303633374630303543364145374344'),
                response: {
                    key: 'XA921158D2F2571942EA0B770637F005C',
                    keyCheckValue: '6AE7CD'
                }
            },
            1: {
                request: bufferize('3130343941393030583732393242434341304344343536333335344636323742304538453835324232384646454431'),
                response: {
                    key: 'X7292BCCA0CD4563354F627B0E8E852B2',
                    keyCheckValue: '8FFED1'
                }
            },
            2: {
                request: bufferize('30303030413930305330303037325030544230304e303046464531443839363731433937334337463044414639314342324542463337393439443831313030343239354346363642364146394346364138344645394644'),
                response: {
                    key: 'S00072P0TB00N00FFE1D89671C973C7F0DAF91CB2EBF37949D811004295CF66B6AF9CF6A8',
                    keyCheckValue: '4FE9FD'
                }
            },

            3: {
                request: bufferize('3130373941393130'),
                response: 'payshield.exportKey.10'
            },
            4: {
                request: bufferize('3130393141393131'),
                response: 'payshield.exportKey.11'
            },
            5: {
                request: bufferize('3131353141393236'),
                response: 'payshield.exportKey.26'
            },
            6: {
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
                    key: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    maximumPinLength: '12',
                    checkLength: '06',
                    pan: '540008900009',
                    decimalisationTable: '5432109876543210',
                    pinValidationData: '5022654000N2'
                },
                response: '30303039424B303032553330323743383935313831443931324139314437444630454437384143364642553830414533463844363342303846394331333635324535343136443736453844413639463945373634363930344236383031303635343030303839303030303935343332313039383736353433323130353032323635343030304E32'
            },
            2: {
                request: {
                    keyType: 'FFF',
                    key: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
                    pinBlock: '967CDB6E3D492E28',
                    pinBlockFormat: '01',
                    maximumPinLength: '12',
                    checkLength: '06',
                    pan: '850103093936',
                    decimalisationTable: '709F26B22464E96A',
                    pinValidationData: '50103093936N',
                    lmkIdentifier: '01'
                },
                response: '30303039424B464646533030303732503054423030453030303145413432313631384233344635464131413737463743463634383031313142393743463046414537424437374435383945433932314546395330303037325631544E30304530303031304145304144324231393930414234303746414431353035394532383737363041303544463444413233393145414231333838373745323239363743444236453344343932453238303130363835303130333039333933363730394632364232323436344539364135303130333039333933364E253031'
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
                    pin: '0567899'
                },
                response: '30303238424735343030303839303030303930353637383939'
            }
        },
        translatePinLmkLmkDecode: {
            0: {
                request: bufferize('303030334248303030393938373635'),
                response: {
                    pin: '0998765'
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
                    keyTypeCode: 'FF',
                    keyLengthFlag: '1',
                    key: 'U7148EB5D14DF3F6ED393B227C2D6B35E',
                    keyType: '000',
                    keySchemeLmk: 'U'
                },
                response: '3030323542574646315537313438454235443134444633463645443339334232323743324436423335453B3030303B305530213131'
            },
            1: {
                request: {
                    keyTypeCode: 'FF',
                    keyLengthFlag: 'F',
                    key: 'S00072M1TN00E0001FFE01E95CF21BDD0D74B6BEB70E3D90842C137DCA39C1B162C6238D5',
                    keyType: 'FFF',
                    keySchemeLmk: 'S'
                },
                response: '3030323542574646465330303037324D31544E3030453030303146464530314539354346323142444430443734423642454237304533443930383432433133374443413339433142313632433632333844353B4646463B305330213131'
            }
        },
        translateKeyLmkLmkDecode: {
            0: {
                request: bufferize('3030303142583030553530323634443130334445323741353437373039343441464541413943454546'),
                response: {
                    key: 'U50264D103DE27A54770944AFEA',
                    keyCheckValue: 'A9CEEF'
                }
            },
            1: {
                request: bufferize('30303030425830305330303037324d31544e303045303030314646453031453935434632314244443044373442364245423730453344393038393131304135304536313133433731424638463830394635463830384332'),
                response: {
                    key: 'S00072M1TN00E0001FFE01E95CF21BDD0D74B6BEB70E3D9089110A50E6113C71BF8F809F5',
                    keyCheckValue: 'F808C2'
                }
            },
            2: {
                request: bufferize('3030303142583333'),
                response: 'payshield.translateKeyLmkLmk.33'
            },
            3: {
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
                response: true
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
                    delimiterKeyType: ';',
                    keyType: '002',
                    delimiterKcvType: ';',
                    reserved: '00',
                    kcvType: '1',
                    hashId: '',
                    hmacKeyLengthBytes: '',
                    hmacKey: '',
                    delimiterHmac: ''
                },
                response: '3030313142554646315537373333384637344131394533424233393036324135413437393437334643383B3030323B303031'
            },
            1: {
                request: {
                    keyTypeCode: 'FF',
                    keyLengthFlag: '1',
                    key: 'UC13E9E92DBA05F2DF2379B821C5766A3',
                    delimiterKeyType: ';',
                    keyType: '109',
                    delimiterKcvType: ';',
                    reserved: '00',
                    kcvType: '0',
                    hashId: '',
                    hmacKeyLengthBytes: '',
                    hmacKey: '',
                    delimiterHmac: ''
                },
                response: '3030313142554646315543313345394539324442413035463244463233373942383231433537363641333B3130393B303030'
            },
            2: {
                request: {
                    keyTypeCode: '02',
                    keyLengthFlag: '1',
                    key: 'U77338F74A19E3BB39062A5A479473FC8',
                    delimiterKeyType: '',
                    keyType: '',
                    delimiterKcvType: ';',
                    reserved: '00',
                    kcvType: '1',
                    hashId: '',
                    hmacKeyLengthBytes: '',
                    hmacKey: '',
                    delimiterHmac: ''
                },
                response: '3030313142553032315537373333384637344131394533424233393036324135413437393437334643383B303031'
            },
            3: {
                request: {
                    keyTypeCode: 'FF',
                    keyLengthFlag: 'F',
                    key: 'S00072K0TB00E0001DB045F29C053EEFF7B9425B3A88C7258EB7EA7E40E2C47878647072A',
                    delimiterKeyType: ';',
                    keyType: 'FFF',
                    delimiterKcvType: ';',
                    reserved: '00',
                    kcvType: '1',
                    hashId: '',
                    hmacKeyLengthBytes: '',
                    hmacKey: '',
                    delimiterHmac: ''
                },
                response: '3030313142554646465330303037324B3054423030453030303144423034354632394330353345454646374239343235423341383843373235384542374541374534304532433437383738363437303732413B4646463B303031'
            }
        },
        generateKeyCheckValueDecode: {
            0: {
                request: bufferize('3030313342563030384646454431'),
                response: {
                    kcv: '8FFED1'
                }
            },
            1: {
                request: bufferize('303031304256303036414537434433444642364637384630'),
                response: {
                    kcv: '6AE7CD3DFB6F78F0'
                }
            },
            2: {
                request: bufferize('3030303042563030323335364632'),
                response: {
                    kcv: '2356F2'
                }
            },

            3: {
                request: bufferize('3031303542563130'),
                response: 'payshield.generateKeyCheckValue.10'
            },
            4: {
                request: bufferize('3030363342563238'),
                response: 'payshield.generateKeyCheckValue.28'
            },
            5: {
                request: bufferize('3030373042563035'),
                response: 'payshield.generateKeyCheckValue.05'
            },
            6: {
                request: bufferize('3030373542563135'),
                response: 'payshield.generateKeyCheckValue.15'
            }
        },
        translatePinTpkZpkBdkEncode: {
            0: {
                request: {
                    sourceTpk: 'U6C091AE30ABB19B3EB6C4C3B8D08C071',
                    destinationKeyFlag: '',
                    destinationKey: 'UBB224A0D70899E7D216A4DDDA615C078',
                    destinationKsnDescriptor: '',
                    destinationKsn: '',
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
                    destinationKeyFlag: '',
                    destinationKey: 'UBB224A0D70899E7D216A4DDDA615C078',
                    destinationKsnDescriptor: '',
                    destinationKsn: '',
                    maximumPinLength: '12',
                    sourcePinBlock: 'C5ED6A332BAD3FE7',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '239010000012'
                },
                response: '30303131434155364330393141453330414242313942334542364334433342384430384330373155424232323441304437303839394537443231364134444444413631354330373831324335454436413333324241443346453730313031323339303130303030303132'
            },
            2: {
                request: {
                    sourceTpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
                    destinationKeyFlag: '',
                    destinationKey: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    destinationKsnDescriptor: '',
                    destinationKsn: '',
                    maximumPinLength: '12',
                    sourcePinBlock: 'E57BC634D4717907',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '600000000000',
                    lmkIdentifier: '01'
                },
                response: '3030313143415330303037323731544E3030453030303139424144323342304345463739453333333238434130353638413045313836464331374538444537333841414639464236374336453146465330303037325030544230304530303031454134323136313842333446354641314137374637434636343830313131423937434630464145374244373744353839454339323145463931324535374243363334443437313739303730313031363030303030303030303030253031'
            },
            3: {
                request: {
                    sourceTpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
                    destinationKeyFlag: '',
                    destinationKey: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
                    destinationKsnDescriptor: 'A05',
                    destinationKsn: 'FFFF000001315240003A',
                    maximumPinLength: '12',
                    sourcePinBlock: 'E57BC634D4717907',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '600000000000',
                    lmkIdentifier: '01'
                },
                response: '3030313143415330303037323731544E3030453030303139424144323342304345463739453333333238434130353638413045313836464331374538444537333841414639464236374336453146465330303037324230544E303045303030313536363637383037384235333337393135463438363043393246334646324436413642313145383738364632324443383033324542373538413035464646463030303030313331353234303030334131324535374243363334443437313739303730313031363030303030303030303030253031'
            }
        },
        translatePinTpkZpkBdkDecode: {
            0: {
                request: bufferize('30383531434230303036313444334530394344334236343536453031'),
                response: {
                    checkLength: '06',
                    pinBlock: '14D3E09CD3B6456E',
                    pinBlockFormat: '01'
                }
            },
            1: {
                request: bufferize('30363139434230303034453837304344433845303637454232453031'),
                response: {
                    checkLength: '04',
                    pinBlock: 'E870CDC8E067EB2E',
                    pinBlockFormat: '01'
                }
            },
            2: {
                request: bufferize('3039393143423130'),
                response: 'payshield.translatePinTpkZpkBdk.10'
            },
            3: {
                request: bufferize('3130303143423131'),
                response: 'payshield.translatePinTpkZpkBdk.11'
            },
            4: {
                request: bufferize('3130313043423233'),
                response: 'payshield.translatePinTpkZpkBdk.23'
            },
            5: {
                request: bufferize('3130323543423230'),
                response: 'payshield.translatePinTpkZpkBdk.20'
            }
        },
        translatePinZpkLmkEncode: {
            0: {
                request: {
                    zpk: 'U592A36AE05F8E181AB3939B1D29BD8D1',
                    pinBlock: '87C832F7179E9CCE',
                    pinBlockFormat: '01',
                    pan: '540008900009'
                },
                response: '303031314A45553539324133364145303546384531383141423339333942314432394244384431383743383332463731373945394343453031353430303038393030303039'
            },
            1: {
                request: {
                    zpk: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    pinBlock: 'AD72F973446E84E7',
                    pinBlockFormat: '01',
                    pan: '850103093936',
                    lmkIdentifier: '01'
                },
                response: '303031314A4553303030373250305442303045303030314541343231363138423334463546413141373746374346363438303131314239374346304641453742443737443538394543393231454639414437324639373334343645383445373031383530313033303933393336253031'
            }
        },
        translatePinZpkLmkDecode: {
            0: {
                request: bufferize('303030314A46303035303439323438'),
                response: {
                    pin: '5049248'
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
                    pan: '540008900009'
                },
                response: '303031344A43553935463639334237413444463231324331363541384432464634343535304438383437354237373442364336334335323031353430303038393030303039'
            },
            1: {
                request: {
                    tpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
                    pinBlock: 'E57BC634D4717907',
                    pinBlockFormat: '01',
                    pan: '600000000000',
                    lmkIdentifier: '01'
                },
                response: '303031344A435330303037323731544E303045303030313942414432334230434546373945333333323843413035363841304531383646433137453844453733384141463946423637433645314646453537424336333444343731373930373031363030303030303030303030253031'
            }
        },
        translatePinTpkLmkDecode: {
            0: {
                request: bufferize('303030304A44303030333935373032'),
                response: {
                    pin: '0395702'
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
                    pin: '5049248'
                },
                response: '303031324A47553539324133364145303546384531383141423339333942314432394244384431303135343030303839303030303935303439323438'
            },
            1: {
                request: {
                    zpk: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    pinBlockFormat: '01',
                    pan: '850103093936',
                    delimiter: '',
                    pin: '0258743',
                    lmkIdentifier: '01'
                },
                response: '303031324A4753303030373250305442303045303030314541343231363138423334463546413141373746374346363438303131314239374346304641453742443737443538394543393231454639303138353031303330393339333630323538373433253031'
            }
        },
        translatePinLmkZpkDecode: {
            0: {
                request: bufferize('303030324A48303038374338333246373137394539434345'),
                response: {
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
            },
            2: {
                request: {
                    sourceZpk: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    destinationZpk: 'S00072P0TB00E00010D869FE84C1F77AE64E0019151533363D4CCE7E1C3F89F3D86115EE8',
                    maximumPinLength: '12',
                    sourcePinBlock: 'AD72F973446E84E7',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '850103093936',
                    lmkIdentifier: '01'
                },
                response: '303031314343533030303732503054423030453030303145413432313631384233344635464131413737463743463634383031313142393743463046414537424437374435383945433932314546395330303037325030544230304530303031304438363946453834433146373741453634453030313931353135333333363344344343453745314333463839463344383631313545453831324144373246393733343436453834453730313031383530313033303933393336253031'
            }
        },
        translatePinZpkZpkDecode: {
            0: {
                request: bufferize('30323438434430303036304534413242464137384532343446463031'),
                response: {
                    checkLength: '06',
                    pinBlock: '0E4A2BFA78E244FF',
                    pinBlockFormat: '01'
                }
            },
            1: {
                request: bufferize('30313930434430303034424542433338454235383646453432353031'),
                response: {
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
                    sourceKey: 'U3702EF0DEF15CB6DD5367784A7102C3E',
                    destinationKeyFlag: '',
                    destinationKey: 'U3CBFC71309FC372E9A32EA67BE4C81C9',
                    sourceKsnDescriptor: 'A05',
                    sourceKsn: 'FFFF000001315240003A',
                    destinationKsnDescriptor: '',
                    destinationKsn: '',
                    sourcePinBlock: '496F07B85222517D',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '540008900009',
                    destinationPanDelimiter: '',
                    destinationPan: ''
                },
                response: '30303131473055333730324546304445463135434236444435333637373834413731303243334555334342464337313330394643333732453941333245413637424534433831433941303546464646303030303031333135323430303033413439364630374238353232323531374430313031353430303038393030303039'
            },
            1: {
                request: {
                    sourceKeyFlag: '',
                    sourceKey: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
                    destinationKeyFlag: '',
                    destinationKey: 'S00072B0TN00E0001134E8D68D46BC8356F84F598155A1B5C44199D9847A2A58B64BE091F',
                    sourceKsnDescriptor: 'A05',
                    sourceKsn: 'FFFF000001315240003A',
                    destinationKsnDescriptor: 'A05',
                    destinationKsn: 'FFFF000001315240003A',
                    sourcePinBlock: '741311DA9D5D6C32',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '600000000000',
                    destinationPanDelimiter: '',
                    destinationPan: '',
                    lmkIdentifier: '01'
                },
                response: '3030313147305330303037324230544E3030453030303135363636373830373842353333373931354634383630433932463346463244364136423131453837383646323244433830333245423735385330303037324230544E303045303030313133344538443638443436424338333536463834463539383135354131423543343431393944393834374132413538423634424530393146413035464646463030303030313331353234303030334141303546464646303030303031333135323430303033413734313331314441394435443643333230313031363030303030303030303030253031'
            },
            2: {
                request: {
                    sourceKeyFlag: '',
                    sourceKey: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
                    destinationKeyFlag: '',
                    destinationKey: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    sourceKsnDescriptor: 'A05',
                    sourceKsn: 'FFFF000001315240003A',
                    destinationKsnDescriptor: '',
                    destinationKsn: '',
                    sourcePinBlock: '741311DA9D5D6C32',
                    sourcePinBlockFormat: '01',
                    destinationPinBlockFormat: '01',
                    pan: '600000000000',
                    destinationPanDelimiter: '',
                    destinationPan: '',
                    lmkIdentifier: '01'
                },
                response: '3030313147305330303037324230544E3030453030303135363636373830373842353333373931354634383630433932463346463244364136423131453837383646323244433830333245423735385330303037325030544230304530303031454134323136313842333446354641314137374637434636343830313131423937434630464145374244373744353839454339323145463941303546464646303030303031333135323430303033413734313331314441394435443643333230313031363030303030303030303030253031'
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
                    pan: '502265400089000092',
                    expirationDate: '2010',
                    serviceCode: '620'
                },
                response: '3030313143575545313644344344394541423631303033344244453241353039333542434642453530323236353430303038393030303039323B32303130363230'
            },
            1: {
                request: {
                    cvk: 'UE16D4CD9EAB610034BDE2A50935BCFBE',
                    pan: '502265000092',
                    expirationDate: '2010',
                    serviceCode: '999'
                },
                response: '3030313143575545313644344344394541423631303033344244453241353039333542434642453530323236353030303039323B32303130393939'
            },
            2: {
                request: {
                    cvk: 'S00072C0TN00E0001A417975993E2331918759DD1656AC94306BE01C19FDE29E83A93AB42',
                    pan: '502265400089000092',
                    expirationDate: '2010',
                    serviceCode: '620'
                },
                response: '3030313143575330303037324330544E3030453030303141343137393735393933453233333139313837353944443136353641433934333036424530314331394644453239453833413933414234323530323236353430303038393030303039323B32303130363230'
            }
        },
        generateCvvDecode: {
            0: {
                request: bufferize('3030343643583030373035'),
                response: {
                    cvv: '705'
                }
            },
            1: {
                request: bufferize('3031373143583030343633'),
                response: {
                    cvv: '463'
                }
            },
            2: {
                request: bufferize('3030303043583030313831'),
                response: {
                    cvv: '181'
                }
            },
            3: {
                request: bufferize('3030303243583130'),
                response: 'payshield.generateCvv.10'
            },
            4: {
                request: bufferize('3030313343583135'),
                response: 'payshield.generateCvv.15'
            }
        },
        verifyCvvEncode: {
            0: {
                request: {
                    cvk: 'UE16D4CD9EAB610034BDE2A50935BCFBE',
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
                    pan: '502265000092',
                    expirationDate: '2010',
                    serviceCode: '999'
                },
                response: '3030313143595545313644344344394541423631303033344244453241353039333542434642453730353530323236353030303039323B32303130393939'
            },
            2: {
                request: {
                    cvk: 'S00072C0TN00E0001A417975993E2331918759DD1656AC94306BE01C19FDE29E83A93AB42',
                    cvv: '181',
                    pan: '502265400089000092',
                    expirationDate: '2010',
                    serviceCode: '620'
                },
                response: '3030313143595330303037324330544E3030453030303141343137393735393933453233333139313837353944443136353641433934333036424530314331394644453239453833413933414234323138313530323236353430303038393030303039323B32303130363230'
            }
        },
        verifyCvvDecode: {
            0: {
                request: bufferize('30323631435A3030'),
                response: true
            },
            1: {
                request: bufferize('30313131435A3030'),
                response: true
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
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    maximumPinLength: '12',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    checkLength: '06',
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5022654000N2',
                    offset: '876955ffffff'
                },
                response: '3030313144415533303237433839353138314439313241393144374446304544373841433646425538304145334638443633423038463943313336353245353431364437364538443132413639463945373634363930344236383031303635343030303839303030303930313233343536373839313233343536353032323635343030304E32383736393535464646464646'
            },
            1: {
                request: {
                    tpk: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    maximumPinLength: '12',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    checkLength: '06',
                    pan: '540008900009',
                    decimalisationTable: '5432109876543210',
                    pinValidationData: '5022654000N2',
                    offset: '757798ffffff'
                },
                response: '3030313144415533303237433839353138314439313241393144374446304544373841433646425538304145334638443633423038463943313336353245353431364437364538443132413639463945373634363930344236383031303635343030303839303030303935343332313039383736353433323130353032323635343030304E32373537373938464646464646'
            },
            2: {
                request: {
                    tpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
                    pvk: 'S00072V1TN00E00019412BA0AB9D9377261D2CDDB1C4A063ABF35B4CB9E98F7948A501DA2',
                    maximumPinLength: '12',
                    pinBlock: 'E5B0C1445E4C57AF',
                    pinBlockFormat: '01',
                    checkLength: '06',
                    pan: '600000000000',
                    decimalisationTable: '709F26B22464E96A',
                    pinValidationData: '1234560000N0',
                    offset: '093636FFFFFF',
                    lmkIdentifier: '01'
                },
                response: '3030313144415330303037323731544E3030453030303139424144323342304345463739453333333238434130353638413045313836464331374538444537333841414639464236374336453146465330303037325631544E3030453030303139343132424130414239443933373732363144324344444231433441303633414246333542344342394539384637393438413530314441323132453542304331343435453443353741463031303636303030303030303030303037303946323642323234363445393641313233343536303030304E30303933363336464646464646253031'
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
                    pin: '73638636',
                    pinValidationData: '5022654000N2',
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8'
                },
                response: '3030313144455537373333384637344131394533424233393036324135413437393437334643383733363338363336303636353430303038393030303930313233343536373839303132333435353032323635343030304E32'
            },
            1: {
                request: {
                    account: '502265000092',
                    checkLength: '4',
                    decimalisationTable: '6543210987654321',
                    pin: '58652088',
                    pinValidationData: '5022650000N2',
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8'
                },
                response: '3030313144455537373333384637344131394533424233393036324135413437393437334643383538363532303838303435303232363530303030393236353433323130393837363534333231353032323635303030304E32'
            },
            2: {
                request: {
                    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
                    pin: '0258743',
                    checkLength: '06',
                    account: '850103093936',
                    decimalisationTable: '709F26B22464E96A',
                    pinValidationData: '50103093936N',
                    lmkIdentifier: '01'
                },
                response: '3030313144455330303037325631544E3030453030303130414530414432423139393041423430374641443135303539453238373736304130354446344441323339314541423133383837374532323032353837343330363835303130333039333933363730394632364232323436344539364135303130333039333933364E253031'
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
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    pin: '73638636',
                    account: '654000890009',
                    pvki: '1'
                },
                response: '303030324447553737333338463734413139453342423339303632413541343739343733464338373336333836333636353430303038393030303931'
            },
            1: {
                request: {
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    pin: '58652088',
                    account: '502265000092',
                    pvki: '4'
                },
                response: '303030324447553737333338463734413139453342423339303632413541343739343733464338353836353230383835303232363530303030393234'
            },
            2: {
                request: {
                    pvk: 'S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C',
                    pin: '0258743',
                    account: '850103093936',
                    pvki: '1',
                    lmkIdentifier: '01'
                },
                response: '3030303244475330303037325632544E3030453030303145383041323932363434334333414631314246303331374336363946413045413045313030414244463932424637413341463233324434433032353837343338353031303330393339333631253031'
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
                    offset: '000000ffffff',
                    checkLength: '6',
                    account: '654000890009',
                    decimalisationTable: '0123456789012345',
                    pinValidationData: '5022654000N2'
                },
                response: '303031314545553737333338463734413139453342423339303632413541343739343733464338303030303030464646464646303636353430303038393030303930313233343536373839303132333435353032323635343030304E32'
            },
            1: {
                request: {
                    pvk: 'U77338F74A19E3BB39062A5A479473FC8',
                    offset: '0000ffffffff',
                    checkLength: '4',
                    account: '502265000092',
                    decimalisationTable: '6543210987654321',
                    pinValidationData: '5022650000N2'
                },
                response: '303031314545553737333338463734413139453342423339303632413541343739343733464338303030304646464646464646303435303232363530303030393236353433323130393837363534333231353032323635303030304E32'
            },
            2: {
                request: {
                    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
                    offset: '309783FFFFFF',
                    checkLength: '06',
                    account: '850103093936',
                    decimalisationTable: '709F26B22464E96A',
                    pinValidationData: '50103093936N',
                    lmkIdentifier: '01'
                },
                response: '3030313145455330303037325631544E30304530303031304145304144324231393930414234303746414431353035394532383737363041303544463444413233393145414231333838373745323233303937383346464646464630363835303130333039333933363730394632364232323436344539364135303130333039333933364E253031'
            }
        },
        derivePinIbmDecode: {
            0: {
                request: bufferize('30303531454630323733363338363336'),
                response: {
                    pin: '73638636'
                }
            },
            1: {
                request: bufferize('30303838454630323538363532303838'),
                response: {
                    pin: '58652088'
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
                    messageData: '77338F74A19E3BB39062A5A479473FC8'
                },
                response: '30303032474D3036303030313677338F74A19E3BB39062A5A479473FC8'
            },
            1: {
                request: {
                    hashId: '01',
                    messageDataLength: 17,
                    messageData: '736F6D65206461746120746F2068617368'
                },
                response: '30303032474D30313030303137736F6D65206461746120746F2068617368'
            }
        },
        hashDataBlockDecode: {
            0: {
                request: bufferize('30353938474E303068EBB852B948D5A06F1F309580D3EBD85C5F8697B4B42C5656584A37A2DDB96C'),
                response: {
                    hash: '68ebb852b948d5a06f1f309580d3ebd85c5f8697b4b42c5656584a37a2ddb96c'
                }
            },
            1: {
                request: bufferize('30303030474E30303D22CA807AD75C9FF3CA07C4E6C396B7D99F7206'),
                response: {
                    hash: '3d22ca807ad75c9ff3ca07c4e6c396b7d99f7206'
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
                    mksmi: '',
                    panSeqNo: '7804020000000000',
                    atc: '0018',
                    unpredictableNumber: '84F01F9D',
                    transactionDataLengthDec: 40,
                    transactionDataLengthHex: '28',
                    transactionData: '0000000000000000000000000288800004800002881712200184F01F9D1402030018000018000000',
                    delimiter: ';',
                    arqc: '0A994C22203060C4',
                    arcLength: 0,
                    arc: '',
                    discretionaryDataMacLength: 0,
                    discretionaryDataMac: '',
                    discretionaryDataBytes: '',
                    discretionaryDataLength: 0,
                    discretionaryData: ''
                },
                response: '303030324B5130305535363242374331393841353844323838353146313535313743444142413630457804020000000000001884F01F9D32380000000000000000000000000288800004800002881712200184F01F9D14020300180000180000003B0A994C22203060C4'
            },
            1: {
                request: {
                    modeFlag: 2,
                    schemeId: 0,
                    mkac: 'U562B7C198A58D28851F15517CDABA60E',
                    mksmi: '',
                    panSeqNo: '7804020000000000',
                    atc: '0018',
                    unpredictableNumber: '84F01F9D',
                    transactionDataLengthDec: '',
                    transactionDataLengthHex: '',
                    transactionData: '',
                    delimiter: '',
                    arqc: '0A994C22203060C4',
                    arcLength: 2,
                    arc: '3030',
                    discretionaryDataMacLength: 0,
                    discretionaryDataMac: '',
                    discretionaryDataBytes: '',
                    discretionaryDataLength: 0,
                    discretionaryData: ''
                },
                response: '303030324B5132305535363242374331393841353844323838353146313535313743444142413630457804020000000000001884F01F9D0A994C22203060C43030'
            },
            2: {
                request: {
                    modeFlag: 3,
                    schemeId: 0,
                    mkac: 'U562B7C198A58D28851F15517CDABA60E',
                    mksmi: 'U0A955B42C931A7FD3F2B12B1595CB3FB',
                    panSeqNo: '7804020000000000',
                    atc: '0018',
                    unpredictableNumber: '84F01F9D',
                    transactionDataLengthDec: 40,
                    transactionDataLengthHex: '28',
                    transactionData: '0000000000000000000000000288800004800002881712200184F01F9D1402030018000018000000',
                    delimiter: ';',
                    arqc: '0A994C22203060C4',
                    arcLength: 0,
                    arc: '',
                    discretionaryDataMacLength: 4,
                    discretionaryDataMac: '63EB7F42',
                    discretionaryDataBytes: '08',
                    discretionaryDataLength: 8,
                    discretionaryData: '4E6F772069732074'
                },
                response: '303030324B5133305535363242374331393841353844323838353146313535313743444142413630455530413935354234324339333141374644334632423132423135393543423346427804020000000000001884F01F9D32380000000000000000000000000288800004800002881712200184F01F9D14020300180000180000003B0A994C22203060C463EB7F4230384E6F772069732074'
            },
            3: {
                request: {
                    modeFlag: 4,
                    schemeId: 0,
                    mkac: 'U562B7C198A58D28851F15517CDABA60E',
                    mksmi: 'U0A955B42C931A7FD3F2B12B1595CB3FB',
                    panSeqNo: '7804020000000000',
                    atc: '0018',
                    unpredictableNumber: '84F01F9D',
                    transactionDataLengthDec: 40,
                    transactionDataLengthHex: '28',
                    transactionData: '0000000000000000000000000288800004800002881712200184F01F9D1402030018000018000000',
                    delimiter: ';',
                    arqc: '0A994C22203060C4',
                    arcLength: 2,
                    arc: '3030',
                    discretionaryDataMacLength: 4,
                    discretionaryDataMac: '63EB7F42',
                    discretionaryDataBytes: '08',
                    discretionaryDataLength: 8,
                    discretionaryData: '4E6F772069732074'
                },
                response: '303030324B5134305535363242374331393841353844323838353146313535313743444142413630455530413935354234324339333141374644334632423132423135393543423346427804020000000000001884F01F9D32380000000000000000000000000288800004800002881712200184F01F9D14020300180000180000003B0A994C22203060C4303063EB7F4230384E6F772069732074'
            },
            4: {
                request: {
                    modeFlag: 0,
                    schemeId: 0,
                    mkac: 'S00072E0TN00S00012574E37226ADAA76E5B8F2C4F14AD34F1F054EF52CB56BE2F4D03BEA',
                    mksmi: '',
                    panSeqNo: '5600000000000001',
                    atc: '7400',
                    unpredictableNumber: 'C2C6A091',
                    transactionDataLengthDec: 40,
                    transactionDataLengthHex: '28',
                    transactionData: '0000000000000000000000000288800004800002881712200184F01F9D1402030018000018000000',
                    delimiter: ';',
                    arqc: '46E98E9B85E9C640',
                    arcLength: 0,
                    arc: '',
                    discretionaryDataMacLength: 0,
                    discretionaryDataMac: '',
                    discretionaryDataBytes: '',
                    discretionaryDataLength: 0,
                    discretionaryData: '',
                    lmkIdentifier: '01'
                },
                response: '303030324B5130305330303037324530544E30305330303031323537344533373232364144414137364535423846324334463134414433344631463035344546353243423536424532463444303342454156000000000000017400C2C6A09132380000000000000000000000000288800004800002881712200184F01F9D14020300180000180000003B46E98E9B85E9C640253031'
            },
            5: {
                request: {
                    modeFlag: 1,
                    schemeId: 0,
                    mkac: 'S00072E0TN00S00012574E37226ADAA76E5B8F2C4F14AD34F1F054EF52CB56BE2F4D03BEA',
                    mksmi: '',
                    panSeqNo: '5600000000000001',
                    atc: '7400',
                    unpredictableNumber: 'C2C6A091',
                    transactionDataLengthDec: 40,
                    transactionDataLengthHex: '28',
                    transactionData: '00000000000000000000000009780000000000097820121431C2C6A0915800740003A00000000000',
                    delimiter: ';',
                    arqc: '0A994C22203060C4',
                    arcLength: 2,
                    arc: '3030',
                    discretionaryDataMacLength: 0,
                    discretionaryDataMac: '',
                    discretionaryDataBytes: '',
                    discretionaryDataLength: 0,
                    discretionaryData: '',
                    lmkIdentifier: '01'
                },
                response: '303030324B5131305330303037324530544E30305330303031323537344533373232364144414137364535423846324334463134414433344631463035344546353243423536424532463444303342454156000000000000017400C2C6A091323800000000000000000000000009780000000000097820121431C2C6A0915800740003A000000000003B0A994C22203060C43030253031'
            }
        },
        generateArqc3Decode: {
            0: {
                request: bufferize('323034304B523030'),
                response: {}
            },
            1: {
                request: bufferize('303038384B52303095BD8DFD502CA21F'),
                response: {
                    arpc: '95BD8DFD502CA21F'
                }
            },
            2: {
                request: bufferize('303030314B523030'),
                response: {}
            },
            3: {
                request: bufferize('303031304B52303095BD8DFD502CA21F'),
                response: {
                    arpc: '95BD8DFD502CA21F'
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
                    delimiter1: '',
                    branchHeightParams: '',
                    atc: '0003',
                    transactionDataLengthDec: 72,
                    transactionDataLengthHex: '48',
                    transactionData: '00000001000000000000000006088010040000060818010201B21BB356180000030FA501803000000000000000000000000F00000000000000000000000000000000000000000000',
                    delimiter2: ';',
                    arqc: 'F67B7E07A55DF243',
                    arcLength: 0,
                    arc: '',
                    csuLength: 0,
                    csu: '',
                    padLength: '',
                    pad: ''
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
                    delimiter1: '',
                    branchHeightParams: '',
                    atc: '005B',
                    transactionDataLengthDec: 32,
                    transactionDataLengthHex: '20',
                    transactionData: '0FA501A13102000000000000000000000F010000000000000000000000000000',
                    delimiter2: ';',
                    arqc: 'DDA6BCC881C093AD',
                    arcLength: 0,
                    arc: '',
                    csuLength: 0,
                    csu: '',
                    padLength: '',
                    pad: ''
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
                    delimiter1: '',
                    branchHeightParams: '',
                    atc: '005B',
                    transactionDataLengthDec: '',
                    transactionDataLengthHex: '',
                    transactionData: '',
                    delimiter2: '',
                    arqc: 'DDA6BCC881C093AD',
                    arcLength: 0,
                    arc: '',
                    csuLength: 4,
                    csu: '00000000',
                    padLength: '5',
                    pad: '8080040000'
                },
                response: '303030324B5734325535313837363341433631464235334532323330364331443835393738433339433239010000012101005BDDA6BCC881C093AD00000000358080040000'
            },
            3: {
                request: {
                    modeFlag: 0,
                    schemeId: 2,
                    mkac: 'S00072E0TN00S00012574E37226ADAA76E5B8F2C4F14AD34F1F054EF52CB56BE2F4D03BEA',
                    ivacLength: 0,
                    ivac: '',
                    panSeqNoLengthLength: 0,
                    panLength: '',
                    panSeqNoLength: 8,
                    panSeqNo: '7804020000001800',
                    delimiter1: '',
                    branchHeightParams: '',
                    atc: '0003',
                    transactionDataLengthDec: 72,
                    transactionDataLengthHex: '48',
                    transactionData: '00000001000000000000000006088010040000060818010201B21BB356180000030FA501803000000000000000000000000F00000000000000000000000000000000000000000000',
                    delimiter2: ';',
                    arqc: 'F67B7E07A55DF243',
                    arcLength: 0,
                    arc: '',
                    csuLength: 0,
                    csu: '',
                    padLength: '',
                    pad: ''
                },
                response: '303030324B5730325330303037324530544E30305330303031323537344533373232364144414137364535423846324334463134414433344631463035344546353243423536424532463444303342454178040200000018000003343800000001000000000000000006088010040000060818010201B21BB356180000030FA501803000000000000000000000000F000000000000000000000000000000000000000000003BF67B7E07A55DF243'
            },
            4: {
                request: {
                    modeFlag: 0,
                    schemeId: 2,
                    mkac: 'S00072E0TN00S00012574E37226ADAA76E5B8F2C4F14AD34F1F054EF52CB56BE2F4D03BEA',
                    ivacLength: 0,
                    ivac: '',
                    panSeqNoLengthLength: 0,
                    panLength: '',
                    panSeqNoLength: 8,
                    panSeqNo: '3239010000012101',
                    delimiter1: '',
                    branchHeightParams: '',
                    atc: '005B',
                    transactionDataLengthDec: 32,
                    transactionDataLengthHex: '20',
                    transactionData: '0FA501A13102000000000000000000000F010000000000000000000000000000',
                    delimiter2: ';',
                    arqc: 'DDA6BCC881C093AD',
                    arcLength: 0,
                    arc: '',
                    csuLength: 0,
                    csu: '',
                    padLength: '',
                    pad: ''
                },
                response: '303030324B5730325330303037324530544E3030533030303132353734453337323236414441413736453542384632433446313441443334463146303534454635324342353642453246344430334245413239010000012101005B32300FA501A13102000000000000000000000F0100000000000000000000000000003BDDA6BCC881C093AD'
            },
            5: {
                request: {
                    modeFlag: 4,
                    schemeId: 2,
                    mkac: 'S00072E0TN00S00012574E37226ADAA76E5B8F2C4F14AD34F1F054EF52CB56BE2F4D03BEA',
                    ivacLength: 0,
                    ivac: '',
                    panSeqNoLengthLength: 0,
                    panLength: '',
                    panSeqNoLength: 8,
                    panSeqNo: '3239010000012101',
                    delimiter1: '',
                    branchHeightParams: '',
                    atc: '005B',
                    transactionDataLengthDec: '',
                    transactionDataLengthHex: '',
                    transactionData: '',
                    delimiter2: '',
                    arqc: 'DDA6BCC881C093AD',
                    arcLength: 0,
                    arc: '',
                    csuLength: 4,
                    csu: '00000000',
                    padLength: '5',
                    pad: '8080040000'
                },
                response: '303030324B5734325330303037324530544E3030533030303132353734453337323236414441413736453542384632433446313441443334463146303534454635324342353642453246344430334245413239010000012101005BDDA6BCC881C093AD00000000358080040000'
            }
        },
        generateArqc4Decode: {
            0: {
                request: bufferize('303030364B583030'),
                response: {}
            },
            1: {
                request: bufferize('303032344B583030'),
                response: {}
            },
            2: {
                request: bufferize('303236334B583030A62169F300000000'),
                response: {
                    arpc: 'A62169F300000000'
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
                    ksnDescriptor: '',
                    ksn: '',
                    iv: '',
                    messageDataLengthHex: '20',
                    messageData: '0400980C0002AE900AF140D0C21230D7'
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
                    ksnDescriptor: '',
                    ksn: '',
                    iv: '',
                    messageDataLengthHex: '20',
                    messageData: '0400980C0002AE900AF140D0C21230D7'
                },
                response: '303030324D3030303231303042554231393046374642423830324541313446414337393137443346364544423637303032303034303039383043303030324145393030414631343044304332313233304437'
            },
            2: {
                request: {
                    modeFlag: '00',
                    inputFormatFlag: '1',
                    outputFormatFlag: '1',
                    keyType: 'FFF',
                    key: 'S00072D0TN00E0001BD79343066F46B9C1279E2DE4382E56E6DD5BDCE0F850C7E444799D9',
                    ksnDescriptor: '',
                    ksn: '',
                    iv: '',
                    messageDataLengthHex: '08',
                    messageData: 'ABCDEF1234567890'
                },
                response: '303030324D30303031314646465330303037324430544E3030453030303142443739333433303636463436423943313237394532444534333832453536453644443542444345304638353043374534343437393944393030303841424344454631323334353637383930'
            }
        },
        encryptDataBlockDecode: {
            0: {
                request: bufferize('303030364D313030303032303331314438443133463843363137454638333834343143333645333341364441'),
                response: {
                    messageLength: 32,
                    encrypted: '311D8D13F8C617EF838441C36E33A6DA'
                }
            },
            1: {
                request: bufferize('303038334D3130303030343038314536424446333530433733454431333639384532433133353642353836323243333837314432383436464331313044443745374139443130323445433038'),
                response: {
                    messageLength: 64,
                    encrypted: '81E6BDF350C73ED13698E2C1356B58622C3871D2846FC110DD7E7A9D1024EC08'
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
                    bpsRadixValue: '',
                    bpsTweakLength: 0,
                    bpsTweak: '',
                    inputFormatFlag: '1',
                    outputFormatFlag: '1',
                    keyType: '00B',
                    key: 'UB190F7FBB802EA14FAC7917D3F6EDB67',
                    ksnDescriptor: '',
                    ksn: '',
                    iv: '',
                    messageDataLengthHex: '20',
                    messageData: '311D8D13F8C617EF838441C36E33A6DA'
                },
                response: '303030324D3230303131303042554231393046374642423830324541313446414337393137443346364544423637303032303331314438443133463843363137454638333834343143333645333341364441'
            },
            1: {
                request: {
                    modeFlag: '00',
                    bpsRadixFlag: '',
                    bpsRadixValue: '',
                    bpsTweakLength: 0,
                    bpsTweak: '',
                    inputFormatFlag: '1',
                    outputFormatFlag: '2',
                    keyType: '00B',
                    key: 'UB190F7FBB802EA14FAC7917D3F6EDB67',
                    ksnDescriptor: '',
                    ksn: '',
                    iv: '',
                    messageDataLengthHex: '40',
                    messageData: '81E6BDF350C73ED13698E2C1356B58622C3871D2846FC110DD7E7A9D1024EC08'
                },
                response: '303030324D32303031323030425542313930463746424238303245413134464143373931374433463645444236373030343038314536424446333530433733454431333639384532433133353642353836323243333837314432383436464331313044443745374139443130323445433038'
            },
            2: {
                request: {
                    modeFlag: '00',
                    bpsRadixFlag: '',
                    bpsRadixValue: '',
                    bpsTweakLength: 0,
                    bpsTweak: '',
                    inputFormatFlag: '1',
                    outputFormatFlag: '1',
                    keyType: '00B',
                    key: 'UB190F7FBB802EA14FAC7917D3F6EDB67',
                    ksnDescriptor: '',
                    ksn: '',
                    iv: '',
                    messageDataLengthHex: '20',
                    messageData: '311D8D13F8C617EF838441C36E33A6DA',
                    lmkIdentifier: 0
                },
                response: '303030324D3230303131303042554231393046374642423830324541313446414337393137443346364544423637303032303331314438443133463843363137454638333834343143333645333341364441253030'
            },
            3: {
                request: {
                    modeFlag: '00',
                    bpsRadixFlag: '',
                    bpsRadixValue: '',
                    bpsTweakLength: 0,
                    bpsTweak: '',
                    inputFormatFlag: '1',
                    outputFormatFlag: '1',
                    keyType: 'FFF',
                    key: 'S00072D0TN00E0001BD79343066F46B9C1279E2DE4382E56E6DD5BDCE0F850C7E444799D9',
                    ksnDescriptor: '',
                    ksn: '',
                    iv: '',
                    messageDataLengthHex: '08',
                    messageData: '6DD932DE48520285',
                    lmkIdentifier: '01'
                },
                response: '303030324D32303031314646465330303037324430544E3030453030303142443739333433303636463436423943313237394532444534333832453536453644443542444345304638353043374534343437393944393030303836444439333244453438353230323835253031'
            }
        },
        decryptDataBlockDecode: {
            0: {
                request: bufferize('303031334D333030303032303034303039383043303030324145393030414631343044304332313233304437'),
                response: {
                    messageLength: 32,
                    decrypted: '0400980C0002AE900AF140D0C21230D7'
                }
            },
            1: {
                request: bufferize('303033364D333030303032303034303039383043303030324145393030414631343044304332313233304437'),
                response: {
                    messageLength: 32,
                    decrypted: '0400980C0002AE900AF140D0C21230D7'
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
                    sourceKsn: '',
                    destinationKeyType: '00B',
                    destinationKey: 'U69721302D9FB7876D98CDDA0FDE1A09B',
                    destinationKsnDescriptor: '',
                    destinationKsn: '',
                    sourceIv: '',
                    destinationIv: '',
                    messageDataLengthHex: '20',
                    messageData: '311D8D13F8C617EF838441C36E33A6DA'
                },
                response: '303030324D34303030303131303042554231393046374642423830324541313446414337393137443346364544423637303042553639373231333032443946423738373644393843444441304644453141303942303032303331314438443133463843363137454638333834343143333645333341364441'
            },
            1: {
                request: {
                    sourceModeFlag: '00',
                    destinationModeFlag: '00',
                    inputFormatFlag: '1',
                    outputFormatFlag: '1',
                    sourceKeyType: 'FFF',
                    sourceKey: 'S00072D0TN00E0001BD79343066F46B9C1279E2DE4382E56E6DD5BDCE0F850C7E444799D9',
                    sourceKsnDescriptor: '',
                    sourceKsn: '',
                    destinationKeyType: 'FFF',
                    destinationKey: 'S00072D0TN00E00010EA718005998326E187E742CF400E5698F5E55E2A0A25A5FD9C5EDDE',
                    destinationKsnDescriptor: '',
                    destinationKsn: '',
                    sourceIv: '',
                    destinationIv: '',
                    messageDataLengthHex: '08',
                    messageData: '6DD932DE48520285'
                },
                response: '303030324D343030303031314646465330303037324430544E3030453030303142443739333433303636463436423943313237394532444534333832453536453644443542444345304638353043374534343437393944394646465330303037324430544E3030453030303130454137313830303539393833323645313837453734324346343030453536393846354535354532413041323541354644394335454444453030303836444439333244453438353230323835'
            }
        },
        translateDataBlockDecode: {
            0: {
                request: bufferize('303031384D353030303032304644364146423545433834314530384144313731414531344133393732303938'),
                response: {
                    messageDataLength: 32,
                    encrypted: 'FD6AFB5EC841E08AD171AE14A3972098'
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
                    iv: '',
                    macDataLengthHex: '1E',
                    macData: '22\u001c002000001\u001c\u001c05151009\u001cF\u001c60000'
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
                    iv: '',
                    macDataLengthHex: '1E',
                    macData: '22\u001c002000001\u001c\u001c05151009\u001cF\u001c60000'
                },
                response: '303030324D3630303033313030385546373539454637324631354638383933334342394238364535344339444338333030314532321C3030323030303030311C1C30353135313030391C461C3630303030'
            },
            2: {
                request: {
                    modeFlag: '0',
                    inputFormatFlag: '2',
                    macSize: '0',
                    macAlgorithm: '1',
                    paddingMethod: '1',
                    keyType: 'FFF',
                    key: 'S00072M1TN00E0001FFE01E95CF21BDD0D74B6BEB70E3D90842C137DCA39C1B162C6238D5',
                    iv: '',
                    macDataLengthHex: '1E',
                    macData: '22\u001c002000001\u001c\u001c05151009\u001cF\u001c60000'
                },
                response: '303030324D3630323031314646465330303037324D31544E3030453030303146464530314539354346323142444430443734423642454237304533443930383432433133374443413339433142313632433632333844353030314532321C3030323030303030311C1C30353135313030391C461C3630303030'
            }
        },
        generateMacDecode: {
            0: {
                request: bufferize('303034384D3730304335374534323935'),
                response: {
                    mac: 'C57E4295'
                },
                context: context({
                    request: {
                        modeFlag: '0'
                    },
                    headerNo: '0048'
                })
            },
            1: {
                request: bufferize('303034384D3730304246323637363545'),
                response: {
                    iv: 'BF26765E'
                },
                context: context({
                    request: {
                        modeFlag: '1'
                    },
                    headerNo: '0048'
                })
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
                    iv: '',
                    macDataLengthHex: '1E',
                    macData: '22\u001c002000001\u001c\u001c05151009\u001cF\u001c60000',
                    mac: 'C57E4295'
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
                    iv: '',
                    macDataLengthHex: '1E',
                    macData: '22\u001c002000001\u001c\u001c05151009\u001cF\u001c60000',
                    mac: 'BF26765E'
                },
                response: '303030324D3830303033313030385546373539454637324631354638383933334342394238364535344339444338333030314532321C3030323030303030311C1C30353135313030391C461C36303030304246323637363545'
            },
            2: {
                request: {
                    modeFlag: '0',
                    inputFormatFlag: '1',
                    macSize: '0',
                    macAlgorithm: '1',
                    paddingMethod: '1',
                    keyType: 'FFF',
                    key: 'S00072M1TN00E0001FFE01E95CF21BDD0D74B6BEB70E3D90842C137DCA39C1B162C6238D5',
                    iv: '',
                    macDataLengthHex: '8',
                    macData: 'ABCDEF12',
                    mac: 'F9369211',
                    lmkIdentifier: '01'
                },
                response: '303030324D3830313031314646465330303037324D31544E3030453030303146464530314539354346323142444430443734423642454237304533443930383432433133374443413339433142313632433632333844353030303841424344454631324639333639323131253031'
            }
        },
        verifyMacDecode: {
            0: {
                request: bufferize('303034324D393030'),
                response: {}
            },
            1: {
                request: bufferize('303036334D393030'),
                response: {}
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
                    data: '>L>L>L>L>005^1>L>L>005^3>L>L>L>L>L>L>L>030^P>L>L>L>L>L'
                },
                response: '3030303250413E4C3E4C3E4C3E4C3E3030355E313E4C3E4C3E3030355E333E4C3E4C3E4C3E4C3E4C3E4C3E4C3E3033305E503E4C3E4C3E4C3E4C3E4C'
            }
        },
        printFormatDecode: {
            0: {
                request: bufferize('3035333450423030'),
                response: true
            }
        },
        printPinEncode: {
            0: {
                request: {
                    documentType: 'C',
                    account: '540008900009',
                    pin: '0302477',
                    printFields: ';Krasi;;Kolev'
                },
                response: '30303032504543353430303038393030303039303330323437373B4B726173693B3B4B6F6C65767E'
            }
        },
        printPinDecode: {
            0: {
                request: bufferize('303035305046303034393634393238343135343439333337323735'),
                response: {
                    checkValue: '4964928415449337275'
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
                    pin: '01234',
                    oldAccountNumber: '1234560000001234',
                    newAccountNumber: '6543210000004321'
                },
                response: '30303330514B3031323334313233343536303030303030313233343635343332313030'
            }
        },
        translateAccountNumberDecode: {
            0: {
                request: bufferize('30303330514C30303433323130'),
                response: {
                    pin: '43210'
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
                    printFields: 'field0;Krasi;Kolev;444A82'
                },
                response: '3030303254415536353342444437424633374143333642313630443738374244333036383737426669656C64303B4B726173693B4B6F6C65763B343434413832'
            }
        },
        printTmkMailerDecode: {
            0: {
                request: bufferize('3033393054423030'),
                response: true
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
                response: true
            }
        },
        generatePvvEncode: {
            0: {
                request: {
                    keyType: '002',
                    key: 'U3027C895181D912A91D7DF0ED78AC6FB',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    pvki: '4'
                },
                response: '30303032465730303255333032374338393531383144393132413931443744463045443738414336464255383041453346384436334230384639433133363532453534313644373645384441363946394537363436393034423638303135343030303839303030303934'
            },
            1: {
                request: {
                    keyType: '001',
                    key: 'UBB224A0D70899E7D216A4DDDA615C078',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pinBlock: 'ED42DE5980AB024B',
                    pinBlockFormat: '01',
                    pan: '600000000000',
                    pvki: '4'
                },
                response: '30303032465730303155424232323441304437303839394537443231364134444444413631354330373855383041453346384436334230384639433133363532453534313644373645384445443432444535393830414230323442303136303030303030303030303034'
            },
            2: {
                request: {
                    keyType: 'FFF',
                    key: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    pvk: 'S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C',
                    pinBlock: 'AD72F973446E84E7',
                    pinBlockFormat: '01',
                    pan: '850103093936',
                    pvki: '1',
                    lmkIdentifier: '01'
                },
                response: '303030324657464646533030303732503054423030453030303145413432313631384233344635464131413737463743463634383031313142393743463046414537424437374435383945433932314546395330303037325632544E30304530303031453830413239323634343343334146313142463033313743363639464130454130453130304142444639324246374133414632333244344341443732463937333434364538344537303138353031303330393339333631253031'
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
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    pvki: '4',
                    pvv: '2914'
                },
                response: '3030303244435533303237433839353138314439313241393144374446304544373841433646425538304145334638443633423038463943313336353245353431364437364538444136394639453736343639303442363830313534303030383930303030393432393134'
            },
            1: {
                request: {
                    tpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
                    pvk: 'S00072V2TN00E00014C0328F82856C4E6D7CCF7A9A1597CB0662C35A18CC72EB9CF97917C',
                    pinBlock: 'E57BC634D4717907',
                    pinBlockFormat: '01',
                    pan: '600000000000',
                    pvki: '1',
                    pvv: '2194'
                },
                response: '3030303244435330303037323731544E3030453030303139424144323342304345463739453333333238434130353638413045313836464331374538444537333841414639464236374336453146465330303037325632544E3030453030303134433033323846383238353643344536443743434637413941313539374342303636324333354131384343373245423943463937393137434535374243363334443437313739303730313630303030303030303030303132313934'
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
                    destinationPinBlock: 'B2766AACF790B197'
                },
                response: '303030324355303032553934384237343933334541414434364336423842444541443135353041463241553830414533463844363342303846394331333635324535343136443736453844324644433538314143323543393634303031353430303038393030303039343239313442323736364141434637393042313937'
            },
            1: {
                request: {
                    keyType: 'FFF',
                    key: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    pvk: 'S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C',
                    sourcePinBlock: 'AD72F973446E84E7',
                    sourcePinBlockFormat: '01',
                    pan: '850103093936',
                    pvki: '1',
                    sourcePvv: '7548',
                    destinationPinBlock: '967CDB6E3D492E28',
                    lmkIdentifier: '01'
                },
                response: '303030324355464646533030303732503054423030453030303145413432313631384233344635464131413737463743463634383031313142393743463046414537424437374435383945433932314546395330303037325632544E303045303030314538304132393236343433433341463131424630333137433636394641304541304531303041424446393242463741334146323332443443414437324639373334343645383445373031383530313033303933393336313735343839363743444236453344343932453238253031'
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
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    sourcePinBlock: '2FDC581AC25C9640',
                    sourcePinBlockFormat: '01',
                    checkLength: 6,
                    pan: '540008900009',
                    decimalisationTable: 'FD64FC3FAD504BB3',
                    pinValidationData: '5022654000N2',
                    sourceOffset: '123456FFFFFF',
                    destinationPinBlock: 'B2766AACF790B197'
                },
                response: '303032394455303032553934384237343933334541414434364336423842444541443135353041463241553830414533463844363342303846394331333635324535343136443736453844324644433538314143323543393634303031303635343030303839303030303946443634464333464144353034424233353032323635343030304E3231323334353646464646464642323736364141434637393042313937'
            },
            1: {
                request: {
                    keyType: 'FFF',
                    key: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
                    sourcePinBlock: '967CDB6E3D492E28',
                    sourcePinBlockFormat: '01',
                    checkLength: '06',
                    pan: '850103093936',
                    decimalisationTable: '709F26B22464E96A',
                    pinValidationData: '50103093936N',
                    sourceOffset: '309783FFFFFF',
                    destinationPinBlock: '967CDB6E3D492E28',
                    lmkIdentifier: '01'
                },
                response: '303032394455464646533030303732503054423030453030303145413432313631384233344635464131413737463743463634383031313142393743463046414537424437374435383945433932314546395330303037325631544E30304530303031304145304144324231393930414234303746414431353035394532383737363041303544463444413233393145414231333838373745323239363743444236453344343932453238303130363835303130333039333933363730394632364232323436344539364135303130333039333933364E33303937383346464646464639363743444236453344343932453238253031'
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
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    maximumPinLength: '12',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    checkLength: '06',
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5022654000N2',
                    offset: '876955ffffff'
                },
                response: '3030323845415533303237433839353138314439313241393144374446304544373841433646425538304145334638443633423038463943313336353245353431364437364538443132413639463945373634363930344236383031303635343030303839303030303930313233343536373839313233343536353032323635343030304E32383736393535464646464646'
            },
            1: {
                request: {
                    zpk: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
                    maximumPinLength: '12',
                    pinBlock: '967CDB6E3D492E28',
                    pinBlockFormat: '01',
                    checkLength: '06',
                    pan: '850103093936',
                    decimalisationTable: '709F26B22464E96A',
                    pinValidationData: '50103093936N',
                    offset: '309783FFFFFF',
                    lmkIdentifier: '01'
                },
                response: '303032384541533030303732503054423030453030303145413432313631384233344635464131413737463743463634383031313142393743463046414537424437374435383945433932314546395330303037325631544E303045303030313041453041443242313939304142343037464144313530353945323837373630413035444634444132333931454142313338383737453232313239363743444236453344343932453238303130363835303130333039333933363730394632364232323436344539364135303130333039333933364E333039373833464646464646253031'
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
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    pinBlock: 'ED42DE5980AB024B',
                    pinBlockFormat: '01',
                    pan: '600000000000',
                    delimiter: '',
                    verificationPan: '',
                    pvki: '4',
                    pvv: '1835'
                },
                response: '3030303245435542423232344130443730383939453744323136413444444441363135433037385538304145334638443633423038463943313336353245353431364437364538444544343244453539383041423032344230313630303030303030303030303431383335'
            },
            1: {
                request: {
                    zpk: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
                    pvk: 'S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C',
                    pinBlock: 'AD72F973446E84E7',
                    pinBlockFormat: '01',
                    pan: '850103093936',
                    delimiter: '',
                    verificationPan: '',
                    pvki: '1',
                    pvv: '7548',
                    lmkIdentifier: '01'
                },
                response: '303030324543533030303732503054423030453030303145413432313631384233344635464131413737463743463634383031313142393743463046414537424437374435383945433932314546395330303037325632544E3030453030303145383041323932363434334333414631314246303331374336363946413045413045313030414244463932424637413341463233324434434144373246393733343436453834453730313835303130333039333933363137353438253031'
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
                    macMode: '',
                    macMethod: '',
                    bdk: 'UAADAFCC8551ADAB246EA1176FD691EDF',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    ksnDescriptor: 'A05',
                    ksn: 'FFFF0000010020000026',
                    pinBlock: 'BC786E28753DD4B2',
                    pinBlockFormat: '01',
                    checkLength: 4,
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5052654000N2',
                    offset: '1234ffffffff',
                    mac: '',
                    messageDataLengthBytesLength: 0,
                    messageDataLengthBytes: '',
                    messageData: ''
                },
                response: bufferize('30303134474F305541414441464343383535314144414232343645413131373646443639314544465538304145334638443633423038463943313336353245353431364437364538444130354646464630303030303130303230303030303236424337383645323837353344443442323031303435343030303839303030303930313233343536373839313233343536353035323635343030304E32313233344646464646464646')
            },
            1: {
                request: {
                    mode: '0',
                    macMode: '1',
                    macMethod: '1',
                    bdk: 'UAADAFCC8551ADAB246EA1176FD691EDF',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    ksnDescriptor: 'A05',
                    ksn: 'FFFF0000010020000026',
                    pinBlock: 'BC786E28753DD4B2',
                    pinBlockFormat: '01',
                    checkLength: 4,
                    pan: '540008900009',
                    decimalisationTable: '0123456789123456',
                    pinValidationData: '5052654000N2',
                    offset: '1234ffffffff',
                    mac: 'ABCD1234EF098765',
                    messageDataLengthBytesLength: 4,
                    messageDataLengthBytes: '16',
                    messageData: '424C41424C414D455353414745000000'
                },
                response: bufferize('30303134474F3031315541414441464343383535314144414232343645413131373646443639314544465538304145334638443633423038463943313336353245353431364437364538444130354646464630303030303130303230303030303236424337383645323837353344443442323031303435343030303839303030303930313233343536373839313233343536353035323635343030304E323132333446464646464646464142434431323334454630393837363530303136424C41424C414D455353414745000000')
            },
            2: {
                request: {
                    mode: '0',
                    macMode: '',
                    macMethod: '',
                    bdk: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
                    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
                    ksnDescriptor: 'A05',
                    ksn: 'FFFF000001315240003A',
                    pinBlock: '741311DA9D5D6C32',
                    pinBlockFormat: '01',
                    checkLength: 6,
                    pan: '600000000000',
                    decimalisationTable: '709F26B22464E96A',
                    pinValidationData: '0000000000N0',
                    offset: '035965FFFFFF',
                    mac: '',
                    messageDataLengthBytesLength: 0,
                    messageDataLengthBytes: '',
                    messageData: '',
                    lmkIdentifier: '01'
                },
                response: bufferize('30303134474f305330303037324230544e3030453030303135363636373830373842353333373931354634383630433932463346463244364136423131453837383646323244433830333245423735385330303037325631544e3030453030303130414530414432423139393041423430374641443135303539453238373736304130354446344441323339314541423133383837374532324130354646464630303030303133313532343030303341373431333131444139443544364333323031303636303030303030303030303037303946323642323234363445393641303030303030303030304e30303335393635464646464646253031')
            }
        },
        verifyOffsetIbmDukptDecode: {
            0: {
                request: bufferize('30303138475030303030'),
                response: {
                    macErrorCode: '00'
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
                    macMode: '',
                    macMethod: '',
                    bdk: 'UAADAFCC8551ADAB246EA1176FD691EDF',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    ksnDescriptor: 'A05',
                    ksn: 'FFFF0000010020000026',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    delimiter: '',
                    verificationPan: '',
                    pvki: '1',
                    pvv: '8156',
                    mac: '',
                    messageDataLengthBytes: '',
                    messageData: ''
                },
                response: bufferize('3030333147513055414144414643433835353141444142323436454131313736464436393145444655383041453346384436334230384639433133363532453534313644373645384441303546464646303030303031303032303030303032364136394639453736343639303442363830313534303030383930303030393138313536')
            },
            1: {
                request: {
                    mode: '0',
                    macMode: '',
                    macMethod: '',
                    bdk: 'UAADAFCC8551ADAB246EA1176FD691EDF',
                    pvk: 'U80AE3F8D63B08F9C13652E5416D76E8D',
                    ksnDescriptor: 'A05',
                    ksn: 'FFFF0000010020000026',
                    pinBlock: 'A69F9E7646904B68',
                    pinBlockFormat: '01',
                    pan: '540008900009',
                    delimiter: '',
                    verificationPan: '',
                    pvki: '1',
                    pvv: '8156',
                    mac: '',
                    messageDataLengthBytes: '',
                    messageData: '',
                    lmkIdentifier: '0'
                },
                response: bufferize('3030333147513055414144414643433835353141444142323436454131313736464436393145444655383041453346384436334230384639433133363532453534313644373645384441303546464646303030303031303032303030303032364136394639453736343639303442363830313534303030383930303030393138313536253030')
            },
            2: {
                request: {
                    mode: '0',
                    macMode: '',
                    macMethod: '',
                    bdk: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
                    pvk: 'S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C',
                    ksnDescriptor: 'A05',
                    ksn: 'FFFF000001315240003A',
                    pinBlock: '741311DA9D5D6C32',
                    pinBlockFormat: '01',
                    pan: '600000000000',
                    delimiter: '',
                    verificationPan: '',
                    pvki: '1',
                    pvv: '7547',
                    mac: '',
                    messageDataLengthBytes: '',
                    messageData: '',
                    lmkIdentifier: '01'
                },
                response: bufferize('303033314751305330303037324230544e3030453030303135363636373830373842353333373931354634383630433932463346463244364136423131453837383646323244433830333245423735385330303037325632544e30304530303031453830413239323634343343334146313142463033313743363639464130454130453130304142444639324246374133414632333244344341303546464646303030303031333135323430303033413734313331314441394435443643333230313630303030303030303030303137353437253031')
            }
        },
        verifyPvvDukptDecode: {
            0: {
                request: bufferize('3030333147523030'),
                response: {}
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
                    ksn: 'FFFF000001315240000F',
                    mac: '',
                    messageDataLengthBytes: 8,
                    messageData: 'ABCABCABCDEF8000'
                },
                response: bufferize('3030303247573431553939383035393033464443353633323430413131384445383844414530353336413035464646463030303030313331353234303030304630303038ABCABCABCDEF8000')
            },
            1: {
                request: {
                    macMode: '1',
                    macMethod: '1',
                    bdk: 'U99805903FDC563240A118DE88DAE0536',
                    ksnDescriptor: 'A05',
                    ksn: 'FFFF000001315240000F',
                    mac: '40BDD0ED6B9FBCBE',
                    messageDataLengthBytes: 8,
                    messageData: 'ABCABCABCDEF8000'
                },
                response: bufferize('303030324757313155393938303539303346444335363332343041313138444538384441453035333641303546464646303030303031333135323430303030463430424444304544364239464243424530303038ABCABCABCDEF8000')
            },
            2: {
                request: {
                    macMode: '4',
                    macMethod: '1',
                    bdk: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
                    ksnDescriptor: 'A05',
                    ksn: 'FFFF0000000000000000',
                    mac: '',
                    messageDataLengthBytes: '5',
                    messageData: 'ABCDEF1234',
                    messageDataFormat: 'hex',
                    paddingMethod: 'zero',
                    lmkIdentifier: '01'
                },
                response: bufferize('30303032475734315330303037324230544e303045303030313536363637383037384235333337393135463438363043393246334646324436413642313145383738364632324443383033324542373538413035464646463030303030303030303030303030303030303035abcdef1234253031')
            },
            3: {
                request: {
                    macMode: '1',
                    macMethod: '1',
                    bdk: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
                    ksnDescriptor: 'A05',
                    ksn: 'FFFF0000000000000000',
                    mac: '3E3DEE3DC52E53ED',
                    messageDataLengthBytes: '5',
                    messageData: 'ABCDEF1234',
                    messageDataFormat: 'hex',
                    paddingMethod: 'zero',
                    lmkIdentifier: '01'
                },
                response: bufferize('30303032475731315330303037324230544e30304530303031353636363738303738423533333739313546343836304339324633464632443641364231314538373836463232444338303332454237353841303546464646303030303030303030303030303030303345334445453344433532453533454430303035abcdef1234253031')
            }
        },
        generateVerifyMacDukptDecode: {
            0: {
                request: bufferize('303030304758303034304244443045443642394642434245'),
                response: {
                    mac: '40BDD0ED6B9FBCBE'
                }
            },
            1: {
                request: bufferize('3030303147583030'),
                response: {}
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
        },
        generateRandomPinEncode: {
            0: {
                request: {
                    checkLength: '6',
                    account: '540008900009',
                    lmkIdentifier: '01'
                },
                response: '303033334A413534303030383930303030393036253031'
            },
            1: {
                request: {
                    checkLength: '4',
                    account: '850103093936'
                },
                response: '303033334A413835303130333039333933363034'
            }
        },
        generateRandomPinDecode: {
            0: {
                request: bufferize('303030304A42303032363337323739'),
                response: {
                    pin: '2637279'
                }
            },
            1: {
                request: bufferize('303030304A423831'),
                response: 'payshield.generateRandomPin.81'
            }
        },
        generateRsaKeyPairEncode: {
            0: {
                request: {
                    keyTypeIndicator: '1',
                    delimiterKeyBlock: '',
                    keyVersionNumber: '',
                    optionalBlocksCount: '',
                    delimiterExport: '',
                    exportability: ''
                },
                response: '30303131454931323034383031'
            },
            1: {
                request: {
                    keyTypeIndicator: '1',
                    delimiterKeyBlock: '#',
                    keyVersionNumber: '00',
                    optionalBlocksCount: '00',
                    delimiterExport: '&',
                    exportability: 'N',
                    lmkIdentifier: '01'
                },
                response: '303031314549313230343830312530312330303030264E'
            }
        },
        generateRsaKeyPairDecode: {
            0: {
                request: bufferize('30303030454a30303082010902820100c5adcdf53da40d6ffa2ec2ad4854a0cdcd7aede1419727a62d1e2ef673fc2c669dc56bb9efdbbd824158e781c7cb6d4690f94d9391e105c6031b4c93b61c8dd659d62da43c36c34a94e22ce1fa4f0802d7c3f2fcc43e743a777bce8f6dffdf9545d016632d1f957731f0280cf47393923a9d9e3e296c1f05a50b417133df175303b50d7a01577305cfff22d25e8336b0a13fdf91d51a2242360f171425d3f6c0e5cac15d4846f6a3578a9bd1203e7818f5954cc0450cc97b369243067a10cbfa7b2b70f67929dd6b89a09e9ed8d54e03b5aba8f3424daa9abc22e137cea5ed3294ee24bfb4be43122fdbcaabfb79ecca7a5233676f47a26ccb96b0a8775201cd020301000130363536d6b338abf23095ed119571f6f6cb9c392fd8377ab50c759ab5c11ce73a6f28a4d6e27d237f593238f91226d1a2fc3682383cc597caedc330988d895a14cc342c34fcca85f9302e0ee44770894e0b4d92c4674521339e57703fdd8c0d2d8d3a533b35c24e0c0b2a44fc195966b1ee577cbe107cc3cc2d4109c0ccabf61986256fd25e110ab1a69baa586a8f741eabd39562c8040bafaae4649752f9d20e85d3869aa7cc39f369461d79674b94e48d395ef7299e01535002862b6834742e2f00fa87c6de61ec600626dc20e3c39807c92fab9df4a33a5dd7d54ba86633b825ae4565eb4c195db39445def1678970efc3998554ffb9bea5279b4c1eafa1f7ce963afb08bbe36924414c225629f145c3697d4489d526df88769853d546290b1afe3dcd9ca6191b6ec6641519e723680df416301b64f745c9432e8322ec2b08a1fdbf92806f38e1e1a2836cacd8813a57ccb678dcd488b3ad98cd698cebafa5b7b5b810d8dbdbbe9cfc2ba2349dc53c052221cf8bc326471658d1a3bf46a1c180ceca2a40ea41c06fbd646926d30d4d2167c57254757de6d30490cfa2e068a7b3d6541f128671fc269443900a23328bfa41e6ca950296bcccc67fb2ef3c3566137a876da974aedbe4164da53557c039204a6c9b2fba6fd7345caf60a78217fc3e0b296f2f2dcb09922f5bc896e3626d4f0e20f77ba70fe6695c3534ddfa9deed0d5bd688dc1cb0dc630894f42d8494b7e4cde4ad3ae01f7e268b1dd5b9d8340b511e2eceaf5307fa38fe3c0393a759f5943eab86e30a712a4a6f4b5b45764309ee99c801111e56f085ab2378e2250c7cdfdbe7b61b2fdf2f2daaba180605c862e3f0ef6ba89307a8e4af4ca293ba8a5d2315ece725f69fc64128834c4352454506eba4eb4b2ab155a727d68215e6485c95950'),
                response: {
                    privateKeyLength: '0656',
                    privateKey: '1rM4q/Iwle0RlXH29sucOS/YN3q1DHWatcEc5zpvKKTW4n0jf1kyOPkSJtGi/DaCODzFl8rtwzCYjYlaFMw0LDT8yoX5MC4O5EdwiU4LTZLEZ0UhM55XcD/djA0tjTpTOzXCTgwLKkT8GVlmse5XfL4QfMPMLUEJwMyr9hmGJW/SXhEKsaabqlhqj3Qeq9OVYsgEC6+q5GSXUvnSDoXThpqnzDnzaUYdeWdLlOSNOV73KZ4BU1AChitoNHQuLwD6h8beYexgBibcIOPDmAfJL6ud9KM6XdfVS6hmM7glrkVl60wZXbOURd7xZ4lw78OZhVT/ub6lJ5tMHq+h986WOvsIu+NpJEFMIlYp8UXDaX1EidUm34h2mFPVRikLGv49zZymGRtuxmQVGecjaA30FjAbZPdFyUMugyLsKwih/b+SgG844eGig2ys2IE6V8y2eNzUiLOtmM1pjOuvpbe1uBDY29u+nPwrojSdxTwFIiHPi8MmRxZY0aO/RqHBgM7KKkDqQcBvvWRpJtMNTSFnxXJUdX3m0wSQz6LgaKez1lQfEoZx/CaUQ5AKIzKL+kHmypUClrzMxn+y7zw1ZhN6h22pdK7b5BZNpTVXwDkgSmybL7pv1zRcr2Cnghf8Pgspby8tywmSL1vIluNibU8OIPd7pw/maVw1NN36ne7Q1b1ojcHLDcYwiU9C2ElLfkzeStOuAffiaLHdW52DQLUR4uzq9TB/o4/jwDk6dZ9ZQ+q4bjCnEqSm9LW0V2QwnumcgBER5W8IWrI3jiJQx839vnthsv3y8tqroYBgXIYuPw72uokweo5K9MopO6il0jFeznJfafxkEog0xDUkVFBuuk60sqsVWnJ9aCFeZIXJWVA=',
                    publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCQKCAQDFrc31PaQNb/ouwq1IVKDNzXrt4UGXJ6YtHi72c/wsZp3Fa7nv272C\nQVjngcfLbUaQ+U2TkeEFxgMbTJO2HI3WWdYtpDw2w0qU4izh+k8IAtfD8vzEPnQ6\nd3vOj23/35VF0BZjLR+VdzHwKAz0c5OSOp2ePilsHwWlC0FxM98XUwO1DXoBV3MF\nz/8i0l6DNrChP9+R1RoiQjYPFxQl0/bA5crBXUhG9qNXipvRID54GPWVTMBFDMl7\nNpJDBnoQy/p7K3D2eSnda4mgnp7Y1U4Dtauo80JNqpq8IuE3zqXtMpTuJL+0vkMS\nL9vKq/t57Mp6UjNnb0eibMuWsKh3UgHNAgMBAAE=\n-----END RSA PUBLIC KEY-----'
                }
            },
            1: {
                request: bufferize('30303030454a30303082010902820100c8a3cf272076cb665090bd6039b2807c7579f8f8c2a68687b3d441f33347ee678e304e017136f8653a3fe46f42a6ef5ca88dfb912e04bb35e50eef981a1668cfa4529255f1a47ffaf31e4f0815c53228aab3f86d9b92ff2b27d1b43642279a01a1253317df0f19b4e7e8e2caf1985ee6f64bc1112598948df6ceb380027b616423528495fe400fef8a4f1cc153070fa6294570ef7327ed84458bfb1aa844141bf8f5f384742ef3e7f85eec3fa11caf4e48d507c4cc0aa4fb4034319e419e18a4cdc61f110ab8f4667eeb4d551768d83f63c19cda0c4470a0fe286676a649fb4c54c357111c4ec9c8f89fd2ef071d01f9522b6874ab6949ea5832278b05e801f50203010001464646465330303638383033524430304e303030319ed4766f585dc60f8f4d1f2b59c8030d4855722ab15cf5792fe6a559eb2e14dd3560e1d2c346eb840c9d67badbf60c1407d16a0aedbcf5528aa03a3d1f771d184292391df43445c8d359fdd20c643775ef760f03753f591c1f42444ac60d12abe31854e810673cc4af7b0542408805af29bed5b74b917262b737270fc05818111502173cc1724f46ca4f1ae53e44f1c0e4928dad50389dbd51965ec2c4ccc4545e64b4c58fab5e8247bf15d791b476a62a763700432def28764ac23dd6f95ce6f596dbb6513d3ef8d03c691d24796f674809471c200ebbb7ec9c1d9237a6a24507edcc39c07425b71fdc8ba7033d89fcac93cc79a19eab2dc8d098a2d39dfdb2bd4268f2d66c0fa4a327c7db8a1935278a2511402c63189f1e996e01b8fbfb5862709b4e77b8f18d9f1ad9c88c52f5814d2ef3ca31c36efcfbd48ac3dd4ff14709eacf6ff94d6d667ef090958b06b5bf5a7b3dbb20b22eb8440b4f836464be011f1c4acc15d84112a5ab57d9fc1a40c4db1e207d4088c1f88f10350e93dc175f5fb150bab8ec5e8e2986a06fa69f1ec74c79b4a511d703e80e08f9eb9b399d67fdad97dc440f382f975dba2594f7218462d9588646d38b404a91bcd9614f34ec954f63eaf736fd6533c98891fab8b030f369dd445286ce15ccae133d4198dcd5b34b6c1877bb915b37665bdc64cbe8af6dac3829409ce69dac682ea2b0b2d365610fb771bd02a02020cffe2b779c2f48cb7011cedd8b7bf89c4da4bc159fbb341a392bc3499a5e8d82dd99144894afc797d9771296a32c87a4c2f565077ea579b60baa0c9c4cfe054f28e3534841356d016f7aa96aaf798b25a2d0c77d85af2a5b542650f3576c56a11fc32d427d8d5c421e28efd11b4ed1ba8637361eb0d98c915b92052b9a71f70f9125d5fb929085ab518651d629f2673333343043423442'),
                response: {
                    privateKeyLength: 'FFFF',
                    publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCQKCAQDIo88nIHbLZlCQvWA5soB8dXn4+MKmhoez1EHzM0fuZ44wTgFxNvhl\nOj/kb0Km71yojfuRLgS7NeUO75gaFmjPpFKSVfGkf/rzHk8IFcUyKKqz+G2bkv8r\nJ9G0NkInmgGhJTMX3w8ZtOfo4srxmF7m9kvBESWYlI32zrOAAnthZCNShJX+QA/v\nik8cwVMHD6YpRXDvcyfthEWL+xqoRBQb+PXzhHQu8+f4Xuw/oRyvTkjVB8TMCqT7\nQDQxnkGeGKTNxh8RCrj0Zn7rTVUXaNg/Y8Gc2gxEcKD+KGZ2pkn7TFTDVxEcTsnI\n+J/S7wcdAflSK2h0q2lJ6lgyJ4sF6AH1AgMBAAE=\n-----END RSA PUBLIC KEY-----',
                    privateKey: 'UzAwNjg4MDNSRDAwTjAwMDGe1HZvWF3GD49NHytZyAMNSFVyKrFc9Xkv5qVZ6y4U3TVg4dLDRuuEDJ1nutv2DBQH0WoK7bz1UoqgOj0fdx0YQpI5HfQ0RcjTWf3SDGQ3de92DwN1P1kcH0JESsYNEqvjGFToEGc8xK97BUJAiAWvKb7Vt0uRcmK3NycPwFgYERUCFzzBck9Gyk8a5T5E8cDkko2tUDidvVGWXsLEzMRUXmS0xY+rXoJHvxXXkbR2pip2NwBDLe8odkrCPdb5XOb1ltu2UT0++NA8aR0keW9nSAlHHCAOu7fsnB2SN6aiRQftzDnAdCW3H9yLpwM9ifysk8x5oZ6rLcjQmKLTnf2yvUJo8tZsD6SjJ8fbihk1J4olEUAsYxifHpluAbj7+1hicJtOd7jxjZ8a2ciMUvWBTS7zyjHDbvz71IrD3U/xRwnqz2/5TW1mfvCQlYsGtb9aez27ILIuuEQLT4NkZL4BHxxKzBXYQRKlq1fZ/BpAxNseIH1AiMH4jxA1DpPcF19fsVC6uOxejimGoG+mnx7HTHm0pRHXA+gOCPnrmzmdZ/2tl9xEDzgvl126JZT3IYRi2ViGRtOLQEqRvNlhTzTslU9j6vc2/WUzyYiR+riwMPNp3URShs4VzK4TPUGY3NWzS2wYd7uRWzdmW9xky+ivbaw4KUCc5p2saC6isLLTZWEPt3G9AqAgIM/+K3ecL0jLcBHO3Yt7+JxNpLwVn7s0Gjkrw0maXo2C3ZkUSJSvx5fZdxKWoyyHpML1ZQd+pXm2C6oMnEz+BU8o41NIQTVtAW96qWqveYslotDHfYWvKltUJlDzV2xWoR/DLUJ9jVxCHijv0RtO0bqGNzYesNmMkVuSBSuacfcPkSXV+5KQhatRhlHWKfJnMzM0MENCNEI='
                }
            },
            2: {
                request: bufferize('30303030454a3135'),
                response: 'payshield.generateRsaKeyPair.15'
            }
        },
        generateRsaSignatureEncode: {
            0: {
                request: {
                    hashIdentifier: '06',
                    signatureIdentifier: '01',
                    padModeIdentifier: '01',
                    messageDataLength: 3,
                    messageData: 'ABCBAB',
                    privateKeyFlag: '99',
                    privateKeyLength: '0656',
                    privateKeyBytes: 656,
                    privateKey: bufferize('98c828a8f632a797b75abacb0c160658cfc4dbca3919cbf60844b8781f4bc0bbcd6a7ef68051d7e86660e7db0a3425b9a9df502882e7b63139dadd91ab65439086a959cfa67ad4bb4c6197d6b1088e579822d03cd187b835b3f4ef3ad53e405616a8e19ee1d6c62a765aeb82691243f4bc5520404b5256e2b335c5bb7a4a287cca2e7679c799538bea754e32d0e883e62c667fcd164161abecc5bdedc268c9e8dad22dd93837458a944b5e0b48224746f8451ddf7d78ea310dd75c7137b1c69f235ae84742cb447ff411bbf07487143e90d32a6447631ff53212d10b528015be442af2b9998c9b17b37cd8d4cf5c98d59c43f1d8f15b71458cdeb3b6438827838d2a5d4297a2b94a27100fa495a42f24fe790457946b5203dc422f90927e78cd9276fad58f4ad7f175c21d74dd01274e4839cb5b7d3e338ea1c5b52079bd8966c8e7cb2e9e3d9de7581f1b77d91282e6805765409494204220c08bfcbc26bd48cb3b129ad0b149262ae337fb45608af378304a349c428226ade7cc9ec7fbbeada049e059229aae10616cb293ecd9d6e752dc79e185ac85893192131f4dedc4dc98bc68a74db92d39beb0c917d64de742f8a4de55a2187bc1fc114aeb78133857f2b505e6111edf54c03b98b8857ac11a936c298b1ecc42a70f6da5152f3614fb48b840211d727ff22c75583861bf98de3776f7c189c0b7532e6a9f54c3ef71f982db16a9dc6b1d6158660394999fb892191443cb5e52f7cbc71955494fbf9ea557d2fd4b525f0e7ab4629087319d9bc7599b3396d96d5c12adb508ad8efc1867fb847984736fef219b4379f398c2a5acdc806a381320b0cbad19bf8edf2def3aa2c978665e70d4353d45cdb82ca746c6230e133c27b50bcb47889e3e7be993a8a163d84c9a8c2fd36225889ce9f2302c')
                },
                response: '30303131455730363031303130303033ABCBAB3B39393036353698C828A8F632A797B75ABACB0C160658CFC4DBCA3919CBF60844B8781F4BC0BBCD6A7EF68051D7E86660E7DB0A3425B9A9DF502882E7B63139DADD91AB65439086A959CFA67AD4BB4C6197D6B1088E579822D03CD187B835B3F4EF3AD53E405616A8E19EE1D6C62A765AEB82691243F4BC5520404B5256E2B335C5BB7A4A287CCA2E7679C799538BEA754E32D0E883E62C667FCD164161ABECC5BDEDC268C9E8DAD22DD93837458A944B5E0B48224746F8451DDF7D78EA310DD75C7137B1C69F235AE84742CB447FF411BBF07487143E90D32A6447631FF53212D10B528015BE442AF2B9998C9B17B37CD8D4CF5C98D59C43F1D8F15B71458CDEB3B6438827838D2A5D4297A2B94A27100FA495A42F24FE790457946B5203DC422F90927E78CD9276FAD58F4AD7F175C21D74DD01274E4839CB5B7D3E338EA1C5B52079BD8966C8E7CB2E9E3D9DE7581F1B77D91282E6805765409494204220C08BFCBC26BD48CB3B129AD0B149262AE337FB45608AF378304A349C428226ADE7CC9EC7FBBEADA049E059229AAE10616CB293ECD9D6E752DC79E185AC85893192131F4DEDC4DC98BC68A74DB92D39BEB0C917D64DE742F8A4DE55A2187BC1FC114AEB78133857F2B505E6111EDF54C03B98B8857AC11A936C298B1ECC42A70F6DA5152F3614FB48B840211D727FF22C75583861BF98DE3776F7C189C0B7532E6A9F54C3EF71F982DB16A9DC6B1D6158660394999FB892191443CB5E52F7CBC71955494FBF9EA557D2FD4B525F0E7AB4629087319D9BC7599B3396D96D5C12ADB508AD8EFC1867FB847984736FEF219B4379F398C2A5ACDC806A381320B0CBAD19BF8EDF2DEF3AA2C978665E70D4353D45CDB82CA746C6230E133C27B50BCB47889E3E7BE993A8A163D84C9A8C2FD36225889CE9F2302C'
            },
            1: {
                request: {
                    hashIdentifier: '06',
                    signatureIdentifier: '01',
                    padModeIdentifier: '01',
                    messageDataLength: 3,
                    messageData: 'ABCBAB',
                    privateKeyFlag: '99',
                    privateKeyLength: 'FFFF',
                    privateKeyBytes: 689,
                    privateKey: bufferize('5330303638383033525330304e303030313ac87969d7e482af3aa0b3c498e3737b70ce36c492e0516e30dc26412c1eafc906d8a3ffd2c517bf17ac5e21383135508d44eff7a63f5e5196f5e1849ef7c3766549f4fedf676c0e00437739e3f02fb6d836c792bc1f16225faef6d022b58e94ceede91e30015373b02db3d604f56162488c07f93bf1327ff2641ab248b487ab8e4858c8d31555f5d1d1de819f3a4101e7463e91cac157e5bb56494bdc9579dafce4ae457877359045a847e79a0fc06692b2e234bc49c64507de54d8d587a042a8476b154287f86bba3cfc035fd31e881e9f04517b7faa8567cfa68fece7a6f94506f23aaec3d6bf7438f83819eadd12df80b23b8db257ec89dbe1a63d29f2b5ff6bf6a656aad6ff21a2a9a121392750cd46e44d023d5db5cdad090f2fa922205c2f0c4c30676125dec5b86af8d728f32495dda2cb69b209f63b57ead1e8cde0c4e104ef03cbb8adb9d526a5acaad64c8e0de39e1e0801934f3553bbcac378b6946d2ad2f570a9182421c32e20cfdc338501fbf06d1ee09b17e380efb11fd9e4e5c326e332d5772cf7396b625ec4b3a8637529897997c0b395b6cced8a0091cd5c78bf9c285b30aee7a0bc1f16e0c083a32fe423211119ceae0a957b02fb61b4874041e483f18828bd7229b300d4fdc05fbe1fb9eed7d6f701a6deac10e7bbf2e811fa1f30c735ac8e1cb4263a904f649d3dc86cda5dbdedeef4da46fce6e486a318f38dba3ab57ff1afdcd83987f785b060ca543e5e4bcb0623fba8b32ceb928385f751c49d06cbefaa317995e69376f1d5e80dc06b46e86b34e7138073b1143cc3832e732b82cbc68a8076687d8c8953317024486364de2ad86246927f099c7c55f2e031b505f053a9d9609ee4b8ed0ac14d581d9343be30cc64628eb9af1e6d750d1ee66dbab2ee5488cd9b8dcba773eabc8ec99d40cf3736343833313043'),
                    lmkIdentifier: 1
                },
                response: '30303131455730363031303130303033ABCBAB3B3939464646465330303638383033525330304E303030313AC87969D7E482AF3AA0B3C498E3737B70CE36C492E0516E30DC26412C1EAFC906D8A3FFD2C517BF17AC5E21383135508D44EFF7A63F5E5196F5E1849EF7C3766549F4FEDF676C0E00437739E3F02FB6D836C792BC1F16225FAEF6D022B58E94CEEDE91E30015373B02DB3D604F56162488C07F93BF1327FF2641AB248B487AB8E4858C8D31555F5D1D1DE819F3A4101E7463E91CAC157E5BB56494BDC9579DAFCE4AE457877359045A847E79A0FC06692B2E234BC49C64507DE54D8D587A042A8476B154287F86BBA3CFC035FD31E881E9F04517B7FAA8567CFA68FECE7A6F94506F23AAEC3D6BF7438F83819EADD12DF80B23B8DB257EC89DBE1A63D29F2B5FF6BF6A656AAD6FF21A2A9A121392750CD46E44D023D5DB5CDAD090F2FA922205C2F0C4C30676125DEC5B86AF8D728F32495DDA2CB69B209F63B57EAD1E8CDE0C4E104EF03CBB8ADB9D526A5ACAAD64C8E0DE39E1E0801934F3553BBCAC378B6946D2AD2F570A9182421C32E20CFDC338501FBF06D1EE09B17E380EFB11FD9E4E5C326E332D5772CF7396B625EC4B3A8637529897997C0B395B6CCED8A0091CD5C78BF9C285B30AEE7A0BC1F16E0C083A32FE423211119CEAE0A957B02FB61B4874041E483F18828BD7229B300D4FDC05FBE1FB9EED7D6F701A6DEAC10E7BBF2E811FA1F30C735AC8E1CB4263A904F649D3DC86CDA5DBDEDEEF4DA46FCE6E486A318F38DBA3AB57FF1AFDCD83987F785B060CA543E5E4BCB0623FBA8B32CEB928385F751C49D06CBEFAA317995E69376F1D5E80DC06B46E86B34E7138073B1143CC3832E732B82CBC68A8076687D8C8953317024486364DE2AD86246927F099C7C55F2E031B505F053A9D9609EE4B8ED0AC14D581D9343BE30CC64628EB9AF1E6D750D1EE66DBAB2EE5488CD9B8DCBA773EABC8EC99D40CF3736343833313043253031'
            }
        },
        generateRsaSignatureDecode: {
            0: {
                request: bufferize('30303030455830303032353697ac220f08073f9c6fea200303ca5296d75e16fcb94e4cba16a41e33a462ee248ced315b4e73daa04ac70201e8804e04d9dfe434489dcde880da8c2d849b1dc87a74b289df6a33d1b56b40f861367755f113b6c3bd399c6c691f25287c25ced798367c59c319c11f816df2536a88653464f42749c93d43f6537cea224d07786c97879ebf64898aabcc009301835ae07c673c6bd0cde15c8e38a8524dfde8be22ffc581b823271257b823363f0f0c85b2991616e88edade95954ec6744c036d996328cf248766834e3e5710b5363cec8c40069c3ac9d2ad99462ad55454e2605d54a11be46bb5f7b5841427cae179ffe1aab26cd3d202a657880983f6dd426f0b'),
                response: {
                    errorCode: '00',
                    signatureLength: '0256',
                    signature: '97ac220f08073f9c6fea200303ca5296d75e16fcb94e4cba16a41e33a462ee248ced315b4e73daa04ac70201e8804e04d9dfe434489dcde880da8c2d849b1dc87a74b289df6a33d1b56b40f861367755f113b6c3bd399c6c691f25287c25ced798367c59c319c11f816df2536a88653464f42749c93d43f6537cea224d07786c97879ebf64898aabcc009301835ae07c673c6bd0cde15c8e38a8524dfde8be22ffc581b823271257b823363f0f0c85b2991616e88edade95954ec6744c036d996328cf248766834e3e5710b5363cec8c40069c3ac9d2ad99462ad55454e2605d54a11be46bb5f7b5841427cae179ffe1aab26cd3d202a657880983f6dd426f0b'
                }
            },
            1: {
                request: bufferize('3030303045583738'),
                response: 'payshield.generateRsaSignature.78'
            }
        }
    }
};
