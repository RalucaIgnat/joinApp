var mysql = require('mysql'); // use the mysql module
var faker = require('faker');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
 // create an onject of the express module
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "join_as"
});



app.get("/", function(req, res) {
    //Find count of users in  DB
    var q =" SELECT COUNT(*) AS count FROM  users";
    con.query (q, function(err, results){

        if (err) throw err
        var count = results[0].count;
        //Respond with that count
      //  res.send("We have " + count + " users in our db");
          res.render("home",{count: count});
    });


});

app.post("/register", function(req,res) {

  var email =  req.body.email;
  var person = {
             email: req.body.email
  };
    con.query('INSERT INTO users SET ? ', person,function (err,results) {

        if (err) throw err;
        res.redirect("/");
    });
});






app.listen (8080, function () {
   console.log('App listen on port 8080!');
});


// Inserting lots of data ================
//
// var data = [];
//  for (var i = 0; i < 500; i++) {
//    data.push([
//        faker.internet.email(),
//        faker.date.past()
//
//      ]);
//
//  }
// console.log(data);
//
// var q = 'INSERT INTO users (email, created_at) VALUES ?';
//
// con.query(q, [data], function(err, results){
//
//      if(err) throw err;
//      console.log(results);
// });
// con.end();
// // //
//
//
//
//







// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE join_as", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//
//   var sql = "CREATE TABLE users (email VARCHAR(255) PRIMARY KEY, created_at TIMESTAMP DEFAULT NOW())";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });
//
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO users (email) VALUES ('rusty_the_dog@gmail.com')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// });
//
// var person = {email: faker.internet.email()};
// con.query('INSERT INTO users SET ? ', person, function(err, results ){
//         if (err) throw err;
//         console.log(results);
//
//      });
//
// con.end();
//

// console.log(faker.internet.email());
// console.log(faker.date.past());
//console.log(faker.internet.avatar());
// function generateAddress () {
//
//     console.log(faker.address.streetAddress());
//     console.log(faker.address.city());
//     console.log(faker.address.state());
// }
// generateAddress();
