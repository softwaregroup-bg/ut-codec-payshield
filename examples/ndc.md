        // Function for processing huge buffers
        function processBuffer(buffer, pattern, callback) {
            var buf = pattern(buffer);
            while(buf.frame) {
                callback(buf.frame);
                if (!buf.rest.length) {
                    break;
                }
                buffer = buf.rest;
            }
        }

        var ndc = new NDC({
                fieldSeparator: '\u001c',
                messageFormatOverride: {} // use this to override ndc.messages.json commands
            },
            require('ut-validate').get('joi').validateNdc
            // additional parameter to require logger
        );

        // Decode
        var framePattern = BitSyntax.matcher('len:16/integer, frame:len/binary, rest/binary');
        processBuffer(buffer, framePattern, function(msg) {
            var decodedMsg = ndc.decode(msg);
        });

        //Encode
        var buffer = ndc.encode({
            _mtid: 'request',
            _opcode: 'transactionReply',
            luno: '001',
            nextState: '007',
            type1Notes: '00',
            type2Notes: '00',
            type3Notes: '00',
            type4Notes: '00',
            sernum: '0000',
            function: '5',
            coordination: '2',
            cardReturn: '0',
            printer: '1CARD: 5859 8700 1203 3949'
        });
        var pattern = BitSyntax.parse('size:16, bin:size/binary');
        var out = BitSyntax.build(pattern, {
            size: buffer.length,
            bin: new Buffer(buffer)
        });