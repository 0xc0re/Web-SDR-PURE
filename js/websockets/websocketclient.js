var dspWebsocket = null;

function connect(){
    $.ajax({url: "../../php/ajax/getDspIp.php", success: function(result){
        var item = JSON.parse(result);
        $("#wsport")[0].value = item[0][0];
    }});


    /*
    var port = $('#wsport').val();
    dspWebsocket = new WebSocket("ws://127.0.0.1:" + port, "binary");
    // dspWebsocket.onerror = connectionRefused;
    dspWebsocket.onerror = connectionOpened;
    dspWebsocket.onopen = connectionOpened;
    */
}

function disconnect(){
    dspWebsocket.onmessage = null;
    dspWebsocket = null;
    document.getElementById("sndMsg").style.display = "none";
    document.getElementById("waterfall").style.display = "none";
}

function sendMessage(msg){
    if(dspWebsocket){
        while(msg.length < 64)
            msg += "\0";
        dspWebsocket.send(msg);
    }
}

function readDspData (event) {
    var myReader = new FileReader();
    var arrBuff;
    myReader.onload = processDspData;

    //start the reading process.
    myReader.readAsArrayBuffer(event.data);
}

function processDspData() {
    arrBuff = this.result;
    var i8Arr = new Uint8Array(arrBuff);

    if (asdf > 5)
        processSpectrumData(i8Arr);
}

function connectionOpened(){
    dspWebsocket.onmessage = readDspData;
    document.getElementById("sndMsg").style.display = "";
    document.getElementById("waterfall").style.display = "";
}

function connectionRefused(){
    showMsg("Connection refused")
}
