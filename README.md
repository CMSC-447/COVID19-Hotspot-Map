# COVID19-Hotspot-Map

Dependencies:
Yarn
NPM
Leaflet.js
Node.js
MySQL
Create React App

Yarn Packages:
react-chartjs-2 chart
react-router-dom


Installation & Setup

Ensure the system is installed with the up-to-date software requirements as discussed in section 2.2. 

Download the code from the Github repository, using the following link: https://github.com/CMSC-447/COVID19-Hotspot-Map.git

Open an sql shell using the command:  mysqlsh 

login using the command:  mysql -u root -p 

Enter your sql password. Once you are logged in, load the database through MySQL, which is located in the database directory.

To select the covid cases database, enter the command: use 'covid_data'. This ensures you will draw from the proper database.

Navigate to the ‘backend’ directory

Open the file ‘app.js’ using a text editor. Edit line 10 and 13 to match the localhost’s MySQL user and password.

Close app.js and navigate back to the ‘backend’ directory. Run the command: ’ npm start ‘. This initializes the node API.

Navigate to the ‘frontend/hotspot-map/src’ directory

Run the command: ’ yarn start ‘. This initializes the React-app frontend.

Your browser should open to localhost:3000. If it does not, open a browser and go to the following link: https://localhost:3000. The app is now running on your local machine and should be fully functional.


If you encounter the error (ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client #2013) when running the program:
- Login to your mysql database and run the following command ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
- Also, make sure to replace the user value on line 10 under backend/app.js

The Database draws from the following repositories:
https://github.com/nytimes/covid-19-data/blob/master/us-counties.csv
https://github.com/datadesk/california-coronavirus-data/blob/master/cdcr-prison-totals.csv
