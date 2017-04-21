var canvas;
var currentRow = 0;

/**
 * This method builds the base canvas for the jsCascade
 *
 * @param width - of the canvas
 * @param height - of the canvas
 * @param parentNode - DomNode where the canvas should be placed
 */
function drawCanvas(width, height, parentNode){
    domNode = document.create("canvas", {style:"border: 1px solid white; background: black"});
    domNode.id = "jsCascade";
    domNode.style.width = width;
    domNode.style.height = height;
    domNode.placeArea(parentNode)
    this.canvas = domNode.getContext("2d");
}

/**
 * Draw the spectraldata into the canvas
 * @param spectralData - Array of spectraldata
 */
function processSpectrumData(spectralData) {
    if(this.canvas){
        this.canvas = document.getElementById("jsCascade").getContext("2d");
        var id = this.canvas.createImageData(1,1); // only do this once per page
        var d  = id.data;                        // only do this once per page

        var samplesLen = spectralData[4] + spectralData[3]<<8;
        var mainRx = spectralData[6] + spectralData[5]<<8;
        var subRx = spectralData[8] + spectralData[7]<<8;
        var samplingRate = spectralData[12] + spectralData[11]<<8 + spectralData[10]<<16 + spectralData[9]<<24;
        //console.log("Samling rate = " + samplingRate);

        var avg = 0;
        var i = 0;

        for (i = 15;i<(512+15);i++){
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

        var frac = 255/diff;

        for (i = 15;i<(512+15);i++){

            var val = spectralData[i];

            if (val < lo)
                val = 0;
            else if (val > hi)
                val = 255;
            else
            {
                val = (val - lo) * frac;
            }

            this.canvas.fillStyle = "rgba(0," + (255 - val) + ",0,1)";
            this.canvas.fillRect( i - 15, currentRow, 1, 1 );

            /*d[0]   = arr[i];
             d[1]   = arr[i];
             d[2]   = arr[i];
             d[3]   = a;
             this.canvas.putImageData( id, i - 15, currentRow );*/
        }

        //console.log("spectrum drawn");

        currentRow++;
        if (currentRow >= 400)
        {
            this.canvas.fillStyle = "rgba(0,0,0,1)";
            this.canvas.fillRect( 0, 0, 512, 400 );
            currentRow = 0;
        }
    }
}