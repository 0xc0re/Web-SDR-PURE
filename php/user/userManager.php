<?php
$userListLoc = "./customContent/userManagement/userList.xml";
$xml;

function getUserNode($username){
	global $userListLoc;
	global $xml;
    $xml = simplexml_load_file($userListLoc) or die("Error: Cannot create object");
    foreach($xml->children() as $user) {
        if ($user->username == $username) return $user;
    }
    return false;
}

function saveUser(){
	//Prepare POST inputs
	$username = validateInput($_POST['usrname']);
	$psw1 = validateInput($_POST['psw1']);
	$psw2 = validateInput($_POST['psw2']);
	$name = validateInput($_POST['name']);
	$surname = validateInput($_POST['surname']);
	$address = validateInput($_POST['address']);
	$plz = validateInput($_POST['plz']);
	
	///Check if new username does already exist
	if((string)$_SESSION['username'] != $username){
		if(getUserNode($username)){
			//ERROR
			echo "Username already in use <br>";
			return;
		}
	}
	
	//Check if both passwords are the same
	if($psw1 != $psw2){
		echo "Passwords does not match";
		return;
		//ERROR "Passwords does not match";
	} else {
		//Hash the given password and delete the clear-text references
		$password = password_hash($psw1, PASSWORD_DEFAULT);
		unset($_POST['psw1']);
		unset($_POST['psw1']);
		unset($psw1);
		unset($psw2);
	}
	
	//prepare the xml-node
	$userToSave = getUserNode($_SESSION['username']);
	$userToSave->username = $username;
	$userToSave->password = $password;
	$userToSave->name = $name;
	$userToSave->surname = $surname;
	$userToSave->address = $address;
	$userToSave->postalCode = $plz;
	
	//Save user
	saveChangedXML();
	$_SESSION['isNew'] = false;
	
	
	//echo "USER AS XML <br>";
	//echo $userToSave->asXML();
}

function saveChangedXML(){
	global $xml;
	global $userListLoc;
	$xml->asXML($userListLoc);
	//echo "Save user <br>";
	//echo $xml->asXML();
	//$userToSave;
	//$xml = simplexml_load_file("./customContent/userManagement/userList.xml");
	//$xml->
}




