#e-prokurimi
A platform that visualizes procurement data from local municipality and 
automatically detects irregularities through a contextual and custom built red flagging algorithm.


# Installing and running for the first time
1. Prepare the `config.cfg` based on the provided template file: `cp config-template.cfg config.cfg`
2. Open the newly created config.cfg file with your favourite Terminal-based text editor: `nano config.cfg`
3. Fill in all the config value.
4. Install the app: `bash install.sh`
6. Run the app: `bash run.sh`


# Running in debug mode
`bash run-debug.sh`


# Data
Follow the instruction on this repository to import data.
[https://github.com/opendatakosovo/municipality-procurement-data-importer](https://github.com/opendatakosovo/municipality-procurement-data-importer) 


#API
The API in this repository is used to get the data. 
[https://github.com/opendatakosovo/e-prokurimi-api](https://github.com/opendatakosovo/e-prokurimi-api)
This needs to be running while using e-prokurimi app.