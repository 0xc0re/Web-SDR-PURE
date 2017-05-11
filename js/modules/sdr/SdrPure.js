define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/on",
    "modules/sdr/CmdMap",
    "modules/sdr/JsCascade",
    "modules/sdr/JsAudio",
    "modules/sdr/PureMenubar",
], function(declare, dom, on,  CmdMap, JsCascade, JsAudio, PureMenubar){
    return declare(null, {
        containerNode: null,
        cascade: null,
        menuBar: null,
        audioPlayer: null,
        cmdMap: null,

        /**
         * Needs to be overwritten
         */
        transmitToDsp: function(message){
        },

        /**
         *
         * @param params
         *      .containerId --> ID of the HTML-Container
         */
        constructor: function(params){
            this.containerNode = dom.byId(params.containerId);
            this.cascade = new JsCascade(params);
            this.cmdMap = new CmdMap();
            this.menuBar = new PureMenubar(this.cmdMap);
            this.audioPlayer = new JsAudio();

        },

        buildSDRContent: function(){
            //Setup Frame
            this.menuBar.buildMenubar(this.containerNode.id);
            this.audioPlayer.buildAudioPlayer(this.containerNode);
            this.cascade.drawCanvas(200);
            this.initBL();
        },

        handleSpectralData: function(data){
            this.cascade.processSpectrumData(data);
        },

        handleAudioData: function(data){
            console.log("handleAudioData");
        },

        initBL: function(){
            console.log("initBL");
            this.initModeLogic();
        },

        initModeLogic: function(){
            var self = this;
            var radioBtns = dom.byId("modeDrDwn").children[0].children;
            for(var i=0; i < radioBtns.length; i++){
                on(radioBtns[i], "click", function(e){
                    var mode = self.cmdMap.MODE_MAP[e.target.innerHTML];
                    var message = "setMode "+mode;
                    self.transmitToDsp(message);
                });
            }
        },

    });
});