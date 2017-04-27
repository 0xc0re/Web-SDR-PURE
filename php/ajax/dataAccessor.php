<?php
include( dirname(__FILE__) . "/../common.php");

/** MAIN **/
call_user_func((string)$_GET['function']);

function getManagerLocation(){
    $config = getConfig();
    $ip = $config->xpath('//item[@id="pureIP"]');
    $port = $config->xpath('//item[@id="purePort"]');
    echo $ip .':'. $port;
}

function getManagerIp(){
    $config = getConfig();
    $result = $config->xpath('//item[@id="pureIP"]');
    echo (string) $result[0];
}

function getManagerPort(){
    $config = getConfig();
    $result = $config->xpath('//item[@id="purePort"]');
    echo (string) $result[0];
}

