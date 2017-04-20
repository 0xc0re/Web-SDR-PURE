<?php
$configLoc = "./customContent/configuration/pureManager/configuration.xml";
$configXml;

function getConfig(){
    global $configLoc;
    global $configXml;
    $userXml = simplexml_load_file($configLoc) or die("Error: Cannot create object");
    return $userXml;
}