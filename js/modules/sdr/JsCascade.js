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

        containerId: null,
        samplesSpeed: null,
        samplesWidth: null,

        constructor: function(params){
            this.containerId = params.containerId;
            this.samplesSpeed = params.samplesSpeed;
            this.samplesWidth = params.samplesWidth;
        },

        /**
         * This method builds the base canvas for the jsCascade
         * @param height - of the canvas in px
         */
        drawCanvas: function(height){
            this.canvasHeight = height;
            var sdr = dom.byId(this.containerId);
            var containter = domConstruct.create("div", {id:"jsCascade"}, sdr);
            containter.style.lineHeight = "0px";
            containter.style.height = height+"px";
            containter.style.width = "100%";

            for(var i=0; i < height; i++){
                this.createCanvasPart(containter);
            }
            this.container = containter;
        },

        createCanvasPart: function(parentNode){
            var wrapper = domConstruct.create("div", {className:"cascadePart"});
            wrapper.style.height = "1px";
            parentNode.insertBefore(wrapper, parentNode.firstChild)

            var canvPart = domConstruct.create("canvas", {className:"cascadePart"}, wrapper);
            canvPart.style.background = "black";
            canvPart.width = this.samplesWidth;
            canvPart.height = 1;
            canvPart.style.width = "100%";
            return canvPart;
        },

        /**
         * Draw the spectraldata into the canvas
         * @param spectralData - Array of spectraldata
         */
        processSpectrumData: function(spectralData) {
            if(!this.container) return;

            var arrayRange = +this.samplesWidth + +this.HEADER_LENGTH;
            var middlePositon = Math.round(this.samplesWidth/2 + this.HEADER_LENGTH);

            //Process header
            var samplesLen = spectralData[4] + spectralData[3] << 8;
            var mainRx = spectralData[6] + spectralData[5] << 8;
            var subRx = spectralData[8] + spectralData[7] << 8;
            var samplingRate = spectralData[12] + spectralData[11] << 8 + spectralData[10] << 16 + spectralData[9] << 24;

            var avg = 0;
            for (var i = this.HEADER_LENGTH; i < arrayRange; i++) {
                avg += spectralData[i];
            }
            avg = (avg / this.samplesWidth);
            var lo = avg - this.AOI_Upper;
            var hi = avg + this.AOI_Lower;
            var diff = hi - lo;

            var frac = 255 / diff;

            //create new canvas
            var canvas = this.createCanvasPart(this.container);
            canvas = canvas.getContext("2d");

            //Draw on new canvas
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

                canvas.fillStyle = "#00"+val.toString(16)+"00";
                if(i == middlePositon){
                    //Middle frequency line
                    canvas.fillStyle = "#FF0000";
                }
                canvas.fillRect(i - this.HEADER_LENGTH, 0, 1, 1);
            }

            //Delete last item from canvas
            this.container.lastChild.remove();
        },

        calculateSignalStrength: function(spectralData){

        },

    });
});