<?php
include "./php/login/userManager.php";
include "./php/pages/pageManager.php";

//Initiate the login
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if(isset($_POST['login'])){
		login();
	}
}

getUserRole("test");

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

