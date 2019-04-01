# Payshield Codec

## Scope

Encode/decode Payshield messages to/from buffer

## Public API

The module exposes _PayshieldCodec_ class.

### init

(config)

Initializes the _PayshieldCodec_ instance

params

- _config_ (object) - codec configuration
  - _headerFormat_ (string) - defines the length and data type of the
    message header in format _length/data type_; **for more information of
    the format definitions, please refer to _ut-bitsyntax_ documentation**
  - _messageFormat_ (object) - may contain new command definitions, or
    definitions of existing commands to be overwritten, or parts of
    existing commands to be overwritten; **for more information of command
    definitions, please refer to _Payshield commands_ below**
  - _maskedKeys_ (array) - request/response keys for which the values to
    be masked in the log records

result (void)

### decode

(buff, $meta, context, log)

Decodes data buffer to JSON object

params

- _buff_ (buffer) - data buffer to be decoded
- _$meta_ (object) - _$meta_ object as defined in _ut-port_
- _context_ (object) - _context_ object as defined by _ut-port-tcp_
- _log_ (object) - contains log functions; **for more information, please
  refer to _ut-log_ documentation**

result

- (object) - decoded _buff_

### encode

(data, $meta, context, log)

Encodes JSON object data to buffer

params

- _data_ (object) - data object to be encoded
- _$meta_ (object) - _$meta_ object as defined in _ut-port_
- _context_ (object) - _context_ object as defined by _ut-port-tcp_
- _log_ (object) - contains log functions; **for more information, please
  refer to _ut-log_ documentation**

result

- (buffer) - encoded _data_

## Private API

### maskLogRecord

(buffer, data, {pattern, maskedKeys, maskSymbol})

Replaces predefined data in log records

params

- _buffer_ (buffer) - data buffer to be written to log file (encoded _data_ object)
- _data_ (object) - JSON object representing _buffer_
- _pattern_ (object) - _requestPattern_ of the command, as defined in
  _Payshield commands_ below
- _maskedKeys_ (array) - keys to be found in _data_ and their respective
  values to be replaced in _buffer_
  - (string) - key for which the value to be masked
- _maskSymbol_ (string) - symbol from which the replacing value is formed

result

- (string) - log record with masked values for predefined keys

## Defining new commands

Each command should be described in _messages.json_ in the following way:

- __commandName__ (object) - name of the method which will be exposed in
 _payshield_ namespace
  - _requestCode_ (string) - _Command Code_ for this command as defined in
    _Payshield Host Command Reference Manual_
  - _responseCode_ (string) - _Response Code_ for this command as defined in
    _Payshield Host Command Reference Manual_
  - _requestPattern_ (string) - request pattern definition for
    _PayshieldCodec_ _encode_ method; **for more information of pattern
    definitions, please refer to _ut-bitsyntax_ documentation**
  - _responsePattern_ (string) - response pattern definition for
    _PayshieldCodec_ _decode_ method; **for more information of pattern
    definitions, please refer to _ut-bitsyntax_ documentation**
  - _warnings_ (array) - array with error codes to be processed as warnings
    instead of errors **for this command only**; **for list of error codes,
    please refer to _Error codes_ below**
    - (string) - error code to be processed as warning
  - _customResponseError_ (object) - _key: value_ pairs object to define new
    error codes, or to overwrite existing standard error codes **for this
    command only**
    - _key_ - error code
    - _value_ - error description

## Available Payshield commands, command specific error codes, command specific warnings

### _A0 (A1)_

Generate a Key

- _error codes_
  - _10_: _ZMK or TMK Parity error_

### _A4 (A5)_

Form a Key from Encrypted Components

- _error codes_
  - _03_: _Invalid number of components_
  - _10_: _Component parity error_

### _A6 (A7)_

Import a Key

- _error codes_
  - _10_: _ZMK Parity error_

- _warnings_
  - _01_: _Key parity error, advice only_

### _A8 (A9)_

Export a Key

- _error codes_
  - _10_: _ZMK or TMK Parity error_
  - _11_: _Key parity error_

### _B2 (B3)_

Echo Command

### _BG (BH)_

Translate a PIN and PIN Length

### _BK (BL)_

Generate an IBM PIN Offset (of a customer selected PIN)

- _error codes_
  - _03_: _Excluded PIN count incorrect_
  - _10_: _TPK or ZPK parity error_
  - _11_: _PVK parity error_
  - _81_: _PIN length mismatch_
  - _86_: _PIN exists in either global or local Excluded PIN Table_

- _warnings_
  - _02_: _Warning PVK not single length_

### _BS (BT)_

Erase the Key Change Storage

### _BU (BV)_

Generate a Key Check Value

- _error codes_
  - _10_: _Key parity error_

### _BW (BX)_

Translate Keys from Old LMK to New LMK and Migrate to New Key Type

- _error codes_
  - _04_: _Invalid key type code_
  - _05_: _Invalid key length flag_
  - _10_: _Key parity error_
  - _44_: _Migration not allowed: 'Enforce key type 002 separation for PCI HSM compliance' not set_
  - _45_: _Invalid key migration destination key type_

### _CA (CB)_

Translate a PIN from TPK to ZPK/BDK (3DES DUKPT) Encryption

- _error codes_
  - _10_: _Source TPK parity error_
  - _11_: _Destination ZPK parity error_

### _CC (CD)_

Translate a PIN from one ZPK to another

- _error codes_
  - _10_: _Source ZPK parity error_
  - _11_: _Destination ZPK parity error_

### _CU (CV)_

Verify a PIN & Generate an ABA PVV (of a customer selected PIN)

- _error codes_
  - _01_: _PIN Verification failure_
  - _10_: _PIN Block Key parity error_
  - _11_: _PVK parity error_
  - _27_: _PVK not double length_
  - _81_: _PIN length mismatch_
  - _86_: _PIN exists in either global or local Excluded PIN Table_

### _CW (CX)_

Generate a Card Verification Code/Value

- _error codes_
  - _10_: _CVK A or CVK B parity error_
  - _27_: _CVK not double length_

### _CY (CZ)_

Verify a Card Verification Code/Value

- _error codes_
  - _01_: _CVV failed verification_
  - _10_: _CVK A or B parity error_
  - _27_: _CVK not double length_

### _DA (DB)_

Verify a Terminal PIN Using the IBM Offset Method

- _error codes_
  - _01_: _PIN Verification failure_
  - _10_: _TPK parity error_
  - _11_: _PVK parity error_

- _warnings_
  - _02_: _Warning PVK not single length_

### _DC (DD)_

Verify a Terminal PIN Using the ABA PVV Method

- _error codes_
  - _01_: _PIN verification failure_
  - _10_: _TPK parity error_
  - _11_: _PVK parity error_
  - _27_: _PVK not double length_

### _DE (DF)_

Generate an IBM PIN Offset (of an LMK encrypted PIN)

- _error codes_
  - _10_: _PVK parity error_
  - _81_: _PIN length mismatch_
  - _86_: _PIN exists in either global or local Excluded PIN Table_

- _warnings_
  - _02_: _Warning PVK not single length_

### _DG (DH)_

Generate an ABA PVV (of an LMK encrypted PIN)

- _error codes_
  - _10_: _PVK parity error_
  - _27_: _PVK not double length_
  - _81_: _PIN length mismatch_
  - _86_: _PIN exists in either global or local Excluded PIN Table_

### _EC (ED)_

Verify an Interchange PIN Using the ABA PVV Method

- _error codes_
  - _01_: _PIN verification failure_
  - _10_: _ZPK parity error_
  - _11_: _PVK parity error_
  - _27_: _PVK not double length_

### _EE (EF)_

Derive a PIN Using the IBM Offset Method

- _error codes_
  - _10_: _PVK parity error_
  - _81_: _PIN length mismatch_
  - _86_: _PIN exists in either global or local Excluded PIN Table_

- _warnings_
  - _02_: _Warning PVK not single length_

### _FM (FN)_

Translate a ZEK/ZAK from LMK to ZMK Encryption

### _FW (FX)_

Generate an ABA PVV (of a customer selected PIN)

- _error codes_
  - _10_: _PVK parity error_
  - _27_: _PVK not double length_
  - _81_: _PIN length mismatch_
  - _86_: _PIN exists in either global or local Excluded PIN Table_

### _G0 (G1)_

Translate a PIN from BDK to BDK or ZPK Encryption (3DES DUKPT)

- _error codes_
  - _10_: _BDK parity error_
  - _11_: _Interchange key parity error_
  - _27_: _BDK not double or triple length_

### _GM (GN)_

Hash a Block of Data

- _error codes_
  - _05_: _Invalid hash identifier_

### _GO (GP)_

Verify a PIN Using the IBM Offset Method (3DES DUKPT)

- _error codes_
  - _01_: _PIN Verification failure_
  - _10_: _BDK parity error_
  - _11_: _PVK error_
  - _27_: _BDK not double length_
  - _68_: _Command disabled_

- _warnings_
  - _02_: _Warning PVK not single length_

### _GW (GX)_

Generate/Verify a MAC (3DES DUKPT)

- _error codes_
  - _01_: _MAC Verification Failure_

### _JA (JB)_

Generate a Random PIN

- _error codes_
  - _81_: _PIN length mismatch_

### _JC (JD)_

Translate a PIN from TPK to LMK Encryption

- _error codes_
  - _10_: _TPK parity error_

### _JE (JF)_

Translate a PIN from ZPK to LMK Encryption

- _error codes_
  - _10_: _ZPK parity error_

### _JG (JH)_

Translate a PIN from LMK to ZPK Encryption

- _error codes_
  - _10_: _ZPK parity error_

### _KQ (KR)_

ARQC Verification and/or ARPC Generation (Using Static or MasterCard
 Proprietary SKD Method)

- _error codes_
  - _01_: _ARQC/TC/AAC verification failed_
  - _03_: _Mode = 3 or 4 but Scheme ID ≠ 0_
  - _04_: _Invalid Mode value_
  - _05_: _Unrecognized Scheme ID_
  - _06_: _Discretionary MAC verification failed_
  - _10_: _MK-AC parity error_
  - _11_: _MK-SMI parity error_
  - _80_: _Transaction Data length error_
  - _81_: _Zero length Transaction Data_
  - _82_: _Invalid Discretionary MAC Data length_

### _KW (KX)_

ARQC Verification and/or ARPC Generation (Using EMV or Cloud-Based SKD Methods)

- _error codes_
  - _01_: _ARQC/TC/AAC/MPVV verification failure_
  - _04_: _Unrecognized Mode Flag_
  - _05_: _Unrecognized Scheme ID_
  - _06_: _Invalid YHHHHCC value_
  - _10_: _MK parity error_
  - _52_: _Invalid Branch/Height_

### _LO (LP)_

Translate Decimalization Table from Old to New LMK

### _M0 (M1)_

Encrypt Data Block

- _error codes_
  - _02_: _Invalid Mode Flag field_
  - _03_: _Invalid Input Format Flag field_
  - _04_: _Invalid Output Format Flag field_
  - _05_: _Invalid Key Type field_
  - _06_: _Invalid Message Length field_
  - _10_: _Encryption Key Parity Error_
  - _35_: _Illegal Message Format_

### _M2 (M3)_

Decrypt Data Block

- _error codes_
  - _02_: _Invalid Mode Flag field_
  - _03_: _Invalid Input Format Flag field_
  - _04_: _Invalid Output Format Flag field_
  - _05_: _Invalid Key Type field_
  - _06_: _Invalid Message Length field_
  - _10_: _Decryption Key Parity Error_
  - _35_: _Illegal Message Format_

### _M4 (M5)_

Translate Data Block

- _error codes_
  - _02_: _Invalid Mode Flag field_
  - _03_: _Invalid Input Format Flag field_
  - _04_: _Invalid Output Format Flag field_
  - _05_: _Invalid Key Type field_
  - _06_: _Actual Message Length is too Short_
  - _07_: _Invalid Destination Mode Flag Field_
  - _08_: _Invalid destination Key Type Field_
  - _10_: _Decryption Key Parity Error_
  - _11_: _Encryption Key Parity Error_
  - _15_: _Actual Message Length is too Long_
  - _35_: _Illegal Message Format_

### _M6 (M7)_

Generate MAC

- _error codes_
  - _02_: _Invalid Mode Flag field_
  - _03_: _Invalid Input Format Flag field_
  - _04_: _Invalid MAC Algorithm field_
  - _05_: _Invalid Key Type field_
  - _06_: _Invalid Message Length field_
  - _09_: _Invalid Padding Method field_
  - _10_: _MAC Key Parity Error_

### _M8 (M9)_

Verify MAC

- _error codes_
  - _01_: _MAC verification failed_
  - _02_: _Invalid Mode Flag field_
  - _03_: _Invalid Input Format Flag field_
  - _04_: _Invalid MAC Algorithm field_
  - _05_: _Invalid Key Type field_
  - _06_: _Invalid Message Length field_
  - _09_: _Invalid Padding Method field_
  - _10_: _MAC Key Parity Error_

### _PA (PB)_

Load Formatting Data to HSM

### _PC (PD)_

Load Additional Formatting Data to HSM

### _PE (PF, PZ)_

Print PIN/PIN and Solicitation Data

- _error codes (PZ)_
  - _16_: _Printer not ready/disconnected_
  - _41_: _Internal hardware/software error_

### _TA (TB, TZ)_

Print TMK Mailer

- _error codes (TB)_
  - _10_: _TMK parity error_

- _error codes (TZ)_
  - _16_: _Printer time out_

## Standard error codes

- _10_: _Source key parity error_
- _11_: _Destination key parity error or key all zeros_
- _12_: _Contents of user storage not available. Reset, power-down or overwrite_
- _13_: _Invalid LMK Identifier_
- _14_: _PIN encrypted under LMK pair 02-03 is invalid_
- _15_: _Invalid input data (invalid format, invalid characters, or not enough
 data provided)_
- _16_: _Console or printer not ready or not connected_
- _17_: _HSM not in the Authorised state, or not enabled for clear PIN output,
 or both_
- _18_: _Document format definition not loaded_
- _19_: _Specified Diebold Table is invalid_
- _20_: _PIN block does not contain valid values_
- _21_: _Invalid index value, or index/block count would cause an overflow condition_
- _22_: _Invalid account number_
- _23_: _Invalid PIN block format code_
- _24_: _PIN is fewer than 4 or more than 12 digits in length_
- _25_: _Decimalisation Table error_
- _26_: _Invalid key scheme_
- _27_: _Incompatible key length_
- _28_: _Invalid key type_
- _29_: _Key function not permitted_
- _30_: _Invalid reference number_
- _31_: _Insufficient solicitation entries for batch_
- _33_: _LMK key change storage is corrupted_
- _39_: _Fraud detection_
- _40_: _Invalid checksum_
- _41_: _Internal hardware/software error: bad RAM, invalid error codes, etc._
- _42_: _DES failure_
- _47_: _Algorithm not licensed_
- _49_: _Private key error, report to supervisor_
- _51_: _Invalid message header_
- _65_: _Transaction Key Scheme set to None_
- _67_: _Command not licensed_
- _68_: _Command has been disabled_
- _69_: _PIN block format has been disabled_
- _74_: _Invalid digest info syntax (no hash mode only)_
- _75_: _Single length key masquerading as double or triple length key_
- _76_: _Public key length error_
- _77_: _Clear data block error_
- _78_: _Private key length error_
- _79_: _Hash algorithm object identifier error_
- _80_: _Data length error. The amount of MAC data (or other data) is greater
 than or less than the expected amount._
- _81_: _Invalid certificate header_
- _82_: _Invalid check value length_
- _83_: _Key block format error_
- _84_: _Key block check value error_
- _85_: _Invalid OAEP Mask Generation Function_
- _AB_: _Invalid number of optional blocks_
- _AC_: _Optional header block error_
- _AD_: _Key status optional block error_
- _AE_: _Invalid start date/time_
- _AF_: _Invalid end date/time_
- _B0_: _Invalid encryption mode_
- _B1_: _Invalid authentication mode_
- _B2_: _Miscellaneous keyblock error_
- _B3_: _Invalid number of optional blocks_
- _B4_: _Optional block data error_
- _B5_: _Incompatible components_
- _B6_: _Incompatible key status optional blocks_
- _B7_: _Invalid change field_
- _B8_: _Invalid old value_
- _B9_: _Invalid new value_
- _BA_: _No key status block in the keyblock_
- _BB_: _Invalid wrapping key_
- _BC_: _Repeated optional block_
- _BD_: _Incompatible key types_

## Mask Logs

- `maskedKeys` must be set. It is array of items (fields) that will be masked.
 Item value should be taken from `messages.json` `requestPattern` for specific
 message. For instance if there is need to mask field `keySchemeLmk` in message
 `generateKey`, `maskedKeys` should have following struct.
 `maskedKeys = ['generateKey']`
