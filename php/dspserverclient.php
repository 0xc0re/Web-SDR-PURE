<?php

$address = "127.0.0.1";
$port = "8000";

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
}

if (socket_connect($socket, $address, $port) === false) {
    echo "socket_connect() failed: reason: " . socket_strerror(socket_last_error($socket)) . "\n";
}

while ($out = socket_read($socket, 2048)) {
    echo $out;
    echo "BLA\n";
    break;
}

?>
