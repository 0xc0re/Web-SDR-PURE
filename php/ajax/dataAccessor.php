<?php
include( dirname(__FILE__) . "/../common.php");

function getDspIp(){
    $config = getConfig();
    $result = $config->xpath('//item[@id="pureIP"]');
    return $result;
}