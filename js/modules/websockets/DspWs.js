define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "./WebsocketBase",
], function(declare, lang, WebsocketBase){
    return declare(WebsocketBase, {

        constructor: function(){
        },

        /** Override - What should happen if the connection doesnt open**/
        transactionErroreous: function (message) {
        },

        /** Override - What should happen if the transaction is completed **/
        transactionCompleted: function(param){
        },

        /** Override - outputs spectral data **/
        handleSpectralData: function(data){
        },

        /** Override - outputs audio data **/
        handleAudioData: function(data){
        },

        connectionOpened: function () {
            this.transactionCompleted();
        },

        messageReceived: function (event) {
            var myReader = new FileReader();
            myReader.onload = lang.hitch(this, this.processData);
            myReader.readAsArrayBuffer(event.data);
        },

        processData: function (result) {
            var targetResult = result.target.result;
            targetResult = new Uint8Array(targetResult);
            if(targetResult[0] == 0){
                this.handleSpectralData(targetResult);
            } else {
                this.handleAudioData(targetResult);
            }
        },

        transmitMessage: function(msg){
             while(msg.length < 64)
             msg += "\0";
             this.websocket.send(msg);
        },
    });
});