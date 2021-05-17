# COVID19-Hotspot-Map

Dependencies:
- Yarn
- NPM
- Leaflet.js
- Node.js
- MySQL
- React App

Install Yarn Packages:
- react-router-dom 
     * npm install react-router-dom --save
-  react-chartjs-2
     * yarn add react-chartjs-2 chart.js


Installation & Setup

- Ensure the system is installed with the up-to-date software requirements as discussed in section 2.2. 

- Download the code from the Github repository, using the following link: https://github.com/CMSC-447/COVID19-Hotspot-Map.git or https://github.com/CMSC-447/COVID19-Hotspot-Map

To load the database on your local machine:

- The command to load the database file on local machine is `[mysql dir]/bin/mysql -u username -ppassword covid_data < /tmp/databasename.sql`. Note that the username and password should be replaced by the local machine's mysql login. The path where the covid_data.sql is located should also be replaced appropriately in the above command. (May need permissions to load the local file.)

- The covid_data.sql file is located under the  directory `COVID19-Hotspot-Map/Database/`.

- Once the above command is executed ensure the database now exists. To do so, please log in to your MySQL on your local machine using a terminal and run the following command `mysql -u root -p` and enter your password. Once you log in, select `covid_data` as your db by running the command `use covid_data;` to make sure the database was loaded in.

Updating database login info on node.js to allow the API to use the MySQL on your local machine:

- Navigate to the `COVID19-Hotspot-Map/backend/` directory.

- Open the file `app.js` using a text editor. Replace the login information from lines 10 and 13 to match the local machine's login info.

- Save and exit the file.

To run the application:

- Open a terminal and navigate to `COVID19-Hotspot-Map/backend/` directory, and run the command `node app.js`. This initializes the node API.

- Open a terminal and navigate to `COVID19-Hotspot-Map/frontend/hotspot-map/src/` directory, and execute the `yarn start`. This initializes the React-app.

To run the application using a Makefile (will only work on Linux based OS):

- Open a terminal and navigate to `COVID19-Hotspot-Map/` directory, and run `make`. This should execute all the necessary commands needed and start the application.

The sources of the data are from the following repositories:
- https://github.com/nytimes/covid-19-data/blob/master/us-counties.csv
- https://github.com/datadesk/california-coronavirus-data/blob/master/cdcr-prison-totals.csv
