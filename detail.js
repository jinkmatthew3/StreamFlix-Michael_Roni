//base
var apikey = 'e5142111c9dcd186123438d20ef50cd0';
var baseurl = 'https://api.themoviedb.org/3/';

$(document).ready(function(){
	var stringfly = localStorage.getItem("movie");
	var object = JSON.parse(stringfly);
	var object2 = JSON.parse(object);
	console.log(object2);
	
	var posterpath = "http://image.tmdb.org/t/p/w500/" + object2.poster_path ;
	$('#poster').attr("src",posterpath);
	$('#judul').text("Movie Title : " + object2.title);
	$('#rating').text("Rating : " + object2.vote_average);
	$('#overview').text(object2.overview);
	$('#budget').text("Budget : " + object2.budget);
	
	let company = object2.production_companies;
	console.log(company);
	for(i = 0; i < company.length; i++){
		if(company[i].logo_path == null){
			let nama = "<p>" + company[i].name + "</p>"
			let datacompany = "<div class='col-md-3 col-sm-6 col-xl-2 text-center'>" + nama + "</div>";
			$('#perusahaan').append(datacompany);
		}
		else{
			let logo = "http://image.tmdb.org/t/p/w154/" + company[i].logo_path;
			let logoimg = "<img class='logocompany' src="+ logo + " />";
			let nama = "<p>" + company[i].name + "</p>"
			let datacompany = "<div class='col-md-3 col-sm-6 col-xl-2 text-center'>" + logoimg + nama + "</div>";
			$('#perusahaan').append(datacompany);
		}
		
	}
});

//logout
$(".btn-logout").click(function(){
		window.location.href = "login.html";
		console.log("Keluar");
});