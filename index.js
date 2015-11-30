'use strict'

var OO 				= require('operations-orchestration-api');
var commandLineArgs = require('command-line-args');
var jsonfile 		= require('jsonfile');

var options = {
	username: 'admin',
	password: 'admin',
	baseUrl: 'http://localhost:8050'
};

function cliCheck() {

	var cli = commandLineArgs([
	  { name: 'username', alias: 'u', type: String },
	  { name: 'password', alias: 'p', type: String },
	  { name: 'url', type: String },
	  { name: 'import', type: String },
	  { name: 'export', type: String }
	]);

	var cliOptions = cli.parse();
	var cliUsage = cli.getUsage();

	if (!cliOptions.url) {
		console.error(Error("must provide url for the OO REST API server"));
		console.log(cliUsage);
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
		console.error(Error("must provide at least one option of --export or --import options available"));
		console.log(cliUsage);
		return false;
	}

	// set OO API settings
	OO.setClient(options);
	return cliOptions;
}

function importConfig(options) {

	jsonfile.readFile(options.import, function(err, obj) {

		if (err) {
			console.error(err);
			process.exit(1);
		}

		for (var configItem of obj) {
			console.log(configItem.type);
		}
		
	});

}


function exportConfig(options) {

	if (!options.export) {
		console.error(Error("must provide export file name"));
		return false;
	}

	OO.config.getAllItems(function(err, body) {

		if (err) {
			console.error(err);
			process.exit(1);
		}

		if (body) {
			jsonfile.writeFile(options.export, body, {spaces: 2}, function(err) {
				if (err) {
					console.error(err);
					process.exit(1);
				}

				console.log("Successfully export OO configuration to: " + options.export);
				return true;
			});
		}
	});
}

var cliOptions = cliCheck();
if (!cliOptions) {
	process.exit(1);
}

if (cliOptions.export) {
	return exportConfig(cliOptions);
	process.exit(0);
}

if (cliOptions.import) {
	return importConfig(cliOptions);
	process.exit(0);
}
