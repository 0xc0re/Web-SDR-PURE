<?php
include( dirname(__FILE__) . "/../common.php");

/** MAIN **/
if(isset($_GET['function'])) {
    if($_GET['function'] == 'getManagerLocation') {
        getManagerLocation();
    }
}

function getManagerLocation(){
    $ip = getDspIp();
    var_dump($ip);
    //echo (String) $ip;
    //echo json_encode($result);
}

function getDspIp(){
    $config = getConfig();
    $result = $config->xpath('//item[@id="pureIP"]');
    return $result;
}

