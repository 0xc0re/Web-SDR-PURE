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
        /*
        if($userLevel <= 10){ //moderator level

        }
        */
        if($userLevel <= 1){ //admin level
            echo(buildMenupoint("Config", "site=config"));
            //echo(buildMenupoint("UserMgmt", "site=usrMgmt"));
        }
        if($userLevel <= 20){ //listener level
            echo(buildMenupoint("Channels", "site=channels"));
            echo(buildMenupoint("Sockettest", "site=socketTest"));
            echo(buildMenupoint("My Profile", "site=profile"));
            echo(buildMenupoint("Logout", "site=logout"));
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

function buildPageContent(){
    if ($_SERVER['QUERY_STRING'] == "") {
        include "./sites/public/intro.php";
    } elseif ($_SERVER['QUERY_STRING'] == "site=socketTest") {
        include "./sites/moderator/socketTester.php";
    } elseif ($_SERVER['QUERY_STRING'] == "site=logout") {
        include "./sites/public/intro.php";
    } elseif ($_SERVER['QUERY_STRING'] == "site=profile") {
        include "./sites/admin/myProfile.php";
    } elseif ($_SERVER['QUERY_STRING'] == "site=config") {
        include "./sites/admin/configuration.php";
    }
}
?>