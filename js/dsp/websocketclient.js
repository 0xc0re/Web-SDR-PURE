/**
 * Created by kusi on 4/5/17.
 */
//if ("WebSocket" in window) console.log("WebSocket allowed");

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

function showMsg(msg){
    var msgContainer = document.getElementById("showMsg");
    msgContainer.style.display = "";
    var msgArea = msgContainer.childNodes[1];
    msgArea.innerHTML = msg+"<hr>";
}