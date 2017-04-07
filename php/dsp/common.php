<?php

function lws($msg) {
    l("WS", $msg);
}

function lds($msg){
    l("DS", $msg);
}

function l($pre, $msg){
    echo "[" . date("Y-m-d H:i:s.ms") . "|" . $pre . "]: " . $msg . "\n";
}

?>