// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  getRedirectResult,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyBaCs0LrJrFfvRm8525iSyTku7FNXgsaEU",
//   authDomain: "testfire-9eab3.firebaseapp.com",
//   databaseURL:
//     "https://testfire-9eab3-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "testfire-9eab3",
//   storageBucket: "testfire-9eab3.appspot.com",
//   messagingSenderId: "795067618186",
//   appId: "1:795067618186:web:b9bcdfcdbc741521ff6e73",
//   measurementId: "G-LMLZHDKTLH",
// };
import { firebaseConfig } from "../js/config.js"; // Import the Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");

const btn = document.querySelector("#register");
btn.addEventListener("click", regitser);
function regitser(e) {
  e.preventDefault();
  var data = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
  };
  console.log(data);
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(function (success) {
      alert("Account Create Successfully");
      window.location.href = "login.html";
    })
    .catch(function (error) {
      alert("error" || error);
    });
}