/**
 * Run tests with intern-client config=test/intern.js to run all tests
 * If individual testing is required copy/paste intern.js with different name and change the command
 */
define({
	suites: ['test/test.ndc'],
	excludeInstrumentation: /^(?:tests)\//
});
