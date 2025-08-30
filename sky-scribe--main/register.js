import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWQUVQFnjv0EILzMQt1UczZp4g4x2b5nM",
  authDomain: "sky-scribe-8adda.firebaseapp.com",
  projectId: "sky-scribe-8adda",
  storageBucket: "sky-scribe-8adda.firebasestorage.app",
  messagingSenderId: "392498175836",
  appId: "1:392498175836:web:ca3018b4ae5dec2331eb99",
  measurementId: "G-G6DX2L84WV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup functionality
document.getElementById("submit-signup").addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account created successfully!");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});

// Login functionality
document.getElementById("submit-login").addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //alert("Login successful!");
      window.location.href = "dashboard.html"; // Replace with the target page URL
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});

