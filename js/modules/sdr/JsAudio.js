define([
    "dojo/_base/declare",
    "dojox/mobile/Audio",
    "dojox/mobile/parser",
    "dojox/mobile"
], function(declare, Audio){
    return declare(null, {

        constructor: function(params){
            this.initDecodeTable();
        },

        buildAudioPlayer: function(containerNode){
            var widget = new Audio();
            containerNode.appendChild(widget.domNode);
            widget.startup();
        },

        processAudioData: function(){

        },

        playAudio: function (data){
        if (data[0] != 1)
            return;

        var startTime = 0;

        var decoded = [];

        for (var i = 0, audioChunk; audioChunk = data[i]; ++i) {
            // Create/set audio buffer for each chunk
            var audioBuffer = audioCtx.createBuffer(1, 800, 8000);
            if (!audioBuffer)
            {
                console.log("audiobuffer empty");
                continue;
            }

            audioBuffer.getChannelData(0).set(audioChunk);

            var source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.noteOn(startTime);
            source.connect(audioCtx.destination);

            startTime += audioBuffer.duration;
        }
    },

        //TODO Only one tine
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