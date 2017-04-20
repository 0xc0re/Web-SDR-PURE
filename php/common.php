<?php
include "./php/pages/pageManager.php";
include "./php/user/userManager.php";
include "./php/user/loginManager.php";

initChecks();

function initChecks(){
	listenToFormEvents();
	checkIfLogout();
	checkIfNewAccount();
}

function checkIfNewAccount(){
	if(isset($_SESSION['isNew'])){
		if(!$_SESSION['isNew']) return;
		if($_SERVER['QUERY_STRING'] == "site=profile") return;
        redirectTo("site=profile");
	}
}

function redirectTo($site){
    $url = $_SERVER["PHP_SELF"];
    $url .= "?". $site;
    header('Location: '.$url);
    die();
}

function checkIfLogout(){
	if($_SERVER['QUERY_STRING'] == "site=logout") logout();
}

function listenToFormEvents(){
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if(isset($_POST['login'])){
			login();
            if(isset($_SESSION["ERROR_MESSAGE"])){
                redirectTo("");
            }
		} else if(isset($_POST['logout'])){
			logout();
		} else if(isset($_POST['changeUser'])){
			saveUser();
		}
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

