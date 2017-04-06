/**
 * Created by kusi on 4/5/17.
 */
//if ("WebSocket" in window) console.log("WebSocket allowed");

var exampleSocket = new WebSocket("ws://127.0.0.1:12346", "WebSDR");

exampleSocket.onopen = function () {
    console.log("WebSocket open...");

    //exampleSocket.send("Hello");
}

exampleSocket.onmessage = function (event) {
    console.log("Server:" + event.data);
}

//console.log(exampleSocket);


