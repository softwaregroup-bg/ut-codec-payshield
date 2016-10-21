var merge = require('lodash.merge');
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

var devices = {
    'A': 'clock',
    'B': 'power',
    'D': 'cardReader',
    'E': 'cashHandler',
    'F': 'depository',
    'G': 'receiptPrinter',
    'H': 'journalPrinter',
    'L': 'encryptor',
    'M': 'camera',
    'P': 'sensors',
    'R': 'other'
};

var descriptors = {
    '8': 'fault',
    '9': 'ready',
    'A': 'reject',
    'B': 'transactionReady',
    'C': 'specificReject',
    'F': 'state'
};

var statuses = {
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
};

var parsers = {
    power: (config) => ({
        device: 'power',
        config
    }),
    transactionReady: (transactionSerialNumber, transactionData) => ({
        transactionSerialNumber,
        transactionData
    }),
    specificReject: (status) => ({
        status
    }),
    fault: () => ({}),
    ready: () => ({}),
    configurationId: (config) => ({
        cofig: config.substring(1)
    }),
    configuration: (config, hwFitness, hwConfig, supplies, sensors, release, softwareId) => ({
        cofig: config.substring(1),
        hwFitness,
        hwConfig,
        supplies,
        sensors,
        release,
        softwareId
    }),
    supplyCounters: (supplies) => ({
        transactionSerialNumber: supplies && supplies.substring(1, 5),
        transactionCount: supplies && supplies.substring(5, 12),
        notes1: supplies && supplies.substring(12, 17),
        notes2: supplies && supplies.substring(17, 22),
        notes3: supplies && supplies.substring(22, 27),
        notes4: supplies && supplies.substring(27, 32),
        rejected1: supplies && supplies.substring(32, 37),
        rejected2: supplies && supplies.substring(37, 42),
        rejected3: supplies && supplies.substring(42, 47),
        rejected4: supplies && supplies.substring(47, 52),
        dispensed1: supplies && supplies.substring(52, 57),
        dispensed2: supplies && supplies.substring(57, 62),
        dispensed3: supplies && supplies.substring(62, 67),
        dispensed4: supplies && supplies.substring(67, 72),
        last1: supplies && supplies.substring(72, 77),
        last2: supplies && supplies.substring(77, 82),
        last3: supplies && supplies.substring(82, 87),
        last4: supplies && supplies.substring(87, 92),
        captured: supplies && supplies.substring(92, 97)
    }),
    state: function(status) { // do not change to arrow function
        var g1 = status.substring(0, 1);
        var fn = g1 && statuses[g1] && this[statuses[g1]];
        if (typeof fn === 'function') {
            return fn.apply(this, arguments);
        }
    },
    unsolicitedStatus: function(type, luno, reserved, status) {
        var deviceGraphic = status.substring(0, 1);
        var deviceStatus = status.substring(1, status.length);
        var deviceName = devices[deviceGraphic];
        if (deviceName && typeof this[deviceName] === 'function') {
            return this[deviceName](deviceStatus);
        } else {
            return {
                device: deviceGraphic,
                deviceStatus
            };
        }
    },
    solicitedStatus: function(type, luno, reserved, descriptor, status) {
        var fn = descriptor && descriptors[descriptor] && this[descriptors[descriptor]];
        if (typeof fn === 'function') {
            return merge({
                luno,
                descriptor: descriptors[descriptor]
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
                merge(message, fn.apply(parsers, tokens));
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
        case 'sendConfiguration':
        case 'sendSupplyCounters':
        case 'paramsLoadEnhanced':
        case 'stateTableLoad':
        case 'screenDataLoad':
        case 'fitDataLoad':
        case 'dateTimeLoad':
        case 'configIdLoad':
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
