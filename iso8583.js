'use strict';
var merge = require('lodash.merge');
var defaultFields = require('./iso8583.fields.json');
var bitSyntax = require('ut-bitsyntax');
var errors = require('./isoErrors');

function getFormat(format, fallback) {
    return (format && {'numeric': 'string-left-zero', 'string': 'string-right-space', 'amount': 'string-left-zero', 'bcdamount': 'string'}[format]) || format || fallback || 'binary';
}

function Iso8583(config) {
    this.fieldFormat = merge({}, defaultFields[(config.version || '0') + (config.baseEncoding || 'ascii')], config.fieldFormat);
    this.framePattern = bitSyntax.matcher('header:' + this.fieldFormat.header.size + '/' + getFormat(this.fieldFormat.header.format) +
        ', mtid:' + this.fieldFormat.mtid.size + '/' + getFormat(this.fieldFormat.mtid.format) +
        ', field0:' + this.fieldFormat['0'].size + '/' + getFormat(this.fieldFormat['0'].format) +
        ', rest/binary');
    this.fieldPatterns = [];
    this.fieldBuilders = [bitSyntax.parse('field:fieldSize/' + getFormat(this.fieldFormat['0'].format))];
    this.fieldBuilders.mtid = bitSyntax.parse('field:fieldSize/' + getFormat(this.fieldFormat.mtid.format));
    this.prefixBuilders = [null];
    var group = 0;
    while (this.fieldFormat[(group + 1) * 64]) {
        var pattern = [];
        for (var i = 1; i <= 64; i += 1) {
            var field = group * 64 + i;
            if (this.fieldFormat[field].prefixSize) { // if the field is with variable size
                pattern.push('prefix' + field + ':field' + field + 'Size/' + getFormat(this.fieldFormat[field].prefixFormat, 'string-left-zero') +
                    ', field' + field + ':prefix' + field + '/' + getFormat(this.fieldFormat[field].format));
                this.prefixBuilders.push(bitSyntax.parse('prefix:' + this.fieldFormat[field].prefixSize + '/' +
                    getFormat(this.fieldFormat[field].prefixFormat, 'string-left-zero')));
            } else { // if the field is with fixed size
                pattern.push('field' + field + ':field' + field + 'Size/' + getFormat(this.fieldFormat[field].format));
                this.prefixBuilders.push(null);
            }
            this.fieldBuilders.push(bitSyntax.parse('field:fieldSize/' + getFormat(this.fieldFormat[field].format)));
        }
        pattern.push('rest/binary');
        this.fieldPatterns.push(bitSyntax.matcher(pattern.join(', ')));
        group += 1;
    }
}

Iso8583.prototype.fieldSizes = function(bitmap, start) {
    /* jshint bitwise: false */
    var result = {};
    for (var i = 0; i <= 63; i += 1) {
        var size = bitmap && ((bitmap[i >> 3] & (128 >> (i % 8))) !== 0);
        if (size) {
            result['field' + (start + i) + 'Size'] = this.fieldFormat[start + i].prefixSize || this.fieldFormat[start + i].size;
        } else {
            result['field' + (start + i) + 'Size'] = 0;
        }
    }
    return result;
};

Iso8583.prototype.decode = function(buffer, $meta) {
    var frame = this.framePattern(buffer);
    var bitmapField = 0;
    if (frame) {
        var message = {'header': frame.header, 'mtid': frame.mtid, '0': frame.field0};
        var parsedLength = buffer.length - frame.rest.length;
        var group = 0;
        while (frame) {
            var fieldPattern = this.fieldPatterns[group];
            if (!fieldPattern) {
                if (frame.rest && frame.rest.length) {
                    throw new Error('Not all data was parsed. Remaining ' + frame.rest.length + ' bytes at offset ' + parsedLength +
                        ' starting with 0x' + frame.rest.toString('hex') + '\r\nmessage:' + JSON.stringify(message));
                } else {
                    break;
                }
            }
            var fieldSizes = this.fieldSizes(frame['field' + bitmapField], group * 64 + 1);
            var rest = frame.rest;
            frame = fieldPattern && fieldPattern(rest, fieldSizes);
            if (!frame && fieldPattern) {
                for (var failField = (group + 1) * 64; failField >= group * 64 + 1; failField -= 1) { // find at which field we failed by skipping fields from the end
                    fieldSizes['field' + failField + 'Size'] = 0;
                    frame = fieldPattern && fieldPattern(rest, fieldSizes);
                    if (frame) {
                        parsedLength += rest.length - frame.rest.length;
                        throw new Error('Parsing failed at field ' + failField + '. Remaining ' + frame.rest.length + ' bytes at offset ' + parsedLength +
                            ' starting with 0x' + frame.rest.toString('hex') + '\r\nmessage:' + JSON.stringify(message));
                    }
                }
                throw new Error('Parsing failed at unknown field');
            }
            parsedLength += rest.length - frame.rest.length;
            bitmapField = group * 64 + 1;
            for (var fieldNo = group * 64 + 1; fieldNo <= (group + 1) * 64; fieldNo += 1) {
                if (fieldSizes['field' + fieldNo + 'Size']) {
                    message[fieldNo] = frame['field' + fieldNo];
                }
            }
            group += 1;
        }
        $meta.opcode = String(message[3] || '').substr(0, 2);
        $meta.trace = message[11];
        if (message.mtid && message.mtid.slice) {
            $meta.mtid = {
                '0': 'request',
                '1': (parseInt(message[39]) === 0) ? 'response' : 'error',
                '2': 'request',
                '3': (parseInt(message[39]) === 0) ? 'response' : 'error',
                '4': 'notification',
                '5': 'notification'
            }[(message.mtid.slice(-2).substr(0, 1))] || 'error';
        }
        $meta.method = message.mtid + ($meta.opcode ? '.' + $meta.opcode : '');
        if ($meta.mtid === 'error') {
            var err = errors['' + message[39]] || errors.generic;
            message = err(message);
        }
        return message;
    } else {
        throw new Error('Unable to parse message type or first bitmap!');
    }
};

Iso8583.prototype.encodeField = function(fieldName, fieldValue) {
    var prefixBuilder = this.prefixBuilders[fieldName];
    var field = bitSyntax.build(
        this.fieldBuilders[fieldName],
        {'field': fieldValue, 'fieldSize': prefixBuilder ? fieldValue.length : this.fieldFormat[fieldName].size}
    );
    return prefixBuilder ? Buffer.concat([bitSyntax.build(prefixBuilder, {'prefix': field.length}), field]) : field;
};

Iso8583.prototype.encode = function(message, $meta, context) {
    /* jshint bitwise: false */
    var buffers = new Array(64 * this.fieldPatterns.length);
    var emptyBuffer = new Buffer([]);
    var trace = message[11];
    if (trace === undefined || trace === null) {
        trace = $meta.trace = ('000000' + context.trace).substr(-6);
        context.trace += 1;
        if (context.trace > 999999) {
            context.trace = 0;
        }
    }
    message[11] = trace;
    var bitmaps = Array.apply(null, new Array(8 * this.fieldPatterns.length)).map(Number.prototype.valueOf, 0); // zero filled array
    for (var i = 64 * this.fieldPatterns.length; i >= 0; i -= 1) {
        if (i === 0) {
            buffers[i] = this.encodeField(i, new Buffer(bitmaps.slice(0, 8)));
        } else if (i % 64 === 1 && i < 64 * (this.fieldPatterns.length - 1)) {
            var index = (i >> 6) << 3;
            var bitmap = bitmaps.slice(index + 8, index + 16);
            if (bitmap.reduce(function(p, n) { return p + n; })) {
                bitmaps[(i - 1) >> 3] |= (128 >> (i - 1) % 8);
                buffers[i] = this.encodeField(i, new Buffer(bitmap));
            } else {
                buffers[i] = emptyBuffer;
            }
        } else if (message[i] != null) {
            bitmaps[(i - 1) >> 3] |= (128 >> (i - 1) % 8);
            buffers[i] = this.encodeField(i, message[i]);
        } else {
            buffers[i] = emptyBuffer;
        }
    }
    buffers.unshift(this.encodeField('mtid', message.mtid || new Buffer([])));

    return Buffer.concat(buffers);
};

module.exports = Iso8583;
