define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom",
], function(declare, domConstruct, dom){
    return declare(null, {
        canvasHeight: null,
        HEADER_LENGTH: 15,

        /**
         * Area of interest
         */
        AOI_Upper: 20,
        AOI_Lower: 10,

        canvas: null,
        currentRow: null,

        containerId: null,
        samplesSpeed: null,
        samplesWidth: null,

        constructor: function(params){
            this.containerId = params.containerId;
            this.samplesSpeed = params.samplesSpeed;
            this.samplesWidth = params.samplesWidth;
            this.currentRow = 0;
        },

        /**
         * This method builds the base canvas for the jsCascade
         * @param height - of the canvas in px
         */
        drawCanvas: function(height){
            this.canvasHeight = height;
            var containter = dom.byId(this.containerId);
            var canvas = domConstruct.create("canvas", {id:"jsCascade"}, containter);
            canvas.style.border = "1px solid white";
            canvas.style.background = "black";

            canvas.width = this.samplesWidth;
            canvas.height = height;

            canvas.style.width = "100%";
            canvas.style.height = "100%";
            this.canvas = canvas.getContext("2d");
        },

        /**
         * Draw the spectraldata into the canvas
         * @param spectralData - Array of spectraldata
         */
        processSpectrumData: function(spectralData) {
            if(!this.canvas) return;

            var arrayRange = this.samplesWidth + this.HEADER_LENGTH;
            var middlePositon = this.samplesWidth/2 + this.HEADER_LENGTH;

            //Process header
            var samplesLen = spectralData[4] + spectralData[3] << 8;
            var mainRx = spectralData[6] + spectralData[5] << 8;
            var subRx = spectralData[8] + spectralData[7] << 8;
            var samplingRate = spectralData[12] + spectralData[11] << 8 + spectralData[10] << 16 + spectralData[9] << 24;

            var avg = 0;
            var i = 0;

            for (i = this.HEADER_LENGTH; i < arrayRange; i++) {
                avg += spectralData[i];
            }
            avg = (avg / this.samplesWidth);
            var lo = avg - this.AOI_Upper;
            var hi = avg + this.AOI_Lower;
            var diff = hi - lo;

            var frac = 255 / diff;

            for (i = this.HEADER_LENGTH; i < arrayRange; i++) {
                var val = spectralData[i];

                if (val < lo)
                    val = 0;
                else if (val > hi)
                    val = 255;
                else {
                    val = (val - lo) * frac;
                    val = parseInt(val);
                    val = 255-val;
                }

                this.canvas.fillStyle = "#00"+val.toString(16)+"00";
                if(i == middlePositon){
                    //Middle frequency line
                    this.canvas.fillStyle = "#FF0000";
                }
                this.canvas.fillRect(i - this.HEADER_LENGTH, this.currentRow, 1, 1);
            }

            //Emtpies the canvas to prevent overflow
            this.currentRow++;
            if (this.currentRow >= this.canvasHeight) {
                this.canvas.fillStyle = "rgba(0,0,0,1)";
                this.canvas.fillRect(0, 0, this.samplesWidth, this.canvasHeight);
                this.currentRow = 0;
            }
        },

    });
});