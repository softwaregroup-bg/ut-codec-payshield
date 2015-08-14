'use strict';
var _ = require('lodash');
var defaultFields = require('./iso8583.fields.json');
var bitSyntax = require('ut-bitsyntax');

function getFormat(format, fallback) {
    return (format && {'numeric' : 'string', 'string' : 'string', 'amount' : 'string', 'bcdamount' : 'string'}[format]) || format || fallback || 'binary';
}

function Iso8583(config) {
    this.fieldFormat = _.assign({}, defaultFields[(config.version || '0') + (config.baseEncoding || 'ascii')], config.fieldFormat);
    this.framePattern = bitSyntax.matcher('header:' + this.fieldFormat.header.size + '/' + getFormat(this.fieldFormat.header.format) +
                                          ', mtid:' + this.fieldFormat.mtid.size + '/' + getFormat(this.fieldFormat.mtid.format) +
                                          ', field0:' + this.fieldFormat['1'].size + '/' + getFormat(this.fieldFormat['1'].format) +
                                          ', rest/binary');
    this.fieldPatterns = [];
    var group = 0;
    while (this.fieldFormat[(group + 1) * 64]) {
        var pattern = [];
        for (var i = 1; i <= 64; i += 1) {
            var field  = group * 64 + i;
            if (this.fieldFormat[field].prefixSize) {
                pattern.push('prefix' + field + ':field' + field + 'Size/' + getFormat(this.fieldFormat[field].prefixFormat, 'string') +
                             ', field' + field + ':prefix' + field + '/' + getFormat(this.fieldFormat[field].format));
            } else {
                pattern.push('field' + field + ':field' + field + 'Size/' + getFormat(this.fieldFormat[field].format));
            }
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

Iso8583.prototype.decode = function(buffer) {
    var frame = this.framePattern(buffer);
    var message = {header:frame.header, mtid:frame.mtid, '0':frame.field0};
    var bitmapField = 0;
    if (frame) {
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
                for (var failField = (group + 1) * 64; failField >= group * 64 + 1; failField -= 1) { //find at which field we failed by skipping fields from the end
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
                fieldSizes['field' + fieldNo + 'Size'] ? message[fieldNo] = frame['field' + fieldNo] : null;
            }
            group += 1;
        }
    } else {
        throw new Error('Unable to parse message type or first bitmap!');
    }
    return message;
};

Iso8583.prototype.encode = function(message) {

}

module.exports = Iso8583;
