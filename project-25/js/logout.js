import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import { firebaseConfig } from "../js/config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Function to handle logout
function handleLogout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("loggedInUser"); // Remove loggedInUser from localStorage
      alert("Logout successful.");
      window.location.href = "login.html"; // Redirect to login page
    })
    .catch((error) => {
      // An error happened.
      console.error("Logout error:", error);
      alert("Logout error. Please try again.");
    });
}