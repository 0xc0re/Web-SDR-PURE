<?php

function setMidFrequency($midFreq){
    $_SESSION["midFreq"] = $midFreq;
}

function getMidFrequency(){
    return $_SESSION["midFreq"];
}

function setDspPort($port){
    $_SESSION["dspPort"] = $port;
}

function getDspPort(){
    return $_SESSION["dspPort"];
}

