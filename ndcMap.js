module.exports = {
    devices: {
        'A': 'clock',
        'B': 'power',
        'D': 'cardReader',
        'E': 'cashHandler',
        'F': 'depository',
        'G': 'receiptPrinter',
        'H': 'journalPrinter',
        'K': 'nightDepository',
        'L': 'encryptor',
        'M': 'camera',
        'P': 'sensors',
        'Q': 'touchScreen',
        'R': 'supervisorKeys',
        'S': 'cardholderDisplay',
        'V': 'statementPrinter',
        'Y': 'coinDispenser',
        'a': 'voiceGuidance',
        'f': 'barcodeReader',
        'q': 'chequeProcessor',
        'w': 'noteAcceptor',
        '\\': 'envelopeDispenser'
    },

    descriptors: {
        '8': 'fault',
        '9': 'ready',
        'A': 'reject',
        'B': 'transactionReady',
        'C': 'specificReject',
        'F': 'state'
    },

    statuses: {
        '1': 'configuration',
        '2': 'supplyCounters',
        '5': 'datetime',
        '6': 'configurationId',
        'H': 'hardware',
        'I': 'supplies',
        'J': 'fitness',
        'K': 'sensor',
        'L': 'release',
        'M': 'optionDigits',
        'N': 'depositDefition'
    },

    supplies: {
        '0': 'unchanged',
        '1': 'good',
        '2': 'mediaLow',
        '3': 'mediaOut',
        '4': 'overfill'
    },

    suppliesStatus: {
        '0': 'notConfigured',
        '1': 'good',
        '2': 'mediaLow',
        '3': 'mediaOut',
        '4': 'overfill'
    },

    severities: {
        '0': 'noError',
        '1': 'routine',
        '2': 'warning',
        '3': 'suspend',
        '4': 'fatal'
    },

    clockStatuses: {
        '1': 'Clock reset but running',
        '2': 'Clock has stopped'
    },

    cardReaderStatuses: {
        '0': 'No transaction exception condition occurred but consult other fields for error severity, diagnostic status or supplies status changes',
        '1': 'The cardholder did not take his card within the allowed time and it was captured or jammed',
        '2': 'The mechanism failed to eject the card, which was either captured or jammed',
        '3': 'The mechanism failed to update the requested tracks on the card',
        '4': 'Invalid track data received from the host',
        '7': 'Error in track data'
    },

    cashHandlerStatuses: {
        '0': 'Successful operation, but an exception has occurred as detailed in subsequent fields',
        '1': 'Short dispense. For a spray dispenser, this can also indicate that an extra note has been dispensed',
        '2': 'No notes dispensed',
        '3': 'Notes dispensed unknown. ' +
            'The cardholder may have had access to any presented notes, so it should be assumed some may have been dispensed. ' +
            'Intervention may be required to reconcile the cash amount totals. The following counts contain requested dispense values',
        '4': 'No notes dispensed or card not ejected. ' +
            'This status is returned on a card before cash transaction if the stack operation fails and the notes are purged prior to card eject',
        '5': 'Some notes have been retracted when the notes were not taken following a Present time-out. The number of notes retracted is unknown'
    },

    depositoryStatuses: {
        '0': 'Successful operation, but an exception has occurred as detailed in subsequent fields',
        '1': 'Time-out on cardholder deposit',
        '2': 'Failure to enable mechanism for a deposit',
        '3': 'Envelope/document jam or envelope/document deposit failed. The cardholder has access. ' +
            'This status is also returned if there is any doubt about cardholder access',
        '4': 'Envelope/document jam or envelope/document deposit failed. The cardholder does not have access'
    },

    receiptPrinterStatuses: {
        '0': 'Successful print',
        '1': 'Print operation not successfully completed',
        '2': 'Device not configured',
        '4': 'Cancel key pressed during sideways receipt print',
        '5': 'Receipt retracted'
    },

    journalPrinterStatuses: {
        '0': 'Successful print',
        '1': 'Print operation not successfully completed',
        '2': 'Device not configured',
        '6': 'Journal printer backup activated',
        '7': 'Journal printer backup and reprint terminated',
        '8': 'Journal printer backup reprint started',
        '9': 'Journal printer backup halted',
        ':': 'Journal printer backup log security error',
        ';': 'Journal printer backup reprint halted',
        '<': 'Journal printer backup tamper state entered',
        '=': 'EJ in dual mode print operation successful',
        '>': 'EJ in dual mode print operation not successful'
    },

    encryptorStatuses: {
        '1': 'Encryptor error',
        '2': 'Encryptor not configured'
    },

    sensorStatuses: {
        '1': 'Tampler indicator sensor change',
        '2': 'Mode change',
        '3': 'Alarm state change',
        '5': 'Full tamper indicator and full alarms change detected',
        '6': 'Flexible tamper indicator and alarms change detected'
    },

    sensors: {
        '0': false,
        '1': true
    },

    statementPrinterStatuses: {
        '0': 'No transaction error condition, but check other fields for error severity, diagnostic status or supplies status change',
        '1': 'Print/cut not successful',
        '2': 'Device not configured',
        '3': 'Statement present in transport',
        '4': 'Cardholder pressed Cancel during a "print statement and wait" function',
        '5': 'Reserved',
        '6': 'Reserved'
    },

    coinDispenserStatuses: {
        '0': 'Successful operation, but an exception has occurred, described in the Diagnostic Status field',
        '1': 'The coin dispenser low thresholds for each coin hopper were not set during the configuration of the SST. No coins have been dispensed',
        '3': 'No coins have been dispensed. The coin dispense has not started as the requested hopper is: ' +
            'in a fatal state / out of coins / not in the correct position to allow a dispense / ' +
            'in a low condition without enough coins to perform the dispense',
        '4': 'The coin dispense has failed for a reason other than a jam. Some coins may have been dispensed',
        '9': 'The coin dispense has failed due to a jam in the hopper. Some coins may have been dispensed',
        ':': 'The coin dispense has failed due to a jam in the transport chute. Some coins may have been dispensed',
        ';': 'The transport chute exit sensor was blocked at the start of the coin dispense. No coins have been dispensed',
        '<': 'A coin dispense has been attempted while the coin dispenser is in a fatal state. No coins have been dispensed',
        '=': 'Tampering detected during dispense. The coin dispense has failed due to the module being accessed during the dispense. Some coins may have been dispensed'
    },

    noteAcceptorStatuses: {
        '0': 'Successful operation, but an exception has occurred or notes have been moved in the device outside a Transaction Reply function. Up to date counts are included, which will be in the escrow notes field (refundable deposits) or the vaulted notes field (direct deposits). In this case, both counts are cumulative within the transaction. It is also possible for a w0 code to be returned when notes are refunded for example, in the Close state. In this case, counts are reported in the Refunded counts fields',
        '1': 'Cancel selected, Refund selected or a time-out occurs during the Cash Accept state. Note counts will be in the escrow notes field (refundable deposit) or the vaulted notes field (direct deposit). N/A "2" Reserved for legacy implementations',
        '2': 'Reserved for lagacy implementations',
        '3': 'Error - if counts are included, they are as accurate as the available information allows, except for notes left in the escrow in the Close state when the note counts are accurate',
        '4': 'Device inoperative - notes are left at the exit slot; counts are included. Usually this is returned counts in the w4 message as notes are at the exit slot',
        '5': 'No notes in the escrow when the Transaction Reply function attempts to vault escrowed notes or return cash, indicating an error at the host',
        '6': 'Notes detected at power-up; if automatic error recovery is disabled counts are included in the escrow counts field; if automatic error recovery is enabled and the notes are successfully moved, the counts will be in the vaulted counts field',
        '7': 'Notes not taken, but retracted; counts are included in the Vaulted Counts field. (not reported on cash acceptors that do not support retract operations or with retract disabled)',
        '8': 'Unable to be vaulted',
        '9': 'Reserved for legacy implementations',
        '?': 'Counterfeit notes have been detected',
        '@': 'Suspect notes have been detected'
    },

    products: {
        '0E': '5663',
        '0F': '5674',
        '10': '5675',
        '11': '5684',
        '12': '5685',
        '13': '5688',
        '14': '5665',
        '15': '5670',
        '16': 'Personas 75',
        '17': 'Personas 88',
        '18': 'Personas 40',
        '19': 'Personas 70',
        '1A': 'Personas 74',
        '1B': 'Personas 84',
        '1C': 'Personas 85',
        '1D': 'Personas 90',
        '1E': 'EasyPoint 55 or EasyPoint 57',
        '1F': 'Personas 86',
        '20': '5588',
        '21': 'Personas 73',
        '22': 'Personas 72',
        '23': 'Personas 77',
        '24': '6674',
        '25': '6676',
        '26': '5879',
        '27': '5887',
        '28': '5362',
        '29': 'Personas 71',
        '2A': '5867',
        '30': '6622',
        '31': '6624',
        '32': '6626',
        '33': '6628',
        '34': '6631',
        '35': '6632',
        '36': '6634',
        '37': '6638',
        '38': '6625',
        '39': '6618',
        '3A': '6636',
        '3B': '2012 (SelfServ 22e)',
        '3C': '2016 (SelfServ 16)',
        '3D': '6642 (SelfServ 42)',
        '3E': '2004 (SelfServ 4)',
        '3F': '2008 (SelfServ 8)',
        '40': '2014 (SelfServ 14)'
    },

    specificErrors: {
        '1': 'MAC Failure. Result of MAC verification did not equal the MAC field in the message',
        '2': 'Time Variant Number Failure. ' +
            'The time variant number received in the last Transaction Reply message is not the same as the last transmitted value',
        '3': 'Security Terminal Number Mismatch. ' +
            'The number received in the last transaction reply security terminal number is not the same as the number held in the SST',
        'A01': 'Message length error',
        'A02': 'Field Separator missing/unexpectedly found',
        'A03': 'Transaction Reply message has too many print groups',
        'A04': 'Group Separator missing/unexpectedly found',
        'A05': 'Reserved',
        'A06': 'Invalid dispense message, wrong format for current mode or a request has been made to dispense from multiple dispensers',
        'A07': 'Malformed XML',
        'A08': 'XML does not conform to XML schema',
        'A09': 'Inconsistent XML Configuration download',
        'B01': 'Illegal Message Class',
        'B02': 'Illegal Message Sub-Class or Identifier',
        'B03': 'Illegal Encryption Key Change or Extended Encryption Key Change Message Modifier',
        'B04': 'Illegal Terminal Command Code',
        'B05': 'Illegal Terminal Command Modifier',
        'B06': 'Illegal Transaction Reply Function Identifier',
        'B07': 'Data field contains non-decimal digit',
        'B08': 'Data field value out of range',
        'B09': 'Invalid Message Coordination number',
        'B10': 'Illegal FIT number',
        'B11': 'Invalid dispense mix specified. No notes or coins were specified or too many notes or coins were specified in a dispense function',
        'B12': 'Reserved',
        'B13': 'Unrecognised Document Destination',
        'B14': 'Reserved',
        'B15': 'Unrecognised Buffer Identifier',
        'B16': 'Reserved',
        'B17': 'Document Name Error',
        'B18': 'The screen identifier is out of range',
        'B19': 'Reserved',
        'B20': 'No data supplied to endorse cheque',
        'B21': 'Reserved',
        'B22': 'Invalid Encryption Key Size',
        'B23': 'RSA Signature Verification Failed',
        'B24': 'Signature or Encryption Key PKCS#1 Packing Failed',
        'B25': 'Signature or Encryption Key PKCS#1 Unpacking Failed',
        'B26': 'Invalid Signature or Encryption Key PKCS#1 Pad Block Type',
        'B27': 'Fixed Header Decryption Failed',
        'B28': 'Null Byte After Padding Missing',
        'B29': 'Invalid Pad Byte Count',
        'B33': 'Invalid Cassette Type',
        'B34': 'Invalid/Incomplete Cheque Identifier(s)',
        'B35': 'Passbook update not supported in specified Transaction Reply Function',
        'C01': 'Message type only accepted while SST is In-Service and expecting a Transaction Reply',
        'C02': 'Message not accepted while diagnostics is in progress. This is returned when the application has passed control to VDM',
        'C03': 'Message not accepted while in Out-of-Service or Supply mode',
        'C04': 'Message not accepted while in In-Service mode',
        'C05': 'Message not allowed while configured for NCR status message mode',
        'C06': 'Message not allowed while SST is configured for Diebold status message mode',
        'C10': 'Message not accepted while processing a Transaction Reply',
        'C11': 'Cheque not present in cheque processor transport while processing a Transaction Reply',
        'C15': 'Encryption Key Change or Extended Encryption Key Change message not accepted during a cardholder transaction, ' +
            'or while the SST is in suspend mode, or while the operator is initiating the execution of supervisory/ settlement transactions',
        'C17': 'Key change operation cannot be accepted in restricted encryption mode. ' +
            'This applies when an Extended Encryption Key Change message with modifier "3", "4", "6" or "7" is received in restricted mode',
        'C18': 'Key entry mode not authorised',
        'D01': 'Encryption failure during Encryption Key Change or Extended Encryption Key Change message',
        'D02': 'Time-of-Day Clock failure or invalid data sent during Date/Time Set command',
        'D06': 'Insufficient disk space',
        'D07': 'File IO error',
        'D08': 'File not found',
        'E01': 'Function not supported by software. For example, a DLL required to complete the transaction reply processing is missing',
        'E02': 'Required device not configured. Also, sideways print on the receipt is requested, ' +
            'but either the printer does not have the capability or has not been configured for sideways printing',
        'E05': 'Journal printer backup inactive',
        'E06': 'The data requested is not compatible with the required response message'
    }
};
