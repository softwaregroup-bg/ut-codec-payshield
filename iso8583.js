'use strict'
var bitsyntax = require('bitsyntax');
var nconf = require('nconf');
var fieldsDefinition = nconf.file('./iso8583.fields.json');

/**
 * @module iso8583
 * @author UT Route Team
 * @description UT-Codecs, used for encode decode module
 */
/**
 * @class iso8583
 *
 **/
function iso8583(config, validator, logger) {
    /**
     * config protperties
     * @type {Object}
     */
    this.config = config;
    /**
     * @function log
     * @description Empty log method
     */
    this.log = logger || null;
};

/**
 * extract fields from given byte
 * @param  {Byte} _byte      [description]
 * @param  {integer} _byteNum   number of the byte in bitmap series
 * @param  {integer} _bitmapNum bitmap number
 * @return {Array}            Fields array
 */
iso8583.prototype.extractByteFields = function(_byte, _byteNum, _bitmapNum, fields) {
    var _realByteNum = (_byteNum * 8) + (_bitmapNum * 64);

    for (var i = 0; i < 8; i++) {
        var _b = 128;// = 10000000 starting with upper bit, because we checking from left to right
        _b = _b >> i;//moving bit on right side with 1 position per iteration
        if (_byte & _b) {//if bit matches(10000000&128=true) going in
            var bit = i + 1;//real bit number
            var fieldNum = bit + _realByteNum;//calculationg field number
            console.log('byte: %d, bit: %d, _byteNum: %d, fieldnum: %d', _byte, bit, _byteNum, fieldNum);
            fields.push(fieldNum);
        }
    }
    console.log('---------------');
    return fields;
};

/**
 * find all fields from the given bitmap index
 * @param  {Array}  bitmap
 * @param  {Integer}  bitmapNum bitmap index
 * @param  {Array}  fields
 * @return {Array} array of fields
 */
iso8583.prototype.findFIelds = function(bitmap, bitmapNum, fields) {
    //parse bitmap and return byte chunked array
    var bitmapByteList = bitsyntax.matcher('byte1:2/binary,byte2:2/binary,byte3:2/binary,byte4:2/binary,byte5:2/binary,byte6:2/binary,byte7:2/binary,byte8:2/binary')(bitmap);
    for (var i = 0;i <= 7;i++) {
        var bytenum = i + 1;
        //find all fields in the given byte
        fields = this.extractByteFields(parseInt(bitmapByteList['byte' + bytenum.toString()], 16), i, bitmapNum - 1, fields);
    }
    return fields;
};

/**
 * get field data
 * @param  {ascii|hex|string|binary} fieldData parsed field data
 * @return {mixed}           field data
 */
iso8583.prototype.parseField = function(fieldData) {
    return fieldData;
};

/**
 * endpoint function
 * @return {Array} array of all fields in the message
 */
iso8583.prototype.decode = function(buffer) {
    var fieldsFound = [0, 1];//required fields, MTID and first bitmap
    var fieldsParsed = {};
    var computedBitmaps = 0;
    var fieldIndex;

    while ((fieldIndex = fieldsFound.shift()) !== undefined) {
        fieldIndex = fieldIndex.toString();
        var field = fieldsDefinition.get(fieldIndex);

        if (field) {
            var matchString = field.mask + ', rest/binary';
            var mathes = bitsyntax.matcher(matchString)(buffer);
            buffer = mathes.rest;

            if ((fieldIndex === '1') || (fieldIndex === '64') || (fieldIndex === '128')) {//bitmap fields
                fieldsFound = this.findFIelds(mathes.field, ++computedBitmaps, fieldsFound);
            } else {//rest of the fields (non bitmap one)
                fieldsParsed[fieldIndex] = this.parseField(mathes.field);
            }

        } else {
            fieldsParsed[fieldIndex] = 'no matcher found';
        }
    };

    return fieldsParsed;
};

iso8583.prototype.encode = function(message, log) {};

module.exports = iso8583;
