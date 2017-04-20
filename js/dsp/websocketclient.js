var exampleSocket = null;

function startWebsocket(){
    exampleSocket = new WebSocket("ws://127.0.0.1:44444", "binary");
    exampleSocket.onerror = connectionRefused;
    exampleSocket.onopen = connectionOpened;
}

function sendMessage(msg){
    if(exampleSocket){
        exampleSocket.send(msg);
    }
}

function readMessage (event) {
    console.log("Server:" + event.data.size);
    var myReader = new FileReader();
    var arrBuff;
    myReader.onload = function() {
        console.log("Result: " + this.result);
        arrBuff = this.result;

        console.log("ArrBuff=" + String.fromCharCode.apply(null, new Uint8Array(arrBuff)));
    };

    //handler executed once reading(blob content referenced to a variable) from blob is finished.
    myReader.addEventListener("loadend", function(e){
        console.log("Server: " + JSON.stringify(e));
        //document.getElementById("paragraph").innerHTML = e.srcElement.result;//prints a string
    });
    //start the reading process.
    myReader.readAsArrayBuffer(event.data);
}

function connectionOpened(){
    exampleSocket.onmessage = readMessage;
    document.getElementById("sndMsg").style.display = "";
    showMsg("Connection established");
}

function connectionRefused(){
    showMsg("Connection refused")
}