//base
var apikey = 'e5142111c9dcd186123438d20ef50cd0';
var baseurl = 'https://api.themoviedb.org/3/';

$(document).ready(function () {
	var stringfly = localStorage.getItem("movie");
	var object = JSON.parse(stringfly);
	var object2 = JSON.parse(object);
	console.log(object2);

	var posterpath = "http://image.tmdb.org/t/p/w500/" + object2.poster_path;
	$('#poster').attr("src", posterpath);
	$('#judul').text("Movie Title : " + object2.title);
	$('#rating').text("Rating : " + object2.vote_average);
	$('#runtime').text("Movie duration : " + object2.runtime);

	let voteAvg = object2.vote_average;

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

	$('#harga').text("Harga tiket : " + harga);

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

	xhr.addEventListener("readystatechange", function (){
	  if (this.readyState === this.DONE) {
		var dataobj = JSON.parse(this.responseText);
		//console.log(dataobj);
		showcast(dataobj.cast);
	  }
	});
	var url = baseurl + 'movie/' + object2.id + '/credits?api_key=' + apikey + '&language=en-US' ;
	xhr.open("GET",url);

	xhr.send(data);

	
});

function showcast(casts){
	console.log(casts);
	for (i = 0; i < 10; i++) {
		let character = "<p>" + casts[i].character + "</p>";
		let name = "<p>" + casts[i].name + "</p>";
		let datacast = "<div class='col-md-3 col-sm-6 col-xl-2 text-center'>" + name + " as " + character + "</div>";
		$('#cast').append(datacast);
	}
}

//logout
$(".btn-logout").click(function () {
	window.location.href = "login.html";
	console.log("Keluar");
});