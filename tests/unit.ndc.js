var NDC = require('../ndc');
const ndc = new NDC({messageFormat: {}});
var test = require('blue-tape');
var emv = {
    request: {
        msg: new Buffer('31311c3030323030303030311c1c31383130303932321c31391c3b353032323635343030303030303030303d323730353632303934303f1c1c' +
        '20444220202041441c3030303030303030303030301c31393634323d343f34393433393b313a1c1c1c1c3230303231313030303030303030303030303030303030' +
        '3030301c551c3543414d30343030384331353946303230363946303330363946314130323935303535463241303239413033394330313946333730343946303230' +
        '3630303030303030303030303039463033303630303030303030303030303035413039353032323635343030303030303030303037354633343031303139463336' +
        '3032303042363946323630383332323536364533453434413344454139463237303138303946303930323030303039463333303336303430323039463141303230' +
        '3630383946333530313134353730463530323236353430303030303030303030373044323730353632303934303546324130323036303839413033313730373138' +
        '39463431303231353537394330313031394633373034303030303135353739463533303135411c353833463239384503', 'hex'),
        result: {
            amount: '000000000000',
            bufferB: '',
            bufferC: '',
            camFlags: [[0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
            coordination: '9',
            emvTags: {
                '9F53': {len: 1, tag: '9F53', val: '5A'},
                CDOL1: {
                    len: 21,
                    tag: '8C',
                    val: {
                        '95': {idx: 3, len: 5, tag: '95', val: '0000000000'},
                        amountAuthorised: {idx: 0, len: 6, tag: '9F02', val: '000000000000'},
                        amountOther: {idx: 1, len: 6, tag: '9F03', val: '000000000000'},
                        terminalCountryCode: {idx: 2, len: 2, tag: '9F1A', val: '0608'},
                        transactionCurrencyCode: {idx: 4, len: 2, tag: '5F2A', val: '0608'},
                        transactionDate: {idx: 5, len: 3, tag: '9A', val: '170718'},
                        transactionType: {idx: 6, len: 1, tag: '9C', val: '01'},
                        unpredictableNumber: {idx: 7, len: 4, tag: '9F37', val: '00001557'}
                    }
                },
                amountAuthorised: {len: 6, tag: '9F02', val: '000000000000'},
                amountOther: {len: 6, tag: '9F03', val: '000000000000'},
                applicationCryptogram: {len: 8, tag: '9F26', val: '322566E3E44A3DEA'},
                applicationVersionNumber: {len: 2, tag: '9F09', val: '0000'},
                atc: {len: 2, tag: '9F36', val: '00B6'},
                cryptogramInformationData: {len: 1, tag: '9F27', val: '80'},
                pan: {len: 9, tag: '5A', val: '502265400000000007'},
                panSeqNum: {len: 1, tag: '5F34', val: '01'},
                terminalCapabilities: {len: 3, tag: '9F33', val: '604020'},
                terminalCountryCode: {len: 2, tag: '9F1A', val: '0608'},
                terminalType: {len: 1, tag: '9F35', val: '14'},
                track2EquivalentData: {len: 15, tag: '57', val: '5022654000000000070D2705620940'},
                transactionCurrencyCode: {len: 2, tag: '5F2A', val: '0608'},
                transactionDate: {len: 3, tag: '9A', val: '170718'},
                transactionSequenceCounter: {len: 2, tag: '9F41', val: '1557'},
                transactionType: {len: 1, tag: '9C', val: '01'},
                unpredictableNumber: {len: 4, tag: '9F37', val: '00001557'}
            },
            lastTransactionData: {notes1: 0, notes2: 0, notes3: 0, notes4: 0, sernum: '0021', status: '1'},
            luno: '002000001',
            opcode: [' ', 'D', 'B', ' ', ' ', ' ', 'A', 'D'],
            pinBlock: '19642D4F49439B1A',
            pinBlockNew: '',
            reserved: '',
            session: undefined,
            timeVariantNumber: '18100922',
            tokens: ['11', '002000001', '', '18100922', '19', ';5022654000000000=2705620940?', '', ' DB   AD', '000000000000',
                '19642=4?49439;1:', '', '', '', '20021100000000000000000000', 'U',
                '5CAM04008C159F02069F03069F1A0295055F2A029A039C019F37049F02060000000000009F03060000000000005A095022654000000000075F3401019F360200B6' +
                '9F2608322566E3E44A3DEA9F2701809F090200009F33036040209F1A0206089F350114570F5022654000000000070D27056209405F2A0206089A031707189F4102' +
                '15579C01019F3704000015579F53015A', '583F298E\x03'],
            topOfReceipt: '1',
            track2: ';5022654000000000=2705620940?',
            track3: '',
            type: '11'
        }
    },
    response: {
        msg: {
            luno: '002000001',
            coordination: '9',
            timeVariantNumber: '19110959',
            nextState: '165',
            type1Notes: '00',
            type2Notes: '00',
            type3Notes: '00',
            type4Notes: '00',
            sernum: '0000',
            function: '5',
            screenUpdate: '',
            screenMessage: '',
            cardReturn: '0',
            printer: '0',
            printerData: '',
            conId: 1,
            session: {
                transferId: false
            },
            camFlags: [[0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
            emvTags: {
                CDOL1: [
                    {'95': 5},
                    {'amountAuthorised': 6},
                    {'amountOther': 6},
                    {'terminalCountryCode': 2},
                    {'transactionCurrencyCode': 2},
                    {'transactionDate': 3},
                    {'transactionType': 1},
                    {'unpredictableNumber': 3}
                ],
                CDOL2: [{'transactionType': 1}, {'unpredictableNumber': 3}],
                amountAuthorised: '000000000000',
                amountOther: '000000000000',
                pan: '502265400000000007',
                panSeqNum: '01',
                atc: '00B6',
                applicationCryptogram: '322566E3E44A3DEA',
                cryptogramInformationData: '80',
                applicationVersionNumber: '0000',
                terminalCapabilities: '604020',
                terminalCountryCode: '0608',
                terminalType: '14',
                track2EquivalentData: '5022654000000000070D2705620940',
                transactionCurrencyCode: '0608',
                transactionDate: '170718',
                transactionSequenceCounter: '1557',
                transactionType: '01',
                unpredictableNumber: '0000155F',
                '9F53': '5A'
            }
        },
        result: '341c3030323030303030311c31393131303935391c3136351c30303030303030301c30303030351c' +
            '39303543414d3034303038433137393535394630323639463033363946314132354632413239413339433139463337333844343943313946333733394630323630' +
            '3030303030303030303030394630333630303030303030303030303035413935303232363534303030303030303030303735463334313031394633363230304236' +
            '3946323638333232353636453345343441334445413946323731383039463039323030303039463333333630343032303946314132303630383946333531313435' +
            '3731353530323236353430303030303030303030373044323730353632303934303546324132303630383941333137303731383946343132313535373943313031' +
            '3946333734303030303135354639463533313541'
    }
};

var testTimeout = timeout => (resolve, reject) => {
    let smallTimeout = {session: {transactionTimeout: timeout}};
    let resultReq = ndc.decode(emv.request.msg, {}, smallTimeout);
    let response = Object.assign({
        transactionRequestId: resultReq.transactionRequestId,
        transactionTimeout: resultReq.transactionTimeout
    }, emv.response.msg);
    setTimeout(() => {
        try {
            resolve(ndc.encode(response, {opcode: 'transactionReply'}, smallTimeout));
        } catch (e) {
            reject(e);
        }
    }, 1500);
};

test('Emv encode decode', (t) => {
    t.plan(5);
    let context = {};
    let resultReq = ndc.decode(emv.request.msg, {}, context);
    emv.request.result.transactionRequestId = resultReq.transactionRequestId;
    emv.request.result.transactionTimeout = resultReq.transactionTimeout;
    let response = Object.assign({
        transactionRequestId: resultReq.transactionRequestId,
        transactionTimeout: resultReq.transactionTimeout
    }, emv.response.msg);
    let resultResp = ndc.encode(response, {opcode: 'transactionReply'}, context);

    t.deepEqual(emv.request.result, resultReq, 'encode');
    t.deepEqual(emv.response.result, resultResp.toString('hex'), 'decode');
    t.throws(() => {
        resultReq = ndc.decode(emv.request.msg, {}, context);
        response = Object.assign({}, emv.response.msg);
        ndc.encode(response, {opcode: 'transactionReply'}, context);
    }, /Transaction timed out/, 'timeout different transactionRequestId');
    t.shouldReject(new Promise(testTimeout(1)), /Transaction timed out/, 'timeout time passed');
    t.ok(new Promise(testTimeout(2)), 'timeout did not pass');
});
