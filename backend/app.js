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
db.connect( err =>{
  if(err) {
      return console.error('error: ' + err.message);
  }
  console.log('MySQL Connected.')
})


app.get('/hello', (req, res) => {
  let sql = "SELECT * FROM prison_data;";
  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      console.log(results)
      res.send("Query completed.");
  });

});

app.get("/load-db",(req, res) => {
  let sql = "SELECT * FROM prison_data;";
  db.query(sql,(err, results) => {
      if (err) {
          return console.error('error: ' + err.message);
      }
      console.log(results)
      res.send("Query completed.")
  });

});

app.listen('9000',() => {
  console.log("Server Started on port 9000.")
});

module.exports = app;
