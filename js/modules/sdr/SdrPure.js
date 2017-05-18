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
            this.menuBar = new PureMenubar(this.cmdMap, params.midFrequency);
            this.audioPlayer = new JsAudio();
            this.audioPlayer.initializeAudio();
        },

        buildSDRContent: function(){
            //Setup Frame
            this.menuBar.buildMenubar(this.containerNode.id);
            this.cascade.drawCanvas(200);
            this.initBL();
        },

        handleSpectralData: function(data){
            console.log("handleSpectralData");
            this.cascade.processSpectrumData(data);
        },

        handleAudioData: function(data){
            console.log("handleAudioData");
            this.audioPlayer.playAudio(data);
        },

        initBL: function(){
            this.initModeLogic();
            this.initFreqLogic();
            this.initBandLogic();
            this.initVolumeLogic();
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

        initBandLogic: function(){
            var self = this;
            var radioBtns = dom.byId("bandDrDwn").children[0].children;
            for(var i=0; i < radioBtns.length; i++){
                on(radioBtns[i], "click", function(e){
                    var freq = self.cmdMap.BAND_MAP[e.target.innerHTML]
                    var message = "setFrequency "+freq;
                    // self.transmitToDsp(message);
                    dom.byId("freqInput").value = freq;
                });
            }
        },

        initFreqLogic: function(){
            var freqBtn = dom.byId("freqButton");
            var self = this;
            on(freqBtn, "click", function(e){
                var freq = dom.byId("freqInput").value;
                var message = "setFrequency "+freq;
                self.transmitToDsp(message);
            });
        },

        initVolumeLogic: function(){
            var self = this;
            on(this.menuBar.slider, "change", function(e){
                var volume = this.value / 100;
                self.audioPlayer.setVolume(volume);
            });
        },

    });
});