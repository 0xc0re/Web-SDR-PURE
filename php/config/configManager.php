<?php
$configLoc = "./customContent/configuration/pureManager/configuration.xml";
$configXml;

function getConfig(){
    global $configLoc;
    global $configXml;
    $userXml = loadXmlFile($configLoc);
    return $userXml;
}

function saveConfig(){
    global $userXml;
    global $userListLoc;
    saveXmlFile($userListLoc, $userXml);
}