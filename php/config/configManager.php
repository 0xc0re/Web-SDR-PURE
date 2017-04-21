<?php
$configLoc = ( dirname(__FILE__) . "/../../customContent/configuration/pureManager/configuration.xml");
$configXml;

function getConfig(){
    global $configLoc;
    global $configXml;
    $configXml = loadXmlFile($configLoc);
    return $configXml;
}

function setConfig(){
    global $configLoc;
    global $configXml;
    saveXmlFile($configLoc, $configXml);
}

function saveConfiguration(){
    $confRoot = getConfig();
    foreach($confRoot->children() as $topic) {
        foreach($topic->children() as $item) {
            $id = (String) $item["id"];
            $item[0] = $_POST[$id];
        }
    }
    setConfig();
}