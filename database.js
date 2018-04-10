module.exports = {
		createUser,
    verifyUser,
    addCar,
    addService,
    getGarage,
    getCar
	}

// Create Functions

function createUser(userRef, uid, email, firstname, lastname, phone, password) {
  userRef.update({
    [uid]:"novalue"
  });
  userRef.child(uid).update({
    "email": email,
    "firstname": firstname,
    "lastname": lastname,
    "phone": phone,
    "password": password,
    "Garage": ""
  });
  userRef.child(uid).child("Garage").update({
    "carCount": 0
  });
}

function addCar(userRef, uid, carName, make, model, year, level) {
  var ref = userRef.child(uid).child("Garage");
  var carCount;
  ref.once("value").then(function(snapshot){
    carCount = snapshot.val().carCount + 1;
    console.log("Car count:");
    console.log(carCount);
    ref.update({
      "carCount": carCount,
      [carName]: ""
    });
    ref.child(carName).update({
      "make": make,
      "model": model,
      "year": year,
      "level": level,
      "Service List": ""
    });
    ref.child(carName).child("Service List").update({
      "serviceCount": 0
    });
  });
}

function addService(userRef, uid, carName, serviceName, priorDate, nextDate, increment) {
  var ref = userRef.child(uid).child("Garage").child(carName).child("Service List");
  var serviceCount;
  ref.once("value").then(function(snapshot){
    serviceCount = snapshot.val().serviceCount + 1;
    ref.update({
      "serviceCount": serviceCount,
      [serviceName]: ""
    })
    ref.child(serviceName).update({
      "priorDate": priorDate,
      "nextDate": nextDate,
      "increment": increment
    })
  });
}

// Read Functions
function verifyUser(userRef, uid, password, callback) {
  var ref = userRef.child(uid).child("password");
  var correctPassword;
  ref.once("value").then(function(snapshot) {
    correctPassword = snapshot.val();
    if (password == correctPassword) {
      callback(true);
    }
    else {
      callback(false);
    }
  });
}

function getGarage(userRef, uid, callback) {
  var ref = userRef.child(uid).child("Garage");
  var json = {};
  ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if (key != "carCount") {
          json[key] = {};
          json[key]["make"] = childSnapshot.val().make;
          json[key]["model"] = childSnapshot.val().model;
          json[key]["level"] = childSnapshot.val().level;
          json[key]["year"] = childSnapshot.val().year;
        }
      });
    callback(json);
  });
}

function getCar(userRef, uid, carName, callback) {
  var ref = userRef.child(uid).child("Garage").child(carName).child("Service List");
  var json = {};
  ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if (key != "serviceCount") {
          json[key] = {};
          json[key]["increment"] = childSnapshot.val().increment;
          json[key]["nextDate"] = childSnapshot.val().nextDate;
          json[key]["priorDate"] = childSnapshot.val().priorDate;
        }
      });
    callback(json);
  });
}

// Update Functions
