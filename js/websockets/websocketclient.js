var dspWebsocket = null;

initDecodeTable();

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
    sendMessage("disconnect()");
    dspWebsocket.onmessage = null;
    dspWebsocket = null;


    dspWebsocket = new WebSocket("ws://127.0.0.1:50000", "binary");
    dspWebsocket.onmessage = readDspData;
    dspWebsocket.onopen = function(e) {
        sendMessage("setfrequency 136700000");
        sendMessage("setmode 0");
        sendMessage("setfilter -3900 -100");
        sendMessage("setfps 512 10");
        sendMessage("startaudiostream");
    };
    //hideWaterfall();
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
    myReader.readAsText(event.data);
}

function processInitialData (){
    //s;dsp started;50000

    var jsonRaw = this.result.substr(0, this.result.length - 1);
    //console.log(jsonRaw);

    var jso = JSON.parse(jsonRaw);

    if (jso)
    {
    }

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

    //if (preCounter > 5)
    //    processSpectrumData(i8Arr);

    // audio
    if (i8Arr[0] == 1)
    {
        decodeBuf(i8Arr);

        if (currentDec > samples)
        {
            var nowBuffer = audioBuffer.getChannelData(0);
            for (var i = 0;i< samples;i++)
            {
                nowBuffer[i] = decoded[i];
            }

            var remaining = [];

            for (var i = 0; i < (decoded.length - samples);i++){
                remaining[i] = decoded[i + samples];
                currentDec = i;
            }
            decoded = remaining;

            var source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);
            source.start();

            console.log("played some shit, remaining:" + decoded.length);
            //decoded = [];
            //currentDec = 0;
        }
    }
    else if (i8Arr[0] == 0)
    {
        processSpectrumData(i8Arr);
    }
}

var decodeTable;
var decoded = [];

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var samples = 8000;
var audioBuffer = audioCtx.createBuffer(1, samples, samples);
var currentDec = 0;

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

var decodeFraction = 32768;

function decodeBuf(buff){
    var samplesLen = buff[4] + buff[3]<<8;
    var curr;
    var dec;

    for (var iIn=48; iIn < buff.length; iIn++) {
        curr=buff[iIn] & 0xFF;
        dec=decodeTable[curr];

        decoded[currentDec++] = dec / decodeFraction;

        // assumes BIGENDIAN
        //decoded[currentDec++]=((dec>>8)&0xFF);
        //decoded[currentDec++]=(dec&0xFF);
    }

    //console.log("decoded: " + (buff.length - 48) + " -> " + decoded.length);
}

function initDecodeTable()
{
    decodeTable = new Array(256);
    for (var i = 0; i < 265; i++){
        var input = i ^ 85;
        var mantissa = (input & 15) << 4;
        var segment = (input & 112) >> 4;
        var value = mantissa + 8;
        if (segment >= 1) value += 256;
        if (segment > 1) value = value << (segment - 1);
        if ((input & 128) == 0) value *= -1;
        decodeTable[i] = value;
    }
    //console.log("decode table initialized");
    //alert(JSON.stringify(decodeTable));
}