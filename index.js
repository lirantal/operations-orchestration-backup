'use strict'

var OO 				= require('operations-orchestration-api');
var commandLineArgs = require('command-line-args');
var jsonfile 		= require('jsonfile');
var chalk			= require('chalk');

var options = {
	username: 'admin',
	password: 'admin',
	baseUrl: 'http://localhost:8050'
};

function getPackageInfo() {

	var pkg = require('./package.json');

	var str = '';
	str += pkg.name + "\n";
	str += 'version: ' + pkg.version + ' by ' + pkg.author + "\n";
	return str;
}

function cliShowUsage(cliUsage, msg) {

	console.log(getPackageInfo());
	console.log(chalk.red(Error(msg)));
	console.error(cliUsage);
	process.exit(1);
}

function cliExitError(msg) {

	console.log(getPackageInfo());
	console.log(chalk.red(msg));
	process.exit(1);
}

function cliExitClean(msg) {

	console.log(chalk.green(msg));
	process.exit(0);
}

function cliCheck() {

	var cli = commandLineArgs([
	  { name: 'username', alias: 'u', type: String, description: 'Username for Operations Orchestration that is allowed to query the API' },
	  { name: 'password', alias: 'p', type: String, description: 'Password for the Username provided' },
	  { name: 'url', type: String, description: 'The URL where Operations Orchestration API is available. Example: http://localhost:8050' },
	  { name: 'import', type: String, description: 'Provide a JSON file name to import all the data from into an OO install, expecting an array of objects' },
	  { name: 'export', type: String, description: 'Provide a file name to export all the data to as JSON object' }
	]);

	var cliOptions = cli.parse();
	var cliUsage = cli.getUsage();

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

function importConfig(options) {

	jsonfile.readFile(options.import, function(err, obj) {

		if (err) {
			cliExitError(err);
		}

		var item = '';
		for (var configItem of obj) {

			item = {
				type: configItem.type,
				path: configItem.path,
				value: configItem.value
			};

			OO.config.setItem(item, function(err, body) {
				if (err) {
					process.stdout.write(chalk.red('-'));
				} else {
					process.stdout.write(chalk.green('+'));
				}
			});
		}
		
	});

}


function exportConfig(options) {

	if (!options.export) {
		cliExitError(Error("must provide export file name"));
		return false;
	}

	OO.config.getAllItems(function(err, body) {

		if (err) {
			cliExitError(err);
		}

		if (body) {
			jsonfile.writeFile(options.export, body, {spaces: 2}, function(err) {
				if (err) {
					cliExitError(err);
				}

				cliExitClean("Successfully export OO configuration to: " + options.export);
				return true;
			});
		}
	});
}

var cliOptions = cliCheck();
if (!cliOptions) {
	cliExitError();
}

console.log(getPackageInfo());

if (cliOptions.export) {
	return exportConfig(cliOptions);
	cliExitClean();
}

if (cliOptions.import) {
	return importConfig(cliOptions);
	cliExitClean();
}
