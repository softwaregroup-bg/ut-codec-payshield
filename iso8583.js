'use strict'
var bitsyntax = require('bitsyntax');
var nconf = require('nconf');
var fieldsDefinition = nconf.file('./iso8583.fields.json');

//bitmap bitmask
var bitmasks = [
  bitsyntax.matcher('msgType:4/string, bitmap1:16/string, rest/binary'),
  bitsyntax.matcher('msgType:4/string, bitmap1:16/string, bitmap2:16/string, rest/binary')
];

//bitmask for bitmap bytes
var bitmapBytes = bitsyntax.matcher('byte1:2/binary,byte2:2/binary,byte3:2/binary,byte4:2/binary,byte5:2/binary,byte6:2/binary,byte7:2/binary,byte8:2/binary');

/**
 * @module ut-codec
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
 * extract bitmap itself
 * @param {String} buffer [description]
 * @return {object} object that contains first two bitmaps, message type id and rest of the rest of the data buffer
 */
iso8583.prototype.extractBitmaps = function(buffer) {
    var parsedBitmap = bitmasks[0](buffer);//parse only with 1 bitmap
    var _data = {
        'bitmaps':[],
        'typeID':'',
        'dataBuffer':undefined
    };

    if (!parsedBitmap['bitmap1']) {//if no bitmaps found throws and error
        throw new Error('No bitmaps found');
    } else if (parsedBitmap['bitmap1'][0] & 128) {//parse the second bitmap
        var parsedBitmap = bitmasks[1](buffer);
    }

    //assign some values
    _data.typeID = parsedBitmap.msgType;
    _data.dataBuffer = parsedBitmap.rest;

    //adds bitmaps that are found
    _data.bitmaps.push(parsedBitmap.bitmap1);
    if (parsedBitmap.bitmap2) {
        _data.bitmaps.push(parsedBitmap.bitmap2);
    }

    return _data;
};

/**
 * find all fields from the given bitmap index
 * @param  {Array}  bitmaps
 * @param  {Integer}  bitmapNum bitmap index
 * @param  {Array}  fields
 * @return {Array} array of fields
 */
iso8583.prototype.findFIelds = function(bitmaps, bitmapNum, fields) {
  //if bitmap not found from the given index, stops the execution
    if (!bitmaps[bitmapNum - 1]) {
        console.log('no bitmap with number: %d', bitmapNum - 1)
        return fields;
    }

    //parse bitmap and return byte chunked array
    var bitmapByteList = bitmapBytes(bitmaps[bitmapNum - 1]);

    for (var i = 0;i <= 7;i++) {
        var bytenum = i + 1;
        //find all fields in the given byte
        fields = this.extractByteFields(parseInt(bitmapByteList['byte' + bytenum.toString()], 16), i, bitmapNum - 1, fields);
    }
    return fields;
};

/**
 * extract the data from the message
 * @param {Array} fields [description]
 * @return {Array} array with fields data
 */
iso8583.prototype.extractFieldsData = function(fields) {
    var _l = fields.length;

    for (var i = 0; i < _l; i++) {
        var field = fields[i];
    }
    return [];
};

/**
 * endpoint function
 * @return {Array} array of all fields in the message
 */
iso8583.prototype.decode = function(buffer) {
    var fieldsFound = [];
    var data = {};
    data = this.extractBitmaps(buffer);
    console.log(data);
    fieldsFound = this.findFIelds(data.bitmaps, 1, fieldsFound);
    fieldsFound = this.findFIelds(data.bitmaps, 2, fieldsFound);
    console.log(fieldsFound);
    return this.extractFieldsData(fieldsFound);
};

iso8583.prototype.encode = function(message, log) {
};

var buff = new Buffer('303230303732334134343131323841303930303031363633363136303530303030303731323033303130303030303030303030303030303031303231303631303139343734303333303631303139313032313130323136303131303231443030303030303030313136323732303030303030303239363336313630353030303030373132303D32323031313031303030303037363537202020202020202056414E41544D3035434F4D505554455220574F524C44202020202020202020504F52542056494C41202020202020565535343845454534423232364343364636423044', 'hex');

(new iso8583({}))
  .decode(buff, 1);

module.exports = iso8583;
