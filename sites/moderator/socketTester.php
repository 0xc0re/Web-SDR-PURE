<script src="../../js/websockets/websocketclient.js"></script>
<script src="../../js/jsCascade/jsCascade.js"></script>

<script>
    function sendMessageToSocket(){
        var message = document.getElementById('msgBox');
        sendMessage(message.value)
    }
</script>

<!-- Msg Area -->
<div id="showMsg" class="container" style="display: none;">
    <div class="sixteen columns showError"></div>
</div>

<!-- Connection -->
<div class="container">
    <div class="tagline">
        <h2>Connect to DSP</h2>
    </div>
    <div class="four columns">&nbsp;</div>
    <div class="four columns">
        <button onclick="connect();">Connect</button>
    </div>
    <div class="four columns">
        <button onclick="disconnect();">Disconnect</button>
    </div>
    <hr>
</div>

<!-- Send Messages -->
<div id="sndMsg" class="container" style="display: none;">
    <div class="three columns">
        <label style="margin-top: 8%;">Message to send:</label>
    </div>
    <div class="seven columns">
        <input id="msgBox" type="text" name="msg"><br>
    </div>
    <div class="six columns">
        <button onclick="sendMessageToSocket()">Send message</button>
    </div>
    <hr>
</div>

<!-- Waterfall -->
<div id="waterfall" class="container" style="display: none;">
    <div class="one columns">&nbsp;</div>
    <div class="fifteen columns">
            <canvas id="jsCascade" width="800" height="400" style="border: 1px solid limegreen;background: black">
            </canvas>
    </div>
    <hr>
</div>