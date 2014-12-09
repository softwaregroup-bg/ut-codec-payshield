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

    var bmpStrBuffer;
    var mainStrBuffer;
    var bmps = [];
    var fields = [];
    var size = 0;
    var msgTypeID;

    var isoParser = function(buffer) {
      this.packet = buffer;
    };

    /**
     * sets a bitmap array
     * @param {array} record [description]
     * @returns {void} [description]
     */
    isoParser.prototype.setBmps = function(bmp) {
      for(var i in bmp) {
        if(i.indexOf('bitmap') !== -1) {
          bmps.push(bmp[i])
        }
      }
    };

    /**
     * extract bitmaps from buffer
     * @returns {void} [description]
     */
    isoParser.prototype.extractBmps = function(count) {
      var _this = this;
      count = (!count?1:count);
      var _bmp = bitmasks[count-1](new Buffer(this.packet, 'hex'));

      if(_bmp['bitmap' + count.toString()][0]&128){//is there more bmps
        return _this.extractBmps(count+1);
      } else {
        _this.setBmps(_bmp);
        mainStrBuffer = _bmp.rest;
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
          fields.push(i+_plus);
        }
        _s = _s*2;
      };
    };

    /**
     * function that is called for parsing iso message
     * @type {[type]}
     */
    isoParser.prototype.parse = function() {
      this.extractBmps();

      for(var i in bmps) {
        var _i = (parseInt(i)*64);
        for(var i2=0;i2 < 7;i2++) {
          var _i2 = parseInt(i2)*8;
          this.findNumbers(bmps[i][i2], _i2+_i);
        }
      }

      fields = fields.sort(function(a, b) {return a-b;});
      var fieldsPattern = this.getFieldsPattern();
      console.log(fieldsPattern)
    };

    /**
     * creates pattern for every parsed field
     * @returns {array} bitsyntax pattern
     */
    isoParser.prototype.getFieldsPattern = function() {
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