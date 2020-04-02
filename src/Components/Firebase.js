import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyBztQYs1Fmzw1MrOH8GWORisAWsxTaBIGg",
    authDomain: "simpapp-d607a.firebaseapp.com",
    databaseURL: "https://simpapp-d607a.firebaseio.com",
    projectId: "simpapp-d607a",
    storageBucket: "simpapp-d607a.appspot.com",
    messagingSenderId: "541886811215",
    appId: "1:541886811215:web:f754383a9317280645ae3a",
    measurementId: "G-F3YWSQ3QXK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;