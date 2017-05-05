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

        connectionOpened: function () {
            console.log("connectionOpened");
            // this.onmessage = this.readData;
            this.transactionCompleted();
        },

        // readData: function (event) {
        messageReceived: function (event) {
            console.log("messageReceived");
            console.log(event);
            var myReader = new FileReader();
            myReader.onload = this.processData;
            myReader.arraybuffer(event.data);
        },

        processData: function (event) {
            console.log("processData");
            console.log(event);
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
             dspWebsocket.send(msg);
        },
    });
});