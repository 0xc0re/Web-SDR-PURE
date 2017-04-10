<?php
// define variables and set to empty values
$username = $password = "";
$userLevel = 100;

function login(){
    $username = validateInput($_POST["uname"]);
    //$password = validateInput($_POST["psw"]);
	//$hash = password_hash($_POST['psw'], PASSWORD_DEFAULT);
		
	$xml = simplexml_load_file("./customContent/userManagement/userList.xml") or die("Error: Cannot create object");
	foreach($xml->children() as $user) { 
		if($user->username == $username){
			if($user->password == ""){
				checkDefaultPw($user);
			} else {
				checkPw($user);
			}
		}
	}
}

function checkDefaultPw($user){
	$password = validateInput($_POST["psw"]);
	if($user->defaultPassword == $password){
		startSession((string)$user->username, true);
	} else {
		//Handle error
	}
}

function startSession($username, $isNew){
	$userRole = getUserRole($username);
	setUserLevel($userRole);
	
	session_start();
	$_SESSION['valid'] = true;
	$_SESSION['timeout'] = time();
	$_SESSION['username'] = $username;
	$_SESSION['userrole'] = $userRole;
	$_SESSION['isNew'] = $isNew;
}
function setUserLevel($role){
	global $userLevel;
	if($role == "adminstrator"){
		$userLevel = 0;
	} else if($role == "moderator"){
		$userLevel = 10;
	} else if($role == "listener"){
		$userLevel = 20;
	} else {
		$userLevel = 100;
	}
}

function getUserLevel(){
	global $userLevel;
	return $userLevel;
}

function getUserRole($username){
	$xml = simplexml_load_file("./customContent/userManagement/userRoles.xml") or die("Error: Cannot create object");
	foreach($xml->children() as $role) {
		foreach($role->children() as $user) {
			if($user == $username){
				return (string)$role->attributes();
			}
		}
	}
	return "guest";
}

function checkPw($user){
echo "Check Normal";
echo $user->password;
}


function isUserLoggedIn(){
	if(!empty($_SESSION['valid']) && !empty($_SESSION['username']) && !empty($_SESSION['userrole'])) {
		return true;
	} else {
		return false;
	}
}