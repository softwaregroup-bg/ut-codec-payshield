var bitsyntax = require('ut-bitsyntax');
var merge = require('lodash.merge');
var defaultFormat = require('./payshield.messages.json');

const ERRORCODES = {
    '00': 'No error',
    '01': 'Verification failure or warning of imported key parity error',
    '02': 'Key inappropriate length for algorithm',
    '04': 'Invalid key type code',
    '05': 'Invalid key length flag',
    '10': 'Source key parity error',
    '11': 'Destination key parity error or key all zeros',
    '12': 'Contents of user storage not available. Reset, power-down or overwrite',
    '13': 'Invalid LMK Identifier',
    '14': 'PIN encrypted under LMK pair 02-03 is invalid',
    '15': 'Invalid input data (invalid format, invalid characters, or not enough data provided)',
    '16': 'Console or printer not ready or not connected',
    '17': 'HSM not in the Authorised state, or not enabled for clear PIN output, or both',
    '18': 'Document format definition not loaded',
    '19': 'Specified Diebold Table is invalid',
    '20': 'PIN block does not contain valid values',
    '21': 'Invalid index value, or index/block count would cause an overflow condition',
    '22': 'Invalid account number',
    '23': 'Invalid PIN block format code',
    '24': 'PIN is fewer than 4 or more than 12 digits in length',
    '25': 'Decimalisation Table error',
    '26': 'Invalid key scheme',
    '27': 'Incompatible key length',
    '28': 'Invalid key type',
    '29': 'Key function not permitted',
    '30': 'Invalid reference number',
    '31': 'Insufficient solicitation entries for batch',
    '33': 'LMK key change storage is corrupted',
    '39': 'Fraud detection',
    '40': 'Invalid checksum',
    '41': 'Internal hardware/software error: bad RAM, invalid error codes, etc.',
    '42': 'DES failure',
    '47': 'Algorithm not licensed',
    '49': 'Private key error, report to supervisor',
    '51': 'Invalid message header',
    '65': 'Transaction Key Scheme set to None',
    '67': 'Command not licensed',
    '68': 'Command has been disabled',
    '69': 'PIN block format has been disabled',
    '74': 'Invalid digest info syntax (no hash mode only)',
    '75': 'Single length key masquerading as double or triple length key',
    '76': 'Public key length error',
    '77': 'Clear data block error',
    '78': 'Private key length error',
    '79': 'Hash algorithm object identifier error',
    '80': 'Data length error. The amount of MAC data (or other data) is greater than or less than the expected amount.',
    '81': 'Invalid certificate header',
    '82': 'Invalid check value length',
    '83': 'Key block format error',
    '84': 'Key block check value error',
    '85': 'Invalid OAEP Mask Generation Function',
    '86': 'Invalid OAEP MGF Hash Function',
    '87': 'OAEP Parameter Error',
    '90': 'Data parity error in the request message received by the HSM',
    '91': 'Longitudinal Redundancy Check (LRC) character does not match the value computed over the input data (when the HSM has received a transparent async packet)',
    '92': 'The Count value (for the Command/Data field) is not between limits, or is not correct (when the HSM has received a transparent async packet)',
    'A1': 'Incompatible LMK schemes',
    'A2': 'Incompatible LMK identifiers',
    'A3': 'Incompatible keyblock LMK identifiers',
    'A4': 'Key block authentication failure',
    'A5': 'Incompatible key length',
    'A6': 'Invalid key usage',
    'A7': 'Invalid algorithm',
    'A8': 'Invalid mode of use',
    'A9': 'Invalid key version number',
    'AA': 'Invalid export field',
    'AB': 'Invalid number of optional blocks',
    'AC': 'Optional header block error',
    'AD': 'Key status optional block error',
    'AE': 'Invalid start date/time',
    'AF': 'Invalid end date/time',
    'B0': 'Invalid encryption mode',
    'B1': 'Invalid authentication mode',
    'B2': 'Miscellaneous keyblock error',
    'B3': 'Invalid number of optional blocks',
    'B4': 'Optional block data error',
    'B5': 'Incompatible components',
    'B6': 'Incompatible key status optional blocks',
    'B7': 'Invalid change field',
    'B8': 'Invalid old value',
    'B9': 'Invalid new value',
    'BA': 'No key status block in the keyblock',
    'BB': 'Invalid wrapping key',
    'BC': 'Repeated optional block',
    'BD': 'Incompatible key types'
};

function PayshieldCodec(config, val, log) {
    this.logFactory = log;
    this.log = {};
    this.val = val;
    this.commands = {};
    this.headerPattern = null;
    this.commandNames = {};
    this.init(config);
}

PayshieldCodec.prototype.init = function(config) {
    this.logFactory && (this.log = this.logFactory.createLog(config.logLevel, {
        name: config.id,
        context: 'PayShield codec'
    }));
    if (this.log.info) {
        this.log.info('Initializing Payshield parser! headerFormat: ' + config.headerFormat + ',messageFormat:' + config.messageFormat);
    }
    this.headerPattern = bitsyntax.parse('headerNo:' + config.headerFormat + ', code:2/string, body/binary');

    var commandsObj = merge({}, defaultFormat, config.messageFormat);

    if (this.headerPattern === false) {
        throw new Error('Cant parse header pattern!');
    }
    for (var property in commandsObj) {
        if (commandsObj.hasOwnProperty(property)) {
            if (commandsObj[property].requestPattern) {
                var requestPattern = bitsyntax.parse(commandsObj[property].requestPattern);
                if (!requestPattern) {
                    throw new Error('Cant parse request pattern for command:' + property + '!');
                }
                this.commands[property + ':request'] = {
                    pattern: requestPattern,
                    code: commandsObj[property].requestCode,
                    method: property,
                    mtid: 'request'
                };
                this.commandNames[commandsObj[property].requestCode] = property + ':request';
            }

            if (commandsObj[property].responsePattern) {
                var responsePattern = bitsyntax.parse(commandsObj[property].responsePattern);
                if (!responsePattern) {
                    throw new Error('Cant parse response pattern for command:' + property + '!');
                }
                this.commands[property + ':response'] = {
                    pattern: responsePattern,
                    code: commandsObj[property].responseCode,
                    method: property,
                    mtid: 'response'
                };
                this.commandNames[commandsObj[property].responseCode] = property + ':response';
            }
        }
    }
};

PayshieldCodec.prototype.decode = function(buff, $meta) {
    if (this.log.debug) {
        this.log.debug('PayshieldParser.decode buffer:' + buff.toString());
    }
    var headObj = bitsyntax.match(this.headerPattern, buff);
    if (!headObj) {
        throw new Error('Unable to match header to header pattern!');
    }

    var commandName = this.commandNames[headObj.code];
    if (!commandName) {
        throw new Error('Unknown response code:' + headObj.code);
    }
    var cmd = this.commands[commandName];
    if (!cmd) {
        throw new Error('Not implemented opcode:' + commandName + '!');
    }

    var bodyObj = bitsyntax.match(bitsyntax.parse('errorCode:2/string, rest/binary'), headObj.body);
    if (!bodyObj) {
        throw new Error('Unable to match response errorCode!');
    }
    // 00 = No error
    // 01 = Verification failure or warning of imported key parity error (in some cases is warning)
    // 02 = Key inappropriate length for algorithm (in some cases is warning)
    if (['00', '01', '02'].includes(bodyObj.errorCode)) {
        bodyObj = bitsyntax.match(cmd.pattern, headObj.body);
        if (!bodyObj) {
            throw new Error('Unable to match pattern for opcode:' + commandName + '!');
        }
        $meta.trace = headObj.headerNo;
        $meta.mtid = cmd.mtid;
        $meta.method = cmd.method;
    } else {
        $meta.trace = headObj.headerNo;
        $meta.mtid = 'error';
        $meta.method = cmd.method;
        bodyObj = {
            errorCode: 'payshield.' + bodyObj.errorCode,
            errorMessage: ERRORCODES[bodyObj.errorCode]
        };
    }
    return bodyObj;
};

PayshieldCodec.prototype.encode = function(data, $meta, context) {
    // TODO: add validation
    this.log.debug && this.log.debug('PayshieldParser.encode data:' + data);
    var commandName = $meta.method.split('.').pop() + ':' + $meta.mtid;

    if (this.commands[commandName] === undefined) {
        throw new Error('Not implemented opcode:' + commandName + '!');
    }

    var headerNo = $meta.trace;
    if (headerNo === undefined || headerNo === null) {
        headerNo = $meta.trace = ('000000' + context.trace).substr(-6);
        context.trace += 1;
        if (context.trace > 999999) {
            context.trace = 0;
        }
    }

    var bodyBuff = bitsyntax.build(this.commands[commandName].pattern, data);
    if (!bodyBuff) {
        throw new Error('Unable to build body of opcode:' + commandName + '!');
    }

    var cmdCode = this.commands[commandName].code;

    return bitsyntax.build(this.headerPattern, {
        headerNo: headerNo,
        code: cmdCode,
        body: bodyBuff
    });
};

module.exports = PayshieldCodec;
