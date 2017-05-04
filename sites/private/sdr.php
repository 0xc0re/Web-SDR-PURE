<!-- Msg Area -->
<div id="showMsg" class="container" style="display: none;">
    <div class="sixteen columns showError"></div>
</div>

<!-- Waterfall -->
<div id="waterfall" class="container" style="display: ;">
    <div class="one columns">&nbsp;</div>
    <div class="fifteen columns">
        <div id="cascadeContainer"></div>
    </div>
    <hr>
</div>

<!-- Waterfall -->
<div class="container" style="display: ;">
    <div class="sixteen columns">
        <button id="button">SEND DATA</button>
    </div>
    <hr>
</div>

<?php
includeScripts();
//handleSdrState(); //TODO Reactivate

function includeScripts(){
    $userLevel = getUserLevel();
    if($userLevel <= 1){
//Insert admin script
    } elseif($userLevel <= 10){
//Insert moderator script
    } elseif($userLevel <= 20){
        echo '<script src="../../js/sites/sdrListener.js"></script>';
    }
}

function handleSdrState(){
//    $_SESSION["sdr"] = true; //In use
//    $_SESSION["sdr"] = false; //Init state

    $userLevel = getUserLevel();
    if($userLevel <= 20){
        if(isset($_POST["moderatorChannel"]) or isset($_POST["adminChannel"])){
            showError("Wrong permissions");
            return;
        }
    }
    if($userLevel <= 10) {
        if(isset($_POST["adminChannel"])){
            showError("Wrong permissions");
            return;
        }
    }

    unset($_SESSION["sdr"]); //TODO Just 4 test reasons
    if(isset($_SESSION["sdr"])){
        //Handle sdr already in use
    } else {
        //new connection
        if(isset($_POST["listenChannel"])){
            handleListenCommand();
        } else if(isset($_POST["moderatorChannel"])) {

        }else if(isset($_POST["adminChannel"])) {

        }
    }
}

function handleListenCommand(){
    //Get server location
    $host = getManagerIp();
    $port = getManagerPort();

    //Message to send
    $message = "listenChannel(".$_POST["listenChannel"].")";
    $result = sendMessageToSocket($host, $port, $message);
    $result = json_decode($result);

    if($result->state == "f"){
        showError($result->message);
    } else {
        setDspPort((string)$result->port);
        $_SESSION["sdr"] = true;
    }
}