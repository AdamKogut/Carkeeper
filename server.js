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
  database.createUser(userRef, "2222", "2222@gmail.com", "Test2", "User2", "4081413392", "something");
}

//encrypt password
function encrypt(password) {
  var cipher = password;
  var actual = "";
  for(i = 0; i < password.length;i++) {
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
  var uid = UID(req.email);
  var encryptedPassword = encrypt(req.password);
  database.createUser(userRef, uid, req.email, req.firstname, req.lastname, req.phone, encryptedPassword);
  res.send(uid);
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
