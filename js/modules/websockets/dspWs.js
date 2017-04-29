define([
    "dojo/_base/declare",
    "./websocketBase",
], function(declare, websocketBase){
    return declare(websocketBase, {

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
            console.log("readInitialData");
            console.log(event);
            var myReader = new FileReader();
            myReader.onload = processData;
            myReader.readAsText(event.data); //TODO maybe hitch this
        },

        processData: function (event) {
            console.log("processInitialData");
            console.log(event);
            var response = JSON.parse(this.result);
            console.log(response);
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