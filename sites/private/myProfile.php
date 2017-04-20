
<!-- Message Area -->
<?php if(!isset($_SESSION['ERROR_MESSAGE'])) : ?>
    <div class="container">
        <div class="sixteen columns">
            <div class="tagline">
                Profile changed
            </div>
            <hr>
        </div>
    </div>
<? else: ?>
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
    <div class="sixteen columns">
        <div id="" class="tagline">
			<h1>Profile: <?php echo $_SESSION['username']?></h1>
			<?php echo buildProfileForm() ?>
        </div>
    </div>
    <hr>
</div>

<?php
function buildProfileForm(){
	$user = getUserNode($_SESSION['username']);
	$server = (string) htmlspecialchars($_SERVER["PHP_SELF"]);
	$location = (string) htmlspecialchars($_SERVER["QUERY_STRING"]);
	$action = $server ."?". $location;
	$form = '<form class="borderlessForm" action="'.$action.'" method="post">';
	$form .= addRow("Username", "usrname", $user->username, true);
	$form .= addPWRow("Password", "psw1", "Your password");
	$form .= addPWRow("Verify Pw", "psw2", "Verify your password");
	$form .= addRow("Email", "email", $user->email, true);
	$form .= addRow("Name", "name", $user->name, false);
	$form .= addRow("Surname", "surname", $user->surname, false);
	$form .= addRow("Address", "address", $user->address, false);
	$form .= addRow("PLZ", "plz", $user->postalCode, false);
	$form .= '<button type="submit" name="changeUser">Save Changes</button>';
	$form .= '</form>';
	return $form;
}

function addRow($label, $formId, $value, $required){
	$row = '<div class="formLabelTable"> '.$label.': </div>';
	//$row .= '<input class="formInputTable" type="text" name="'.$formId.'" value="'.$value.'">';
	$row .= '<input class="formInputTable" type="text" name="'.$formId.'" value="'.$value.'" ';
	if($required) $row .= "required";
	$row .= '>';
	return $row;
}

function addPWRow($label, $formId, $value){
	$row = '<div class="formLabelTable"> '.$label.': </div>';
	$row .= '<input class="formInputTable" type="password" placeholder="'.$value.'" name="'.$formId.'"required>';
	return $row;
}

?>