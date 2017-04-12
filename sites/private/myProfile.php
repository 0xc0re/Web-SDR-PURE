
<!-- Message Area -->
<div id="showMsg" class="container" style="display: none;">
    <div class="sixteen columns" style="text-align: center;">
        <hr>
    </div>
</div>

<?php if($_SESSION['isNew']) : ?>
<div class="container">
    <div class="sixteen columns">
		<div class="tagline">
			<p style="color: red;">Before you can use this site<br>
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
</div>

<?php
function buildProfileForm(){
	$user = getUserNode($_SESSION['username']);
	
	$action = (string) htmlspecialchars($_SERVER["PHP_SELF"]);
	$form = '<form class="borderlessForm" action="'.$action.'" method="post">';
	$form .= addRow("Username", "usrname", $user->username);
	$form .= addPWRow("Password", "psw1", "Your password");
	$form .= addPWRow("Verify Pw", "psw2", "Verify your password");
	$form .= addRow("Name", "name", $user->name);
	$form .= addRow("Surname", "surname", $user->surname);
	$form .= addRow("Address", "address", $user->address);
	$form .= addRow("PLZ", "plz", $user->postalCode);
	$form .= '<button type="submit" name="changeUser">Save Changes</button>';
	$form .= '</form>';
	return $form;
}

function addRow($label, $formId, $value){
	$row = '<div class="formLabelTable"> '.$label.': </div>';
	$row .= '<input class="formInputTable" type="text" name="'.$formId.'" value="'.$value.'">';
	return $row;
}

function addPWRow($label, $formId, $value){
	$row = '<div class="formLabelTable"> '.$label.': </div>';
	$row .= '<input class="formInputTable" type="password" placeholder="'.$value.'" name="'.$formId.'">';
	return $row;
}

?>