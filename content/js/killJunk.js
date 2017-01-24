
$(document).ready(function(){

	var timerStart = Date.now();
	var counter = 0;
	var intervalFunction = setInterval(function(){ removeCrap() }, 1000);

	function removeCrap(){
		var currentTime = Date.now()-timerStart;
		if (currentTime <= 31000){
			counter++;
			$("script").not(".davidNester").remove();
			$("iframe").not(".davidNester").remove();
		} else {
			clearInterval(intervalFunction);
		}
	};
});