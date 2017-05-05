define([
    "dojo/_base/declare",
    "./WebsocketBase2",
], function(declare, WebsocketBase){
    return declare(WebsocketBase, {

        /** Override - What should happen if the connection doesnt open**/
        transactionErroreous: function (message) {
        },

        /** Override - What should happen if the transaction is completed **/
        transactionCompleted: function(param){
        },

        connectionOpened: function () {
            this.onmessage = this.readInitialData;
            this.transactionCompleted();
        },

        readInitialData: function (event) {
            console.log("readInitialData");
            console.log(event);
            var myReader = new FileReader();
            myReader.onload = processInitialData;
            myReader.readAsText(event.data); //TODO maybe hitch this
        },

        processInitialData: function (event) {
            console.log("processInitialData");
            console.log(event);
            var response = JSON.parse(this.result);
            response.success = response.state == "s" ? true : false;

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
    });
});