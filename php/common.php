<?php
include "./php/pages/pageManager.php";
include "./php/login/userManager.php";

if($_SERVER['QUERY_STRING'] == "site=logout"){
	logout();
}

//Initiate the login
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if(isset($_POST['login'])){
		login();
	} else if(isset($_POST['logout'])){
        logout();
    }
}

function validateInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function validateEmail($email) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//        "Invalid email format";
    }
}

