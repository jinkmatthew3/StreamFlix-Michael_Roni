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

var stringfly = localStorage.getItem("movie");
var object = JSON.parse(stringfly);
var object2 = JSON.parse(object);
console.log(object2);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
var db = firebase.firestore();
var balance, harga;
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
						movies.forEach(element => {
							console.log(element + ' ' + object2.id);
							if(element == object2.id){
								
								$('#buttonBuy').prop('disabled',true);
								$('#buttonBuy').text("You already have this item");
							}
						});
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

	



	var posterpath = "http://image.tmdb.org/t/p/w500/" + object2.poster_path;
	$('#poster').attr("src", posterpath);
	$('#judul').text("Movie Title : " + object2.title);
	$('#rating').text("Rating : " + object2.vote_average);
	$('#runtime').text("Movie duration : " + object2.runtime);

	let voteAvg = object2.vote_average;

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

	$('#harga').text("Harga tiket : " + convertToRupiah(harga));

	// let company = object2.production_companies;
	// console.log(company);
	// for (i = 0; i < company.length; i++) {
	// 	if (company[i].logo_path == null) {
	// 		let nama = "<p>" + company[i].name + "</p>"
	// 		let datacompany = "<div class='col-md-3 col-sm-6 col-xl-2 text-center'>" + nama + "</div>";
	// 		$('#perusahaan').append(datacompany);
	// 	}
	// 	else {
	// 		let logo = "http://image.tmdb.org/t/p/w154/" + company[i].logo_path;
	// 		let logoimg = "<img class='logocompany' src=" + logo + " />";
	// 		let nama = "<p>" + company[i].name + "</p>"
	// 		let datacompany = "<div class='col-md-3 col-sm-6 col-xl-2 text-center'>" + logoimg + nama + "</div>";
	// 		$('#perusahaan').append(datacompany);
	// 	}
	//}

	var data = "{}";
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = false;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			var dataobj = JSON.parse(this.responseText);
			//console.log(dataobj);
			showCast(dataobj.cast);
		}
	});
	var url = baseurl + 'movie/' + object2.id + '/credits?api_key=' + apikey + '&language=en-US';
	xhr.open("GET", url);

	xhr.send(data);

	var data = "{}";
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = false;


	//ini buat similar movies
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			var dataobj2 = JSON.parse(this.responseText);
			//console.log(dataobj);
			showSimilar(dataobj2.results);
		}
	});
	var url = baseurl + 'movie/' + object2.id + '/similar?api_key=' + apikey + '&language=en-US&page=1';
	xhr.open("GET", url);

	xhr.send(data);


	// ini buat rekomendasi
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			var dataobj3 = JSON.parse(this.responseText);
			//console.log(dataobj);
			showRekomendasi(dataobj3.results);
		}
	});
	var url = baseurl + 'movie/' + object2.id + '/recommendations?api_key=' + apikey + '&language=en-US&page=1';
	xhr.open("GET", url);

	xhr.send(data);
});

function showCast(casts) {
	console.log(casts);
	for (i = 0; i < 10; i++) {
		let character = "<p>" + casts[i].character + "</p>";
		let name = "<p>" + casts[i].name + "</p>";
		let datacast = "<div class='col-md-3 col-sm-6 col-xl-2 text-center'>" + name + " as " + character + "</div>";
		$('#cast').append(datacast);
	}
}

function showSimilar(similar) {
	console.log(similar);
	for (i = 0; i < 4; i++) {
		let image = "<img width='200' height='300'  src='http://image.tmdb.org/t/p/w500/" + similar[i].poster_path + "'/>";
		let judul = "<p>" + similar[i].title + "</p>";
		let datasimilar = "<div class='col-md-3 col-sm-6 text-center'>" + image + judul + "</div>";
		$('#similar').append(datasimilar);
	}
}

function showRekomendasi(rekomendasi) {
	console.log(rekomendasi);
	for (i = 0; i < 4; i++) {
		let image = "<img width='200' height='300'  src='http://image.tmdb.org/t/p/w500/" + rekomendasi[i].poster_path + "'/>";
		let judul = "<p>" + rekomendasi[i].title + "</p>";
		let datarekomendasi = "<div class='col-md-3 col-sm-6 text-center'>" + image + judul + "</div>";
		$('#rekomendasi').append(datarekomendasi);
	}
}

function convertToRupiah(angka) {
	var rupiah = '';
	var angkarev = angka.toString().split('').reverse().join('');
	for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
	return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
}

function buyNow() {
	var r = confirm("Are you sure ??");
	if (r == true) {
		movies.push(object2.id);
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				var uid = user.uid;
				console.log(uid);
				var docRef = db.collection("users").doc(uid);
				return docRef.update({
					balance: balance - harga,
					movies : movies
				})
					.then(() => {
						console.log("Document successfully updated!");
						location.reload();
					})
					.catch((error) => {
						// The document probably doesn't exist.
						console.error("Error updating document: ", error);
					});
			} else {
				window.location.href('index.html');
			}
		});

	}
}

//logout
$(".btn-logout").click(function () {
	window.location.href = "login.html";
	console.log("Keluar");
});