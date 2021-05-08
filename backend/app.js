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

// connect to the db
db.connect( err => {
  if(err) {
      return console.error('error: ' + err.message);
  }
  console.log('MySQL Connected.')
})


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

app.get('/get_prisons', (req, res) => {
  let sql = "SELECT uni_ref, p_name, latitude, longitude, county, city FROM cal_prisons;";
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
      console.log("Successfully loaded prison and locations! returning back to getPrison()");
      res.send(results);
  });

});

app.get('/getData/:val', (req, res) => {

  var qname = req.params.val || "";
  qname = qname.split(" ");
  console.log(qname);

  let sql = "SELECT * FROM prison_" + qname[0] + " WHERE date='" + qname[1]+"'";
  console.log(sql);
  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      console.log(" Successfully fetched dates! returning back to getStartEnd()!");

      res.send(results);
  });

});

// app.get("/load-db",(req, res) => {
//   let sql = "SELECT * FROM prison_data;";
//   db.query(sql,(err, results) => {
//       if (err) {
//           return console.error('error: ' + err.message);
//       }
//       console.log(results)
//       res.send("Query completed.")
//   });

// });

app.listen('9000',() => {
  console.log("Server Started on port 9000.")
});

module.exports = app;
