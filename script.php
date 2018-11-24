<?php

use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseACL;
use Parse\ParsePush;
use Parse\ParseUser;
use Parse\ParseInstallation;
use Parse\ParseException;
use Parse\ParseAnalytics;
use Parse\ParseFile;
use Parse\ParseCloud;
use Parse\ParseClient;

ParseClient::initialize( 'edbfdd6e-d9d4-4231-a614-41a72f87fe1f', '', '8BqLBYdL8QhvdFggDK8mgXjMp7zCOll6' );
ParseClient::setServerURL('https://api.parse.buddy.com/', 'parse');

// Utils
// ====================================

function show($arr,$key){
    echo $arr[$key];
}


// Get hero items
// ====================================

$heroItems = array();

$heroQuery = new ParseQuery("Hero");
$heroResult = $heroQuery->first();

$heroItems['title'] = $heroResult->get('title');
$heroItems['subtitle'] = $heroResult->get('subtitle');
$heroItems['buttonText'] = $heroResult->get('buttonText');
$heroItems['imgUrl'] = $heroResult->get('imgUrl');




// Get youtube channel ID
// ====================================

$videoQuery = new ParseQuery("Videos");
$videoResult = $videoQuery->first();

$youtubeId = $videoResult->get('youtube_id');
$playlistId = $videoResult->get('playlist_id');
$displayLimit = $videoResult->get('displayLimit');




// Get show items
// ====================================

$showItems = array();
$midnight = new DateTime('today');

$showQuery = new ParseQuery("Shows");
$showQuery->greaterThan("dateObj", $midnight);
$showQuery->ascending("dateObj");
$showResults = $showQuery->find();
for ($i = 0; $i < count($showResults); $i++) {
    $newShow = array();
    $newShow['date'] = $showResults[$i]->get('date');
    $newShow['city'] = $showResults[$i]->get('city');
    $newShow['state'] = $showResults[$i]->get('state');
    $newShow['venue'] = $showResults[$i]->get('venue');
    $newShow['band'] = $showResults[$i]->get('band');
    $newShow['type'] = $showResults[$i]->get('type');
    array_push($showItems, $newShow);
}


// Get about content
// ====================================

$aboutQuery = new ParseQuery("About");
$aboutResult = $aboutQuery->first();
$aboutText = $aboutResult->get('aboutText');



// Get contact items
// ====================================

$contactItems = array();

$contactQuery = new ParseQuery("Contact");
$contactResult = $contactQuery->first();

$contactItems['email'] = "mailto:" . $contactResult->get('email');
$contactItems['youtube'] = $contactResult->get('youtube');
$contactItems['linkedin'] = $contactResult->get('linkedin');
$contactItems['facebook'] = $contactResult->get('facebook');
$contactItems['twitter'] = $contactResult->get('twitter');
$contactItems['instagram'] = $contactResult->get('instagram');




