<?php
function sendMessageToSocket($host, $port, $message){
    set_time_limit(5);
    //Create and connect to socket
    $socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create socket\n");
    $result = socket_connect($socket, $host, $port) or die("Could not connect to server\n");

    //Send message to server
    socket_write($socket, $message, strlen($message)) or die("Could not send data to server\n");

    //Process answer from server
    $result = socket_read ($socket, 1024) or die("Could not read server response\n");

    //Close socket
    socket_close($socket);

    //Cut off null terminator (Since its built from c)
    return substr($result, 0, -1);
}