(function(){ 
	'use strict';

	// Constants
	// ===================================
	// const PARSE_ID = "edbfdd6e-d9d4-4231-a614-41a72f87fe1f";
	// const PARSE_SERVER_URL = 'https://api.parse.buddy.com/parse/';
	const PARSE_ID = "9Eno0UYO18a5d3qWORc4OQQHzVzEdWkOBEuRu36P";
	const PARSE_JS_ID = "7JtPu8RstTSzsD6OK3zL1LOv2gsitkv5FJBz8yIK";
	const PARSE_SERVER_URL = 'https://parseapi.back4app.com';

	// Global VARs
	// ===================================
	var currentUserFirstName = "man";
	var loader = $("body.admin .loaderBar");


	// Functions
	// ===================================
	function initApp(){
		bindEvents();
		calenderForm();
		Parse.initialize(PARSE_ID, PARSE_JS_ID);
		Parse.serverURL = PARSE_SERVER_URL;
		CKEDITOR.inline('aboutTextEditor');
		CKEDITOR.on("instanceReady", function(event){
			checkUser();
		});
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

		loader.show();

		var parseUser = $(".login #email").val(),
			parsePass = $(".login #password").val();

		Parse.User.logIn(parseUser, parsePass, {
			success: function($user) {
				loader.hide();
				updateView('index');
			},
			error: function($user, $err) {
				loader.hide();
				pop.alert($err.message);
			}
		});
	};

	function logout(){
		loader.show();
		Parse.User.logOut().then(function(){
			location.reload();
		});
	};

	var pop = {
		show: function(){
			$(".blackout.alert").fadeIn(200);
		},
		hide: function($func){
			$(".blackout.alert").fadeOut(200).promise().done(function(){
				if($func){
					$func();
				}
			});
		},
		alert: function($text, $obj){

			$text = $text ? $text : "Are you sure?";
			$(".blackout.alert .panel-body p").html($text).promise().done(function(){
				pop.show();
			});

			$(".blackout.alert .panel-body .btn").on('click', function(){
				var thisFor = $(this).attr("for");
				if($obj){
					if($obj.afterClose){
						pop.hide(function(){
							$obj.afterClose();
						});
					} else if ($obj.yes && thisFor == "confirm"){
						pop.hide(function(){
							$obj.yes();
						});
					} else if ($obj.yes && thisFor !== "confirm"){
						pop.hide(function(){
							$obj.no();
						});
					}
				} else {
					pop.hide();
				};
			});
		}
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
			currentUserFirstName = Parse.User.current().get("fname");
			$("nav.navbar").show();
			$("#user, #userIntro").html(currentUserFirstName);
		}

		if(hitDb){
			hitDb();
		}

	};

	var queryTable = {
		hero : function(){
			$("section.hero input").attr("placeholder", "loading...");
			var hero = {};
			var query = new Parse.Query("Hero");
			loader.show();
			query.first({
				success: function($result) {
					hero.title = $result.get("title");
					hero.subtitle = $result.get("subtitle");
					hero.buttonText = $result.get("buttonText");
					hero.imgUrl = $result.get("imgUrl");
					populateHeroForm(hero);
					$("section.hero input").attr("placeholder", "Please enter a value here");
					loader.hide();
				},
				error: function(error) {
					pop.alert("Error: " + error.code + " " + error.message);
					loader.hide();
				}
			});
		},
		videos : function(){
			$("input[for='youtube_id']").attr("placeholder", "loading...");
			var query = new Parse.Query("Videos");
			loader.show();
			query.first({
				success: function($result) {
					var youtube_id = $result.get("youtube_id");
					var playlist_id = $result.get("playlist_id");
					var displayLimit = $result.get("displayLimit");
					$("input[for='youtube_id']").val(youtube_id);
					$("input[for='playlist_id']").val(playlist_id);
					$("input[for='displayLimit']").val(displayLimit);
					$("section.videos input").attr("placeholder", "Please enter a value here");
					loader.hide();
				},
				error: function(error) {
					pop.alert("Error: " + error.code + " " + error.message);
					loader.hide();
				}
			});			
		},
		shows : function(){
			var shows = [];
			var query = new Parse.Query('Shows');
			loader.show();
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
					populateShowsList(shows);
					loader.hide();
				},
				error: function(error) {
					pop.alert("Error: " + error.code + " " + error.message);
					loader.hide();
				}
			});
		},
		about : function(){
			$("#aboutTextEditor").removeClass('ready');
			$("#aboutTextEditor").html("<p>Loading...</p>");
			var query = new Parse.Query('About');
			loader.show();
			query.first({
				success: function($result) {
					var aboutText = $result.get('aboutText');
					$("#aboutTextEditor").addClass('ready');
					populateAboutForm(aboutText);
					loader.hide();
				},
				error: function(error) {
					pop.alert("Error: " + error.code + " " + error.message);
					loader.hide();
				}
			});
		},
		contact : function(){
			$("section.contact input").attr("placeholder", "loading...");
			var query = new Parse.Query('Contact');
			loader.show();
			query.first({
				success: function($result) {
					var contactInfo = {};
					contactInfo.email = $result.get('email');
					contactInfo.youtube = $result.get('youtube');
					contactInfo.facebook = $result.get('facebook');
					contactInfo.linkedin = $result.get('linkedin');
					contactInfo.twitter = $result.get('twitter');
					contactInfo.instagram = $result.get('instagram');
					populateContactForm(contactInfo);
					$("section.contact input").attr("placeholder", "Please enter a value here");
					loader.hide();
				},
				error: function(error) {
					pop.alert("Error: " + error.code + " " + error.message);
					loader.hide();
				}
			});
		}
	};

	// ============================================
	// 				CONTACT SECTION 
	// ============================================

	function populateContactForm($contactInfo){
		$("section.contact input").each(function(){
			var thisFor = $(this).attr("for");
			var thisValue = $contactInfo[thisFor];
			$(this).val(thisValue);
			$(this).attr("placeholder", "");
		});
	};

	function saveContactForm(){
		var emptyFields = 0;
		var formVals = {};
		$("section.contact input").each(function(){
			var thisFor = $(this).attr("for");
			var thisVal = $(this).val();
			if(thisVal.length > 0){
				formVals[thisFor] = thisVal;
				$(this).closest('.form-group').removeClass("has-error");
			} else {
				emptyFields++;
				$(this).closest('.form-group').addClass("has-error");
			}
		}).promise().done(function(){
			if(emptyFields > 0){
				pop.alert("DAMMIT " + currentUserFirstName + "! You are missing " + emptyFields + " field(s) in the form!");
			} else {
				var query = new Parse.Query("Contact");
				loader.show();
				query.first({
					success: function($result) {
						$result.set(formVals);
						$result.save().then(function($obj) {
							pop.alert("Save successful!");
							updateView("contact");
						}, function($error) {
							pop.alert("Save failed");
							updateView("contact");
						});
						loader.hide();
					},
					error: function(error) {
						pop.alert("Error: " + error.code + " " + error.message);
						loader.hide();
					}
				});
			}
		});
	};

	// ============================================
	// 				ABOUT SECTION 
	// ============================================

	function populateAboutForm($aboutText){
		$("#aboutTextEditor").html($aboutText);
	};

	function saveAboutForm(){
		var textareaVal = $("#aboutTextEditor").html();
		if(textareaVal.length > 11){
			var query = new Parse.Query("About");
			loader.show();
			query.first({
				success: function($result) {
					$result.set("aboutText", textareaVal);
					$result.save().then(function($obj) {
						$("#about-form .form-group").removeClass('has-error');
						pop.alert("Save successful!");
						updateView("about");
					}, function($error) {
						pop.alert("Save failed");
						window.location.reload();
					});
					loader.hide();
				},
				error: function(error) {
					pop.alert("Error: " + error.code + " " + error.message);
					loader.hide();
				}
			});
		} else {
			$("#about-form .form-group").addClass('has-error');
			pop.alert("Please, " + currentUserFirstName + ", you have to enter SOMETHING.");
		}
	};

	// ============================================
	// 				HERO SECTION 
	// ============================================

	function populateHeroForm($hero){
		$("section.hero input[type='text']").each(function(){
			$(this).val("");
			var forAttr = $(this).attr("for");
			var forVal = $hero[forAttr];
			$(this).val(forVal);
		});
	};

	function saveHeroForm(){
		var hero = {};
		var missingFields = 0;
		$("section.hero input[type='text']").each(function(){
			var val = $(this).val();
			var forAttr = $(this).attr("for");

			if(val.length > 0){
				hero[forAttr] = val;
				$(this).closest(".form-group").removeClass("has-error");
			} else {
				missingFields++;
				$(this).closest(".form-group").addClass("has-error");
			}

		}).promise().done(function(){
			if(missingFields > 0){
				pop.alert("You are missing " + missingFields + " field(s) in the form. Come on " + currentUserFirstName + ".");
			} else {
				var query = new Parse.Query("Hero");
				loader.show();
				query.first({
					success: function($result) {
						$result.set(hero);
						$result.save().then(function($obj) {
							pop.alert("Save successful!");
						}, function($error) {
							pop.alert("Save failed");
						});
						loader.hide();
					},
					error: function(error) {
						pop.alert("Error: " + error.code + " " + error.message);
						loader.hide();
					}
				});
			}
		});
	};

	// ============================================
	// 				VIDEO SECTION 
	// ============================================

	function saveVideosForm(){
		var videoObj = {};
		var missingFields = 0;
		$("section.videos input[type='text']").each(function(){
			var val = $(this).val();
			var forAttr = $(this).attr("for");

			if(val.length > 0){
				videoObj[forAttr] = val;
				$(this).closest(".form-group").removeClass("has-error");
			} else {
				missingFields++;
				$(this).closest(".form-group").addClass("has-error");
			}

		}).promise().done(function(){
			if(missingFields > 0){
				pop.alert("You are missing " + missingFields + " field(s) in the form. Come on " + currentUserFirstName + ".");
			} else {
				var query = new Parse.Query("Videos");
				loader.show();
				query.first({
					success: function($result) {
						$result.set(videoObj);
						$result.save().then(function($obj) {
							pop.alert("Save successful!");
						}, function($error) {
							pop.alert("Save failed");
							console.log($error);
						});
						loader.hide();
					},
					error: function(error) {
						pop.alert("Error: " + error.code + " " + error.message);
						loader.hide();
					}
				});
			}
		});
	};

	// ============================================
	// 				SHOWS LIST
	// ============================================

	// Simple util to return a date object from a "xx/xx/xx" style string
	// -------------------------------------------------------------------------------------
	function createDateObj($date) {
		var dateParts = $date.split("/");
		return new Date(2000 + parseInt(dateParts[2], 10), parseInt(dateParts[0], 10) - 1, parseInt(dateParts[1], 10));
	};

	// Sort & populate the list in the admin with all shows from database
	// -------------------------------------------------------------------------------------
	function populateShowsList($shows){
		var yesterday = (function(d){ d.setDate(d.getDate()-1); return d})(new Date);

		$shows.sort(function(a, b){
			// return a.dateObj - b.dateObj;
			return b.dateObj - a.dateObj;
		});

		$(".showsList tbody").empty().promise().done(function(){
			for(var i = 0; i < $shows.length; i++){
				var compare = $shows[i].dateObj - yesterday;
				var oldShow = compare < 0 ? "old" : "";
				var thisShowRow = "<tr class='" + oldShow + "' showid='" + $shows[i].id + "'><td>" + $shows[i].date + "</td><td>" + $shows[i].venue + "</td><td>" + $shows[i].city + "</td><td>" + $shows[i].state + "</td><td>" + $shows[i].band + "</td><td>" + $shows[i].type + "</td><td><button class='btn btn-xs btn-danger pull-right' id='deleteShow'>Delete</button></td></tr>";
				$(".showsList tbody").append(thisShowRow);
			}
		});
		$(".showsList tbody tr").bind('click', function(e){
			var thisId = $(this).attr("showid");
			var isOld = $(this).hasClass("old");
			if(e.target.id == "deleteShow"){
				deleteShow(thisId, $shows);
			} else {
				showsPopup.fadeIn(thisId, isOld, $shows);
			}
		});
	};

	var showsPopup = {
		fadeIn : function($showId, $isOld, $shows){
			if($showId){
				var msg = $isOld ? "Edit Show <span class='alert'>Warning: This is show is old</span>" : "Edit Show";
				$(".addOrEdit").html(msg);
				$(".editShow").attr("data-show-id", $showId);
				populateShowsForm($showId, $shows, function(){
					$(".blackout.editShow").fadeIn(300);
				});
			} else {
				$(".addOrEdit").html("Add New Show");
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

	function populateShowsForm($showId, $shows, $func){

		$(".editShow").attr("data-show-id", $showId);

		for(var i = 0; i < $shows.length; i++){
			if($shows[i].id == $showId){
				for(var key in $shows[i]){
					$(".editShow .show-form-input[key='" + key + "']").val($shows[i][key]);
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
				pop.alert("You are missing " + missingFields.length + " field" + onlyOne + "!");

			} else {

				var formtattedYear = formVals.year.slice(-2);
				formVals.date = formVals.month + "/" + formVals.day + "/" + formtattedYear;
				formVals.dateObj = createDateObj(formVals.date);

				if(!showId){
					var NewShow = Parse.Object.extend("Shows");
					var newshow = new NewShow();
					newshow.set(formVals);
					loader.show();
					newshow.save(null, {
						success: function($newshow) {
							loader.hide();
							pop.alert("New show successfully saved!", {
								afterClose: function(){
									showsPopup.fadeOut();
									updateView("shows");
								}
							});
						},
						error: function($newshow, $error) {
							pop.alert('Failed to create new object, with error code: ' + $error.message);
							loader.hide();
						}
					});
				} else {
					var query = new Parse.Query('Shows');
					loader.show();
					query.find({
						success: function($results) {
							for(var i = 0; i < $results.length; i++) {
								if($results[i].id == showId){
									$results[i].set(formVals);
									$results[i].save().then(function($obj) {
										pop.alert("This show successfully updated!", {
											afterClose: function(){
												showsPopup.fadeOut();
												updateView("shows");
											}
										});
									}, function($error) {
										pop.alert("Save failed :(");
									});
								}
							}
							loader.hide();
						},
						error: function(error) {
							pop.alert("Error: " + error.code + " " + error.message);
							loader.hide();
						}
					});
				}

			}

		});
	};

	function deleteShow($thisId, $shows){
		pop.alert("Are you sure you want to delete this show?", {
			yes: function(){
				var query = new Parse.Query('Shows');
				loader.show();
				query.get($thisId, {
					success : function($obj){
						$obj.destroy({
							success: function() {
								showsPopup.fadeOut();
								updateView("shows");
							},
							error: function($err) {
								pop.alert("Delete failed, please try again.");
								console.log($err);
							}
						});
						loader.hide();
					},
					error : function($obj,$err){
						pop.alert("Delete failed, please try again.");
						console.log($obj);
						console.log($err);
						loader.hide();
					}
				});
			}
		});
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

		$("#submitAbout").on('click', function(){
			saveAboutForm();
		});

		$("#submitContact").on('click', function(){
			saveContactForm();
		});

	};

	$(document).on('ready', function(){
		initApp();
	});

}());