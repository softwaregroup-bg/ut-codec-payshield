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
        generateKey: [{
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
        {
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
        }]
    }
};
