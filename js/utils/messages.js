/*
If you want to use this method, make sure this HTML-Strct is available.
//HMTL
<div id="showMsg" class="container" style="display: none;">
    <div class="sixteen columns showError"></div>
</div>
*/

function showMsg(msg){
    var msgContainer = document.getElementById("showMsg");
    msgContainer.style.display = "";
    var msgArea = msgContainer.childNodes[1];
    msgArea.innerHTML = msg;
}