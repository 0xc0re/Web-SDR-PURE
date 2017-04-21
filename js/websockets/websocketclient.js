var dspWebsocket = null;

function connect(){
    $.ajax({
        url: "../../php/ajax/dataAccessor.php",
        data:"function=getManagerLocation",
        success: function(result){
            startWebsocket(result);
        },
        error: function(result){
            showMsg("PURE Manager location not found");
        }
    });
}

function startWebsocket(location){
    dspWebsocket = new WebSocket(location, "binary");
    dspWebsocket.onerror = connectionRefused;
    dspWebsocket.onopen = connectionOpened;
}

function disconnect(){
    dspWebsocket.onmessage = null;
    dspWebsocket = null;
    hideWaterfall();
}

//This is the DSP Part. Manager doesnt need 64
function sendMessage(msg){
    if(dspWebsocket){
        while(msg.length < 64)
            msg += "\0";
        dspWebsocket.send(msg);
    }
}

function readInitialData (event) {
    var myReader = new FileReader();
    myReader.onload = processInitialData;
    //start the reading process.
    myReader.readAsArrayBuffer(event.data);
}

function processInitialData (){
    //s;dsp started;50000
    console.log(this.result);
    /*
    var arrBuff;
    arrBuff = this.result;
    var i8Arr = new Uint8Array(arrBuff);
    console.log(i8Arr);
    */
}

function readDspData (event) {
    var myReader = new FileReader();
    myReader.onload = processDspData;
    //start the reading process.
    myReader.readAsArrayBuffer(event.data);
}

var preCounter = 0;
function processDspData() {
    var arrBuff;
    arrBuff = this.result;
    var i8Arr = new Uint8Array(arrBuff);

    if (preCounter > 5)
        processSpectrumData(i8Arr);
}

function connectionOpened(){
    dspWebsocket.onmessage = readInitialData;
    sendMessage("startChannel(0)");
    showWaterfall();
}

function showWaterfall(){
    document.getElementById("sndMsg").style.display = "";
    document.getElementById("waterfall").style.display = "";
}

function hideWaterfall(){
    document.getElementById("sndMsg").style.display = "none";
    document.getElementById("waterfall").style.display = "none";
}

function connectionRefused(){
    showMsg("Connection refused")
}
