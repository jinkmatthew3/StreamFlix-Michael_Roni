//base
var apikey = 'e5142111c9dcd186123438d20ef50cd0';
var baseurl = 'https://api.themoviedb.org/3/';

$(document).ready(function(){	

	
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
	
	xhrconfig.open("GET", "https://api.themoviedb.org/3/configuration?api_key="+apikey);
	xhrconfig.send(dataconfig);
	
	//get now playing
	var data = "{}";
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = false;

	xhr.addEventListener("readystatechange", function (){
	  if (this.readyState === this.DONE) {
		var dataobj = JSON.parse(this.responseText);
		//console.log(dataobj);
		shownowplaying(dataobj);
	  }
	});
	var url = baseurl + 'movie/now_playing?page=1&language=en-US&api_key=' + apikey;
	xhr.open("GET",url);

	xhr.send(data);
	
	
	
	
	//show now playing
	function shownowplaying(dataobj){
		let output = '';
		for(i = 0; i < dataobj.results.length; i ++){
			let posterpath = "http://image.tmdb.org/t/p/w342/"+ dataobj.results[i].poster_path;
			//console.log(posterpath);
			let title = dataobj.results[i].title;
			let voteAvg = dataobj.results[i].vote_average;
			
			let harga = 0;
			if(voteAvg >= 8){
				harga = 21250;
			}
			else if(voteAvg >= 6){
				harga = 16350;
			}
			else if(voteAvg >= 3){
				harga = 8250;
			}
			else {
				harga = 3500;
			}

			let image = "<img class='poster' src="+ posterpath + " />";
			let title_name =  "<p style='border-bottom: 5px solid black;'>"+ title +"</p>"  ;
			let releaseDateTag =  "<p> Harga : "+ harga +"</p>"  ;
			let buttondetails = `<button class="btn btn-dark btn-lg" onclick="moviedetails('${dataobj.results[i].id}')  " >More Details</button>`;
			
			let datamovies = "<div class='col-sm-12 col-md-12 col-lg-6 col-xl-4 well text-center' style='padding-top:20px;padding-bottom:20px;font-size:15px;border: 1px solid black'>" + image + title_name + releaseDateTag + buttondetails +"</div>";
			output += datamovies;
		}
		$('#movieslist').append(output);
	}
});

function moviedetails(id){
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
	xhr.open("GET",url);
	
	xhr.send(data);
}