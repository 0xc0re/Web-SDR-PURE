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
            this.spectralHandler.processSpectrumData(data);
        },

        handleAudioData: function(data){
            this.audioPlayer.decodeAudio(data);
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
                    var mode = e.target.innerHTML;
                    dom.byId("modeMenu").children[0].innerHTML = "Mode: "+mode;

                    var modeNr = self.cmdMap.MODE_MAP[mode];
                    var message = "setMode "+modeNr;
                    self.transmitToDsp(message);
                });
            }
        },

        initBandLogic: function(){
            var self = this;
            var radioBtns = dom.byId("bandDrDwn").children[0].children;
            for(var i=0; i < radioBtns.length; i++){
                on(radioBtns[i], "click", function(e){
                    var band = e.target.innerHTML;
                    var freqArr = self.cmdMap.BAND_SCOPE[band];
                    dom.byId("bandMenu").children[0].innerHTML = "Band: "+band;

                    if(freqArr[0]){
                        var freq = (+freqArr[0] + +freqArr[1])/2;
                        dom.byId("freqInput").value = freq;
                        var message = "setFrequency "+freq;
                        self.transmitToDsp(message);
                    }
                });
            }
        },

        initFreqLogic: function(){
            var freqIn = dom.byId("freqInput");
            var self = this;
            on(freqIn, "input", function(e){
                self.settingsPanel.ownFrequency = this.value;
                var band = self.settingsPanel.getMatchingBand();
                dom.byId("bandMenu").children[0].innerHTML = "Band: "+band;
                var message = "setFrequency "+this.value;
                self.transmitToDsp(message);
            });
        },

        initVolumeLogic: function(){
            var self = this;
            on(this.settingsPanel.slider, "change", function(e){
                var volume = this.value / 100;
                self.audioPlayer.setVolume(volume);

                if(this.value > 0){
                    self.settingsPanel.muteButton.set('label', "Mute")
                    self.settingsPanel.muteButton.muted = false;
                } else {
                    self.settingsPanel.muteButton.set('label', "Unmute")
                    self.settingsPanel.muteButton.muted = true;
                }
            });
            on(this.settingsPanel.muteButton, "click", function(e){
                if(this.muted){
                    this.set('label', "Mute");
                    var volume = self.settingsPanel.slider.value;
                } else {
                    this.set('label', "Unmute");
                    var volume = 0;
                }
                this.muted = !this.muted;
                self.audioPlayer.setVolume(volume);
            });
        },

    });
});