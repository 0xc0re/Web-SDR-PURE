require([
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!",
], function (dom, on) {
    modal = null;

    initLoginLogic();

    function initLoginLogic(){
        setButtonLogic("loginButton", "click", openLoginFrame);
        setButtonLogic("closeButton", "click", closeLoginFrame);
        setButtonLogic("cancelButton", "click", openLoginFrame);
    }

    function setButtonLogic(id, event, method){
        var button = dom.byId(id);
        if(button){
            on(button, event, function(e){
                method();
            });
        }
    }

    function getModalFrame(){
        this.modal = document.getElementById('modalLogin');
    }

    function openLoginFrame(){
        if(!this.modal) getModalFrame();
        this.modal.style.display='block';
        window.onclick = closeListener;
    }

    function closeLoginFrame(event){
        this.modal.style.display = "none";
        window.onclick = null;
    }

    function closeListener(event) {
        if (event.target == this.modal) {
            closeLoginFrame(event);
        }
    }
});
