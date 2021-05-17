const express = require('express');
const mysql = require('mysql');

var app = express();
var router = express.Router();

// host details
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  database: 'covid_data',
  password: 'password'
})


// Establish the connection to the database.
db.connect( err => {
  if(err) {
      return console.error('error: ' + err.message);
  }
  console.log('MySQL Connected.')
})

// Load all the counties for the dropdown.
app.get('/load_counties', (req, res) => {
  let sql = "SELECT * FROM cal_counties;";
  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      console.log("Successfully loaded counties! returning back to loadDB()");

      res.send(results);
  });

});

// Writes all the prisons to a file and also returns the result.
app.get('/get_prisons', (req, res) => {
  let sql = "SELECT * FROM cal_prisons;";
  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      const fs = require('fs')
      try {
        fs.writeFileSync('../frontend/hotspot-map/src/data/markers.json', JSON.stringify(results))
      } catch (error) {
        console.error(error)
      }
      console.log("Successfully loaded prison locations! returning back to getPrison()");
      res.send(results);
  });

});

// This gets the total number of cases for all prisons for the latest date.
app.get('/getTotalPrisonCases', (req, res) => {
  let sql = "SELECT * FROM total_pri_data;";
  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      const fs = require('fs')
      try {
        fs.writeFileSync('../frontend/hotspot-map/src/data/total_pri_data.json', JSON.stringify(results))
      } catch (error) {
        console.error(error)
      }
      console.log("Successfully loaded total prison cases! returning back to getTotalPrisonCases()");
  });
});

// This gets the total number of cases for all counties for the latest date.
app.get('/getTotalCountyCases', (req, res) => {
  let sql = "SELECT * FROM total_county_data;";
  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      const fs = require('fs')
      try {
        fs.writeFileSync('../frontend/hotspot-map/src/data/total_county_data.json', JSON.stringify(results))
      } catch (error) {
        console.error(error)
      }
      console.log("Successfully total loaded county cases! returning back to getTotalCountyCases()");
  });

});

// This gets the data for a selected prison and date.
app.get('/getPrisonData/:val', (req, res) => {

  var qname = req.params.val || "";
  qname = qname.split(" ");

  let sql = "SELECT * FROM prison_" + qname[0] + " WHERE date='" + qname[1]+"'";

  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      console.log("Successfully fetched dates! returning back to getPrisonData()!");

      res.send(results);
  });

});

// This gets the data for all counties given a date.
app.get('/AllCountyData/:val', (req, res) => {

  var qname = req.params.val || "";

  let sql = "SELECT DISTINCT county,new_cases from cal_county_data WHERE date='" + qname+ "'";

  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      const fs = require('fs')
      try {
        fs.writeFileSync('../frontend/hotspot-map/src/data/county_spec_data.json', JSON.stringify(results))
      } catch (error) {
        console.error(error)
      }
      console.log("Successfully fetched dates! returning back to AllCountyData()!");

      res.send(results);
  });

});

// This gets the data for all prison given a date.
app.get('/AllPrisonData/:val', (req, res) => {

  var qname = req.params.val || "";


  let sql = "SELECT DISTINCT p_name,new_conf_cases from prison_data WHERE date='" + qname+ "'";

  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      const fs = require('fs')
      try {
        fs.writeFileSync('../frontend/hotspot-map/src/data/pri_spec_data.json', JSON.stringify(results))
      } catch (error) {
        console.error(error)
      }
      console.log("Successfully fetched dates! returning back to AllPrisonData()!");

      res.send(results);
  });

});

// This gets the data for a selected county and date.
app.get('/getCountyData/:val', (req, res) => {

  var qname = req.params.val || "";
  qname = qname.split(" ");

  let sql = "SELECT * FROM county_" + qname[0] + " WHERE date='" + qname[1]+"'";

  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      console.log("Successfully fetched dates! returning back to getCountyData()!");

      res.send(results);
  });

});

// Loads all the vaccine locations in california.
app.get("/getVacLoc",(req, res) => {

  let sql = "SELECT * FROM vaccine_loc;";
  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      const fs = require('fs')
      try {
        fs.writeFileSync('../frontend/hotspot-map/src/data/vaccine_location.json', JSON.stringify(results))
      } catch (error) {
        console.error(error)
      }
      console.log("Successfully fetched vaccine spots! returning back to getVacLoc()!")
      res.send(results)
  });

});

app.listen('9000',() => {
  console.log("Server Started on port 9000.")
});

module.exports = app;


