require([
    "dojo/dom",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/DeferredList",
    "dojo/_base/Deferred",
    "modules/websockets/dspWs",
    "modules/utils/messageDisplayer",
    "dojo/domReady!",
], function (dom, on, lang, DeferredList, Deferred, dspWebsocket, messageDisplayer) {
    ip = null;
    port = null;

    // Site Logic
    prepareVars();
    initiateConnection();

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
        dspSocket.startWebsocket(location);
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