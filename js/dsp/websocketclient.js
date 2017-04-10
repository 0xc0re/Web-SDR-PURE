/**
 * Created by kusi on 4/5/17.
 */
//if ("WebSocket" in window) console.log("WebSocket allowed");

var exampleSocket = null;

function startWebsocket(){
    console.log("WebSocket starting...");
    exampleSocket = new WebSocket("ws://127.0.0.1:12346", "binary");
    exampleSocket.onerror = connectionRefused;
    exampleSocket.onopen = connectionOpened;
}

function sendMessage(msg){
    if(exampleSocket){

        var i = msg.length;
        while( i < 64){
            msg = msg.concat("\0");
            i = i+1;
        }

        exampleSocket.send(msg);
    } else {
        console.log("WebSocket not started");
    }
}

function readMessage (event) {
    console.log("Server Msg: Type=" + event.type + ",Size=" + event.size);
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


