//  *
//  *
//  *	Copyright 2016
//  *	Brian Stephens
//  *	for
//  *	David Nester Drums
//  *
//  *
//  *



$(document).ready(function(){




	// Global Constants
	var SCROLL_SWITCH = 25;



	// ----------------------------------------------------
	// Add & Remove class for nav
	// ----------------------------------------------------

	function scrollyNav(){
		var navie = $(document).scrollTop();
		var check = $("nav").hasClass("scrolling");
		if(navie > SCROLL_SWITCH && !check){
			$("nav").addClass("scrolling");
		} else if(navie < 1){
			$("nav").removeClass("scrolling");
		};
	};








	// ----------------------------------------------------
	// Animate scroll to anchor
	// ----------------------------------------------------

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
				scrollTop: target.offset().top - 59
			}, 280);
				return false;
			}
		}
	});








	// ----------------------------------------------------
	// Pop-up video!
	// ----------------------------------------------------

	$("#videoList li").bind("click", function(){
		var link = $(this).attr("video");
		if(link){
			$(".blackOut").fadeIn(250, function(){
				$(".blackOut .popBox").slideDown(200, function(){
					$(".blackOut .close").fadeIn(300);
					$(".blackOut iframe").attr("src", link);
				});
			});
		};
	});







	// ----------------------------------------------------
	// Close pop-up video
	// ----------------------------------------------------

	$(".blackOut").bind("click", function(evt){
		var check = evt.target.className == "close" || evt.target.className == "blackOut";
		if(check){
			$(".blackOut iframe").attr("src", "");
			$(".blackOut iframe").addClass("noLoader");
			$(".blackOut .close").fadeOut(300, function(){
				$(".blackOut .popBox").slideUp(200, function(){
					$(".blackOut iframe").removeClass("noLoader");
					$(".blackOut").fadeOut(250);
				});
			});
		};
	});




	// ----------------------------------------------------
	// Mobile nav shit
	// ----------------------------------------------------

	var mobileNav = {
		hide: function(){
			$(".hamburger, .hamSlice").removeClass("ex");
			$("#mobileDropdown").slideUp(300);
		},
		show: function(){
			$(".hamburger, .hamSlice").addClass("ex");
			$("#mobileDropdown").slideDown(300);
		}
	};

	$("html, a").bind("click", function(e){
		var target = e.target.className;
		if(target === "hamburger" || target === "hamSlice"){
			mobileNav.show();
		} else {
			mobileNav.hide();
		};
	});





	// ----------------------------------------------------
	//  Footer color on socmed hover
	// ----------------------------------------------------

	$(".socMed a").on( "mouseover", function(){
		var check = $(".hamburger").is(":visible");
		if(!check){
			$("#footer").attr("class", "wrapper");
			var thisName = $(this).attr("class");
			$("#footer").addClass(thisName);
		};
	});

	$(".socMed").on( "mouseleave", function(){
		var check = $(".hamburger").is(":visible");
		if(!check){
			$("#footer").attr("class", "wrapper");
		};
	});






	// ----------------------------------------------------
	// Fire function on page scroll
	// ----------------------------------------------------

	$(document).on("scroll", function(){
		scrollyNav();
	});





	// ----------------------------------------------------
	// Fire function on page load
	// ----------------------------------------------------

	scrollyNav();
	$(".blackOut iframe").attr("src", "");












	// heroItems = {};

	// Parse.initialize("edbfdd6e-d9d4-4231-a614-41a72f87fe1f");
	// Parse.serverURL = "https://api.parse.buddy.com/parse/";

	// var query = new Parse.Query("Hero");
	// query.first({
	// 	success: function($result) {
	// 		heroItems.title = $result.get("title");
	// 		heroItems.subtitle = $result.get("subtitle");
	// 		heroItems.buttonText = $result.get("buttonText");
	// 		heroItems.imgUrl = $result.get("imgUrl");
	// 		populateHero();
	// 	},
	// 	error: function(error) {
	// 		console.log("Error: " + error.code + " " + error.message);
	// 	}
	// });

	// function populateHero(){
	// 	$("#hero").attr("style", "background-image: url('" + heroItems.imgUrl + "');");
	// 	$("#hero h1").html(heroItems.title);
	// 	$("#hero h2").html(heroItems.subtitle);
	// 	$("#hero .button a").html(heroItems.buttonText);
	// };















});