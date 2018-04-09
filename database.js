module.exports = {
		createUser,
	}

// Create Functions

function createUser(userRef, id, email, firstname, lastname, phone, password) {
  userRef.update({
    [id]:"novalue"
  });
  userRef.child(id).update({
    "email": email,
    "firstname": firstname,
    "lastname": lastname,
    "phone": phone,
    "password": password
  });
}


// Read Functions



// Update Functions
