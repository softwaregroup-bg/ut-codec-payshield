const errorList = Object.keys(require('./list.json'));
const messages = Object.keys(require('../messages.json'));

module.exports = (defineError) => {
    const Payshield = defineError('payshield');
    const Parser = defineError('parser', Payshield, 'parser error');

    var errors = {
        parser: Parser,
        unableMatchingHeaderPattern: defineError('unableMatchingHeaderPattern', Payshield, 'Unable to match header to header pattern!'),
        unknownResponseCode: defineError('unknownResponseCode', Payshield, 'Unknown response code'),
        notimplemented: defineError('notimplemented', Payshield, 'Not implemented'),
        unableMatchingResponseCode: defineError('unableMatchingResponseCode', Payshield, 'Unable to match response errorCode!'),
        unableMatchingPattern: defineError('unableMatchingPattern', Payshield, 'Unable to match pattern')
    };

    return messages.reduce((a1, c1) => {
        const MsgErr = defineError(c1, Payshield, `Error in method: ${c1}`);
        return errorList.reduce((a2, c2) => {
            var Err = defineError(c2, MsgErr, errorList[c2]);
            a2[`${c1}.${c2}`] = (cause) => (new Err(cause));
            return a2;
        }, a1);
    }, errors);
};
