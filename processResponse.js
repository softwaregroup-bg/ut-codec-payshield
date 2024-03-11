module.exports = {
    // A1: (bodyObj) => {
    //     const {errorCode, rest} = bodyObj;
    //     const regex = /^(?<key>[Z|U|T|X|Y|V|R|S]\w+)(?<keyZmk>[Z|U|T|X|Y|V|R|S]\w+)?(?<kcv>[0123456789ABCDEF]{6})$/;
    //     const regExec = regex.exec(rest.toString());
    //     const response = {errorCode};
    //     if (regExec?.groups?.key) {
    //         response.key = regExec.groups.key;
    //     }
    //     if (regExec?.groups?.keyZmk) {
    //         response.keyZmk = regExec.groups.keyZmk;
    //     }
    //     if (regExec?.groups?.kcv) {
    //         response.kcv = regExec.groups.kcv;
    //     }
    //     return response;
    // },
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
    FN: (bodyObj) => {
        const {rest} = bodyObj;
        const restString = rest?.toString();
        return {
            key: restString?.slice(0, -6),
            keyCheckValue: restString?.slice(-6)
        };
    },
    GN: (bodyObj) => {
        const {hash} = bodyObj;
        return {
            hash: hash.toString('hex')
        };
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
    M7: (bodyObj) => {
        const {rest} = bodyObj;
        return {
            value: rest.toString()
        };
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
