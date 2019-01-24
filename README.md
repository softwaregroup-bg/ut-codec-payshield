# Payshield Codec

## Scope

Encode / decode Payshield messages to / from buffer

### Mask Logs
* `maskedKeys` must be set. It is array of items(fields) that will be masked. Item value should be taken from `messages.json` `requestPattern` for specific message. For instance if there is need to mask field `keySchemeLmk` in message `generateKey`, `maskedKeys` should have following struct. `maskedKeys = ['generateKey']`