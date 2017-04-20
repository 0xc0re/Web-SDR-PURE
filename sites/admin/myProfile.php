<!-- Message Area -->
<?php if(!isset($_SESSION['ERROR_MESSAGE']) && !empty($_SESSION['ERROR_MESSAGE'])) : ?>
    <div class="container">
        <div class="sixteen columns">
            <div class="tagline">
                Profile changed
            </div>
            <hr>
        </div>
    </div>
<? else : ?>
    <div class="container">
        <div class="sixteen columns">
            <div class="tagline">
                <p class="errorMessage">
                    <?php
                        echo $_SESSION['ERROR_MESSAGE'];
                        unset($_SESSION['ERROR_MESSAGE']);
                    ?>
                </p>
            </div>
            <hr>
        </div>
    </div>
<?php endif; ?>

<?php if($_SESSION['isNew']) : ?>
<div class="container">
    <div class="sixteen columns">
		<div class="tagline">
			<p class="errorMessage">Before you can use this site<br>
			please set your own password.
			</p>
		</div>
		<hr>
	</div>
</div>
<?php endif; ?>

<!-- Intro -->
<div class="container">
    <div class="two columns">&nbsp;</div>
    <div class="twelve columns">
        <div id="" class="tagline">
			<h1>Profile: <?php echo $_SESSION['username']?></h1>
        </div>
        <?php echo buildProfileForm() ?>
    </div>
    <hr>
</div>

<?php
function buildProfileForm(){
	$user = getUserNode($_SESSION['username']);
	$action = getMySite();
	$form = buildFormHead($action, "post");
	$form .= buildRow("Username", "usrname", $user->username, true);
	$form .= buildPWRow("Password", "psw1", "Your password");
	$form .= buildPWRow("Verify Pw", "psw2", "Verify your password");
	$form .= buildRow("Email", "email", $user->email, true);
	$form .= buildRow("Name", "name", $user->name, false);
	$form .= buildRow("Surname", "surname", $user->surname, false);
	$form .= buildRow("Address", "address", $user->address, false);
	$form .= buildRow("PLZ", "plz", $user->postalCode, false);
	$form .= buildSubmitButton("changeUser", "Save Changes");
	$form .= buildEndTag();
	return $form;
}

?>