/**
 * Created by kusi on 4/5/17.
 */
//if ("WebSocket" in window) console.log("WebSocket allowed");

var exampleSocket = null;

function startWebsocket(){
    console.log("WebSocket starting...");
    exampleSocket = new WebSocket("ws://127.0.0.1:12346", "WebSDR");
    console.log("WebSocket started...");
    exampleSocket.onmessage = readMessage;
}

function sendMessage(msg){
    if(exampleSocket){
        exampleSocket.send(msg);
    } else {
        console.log("WebSocket not started");
    }
}

 function readMessage (event) {
    console.log("Server:" + event.data);
}


