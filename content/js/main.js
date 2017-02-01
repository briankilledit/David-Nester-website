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
	'use strict';




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
	// YouTube API
	// ----------------------------------------------------

	var channelId  = $("#videoList").attr("youtube");
	var apiKey     = "AIzaSyAKgQN4DxNo4XvdpIH3sKaZgX1F1upw7rQ";

	console.log(channelId);

	function fetchYoutubeData(){
		$.get(
			'https://www.googleapis.com/youtube/v3/channels',{
				part: 'contentDetails',
				id: channelId,
				key: apiKey }
		).done(function(data){
			var pid = data.items[0].contentDetails.relatedPlaylists.uploads;
			getVids(pid);
		});
	};

	function getVids($pid){
		$.get(
			'https://www.googleapis.com/youtube/v3/playlistItems',{
				part: 'snippet',
				maxResults: 12,
				playlistId: $pid,
				key: apiKey }
		).done(function(data){
			appendVideoList(data.items);
		});
	};

	function appendVideoList($vids){
		$("#videoList").html("");
		for(var i = 0; i < $vids.length; i++){
			var thisVideo = "<li video='https://www.youtube.com/embed/" + $vids[i].snippet.resourceId.videoId + "?autoplay=1'><div class='imgContainer'><div class='content' style='background-image: url(" + $vids[i].snippet.thumbnails.high.url + ");'></div></div><h3>" + $vids[i].snippet.title + "</h3></li>";
			$("#videoList").append(thisVideo);
		}
		bindVidClick();
	};

	function bindVidClick(){
		$("#videoList li").on("click", function(){
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
	};








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
	fetchYoutubeData();
	$(".blackOut iframe").attr("src", "");



















});