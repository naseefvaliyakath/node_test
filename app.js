var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require('body-parser')
var cors = require("cors");
var createError = require('http-errors');
const res = require("express/lib/response");
const { status } = require("express/lib/response");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "naseef",
  password: "13641364@@Na",
  database: "testingdb",
});


//crerate connection to sql
con.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }

  console.log("connected as id " + con.threadId);
});


app.get("/", (req, res) => res.send("Welcom"));

///get all task
app.get("/gettasks", (req, res) => {
  con.query("SELECT * FROM todo_list", (err, results, fields) => {
    if (err) {
      res.status(401).json(err);
      throw err;
    
    } else {
      console.log("Result" + results);
      res.status(200).json({"total_size": 7, task: results })
    }
  });
});



app.listen(3000, () => console.log("server started"));