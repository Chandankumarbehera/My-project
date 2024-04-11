// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaCs0LrJrFfvRm8525iSyTku7FNXgsaEU",
    authDomain: "testfire-9eab3.firebaseapp.com",
    databaseURL:
      "https://testfire-9eab3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "testfire-9eab3",
    storageBucket: "testfire-9eab3.appspot.com",
    messagingSenderId: "795067618186",
    appId: "1:795067618186:web:b9bcdfcdbc741521ff6e73",
    measurementId: "G-LMLZHDKTLH",
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Function to verify if the user is authenticated
  function verify() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        window.location.replace("login.html");
      }
    });
  }
  
  // Function to retrieve current user's data
  function current_user() {
    const user = firebase.auth().currentUser;
    if (user) {
      const { displayName, email, uid } = user;
      console.log("User Data:", { displayName, email, uid });
    } else {
      console.log("No user is currently signed in.");
    }
  }
  
  // Call the verify function to check user authentication
  verify();
  
  // Call the current_user function to retrieve current user's data
  current_user();