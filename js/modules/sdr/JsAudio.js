define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/on",
], function(declare, domConstruct, on){
    return declare(null, {
        audioCtx: null,
        gainNode: null,

        masterVolume: 1,
        decodedBuffer: [],

        samplingRate: 8000,

        constructor: function(params){
            this.initDecodeTable();
            this.initializeAudio();
        },

        initializeAudio: function(){
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx  = new AudioContext();
            this.gainNode = this.audioCtx.createGain();
        },

        setVolume: function(value){
            this.masterVolume = value;
        },

        decodeAudio: function (data){
            var decodeFraction = 32768;
            for(var i=0; i < data.length; i++){
                var buffVal = this.decodeTable[data[i]] / decodeFraction;
                this.decodedBuffer.push(buffVal);
            }

            if(this.decodedBuffer.length >= this.samplingRate) this.playAudio();
            console.log(this.decodedBuffer.length);
        },

        playAudio: function(){
            var source = this.audioCtx.createBufferSource();
            var audioBuffer = this.audioCtx.createBuffer(1, this.samplingRate, this.samplingRate);

            var playBuff = this.decodedBuffer.splice(0, this.samplingRate);
            audioBuffer.getChannelData(0).set(playBuff);

            source.buffer = audioBuffer;

            this.gainNode.gain.value = this.masterVolume;
            this.gainNode.connect(this.audioCtx.destination);

            source.connect(this.gainNode);
            source.start();
        },

        initDecodeTable: function(){
            this.decodeTable = new Array(256);
            for (var i = 0; i < 265; i++){
                var input = i ^ 85;
                var mantissa = (input & 15) << 4;
                var segment = (input & 112) >> 4;
                var value = mantissa + 8;
                if (segment >= 1) value += 256;
                if (segment > 1) value = value << (segment - 1);
                if ((input & 128) == 0) value *= -1;
                this.decodeTable[i] = value;
            }
        },

    });
});