define([
    "dojo/_base/declare",
    "./websocketBase",
], function(declare, websocketBase){
    return declare(websocketBase, {

        /** Override - What should happen if the connection doesnt open**/
        transactionErroreous: function (message) {
        },

        /** Override - What should happen if the transaction is completed **/
        transactionCompleted: function(portNr){
        },

        connectionOpened: function () {
            this.onmessage = readInitialData;
        },

        readInitialData: function (event) {
            var myReader = new FileReader();
            myReader.onload = processInitialData;
            myReader.readAsText(event.data);
        },

        processInitialData: function (event) {
            var response = JSON.parse(this.result);
            response.success = response.state == "s" ? true : false;
            if(response.success) {
                transactionCompleted(response.port);
            } else {
                transactionErroreous("DSP not started");
                //connectionRefused();
                //disconnectManager();
            }
        },
    });
});