var modal = document.getElementById('modalLogin');

function openLoginFrame(){
    console.log("openLoginFrame");
    modal.style.display='block';
    window.onclick = closeListener;
}

function closeLoginFrame(event){
    console.log("closeLoginFrame");
    modal.style.display = "none";
    window.onclick = null;
}

function closeListener(event) {
    console.log("closeListener");
    if (event.target == modal) {
        closeLoginFrame(event);
    }
}