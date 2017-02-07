(function(){ 
	'use strict';




	// Constants
	// ===================================
	const PARSE_ID = "edbfdd6e-d9d4-4231-a614-41a72f87fe1f";
	const PARSE_SERVER_URL = 'https://api.parse.buddy.com/parse/';



	// Variables
	// ===================================
	var hero = {};
	var shows = [];
	var youtube_id = '';



	// Functions
	// ===================================
	function initApp(){
		bindEvents();
		calenderForm();
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
						newShow.dateObj = results[i].get('dateObj');
						newShow.day = results[i].get('day');
						newShow.month = results[i].get('month');
						newShow.year = results[i].get('year');
						newShow.venue = results[i].get('venue');
						newShow.city = results[i].get('city');
						newShow.state = results[i].get('state');
						newShow.band = results[i].get('band');
						newShow.type = results[i].get('type');
						shows.push(newShow);
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
				var thisShowRow = "<tr showid='" + shows[i].id + "'><td>" + shows[i].date + "</td><td>" + shows[i].venue + "</td><td>" + shows[i].city + "</td><td>" + shows[i].state + "</td><td>" + shows[i].band + "</td><td>" + shows[i].type + "</td><td><button class='btn btn-xs btn-danger pull-right' id='deleteShow'>Delete</button></td></tr>";
				$(".showsList tbody").append(thisShowRow);
			}
		});

		$(".showsList tbody tr").bind('click', function(e){
			var thisId = $(this).attr("showid");
			if(e.target.id == "deleteShow"){
				deleteShow(thisId);
			} else {
				showsPopup.fadeIn(thisId);
			}
		});

	};

	var showsPopup = {
		fadeIn : function($showId){
			if($showId){
				$(".addOrEdit").html("Edit");
				$(".editShow").attr("data-show-id", $showId);
				populateShowsForm($showId, function(){
					$(".blackout.editShow").fadeIn(300);
				});
			} else {
				$(".addOrEdit").html("Add New");
				$(".blackout.editShow").fadeIn(300);
			}
		},
		fadeOut : function(){
			$(".blackout.editShow").fadeOut(300, function(){
				$(".editShow .show-form-input").each(function(){
					$(this).closest(".form-group").removeClass("has-error");
					$(this).val("");
					$(".editShow").attr("data-show-id", "")
				});
			});
		}
	};



	function populateShowsForm($showId, $func){

		$(".editShow").attr("data-show-id", $showId);

		for(var i = 0; i < shows.length; i++){
			if(shows[i].id == $showId){
				for(var key in shows[i]){
					$(".editShow .show-form-input[key='" + key + "']").val(shows[i][key]);
				}
				break;
			}
		}

		if($func){
			$func();
		}

	};

	function saveShowForm(){

		var formVals 		= {},
			missingFields	= [],
			showId 			= $(".editShow").attr("data-show-id");

		$(".editShow .show-form-input").each(function(){

			var value	 = null,
				thisKey  = $(this).attr("key");

			if($(this).is("select")){
				value = $(this).find(":selected").attr("value");
			} else {
				value = $(this).val();
			}

			if( !value || parseInt(value) < 1 ){
				missingFields.push(thisKey);
				$(this).closest('.form-group').addClass("has-error");
			} else {
				formVals[thisKey] = value;
				$(this).closest('.form-group').removeClass("has-error");
			}


		}).promise().done(function(){

			if(missingFields.length > 0){

				var onlyOne = missingFields.length > 1 ? "s" : "";
				alert("You are missing " + missingFields.length + " field" + onlyOne + "!");

			} else {

				var formtattedYear = formVals.year.slice(-2);
				formVals.date = formVals.month + "/" + formVals.day + "/" + formtattedYear;
				formVals.dateObj = createDateObj(formVals.date);

				if(!showId){
					var NewShow = Parse.Object.extend("Shows");
					var newshow = new NewShow();
					newshow.set(formVals);
					newshow.save(null, {
						success: function($newshow) {
							var toClose = confirm("New show successfully saved!");
							if(toClose){
								showsPopup.fadeOut();
								updateView("shows");
							}
						},
						error: function($newshow, $error) {
							alert('Failed to create new object, with error code: ' + $error.message);
						}
					});
				} else {
					var query = new Parse.Query('Shows');
					query.find({
						success: function($results) {
							for(var i = 0; i < $results.length; i++) {
								if($results[i].id == showId){
									$results[i].set(formVals);
									$results[i].save().then(function($obj) {
										var toClose = confirm("This show successfully updated!");
										if(toClose){
											showsPopup.fadeOut();
											updateView("shows");
										}
									}, function($error) {
										alert("Save failed");
									});
								}
							}
						},
						error: function(error) {
							console.log("Error: " + error.code + " " + error.message);
						}
					});
				}

			}

		});
	};

	function deleteShow($thisId){
		var checkFirst = confirm("Are you sure you want to delete this show?");
		if(checkFirst){
			var query = new Parse.Query('Shows');
			query.get($thisId, {
				success : function($obj){
					$obj.destroy({
						success: function() {
							showsPopup.fadeOut();
							updateView("shows");
						},
						error: function($err) {
							alert("Delete failed!");
						}
					});
				},
				error : function($obj,$err){
					alert("Error: " + $err);
				}
			});
		}
	};























	function calenderForm(){

		var monthInput 	= $('.show-form-input[key="month"]'),
			dayInput 	= $('.show-form-input[key="day"]'),
			yearInput 	= $('.show-form-input[key="year"]'),
			stateInput 	= $('.show-form-input[key="state"]'),
			thisYear	= new Date().getFullYear(),
			days		= 31,
			months      = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			states		= [ "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY" ];

		for(var i = thisYear; i <= (thisYear+10); i++){
			yearInput.append("<option value='" + i + "'>" + i + "</option>");
		}
		for(var i = 1; i <= days; i++){
			dayInput.append("<option value='" + i + "'>" + i + "</option>");
		}
		for(var i = 0; i < months.length; i++){
			monthInput.append("<option value='" + (i+1) + "'>" + months[i] + "</option>");
		}
		for(var i = 0; i < states.length; i++){
			stateInput.append("<option value='" + states[i] + "'>" + states[i] + "</option>");
		}


	};

	function bindEvents(){

		$("nav a").on('click', function(e){
			var href = $(this).attr("href");
			var view = href.replace("#", "");
			if(view){
				updateView(view);
			}
		});

		$(".closePopup").on('click', function(){
			showsPopup.fadeOut();
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
			showsPopup.fadeIn();
		});

		$("#saveShow").on('click', function(){
			saveShowForm();
		});

	};












	$(document).on('ready', function(){
		initApp();
	});




}());



