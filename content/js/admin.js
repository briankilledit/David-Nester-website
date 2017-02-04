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
	var youtube_id = '';



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
		},
		videos : function(){
			var query = new Parse.Query("Videos");
			query.first({
				success: function($result) {
					youtube_id = $result.get("youtube_id");
					$("input[for='youtube_id']").val(youtube_id);
				},
				error: function(error) {
					console.log("Error: " + error.code + " " + error.message);
				}
			});			
		},
		shows : function(){
			shows = [];
			var query = new Parse.Query('Shows');
			query.find({
				success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var newShow = {};
						newShow.id = results[i].id;
						newShow.date = results[i].get('date');
						newShow.dateObj = createDateObj(newShow.date);
						newShow.venue = results[i].get('venue');
						newShow.city = results[i].get('city');
						newShow.state = results[i].get('state');
						newShow.band = results[i].get('band');
						newShow.type = results[i].get('type');

						shows.push(newShow);

						results[i].set('dateObj', newShow.dateObj);
						results[i].save().then(function($obj) {
							// console.log("Save dateObj successful!", $obj);
						}, function($error) {
							console.log("Save dateObj failed", $error);
						});

					}
					populateShowsList();
				},
				error: function(error) {
					console.log("Error: " + error.code + " " + error.message);
				}
			});
		}
	};






	// ============================================
	// 				HERO SECTION 
	// ============================================

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







	// ============================================
	// 				VIDEO SECTION 
	// ============================================

	function saveVideosForm(){
		var idInput = $("input[for='youtube_id']").val();
		var query = new Parse.Query("Videos");
		query.first({
			success: function($result) {
				$result.set("youtube_id", idInput);
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
	};






	// ============================================
	// 				SHOWS LIST
	// ============================================


	// Simple util to return a date object from a "xx/xx/xx" style sate string
	// -------------------------------------------------------------------------------------
	function createDateObj($date) {
		var dateParts = $date.split("/");
		return new Date(2000 + parseInt(dateParts[2], 10), parseInt(dateParts[0], 10) - 1, parseInt(dateParts[1], 10));
	};

	// Sort & populate the list in the admin with all shows from database
	// -------------------------------------------------------------------------------------
	function populateShowsList(){

		shows.sort(function(a, b){
			return a.dateObj - b.dateObj;
		});

		$(".showsList tbody").empty().promise().done(function(){
			for(var i = 0; i < shows.length; i++){
				var thisShowRow = "<tr showId='" + shows[i].id + "'><td>" + shows[i].date + "</td><td>" + shows[i].venue + "</td><td>" + shows[i].city + "</td><td>" + shows[i].state + "</td><td>" + shows[i].band + "</td><td>" + shows[i].type + "</td></tr>";
				$(".showsList tbody").append(thisShowRow);
			}
		});

		$(".showsList tbody tr").bind('click', function(){
			var thisId = $(this).attr("showId");
			editShowPopup(thisId);
		});



	};


	function editShowPopup($showId){

		animatePopup(function(){
			if($showId){
				console.log("Edit show: " + $showId);
			} else {
				console.log("Adding new show!");
			}
		});
	};


	function animatePopup($func){
		$func();
	}














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

		$("#submitVideos").on('click', function(){
			saveVideosForm();
		});
		
		$("#addNewShow").on('click', function(){
			editShowPopup();
		});

	};












	$(document).on('ready', function(){
		initApp();
	});




}());



