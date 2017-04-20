<?php
function loadXmlFile($fileLocation){
    $xml = simplexml_load_file($fileLocation) or die("Error: Cannot create object");
    return $xml;
}

function saveXmlFile($fileLocation, $xmlRoot){
    $xmlRoot->asXML($fileLocation);
}
