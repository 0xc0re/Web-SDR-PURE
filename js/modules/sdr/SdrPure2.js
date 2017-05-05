define([
    "dojo/_base/declare",
    "dojo/dom",
    "modules/sdr/JsCascade",
    "modules/sdr/JsAudio",
    "modules/sdr/PureMenubar",
], function(declare, dom,  JsCascade, JsAudio, PureMenubar){
    return declare(null, {
        containerNode: null,
        cascade: null,
        menuBar: null,
        audioPlayer: null,

        /**
         *
         * @param params
         *      .containerId --> ID of the HTML-Container
         */
        constructor: function(params){
            this.containerNode = dom.byId(params.containerId);
            this.cascade = new JsCascade(params);
            this.menuBar = new PureMenubar();
            this.audioPlayer = new JsAudio();
        },

        buildRadioContent: function(){
            //Setup Frame
            this.menuBar.buildMenubar(this.containerNode.id);
            this.audioPlayer.buildAudioPlayer(this.containerNode);
            this.cascade.drawCanvas(200);
        },

        processDspData: function(){

        },

        //TEST
        processSpectData: function(data){
            this.cascade.processSpectrumData(data);
        }

    });
});