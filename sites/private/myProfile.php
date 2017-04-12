
<!-- Intro -->
<div class="container">
    <div class="sixteen columns">
        <div id="" class="tagline">
			<h1>Profile: <?php echo $_SESSION['username']?></h1>
			<?php echo buildProfileForm() ?>
			
			<!--
            <form class="borderlessForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
				<div class="formLabelTable"> Username: </div>
				<input class="formInputTable" type="text" name="usrname" value="<?php echo $_SESSION['username']?>">
				<div class="formLabelTable"> Username: </div>
				<input class="formInputTable" type="text" name="usrname" value="<?php echo $_SESSION['username']?>">
                <button type="submit" name="changeUser">Save Changes</button>
            </form>
			-->
			
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
	$form .= addRow("Password", "psw1", "");
	$form .= addRow("Password2", "psw2", "");
	$form .= addRow("Name", "name", $user->name);
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

?>