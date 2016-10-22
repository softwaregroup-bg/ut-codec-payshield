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
        this.codes[(mf.values.messageClass || '') + (mf.values.messageSubclass || '')] = mf;
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
    supplyCounters: (supplies) => (supplies && supplies.substring && {
        transactionSerialNumber: supplies.substring(1, 5),
        transactionCount: supplies.substring(5, 12),
        notes1: supplies.substring(12, 17),
        notes2: supplies.substring(17, 22),
        notes3: supplies.substring(22, 27),
        notes4: supplies.substring(27, 32),
        rejected1: supplies.substring(32, 37),
        rejected2: supplies.substring(37, 42),
        rejected3: supplies.substring(42, 47),
        rejected4: supplies.substring(47, 52),
        dispensed1: supplies.substring(52, 57),
        dispensed2: supplies.substring(57, 62),
        dispensed3: supplies.substring(62, 67),
        dispensed4: supplies.substring(67, 72),
        last1: supplies.substring(72, 77),
        last2: supplies.substring(77, 82),
        last3: supplies.substring(82, 87),
        last4: supplies.substring(87, 92),
        captured: supplies.substring(92, 97)
    }),
    datetime: (status) => (status && status.substring && {
        clockStatus: status.substring(0, 1),
        datetime: status.substring(1)
    }),
    configurationId: (config) => ({
        cofigurationId: config.substring(1)
    }),
    configuration: (config, hwFitness, hwConfig, supplies, sensors, release, softwareId) => ({
        cofigId: config.substring(1),
        hwFitness,
        hwConfig,
        supplies: supplies && supplies.substring && {
            cardReader: [map.suppliesStatus[supplies.substring(3, 4)]],
            depository: [map.suppliesStatus[supplies.substring(5, 6)]],
            receiptPrinter: [map.suppliesStatus[supplies.substring(6, 7)]],
            journalPrinter: [map.suppliesStatus[supplies.substring(7, 8)]],
            cashHandler: [
                map.suppliesStatus[supplies.substring(4, 5)],
                map.suppliesStatus[supplies.substring(15, 16)],
                map.suppliesStatus[supplies.substring(16, 17)],
                map.suppliesStatus[supplies.substring(17, 18)],
                map.suppliesStatus[supplies.substring(18, 19)]
            ]
        },
        sensors: parsers.sensors(' ' + sensors),
        release,
        softwareId
    }),
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
    sensors: (status) => (status && status.substring && {
        deviceStatusDescription: map.sensorStatuses[status.substring(0, 1)],
        supervisorMode: map.sensors[status.substring(1, 2)],
        vibrationSensor: (status.substring(0, 1) !== '2') && map.sensors[status.substring(2, 3)],
        doorSensor: map.sensors[status.substring(3, 4)],
        silentSignalSensor: map.sensors[status.substring(4, 5)],
        electronicsEnclosureSensor: map.sensors[status.substring(5, 6)],
        depositBin: map.sensors[status.substring(6, 7)],
        cardBin: map.sensors[status.substring(7, 8)],
        rejectBin: map.sensors[status.substring(8, 9)],
        cassette1: map.sensors[status.substring(9, 10)],
        cassette2: map.sensors[status.substring(10, 11)],
        cassette3: map.sensors[status.substring(11, 12)],
        cassette4: map.sensors[status.substring(12, 13)],
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
    transaction: (type, luno, reserved, timeVariantNumber, trtfmcn, track2, track3, opcode, amount, pin, bufferB, bufferC) => ({
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
        pinBlock: pin && pin.split && pin.split('').map((c) => ({
            ':': 'A',
            ';': 'B',
            '<': 'C',
            '=': 'D',
            '>': 'E',
            '?': 'F'
        }[c] || c)).join(''),
        bufferB,
        bufferC
    })
};

NDC.prototype.decode = function(buffer, $meta, context) {
    var message = {};
    var bufferString = buffer.toString();
    if (buffer.length > 0) {
        var tokens = bufferString.split(this.fieldSeparator);
        var command = this.codes[tokens[0]];
        if (command) {
            $meta.mtid = command.mtid;
            $meta.method = command.method;

            switch ($meta.method) {
                case 'solicitedStatus':
                    if (tokens[3] === 'B') {
                        context.traceTransactionReady |= 1;
                        $meta.trace = context.traceTransactionReady;
                        context.traceTransactionReady += 1;
                    } else {
                        context.traceTerminal |= 1;
                        $meta.trace = context.traceTerminal;
                        context.traceTerminal += 1;
                    }
                    break;
                case 'encryptorIniData':
                    context.traceTerminalKeys |= 1;
                    $meta.trace = context.traceTerminalKeys;
                    context.traceTerminalKeys += 1;
                    break;
            }

            message = {};
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
            }
            message.tokens = tokens;
        }
    }

    return message;
};

NDC.prototype.encode = function(message, $meta, context) {
    if (typeof this.val === 'function') {
        this.val(message);
    }
    var bufferString = '';

    switch ($meta.method) {
        case 'terminalCommand':
        case 'goInService':
        case 'goOutOfService':
        case 'sendConfigurationId':
        case 'sendSupplyCounters':
        case 'paramsLoadEnhanced':
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
            context.traceCentral |= 1;
            $meta.trace = context.traceCentral;
            context.traceCentral += 1;
            break;
        case 'keyReadKVV':
        case 'keyChangeMac':
        case 'keyChangeTpk':
            context.traceCentralKeys |= 1;
            $meta.trace = context.traceCentralKeys;
            context.traceCentralKeys += 1;
            break;
        case 'transactionReply':
            context.traceTransaction |= 1;
            $meta.trace = context.traceTransaction;
            context.traceTransaction += 1;
            break;
    }

    var command = this.messageFormat[$meta.method];
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
        return new Buffer(bufferString);
    }
};

module.exports = NDC;
