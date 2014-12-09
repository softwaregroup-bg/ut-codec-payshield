'use strict'
var bitsyntax = require('bitsyntax');
var nconf = require('nconf');
var fieldsDefinition = nconf.file('./iso-8583.fieldFormats.json');

module.exports = {

  /**
   * bitmap parser object
   */
  'parser':function(buffer) {
    var bitmasks = [
      bitsyntax.matcher('size:16/integer, msgType:4/binary, bitmap1:8/binary, rest/binary'),
      bitsyntax.matcher('size:16/integer, msgType:4/binary, bitmap1:8/binary, bitmap2:8/binary, rest/binary'),
      bitsyntax.matcher('size:16/integer, msgType:4/binary, bitmap1:8/binary, bitmap2:8/binary, bitmap3:8/binary, rest/binary')
    ];

    var isoParser = function(buffer) {
      this.packet = buffer;
      this.dataBuffer = '';
      this.bitmaps = [];
      this.fields = [];
      this.size = -1;
      this.typeID = '';//@TODO
    };

    /**
     * sets a bitmap array
     * @param {array} record [description]
     * @returns {void} [description]
     */
    isoParser.prototype.setBmps = function(bmp) {
      this.bitmaps = [];

      for(var i in bmp) {
        if(i.indexOf('bitmap') !== -1) {
          this.bitmaps.push(bmp[i])
        }
      }
    };

    /**
     * get bitmaps array.parseServiceData should be called before
     * @returns {array} array of bitmaps in hex
     */
    isoParser.prototype.getBmps = function() {
      return this.bitmaps;
    };

    /**
     * get size of the message.parseServiceData should be called before
     * @returns {integer} message size
     */
    isoParser.prototype.getSize = function() {
      return this.size;
    };

    /**
     * get message type id.parseServiceData should be called before
     * @type {[type]}
     */
    isoParser.prototype.getTypeID = function() {
      return this.typeID;
    };

    /**
     * extract bitmaps from buffer
     * @returns {void} [description]
     */
    isoParser.prototype.parseServiceData = function(count) {
      var _this = this;
      count = (!count?1:count);
      var _bmp = bitmasks[count-1](new Buffer(this.packet, 'hex'));

      if(_bmp['bitmap' + count.toString()][0]&128){//is there more bmps
        return _this.parseServiceData(count+1);
      } else {
        _this.setBmps(_bmp);
        this.dataBuffer = _bmp.rest;
        this.size = _bmp.size;
        this.typeID = _bmp.msgType.toString();
      }
    };

    /**
     * gets actual bitmap numbers
     * @returns {void} [description]
     */
    isoParser.prototype.findNumbers = function(_byte, _plus) {
      var _s = 1;

      for (var i = 8; i > 0; i--) {
        if(_byte&_s) {
          this.fields.push(i+_plus);
        }
        _s = _s*2;
      };
    };

    /**
     * function that is called for parsing iso message
     * @type {[type]}
     */
    isoParser.prototype.parse = function() {
      this.parseServiceData();

      for(var i in this.bitmaps) {
        var _i = (parseInt(i)*64);
        for(var i2=0;i2 < 7;i2++) {
          var _i2 = parseInt(i2)*8;
          this.findNumbers(this.bitmaps[i][i2], _i2+_i);
        }
      }

      fields = this.fields.sort(function(a, b) {return a-b;});
      var fieldsPattern = this.getFieldsPattern(fields);
      //@TODO
    };

    /**
     * creates pattern for every parsed field
     * @returns {array} bitsyntax pattern
     */
    isoParser.prototype.getFieldsPattern = function(fields) {
      var _fps = [];
      var _l = fields.length;

      for (var i = 0; i < _l; i++) {
        var _field = fields[i].toString();
        if(!fieldsDefinition.get(_field)){
          throw new Error('no such field: ' + fields[i])
        } else {
          var _fp = this.getFieldPattern(fieldsDefinition.get(_field));
          _fps.push(_fp);
        }
      };

      return _fps.join(', ');
    };

    /**
     * defines pattern creation
     * @returns {string}
     */
    isoParser.prototype.getFieldPattern = function(info) {
      return 'f' + info.FieldId.toString()
      +':'+info.DataLength.toString()
      +'/'+info.DataCodec
    };

    return new isoParser(buffer);
  },
  'pack':function() {

  }
};