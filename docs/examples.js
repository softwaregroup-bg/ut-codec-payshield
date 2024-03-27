// eslint-disable no-undef
const hsmGenerateKey = () => {};
const hsmExportKey = () => {};
const hsmImportKey = () => {};
const hsmGenerateKeyCheckValue = () => {};
const hsmGenerateCvv = () => {};
const hsmVerifyCvv = () => {};
const hsmGenerateMac = () => {};
const hsmVerifyMac = () => {};
const hsmTranslateKeyLmkLmkBulk = () => {};
const generateRandomPin = () => {};
const translatePinLmkZpk = () => {};
const translatePinZpkLmk = () => {};
const translatePinZpkZpk = () => {};
const generatePvvLmk = () => {};
const verifyInterPinPvv = () => {};
const generatePvv = () => {};
const verifyPinGeneratePvv = () => {};
const generateOffsetIbm = () => {};
const generateOffsetIbmLmk = () => {};
const verifyPinGenerateOffset = () => {};
const verifyInterPinIbm = () => {};
const derivePinIbm = () => {};
const generateVerifyMacDukpt = () => {};
const generateArqc = () => {};
const encryptDataBlock = () => {};
const decryptDataBlock = () => {};
const translateDataBlock = () => {};
const generateRsaKeyPair = () => {};
const verifyTermPinIbm = () => {};
const verifyTermPinPvv = () => {};
const translatePinTpkLmk = () => {};
const translatePinTpkZpkBdk = () => {};
const translatePinBdkBdkZpk = () => {};
const verifyOffsetIbmDukpt = () => {};
const verifyPvvDukpt = () => {};

await hsmGenerateKey({
    mode: '0',
    keyType: 'FFF',
    keySchemeLmk: 'S',
    lmkIdentifier: '01',
    keyUsage: 'K0',
    algorithm: 'T2',
    modeOfUse: 'B',
    keyVersionNumber: '00',
    exportability: 'E'
});
// TMK: S00072K0TB00E00019A75CB10B9C1359CFA732D39217C3667207E279FC9E845F64FEEE9F0; 116D94
// ZMK-1: S00072K0TB00E0001DB045F29C053EEFF7B9425B3A88C7258EB7EA7E40E2C47878647072A; 2356F2
// TPK: S00072P0TB00E0001286A5156C05A48688C0820BE76872301EBC40F6F0452B2611331D8F7; 93DAB7
// TAK: S00072M1TN00E0001FFE01E95CF21BDD0D74B6BEB70E3D90842C137DCA39C1B162C6238D5; F808C2
// ZPK-1: S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9; 4FE9FD
// ZPK-1 under ZMK-1: S00072P0TB00N00FFE1D89671C973C7F0DAF91CB2EBF379493C08975679001172C89A0AF8; 4FE9FD
// ZPK-2: S00072P0TB00E00010D869FE84C1F77AE64E0019151533363D4CCE7E1C3F89F3D86115EE8; 456B7D
// ZPK-3: S0007272TN00E0001DE16F028F38CC385436D8E5B3DD4341F3E55379FBCB39710FE2BB6B4; 4D66A4
// MK-AC: S00072E0TN00E00017772090F5BDE6568F9B0EFDADD1D160CDB1655DE1984F00973EC3596; 5E7AF8
// PVK generic: S00072V0TN00E000123721C789734ADC94BBA5A97A7926D5BAFA19AFC35D1D3126BD38F85; 210B96
// PVK IBM3624: S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22; 31540C
// PVK Visa PVV: S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C; AAB664
// CVK: S00072C0TN00E0001A417975993E2331918759DD1656AC94306BE01C19FDE29E83A93AB42; EC7A50
// BDK1-1: S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758; 97795F
// BDK1-2: S00072B0TN00E0001134E8D68D46BC8356F84F598155A1B5C44199D9847A2A58B64BE091F; 55771A
// DTAB: 0123456789012345 -> 709F26B22464E96A
// DTAB: 1234567890123456 -> C9DF59A67019D387

await hsmGenerateKey({
    mode: '1',
    keyType: 'FFF',
    keySchemeLmk: 'S',
    keyZmkTmkFlag: '0',
    keyZmkTmk: 'S00072K0TB00E00017CECF0FB9210B3CC93B9FFB304963C39CFFF94B837D318E1A6F1F058',
    keySchemeZmkTmk: 'S',
    lmkIdentifier: '01',
    keyUsage: 'K0',
    algorithm: 'T2',
    modeOfUse: 'B',
    keyVersionNumber: '00',
    exportability: 'E'
});

await hsmExportKey({
    keyType: 'FFF',
    zmk: 'S00072K0TB00E0001DB045F29C053EEFF7B9425B3A88C7258EB7EA7E40E2C47878647072A',
    key: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
    keyScheme: 'S',
    lmkIdentifier: '01'
});

await hsmImportKey({
    keyType: 'FFF',
    zmk: 'S00072K0TB00E0001DB045F29C053EEFF7B9425B3A88C7258EB7EA7E40E2C47878647072A',
    key: 'S00072P0TB00N00FFE1D89671C973C7F0DAF91CB2EBF379493C08975679001172C89A0AF8',
    keyScheme: 'S',
    lmkIdentifier: '01'
});

await hsmGenerateKeyCheckValue({
    keyTypeCode: 'FF',
    key: 'S00072K0TB00E0001DB045F29C053EEFF7B9425B3A88C7258EB7EA7E40E2C47878647072A',
    keyType: 'FFF',
    kcvType: '6',
    lmkIdentifier: '01'
});

await hsmGenerateCvv({
    cvk: 'S00072C0TN00E0001A417975993E2331918759DD1656AC94306BE01C19FDE29E83A93AB42',
    cardNumber: '502265400089000092',
    expirationDate: '2010',
    serviceCode: '620',
    type: 'cvv1'
});

await hsmVerifyCvv({
    cvk: 'S00072C0TN00E0001A417975993E2331918759DD1656AC94306BE01C19FDE29E83A93AB42',
    cardNumber: '502265400089000092',
    expirationDate: '2010',
    serviceCode: '620',
    type: 'cvv1',
    cvv: '181'
});

await hsmGenerateMac({
    modeFlag: '0',
    inputFormatFlag: 'hex',
    macSize: '0',
    macAlgorithm: '1',
    paddingMethod: '1',
    keyType: 'FFF',
    key: 'S00072M1TN00E0001FFE01E95CF21BDD0D74B6BEB70E3D90842C137DCA39C1B162C6238D5',
    iv: '',
    messageData: 'ABCDEF12',
    lmkIdentifier: '01'
});

await hsmVerifyMac({
    modeFlag: '0',
    inputFormatFlag: 'hex',
    macSize: '0',
    macAlgorithm: '1',
    paddingMethod: '1',
    keyType: 'FFF',
    key: 'S00072M1TN00E0001FFE01E95CF21BDD0D74B6BEB70E3D90842C137DCA39C1B162C6238D5',
    iv: '',
    messageData: 'ABCDEF12',
    mac: 'F9369211',
    lmkIdentifier: '01'
});

await hsmTranslateKeyLmkLmkBulk([{
    id: 1,
    mode: 'translate',
    key: 'S00072M1TN00E0001FFE01E95CF21BDD0D74B6BEB70E3D90842C137DCA39C1B162C6238D5',
    keyType: 'FFF',
    lmkIdentifier: '01'
}]);

await generateRandomPin({
    checkLength: '06',
    account: '540008900009',
    lmkIdentifier: '01'
});
// {pin: '8240528'}

await generateRandomPin({
    checkLength: '06',
    account: '850103093936',
    lmkIdentifier: '01'
});
// {pin: '0258743'}
// {pin: '0676280'}

await translatePinLmkZpk({
    zpk: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
    pinBlockFormat: '01',
    pan: '850103093936',
    pin: '0258743',
    delimiter: '',
    lmkIdentifier: '01'
});
// {pinBlock: 'AD72F973446E84E7'}
await translatePinLmkZpk({
    zpk: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
    pinBlockFormat: '01',
    pan: '850103093936',
    pin: '0676280',
    delimiter: '',
    lmkIdentifier: '01'
});
// {pinBlock: '967CDB6E3D492E28'}

await translatePinZpkLmk({
    zpk: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
    pinBlock: 'AD72F973446E84E7',
    pinBlockFormat: '01',
    pan: '850103093936',
    delimiter: '',
    lmkIdentifier: '01'
});
// {pin: '0258743'}

await translatePinZpkZpk({
    sourceZpk: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
    destinationZpk: 'S00072P0TB00E00010D869FE84C1F77AE64E0019151533363D4CCE7E1C3F89F3D86115EE8',
    maximumPinLength: '12',
    sourcePinBlock: 'AD72F973446E84E7',
    sourcePinBlockFormat: '01',
    destinationPinBlockFormat: '01',
    pan: '850103093936',
    lmkIdentifier: '01'
});
// checkLength: '06'
// pinBlock: 'E614D4AFD47BD3BF'
// pinBlockFormat: '01'

await generatePvvLmk({
    pvk: 'S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C',
    pin: '0258743',
    account: '850103093936',
    pvki: '1',
    lmkIdentifier: '01'
});
// pvv: '7548'

await verifyInterPinPvv({
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
});

await generatePvv({
    keyType: 'FFF',
    key: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
    pvk: 'S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C',
    pinBlock: 'AD72F973446E84E7',
    pinBlockFormat: '01',
    pan: '850103093936',
    pvki: '1',
    lmkIdentifier: '01'
});
// {pvv: '7548'}

await verifyPinGeneratePvv({
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
});
// {pvv: '6010'}

await generateOffsetIbm({
    keyType: 'FFF',
    key: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
    pinBlock: '967CDB6E3D492E28',
    pinBlockFormat: '01',
    checkLength: '06',
    pan: '850103093936',
    decimalisationTable: '709F26B22464E96A',
    pinValidationData: '50103093936N',
    lmkIdentifier: '01'
});
// {offset: '309783FFFFFF'}

await generateOffsetIbmLmk({
    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
    pin: '0258743',
    checkLength: '06',
    account: '850103093936',
    decimalisationTable: '709F26B22464E96A',
    pinValidationData: '50103093936N',
    lmkIdentifier: '01'
});
// {offset: '588664FFFFFF'}

await verifyPinGenerateOffset({
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
});
// {offset: '309783FFFFFF'}

await verifyInterPinIbm({
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
});

await derivePinIbm({
    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
    offset: '309783FFFFFF',
    checkLength: '06',
    account: '850103093936',
    decimalisationTable: '709F26B22464E96A',
    pinValidationData: '50103093936N',
    lmkIdentifier: '01'
});
// {pin: '0676280'}

await generateVerifyMacDukpt({
    macMode: '4',
    macMethod: '1',
    bdk: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
    ksnDescriptor: 'A05',
    ksn: 'FFFF0000000000000000',
    mac: '',
    messageData: 'ABCDEF1234',
    messageDataFormat: 'hex',
    paddingMethod: 'zero',
    lmkIdentifier: '01'
});
// {mac: '3E3DEE3DC52E53ED'}

await generateVerifyMacDukpt({
    macMode: '1',
    macMethod: '1',
    bdk: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
    ksnDescriptor: 'A05',
    ksn: 'FFFF0000000000000000',
    mac: '3E3DEE3DC52E53ED',
    messageData: 'ABCDEF1234',
    messageDataFormat: 'hex',
    paddingMethod: 'zero',
    lmkIdentifier: '01'
});

await generateArqc({
    cryptogramMethodName: 'KQ', // v3
    modeFlag: 0,
    schemeId: 0,
    mkac: 'S00072E0TN00S00012574E37226ADAA76E5B8F2C4F14AD34F1F054EF52CB56BE2F4D03BEA',
    panSeqNo: '12345600000000000001',
    atc: '7400',
    unpredictableNumber: 'C2C6A091',
    transactionData: '00000000000000000000000009780000000000097820121431C2C6A0915800740003A00000',
    arqc: '46E98E9B85E9C640',
    paddingMethod: 'zero',
    arc: '3030',
    lmkIdentifier: '01'
});

await generateArqc({
    cryptogramMethodName: 'KQ', // v3
    modeFlag: 1,
    schemeId: 0,
    mkac: 'S00072E0TN00S00012574E37226ADAA76E5B8F2C4F14AD34F1F054EF52CB56BE2F4D03BEA',
    panSeqNo: '12345600000000000001',
    atc: '7400',
    unpredictableNumber: 'C2C6A091',
    transactionData: '00000000000000000000000009780000000000097820121431C2C6A0915800740003A00000000000',
    arqc: '46E98E9B85E9C640',
    paddingMethod: 'zero',
    arc: '3030',
    lmkIdentifier: '01'
});
// {arpc: 'B7C0556F15D1F17C'}

await generateArqc({
    cryptogramMethodName: 'KW', // v4
    modeFlag: 0,
    schemeId: 0,
    mkac: 'S00072E0TN00S00012574E37226ADAA76E5B8F2C4F14AD34F1F054EF52CB56BE2F4D03BEA',
    ivac: '00000000000000000000000000000000',
    branchHeightParams: '1',
    transactionData: '000000000000000000000000097800000000000978201214313C4658455800000103A00000',
    panSeqNo: '12345600000000000001',
    atc: '0001',
    unpredictableNumber: '3C465845',
    arqc: '897FE51A726DFE47',
    paddingMethod: 'zero',
    lmkIdentifier: '01'
});

await encryptDataBlock({
    modeFlag: '00',
    inputFormatFlag: 'hex',
    outputFormatFlag: 'hex',
    keyType: 'FFF',
    key: 'S00072D0TN00E0001BD79343066F46B9C1279E2DE4382E56E6DD5BDCE0F850C7E444799D9',
    messageData: 'ABCDEF1234567890',
    lmkIdentifier: '01'
});
// {encrypted: '6DD932DE48520285', messageLength: 16}

await decryptDataBlock({
    modeFlag: '00',
    inputFormatFlag: 'hex',
    outputFormatFlag: 'hex',
    keyType: 'FFF',
    key: 'S00072D0TN00E0001BD79343066F46B9C1279E2DE4382E56E6DD5BDCE0F850C7E444799D9',
    messageData: '6DD932DE48520285',
    lmkIdentifier: '01'
});

await translateDataBlock({
    sourceModeFlag: '00',
    destinationModeFlag: '00',
    inputFormatFlag: 'hex',
    outputFormatFlag: 'hex',
    sourceKeyType: 'FFF',
    sourceKey: 'S00072D0TN00E0001BD79343066F46B9C1279E2DE4382E56E6DD5BDCE0F850C7E444799D9',
    destinationKeyType: 'FFF',
    destinationKey: 'S00072D0TN00E00010EA718005998326E187E742CF400E5698F5E55E2A0A25A5FD9C5EDDE',
    messageData: '6DD932DE48520285',
    lmkIdentifier: '01'
});
// {encrypted: '1D8F38CC40C6F20D', messageDataLength: 16}

await generateRsaKeyPair({
    keyTypeIndicator: '0',
    lmkIdentifier: '01',
    keyVersionNumber: '00'
});
// {
//     privateKeyLength: 'FFFF',
//     publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCQKCAQC7bNRs9Nfj78Bnu3CO6phUk9UMFFOHD6Xv9X+3l6MxY5wMGaWhC+uz\nkFJDar3vX8qBshMCVEaNKqHqnytvbQKCz//bNjvyTX8gAoZfOPiXpcOUL8Fi/jjG\nkhDhSeKkmDIMIVzbEdFSrYTnjr34/Ru+EU6cHTOwdT1yCy7UFdubw8NwEoyizgUD\n2Ke/JORLi9piYCxRu/q167P/sGezua1XkcfAgV49TXoDY7tlCJGgZk48jntXNgCK\nLBb01RfI9XMsHTJLoLiQlzL4aXtZd+J3163tma53PW0Yw299VCPshZtNmd5q3R5S\nq1d8W9lUvDIcj+4LkPKDoDxNZ0+UEt0hAgMBAAE=\n-----END RSA PUBLIC KEY-----',
//     privateKey: 'UzAwNjg4MDNSUzAwTjAwMDE6yHlp1+SCrzqgs8SY43N7cM42xJLgUW4w3CZBLB6vyQbYo//SxRe/F6xeITgxNVCNRO/3pj9eUZb14YSe98N2ZUn0/t9nbA4AQ3c54/Avttg2x5K8HxYiX6720CK1jpTO7ekeMAFTc7Ats9YE9WFiSIwH+TvxMn/yZBqySLSHq45IWMjTFVX10dHegZ86QQHnRj6RysFX5btWSUvclXna/OSuRXh3NZBFqEfnmg/AZpKy4jS8ScZFB95U2NWHoEKoR2sVQof4a7o8/ANf0x6IHp8EUXt/qoVnz6aP7Oem+UUG8jquw9a/dDj4OBnq3RLfgLI7jbJX7Inb4aY9KfK1/2v2plaq1v8hoqmhITknUM1G5E0CPV21za0JDy+pIiBcLwxMMGdhJd7FuGr41yjzJJXdostpsgn2O1fq0ejN4MThBO8Dy7itudUmpayq1kyODeOeHggBk081U7vKw3i2lG0q0vVwqRgkIcMuIM/cM4UB+/BtHuCbF+OA77Ef2eTlwybjMtV3LPc5a2JexLOoY3UpiXmXwLOVtsztigCRzVx4v5woWzCu56C8HxbgwIOjL+QjIREZzq4KlXsC+2G0h0BB5IPxiCi9cimzANT9wF++H7nu19b3AaberBDnu/LoEfofMMc1rI4ctCY6kE9knT3IbNpdve3u9NpG/ObkhqMY8426OrV/8a/c2DmH94WwYMpUPl5LywYj+6izLOuSg4X3UcSdBsvvqjF5leaTdvHV6A3Aa0boazTnE4BzsRQ8w4MucyuCy8aKgHZofYyJUzFwJEhjZN4q2GJGkn8JnHxV8uAxtQXwU6nZYJ7kuO0KwU1YHZNDvjDMZGKOua8ebXUNHuZturLuVIjNm43Lp3PqvI7JnUDPNzY0ODMxMEM='
// }

await generateRsaSignature({
    hashId: 'SHA256',
    privateKey: 'UzAwNjg4MDNSUzAwTjAwMDE6yHlp1+SCrzqgs8SY43N7cM42xJLgUW4w3CZBLB6vyQbYo//SxRe/F6xeITgxNVCNRO/3pj9eUZb14YSe98N2ZUn0/t9nbA4AQ3c54/Avttg2x5K8HxYiX6720CK1jpTO7ekeMAFTc7Ats9YE9WFiSIwH+TvxMn/yZBqySLSHq45IWMjTFVX10dHegZ86QQHnRj6RysFX5btWSUvclXna/OSuRXh3NZBFqEfnmg/AZpKy4jS8ScZFB95U2NWHoEKoR2sVQof4a7o8/ANf0x6IHp8EUXt/qoVnz6aP7Oem+UUG8jquw9a/dDj4OBnq3RLfgLI7jbJX7Inb4aY9KfK1/2v2plaq1v8hoqmhITknUM1G5E0CPV21za0JDy+pIiBcLwxMMGdhJd7FuGr41yjzJJXdostpsgn2O1fq0ejN4MThBO8Dy7itudUmpayq1kyODeOeHggBk081U7vKw3i2lG0q0vVwqRgkIcMuIM/cM4UB+/BtHuCbF+OA77Ef2eTlwybjMtV3LPc5a2JexLOoY3UpiXmXwLOVtsztigCRzVx4v5woWzCu56C8HxbgwIOjL+QjIREZzq4KlXsC+2G0h0BB5IPxiCi9cimzANT9wF++H7nu19b3AaberBDnu/LoEfofMMc1rI4ctCY6kE9knT3IbNpdve3u9NpG/ObkhqMY8426OrV/8a/c2DmH94WwYMpUPl5LywYj+6izLOuSg4X3UcSdBsvvqjF5leaTdvHV6A3Aa0boazTnE4BzsRQ8w4MucyuCy8aKgHZofYyJUzFwJEhjZN4q2GJGkn8JnHxV8uAxtQXwU6nZYJ7kuO0KwU1YHZNDvjDMZGKOua8ebXUNHuZturLuVIjNm43Lp3PqvI7JnUDPNzY0ODMxMEM=',
    privateKeyLength: 'FFFF',
    messageData: 'ABCBAB',
    encoding: 'hex',
    lmkIdentifier: '01'
});
// {signature: '06552b758c8b52e1e16472f7ee717496a38b7c1ca6f9829c1eee5289fd6d773c507166421320f2954b449de2e10af31cd6029f30d47a3e5bc7ca2ab1dddc3860e6abcc88ac1d2142f4a1855cd6331be38acfd25fb71ed513cbae834b3fe760ba3ab077606fdaac8dc8039d3dc70dfe51e9bb5022b4612085eaa2aba0b96e036f1b4a656324715684b957b1b3dada7319e30f6a8ff09c9c6b8188fd4f430e472bb29b87aee5c96a3b93dcba7e8a5be108d211c3899719c0d23512824d23ba04df287c49c82b9b2657360916f6b493862f433f17dabd9cde0e989a4e7e56096faaf1c50c2aa9b228664cc94ff0de003ce99e9855ec20e45c6f1c662cdb29691b1b'}

await verifyTermPinIbm({
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
});

await verifyTermPinPvv({
    tpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
    pvk: 'S00072V2TN00E00014C0328F82856C4E6D7CCF7A9A1597CB0662C35A18CC72EB9CF97917C',
    pinBlock: 'E57BC634D4717907',
    pinBlockFormat: '01',
    pan: '600000000000',
    pvki: '1',
    pvv: '2194'
});

await translatePinTpkLmk({
    tpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
    pinBlock: 'E57BC634D4717907',
    pinBlockFormat: '01',
    pan: '600000000000',
    lmkIdentifier: '01'
});
// pin: '4848867'

await translatePinTpkZpkBdk({
    sourceTpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
    destinationKey: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
    maximumPinLength: '12',
    sourcePinBlock: 'E57BC634D4717907',
    sourcePinBlockFormat: '01',
    destinationPinBlockFormat: '01',
    pan: '600000000000',
    lmkIdentifier: '01'
});
// {checkLength: '06', pinBlock: 'FC99D994F1D3D3B8', pinBlockFormat: '01'}

await translatePinTpkZpkBdk({
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
});
// {checkLength: '06', pinBlock: '741311DA9D5D6C32', pinBlockFormat: '01'}

await translatePinBdkBdkZpk({
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
});
// {checkLength: '06', errorCode: '00', pinBlock: 'BBF74DF0FFA00ED1', pinBlockFormat: '01'}

await translatePinBdkBdkZpk({
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
});
// {checkLength: '06', errorCode: '00', pinBlock: 'FC99D994F1D3D3B8', pinBlockFormat: '01'}

await generateOffsetIbm({
    keyType: 'FFF',
    key: 'S00072P0TB00E0001EA421618B34F5FA1A77F7CF6480111B97CF0FAE7BD77D589EC921EF9',
    pvk: 'S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22',
    pinBlock: 'FC99D994F1D3D3B8',
    pinBlockFormat: '01',
    checkLength: '06',
    pan: '600000000000',
    decimalisationTable: '709F26B22464E96A',
    pinValidationData: '0000000000N0',
    lmkIdentifier: '01'
});
// {offset: '035965FFFFFF'}

await verifyOffsetIbmDukpt({
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
    messageData: ''
});

await translatePinBdkBdkZpk({
    sourceKeyFlag: '',
    sourceKey: 'S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758',
    destinationKeyFlag: '',
    destinationKey: 'S0007272TN00E0001DE16F028F38CC385436D8E5B3DD4341F3E55379FBCB39710FE2BB6B4',
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
});
// {checkLength: '06', errorCode: '00', pinBlock: '766532A20A0A264B', pinBlockFormat: '01'}

await generatePvv({
    keyType: 'FFF',
    key: 'S0007272TN00E0001DE16F028F38CC385436D8E5B3DD4341F3E55379FBCB39710FE2BB6B4',
    pvk: 'S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C',
    pinBlock: '766532A20A0A264B',
    pinBlockFormat: '01',
    pan: '600000000000',
    pvki: '1',
    lmkIdentifier: '01'
});
// {pvv: '7547'}

await verifyPvvDukpt({
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
});
