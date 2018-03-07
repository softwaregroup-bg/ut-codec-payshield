const errorList = require('./list.json');
const defineError = require('ut-error').define;
const Payshield = defineError('payshield');
const Generic = defineError('generic', Payshield, 'generic error');
const Parser = defineError('parser', Payshield, 'parser error');

const errors = Object
    .keys(errorList)
    .reduce((a, c) => {
        var Err = defineError(c, Payshield, errorList[c]);
        a[c] = (cause) => (new Err(cause));
        return a;
    }, {
        generic: Generic,
        parser: Parser,
        unableMatchingHeaderPattern: defineError('unableMatchingHeaderPattern', Generic, 'Unable to match header to header pattern!'),
        unknownResponseCode: defineError('unknownResponseCode', Generic, 'Unknown response code'),
        notimplemented: defineError('notimplemented', Generic, 'Not implemented'),
        unableMatchingResponseCode: defineError('unableMatchingResponseCode', Generic, 'Unable to match response errorCode!'),
        unableMatchingPattern: defineError('unableMatchingPattern', Generic, 'Unable to match pattern')

    });

module.exports = errors;
