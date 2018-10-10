const errorDesc = require('./list.json');
const errorList = Object.keys(errorDesc);
const messages = require('../messages.json');
const messagesKeys = Object.keys(messages);

module.exports = ({defineError, getError, fetchErrors}) => {
    if (!getError('payshield')) {
        const Payshield = defineError('payshield', null, 'Codec payshield generic');
        const Parser = defineError('parser', Payshield, 'parser error{text}');

        defineError('header', Parser, 'Cant parse header pattern!');
        defineError('request', Parser, 'Cant parse request pattern for command: {command}!'); // !parserHeader
        defineError('response', Parser, 'Cant parse response pattern for command: {command}!'); // !parserRequest
        defineError('body', Parser, 'Unable to build body of opcode: {command}!'); // !parserResponse
        defineError('unableMatchingHeaderPattern', Payshield, 'Unable to match header to header pattern!');
        defineError('unableMatchingResponseECode', Payshield, 'Unable to match response errorCode!');
        defineError('unknownResponseCode', Payshield, 'Unknown response code: {code}');
        defineError('notimplemented', Payshield, 'Not implemented opcode: {opcode}');
        defineError('unableMatchingPattern', Payshield, 'Unable to match pattern for opcode: {opcode}');

    messagesKeys.reduce((a1, c1) => {
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
            return a2;
        }, a1), customResponseError);
    }, errors);

    return fetchErrors('payshield');
};
