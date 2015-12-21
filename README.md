
# operations-orchestration-backup
NodeJS Backup Tool (Import/Export) for HPE's [Operations Orchestration](https://hpln.hpe.com/group/operations-orchestration)

# About
operations-orchestration-backup is a handy console command line utility which allows to easily interact with an installed deployment of HPE's Operations Orchestration application in order to quickly perform a backup export or import operation.

# Install
Install the tool easily with npm, after which the tool will be available in your command line prompt to run.

```javascript
npm install operations-orchestration-backup
```

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
