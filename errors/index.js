const errorDesc = require('./list.json');
const errorList = Object.keys(errorDesc);
const messages = require('../messages.json');
const messagesKeys = Object.keys(messages);

module.exports = (defineError) => {
    const payshield = defineError('payshield');
    const parser = defineError('parser', payshield, 'parser error{text}');

    var errors = {
        parser,
        payshield,
        parserHeader: defineError('header', parser, 'Cant parse header pattern!'),
        parserRequest: defineError('request', parser, 'Cant parse request pattern for command: {command}!'),
        parserResponse: defineError('response', parser, 'Cant parse response pattern for command: {command}!'),
        parserBody: defineError('body', parser, 'Unable to build body of opcode: {command}!'),
        unableMatchingHeaderPattern: defineError('unableMatchingHeaderPattern', payshield, 'Unable to match header to header pattern!'),
        unableMatchingResponseECode: defineError('unableMatchingResponseECode', payshield, 'Unable to match response errorCode!'),
        unknownResponseCode: defineError('unknownResponseCode', payshield, 'Unknown response code: {code}'),
        notimplemented: defineError('notimplemented', payshield, 'Not implemented opcode: {opcode}'),
        unableMatchingPattern: defineError('unableMatchingPattern', payshield, 'Unable to match pattern for opcode: {opcode}')
    };

    var defErr = messagesKeys.reduce((a1, c1) => {
        const MsgErr = defineError(c1, payshield, `Error in method: ${c1}`);
        a1[`${c1}.generic`] = defineError('generic', MsgErr, 'Generic Error');
        var customResponseError = {};
        if (messages[c1].customResponseError) {
            customResponseError = Object.keys(messages[c1].customResponseError)
                .map((key) => ({key, value: messages[c1].customResponseError[key]}))
                .reduce((a, {key, value}) => (Object.assign(a, {
                    [`${c1}.${key}`]: defineError(key, MsgErr, value)
                })), {});
        }
        return Object.assign(errorList.reduce((a2, c2) => {
            a2[`${c1}.${c2}`] = defineError(c2, MsgErr, errorDesc[c2]);
            // a2[`${c1}.${c2}`] = defineError(c2, MsgErr, (messages[c1].customResponseError && messages[c1].customResponseError[c2]) || errorDesc[c2]);
            return a2;
        }, a1), customResponseError);
    }, errors);
    return defErr;
};
