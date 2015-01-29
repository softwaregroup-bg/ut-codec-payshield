/**
 * Run tests with intern-client config=test/intern.js to run all tests
 * If individual testing is required copy/paste intern.js with different name and change the command
 */
define({
	suites: ['tests/test.ndc.js', /*'tests/test.smpp.js', 'tests/test.payshield.js', 'tests/test.iso8583.js'*/],
	excludeInstrumentation: /^(?:test)\//
});
