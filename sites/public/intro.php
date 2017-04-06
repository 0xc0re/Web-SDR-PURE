<!-- Welcome intro -->
<?PHP
include "./customContent/content/welcome.php";
?>

<!-- Modal Login -->
<div class="container">
    <div class="four columns">&nbsp;</div>
    <div class="eight columns">
        <!-- Button to open the modal login form -->
        <button onclick="openLoginFrame();">Login</button>
        <!-- The Modal -->
        <div id="modalLogin" class="modal">

            <!-- Modal Content -->
            <form class="modal-content animate" action="">
                <div class="imgcontainer">
                    <span onclick="closeLoginFrame();" class="closeModal" title="Close Modal">&times;</span>
                    <img src="./images/login/avatar.png" alt="Avatar" class="avatar">
                </div>

                <div class="modalContainer">
                    <label><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required>

                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required>

                    <button type="submit">Login</button>
                    <input type="checkbox" checked="checked"> Remember me
                </div>

                <div class="modalContainer" style="background-color:#f1f1f1">
                    <button type="button" onclick="closeLoginFrame();" class="cancelbtn">Cancel</button>
                    <span class="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>
        </div>
    </div>
    <div class="four columns">&nbsp;</div>
</div>