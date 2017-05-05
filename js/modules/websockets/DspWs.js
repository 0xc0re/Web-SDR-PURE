define([
    "dojo/_base/declare",
    "./WebsocketBase",
], function(declare, WebsocketBase){
    return declare(WebsocketBase, {

        /** Override - What should happen if the connection doesnt open**/
        transactionErroreous: function (message) {
        },

        /** Override - What should happen if the transaction is completed **/
        transactionCompleted: function(param){
        },

        /** Override - outputs spectral data **/
        handleSpectralData: function(){
        },

        /** Override - outputs audio data **/
        handleAudioData: function(){
        },

        connectionOpened: function () {
            console.log("connectionOpened");
            this.transactionCompleted();
        },

        messageReceived: function (event) {
            var myReader = new FileReader();
            myReader.onload = this.processData;
            myReader.readAsArrayBuffer(event.data);
        },

        processData: function (result) {
            console.log("processData");
            console.log(result);
            console.log(result[0]);
            // response.success = response.state == "s" ? true : false;

            /*
             if(response.success) {
             transactionCompleted(response.port);
             } else {
             transactionErroreous("DSP not started");
             //connectionRefused();
             //disconnectManager();
             }
             */
        },

        transmitMessage: function(msg){
             while(msg.length < 64)
             msg += "\0";
             this.websocket.send(msg);
        },
    });
});