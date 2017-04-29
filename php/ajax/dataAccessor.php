<?php
include( dirname(__FILE__) . "/../common.php");

/** MAIN **/
session_start();
call_user_func((string)$_GET['function']);

function showManagerLocation(){
    echo getManagerLocation();
}

function showManagerIp(){
    echo getManagerIp();
}

function showManagerPort(){
    echo getManagerPort();
}

function showDspPort(){
    echo getDspPort();
}