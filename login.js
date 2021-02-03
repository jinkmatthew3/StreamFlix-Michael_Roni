var firebaseConfig = {
    apiKey: "AIzaSyB0NuZ0QCleWY00YnbdaNYHr7T2fgPpKMw",
    authDomain: "streamfix-db2cf.firebaseapp.com",
    projectId: "streamfix-db2cf",
    storageBucket: "streamfix-db2cf.appspot.com",
    messagingSenderId: "704604216351",
    appId: "1:704604216351:web:5e81340e207be2cf17892a",
    measurementId: "G-L0JTN26R27"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const auth = firebase.auth();

function signUp() {
    var uName = document.getElementById("user-name");
    var email = document.getElementById("user-email");
    var password = document.getElementById("user-pass");
    var cPass = document.getElementById("user-cpass");
    console.log(password.value);
    console.log(cPass.value);

    if (password.value === cPass.value) {
        const promise = auth.createUserWithEmailAndPassword(email.value, password.value).then((e) =>
        {
            console.log(e.user);
        })
        alert("Signed Up");
    }
    else {
        alert("Password not match");
    }
}

function signIn() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e =>
        alert(e.message),
        console.log(e.message)
    );

    console.log("masuk pak eko");

}
