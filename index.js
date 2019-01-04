#!/usr/bin/env node
'use strict'

/**
 * operations-orchestration-backup
 * @module operations-orchestration-backup
 */

var OO = require('operations-orchestration-api');
var commandLineArgs = require('command-line-args');
var commandLineUsage = require('command-line-usage');
var jsonfile = require('jsonfile');
var chalk = require('chalk');

var options = {
	username: 'admin',
	password: 'admin',
	baseUrl: 'http://localhost:8050'
};

/**
 * get module package information
 * 
 * @method	getPackageInfo
 * @return	{string}		package information as a sring
 */
function getPackageInfo() {

	var pkg = require('./package.json');

	var str = '';
	str += pkg.name + "\n";
	str += 'version: ' + pkg.version + ' by ' + pkg.author.name + "\n";
	return str;
}

/**
 * prints out command line usage information and exit with an error code
 * 
 * @method	cliShowUsage
 * @param 	{string}	command line arguments usage help
 * @param 	{string}	the error message to print to the screen
 */
function cliShowUsage(cliUsage, msg) {

	console.log(getPackageInfo());
	console.log(chalk.red(Error(msg)));
	console.error(cliUsage);
	process.exit(1);
}

/**
 * prints out an error message
 * 
 * @method	cliExitError
 * @param 	{string}	the error message to print on the screen
 */
function cliExitError(msg) {

	console.log(chalk.red(msg));
	process.exit(1);
}

/**
 * prints out a success message
 * 
 * @method	cliExitClean
 * @param 	{string}	a success message text to print to the screen
 */
function cliExitClean(msg) {

	console.log(chalk.green(msg));
	process.exit(0);
}

/**
 * parse command line arguments to set the options for connecting to OO 
 * 
 * @method	cliCheck
 * @return	{object}		return the object with the passed parameters to the command line
 */
function cliCheck() {

	var cli = [
		{ name: 'username', alias: 'u', type: String, description: 'Username for Operations Orchestration that is allowed to query the API' },
		{ name: 'password', alias: 'p', type: String, description: 'Password for the Username provided' },
		{ name: 'url', type: String, description: 'The URL where Operations Orchestration API is available. Example: http://localhost:8050' },
		{ name: 'import', type: String, description: 'Provide a JSON file name to import all the data from into an OO install, expecting an array of objects' },
		{ name: 'export', type: String, description: 'Provide a file name to export all the data to as JSON object' }
	];

	var cliOptions = commandLineArgs(cli);

	var cliUsageStruct = [
		{
			header: 'Options',
			optionList: cli
		}
	];

	var cliUsage = commandLineUsage(cliUsageStruct);

	if (!cliOptions.url) {
		cliShowUsage(cliUsage, "must provide url for the OO REST API server");
		return false;
	} else {
		options.baseUrl = cliOptions.url + '/oo/rest/v1';
	}

	if (cliOptions.username) {
		options.username = cliOptions.username;
	}

	if (cliOptions.password) {
		options.password = cliOptions.password;
	}

	if (!cliOptions.import && !cliOptions.export) {
		cliShowUsage(cliUsage, "must provide at least one option of --export or --import options available");
		return false;
	}

	// set OO API settings
	OO.setClient(options);
	return cliOptions;
}

/**
 * imports configuration from a JSON file into an OO install
 * 
 * @method	importConfig
 * @param 	{object}	the command line arguments options object
 */
function importConfig(options) {

	jsonfile.readFile(options.import, async function (err, obj) {

		if (err) {
			cliExitError(err);
		}

		var item = '';
		for (var configItem of obj) {
			try {
				await OO.config.setItem(configItem)
				process.stdout.write(chalk.green('+'));
			} catch (err) {
				process.stdout.write(chalk.red('-'));
			}
		}
	});

}

/**
 * exports an OO install configuration to a JSON file
 * 
 * @method	exportConfig
 * @param 	{object}	the command line arguments options object
 */
async function exportConfig(options) {

	if (!options.export) {
		cliExitError(Error("must provide export file name"));
		return false;
	}

	try {
		const body = await OO.config.getAllItems();

		if (body) {
			jsonfile.writeFile(options.export, body, { spaces: 2 }, function (err) {
				if (err) {
					cliExitError(err);
				}

				cliExitClean("Successfully export OO configuration to: " + options.export);
				return true;
			});
		}
	} catch (err) {
		cliExitError(err);
	}
}

var cliOptions = cliCheck();
if (!cliOptions) {
	cliExitError();
}

console.log(getPackageInfo());

if (cliOptions.export) {
	return exportConfig(cliOptions).then(() => cliExitClean());

}

if (cliOptions.import) {
	return importConfig(cliOptions).then(() => cliExitClean());
}
