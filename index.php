<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">

	<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">

		<meta property="fb:app_id" content="966242223397117" />
		<meta property="og:image" content="http://www.davidnester.com/content/img/sitePreview.jpg">
		<meta property="og:image:type" content="image/jpg">
		<meta property="og:image:width" content="1200"/>
		<meta property="og:image:height" content="771"/>
		<meta property="og:type" content="website">
		<meta property="og:title" content="David Nester">
		<meta property="og:description" content="Drummer and Drum Technician">

		<link rel="icon" type="image/ico" href="content/img/favicon.ico">
		<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="description" content="David Nester Drums - Official Website.">

		<title>David Nester Drums</title>

		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="content/css/style.css">

		<!-- Javascript -->
		<script class="davidNester" src="content/js/vendor/jquery-1.11.3.min.js" type="text/javascript"></script>
		<script class="davidNester" src="content/js/killJunk.js" type="text/javascript"></script>
		<script class="davidNester" src="content/js/main.js" type="text/javascript"></script>

	</head>
	<body>

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
						<li class="button"><a href="<?php show($contactItems,'email'); ?>">Email Now</a></li>
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
				<li class="button"><a href="<?php show($contactItems,'email'); ?>">Email Now</a></li>
			</ul>
		</div>

		<div id="hero" class="wrapper" style="background-image: url(<?php show($heroItems,'imgUrl'); ?>);">
			<div class="content">
				<h1><?php show($heroItems,'title'); ?></h1>
				<h2><?php show($heroItems,'subtitle'); ?></h2>
				<div class="button"><a href="<?php show($contactItems,'email'); ?>" target="_blank"><?php show($heroItems,'buttonText'); ?></a></div>
			</div>
		</div>

		<div id="video" class="wrapper">
			<div class="content">
				<h1>Videos</h1>
				<p class="small">Click image to play video</a>
				<ul id="videoList" youtube="<?php echo $youtubeId ?>" playlist="<?php echo $playlistId ?>" limit="<?php echo $displayLimit ?>">

					<!-- ===================================================================================
					Leaving this here for reference ... js youtube api populates this list (see main.js)
					==================================================================================== -->

					<!-- <li video='https://www.youtube.com/embed/Cua06hSlCKY'>
						<div class='imgContainer'>
							<div class='content' style='background-image: url("content/img/drumThumb_006.jpg");'></div>
						</div>
						<h3>A Day To Remember - Bad Vibrations (drum cover)</h3>
					</li> -->

				</ul>
			</div>
		</div>

		<div id="dates" class="wrapper">
			<div class="content">
				<h1>Dates</h1>
				<table>
					<thead>
						<tr>
							<td class="headerRow">Date</td>
							<td class="headerRow">Location</td>
							<td class="headerRow">Band</td>
							<td class="headerRow perf">Type</td>
						</tr>
					</thead>
					<tbody>

						<?php 
							foreach ($showItems as $show){
								echo "<tr>
										<td>" . $show["date"] . "</td>
										<td>" . $show["venue"] . "<br>" . $show["city"] . ", " . $show["state"] . "<br>" . $show["country"] . "</td>
										<td>" . $show["band"] . "</td>
										<td class='perf'>" . $show["type"] . "</td>
									</tr>";
							}
						?>

					</tbody>
				</table>
			</div>
		</div>

		<div id="about" class="wrapper">
			<div class="content">
				<h1>About</h1>
				<?php echo $aboutText; ?>
			</div>
		</div>

		<div id="footer" class="wrapper">
			<div class="content">
				<div class="foot-left">
					<p>&copy; <?php echo date("Y"); ?> David Nester<br>Website by <a href="http://www.stephensdesigns.com" target="_blank">Brian Stephens</a></p>
				</div>
				<div class="foot-right">
					<div class="socMed">
						<?php 
							foreach ($contactItems as $key => $value){
								echo "<a href='" . $value . "' target='_blank' class='" . $key . "'><img src='content/img/icon_" . $key . "_w.png'></a>";
							}
						?>
					</div>
				</div>
			</div>
		</div>

	</body>
</html>