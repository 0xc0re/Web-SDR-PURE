<?php
function getServer(){
    return (string) htmlspecialchars($_SERVER["PHP_SELF"]);
}

function getSite(){
    return (string) htmlspecialchars($_SERVER["QUERY_STRING"]);
}

function getMySite(){
    $server = getServer();
    $site = getSite();
    return $server ."?". $site;
}