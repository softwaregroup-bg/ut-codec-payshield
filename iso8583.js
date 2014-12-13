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
 * constructor
 * @param  {Buffer} _buffer buffer
 * @param  {integer} log     to print or not logs
 * @return {decoder}         [description]
 */
var decoder = function decoder(_buffer, log){
  this.log = function(){};
  if(log) {
    this.log = function(){
      console.log.apply(console,arguments);
    };
  }
  this.buffer = _buffer;
  this.dataBuffer = '';
  this.bitmaps = [];
  this.fields = [];
  this.typeID = '';
};

/**
 * extract fields from given byte
 * @param  {Byte} _byte      [description]
 * @param  {integer} _byteNum   number of the byte in bitmap series
 * @param  {integer} _bitmapNum bitmap number
 * @return {void}            [description]
 */
decoder.prototype.extractByteFields = function(_byte, _byteNum, _bitmapNum) {
  var _realByteNum = (_byteNum*8)+(_bitmapNum*64);

  for(var i=0; i < 8; i++) {
    var _b = 128;// = 10000000 starting with upper bit, because we checking from left to right
    _b = _b >> i;//moving bit on right side with 1 position per iteration
    if(_byte&_b) {//if bit matches(10000000&128=true) going in
      var bit = i+1;//real bit number
      var fieldNum = bit+_realByteNum;//calculationg field number
      this.log('byte: %d, bit: %d, _byteNum: %d, fieldnum: %d', _byte, bit, _byteNum, fieldNum);
      this.fields.push(fieldNum);
    }
  }
  this.log('---------------')
};

/**
 * extract bitmap itself
 * @return {void} [description]
 */
decoder.prototype.extractBitmaps = function() {
  this.bitmaps = [];
  var parsedBitmap = bitmasks[0](this.buffer);//parse only with 1 bitmap

  if(!parsedBitmap['bitmap1']) {//if no bitmaps found throws and error
    throw new Error('No bitmaps found');
  } else if(parsedBitmap['bitmap1'][0]&128) {//parse the second bitmap
    var parsedBitmap = bitmasks[1](this.buffer);
  }

  //assign some values
  this.typeID = parsedBitmap.msgType;
  this.dataBuffer = parsedBitmap.rest;

  //adds bitmaps that are found
  this.bitmaps.push(parsedBitmap.bitmap1);
  if(parsedBitmap.bitmap2)
    this.bitmaps.push(parsedBitmap.bitmap2);

  this.log(this.bitmaps);
};

/**
 * find all fields from the given bitmap index
 * @param  {integer} bitmapNum bitmap index
 * @return {void}           [description]
 */
decoder.prototype.findFIelds = function(bitmapNum) {
  //if bitmap not found from the given index, stops the execution
  if(!this.bitmaps[bitmapNum-1]) {
    this.log('no bitmap with number: %d', bitmapNum-1)
    return;
  }

  //parse bitmap and return byte chunked array
  var bitmapByteList = bitmapBytes(this.bitmaps[bitmapNum-1]);

  for(var i=0;i <= 7;i++) {
    var bytenum = i+1;
    //find all fields in the given byte
    this.extractByteFields(parseInt(bitmapByteList['byte'+bytenum.toString()], 16), i, bitmapNum-1);
  }
};

/**
 * extract the data from the message
 * @return {Array} array with fields data
 */
decoder.prototype.extractFieldsData = function() {
  var _l = this.fields.length;

  for(var i = 0; i < _l; i++) {
    var field = this.fields[i];
  }
  return [];
};
/**
 * endpoint function
 * @return {Array} array of all fields in the message
 */
decoder.prototype.decode = function() {
  this.extractBitmaps();
  this.findFIelds(1);
  this.findFIelds(2);
  this.log(this.fields);
  return this.extractFieldsData();
};

function iso8583(config) {
  this.config = config;
};

/**
 * decoder function
 * @param  {Buffer} _buffer buffer
 * @param  {integer} log     to print or not logs
 * @return {Array} array of all fields in the message
 */
iso8583.prototype.decode = function(buffer, log) {
  var Decoder = new decoder(buffer, log);
  return Decoder.decode();
};

iso8583.prototype.encode = function(message, log) {
};

var buff = new Buffer('303230303732334134343131323841303930303031363633363136303530303030303731323033303130303030303030303030303030303031303231303631303139343734303333303631303139313032313130323136303131303231443030303030303030313136323732303030303030303239363336313630353030303030373132303D32323031313031303030303037363537202020202020202056414E41544D3035434F4D505554455220574F524C44202020202020202020504F52542056494C41202020202020565535343845454534423232364343364636423044', 'hex');

(new iso8583({}))
  .decode(buff, 1);

module.exports = iso8583;