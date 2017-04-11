<?php
// define variables and set to empty values
$username = $password = "";
$userLevel = 100;
setUserLevel();

function logout(){
	global $userLevel;
	$userLevel = 100;
	if(isset($_SESSION['valid'])) unset($_SESSION['valid']);
	if(isset($_SESSION['timeout'])) unset($_SESSION['timeout']);
	if(isset($_SESSION['username'])) unset($_SESSION['username']);
	if(isset($_SESSION['userrole'])) unset($_SESSION['userrole']);
	if(isset($_SESSION['isNew'])) unset($_SESSION['isNew']);
	//if(isset($_SESSION['pwChange'])) unset($_SESSION['pwChange']);
}

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
            break;
        }
    }
}

function checkDefaultPw($user){
	$password = validateInput($_POST["psw"]);
	if($user->defaultPassword == $password){
		startSession((string)$user->username, true);
		setUserLevel();
	} else {
		//Handle error
	}
}

function startSession($username, $isNew){
    if(session_id()) logout();
	$userRole = getUserRole($username);
	$_SESSION['valid'] = true;
	$_SESSION['timeout'] = time();
	$_SESSION['username'] = $username;
	$_SESSION['userrole'] = $userRole;
	$_SESSION['isNew'] = $isNew;
}
function setUserLevel(){
	global $userLevel;
	if(isset($_SESSION['userrole'] )){
		$role = $_SESSION['userrole'];
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
	if(isset($_SESSION['valid']) && isset($_SESSION['username']) && isset($_SESSION['userrole'])) {
		return true;
	} else {
		return false;
	}
}