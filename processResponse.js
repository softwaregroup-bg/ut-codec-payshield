module.exports = {
    A1: (bodyObj, {mode, keySchemeLmk, keySchemeZmkTmk, zkaOption}) => {
        const {rest} = bodyObj;
        const restString = rest.toString();
        const response = {};
        const restLength = restString.length - 1;
        let counter = -1; // from end to start of string
        if (zkaOption === '1') {
            counter += 32;
            response.zkaRndi = restString.substring(restLength - counter, restLength);
        }
        counter += 6;
        response.kcv = restString.substring(restLength - counter, restLength - counter + 6);
        const keys = restString.substring(0, restLength - counter); // key + keyZmk
        if (['1', 'B'].includes(mode)) {
            if (keySchemeLmk === keySchemeZmkTmk) {
                const [, key, keyZmk] = keys.split(keySchemeLmk);
                response.key = `${keySchemeLmk}${key}`;
                response.keyZmk = `${keySchemeZmkTmk}${keyZmk}`;
            } else {
                const [key, keyZmk] = keys.split(keySchemeZmkTmk);
                response.key = key;
                response.keyZmk = `${keySchemeZmkTmk}${keyZmk}`;
            }
        } else {
            response.key = keys;
        }
        return response;
    },
    A5: (bodyObj) => {
        const {rest} = bodyObj;
        const restString = rest?.toString();
        return {
            key: restString?.slice(0, -6),
            keyCheckValue: restString?.slice(-6)
        };
    },
    A7: (bodyObj) => {
        const {rest} = bodyObj;
        const restString = rest?.toString();
        return {
            key: restString?.slice(0, -6),
            keyCheckValue: restString?.slice(-6)
        };
    },
    A9: (bodyObj) => {
        const {rest} = bodyObj;
        const restString = rest?.toString();
        return {
            key: restString?.slice(0, -6),
            keyCheckValue: restString?.slice(-6)
        };
    },
    B3: (bodyObj) => {
        const {rest} = bodyObj;
        return {
            data: rest.toString()
        };
    },
    BV: (bodyObj) => {
        const {keyCheckValue} = bodyObj;
        return {
            keyCheckValue: keyCheckValue.toString()
        };
    },
    BX: (bodyObj) => {
        const {rest} = bodyObj;
        const restString = rest?.toString();
        return {
            key: restString?.slice(0, -6),
            keyCheckValue: restString?.slice(-6)
        };
    },
    CB: (bodyObj) => {
        const {rest, checkLength} = bodyObj;
        const restString = rest.toString();
        return {
            checkLength,
            pinBlockFormat: restString.slice(-2),
            pinBlock: restString.slice(0, -2)
        };
    },
    CD: (bodyObj) => {
        const {checkLength, rest} = bodyObj;
        const restString = rest.toString();
        return {
            checkLength,
            pinBlockFormat: restString?.slice(-2),
            pinBlock: restString?.slice(0, -2)
        };
    },
    CX: (bodyObj) => {
        const {cvv} = bodyObj;
        return {
            cvv
        };
    },
    EF: (bodyObj) => {
        const {rest} = bodyObj;
        return {
            pin: rest.toString()
        };
    },
    EJ: (bodyObj) => {
        const {privateKeyLength, publicKey, rest} = bodyObj;
        return {
            privateKeyLength,
            publicKey: [
                '-----BEGIN RSA PUBLIC KEY-----',
                Buffer.from(publicKey, 'hex')
                    .toString('base64')
                    .match(/.{0,64}/g)
                    .filter(Boolean)
                    .join('\n'),
                '-----END RSA PUBLIC KEY-----'
            ].join('\n'),
            // TODO: check how this is passed to other commands !!!
            privateKey: rest.toString('base64')
        };
    },
    FN: (bodyObj) => {
        const {rest} = bodyObj;
        const restString = rest?.toString();
        return {
            key: restString?.slice(0, -6),
            keyCheckValue: restString?.slice(-6)
        };
    },
    GN: (bodyObj) => {
        const {rest} = bodyObj;
        return {
            hash: rest.toString('hex')
        };
    },
    GP: (bodyObj) => {
        const {rest} = bodyObj;
        const response = {};
        if (rest.length) {
            response.macErrorCode = rest.toString();
        }
        return response;
    },
    GR: (bodyObj) => {
        const {rest} = bodyObj;
        const response = {};
        if (rest.length) {
            response.macErrorCode = rest.toString();
        }
        return response;
    },
    GX: (bodyObj) => {
        const {rest} = bodyObj;
        const result = {};
        if (rest?.length) {
            result.mac = rest.toString();
        }
        return result;
    },
    JB: (bodyObj) => {
        const {rest} = bodyObj;
        return {
            pin: rest.toString()
        };
    },
    JD: (bodyObj) => {
        const {rest} = bodyObj;
        return {
            pin: rest.toString()
        };
    },
    JF: (bodyObj) => {
        const {rest} = bodyObj;
        return {
            pin: rest.toString()
        };
    },
    JH: (bodyObj) => {
        const {rest} = bodyObj;
        return {
            pinBlock: rest.toString()
        };
    },
    KR: (bodyObj) => {
        const {rest} = bodyObj;
        const response = {};
        if (rest?.length) {
            response.arpc = rest.toString('hex').toUpperCase();
        }
        return response;
    },
    KX: (bodyObj) => {
        const {rest} = bodyObj;
        const response = {};
        if (rest?.length) {
            response.arpc = rest.toString('hex').toUpperCase();
        }
        return response;
    },
    M1: (bodyObj, {modeFlag, outputFormatFlag}) => {
        // currently does not support modeFlag 04 and 13
        // currently does not support AES LMK
        const {rest} = bodyObj;
        const returnResponse = {};
        const restString = rest.toString();
        const ivLengthByKey = 16; // DES/3DES LMK

        let counter = 0;
        if (['01', '02', '03'].includes(modeFlag)) {
            counter += ivLengthByKey;
            returnResponse.iv = restString.slice(0, counter);
        }
        returnResponse.messageLength = parseInt(restString.slice(
            counter,
            counter + 4
        ), 16);
        returnResponse.encrypted = restString.slice(counter + 4);
        return returnResponse;
    },
    M3: (bodyObj, {modeFlag, outputFormatFlag}) => {
        // currently does not support modeFlag 04 and 13
        // currently does not support AES LMK
        const {rest} = bodyObj;
        const returnResponse = {};
        const restString = rest.toString();
        const ivLengthByKey = 16; // DES/3DES LMK

        let counter = 0;
        if (['01', '02', '03'].includes(modeFlag)) {
            counter += ivLengthByKey;
            returnResponse.iv = restString.slice(0, counter);
        }
        returnResponse.messageLength = parseInt(restString.slice(
            counter,
            counter + 4
        ), 16);
        returnResponse.decrypted = restString.slice(counter + 4);
        return returnResponse;
    },
    M5: (bodyObj, {sourceModeFlag, destinationModeFlag, outputFormatFlag}) => {
        // currently does not support modeFlag 04 and 13
        // currently does not support AES LMK
        const {rest} = bodyObj;
        const returnResponse = {};
        const restString = rest.toString();
        const sourceIvLengthByKey = 16; // DES/3DES LMK
        const destinationIvLengthByKey = 16; // DES/3DES LMK

        let counter = 0;
        if (['01', '02', '03'].includes(sourceModeFlag)) {
            returnResponse.sourceIv = restString.slice(counter, counter + sourceIvLengthByKey);
            counter += sourceIvLengthByKey;
        }
        if (['01', '02', '03'].includes(destinationModeFlag)) {
            returnResponse.destinationIv = restString.slice(counter, counter + destinationIvLengthByKey);
            counter += destinationIvLengthByKey;
        }
        returnResponse.messageDataLength = parseInt(restString.slice(
            counter,
            counter + 4
        ), 16);
        returnResponse.encrypted = restString.slice(counter + 4);
        return returnResponse;
    },
    M7: (bodyObj, {modeFlag}) => {
        const {rest} = bodyObj;
        const response = {};
        if (['1', '2'].includes(modeFlag)) {
            response.iv = rest.toString();
        } else if (['0', '3'].includes(modeFlag)) {
            response.mac = rest.toString();
        }
        return response;
    },
    M9: (bodyObj) => {
        const {rest} = bodyObj;
        const response = {};
        if (rest?.length) {
            response.value = rest.toString();
        }
        return response;
    },
    PF: (bodyObj) => {
        const {checkValue} = bodyObj;
        return {
            checkValue: checkValue.toString()
        };
    }
};
