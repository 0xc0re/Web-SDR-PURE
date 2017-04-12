<?php
function buildPageContent(){
    if ($_SERVER['QUERY_STRING'] == "") {
        include "./sites/public/intro.php";
    } elseif ($_SERVER['QUERY_STRING'] == "site=socketTest") {
        include "./sites/public/socketTester.php";
    } elseif ($_SERVER['QUERY_STRING'] == "site=logout") {
		include "./sites/public/intro.php";
	} elseif ($_SERVER['QUERY_STRING'] == "site=profile") {
		include "./sites/private/myProfile.php";
	}
}