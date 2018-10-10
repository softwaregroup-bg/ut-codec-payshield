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

        messagesKeys.map((method) => {
            const MethodError = defineError(method, Payshield, `Error in method: ${method}`);
            defineError(`${method}.generic`, MethodError, 'Generic Error');
            const customErrors = messages[method].customResponseError;
            // generate predefined list error
            errorList.map((code) => !customErrors && !customErrors[code] && defineError(code, MethodError, errorDesc[code]));

            // generate custom per message error
            customErrors && Object.keys(customErrors).map((code) => (defineError(code, MethodError, customErrors[code])));
        });
    }
    return fetchErrors('payshield');
};
