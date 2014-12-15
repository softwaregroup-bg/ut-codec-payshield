_toString = function(encoding, start, end) {
  var buf = 'abc';
  var loweredCase = false;
  var args = arguments();
  if(args.length < 3) {
    encoding = 'utf8';
    start = args[0];
    end = args[1];
  }

  start = start >>> 0;
  end = util.isUndefined(end) || end === Infinity ? this.length : end >>> 0;

  if (!encoding) encoding = 'utf8';
  if (start < 0) start = 0;
  if (end > this.length) end = this.length;
  if (end <= start) return '';

  while (true) {
    switch (encoding) {
      case 'hex':
        return this.hexSlice(start, end);

      case 'utf8':
      case 'utf-8':
        return this.utf8Slice(start, end);

      case 'ascii':
        return this.asciiSlice(start, end);

      case 'binary':
        return this.binarySlice(start, end);

      case 'base64':
        return this.base64Slice(start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return this.ucs2Slice(start, end);

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
};