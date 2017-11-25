[![view on npm](http://img.shields.io/npm/v/operations-orchestration-backup.svg)](https://www.npmjs.org/package/operations-orchestration-backup)
[![view on npm](http://img.shields.io/npm/l/operations-orchestration-backup.svg)](https://www.npmjs.org/package/operations-orchestration-backup)
[![npm module downloads](http://img.shields.io/npm/dt/operations-orchestration-backup.svg)](https://www.npmjs.org/package/operations-orchestration-backup)
[![Dependency Status](https://david-dm.org/lirantal/operations-orchestration-backup.svg)](https://david-dm.org/lirantal/operations-orchestration-backup)
[![Build](https://travis-ci.org/lirantal/operations-orchestration-backup.svg?branch=master)](https://travis-ci.org/lirantal/operations-orchestration-backup)

# operations-orchestration-backup

[![Greenkeeper badge](https://badges.greenkeeper.io/lirantal/operations-orchestration-backup.svg)](https://greenkeeper.io/)
NodeJS Backup Tool (Import/Export) for HPE's [Operations Orchestration](https://hpln.hpe.com/group/operations-orchestration)

**Currently suports only backup of configuration items**

Todo:

1. Backup of Users, and Roles
2. Backup of Flows
3. Backup of Schedules
4. Backup of Audits
5. Backup of LDAP Configuration

# About
operations-orchestration-backup is a handy console command line utility which allows to easily interact with an installed deployment of HPE's Operations Orchestration application in order to quickly perform a backup export or import operation.

# Install

## Requirements

Operations Orchestration Backup tool is developed with NodeJS, and as such it requires the runtime and toolchain for it.
Installing NodeJS (depending on your platform):

1. https://nodejs.org - once downloaded and installed you will have both `nodejs` runtime and `npm` (the package manager) available in your operation system.

## Installation

Install the tool easily with npm, after which the tool will be available in your command line prompt to run.

```javascript
npm install -g operations-orchestration-backup
```

* Linux Users - you may need to prefix the install command with sudo: `sudo npm install -g operations-orchestration-backup`
* Windows Users - you will need to run installation command from within an Administrator command line

## Windows Users

For Windows users, you can use a pre-built package that includes the node.exe binary and all the modules dependencies for this project by downloading it from [HPE Live Network](https://hpln.hpe.com/contentoffering/operations-orchestration-backup-tool-importexport)


# Usage
Once installed, this tool provides a shell command that can be executed to to perform an export or import of data to an HPE [Operations Orchestration](https://hpln.hpe.com/group/operations-orchestration) deployment.

## Command line options:
| Param | Type | Description |
| --- | --- | --- |
| -u or --username | string | Username for Operations Orchestration that is allowed to query the API |
| -p or --password | string | Password for the Username provided |
| --import | string | Provide a JSON file name to import all the data from into an OO install expecting an array of objects |
| --export | string | Provide a file name to export all the data to as JSON object |


## Export from OO 
Performing an export of an OO install to a JSON file:
```bash
operations-orchestration-backup --username admin --password admin --url http://localhost:8050 --export mydata.json
```

## Import to OO
Performing an import from a previously prepared JSON file (an array of objects) directly into an OO install:
```bash
operations-orchestration-backup --username admin --password admin --url http://localhost:8050 --import mydata.json
```



# Author
Liran Tal <liran.tal@gmail.com>
