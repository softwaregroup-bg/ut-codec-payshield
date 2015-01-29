module.exports = {
    decodeTests : {
        'genericNack'  : {
            'mtid'      : 'request',
            'commandId' : '80000000',
            'pattern'   : '',
            'buf'       : new Buffer('800000000000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'genericNack'
                              }
                            }
        },
        'bindReceiver'  : {
            'mtid'      : 'request',
            'commandId' : '00000001',
            'pattern'   : 'systemId:16/string-z, password:9/string-z, systemType:13/string-z, interfaceVersion:8/integer, addrTon:8/integer, addrNpi:8/integer, addressRange:41/string-z',
            'buf'       : new Buffer('0000000100000000000000017465737400313233005355424D495431005001013132372E302E302E3100', 'hex'),
            'data'      : {
                              'systemId': 'test',
                              'password': '123',
                              'systemType': 'SUBMIT1',
                              'interfaceVersion': 80,
                              'addrTon': 1,
                              'addrNpi': 1,
                              'addressRange': '127.0.0.1',
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'bindReceiver'
                              }
                            }
        },
        'bindTransmitter'  : {
            'mtid'      : 'request',
            'commandId' : '00000002',
            'pattern'   : 'systemId:16/string-z, password:9/string-z, systemType:13/string-z, interfaceVersion:8/integer, addrTon:8/integer, addrNpi:8/integer, addressRange:41/string-z',
            'buf'       : new Buffer('0000000200000000000000017465737400313233005355424D495431005001013132372E302E302E3100', 'hex'),
            'data'      : {
                              'systemId': 'test',
                              'password': '123',
                              'systemType': 'SUBMIT1',
                              'interfaceVersion': 80,
                              'addrTon': 1,
                              'addrNpi': 1,
                              'addressRange': '127.0.0.1',
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'bindTransmitter'
                              }
                            }
        },
        'querySm'  : {
            'mtid'      : 'request',
            'commandId' : '00000003',
            'pattern'   : 'messageId:65/string-z, sourceAddrTon:8/integer, sourceAddrNpi:8/integer, sourceAddr:21/string-z',
            'buf'       : new Buffer('000000030000000000000001617364660001013139322E3136382E3132382E31303700', 'hex'),
            'data'      : {
                              'messageId': 'asdf',
                              'sourceAddrTon': 1,
                              'sourceAddrNpi': 1,
                              'sourceAddr': '192.168.128.107',
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'querySm'
                              }
                            }
        },
        'submitSm'  : {
            'mtid'      : 'request',
            'commandId' : '00000004',
            'pattern'   : 'serviceType:6/string-z, sourceAddrTon:8/integer, sourceAddrNpi:8/integer, sourceAddr:21/string-z, destAddrTon:8/integer, destAddrNpi:8/integer, destinationAddr:21/string-z, esmClass:8/integer, protocolId:8/integer, priorityFlag:8/integer, scheduleDeliveryTime:17/string-z, validityPeriod:17/string-z, registeredDelivery:8/integer, replaceIfPresentFlag:8/integer, dataCoding:8/integer, smDefaultMsgId:8/integer, shortMessage:254/string-z, tlvs/binary',
            'buf'       : new Buffer('000000040000000000000001434D540001013139322E3136382E3132382E3130370001013139322E3136382E3132382E313030001100023234204a616e2032303135003234204a616e2032303135000100112273686F7274206D65737361676500', 'hex'),
            'data'      : {
                              'serviceType': 'CMT',
                              'sourceAddrTon': 1,
                              'sourceAddrNpi': 1,
                              'sourceAddr': '192.168.128.107',
                              'destAddrTon': 1,
                              'destAddrNpi': 1,
                              'destinationAddr': '192.168.128.100',
                              'esmClass': 17,
                              'protocolId': 0,
                              'priorityFlag': 2,
                              'scheduleDeliveryTime': '24 Jan 2015',
                              'validityPeriod': '24 Jan 2015',
                              'registeredDelivery': 1,
                              'replaceIfPresentFlag': 0,
                              'dataCoding': 'ISO-8859-1',
                              'smDefaultMsgId': 34,
                              'shortMessage': 'short message',
                              'tlvs': {},
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'submitSm'
                              }
                            }
        },
        'deliverSm'  : {
            'mtid'      : 'request',
            'commandId' : '00000005',
            'pattern'   : 'serviceType:6/string-z, sourceAddrTon:8/integer, sourceAddrNpi:8/integer, sourceAddr:21/string-z, destAddrTon:8/integer, destAddrNpi:8/integer, destinationAddr:21/string-z, esmClass:8/integer, protocolId:8/integer, priorityFlag:8/integer, scheduleDeliveryTime:17/string-z, validityPeriod:17/string-z, registeredDelivery:8/integer, replaceIfPresentFlag:8/integer, dataCoding:8/integer, smDefaultMsgId:8/integer, shortMessage:254/string-z, tlvs/binary',
            'buf'       : new Buffer('000000050000000000000001434D540001013139322E3136382E3132382E3130370001013139322E3136382E3132382E313030001100023234204a616e2032303135003234204a616e2032303135000100112273686F7274206D65737361676500', 'hex'),
            'data'      : {
                              'serviceType': 'CMT',
                              'sourceAddrTon': 1,
                              'sourceAddrNpi': 1,
                              'sourceAddr': '192.168.128.107',
                              'destAddrTon': 1,
                              'destAddrNpi': 1,
                              'destinationAddr': '192.168.128.100',
                              'esmClass': 17,
                              'protocolId': 0,
                              'priorityFlag': 2,
                              'scheduleDeliveryTime': '24 Jan 2015',
                              'validityPeriod': '24 Jan 2015',
                              'registeredDelivery': 1,
                              'replaceIfPresentFlag': 0,
                              'dataCoding': 'ISO-8859-1',
                              'smDefaultMsgId': 34,
                              'shortMessage': 'short message',
                              'tlvs': {},
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'deliverSm'
                              }
                            }
        },
        'unbind'  : {
            'mtid'      : 'request',
            'commandId' : '00000006',
            'pattern'   : '',
            'buf'       : new Buffer('000000060000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'unbind'
                              }
                            }
        },
        'replaceSm'  : {
            'mtid'      : 'request',
            'commandId' : '00000007',
            'pattern'   : 'messageId:65/string-z, sourceAddrTon:8/integer, sourceAddrNpi:8/integer, sourceAddr:21/string-z, scheduleDeliveryTime:17/string-z, validityPeriod:17/string-z, registeredDelivery:8/integer, smDefaultMsgId:8/integer, shortMessage:254/string-z',
            'buf'       : new Buffer('000000070000000000000001617364660001013139322e3136382e3132382e313037003234204a616e2032303135003234204a616e203230313500015073686f7274206d65737361676500', 'hex'),
            'data'      : {
                              'messageId': 'asdf',
                              'sourceAddrTon': 1,
                              'sourceAddrNpi': 1,
                              'sourceAddr': '192.168.128.107',
                              'scheduleDeliveryTime': '24 Jan 2015',
                              'validityPeriod': '24 Jan 2015',
                              'registeredDelivery': 1,
                              'smDefaultMsgId': 80,
                              'shortMessage': 'short message',
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'replaceSm'
                              }
                            }
        },
        'cancelSm'  : {
            'mtid'      : 'request',
            'commandId' : '00000008',
            'pattern'   : 'serviceType:6/string-z, messageId:65/string-z, sourceAddrTon:8/integer, sourceAddrNpi:8/integer, sourceAddr:21/string-z, destAddrTon:8/integer, destAddrNpi:8/integer, destinationAddr:21/string-z',
            'buf'       : new Buffer('000000080000000000000001434d5400617364660001013139322e3136382e3132382e3130370001013139322e3136382e3132382e31303000', 'hex'),
            'data'      : {
                              'serviceType': 'CMT',
                              'messageId': 'asdf',
                              'sourceAddrTon': 1,
                              'sourceAddrNpi': 1,
                              'sourceAddr': '192.168.128.107',
                              'destAddrTon': 1,
                              'destAddrNpi': 1,
                              'destinationAddr': '192.168.128.100',
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'bindTransceiver'  : {
            'mtid'      : 'request',
            'commandId' : '00000009',
            'pattern'   : 'systemId:16/string-z, password:9/string-z, systemType:13/string-z, interfaceVersion:8/integer, addrTon:8/integer, addrNpi:8/integer, addressRange:41/string-z',
            'buf'       : new Buffer('0000000900000000000000017465737400313233005355424d495431005001013132372e302e302e3100', 'hex'),
            'data'      : {
                              'systemId': 'test',
                              'password': '123',
                              'systemType': 'SUBMIT1',
                              'interfaceVersion': 80,
                              'addrTon': 1,
                              'addrNpi': 1,
                              'addressRange': '127.0.0.1',
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'bindTransceiver'
                              }
                            }
        },
        'outbind'  : {
            'mtid'      : 'request',
            'commandId' : '0000000B',
            'pattern'   : 'systemId:16/string-z, password:9/string-z',
            'buf'       : new Buffer('0000000B000000000000000148656c6c6f0031323300', 'hex'),
            'data'      : {
                              'systemId': 'Hello',
                              'password': '123',
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'outbind'
                              }
                            }
        },
        'enquireLink'  : {
            'mtid'      : 'request',
            'commandId' : '00000015',
            'pattern'   : '',
            'buf'       : new Buffer('000000150000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'enquireLink'
                              }
                            }
        },
        'alertNotification'  : {
            'mtid'      : 'request',
            'commandId' : '00000102',
            'pattern'   : 'sourceAddrTon:8/integer, sourceAddrNpi:8/integer, sourceAddr:21/string-z, esmeAddrTon:8/integer, esmeAddrNpi:8/integer, esmeAddr:65/string-z, tlvs/binary',
            'buf'       : new Buffer('00000102000000000000000101013139322e3136382e3132382e3130370001013139322e3136382e3132382e31303000', 'hex'),
            'data'      : {
                              'sourceAddrTon': 1,
                              'sourceAddrNpi': 1,
                              'sourceAddr': '192.168.128.107',
                              'esmeAddrTon': 1,
                              'esmeAddrNpi': 1,
                              'esmeAddr': '192.168.128.100',
                              'tlvs': {},
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'alertNotification'
                              }
                            }
        },
        'dataSm'  : {
            'mtid'      : 'request',
            'commandId' : '00000103',
            'pattern'   : 'serviceType:6/string-z, sourceAddrTon:8/integer, sourceAddrNpi:8/integer, sourceAddr:21/string-z, destAddrTon:8/integer, destAddrNpi:8/integer, destinationAddr:21/string-z, esmClass:8/integer, registeredDelivery:8/integer, dataCoding:8/integer, tlvs/binary',
            'buf'       : new Buffer('000001030000000000000001434d540001013139322e3136382e3132382e3130370001013139322e3136382e3132382e31303000110111', 'hex'),
            'data'      : {
                              'serviceType': 'CMT',
                              'sourceAddrTon': 1,
                              'sourceAddrNpi': 1,
                              'sourceAddr': '192.168.128.107',
                              'destAddrTon': 1,
                              'destAddrNpi': 1,
                              'destinationAddr': '192.168.128.100',
                              'esmClass': 17,
                              'registeredDelivery': 1,
                              'dataCoding': 'ISO-8859-1',
                              'tlvs': {},
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'dataSm'
                              }
                            }
        },
        'dataSm_TLVS:additional_status_info_text'  : {
            'mtid'      : 'request',
            'commandId' : '00000103',
            'pattern'   : 'serviceType:6/string-z, sourceAddrTon:8/integer, sourceAddrNpi:8/integer, sourceAddr:21/string-z, destAddrTon:8/integer, destAddrNpi:8/integer, destinationAddr:21/string-z, esmClass:8/integer, registeredDelivery:8/integer, dataCoding:8/integer, tlvs/binary',
            'buf'       : new Buffer('000001030000000000000001434d540001013139322e3136382e3132382e3130370001013139322e3136382e3132382e31303000110111001D0008776f6f6f6f6f6f74', 'hex'),
            'data'      : {
                              'serviceType': 'CMT',
                              'sourceAddrTon': 1,
                              'sourceAddrNpi': 1,
                              'sourceAddr': '192.168.128.107',
                              'destAddrTon': 1,
                              'destAddrNpi': 1,
                              'destinationAddr': '192.168.128.100',
                              'esmClass': 17,
                              'registeredDelivery': 1,
                              'dataCoding': 'ISO-8859-1',
                              'tlvs': { 'additional_status_info_text' : 'woooooot'},
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'dataSm'
                              }
                            }
        }
    },
    encodeTests : {
        'bindReceiverResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000001',
            'pattern'   : 'systemId:16/string-z, tlvs/binary',
            'buf'       : new Buffer('80000001000000000000000148656c6c6f00', 'hex'),
            'data'      : {
                              'systemId': 'Hello',
                              '$$': {
                                'trace': 1,
                                'mtid': 'response',
                                'opcode': 'bindReceiverResp'
                              }
                            }
        },
        'bindReceiverResp_TLVS:additional_status_info_text'  : {
            'mtid'      : 'response',
            'commandId' : '80000001',
            'pattern'   : 'systemId:16/string-z, tlvs/binary',
            'buf'       : new Buffer('80000001000000000000000148656c6c6f00001D0008776f6f6f6f6f6f74', 'hex'),
            'data'      : {
                              'systemId': 'Hello',
                              'tlvs': {
                                'additional_status_info_text' : 'woooooot'
                              },
                              '$$': {
                                'trace': 1,
                                'mtid': 'response',
                                'opcode': 'bindReceiverResp'
                              }
                            }
        }/*,
        'bindTransmitterResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000002',
            'pattern'   : 'systemId:16/string-z, tlvs/binary',
            'buf'       : new Buffer('800000020000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'querySmResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000003',
            'pattern'   : 'messageId:65/string-z, finalDate:18/string-z, messageState:8/integer, errorCode:8/integer',
            'buf'       : new Buffer('800000030000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'submitSmResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000004',
            'pattern'   : 'messageId:65/string-z',
            'buf'       : new Buffer('800000040000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'deliverSmResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000005',
            'pattern'   : 'messageId:65/string-z',
            'buf'       : new Buffer('800000050000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'unbindResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000006',
            'pattern'   : '',
            'buf'       : new Buffer('800000060000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'replaceSmResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000007',
            'pattern'   : '',
            'buf'       : new Buffer('800000070000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'cancelSmResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000008',
            'pattern'   : '',
            'buf'       : new Buffer('800000080000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'bindTransceiverResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000009',
            'pattern'   : 'systemId:16/string-z, tlvs/binary',
            'buf'       : new Buffer('800000090000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'enquireLinkResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000015',
            'pattern'   : '',
            'buf'       : new Buffer('800000150000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        },
        'dataSmResp'  : {
            'mtid'      : 'response',
            'commandId' : '80000103',
            'pattern'   : 'messageId:65/string-z, tlvs/binary',
            'buf'       : new Buffer('800001030000000000000001', 'hex'),
            'data'      : {
                              '$$': {
                                'trace': 1,
                                'mtid': 'request',
                                'opcode': 'cancelSm'
                              }
                            }
        }*/
    }
};
