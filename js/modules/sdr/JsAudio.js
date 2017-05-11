define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/on",
], function(declare, domConstruct, on){
    return declare(null, {
        audioCtx: null,
        source: null,
        gainNode: null,

        constructor: function(params){
            this.initDecodeTable();
            this.initializeAudio();
        },

        initializeAudio: function(){
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx  = new AudioContext();

            this.source = this.audioCtx.createBufferSource();
            this.gainNode = this.audioCtx.createGain();

            this.source.connect(this.gainNode);
            this.gainNode.connect(this.audioCtx.destination);
        },

        buildAudioPlayer: function(containerNode){
            var test = domConstruct.create("button", {isMuted: false}, containerNode);
            test.innerHTML = "MUTE";

            var self = this;
            on(test, "click", function(e){
                if(this.isMuted){
                    self.gainNode.gain.value = 1;
                    this.innerHTML = "Mute";
                } else {
                    self.gainNode.gain.value = 0;
                    this.innerHTML = "Unmute";
                }
                this.isMuted = !this.isMuted;
            });
        },

        playAudio: function (data){
        if (data[0] != 1)
            return;

        var startTime = 0;

        var decoded = [];

        for (var i = 0, audioChunk; audioChunk = data[i]; ++i) {
            // Create/set audio buffer for each chunk
            var audioBuffer = this.audioCtx.createBuffer(1, 800, 8000);
            if (!audioBuffer)
            {
                continue;
            }
            audioBuffer.getChannelData(0).set(audioChunk);

            // var source = this.audioCtx.createBufferSource();
            this.source.buffer = audioBuffer;
            this.source.noteOn(startTime);
            this.source.connect(this.audioCtx.destination);
            startTime += audioBuffer.duration;
        }
    },

    initDecodeTable: function(){
        decodeTable = new Array(256);
        for (var i = 0; i < 265; i++){
            var input = i ^ 85;
            var mantissa = (input & 15) << 4;
            var segment = (input & 112) >> 4;
            var value = mantissa + 8;
            if (segment >= 1) value += 256;
            if (segment > 1) value = value << (segment - 1);
            if ((input & 128) == 0) value *= -1;
            decodeTable[i] = value;
        }
    },

    });
});