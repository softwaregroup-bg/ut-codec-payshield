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

generateRsaKeyPair({
    keyTypeIndicator: '1'
});
// {
//     privateKeyLength: '0656',
//     privateKey: '48c461fa6690e92ee5bcb21e201ade0cff194b1b33ab9911167f43b240b83aa323a5f0f0d5a263a177b09260ff08bafe7af060a6c8a940cb195aa34adb91cd31a507fe7702bf6047441b2e2d1e9058fcb6203508aa06923bd49666995e6c850545ce47befc7c7f6fbcd8aec6244cdaafd4a0f71eba40354d2ca11dfd6e904a22ef2c6d99aaaec875259895f8fa3777638b7106dab24cac3509893bd00bf85bbe6541ef4b693735541e7749c0a43bd88fd0a0da6a72157cf357fafbd4350c9d39a4a2b4645bea4e955f1960a470c9e0807080a1962325da272932acbbccf2124bb63bb10ba9b4e728f849da86018d8e902e76ab903e656ab504847d5c3977d545e42276f50766c727cbba1987141552e2f8d1d019211ddb2edfdc561dc0124e6c2e693b69bc87b859612069193530f57810d9575b4d8f1dcc5abcb177e398fefbaa132e5c03eee73f67d7c7d19bbefc6249280e41a7c6e2d338db283669e0960ac58ea874bc27213f768a1ad834471e60a89fb0d1f7457c9251b27b6afde3b066d86efc911f3e8f4aeff6f655fdbd93598fb5a9a334c00c505f01c6b62c90e18fbb3657d99bbe417c8a20fc5da4c0e25ceaa4b3832c74a03576899ef48ace0b0fb88cb91a2b3fe2e0af4403dbdfcbcda7b7fc49d4d6b591efc8164101a3197e0898d79fb53e1ca58ea06520240b5909a84070b60cb9bc89105643f6ee390996e535c65d51a288918ce3da5d1562504b51b337b56228e0657df41cd0c1b72644b7362c4a605f3e4d2040855996064cab08b65033ed8eb47f46fab9aff6237435b3f7ec13a6931cf49f8dfb23ff66e94f84bad1486ef08e16bec8bbce3744c44c36f3df48e99e6ab20b2ed015993f7f8fbbd9d8ffcc2b7baed7bece16bc631b3319e4e155d4692fb6495847744d55320263',
//     publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCQKCAQCrTnbBQop7RO3Zvoj0rfsaeiand3JwOSU2r/XkHMCJ7SUvS7N7wFWs\nED1ZTqUBttuln0xdUEK3vR7Th4KKDeWFjhnX5oO5pC+1e3ZKYaeJ0m4fnb+6tzgW\n1o2p4NyRFgnUoNAcawcRWd6uVNB6Dtkjbjo8YCrTo6CcBu4mONa6IKv3XRidmtzh\nAYuPcBLAkb8qptvX4qMHl/L9d6TQY3obTQ1ispD57YKPU5BpGPds0KUCjqIRUENs\ny0jijfIuRU4EQVTlnAyvT9rVnCU/2A0loECEvDllxsCn0wiVicNhmwKnMPFsbWEB\nogEGjlyv3mUA0e4ja6gFLbOdYmvahdI9AgMBAAE=\n-----END RSA PUBLIC KEY-----'
// }

verifyTermPinIbm({
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

verifyTermPinPvv({
    tpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
    pvk: 'S00072V2TN00E00014C0328F82856C4E6D7CCF7A9A1597CB0662C35A18CC72EB9CF97917C',
    pinBlock: 'E57BC634D4717907',
    pinBlockFormat: '01',
    pan: '600000000000',
    pvki: '1',
    pvv: '2194'
});

translatePinTpkLmk({
    tpk: 'S0007271TN00E00019BAD23B0CEF79E33328CA0568A0E186FC17E8DE738AAF9FB67C6E1FF',
    pinBlock: 'E57BC634D4717907',
    pinBlockFormat: '01',
    pan: '600000000000',
    lmkIdentifier: '01'
});
// pin: '4848867'

translatePinTpkZpkBdk({
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

translatePinTpkZpkBdk({
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
