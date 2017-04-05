<?php


require '/home/kusi/vendor/autoload.php';

//echo "Site loaded.";

use Ratchet\Server\IoServer;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    public function onOpen(ConnectionInterface $conn) {
        echo "Connection open: " . json_encode($conn) . "\r\n";        
        //error_log("connection open: " . json_encode($conn));
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Message: " . json_encode($msg) . "\r\n";
    }

    public function onClose(ConnectionInterface $conn) {
        echo "close: " . json_encode($conn) . "\r\n";        
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Error: " . json_encode($conn) . "\r\n";
    }
}

$server = IoServer::factory(new Chat(), 12346);

echo "Server started";
$server->run();
echo "Server stopped";
?>
