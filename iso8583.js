'use strict';
var bitsyntax = require('ut-bitsyntax');
var nconf = require('nconf');

function _log() {
    this.log = true;
}
_log.prototype.it = function() {
    if (this.log) {
        console.log.apply(null, arguments);
    }
}

var log = new _log();
//log.log = false;

/**
 * @module iso8583
 * @author UT Route Team
 * @description UT-Codecs, used for encode decode module
 */
/**
 * @class iso8583
 * @param {object} config 8583 config object
 *
 **/
function iso8583(config){
    config = config || {};

    if(!config.fieldsDefinition) {
        this.fieldsDefinition = nconf.file('./iso8583.fields.json');
    } else {
        this.fieldsDefinition = nconf.file(config.fieldsDefinition);
    }
};

/**
 * extract fields from given byte
 * @param  {Number} byteRow      [description]
 * @param  {Number} byteRowNum   number of the byte in bitmap series
 * @param  {Number} bitmapNum bitmap number
 * @param  {Array} fields array of found fields
 * @return {Array}            Fields array
 */
iso8583.prototype.extractByteFields = function(byteRow, byteRowNum, bitmapNum, fields) {
    var _realByteNum = (byteRowNum * 8) + (bitmapNum * 64);

    for (var i = 0; i < 8; i++) {
        var _b = 128;// = 10000000 starting with upper bit, because we checking from left to right
        _b = _b >> i;//moving bit on right side with 1 position per iteration
        if (byteRow & _b) {//if bit matches(10000000&128=true) going in
            var bit = i + 1;//real bit number
            var fieldNum = bit + _realByteNum;//calculationg field number
            log.it('byte: %d, bit: %d, byteRowNum: %d, fieldnum: %d', byteRow, bit, byteRowNum, fieldNum);
            fields.push(fieldNum);
        }
    }
    log.it('---------------');
    return fields;
};

/**
 * find all fields from the given bitmap index
 * @param  {Array}  bitmap
 * @param  {Number}  bitmapNum bitmap index
 * @param  {Array}  fields
 * @return {Array} array of fields
 */
iso8583.prototype.findFields = function(bitmapByteList, bitmapNum, fields) {
    for (var i = 0;i <= 7;i++) {
        var bytenum = i + 1;
        //find all fields in the given byte
        var byteRow = bitmapByteList['byte' + bytenum.toString()];
        log.it('trying to extract fields from byte: %s [%s]', bytenum.toString(), byteRow);
        fields = this.extractByteFields(byteRow, i, bitmapNum - 1, fields);
    }
    return fields;
};

/**
 * get field data
 * @param  {ascii|hex|string|binary} fieldData parsed field data
 * @return {*}           field data
 */
iso8583.prototype.parseField = function(fieldData) {
    return fieldData;
};

/**
 * endpoint function
 * @param {Buffer} buffer incoming buffer
 * @return {Object} object of all fields in the message
 */
iso8583.prototype.decode = function(buffer) {
    var fieldsFound = [-2, -1, 0];//required fields, MTID and first bitmap
    var fieldsParsed = {};
    var computedBitmaps = 0;
    var fieldIndex;

    while ((fieldIndex = fieldsFound.shift()) !== undefined) {
        fieldIndex = fieldIndex.toString();
        var field = this.fieldsDefinition.get(fieldIndex);

        if (field) {
            var matchString = field.mask + ', rest/binary';
            var matches = bitsyntax.matcher(matchString)(buffer);
            buffer = matches.rest;
            delete matches.rest;
            if (field.bitmap) {//bitmap fields
                log.it('mask @ pos: %s', fieldIndex);
                fieldsFound = this.findFields(matches, ++computedBitmaps, fieldsFound);
                fieldsParsed[fieldIndex] = matches;
            } else {//rest of the fields (non bitmap one)
                fieldsParsed[fieldIndex] = this.parseField(matches.field);
            }

        } else {
            fieldsParsed[fieldIndex] = undefined;
        }
    }

    return fieldsParsed;
};

iso8583.prototype.encode = function(message, log) {};

module.exports = iso8583;
