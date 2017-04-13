var exampleSocket = null;

function startWebsocket(){
    exampleSocket = new WebSocket("ws://127.0.0.1:12345", "WebSDR");
    exampleSocket.onerror = connectionRefused;
    exampleSocket.onopen = connectionOpened;
}

function sendMessage(msg){
    if(exampleSocket){
        exampleSocket.send(msg);
    }
}

function readMessage (event) {
    var myReader = new FileReader();
    //handler executed once reading(blob content referenced to a variable) from blob is finished.
    myReader.addEventListener("loadend", function(e){
        console.log("Server:" + e.srcElement.result);
        //document.getElementById("paragraph").innerHTML = e.srcElement.result;//prints a string
    });
    //start the reading process.
    myReader.readAsText(event.data);


}

function connectionOpened(){
    exampleSocket.onmessage = readMessage;
    document.getElementById("sndMsg").style.display = "";
    showMsg("Connection established");
}

function connectionRefused(){
    showMsg("Connection refused")
}