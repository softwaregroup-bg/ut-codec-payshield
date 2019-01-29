# Payshield Codec

## Scope

Encode/decode Payshield messages to/from buffer

## Configuration

- _headerFormat_ (string) - defines the length and data type of the message header in format _length/data type_; **for more information of the format definitions, please refer to _ut-bitsyntax_ documentation**
- _messageFormat_ (object) - may contain new command definitions, or definitions of existing commands to be overwritten, or parts of existing commands to be overwritten; **for more information of command definitions, please refer to _Payshield commands_ below**
- _maskedKeys_ (array) - request/response keys for which the values to be masked in the log records

## Public API

## Private API

### maskLogRecord (buffer, data, {pattern, maskedKeys, maskSymbol}) - replaces predefined data in log records

- **params**

    - _buffer_ (buffer) - data buffer to write to log file
    - _data_ (object) - JSON object representing _buffer_
    - _pattern_ (object) - _requestPattern_ of the command, as defined in _Payshield commands_ below
    - _maskedKeys_ (array) - keys to be found in _data_ and their respective values to be replaced in _buffer_
    - _maskSymbol_ (string) - symbol from which the replacing value is formed

- **result**

- (string) - log record with masked values for predefined keys

## Payshield commands

### Available commands

- _A0 (A1)_ - Generate a Key
- _A4 (A5)_ - Form a Key from Encrypted Components
- _A6 (A7)_ - Import a Key
- _A8 (A9)_ - Export a Key
- _B2 (B3)_ - Echo Command
- _BK (BL)_ - Generate an IBM PIN Offset (of a customer selected PIN)
- _BU (BV)_ - Generate a Key Check Value
- _CA (CB)_ - Translate a PIN from TPK to ZPK/BDK (3DES DUKPT) Encryption
- _CC (CD)_ - Translate a PIN from one ZPK to another
- _CU (CV)_ - Verify a PIN & Generate an ABA PVV (of a customer selected PIN)
- _CW (CX)_ - Generate a Card Verification Code/Value
- _CY (CZ)_ - Verify a Card Verification Code/Value
- _DA (DB)_ - Verify a Terminal PIN Using the IBM Offset Method
- _DC (DD)_ - Verify a Terminal PIN Using the ABA PVV Method
- _DE (DF)_ - Generate an IBM PIN Offset (of an LMK encrypted PIN)
- _DG (DH)_ - Generate an ABA PVV (of an LMK encrypted PIN)
- _EC (ED)_ - Verify an Interchange PIN Using the ABA PVV Method
- _EE (EF)_ - Derive a PIN Using the IBM Offset Method
- _FM (FN)_ - Translate a ZEK/ZAK from LMK to ZMK Encryption
- _FW (FX)_ - Generate an ABA PVV (of a customer selected PIN)
- _GM (GN)_ - Hash a Block of Data
- _GO (GP)_ - Verify a PIN Using the IBM Offset Method (3DES DUKPT)
- _GW (GX)_ - Generate/Verify a MAC (3DES DUKPT)
- _KQ (KR)_ - ARQC Verification and/or ARPC Generation (Using Static or MasterCard Proprietary SKD Method)
- _KW (KX)_ - ARQC Verification and/or ARPC Generation (Using EMV or Cloud-Based SKD Methods)
- _M0 (M1)_ - Encrypt Data Block
- _M2 (M3)_ - Decrypt Data Block
- _M4 (M5)_ - Translate Data Block
- _M6 (M7)_ - Generate MAC
- _M8 (M9)_ - Verify MAC
- _PA (PB)_ - Load Formatting Data to HSM
- _PC (PD)_ - Load Additional Formatting Data to HSM
- _PE (PF, PZ)_ - Print PIN/PIN and Solicitation Data
- _TA (TB, TZ)_ - Print TMK Mailer

### Defining new commands

## Standard error codes

- _10_: 'Source key parity error'
- _11_: 'Destination key parity error or key all zeros'
- _12_: 'Contents of user storage not available. Reset, power-down or overwrite'
- _13_: 'Invalid LMK Identifier'
- _14_: 'PIN encrypted under LMK pair 02-03 is invalid'
- _15_: 'Invalid input data (invalid format, invalid characters, or not enough data provided)'
- _16_: 'Console or printer not ready or not connected'
- _17_: 'HSM not in the Authorised state, or not enabled for clear PIN output, or both'
- _18_: 'Document format definition not loaded'
- _19_: 'Specified Diebold Table is invalid'
- _20_: 'PIN block does not contain valid values'
- _21_: 'Invalid index value, or index/block count would cause an overflow condition'
- _22_: 'Invalid account number'
- _23_: 'Invalid PIN block format code'
- _24_: 'PIN is fewer than 4 or more than 12 digits in length'
- _25_: 'Decimalisation Table error'
- _26_: 'Invalid key scheme'
- _27_: 'Incompatible key length'
- _28_: 'Invalid key type'
- _29_: 'Key function not permitted'
- _30_: 'Invalid reference number'
- _31_: 'Insufficient solicitation entries for batch'
- _33_: 'LMK key change storage is corrupted'
- _39_: 'Fraud detection'
- _40_: 'Invalid checksum'
- _41_: 'Internal hardware/software error: bad RAM, invalid error codes, etc.'
- _42_: 'DES failure'
- _47_: 'Algorithm not licensed'
- _49_: 'Private key error, report to supervisor'
- _51_: 'Invalid message header'
- _65_: 'Transaction Key Scheme set to None'
- _67_: 'Command not licensed'
- _68_: 'Command has been disabled'
- _69_: 'PIN block format has been disabled'
- _74_: 'Invalid digest info syntax (no hash mode only)'
- _75_: 'Single length key masquerading as double or triple length key'
- _76_: 'Public key length error'
- _77_: 'Clear data block error'
- _78_: 'Private key length error'
- _79_: 'Hash algorithm object identifier error'
- _80_: 'Data length error. The amount of MAC data (or other data) is greater than or less than the expected amount.'
- _81_: 'Invalid certificate header'
- _82_: 'Invalid check value length'
- _83_: 'Key block format error'
- _84_: 'Key block check value error'
- _85_: 'Invalid OAEP Mask Generation Function'
- _AB_: 'Invalid number of optional blocks'
- _AC_: 'Optional header block error'
- _AD_: 'Key status optional block error'
- _AE_: 'Invalid start date/time'
- _AF_: 'Invalid end date/time'
- _B0_: 'Invalid encryption mode'
- _B1_: 'Invalid authentication mode'
- _B2_: 'Miscellaneous keyblock error'
- _B3_: 'Invalid number of optional blocks'
- _B4_: 'Optional block data error'
- _B5_: 'Incompatible components'
- _B6_: 'Incompatible key status optional blocks'
- _B7_: 'Invalid change field'
- _B8_: 'Invalid old value'
- _B9_: 'Invalid new value'
- _BA_: 'No key status block in the keyblock'
- _BB_: 'Invalid wrapping key'
- _BC_: 'Repeated optional block'
- _BD_: 'Incompatible key types'

## Mask Logs

* `maskedKeys` must be set. It is array of items(fields) that will be masked. Item value should be taken from `messages.json` `requestPattern` for specific message. For instance if there is need to mask field `keySchemeLmk` in message `generateKey`, `maskedKeys` should have following struct. `maskedKeys = ['generateKey']`
