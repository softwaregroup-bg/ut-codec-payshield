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

        messagesKeys.forEach(messageKey => {
            const MsgErr = defineError(messageKey, Payshield, `Error in method: ${messageKey}`);
            defineError('generic', MsgErr, 'Generic error');
            errorList.forEach(errorKey => {
                const message = (messages[messageKey].customResponseError && messages[messageKey].customResponseError[errorKey]) || errorDesc[errorKey];
                defineError(errorKey, MsgErr, message);
            });
        });
    }

    return fetchErrors('payshield');
};
