var exampleSocket = null;

function connect(){
    var port = $('#wsport').val();
    exampleSocket = new WebSocket("ws://127.0.0.1:" + port, "binary");
    exampleSocket.onerror = connectionRefused;
    exampleSocket.onopen = connectionOpened;
}

function disconnect(){
    exampleSocket.onmessage = null;
    exampleSocket = null;
    document.getElementById("sndMsg").style.display = "none";
    document.getElementById("waterfall").style.display = "none";
}

function sendMessage(msg){
    if(exampleSocket){
        while(msg.length < 64)
            msg += "\0";
        exampleSocket.send(msg);
    }
}

var asdf = 0;

function readMessage (event) {
    var myReader = new FileReader();
    var arrBuff;
    myReader.onload = function() {
        asdf++;
        arrBuff = this.result;
        var i8Arr = new Uint8Array(arrBuff);

        if (asdf > 5)
            processSpectrumData(i8Arr);

        //var msg = String.fromCharCode.apply(null, i8Arr);
        //if (asdf == 20)
        //    alert(JSON.stringify(i8Arr));
        //console.log("Server response(" + msg.length + "): "/* + msg.substr(0, msg.length - 1)*/);
    };

    //start the reading process.
    myReader.readAsArrayBuffer(event.data);
}

function connectionOpened(){
    exampleSocket.onmessage = readMessage;
    document.getElementById("sndMsg").style.display = "";
    document.getElementById("waterfall").style.display = "";
}

function connectionRefused(){
    showMsg("Connection refused")
}