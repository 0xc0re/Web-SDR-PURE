var dspWebsocket = null;

// function connect(){
//     $.ajax({
//         url: "../../php/ajax/dataAccessor.php",
//         data:"function=getManagerLocation",
//         success: function(result){
//             startWebsocket(result);
//         },
//         error: function(result){
//             showMsg("PURE Manager location not found");
//         }
//     });
// }

// function startWebsocket(location){
//     dspWebsocket = new WebSocket(location, "binary");
//     dspWebsocket.onerror = connectionRefused;
//     dspWebsocket.onopen = connectionOpened;
// }

// function disconnectManager(){
//     sendMessage("disconnect()");
//     dspWebsocket.onmessage = null;
//     dspWebsocket.close();
//     dspWebsocket = null;
//     //hideWaterfall();
// }

//This is the DSP Part. Manager doesnt need 64
// function sendMessageToDsp(msg){
//     if(dspWebsocket){
//         while(msg.length < 64)
//             msg += "\0";
//         dspWebsocket.send(msg);
//     }
// }

function readInitialData (event) {
    var myReader = new FileReader();
    myReader.onload = processInitialData;
    myReader.readAsText(event.data);
}

function processInitialData (){
    var response = JSON.parse(this.result);
    response.success = response.state == "s" ? true : false;
    if(response.success) {
        disconnectManager();
        startDspServer(response.port);
    } else {
        showMsg("DSP not started");
        disconnectManager();
    }

    /*
    var arrBuff;
    arrBuff = this.result;
    var i8Arr = new Uint8Array(arrBuff);
    console.log(i8Arr);
    */
}

function startDspServer(port){
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

function readDspData (event) {
    var myReader = new FileReader();
    myReader.onload = processDspData;
    //start the reading process.
    myReader.readAsArrayBuffer(event.data);
}

function processDspData() {
    var arrBuff;
    arrBuff = this.result;
    var i8Arr = new Uint8Array(arrBuff);

    processSpectrumData(i8Arr);
}

function connectionOpened(){
    dspWebsocket.onmessage = readInitialData;
    sendMessageToDsp("startChannel(0)");
    showWaterfall();
}

//Watterfall thingy to jsCascade
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