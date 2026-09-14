import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const loginForm =
document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    signInWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then((userCredential) => {

        const user =
        userCredential.user;

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                email: user.email,
                uid: user.uid
            })
        );

        alert("Login Successful");

        window.location.href =
        "../student/dashboard.html";

    })

    .catch((error) => {

        alert(error.message);

    });

});