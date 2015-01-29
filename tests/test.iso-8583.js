var mocha = require('mocha');
var expect = require('chai').expect;
var assert = require('chai').assert;
var iso8583 = require('../iso8583.js');

var _dummy1 = ['00E7','30323030','C210001102C04804','c200000000000003','0000000000000003'].join('');
var _test1 = '00E1303230303732334134343131323841303930303031363633363136303530303030303731323033303130303030303030303030303030303031303231303631303139343734303333303631303139313032313130323136303131303231443030303030303030313136323732303030303030303239363336313630353030303030373132303D32323031313031303030303037363537202020202020202056414E41544D3035434F4D505554455220574F524C44202020202020202020504F52542056494C41202020202020565535343845454534423232364343364636423044';
var _p2 = iso8583.parser(_test1);
    _p2.parse();

describe('ISO 8583 TEST', function(){
  describe('Dymmy#1: ' + _dummy1, function(){
    var _p1 = iso8583.parser(_dummy1);
    _p1.parseServiceData();

    it('should have 3 bitmaps',function(done){
      assert.equal(3, _p1.getBmps().length);
      done();
    });

    it('size should be 231x2',function(done){
      assert.equal(231, _p1.getSize());
      done();
    });

    it('message type id shoud be 0200',function(done){
      assert.equal('0200', _p1.getTypeID());
      done();
    });

  });

});
