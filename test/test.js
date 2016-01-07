'use strict'
/**
 * Tests resource
 * @module tests
 */

/**
 * Module dependencies.
 */
var should 		= require('should');
var path	    = require('path');
var child		= require('child_process');
var concat 		= require('concat-stream');


var options = {
	username: 'admin',
	password: 'admin',
	baseUrl: 'http://my-oo-host.com:8050/oo/rest/v1'
};

describe('Operations Orchestration Backup CLI - Test Suite', function() {

	beforeEach(function () {
        this.executable = path.join(__dirname, '../', 'index.js');
    });

    it('CLI with no arguments should show the usage information', function (done) {
        var proc = child.spawn(this.executable);
        proc.stdout.pipe(concat(function (output) {

        	var cliOutput = output.toString('utf8');
        	cliOutput.should.match(/Error: must provide url for the OO REST API server/);

            done();
        }));
    });
});