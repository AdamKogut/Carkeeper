//dependencies:
module.exports = {
  UID
}

//server dependencies
const express = require('express');
const app = express();
var port =  (process.env.PORT || 9090);
const bodyParser = require('body-parser');

//security dependencies
var crypto = require('crypto');

//database dependencies
var database = require('./database.js');

//setting up dtaabase
var admin = require("firebase-admin");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

var serviceAccount = require("./serviceAccount.json");
//initializeApp
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://carkeeper-90b76.firebaseio.com"
});

//set up references
var ref = admin.database().ref();
var userRef = ref.child("Users");

function test() {
  /*database.createUser(userRef, "1111", "1111@gmail.com", "Test", "User", "4081417392", "something");
  database.createUser(userRef, "2222", "2222@gmail.com", "Test2", "User2", "4081413392", "something");

  database.verifyUser(userRef, "2222", "something", (x) => {
    if (x == true) {
      console.log("Correct Username and Password");
    }
    else {
      console.log("Incorrect Username and Password");
    }
  });

   database.addCar(userRef, "1111", "My First car", "make", "model", "year", "level");
   database.addCar(userRef, "1111", "My Second car", "make2", "model2", "year2", "level2");
   database.addCar(userRef, "2222", "My First car", "make", "model", "year", "level");

   database.addService(userRef, "1111", "My First car", "oil", ["1/10/18", "7/12/17"], "7/10/18", "6 months");
   database.addService(userRef, "1111", "My First car", "tires", ["3/10/18"], "6/10/18", "3 months");
   database.addService(userRef, "2222", "My First car", "battery", ["12/10/17", "5/7/17"], "4/10/18", "4 months");

  database.getGarage(userRef, "1111", (x) => {
    console.log(x);
  });
  database.getGarage(userRef, "2222", (x) => {
    console.log(x);
  });

  database.getCar(userRef, "1111", "My First car", (x) => {
    console.log(x);
  });

  database.removeService(userRef, "1111", "My First car", "oil");
  */

}

//encrypt password
function encrypt(password) {
  var cipher = password;
  var actual = "";
  for(i = 0; i < password.length; i++) {
    //console.log((password.charCodeAt(i)*941)%16);
    actual = actual + ((password.charCodeAt(i)*941)%16).toString(16);
  }
  //return cipher
  return actual;
}

//create UID
function UID(username) {
  var uid = 0;
  for (i = 0; i < username.length; i++) {
    var char = username.charCodeAt(i);
    //52 chars (lower and upper letters + 10 digits)
    uid = (uid * 941) % 741 + char;
  }
  return (String(uid));
}

//set bodyParser
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello');
})

// Create User
app.post('/CREATE-USER', function (req, res) {
  var uid = UID(req.email); // username is their email
  var encryptedPassword = encrypt(req.password);
  database.createUser(userRef, uid, req.email, req.firstname, req.lastname, req.phone, encryptedPassword);
  res.send(uid);
  console.log("New User Created");
});

//login handler
app.post('/LOGIN', function (req, res) {
  console.log('Received request for LOGIN:');
  console.log(req.body);

  //create ENCRYPTED PASSWORD
  var encryptedPassword = encrypt(req.body.password);
  var uid = UID(req.body.username); // username is their email
  console.log(uid);

  database.verifyUser(userRef, uid, encryptedPassword, (x) => {
    if (x == true) {
      res.json({
        "uid": uid,
        "status": true
      });
      console.log("Correct Username and Password");
    }
    else {
      res.json({
        "status": false
      });
      console.log("Incorrect Username and Password");
    }
  });
});

// Add Car
app.post('/ADD-CAR', function (req, res) {
  database.addCar(userRef, req.uid, req.make, req.model, req.year, req.level);
  console.log("New Car Added");
});

// Add Service  addService(userRef, uid, carNumber, serviceName, priorDate, nextDate, increment) {
app.post('/ADD-SERVICE', function (req, res) {
  // For now, nextDate and increment is unknown until we can use an API or have general increments
  database.addService(userRef, req.uid, req.carName, req.serviceName, req.priorDate, "nextDate", "increment");
  console.log("New service added");
});

app.post('/GET-GARAGE', function (req, res) {
  database.getGarage(userRef, req.uid, (x) => {
    res.send(x);
  })
  console.log("Get Garage request");
});

app.post('/GET-CAR', function (req, res) {
  database.getCar(userRef, req.uid, req.carName, (x) => {
    res.send(x);
  });
  console.log("Get Car request");
});

app.post('/REMOVE-SERVICE', function (req, res) {
  database.removeService(userRef, req.uid, req.carName, req.serviceName);
  console.log("Service Removed");
});

// main function
app.listen(port, function () {

  //call test
  console.log("SERVER STARTS");
  console.log('Testing begins, check database');
  test();
  console.log('Testing done');

  console.log('Database setup done');
  console.log('App listening on port: ' + port + '!');
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.json({
    "status": false,
    "error": 'Error, check server for more details',
    "details": err
  });
});
