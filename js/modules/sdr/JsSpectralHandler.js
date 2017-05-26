define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom",
], function(declare, domConstruct, dom){
    return declare(null, {
        HEADER_LENGTH: 15,

        /**
         * Area of interest
         */
        AOI_Upper: 10,
        AOI_Lower: 20,

        containerId: null,
        samplesSpeed: null,
        samplesWidth: null,

        spectralArrayLength: null,
        canvasMidPos: null,

        spectalDivisor: 4,
        spectralHeight: 256 / 4,
        spectralView: null,

        constructor: function(params){
            this.containerId = params.containerId;
            this.samplesSpeed = params.samplesSpeed;
            this.samplesWidth = params.samplesWidth;
            this.spectralArrayLength = +this.samplesWidth + +this.HEADER_LENGTH;
            this.canvasMidPos = Math.round(this.samplesWidth/2 + this.HEADER_LENGTH);
        },

        createSpectralView: function(height){
            this.drawSpectralVision();
            this.drawCascade(height)
        },

        drawSpectralVision: function(){
            var sdr = dom.byId(this.containerId);
            var canvas = domConstruct.create("canvas", {id:"jsSpectral"}, sdr);
            canvas.height = this.spectralHeight;
            canvas.width = this.samplesWidth;
            canvas.style.height = this.spectralHeight+"px";
            canvas.style.width = "100%";
            canvas.style.background = "black";
            canvas.style.marginBottom = "-5px";
            this.spectralView = canvas.getContext("2d");
        },

        /**
         * This method builds the base canvas for the jsCascade
         * @param height - of the canvas in px
         */
        drawCascade: function(height){
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

            this.processSpectralHeader(spectralData);
            this.calculateAreaOfInterest(spectralData);

            //waterfall: Create new canvas
            var waterfallCanvas = this.createCanvasPart(this.container);
            waterfallCanvas = waterfallCanvas.getContext("2d");

            //spectralView: Clear canvas
            this.spectralView.fillStyle = "#000000";
            this.spectralView.clearRect(0, 0, this.samplesWidth, this.spectralHeight);

            //spectralView: Prepare to draw
            this.spectralView.strokeStyle = "#ff9900";
            this.spectralView.beginPath();
            var specStart = false;

            //Handle each value individually
            for (var i = this.HEADER_LENGTH; i < this.spectralArrayLength; i++) {
                var val = this.calculateSpectralValue(spectralData[i]);

                //spectralView: Draw from point to point lines
                var height = this.spectralHeight - val/this.spectalDivisor;
                if(!specStart){
                    this.spectralView.moveTo(i - this.HEADER_LENGTH, height);
                    specStart=true;
                } else {
                    this.spectralView.lineTo(i - this.HEADER_LENGTH, height);
                }

                //waterfall: Draw one value
                waterfallCanvas.fillStyle = "#00"+val.toString(16)+"00";
                //Middle frequency line
                if(i == this.canvasMidPos) waterfallCanvas.fillStyle = "#FF0000";
                waterfallCanvas.fillRect(i - this.HEADER_LENGTH, 0, 1, 1);
            }
            //spectralView: Draw
            this.spectralView.stroke();

            //waterfall: Delete last item from canvas
            this.container.lastChild.remove();
        },

        processSpectralHeader: function(spectralArray){
            //Process header
            var samplesLen = spectralArray[4] + spectralArray[3] << 8;
            var mainRx = spectralArray[6] + spectralArray[5] << 8;
            var subRx = spectralArray[8] + spectralArray[7] << 8;
            var samplingRate = spectralArray[12] + spectralArray[11] << 8 + spectralArray[10] << 16 + spectralArray[9] << 24;
        },

        calculateAreaOfInterest: function(spectralArray){
            var avg = 0;
            for (var i = this.HEADER_LENGTH; i < this.spectralArrayLength; i++) {
                avg += spectralArray[i];
            }
            avg = (avg / this.samplesWidth);
            this.calc_AOI_lower = avg - this.AOI_Lower;
            this.calc_AOI_upper = avg + this.AOI_Upper;
            var diff = this.calc_AOI_upper - this.calc_AOI_lower;
            this.calc_AOI_frac = 255 / diff;
        },

        calculateSpectralValue: function(value){
            if (value < this.calc_AOI_lower)
                value = 0;
            else if (value > this.calc_AOI_upper)
                value = 255;
            else {
                value = (value - this.calc_AOI_lower) * this.calc_AOI_frac;
                value = parseInt(value);
                value = 255-value;
            }
            return value;
        }
    });
});