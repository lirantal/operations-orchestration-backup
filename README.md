
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
This tool is a shell command just any other and is able to perform an export or import of data to an HPE Operations Orchestration deployment.
Example of how to run it with the required arguments


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
