# **Codec:** `ut-codec` #
The purpose of this module is to be responsible for the parsing of communication between application servers and remote devices such as ATMs, HSMs, POS devices, PIN Pads, etc.

### **Different types of codecs** ###

 - ISO 8583 - [Wikipedia documentation for the standard](http://en.wikipedia.org/wiki/ISO_8583)
 - NDC - Protocol for ATMs [Reference manual](http://ndcmessage.googlecode.com/svn/trunk/test/Reference%20manual.pdf)
 - Payshield - Protocol for HSMs [Reference manual](https://arthurvandermerwe.files.wordpress.com/2014/12/1270a546-015-host-command-reference-v2-3a.pdf)
 - Plain - Simple codec for encoding/decoding string data (for example JSON communication through TCP)
 - SMPP - [Wikipedia documentation for the protocol](http://en.wikipedia.org/wiki/Short_Message_Peer-to-Peer)

### **Technological dependencies** ###

 - `ut-bitsyntax` - TODO add link to documentation
 - `nconf` - [Github Official Page](https://github.com/indexzero/nconf)
 - `lodash` - [Github Official Page](https://github.com/lodash/lodash)
 - `iconv-lite` - [Github Official Page](https://github.com/ashtuchkin/iconv-lite)

In the UT5 implementation this module resides in its core. The `ut-port-tcp` uses the codec within its `init` method in order to be able to handle communications with remote devices or servers through TCP.

The following configuration data is passed to the TCP port in order to incorporate the codec:

	module.exports = {
		type: 'tcp',
		format: {
			size: '16/integer',
	        codec: 'payshield', // ndc, smpp, etc.
	        headerFormat: "6/string-left-zero"
		}
	}

The `format` object is specific for each codec and please refer to each codec's documentation for my detailed  information.

To instantiate a codec do the following:

    if (this.config.format) {
        if (this.config.format.size) {
            this.framePattern = bitSyntax.matcher('size:' + this.config.format.size + ', data:size/binary, rest/binary');
            this.frameBuilder = bitSyntax.builder('size:' + this.config.format.size + ', data:size/binary');
        }
        if (this.config.format.codec) {
            var x = utcodec.get(this.config.format.codec);
            this.codec = new x(this.config.format);
        }
    }

`this.config.format` object represents the configuration object of the TCP port, shown above.

After been created the codec instance, it's the`ut-bus` job to pass messages to the codec's encode/decode methods depending on which conversion is triggered (in-going/out-going) of the port. The codec's `encode` method is invoked upon out-going conversion and `decode` upon in-going conversion. By using `ut-bitsyntax` pattern matching algorithms the actual parsing is achieved. The `encode` method receives JSON object as input parameter and outputs a buffer that is send to the network. The transformation from JSON to buffer is `ut-bitsyntax` job. The `decode` method receives a buffer and parses it in order to output understandable JSON object, once again with `ut-bitsyntax` help. 