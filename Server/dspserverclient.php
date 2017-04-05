<?php



class DspReceiver extends Thread {

    function __construct() {
        $this->address = "127.0.0.1";
        $this->port = "8000";
        $this->isConnected = false;
    }

    function connect() {
        $this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

        if ($this->socket === false) {
            echo "Socket creation failed\n";
            //echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
        }

        if (socket_connect($this->socket, $this->address, $this->port) === false) {
            echo "Connection failed\n";
//            echo "socket_connect() failed: reason: " . socket_strerror(socket_last_error($this->socket)) . "\n";
        }
        else {
            $this->isConnected = true;
        }
    }

    function sendCommands($file) {
        $cmd = "";

        $handle = fopen($file, "r");
        if ($handle) {
            $nrCommands = 0;

            foreach(file($file) as $line) {
                $line = str_replace("\n", "", $line);
                //echo "[" . $line ."] -> strlen= " . strlen($line) . "\n";
                $c = strlen($line);
                while ($c < 64)  {
                    $line = $line . "\0";
                    $c += 1;
                }
                $cmd = $cmd . $line;
                
                $nrCommands += 1;
            }
            //echo $cmd . "-->" . strlen($cmd) . "\n";
            $this->sendCommand($cmd);
            echo "Nr of commands sent: " . $nrCommands ."\n";
            fclose($handle);
        } else {
            echo "Could not open file: " . $file . "\n";
        } 
    }

    function sendCommand($cmd) {     
        if ($this->isConnected == false) {
            echo "Could not send command, because no connection\n";
            return;
        }
        socket_write($this->socket, $cmd, strlen ($cmd));
    }

    public function run() {

        if ($this->isConnected == false) {
            echo "Receiver not started, because no connection\n";
            return;
        }

        echo "Receiver started\n";
        while ($this->isConnected) {

            while ($out = socket_read($this->socket, 2048)) {
                echo "Message received: " . strlen($out) . "\n";
                break;
            }
}
        echo "Receiver stopped\n";
    }
}





$rec = new DspReceiver();
$rec->connect();
$rec->start();

$rec->sendCommands("commands1");
$rec->sendCommands("commands2");
$rec->sendCommands("commands3");



?>
