
    //Initialize Firebase
    const config = {
      apiKey: "AIzaSyDJr7tL83LTPe1jE3WaVPKizF-uZ5yntmo",
      authDomain: "carkeeper-90b76.firebaseapp.com",
      databaseURL: "https://carkeeper-90b76.firebaseio.com",
      projectId: "carkeeper-90b76",
      storageBucket: "carkeeper-90b76.appspot.com",
      messagingSenderId: "1047249761512"
    };

    //Setup references to database
    var defaultApp = firebase.initializeApp(config);
    var ref = firebase.database().ref();
    var userRef = ref.child("Users");

    /* createUser(userRef, "1111", "1111@gmail.com", "Test", "User", "4081417392", "something", (x) => {
      console.log(x);
    }) */
