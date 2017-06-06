<?php
/* Utils */
include( dirname(__FILE__) . "/utils/formBuilder.php");
include( dirname(__FILE__) . "/utils/siteInfo.php");
include( dirname(__FILE__) . "/utils/fileManager.php");
include( dirname(__FILE__) . "/utils/socket.php");
include( dirname(__FILE__) . "/utils/storage.php");

/* Managers (Services) */
include( dirname(__FILE__) . "/user/userManager.php");
include( dirname(__FILE__) . "/user/loginManager.php");
include( dirname(__FILE__) . "/config/configManager.php");

initChecks();

function initChecks(){
	checkIfLogout();
	checkIfNewAccount();
    listenToFormEvents();
}

function checkIfNewAccount(){
    parse_str($_SERVER['QUERY_STRING']);
	if(isset($_SESSION['isNew'])){
		if(!$_SESSION['isNew']) return;
		if($site == "My Profile") return;
        redirectTo("site=My Profile");
	}
}

function redirectToHome(){
    $url = $_SERVER["PHP_SELF"];
    header('Location: '.$url);
    die();
}

function redirectTo($site){
    $url = $_SERVER["PHP_SELF"];
    $url .= "?". $site;
    header('Location: '.$url);
    die();
}

function checkIfLogout(){
	if($_SERVER['QUERY_STRING'] == "site=Logout"){
        logout();
        redirectToHome();
    }
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
			unset($_POST['logout']);
            redirectToHome();
		} else if(isset($_POST['changeUser'])){
			saveUser();
            unset($_POST['changeUser']);
		} else if(isset($_POST['changeConfig'])){
            saveConfiguration();
            unset($_POST['changeConfig']);
        }
	}
}

function showError($message){
    $output = '<div id="showMsg" class="container">';
    $output .= ' <div class="sixteen columns showError">';
    $output .= $message;
    $output .= '</div>';
    $output .= '</div>';
    echo $output;
    die();
}