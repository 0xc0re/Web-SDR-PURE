<?php
$configLoc = ( dirname(__FILE__) . "/../../customContent/configuration/userManagement/userRoles.xml");
if(!isset($xml)){
    $xml = loadXmlFile($configLoc);
}

$username = $password = "";
$userLevel = 100;
setUserLevel();

function logout(){
	global $userLevel;
	$userLevel = 100;
    unsetSessionIfSet('valid');
    unsetSessionIfSet('timeout');
    unsetSessionIfSet('username');
    unsetSessionIfSet('isNew');
}

function unsetSessionIfSet($key){
    if(isset($_SESSION[$key])) unset($_SESSION[$key]);
}

function login(){
    $username = validateInput($_POST["uname"]);
    $user = getUserNode($username);
    if($user){
        if($user->password == ""){
            checkDefaultPw($user);
        } else {
            checkPw($user);
        }
    } else {
        $_SESSION["ERROR_MESSAGE"] = "User does not exist";
    }
}

function checkDefaultPw($user){
	if($user->defaultPassword == validateInput($_POST["psw"])){
		startSession((string)$user->username, true);
		setUserLevel();
	} else {
	    $_SESSION["ERROR_MESSAGE"] = "Password is incorrect";
	}
}

function checkPw($user){
	$password = validateInput($_POST["psw"]);
	$verify = password_verify($password, $user->password);
    if($verify){
        startSession((string)$user->username, false);
        setUserLevel();
    } else {
        $_SESSION["ERROR_MESSAGE"] = "Password is incorrect";
    }
}

function startSession($username, $isNew){
    if(session_id()) logout();
	$_SESSION['valid'] = true;
	$_SESSION['timeout'] = time();
	$_SESSION['username'] = $username;
	$_SESSION['isNew'] = $isNew;
}

function setUserLevel(){
	global $userLevel;
    if(isset($_SESSION['username'])){
        $role = getUserRole($_SESSION['username']);
        if($role == "adminstrator"){
            $userLevel = 1;
        } else if($role == "moderator"){
            $userLevel = 10;
        } else if($role == "listener"){
            $userLevel = 20;
        } else {
            $userLevel = 100;
        }
    }
}

function getUserLevel(){
	global $userLevel;
	return $userLevel;
}

function getUserRole($username){
    global $xml;
	foreach($xml->children() as $role) {
		foreach($role->children() as $user) {
			if($user == $username){
				return (string)$role->attributes();
			}
		}
	}
	return "guest";
}

function isUserLoggedIn(){
	if(isset($_SESSION['valid']) && isset($_SESSION['username'])) {
		return true;
	} else {
		return false;
	}
}