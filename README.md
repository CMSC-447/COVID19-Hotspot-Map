# COVID19-Hotspot-Map

Dependencies:
Yarn
NPM
Leaflet.js
Node.js
MySQL
Create React App


Frontend SETUP
Navigate to 'frontend/hotspot-map'
enter the command 'yarn start'

You will be navigated to localhost://3000

Backend SETUP
Navigate to 'backend'
enter the command 'npm start'

If you encounter the error (ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client #2013) when running the program:
- Login to your mysql database and run the following command ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
- Also, make sure to replace the user value on line 10 under backend/app.js
