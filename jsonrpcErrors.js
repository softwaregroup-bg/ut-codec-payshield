const create = require('ut-error').define;

const jsonRPC = create('jsonRPC');
const invalidJson = create('invalidJson', jsonRPC, 'Invalid json');
const invalidVersion = create('invalidVersion', invalidJson, 'Invalid jsonrpc version');
const invalidMethod = create('invalidMethod', invalidJson, 'Invalid or missing method');
const invalidPayload = create('invalidPayload', invalidJson, 'Invalid or missing jsonrpc payload');
const invalidMessageID = create('invalidMessageID', invalidJson, 'Invalid message id');

module.exports = {
    jsonRPC,
    invalidJson,
    invalidVersion,
    invalidMethod,
    invalidPayload,
    invalidMessageID
};
