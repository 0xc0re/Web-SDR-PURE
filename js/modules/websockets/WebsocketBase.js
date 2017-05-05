define([
    "dojo/_base/declare",
    "dojo/_base/lang",
], function(declare, lang){
    return declare(null, {
        websocket : null,

        constructor: function(){
        },

        startWebsocketByIpAndPort : function(ip, port, mode){
            var location = ip + ":" + port;
            this.startWebsocket(location, mode);
        },

        startWebsocket: function (location, mode) {
            if(!mode) mode = "binary";
            this.websocket = new WebSocket(location, mode);
            this.websocket.onerror = lang.hitch(this, this.errorBehaviour);
            this.websocket.onopen = lang.hitch(this, this.connectionOpened);
            this.websocket.onmessage = lang.hitch(this, this.messageReceived);
        },

        disconnectWebsocket: function () {
            this.websocket.onmessage = null;
            this.websocket.close();
            this.websocket = null;
        },

        transmitMessage: function(msg){
            this.websocket.send(msg);
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