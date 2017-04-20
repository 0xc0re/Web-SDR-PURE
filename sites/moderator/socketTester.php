<script src="../../js/dsp/websocketclient.js"></script>

<!-- Msg Area -->
<div id="showMsg" class="container" style="display: none;">
    <div class="sixteen columns" style="text-align: center;">
        <hr>
    </div>
</div>

<!-- Connection -->
<div class="container">
    <div class="tagline">
        <h2>Connect to DSP</h2>
    </div>
    <div class="five columns">&nbsp;</div>
    <div class="one columns">
        <label style="margin-top: 45%;">Port:</label>
    </div>
    <div class="two columns">
        <input id="wsport" type="text" name="msg">
    </div>
    <div class="two columns">
        <button onclick="connect();">Connect</button>
    </div>
    <div class="two columns">
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
        <form>
            <input id="msgBox" type="text" name="msg"><br>
        </form>
    </div>
    <div class="six columns">
        <button onclick="
        var message = document.getElementById('msgBox');
        sendMessage(message.value);
        ">Send message</button>
    </div>
    <hr>
</div>

<!-- Waterfall -->
<div id="waterfall" class="container" style="display: none;">
    <div class="one columns">&nbsp;</div>
    <div class="fifteen columns">
            <canvas id="water" width="800" height="400" style="border: 1px solid limegreen;background: black">
            </canvas>
    </div>
    <hr>
</div>