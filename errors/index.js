const errorDesc = require('./list.json');
const errorList = Object.keys(errorDesc);
const messages = Object.keys(require('../messages.json'));

module.exports = (defineError) => {
    const payshield = defineError('payshield');
    const parser = defineError('parser', payshield, 'parser error{text}');
    const unknownResponseCode = defineError('unknownResponseCode', payshield, 'Unknown response code{text}');
    const notimplemented = defineError('notimplemented', payshield, 'Not implemented{text}');
    const unableMatchingPattern = defineError('unableMatchingPattern', payshield, 'Unable to match pattern{text}');

    var errors = {
        parser: (text = '') => parser({params: {text: text && `|${text}`}}),
        unableMatchingHeaderPattern: defineError('unableMatchingHeaderPattern', payshield, 'Unable to match header to header pattern!'),
        unknownResponseCode: (text = '') => unknownResponseCode({params: {text: text && `|${text}`}}),
        notimplemented: (text = '') => notimplemented({params: {text: text && `|${text}`}}),
        unableMatchingResponseCode: defineError('unableMatchingResponseCode', payshield, 'Unable to match response errorCode!'),
        unableMatchingPattern: (text = '') => unableMatchingPattern({params: {text: text && `|${text}`}})
    };

    return messages.reduce((a1, c1) => {
        const MsgErr = defineError(c1, payshield, `Error in method: ${c1}`);
        return errorList.reduce((a2, c2) => {
            var Err = defineError(c2, MsgErr, errorDesc[c2]);
            a2[`${c1}.${c2}`] = (cause) => (Err(cause));
            return a2;
        }, a1);
    }, errors);
};
