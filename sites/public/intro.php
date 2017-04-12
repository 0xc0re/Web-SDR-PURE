<!-- Welcome intro -->
<?PHP
include "./customContent/content/welcome.php";
?>

<!-- Testzone -->
<div class="container">
    <div class="four columns">&nbsp;</div>
    <div class="eight columns">
        <?php
            echo "User : <br>";
            $node = getUserNode("test");
            echo $node->name;
        ?>
    </div>
    <div class="four columns">&nbsp;</div>
    <hr>
</div>

<!-- Modal Login -->
<div class="container">
    <div class="four columns">&nbsp;</div>
    <div class="eight columns">

        <?php if(isUserLoggedIn()) : ?>
            <form style="border:none;" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
                <button style="background-color: #8a1f11;" type="submit" name="logout">Logout</button>
            </form>
        <?php else : ?>
            <!-- Button to open the modal login form -->
            <button onclick="openLoginFrame();">Login</button>
            <!-- The Modal -->
            <div id="modalLogin" class="modal">
                <!-- Modal Content -->
                <form class="modal-content animate" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
                    <div class="imgcontainer">
                        <span onclick="closeLoginFrame();" class="closeModal" title="Close Modal">&times;</span>
                        <img src="./images/login/avatar.png" alt="Avatar" class="avatar">
                    </div>

                    <div class="modalContainer">
                        <label><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required>

                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required>

                        <button type="submit" name="login">Login</button>
    <!--                    <input type="checkbox" checked="checked"> Remember me-->
                    </div>

                    <div class="modalContainer" style="background-color:#f1f1f1">
                        <button type="button" onclick="closeLoginFrame();" class="cancelbtn">Cancel</button>
    <!--                    <span class="psw">Forgot <a href="#">password?</a></span>-->
                    </div>
                </form>
            </div>
        <?php endif; ?>
    </div>
    <div class="four columns">&nbsp;</div>
</div>