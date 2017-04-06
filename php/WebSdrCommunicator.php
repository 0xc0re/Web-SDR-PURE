<?php

include 'DspClient.php';
include 'common.php';

// Websocket stuff
require '/home/kusi/vendor/autoload.php';
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class SdrWS implements MessageComponentInterface
{
    public function onOpen(ConnectionInterface $conn)
    {
        lws("Conection opened, id=" . $conn->resourceId . ", address=" . $conn->remoteAddress);
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        lws("Message received -> " . $msg);
    }

    public function onClose(ConnectionInterface $conn)
    {
        lws("Conection closed -> " . $conn->resourceId);
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        lws("Error: " . $e);
    }

    public function __construct()
    {
        lws("Construct " . get_class($this));

        $s = BufC::pop();
        lws("Buffer pop = " . $s);
    }
}

class BufC
{
    private static $isLocked = false;
    private static $buf = array();
    private static $size = 1024;
    private static $readIdx = 0;
    private static $writeIdx = 0;
    private static $debug = 0;

    static function init()
    {
        for ($i = 0; $i < self::$size;$i++)
            self::$buf[$i] = null;

        if (self::$debug) l("BC", "construct");
    }

    static function push($data)
    {
        self::lock();

        self::$buf[self::$writeIdx] = $data;
        if (self::$debug) l("BC", "push[" . self::$writeIdx ."] -> " . $data);

        self::$writeIdx = (self::$writeIdx + 1);

        self::unlock();
    }

    static function pop()
    {
        self::lock();

        if (self::$readIdx == self::$writeIdx)
        {
            if (self::$debug) l("BC", "ReadIdx == WriteIdx");
            BufC::unlock();
            return null;
        }

        $data = self::$buf[self::$readIdx];
        if (self::$debug) l("BC", "pop[" . self::$readIdx ."] -> " . $data);
        self::$buf[self::$readIdx] = null;
        self::$readIdx = (self::$readIdx + 1) % self::$size;

        self::unlock();

        return $data;
    }

    private static function lock(){

        if (self::$isLocked == true)
        {
            while (self::$isLocked == true)
                usleep(100000);

            if (self::$isLocked == false)
                self::$isLocked = true;
        }
        else
        {
            if (self::$debug) l("BC", "LOCK");
            self::$isLocked = true;
        }
    }

    private static function unlock() {
        if (self::$isLocked == true)
        {
            self::$isLocked = false;
            if (self::$debug) l("BC", "UNLOCK");
        }
        else{
            if (self::$debug) l("BC", "invalid state, unlock called without lock");
        }
    }
}

// buffer for data
BufC::init();

// tcpSocket
$rec = new DspClient();
//$rec->connect();
$rec->start();

// Websocket
$port = 12346;
$wss = new HttpServer(new WsServer(new SdrWS()));
$s = IoServer::factory($wss, $port);
lws("Started on port: " . $port);
$s->run();

l("INVALID","END");





?>