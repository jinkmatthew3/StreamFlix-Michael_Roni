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

var db = firebase.firestore();

function signUp() {
    var uName = document.getElementById("user-name");
    var email = document.getElementById("user-email");
    var password = document.getElementById("user-pass");
    var cPass = document.getElementById("user-cpass");
    //console.log(password.value);
    //console.log(cPass.value);

    if (password.value === cPass.value) {
        const promise = auth.createUserWithEmailAndPassword(email.value, password.value).then((e) => {
            console.log(e.user.uid);

            var inputToFirestore = {
                userName: uName.value,
                email: email.value,
                balance: 100000
            }

            db.collection("users").doc(e.user.uid).set(inputToFirestore)
                .then(function (docRef) {
                    console.log(docRef);
                    alert("Signed Up");
                    location.reload();
                })
                .catch(function (error) {
                    alert("email has been signed up");
                    console.log(error);
                })
        })
    }
    else {
        alert("Password not match");
    }
}

function signIn() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value).then((e)=>{
        
        alert("login sukses");

        window.location.href = "data.html";
    }
    );
    console.log("masuk pak eko");
}
