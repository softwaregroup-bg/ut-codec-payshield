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
// MK-AC: S00072E0TN00E00017772090F5BDE6568F9B0EFDADD1D160CDB1655DE1984F00973EC3596; 5E7AF8
// PVK generic: S00072V0TN00E000123721C789734ADC94BBA5A97A7926D5BAFA19AFC35D1D3126BD38F85; 210B96
// PVK IBM3624: S00072V1TN00E00010AE0AD2B1990AB407FAD15059E287760A05DF4DA2391EAB138877E22; 31540C
// PVK Visa PVV: S00072V2TN00E0001E80A2926443C3AF11BF0317C669FA0EA0E100ABDF92BF7A3AF232D4C; AAB664
// CVK: S00072C0TN00E0001A417975993E2331918759DD1656AC94306BE01C19FDE29E83A93AB42; EC7A50
// BDK1: S00072B0TN00E0001566678078B5337915F4860C92F3FF2D6A6B11E8786F22DC8032EB758; 97795F
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
