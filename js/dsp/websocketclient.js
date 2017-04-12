var exampleSocket = null;

function startWebsocket(){
    exampleSocket = new WebSocket("ws://127.0.0.1:12346", "WebSDR");
    exampleSocket.onerror = connectionRefused;
    exampleSocket.onopen = connectionOpened;
}

function sendMessage(msg){
    if(exampleSocket){
        exampleSocket.send(msg);
    }
}

function readMessage (event) {
    console.log("Server:" + event.data);
}

function connectionOpened(){
    exampleSocket.onmessage = readMessage;
    document.getElementById("sndMsg").style.display = "";
    showMsg("Connection established");
}

function connectionRefused(){
    showMsg("Connection refused")
}