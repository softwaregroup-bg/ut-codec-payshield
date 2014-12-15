var bitsyntax = require('bitsyntax');

var buf = new Buffer('32323232', 'hex');
console.log(buf);
var b1 = bitsyntax.matcher('bin1:32/integer, rest/binary')
console.log(b1(buf));