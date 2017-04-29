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

function getManagerLocation(){
    $config = getConfig();
    $ip = $config->xpath('//item[@id="pureIP"]');
    $port = $config->xpath('//item[@id="purePort"]');
    return $ip .':'. $port;
}

function getManagerIp(){
    $config = getConfig();
    $result = $config->xpath('//item[@id="pureIP"]');
    return (string) $result[0];
}

function getManagerPort(){
    $config = getConfig();
    $result = $config->xpath('//item[@id="purePort"]');
    return (string) $result[0];
}