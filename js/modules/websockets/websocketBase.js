define([
    "dojo/_base/declare",
    "dojo/_base/lang",
], function(declare, lang){
    return declare(null, {
        dspWebsocket : null,

        startWebsocketByIpAndPort : function(ip, port, mode){
            var location = ip + ":" + port;
            startWebsocket(location, mode);
        },

        startWebsocket: function (location, mode) {
            if(!mode) mode = "binary";
            dspWebsocket = new WebSocket(location, mode);
            dspWebsocket.onerror = lang.hitch(this, this.errorBehaviour);
            dspWebsocket.onopen = lang.hitch(this, this.connectionOpened);
            dspWebsocket.onmessage = lang.hitch(this, this.messageReceived);
        },

        disconnectWebsocket: function () {
            this.transmitMessage("disconnect()");

            //dspWebsocket.onmessage = null;
            //dspWebsocket.close();
            //dspWebsocket = null;
        },

        transmitMessage: function(msg){
            dspWebsocket.send(msg);
        },

        errorBehaviour: function(param){
            this.transactionErroreous("Connection refused");
        },

        /** TO Override **/
        messageReceived: function(){
        },

        /** To Override **/
        connectionOpened: function () {
        },

        /** To Override **/
        transactionErroreous: function (message) {
        },
    });
});