//base
var apikey = 'e5142111c9dcd186123438d20ef50cd0';
var baseurl = 'https://api.themoviedb.org/3/';

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
var movies = [];

$(document).ready(function () {

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			var uid = user.uid;
			console.log(uid);
			var docRef = db.collection("users").doc(uid);
			docRef.get().then((doc) => {
				if (doc.exists) {
					console.log(doc.data());
					console.log(doc.data().userName);
					balance = doc.data().balance;
					if(!doc.data().movies){
						console.log("kosong");
					}
					else{
						movies = doc.data().movies;
						console.log(movies);
					}
					$('#user').text(doc.data().userName + " " + convertToRupiah(doc.data().balance));
				}
				else {
					console.log("No such document");
				}
			}).catch((error) => {
				console.log("Error : ", error);
			})
		} else {
			window.location.href('index.html');
		}
	});


	//get config
	var dataconfig = "{}";

	var xhrconfig = new XMLHttpRequest();
	xhrconfig.withCredentials = false;

	xhrconfig.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			var configobj = JSON.parse(this.responseText);
			//console.log(configobj);
		}
	});

	xhrconfig.open("GET", "https://api.themoviedb.org/3/configuration?api_key=" + apikey);
	xhrconfig.send(dataconfig);

	//get now playing
	var data = "{}";
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = false;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			var dataobj = JSON.parse(this.responseText);
			//console.log(dataobj);
			shownowplaying(dataobj);
		}
	});
	var url = baseurl + 'movie/now_playing?page=1&language=en-US&api_key=' + apikey;
	xhr.open("GET", url);

	xhr.send(data);

});

//show now playing
function shownowplaying(dataobj) {
	let output = '';
	for (i = 0; i < dataobj.results.length; i++) {
		let posterpath = "http://image.tmdb.org/t/p/w342/" + dataobj.results[i].poster_path;
		//console.log(posterpath);
		let title = dataobj.results[i].title;
		let voteAvg = dataobj.results[i].vote_average;

		let harga = 0;
		if (voteAvg >= 8) {
			harga = 21250;
		}
		else if (voteAvg >= 6) {
			harga = 16350;
		}
		else if (voteAvg >= 3) {
			harga = 8250;
		}
		else {
			harga = 3500;
		}

		let image = `<img class='poster' src='` + posterpath + `'  onclick="moviedetails('${dataobj.results[i].id}')  "/>`;
		let title_name = "<p style='border-bottom: 5px solid black;'>" + title + "</p>";
		let releaseDateTag = "<p> Harga : " + convertToRupiah(harga) + "</p>";

		//console.log(movies);
		let temp = 0;
		for(j = 0; j < movies.length;j++){
			console.log(movies[j] + " " + dataobj.results[i].id);
			if(movies[j] == dataobj.results[i].id){
				console.log("ketemu");
				temp = 1;
				break;
			}
		}

		
		let datamovies;
		if(temp == 1){
			datamovies = "<div class='col-sm-12 col-md-12 col-lg-6 col-xl-4 well text-center bg-dark' style='padding-top:20px;padding-bottom:20px;font-size:15px;border: 1px solid black'>" + image + title_name + releaseDateTag + "</div>";
			break;
		}
		else{
			datamovies = "<div class='col-sm-12 col-md-12 col-lg-6 col-xl-4 well text-center' style='padding-top:20px;padding-bottom:20px;font-size:15px;border: 1px solid black'>" + image + title_name + releaseDateTag + "</div>";
		}
		//let datamovies = "<div class='col-sm-12 col-md-12 col-lg-6 col-xl-4 well text-center' style='padding-top:20px;padding-bottom:20px;font-size:15px;border: 1px solid black'>" + image + title_name + releaseDateTag + "</div>";
		output += datamovies;
	}
	$('#movieslist').append(output);
}

function moviedetails(id) {
	//console.log(id);

	var data = "{}";

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = false;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			localStorage.setItem("movie", JSON.stringify(this.responseText));
			window.location.href = "detail.html";
		}
	});

	var url = baseurl + "movie/" + id + "?api_key=" + apikey + "&language=en-us";
	xhr.open("GET", url);

	xhr.send(data);
}

function convertToRupiah(angka) {
	var rupiah = '';
	var angkarev = angka.toString().split('').reverse().join('');
	for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
	return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
}