<?php
include( dirname(__FILE__) . "/../common.php");

/** MAIN **/
if(isset($_GET['function'])) {
    if($_GET['function'] == 'getManagerLocation') {
        getManagerLocation();
    }
}

function getManagerLocation(){
    $ip = getManagerIp();
    $port = getManagerPort();
    echo $ip .':'. $port;
}

function getManagerIp(){
    $config = getConfig();
    $result = $config->xpath('//item[@id="pureIP"]');
    return $result[0];
}

function getManagerPort(){
    $config = getConfig();
    $result = $config->xpath('//item[@id="purePort"]');
    return $result[0];
}

