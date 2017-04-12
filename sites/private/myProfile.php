
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
	$action = (string) htmlspecialchars($_SERVER["PHP_SELF"]);
	$form = '<form class="borderlessForm" action="'.$action.'" method="post">';
	$form .= addRow("Username", "usrname", $_SESSION['username']);
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