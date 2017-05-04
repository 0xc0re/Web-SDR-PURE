require([
    "dojo/on",
    "dojo/dom",
    "dojo/_base/lang",
    "dojo/DeferredList",
    "dojo/_base/Deferred",
    "modules/websockets/dspWs",
    "modules/utils/messageDisplayer",
    "modules/jsCascade/jsCascade",
    "dojo/domReady!",
], function (on, dom, lang, DeferredList, Deferred, dspWebsocket, messageDisplayer, jsCascade) {
    ip = null;
    port = null;

    // Site Logic
    // prepareVars();
    // initiateConnection();

    //TEST-AREA
    var spectData = "0, 2, 1, 3,c4,ff,b3,ff,27, 0, 0,bb,80,23,28,a2,a2,a1,a6,a4,a3,9e,9a,99,8f,8f,8b,8b,89,88,84,80,7d,7b,7f,77,7e,76,79,75,72,6f,6f,72,6e,74,6f,6e,6c,6b,6a,6a,66,6a,65,6a,65,66,65,64,63,64,64,64,65,63,61,5f,5f,60,61,64,69,63,63,60,63,66,64,64,67,64,66,63,62,63,5f,5d,5f,5f,5f,62,64,66,62,61,5d,5d,5d,5d,5f,5e,5e,63,63,63,5f,5f,62,60,68,63,61,5f,62,61,63,67,67,68,66,62,62,65,65,63,62,64,64,61,69,64,66,66,62,62,60,5d,5c,63,5f,67,5f,63,60,5f,60,5f,5d,60,61,63,62,61,60,64,60,65,62,64,63,64,5f,60,60,61,65,63,5f,66,5f,63,5f,64,68,66,6b,66,65,65,60,62,62,62,62,60,60,62,62,63,63,64,61,63,61,5e,5d,5e,63,63,62,62,68,63,62,5f,62,62,62,64,62,68,61,62,5f,5f,5c,61,61,63,62,61,63,63,64,64,68,66,64,64,62,64,6a,62,68,63,5e,5d,5f,5f,62,62,5f,63,61,64,5e,5e,66,67,60,5e,66,68,61,61,66,66,61,5e,5f,5e,60,64,61,5d,62,5f,69,60,66,60,60,62,5f,5f,65,60,66,66,67,62,62,66,61,61,66,62,66,67,60,66,61,60,5e,61,5d,5e,67,65,65,64,64,67,62,61,65,62,63,62,69,60,62,64,64,64,65,60,60,60,61,62,61,5f,65,63,5e,60,61,63,66,66,63,64,61,61,61,64,61,67,65,60,60,60,60,63,5f,5e,5d,65,64,61,62,68,65,61,65,62,69,64,62,65,62,64,64,61,61,62,62,5e,60,64,63,64,65,64,62,65,63,63,64,62,63,62,64,5f,5f,60,60,66,61,64,65,67,63,61,62,61,61,65,65,65,65,65,68,64,67,60,62,61,61,61,68,65,62,68,68,60,60,5e,5e,5d,60,5e,60,61,5f,60,60,65,62,62,65,65,67,62,60,5e,5e,60,5f,63,62,61,64,67,64,60,62,5b,5f,5f,5e,61,5f,5f,66,67,5f,61,5f,64,62,64,63,64,63,63,64,62,62,63,60,65,62,6a,62,62,62,61,61,5e,5e,61,61,63,60,5f,5e,61,63,65,5f,5f,60,5f,5d,5f,5f,60,5d,5f,5e,61,61,64,63,5f,5f,5e,5f,60, 2, 0,1f,40,7f, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,c0, 8, 0,a0,b7,7f";
    var spectArray = spectData.split(",");
    spectByteArr = new Uint8Array(spectArray.length);
    for(var i=0; i < spectArray.length; i++){
        var hex = parseInt(spectArray[i], 16);
        spectByteArr[i] = hex;
    }

    cascade = new jsCascade();
    cascade.drawCanvas(800, 400, "cascadeContainer");

    on(dom.byId("button"), "click", function(e){
        sendData();
    });

    function sendData(){
        var amount = 5;
        while(amount > 0){
            amount--;
            this.cascade.processSpectrumData(this.spectByteArr);
        }
    }

    function prepareVars(){
        initializeWebsocket();
        htmlLogger = new messageDisplayer();
    }

    function initializeWebsocket(){
        dspSocket = new dspWebsocket();
        dspSocket.transactionErroreous = lang.hitch(this, showErrorMessage);
        window.onbeforeunload = function() {
            dspSocket.disconnectWebsocket();
            return "";
        };
    }

    function initiateConnection(){
        var deferreds = [];
        deferreds.push(getAjaxData("showManagerIp", lang.hitch(this, setIp), showErrorMessage));
        deferreds.push(getAjaxData("showDspPort", lang.hitch(this, setPort), showErrorMessage));

        var defList = new DeferredList(deferreds);
        defList.then(function(result){
            startWSHandshake()
        })
    }

    function startWSHandshake(){
        var location = buildServerLocation();
        dspSocket.transactionCompleted = lang.hitch(this, finishedWSHandshake);
        //dspSocket.startWebsocket(location);
    }

    function finishedWSHandshake(){
        dspSocket.transmitMessage("setFPS 512 10");


        //dspSocket.transmitMessage("startChannel(0)");

        /*
         readInitialData();
         managerSocket.messageReceived = lang.hitch(this, readInitialData);
         showWaterfall();
         */

        /*
         setPort(port);
         managerSocket.disconnectWebsocket();
         startModerator();
         */
    }

    function readInitialData (event) {
        console.log("readInitialData");
        var myReader = new FileReader();
        myReader.onload = lang.hitch(this, processInitialData);
        myReader.readAsText(event.data);
    }

    function processInitialData (result){
        console.log("processInitialData");
        console.log(result);

        var response = JSON.parse(result);
        response.success = response.state == "s" ? true : false;

        // if(response.success) {
        //     disconnectManager();
        //     startDspServer(response.port);
        // } else {
        //     showMsg("DSP not started");
        //     disconnectManager();
        // }

        /*
         var arrBuff;
         arrBuff = this.result;
         var i8Arr = new Uint8Array(arrBuff);
         console.log(i8Arr);
         */
    }

    function startModerator(){
        var location = buildServerLocation();
        // managerSocket.transactionCompleted = lang.hitch(this, finishedWSHandshake);
        dspSocket.startWebsocket(location);

        dspSocket.messageReceived = function(result){

        }
    }

    function sendMessageToSocket(){
        //var message = document.getElementById('msgBox');
        //sendMessageToDsp(message.value)+
    }

    function buildServerLocation(){
        var newIp = "ws://"+ip;
        return newIp+":"+port;
    }

    function setIp(inputIp){
        ip = inputIp;
    }

    function setPort(inputPort){
        port = inputPort;
    }

    function getAjaxData(ajaxMethod, successCallback, errorCallback){
        var deferred = new Deferred();
        var method = "function="+ajaxMethod;
        $.ajax({
            url: "../../php/ajax/dataAccessor.php",
            data: method,
            success: function(result){
                successCallback(result);
                deferred.resolve();
            },
            error: function(result){
                errorCallback(result);
            }
        });
        return deferred;
    }

    function showErrorMessage(message){
        htmlLogger.showMsg(message, true);
    }

    //Watterfall thingy to jsCascade
    function showWaterfall(){
        document.getElementById("sndMsg").style.display = "";
        document.getElementById("waterfall").style.display = "";
    }
});