<script src="../../js/dsp/websocketclient.js"></script>

<!-- Intro -->
<div class="container">
    <div class="sixteen columns">
        <div id="" class="tagline">
            <p> Test the Websocket here
            </p>
        </div>
    </div>
    <hr>
</div>

<div id="showMsg" class="container" style="display: none;">
    <div class="sixteen columns" style="text-align: center;">
        <hr>
    </div>
</div>

<div class="container">
    <div class="four columns">&nbsp;</div>
    <div class="eight columns">
        <button onclick="startWebsocket();">Start Websocket</button>
    </div>
    <div class="four columns">&nbsp;</div>
    <hr>
</div>

<div id="sndMsg" class="container" style="display: none;">
    <div class="two columns">
        Message to send:
    </div>
    <div class="five columns">
        <form action="">
            <input id="msgBox" type="text" name="msg"><br>
        </form>
    </div>
    <div class="eight columns">
        <button onclick="
        var message = document.getElementById('msgBox');
        sendMessage(message.value);
        ">Send message</button>
    </div>
    <hr>
</div>
</div>