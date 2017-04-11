<nav id="main-nav" class="two thirds column omega">
    <ul id="main-nav-menu" class="nav-menu">
		<?php drawNavigation(); ?>
    </ul>
</nav>

<?php
function drawNavigation(){
	//Public area
	echo(buildMenupoint("Home", ""));
	
	//Restricted area
	if(isUserLoggedIn()){
		$userLevel = getUserLevel();
		if($userLevel <= 20){ //listener level
			echo(buildMenupoint("Sockettest", "site=socketTest"));
			echo(buildMenupoint("My Profile", "site=profile"));
			echo(buildMenupoint("Logout", "site=logout"));
		}
		if($userLevel <= 10){ //moderator level
			echo(buildMenupoint("MODERATOR", "site=moderator"));
		}
		if($userLevel <= 1){ //admin level
			echo(buildMenupoint("ADMIN", "site=listener"));
			echo(buildMenupoint("UserMgmt", "site=usrMgmt"));
		}
	}
}

function buildMenupoint($label, $siteLocation){
	$response = '<li id="menu-item-1" class="'.setCurrent($siteLocation).'">';
	$response .= '<a href="index.php?'.$siteLocation.'">'.$label.'</a>';
	$response .= '</li>';
	return $response;
}

function setCurrent($siteLocation){
	if($_SERVER['QUERY_STRING'] == $siteLocation){
		return "current";
	} else {
		return "";
	}
}
?>