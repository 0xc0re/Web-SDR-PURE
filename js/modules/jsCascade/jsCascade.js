define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom",
], function(declare, domConstruct, dom){
    return declare(null, {
        canvas: null,
        currentRow: null,

        constructor: function(){
            this.currentRow = 0;
        },

        /**
         * This method builds the base canvas for the jsCascade
         *
         * @param width - of the canvas in px
         * @param height - of the canvas in px
         * @param parentNode - HTML-Id where the canvas should be placed
         */
        drawCanvas: function(width, height, parentNode){
            var containter = dom.byId(parentNode);
            var canvas = domConstruct.create("canvas", {id:"jsCascade"}, containter);
            canvas.style.border = "1px solid white";
            canvas.style.background = "white";
            canvas.style.width = width+"px";
            canvas.style.height = height+"px";
            this.canvas = canvas.getContext("2d");
        },

        /**
         * Draw the spectraldata into the canvas
         * @param spectralData - Array of spectraldata
         */
        processSpectrumData: function(spectralData) {
            console.log("processSpectrumData");
            if (this.canvas) {
                var samplesLen = spectralData[4] + spectralData[3] << 8;
                var mainRx = spectralData[6] + spectralData[5] << 8;
                var subRx = spectralData[8] + spectralData[7] << 8;
                var samplingRate = spectralData[12] + spectralData[11] << 8 + spectralData[10] << 16 + spectralData[9] << 24;

                var avg = 0;
                var i = 0;

                //console.log(samplesLen);

                for (i = 15; i < (512 + 15); i++) {
                    avg += spectralData[i];
                }
                avg = (avg / 512);
                var lo = avg - 20;
                var hi = avg + 10;
                var diff = hi - lo;

                // magic 3 point calculation
                // 80 - 120 --> 0 - 255
                //
                //  0 -  40 --> 0 - 255
                //

                var frac = 255 / diff;

                for (i = 15; i < (512 + 15); i++) {

                    var val = spectralData[i];

                    if (val < lo)
                        val = 0;
                    else if (val > hi)
                        val = 255;
                    else {
                        val = (val - lo) * frac;
                    }
                    this.canvas.fillStyle = "rgba(1,0,0,0.5)";
                    // this.canvas.fillStyle = "rgba(0," + (255 - val) + ",0,1)";
                    this.canvas.fillRect(i - 15, this.currentRow, 1, 1);
                }

                console.log("spectrum drawn");

                //Emtpies the canvas to prevent overflow
                this.currentRow++;
                if (this.currentRow >= 400) {
                    this.canvas.fillStyle = "rgba(0,0,0,1)";
                    this.canvas.fillRect(0, 0, 512, 400);
                    this.currentRow = 0;
                }
            }
        },

    });
});