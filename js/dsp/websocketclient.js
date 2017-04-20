var exampleSocket = null;

function connect(){
    var port = $('#wsport').val();

    exampleSocket = new WebSocket("ws://127.0.0.1:" + port, "binary");
    exampleSocket.onerror = connectionRefused;
    exampleSocket.onopen = connectionOpened;
}

function disconnect(){
    exampleSocket.onmessage = null;
    exampleSocket = null;
}

function sendMessage(msg){
    if(exampleSocket){
        while(msg.length < 64)
            msg += "\0";
        exampleSocket.send(msg);
    }
}

var asdf = 0;

function readMessage (event) {
    var myReader = new FileReader();
    var arrBuff;
    myReader.onload = function() {
        asdf++;
        arrBuff = this.result;
        var i8Arr = new Uint8Array(arrBuff);

        if (asdf > 5)
            processSpectrumData(i8Arr);

        //var msg = String.fromCharCode.apply(null, i8Arr);
        //if (asdf == 20)
        //    alert(JSON.stringify(i8Arr));
        //console.log("Server response(" + msg.length + "): "/* + msg.substr(0, msg.length - 1)*/);
    };

    //start the reading process.
    myReader.readAsArrayBuffer(event.data);
}

function connectionOpened(){
    exampleSocket.onmessage = readMessage;
    document.getElementById("sndMsg").style.display = "";
    showMsg("Connection established");
}

function connectionRefused(){
    showMsg("Connection refused")
}

var currY = 0;

function processSpectrumData(arr) {
    var ctx = document.getElementById("water").getContext("2d");
    var id = ctx.createImageData(1,1); // only do this once per page
    var d  = id.data;                        // only do this once per page

    var samplesLen = arr[4] + arr[3]<<8;
    var mainRx = arr[6] + arr[5]<<8;
    var subRx = arr[8] + arr[7]<<8;
    var samplingRate = arr[12] + arr[11]<<8 + arr[10]<<16 + arr[9]<<24;
    //console.log("Samling rate = " + samplingRate);

    var avg = 0;
    var i = 0;

    for (i = 15;i<(512+15);i++){
        avg += arr[i];
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

        var val = arr[i];

        if (val < lo)
            val = 0;
        else if (val > hi)
            val = 255;
        else
        {
            val = (val - lo) * frac;
        }

        ctx.fillStyle = "rgba(0," + (255 - val) + ",0,1)";
        ctx.fillRect( i - 15, currY, 1, 1 );

        /*d[0]   = arr[i];
        d[1]   = arr[i];
        d[2]   = arr[i];
        d[3]   = a;
        ctx.putImageData( id, i - 15, currY );*/
    }

    //console.log("spectrum drawn");

    currY++;
    if (currY >= 400)
    {
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect( 0, 0, 512, 400 );
        currY = 0;
    }
}