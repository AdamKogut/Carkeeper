module.exports = {
		createUser,
    verifyUser,
    addCar
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


// Update Functions
function addCar(userRef, uid, make, model, year, level) {
  var ref = userRef.child(uid).child("Garage");
  var carCount;
  ref.once("value").then(function(snapshot){
    carCount = snapshot.val().carCount + 1;
    console.log("Car count:");
    console.log(carCount);
    var newCar = "Car" + carCount;
    ref.update({
      "carCount": carCount,
      [newCar]: ""
    });
    ref.child(newCar).update({
      "make": make,
      "model": model,
      "year": year,
      "level": level,
      "Service List": ""
    });
    ref.child(newCar).child("Service List").update({
      "serviceCount": 0
    });
  });
}
