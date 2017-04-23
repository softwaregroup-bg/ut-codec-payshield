var merge = require('lodash.merge');
var map = require('./ndcMap');
var defaultFormat = require('./ndc.messages');

function NDC(config, validator, logger) {
    this.fieldSeparator = config.fieldSeparator || '\u001c';
    this.val = validator || null;
    this.log = logger || {};
    this.codes = {};
    this.init(config);
    return this;
}

NDC.prototype.init = function(config) {
    this.messageFormat = merge({}, defaultFormat, config.messageFormat);
    Object.keys(this.messageFormat).forEach((name) => {
        var mf = this.messageFormat[name];
        mf.fieldsSplit = mf.fields.split(',');
        mf.method = name;
        var code = (mf.values.messageClass || '') + (mf.values.messageSubclass || '') + '|' + (mf.values.commandCode || '') + (mf.values.commandModifier || '');
        this.codes[code] = mf;
    });
};

var parsers = {
    // solicited descriptors
    transactionReady: (transactionSerialNumber, transactionData) => ({
        transactionSerialNumber,
        transactionData
    }),
    specificReject: (status) => {
        var e = new Error(map.specificErrors[status] || 'Specific command reject');
        e.type = 'aptra.commandReject.' + status;
        throw e;
    },
    fault: (deviceIdentifierAndStatus, severities, diagnosticStatus, suppliesStatus) => {
        var deviceStatus = deviceIdentifierAndStatus && deviceIdentifierAndStatus.substring && deviceIdentifierAndStatus.substring(1);
        var device =
            deviceIdentifierAndStatus &&
            deviceIdentifierAndStatus.substring &&
            (map.devices[deviceIdentifierAndStatus.substring(0, 1)] || deviceIdentifierAndStatus.substring(0, 1));
        var result = {
            device,
            deviceStatus,
            severities: severities && severities.split && severities.split('').map((severity) => map.severities[severity]),
            diagnosticStatus,
            supplies: suppliesStatus && suppliesStatus.split && suppliesStatus.split('').map((status) => map.supplies[status])
        };
        if (device && device.length > 1 && typeof parsers[device] === 'function') {
            merge(result, parsers[device](deviceStatus));
        }
        return result;
    },
    ready: () => ({}),
    state: function(status) { // do not change to arrow function as proper this and arguments are needed
        var g1 = status.substring(0, 1);
        var fn = g1 && map.statuses[g1] && this[map.statuses[g1]];
        if (typeof fn === 'function') {
            return merge({
                statusType: map.statuses[g1]
            }, fn.apply(this, arguments));
        }
    },

    // terminal state statuses
    supplyCounters: (counters) => (counters && counters.substring && {
        transactionSerialNumber: counters.substring(1, 5),
        transactionCount: Number.parseInt(counters.substring(5, 12), 10),
        notes1: Number.parseInt(counters.substring(12, 17), 10),
        notes2: Number.parseInt(counters.substring(17, 22), 10),
        notes3: Number.parseInt(counters.substring(22, 27), 10),
        notes4: Number.parseInt(counters.substring(27, 32), 10),
        session: {
            cassettes: [
                {count: Number.parseInt(counters.substring(12, 17), 10)},
                {count: Number.parseInt(counters.substring(17, 22), 10)},
                {count: Number.parseInt(counters.substring(22, 27), 10)},
                {count: Number.parseInt(counters.substring(27, 32), 10)}
            ]
        },
        rejected1: Number.parseInt(counters.substring(32, 37), 10),
        rejected2: Number.parseInt(counters.substring(37, 42), 10),
        rejected3: Number.parseInt(counters.substring(42, 47), 10),
        rejected4: Number.parseInt(counters.substring(47, 52), 10),
        dispensed1: Number.parseInt(counters.substring(52, 57), 10),
        dispensed2: Number.parseInt(counters.substring(57, 62), 10),
        dispensed3: Number.parseInt(counters.substring(62, 67), 10),
        dispensed4: Number.parseInt(counters.substring(67, 72), 10),
        last1: Number.parseInt(counters.substring(72, 77), 10),
        last2: Number.parseInt(counters.substring(77, 82), 10),
        last3: Number.parseInt(counters.substring(82, 87), 10),
        last4: Number.parseInt(counters.substring(87, 92), 10),
        captured: Number.parseInt(counters.substring(92, 97), 10)
    }),
    datetime: (status) => (status && status.substring && {
        clockStatus: status.substring(0, 1),
        datetime: status.substring(1)
    }),
    configurationId: (config) => ({
        configId: config.substring(1)
    }),
    configuration: (config, hwFitness, hwConfig, supplies, sensors, release, softwareId) => {
        var sensorValues = parsers.sensors(' ' + sensors, true);
        return {cofigId: config.substring(1),
            session: {
                cassettes: [
                    {sensor: sensorValues.cassette1, fitness: map.severities[hwFitness.substring(15, 16)], supplies: map.suppliesStatus[supplies.substring(15, 16)]},
                    {sensor: sensorValues.cassette2, fitness: map.severities[hwFitness.substring(16, 17)], supplies: map.suppliesStatus[supplies.substring(16, 17)]},
                    {sensor: sensorValues.cassette3, fitness: map.severities[hwFitness.substring(17, 18)], supplies: map.suppliesStatus[supplies.substring(17, 18)]},
                    {sensor: sensorValues.cassette4, fitness: map.severities[hwFitness.substring(18, 19)], supplies: map.suppliesStatus[supplies.substring(18, 19)]}
                ]
            },
            fitness: hwFitness && hwFitness.substring && {
                clock: map.severities[hwFitness.substring(0, 1)],
                comms: map.severities[hwFitness.substring(1, 2)],
                disk: map.severities[hwFitness.substring(2, 3)],
                cardReader: map.severities[hwFitness.substring(3, 4)],
                cashHandler: map.severities[hwFitness.substring(4, 5)],
                depository: map.severities[hwFitness.substring(5, 6)],
                receiptPrinter: map.severities[hwFitness.substring(6, 7)],
                journalPrinter: map.severities[hwFitness.substring(7, 8)],
                nightDepository: map.severities[hwFitness.substring(10, 11)],
                encryptor: map.severities[hwFitness.substring(11, 12)],
                camera: map.severities[hwFitness.substring(12, 13)],
                doorAccess: map.severities[hwFitness.substring(13, 14)],
                flexDisk: map.severities[hwFitness.substring(14, 15)],
                cassette1: map.severities[hwFitness.substring(15, 16)],
                cassette2: map.severities[hwFitness.substring(16, 17)],
                cassette3: map.severities[hwFitness.substring(17, 18)],
                cassette4: map.severities[hwFitness.substring(18, 19)],
                statementPrinter: map.severities[hwFitness.substring(21, 22)],
                signageDisplay: map.severities[hwFitness.substring(22, 23)],
                systemDisplay: map.severities[hwFitness.substring(25, 26)],
                mediaEntry: map.severities[hwFitness.substring(26, 27)],
                envelopeDispenser: map.severities[hwFitness.substring(27, 28)],
                documentProcessing: map.severities[hwFitness.substring(28, 29)],
                coinDispenser: map.severities[hwFitness.substring(29, 30)],
                voiceGuidance: map.severities[hwFitness.substring(32, 33)],
                noteAcceptor: map.severities[hwFitness.substring(34, 35)],
                chequeProcessor: map.severities[hwFitness.substring(35, 36)]
            },
            hwConfig,
            supplyStatus: supplies && supplies.substring && {
                cardReader: map.suppliesStatus[supplies.substring(3, 4)],
                depository: map.suppliesStatus[supplies.substring(5, 6)],
                receiptPrinter: map.suppliesStatus[supplies.substring(6, 7)],
                journalPrinter: map.suppliesStatus[supplies.substring(7, 8)],
                rejectBin: map.suppliesStatus[supplies.substring(4, 5)],
                cassette1: map.suppliesStatus[supplies.substring(15, 16)],
                cassette2: map.suppliesStatus[supplies.substring(16, 17)],
                cassette3: map.suppliesStatus[supplies.substring(17, 18)],
                cassette4: map.suppliesStatus[supplies.substring(18, 19)]
            },
            sensors: sensorValues,
            release,
            softwareId
        };
    },
    hardware: (configuration, product, hardwareConfiguration) => ({
        configId: configuration.substring(2),
        product: product && product.substring && (map.products[product.substring(1)] || ('product' + product.substring(1))),
        hardwareConfiguration: hardwareConfiguration.split('\u001d')
    }),
    supplies: (statuses) => (statuses && statuses.substring && {
        suppliesStatus: statuses.substring(2).split('\u001d').reduce((prev, cur) => {
            var device = cur && cur.substring && map.devices[cur.substring(0, 1)];
            device && (prev[device] = cur.substring(1).split('').map((status) => map.suppliesStatus[status]));
            return prev;
        }, {})
    }),
    fitness: (statuses) => (statuses && statuses.substring && {
        fitnessStatus: statuses.substring(2).split('\u001d').reduce((prev, cur) => {
            var device = cur && cur.substring && map.devices[cur.substring(0, 1)];
            device && (prev[device] = cur.substring(1).split('').map((status) => map.severities[status]));
            return prev;
        }, {})
    }),
    sensor: (sensor, tamper) => (sensor && sensor.substring && tamper && tamper.substring && parsers.sensors(' ' + sensor.substring(2) + tamper.substring(1))),
    release: (release, software) => ({
        release: release && release.substring && release.substring(2).match(/.{1,2}/g),
        software: software && software.substring && software.substring(1)
    }),
    optionDigits: (optionDigits) => ({
        optionDigits: optionDigits && optionDigits.substring && optionDigits.substring(2).split('')
    }),
    depositDefition: (acceptedCashItems) => ({
        acceptedCashItems: acceptedCashItems && acceptedCashItems.substring && acceptedCashItems.substring(2).match(/.{11}/g)
    }),

    // devices
    clock: (status) => (status && status.substring && {
        deviceStatusDescription: map.clockStatuses[status.substring(0, 1)]
    }),
    power: (config) => ({
        config
    }),
    cardReader: (status) => (status && status.substring && {
        deviceStatusDescription: map.cardReaderStatuses[status.substring(0, 1)]
    }),
    cashHandler: (status) => (status && status.substring && {
        deviceStatusDescription: map.cashHandlerStatuses[status.substring(0, 1)],
        dispensed1: status.substring(1, 3),
        dispensed2: status.substring(3, 5),
        dispensed3: status.substring(5, 7),
        dispensed4: status.substring(7, 9)
    }),
    depository: (status) => (status && status.substring && {
        deviceStatusDescription: map.depositoryStatuses[status.substring(0, 1)]
    }),
    receiptPrinter: (status) => (status && status.substring && {
        deviceStatusDescription: map.receiptPrinterStatuses[status.substring(0, 1)]
    }),
    journalPrinter: (status) => (status && status.substring && {
        deviceStatusDescription: map.journalPrinterStatuses[status.substring(0, 1)]
    }),
    encryptor: (status) => (status && status.substring && {
        deviceStatusDescription: map.encryptorStatuses[status.substring(0, 1)]
    }),
    camera: (status) => ({}),
    sensors: (status, skipSession) => (status && status.substring && {
        deviceStatusDescription: map.sensorStatuses[status.substring(0, 1)],
        supervisorMode: map.sensors[status.substring(1, 2)],
        vibration: (status.substring(0, 1) !== '2') && map.sensors[status.substring(2, 3)],
        door: map.sensors[status.substring(3, 4)],
        silentSignal: map.sensors[status.substring(4, 5)],
        electronicsEnclosure: map.sensors[status.substring(5, 6)],
        depositBin: map.sensors[status.substring(6, 7)],
        cardBin: map.sensors[status.substring(7, 8)],
        rejectBin: map.sensors[status.substring(8, 9)],
        cassette1: map.sensors[status.substring(9, 10)],
        cassette2: map.sensors[status.substring(10, 11)],
        cassette3: map.sensors[status.substring(11, 12)],
        cassette4: map.sensors[status.substring(12, 13)],
        session: skipSession ? undefined : {
            cassettes: [
                {sensor: map.sensors[status.substring(9, 10)]},
                {sensor: map.sensors[status.substring(10, 11)]},
                {sensor: map.sensors[status.substring(11, 12)]},
                {sensor: map.sensors[status.substring(12, 13)]}
            ]
        },
        coinDispenser: map.sensors[status.substring(13, 14)],
        coinHopper1: map.sensors[status.substring(14, 15)],
        coinHopper2: map.sensors[status.substring(15, 16)],
        coinHopper3: map.sensors[status.substring(16, 17)],
        coinHopper4: map.sensors[status.substring(17, 18)],
        cpmPockets: map.sensors[status.substring(18, 19)]
    }),
    supervisorKeys: (status) => ({
        menu: status
    }),
    statementPrinter: (status) => ({
        deviceStatusDescription: map.statementPrinterStatuses[status.substring(0, 1)]
    }),
    coinDispenser: (status) => ({
        deviceStatusDescription: map.coinDispenserStatuses[status.substring(0, 1)],
        coinsDispensed: status.substring(1).match(/.{1,2}/g)
    }),
    voiceGuidance: (status) => ({}),
    noteAcceptor: (status) => (status && status.substring && {
        deviceStatusDescription: map.noteAcceptorStatuses[status.substring(0, 1)]
    }),

    // message classes
    unsolicitedStatus: function(type, luno, reserved, deviceIdentifierAndStatus, errorSeverity, diagnosticStatus, suppliesStatus) {
        return this.fault(deviceIdentifierAndStatus, errorSeverity, diagnosticStatus, suppliesStatus);
    },
    solicitedStatus: function(type, luno, reserved, descriptor, status) {
        var fn = descriptor && map.descriptors[descriptor] && this[map.descriptors[descriptor]];
        if (typeof fn === 'function') {
            return merge({
                luno,
                descriptor: map.descriptors[descriptor]
            }, fn.apply(this, Array.prototype.slice.call(arguments, 4)));
        }
    },
    encryptorIniData: (type, luno, reserved, identifier, info) => {
        switch (identifier) {
            case '4':
                return {
                    masterKvv: info.substring && info.substring(0, 6)
                };
            case '3':
                return {
                    newKvv: info.substring && info.substring(0, 6)
                };
        }
        return {};
    },
    uploadEjData: (type, luno, reserved1, reserved2, journalData) => ({
        type,
        luno,
        journalData
    }),
    lastTransaction: fields => {
        var result = fields.find(field => field.substring(0, 1) === '2');
        result = result && result.match(/^2(\d{4})(\d)(\d{5})(\d{5})(\d{5})(\d{5})/);
        return result && {
            sernum: result[1],
            status: result[2],
            notes1: parseInt(result[3]),
            notes2: parseInt(result[4]),
            notes3: parseInt(result[5]),
            notes4: parseInt(result[6])
        };
    },
    pinBlock: pin => pin && pin.split && pin.split('').map((c) => ({
        ':': 'A',
        ';': 'B',
        '<': 'C',
        '=': 'D',
        '>': 'E',
        '?': 'F'
    }[c] || c)).join(''),
    pinBlockNew: fields => {
        var result = fields.find(field => field.substring(0, 1) === 'U');
        return result && parsers.pinBlock(result.substr(1, 16));
    },
    transaction: function(type, luno, reserved, timeVariantNumber, trtfmcn, track2, track3, opcode, amount, pinBlock, bufferB, bufferC) {
        return {
            type,
            luno,
            reserved,
            timeVariantNumber,
            topOfReceipt: trtfmcn && trtfmcn.substring && trtfmcn.substring(0, 1),
            coordination: trtfmcn && trtfmcn.substring && trtfmcn.substring(1, 2),
            track2,
            track3,
            opcode: opcode && opcode.split && opcode.split(''),
            amount,
            pinBlock: parsers.pinBlock(pinBlock),
            pinBlockNew: parsers.pinBlockNew(Array.prototype.slice.call(arguments, 12)),
            bufferB,
            bufferC,
            lastTransactionData: parsers.lastTransaction(Array.prototype.slice.call(arguments, 12))
        };
    },
    transactionReply: (type, luno, timeVariantNumber, nextState, notes, sernumFunction, coordinationCardPrinter) => ({
        type,
        luno,
        timeVariantNumber,
        nextState,
        notes,
        sernum: sernumFunction && sernumFunction.substring && sernumFunction.substring(0, 4),
        function: sernumFunction && sernumFunction.substring && sernumFunction.substring(4, 5),
        screen: sernumFunction && sernumFunction.substring && sernumFunction.substring(5, 8),
        screenUpdate: sernumFunction && sernumFunction.substring && sernumFunction.substring(8),
        coordination: coordinationCardPrinter && coordinationCardPrinter.substring && coordinationCardPrinter.substring(0, 1),
        cardReturn: coordinationCardPrinter && coordinationCardPrinter.substring && coordinationCardPrinter.substring(1, 2),
        printer: coordinationCardPrinter && coordinationCardPrinter.substring && coordinationCardPrinter.substring(2, 3),
        printerData: coordinationCardPrinter && coordinationCardPrinter.substring && coordinationCardPrinter.substring(3)
    }), // sim
    keyReadKvv: () => ({}), // sim
    keyChangeTak: () => ({}), // sim
    keyChangeTpk: () => ({}), // sim
    currencyMappingLoad: () => ({}), // sim
    sendConfigurationId: () => ({}), // sim
    paramsLoadEnhanced: () => ({}), // sim
    dateTimeLoad: () => ({}), // sim
    screenDataLoad: () => ({}), // sim
    stateTableLoad: () => ({}), // sim
    fitDataLoad: () => ({}), // sim
    configIdLoad: () => ({}), // sim
    sendConfiguration: () => ({}), // sim
    sendConfigurationHardware: () => ({}), // sim
    sendConfigurationSuplies: () => ({}), // sim
    sendConfigurationFitness: () => ({}), // sim
    sendConfigurationSensor: () => ({}), // sim
    sendConfigurationRelease: () => ({}), // sim
    sendConfigurationOptionDigits: () => ({}), // sim
    sendConfigurationDepositDefinition: () => ({}), // sim
    emvCurrency: () => ({}), // sim
    emvTransaction: () => ({}), // sim
    emvLanguage: () => ({}), // sim
    emvTerminal: () => ({}), // sim
    emvApplication: () => ({}), // sim
    sendSupplyCounters: () => ({}), // sim
    goInService: () => ({}), // sim
    goOutOfServiceTemp: () => ({}), // sim
    goOutOfService: () => ({}), // sim
    ejOptions: () => ({}), // sim
    ejAck: () => ({}) // sim
};

NDC.prototype.decode = function(buffer, $meta, context) {
    var message = {};
    var bufferString = buffer.toString();
    if (buffer.length > 0) {
        var tokens = bufferString.split(this.fieldSeparator);
        var command;
        switch (tokens[0]) {
            case '1':
            case '3':
                command = this.codes[`${tokens[0]}|${tokens[3]}`];
                break;
            case '8':
                command = this.codes[`${tokens[0]}${tokens[2]}|`];
                break;
            case '6':
                command = this.codes[`${tokens[0]}|${tokens[3].charAt(0)}`];
                break;
            default:
                command = this.codes[`${tokens[0]}|`];
                break;
        }
        if (command) {
            $meta.mtid = command.mtid;
            $meta.method = (command.mtid === 'response' ? '' : 'aptra.') + command.method;
            message = {session: context.session};

            switch ($meta.method) {
                case 'solicitedStatus':
                    if (tokens[3] != null && (tokens[3].length === 8 || tokens[3].length === 0)) { // mac is active
                        message.timeVariantNumber = tokens[3];
                        tokens.splice(3, 1);
                    };
                    if (tokens[3] === 'B' || tokens[3] === '8') {
                        context.traceTransactionReady = context.traceTransactionReady || 1;
                        $meta.trace = 'trn:' + context.traceTransactionReady;
                        context.traceTransactionReady += 1;
                    } else {
                        context.traceTerminal = context.traceTerminal || 1;
                        $meta.trace = 'req:' + context.traceTerminal;
                        context.traceTerminal += 1;
                    }
                    break;
                case 'encryptorIniData':
                    context.traceTerminalKeys = context.traceTerminalKeys || 1;
                    $meta.trace = 'keys:' + context.traceTerminalKeys;
                    context.traceTerminalKeys += 1;
                    break;
                case 'aptra.transactionReply': // sim
                    $meta.mtid = 'response';
                    context.traceTransactionReady = context.traceTransactionReady || 1;
                    $meta.trace = 'trn:' + context.traceTransactionReady;
                    context.traceTransactionReady += 1;
                    break;
            }

            var fn = parsers[command.method];
            if (typeof fn === 'function') {
                try {
                    merge(message, fn.apply(parsers, tokens));
                } catch (e) {
                    $meta.mtid = 'error';
                    message.type = e.type;
                    message.message = e.message;
                    if (!e.type) { // capture stack for unexpected errors
                        message.stack = e.stack;
                    }
                }
            } else {
                $meta.mtid = 'error';
                message.type = 'aptra.parser';
                message.message = 'No parser found for message: ' + command.method;
            }
            message.tokens = tokens;
        } else {
            $meta.mtid = 'error';
            message.type = 'aptra.unknownMessageClass';
            message.message = 'Received unknown message class: ' + tokens[0];
        }
    }

    return message;
};

NDC.prototype.encode = function(message, $meta, context) {
    if (typeof this.val === 'function') {
        this.val(message);
    }
    var bufferString = '';

    switch ($meta.opcode) {
        case 'terminalCommand':
        case 'goInService':
        case 'goOutOfService':
        case 'goOutOfServiceTemp':
        case 'sendConfigurationId':
        case 'sendSupplyCounters':
        case 'paramsLoadEnhanced':
        case 'currencyMappingLoad':
        case 'stateTableLoad':
        case 'screenDataLoad':
        case 'fitDataLoad':
        case 'dateTimeLoad':
        case 'configIdLoad':
        case 'sendConfiguration':
        case 'sendConfigurationHardware':
        case 'sendConfigurationSuplies':
        case 'sendConfigurationFitness':
        case 'sendConfigurationSensor':
        case 'sendConfigurationRelease':
        case 'sendConfigurationEnhanced':
        case 'sendConfigurationOptionDigits':
        case 'sendConfigurationDepositDefinition':
        case 'emvCurrency':
        case 'emvTransaction':
        case 'emvLanguage':
        case 'emvTerminal':
        case 'emvApplication':
            context.traceCentral = context.traceCentral || 1;
            $meta.trace = 'req:' + context.traceCentral;
            context.traceCentral += 1;
            break;
        case 'keyReadKvv':
        case 'keyChangeTak':
        case 'keyChangeTpk':
            context.traceCentralKeys = context.traceCentralKeys || 1;
            $meta.trace = 'keys:' + context.traceCentralKeys;
            context.traceCentralKeys += 1;
            break;
        case 'transaction': // sim
        case 'transactionReply':
            context.traceTransaction = context.traceTransaction || 1;
            $meta.trace = 'trn:' + context.traceTransaction;
            context.traceTransaction += 1;
            break;
    }

    message.session && merge(context, {session: message.session});

    var command = this.messageFormat[$meta.opcode];
    if (command) {
        merge(message, command.values);
        // bufferString += command.messageClass;
        command.fieldsSplit.forEach((field) => {
            if (field.length) {
                if (field === 'FS') {
                    bufferString += this.fieldSeparator;
                } else {
                    bufferString += message[field] || '';
                }
            }
        });
        if (message.mac) {
            bufferString += this.fieldSeparator + message.mac;
        }
        return new Buffer(bufferString);
    }
};

module.exports = NDC;

// todo checkMac
// todo CashHandlerAlert / CassetteSupplyStatus
// todo ReceiptPrinterAlert / JournalPrinterAlert / PaperSupplyStatus / PrinterPartStatus
// todo OtherDeviceFaultAlert
// todo handle when solicited status is not matched to request
