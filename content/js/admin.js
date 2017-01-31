(function(){ 
	'use strict';




	// Constants
	// ===================================
	var PARSE_ID = "edbfdd6e-d9d4-4231-a614-41a72f87fe1f";
	var PARSE_SERVER_URL = 'https://api.parse.buddy.com/parse/';



	// Variables
	// ===================================
	var hero = {};
	var shows = [];



	// Functions
	// ===================================
	function initApp(){
		bindEvents();
		Parse.initialize(PARSE_ID);
		Parse.serverURL = PARSE_SERVER_URL;
		checkUser();
	};

	function checkUser(){
		var currentUser = Parse.User.current();
		if (currentUser) {
			checkURL();
		} else {
			updateView('login');
		}
	};

	function checkURL(){
		var hash = window.location.hash;
		var view = hash.replace("#", "") || 'index';
		updateView(view);
	};

	function login(){

		var parseUser = $(".login #email").val(),
			parsePass = $(".login #password").val();

		Parse.User.logIn(parseUser, parsePass, {
			success: function($user) {
				updateView('index');
			},
			error: function($user, $err) {
				alert($err.message);
			}
		});
	};

	function logout(){
		Parse.User.logOut().then(function(){
			location.reload();
		});
	};

	function updateView($view){

		var allSections = $("body.admin main section");
		var toShow = $("body.admin main section." + $view);
		var allButsLi = $("ul.nav li a").parent("li");
		var thisButLi = $("ul.nav li a[href='#" + $view + "']").parent("li");
		var hitDb = queryTable[$view];

		allButsLi.removeClass("active");
		allSections.hide();
		toShow.show();
		thisButLi.addClass("active");

		if($view == "login"){
			$("nav.navbar").hide();
		} else {
			var currentUser = Parse.User.current().get("fname");
			$("nav.navbar").show();
			$("#user, #userIntro").html(currentUser);
		}

		if(hitDb){
			hitDb();
		}

	};

	var queryTable = {
		index : function(){

		}, 
		hero : function(){
			var query = new Parse.Query("Hero");
			query.first({
				success: function($result) {
					hero.title = $result.get("title");
					hero.subtitle = $result.get("subtitle");
					hero.buttonText = $result.get("buttonText");
					hero.imgUrl = $result.get("imgUrl");
					populateHeroForm();
				},
				error: function(error) {
					console.log("Error: " + error.code + " " + error.message);
				}
			});
		}
	};


	function populateHeroForm(){
		$("#hero-form input[type='text']").each(function(){
			$(this).val("");
			var forAttr = $(this).attr("for");
			var forVal = hero[forAttr];
			$(this).val(forVal);
		});
	};

	function saveHeroForm(){
		$("#hero-form input[type='text']").each(function(){
			var val = $(this).val();
			var forAttr = $(this).attr("for");
			hero[forAttr] = val;
		}).promise().done(function(){
			var query = new Parse.Query("Hero");
			query.first({
				success: function($result) {
					$result.set("title", hero.title);
					$result.set("subtitle", hero.subtitle);
					$result.set("buttonText", hero.buttonText);
					$result.set("imgUrl", hero.imgUrl);
					$result.save().then(function($obj) {
						alert("Save successful!");
					}, function($error) {
						alert("Save failed");
					});
				},
				error: function(error) {
					console.log("Error: " + error.code + " " + error.message);
				}
			});
		});
	};


















	function bindEvents(){

		$("nav a").on('click', function(e){
			var href = $(this).attr("href");
			var view = href.replace("#", "");
			if(view){
				updateView(view);
			}
		});

		$("#logout").on('click', function(){
			logout();
		});

		$("#submitLogin").on('click', function(){
			login();
		});

		$(".login input").on('keypress', function(e){
			if (e.which == 13 || e.keyCode == 13) {
				login();
			}
		});

		$("#submitHero").on('click', function(){
			saveHeroForm();
		});

	};












	$(document).on('ready', function(){
		initApp();
	});




}());



	// function returnShows(){
	// 	var query = new Parse.Query('Shows');

	// 	query.find({
	// 		success: function(results) {
	// 			for (var i = 0; i < results.length; i++) {
	// 				var newShow = {};
	// 				newShow.dateObj = results[i].get('date');
	// 				newShow.date = formatDate(newShow.dateObj);
	// 				newShow.venue = results[i].get('venue');
	// 				newShow.city = results[i].get('city');
	// 				newShow.band = results[i].get('band');
	// 				newShow.isDrummer = results[i].get('isDrummer');
	// 				newShow.type = newShow.isDrummer ? "Drummer" : "Drum Tech";
	// 				shows.push(newShow);
	// 			}

	// 			console.log(shows);

	// 		},
	// 		error: function(error) {
	// 			console.log("Error: " + error.code + " " + error.message);
	// 		}
	// 	});

	// 	var test = new Date();

	// 	console.log(formatDate(test));
	// }


	// function formatDate($date){

	// 	var theMonthNum = $date.getUTCMonth()+1,
	// 		theMonth = theMonthNum < 10 ? "0"+theMonthNum.toString() : theMonthNum.toString(),
	// 		theDay = $date.getUTCDate().toString(),
	// 		fullYear = $date.getFullYear().toString(),
	// 		theYear = fullYear.substr(-2),
	// 		theDate = theMonth + "/" + theDay + "/" + theYear;

	// 	return theDate;

	// };
