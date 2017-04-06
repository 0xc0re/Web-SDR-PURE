<?php

class DspClient extends Thread
{
    function __construct()
    {
        $this->address = "127.0.0.1";
        $this->port = "8000";
        $this->isConnected = false;

        lds("Construct " . get_class($this));
    }

    private function l($msg){
        echo "[DSC]: " . $msg . "\n";
    }

    function connect()
    {
        $this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

        if ($this->socket === false) {
            lds("Socket creation failed");
        }

        if (socket_connect($this->socket, $this->address, $this->port) === false) {
            lds("Connection failed");
        } else {
            $this->isConnected = true;
        }
    }

    function sendInitCommands() {
        $this->sendCommands("commands1");
        $this->sendCommands("commands2");
        $this->sendCommands("commands3");
    }

    function sendCommands($file)
    {
        $cmd = "";

        $handle = fopen($file, "r");
        if ($handle) {
            $nrCommands = 0;

            foreach (file($file) as $line) {
                $line = str_replace("\n", "", $line);
                $c = strlen($line);
                while ($c < 64) {
                    $line = $line . "\0";
                    $c += 1;
                }
                $cmd = $cmd . $line;

                $nrCommands += 1;
            }
            $this->sendCommand($cmd);
            lds("Nr of commands sent: " . $nrCommands);
            fclose($handle);
        } else {
            lds("Could not open file: " . $file);
        }
    }

    function sendCommand($cmd)
    {
        if ($this->isConnected == false) {
            lds("Could not send command, because no connection");
            return;
        }
        socket_write($this->socket, $cmd, strlen($cmd));
    }

    public function run()
    {
        if ($this->isConnected == false) {
            lds("DspClient not started, because no connection");
            return;
        }

        $counter = 0;
        $startTime = round(microtime(true) * 1000);

        lds("DspClient receiving thread started");
        while ($this->isConnected) {
            while ($out = socket_read($this->socket, 4096)) {

                $this->handleData($out);

                sleep(1);

                //lds("Message received: " . strlen($out));
                $counter = $counter + 1;

                if (round(microtime(true) * 1000) - $startTime > 1000){
                    //lds("Messages/Second: " . $counter);
                    $counter = 0;
                    $startTime = round(microtime(true) * 1000);
                }
            }
        }
        lds("DspClient receiving thread stopped");
    }

    private function handleData($data)
    {
        var_dump($data);
    }
}


?>
