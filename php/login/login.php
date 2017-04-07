<?php

include "../common.php";

// define variables and set to empty values
$username = $password = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = validateInput($_POST["uname"]);
    $password = validateInput($_POST["psw"]);
    echo $username;
    echo $password;
}