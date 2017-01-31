<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="description" content="David Nester Drums - Official Website. David Nester is an experienced, knowledgeable, and well-traveled drummer from Dayton, Ohio. His background includes professional drumming for many genres ranging from: Metal - Mychildren Mybride, Wolves at the Gate, Once Nothing, Body Harvest. Rock/Pop - My Name In Vain, Me In The Making, Marilyn Avenue, To No End. Country - Pistol Holler, The Billy Brown Band, The Jason Owens Band. He is also a well-versed drum tech traveling with bands such as All That Remains. Booking Inquiries can be sent to me@davidnester.com">

		<title>David Nester Drums</title>

		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="content/css/style.css">

		<!-- Javascript -->
		<script class="davidNester" src="content/js/vendor/jquery-1.11.3.min.js" type="text/javascript"></script>
		<script class="davidNester" src="content/js/killJunk.js" type="text/javascript"></script>
		<script class="davidNester" src="content/js/main.js" type="text/javascript"></script>

	</head>
	<body class="dev">

		<?php require 'autoload.php'; ?>

		<div class="blackOut">
			<div class="popBox">
				<span class="close">x</span>
				<iframe src="" frameborder="0" allowfullscreen class="davidNester"></iframe>
			</div>
		</div>

		<nav id="desktopNav" class="wrapper">
			<div class="content">
				<div class="nav-left">
					<a href="#hero">
						<img src="content/img/logo_white.png" class="logoIcon">
						<h1>David Nester Drums</h1>
					</a>
				</div>
				<div class="nav-right">
					<ul>
						<li><a href="#video">Videos</a></li>
						<li><a href="#dates">Dates</a></li>
						<li><a href="#about">About</a></li>
						<li class="button"><a href="mailto:me@davidnester.com">Email Now</a></li>
					</ul>
					<div class="hamburger">
						<span class="hamSlice"></span>
						<span class="hamSlice"></span>
						<span class="hamSlice"></span>
					</div>
				</div>
			</div>
		</nav>

		<div id="mobileDropdown">
			<ul>
				<li><a href="#video">Videos</a></li>
				<li><a href="#dates">Dates</a></li>
				<li><a href="#about">About</a></li>
				<li class="button"><a href="mailto:me@davidnester.com">Email Now</a></li>
			</ul>
		</div>

		<div id="hero" class="wrapper" style="background-image: url(<?php show($heroItems,'imgUrl'); ?>);">
			<div class="content">
				<h1><?php show($heroItems,'title'); ?></h1>
				<h2><?php show($heroItems,'subtitle'); ?></h2>
				<div class="button"><a href="mailto:me@davidnester.com" target="_blank"><?php show($heroItems,'buttonText'); ?></a></div>
			</div>
		</div>

		<div id="video" class="wrapper">
			<div class="content">
				<h1>Videos</h1>
				<p class="small">Click image to play video</a>
				<ul id="videoList">
					<li video="https://www.youtube.com/embed/Cua06hSlCKY">
						<img src="content/img/drumThumb_006.jpg">
						<h3>A Day To Remember - Bad Vibrations (drum cover)</h3>
					</li>
					<li video="https://www.youtube.com/embed/LtZyRWlDsWk">
						<img src="content/img/drumThumb_005.jpg">
						<h3>Architects - A Match Made in Heaven (drum&nbsp;cover)</h3>
					</li>
					<li video="https://www.youtube.com/embed/7aHspfoHHEI">
						<img src="content/img/drumThumb_004.jpg">
						<h3>Foo Fighters - My Hero (drum&nbsp;cover)</h3>
					</li>
					<li video="https://www.youtube.com/embed/7_mOyrc8Ve0">
						<img src="content/img/drumThumb_001.jpg">
						<h3>Underoath - In Regards To Myself (drum&nbsp;cover)</h3>
					</li>
					<li video="https://www.youtube.com/embed/gfUSwQNouSM">
						<img src="content/img/drumThumb_002.jpg">
						<h3>Paramore - Now (drum&nbsp;cover)</h3>
					</li>
					<li video="https://www.youtube.com/embed/cifkvDecAhs">
						<img src="content/img/drumThumb_003.jpg">
						<h3>Paramore - Misery Business (drum&nbsp;cover)</h3>
					</li>
				</ul>
			</div>
		</div>


		<div id="dates" class="wrapper">
			<div class="content">
				<h1>Dates</h1>
				<table>
					<thead>
						<tr>
							<td class="headerRow">Date(s)</td>
							<td class="headerRow">Location</td>
							<td class="headerRow">Band</td>
							<td class="headerRow perf">Type</td>
						</tr>
					</thead>
					<tbody>

						<?php 
							for ($i = 0; $i < count($showItems); $i++)
								echo "<tr>
										<td>" . $showItems[$i]["date"] . "</td>
										<td>" . $showItems[$i]["venue"] . "<br>" . $showItems[$i]["city"] . ", " . $showItems[$i]["state"] . "</td>
										<td>" . $showItems[$i]["band"] . "</td>
										<td class='perf'>" . $showItems[$i]["type"] . "</td>
									</tr>";
						?>

					</tbody>
				</table>
			</div>
		</div>


		<div id="about" class="wrapper">
			<div class="content">
				<h1>About</h1>
				<p>David Nester is an experienced, knowledgeable, and well-traveled drummer from Dayton, Ohio.</p>
				<p>His background includes professional drumming for many genres ranging from:</p>
				<ul>
					<li>Metal - Mychildren Mybride, Wolves at the Gate, Once Nothing, Body Harvest</li>
					<li>Rock/Pop - My Name In Vain, Me In The Making, Marilyn Avenue, To No End</li>
					<li>Country - Pistol Holler, The Billy Brown Band, The Jason Owens Band</li>
				</ul>
				<p>Drum tech experience includes traveling with bands such as All That Remains, Whitechapel, Atreyu, and Bury Your Dead.</p>
				<p>Booking Inquiries can be sent to <a href="mailto:me@davidnester.com">me@davidnester.com</a></p>
			</div>
		</div>

		<div id="footer" class="wrapper">
			<div class="content">
				<div class="foot-left">
					<p>&copy; 2016 David Nester<br>Website by <a href="http://www.stephensdesigns.com" target="_blank">Brian Stephens</a></p>
				</div>
				<div class="foot-right">
					<div class="socMed">
						<a href="mailto:me@davidnester.com" target="_blank" class="email" alt="Send email to me@davidnester.com"><img src="content/img/icon_email_w.png"></a>
						<a href="https://www.youtube.com/channel/UCbVWA6H1P0wED_-fKFLj0yg" target="_blank" class="youtube"><img src="content/img/icon_youtube_w.png"></a>
						<a href="https://www.linkedin.com/pub/david-nester/91/628/804" target="_blank" class="linkedin"><img src="content/img/icon_linkedIn_w.png"></a>
						<a href="https://www.facebook.com/david.nester.16" target="_blank" class="facebook"><img src="content/img/icon_facebook_w.png"></a>
						<a href="https://twitter.com/thenestea/" target="_blank" class="twitter"><img src="content/img/icon_twitter_w.png"></a>
						<a href="https://instagram.com/davidnester/" target="_blank" class="instagram"><img src="content/img/icon_instagram_w.png"></a>
					</div>
				</div>
			</div>
		</div>










	</body>
</html>