define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/on",
    "modules/sdr/CmdMap",
    "modules/sdr/JsSpectralHandler",
    "modules/sdr/JsAudio",
    "modules/sdr/PureSettingsManager",
], function(declare, dom, on,  CmdMap, JsSpectralHandler, JsAudio, PureSetMgr){
    return declare(null, {
        containerNode: null,
        spectralHandler: null,
        settingsPanel: null,
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
            this.spectralHandler = new JsSpectralHandler(params);
            this.cmdMap = new CmdMap();
            this.settingsPanel = new PureSetMgr(this.cmdMap, params.midFrequency);
            this.audioPlayer = new JsAudio();
            this.audioPlayer.initializeAudio();
        },

        buildSDRContent: function(){
            //Setup Frame
            this.settingsPanel.buildMenubar(this.containerNode.id);
            this.settingsPanel.buildPanel(this.containerNode);
            this.spectralHandler.createSpectralView(200);
            this.initBL();
        },

        handleSpectralData: function(data){
            console.log("handleSpectralData");
            this.spectralHandler.processSpectrumData(data);
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
                    var freqArr = self.cmdMap.BAND_SCOPE[e.target.innerHTML]
                    var freq = (+freqArr[0] + +freqArr[1])/2;
                    console.log("freq");
                    console.log(freq);
                    var message = "setFrequency "+freq;
                    self.transmitToDsp(message);
                    dom.byId("freqInput").value = freq;
                });
            }
        },

        initFreqLogic: function(){
            var freqIn = dom.byId("freqInput");
            var self = this;
            on(freqIn, "input", function(e){
                var message = "setFrequency "+this.value;
                self.transmitToDsp(message);
            });
        },

        initVolumeLogic: function(){
            var self = this;
            on(this.settingsPanel.slider, "change", function(e){
                var volume = this.value / 100;
                self.audioPlayer.setVolume(volume);
            });
        },

    });
});