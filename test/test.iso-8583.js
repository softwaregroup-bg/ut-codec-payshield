var mocha = require('mocha');
var expect = require('chai').expect;
var assert = require('chai').assert;
var iso8583 = require('../iso8583.js');

var _dummy1 = ['00E7','30323030','C210001102C04804','c200000000000003','0000000000000003'].join('');

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
