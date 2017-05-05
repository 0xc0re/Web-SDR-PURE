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
        if($userLevel <= 20){ //private level
            echo(buildMenupoint("Channels", "site=channels"));
            echo(buildMenupoint("SDR", "site=sdr"));
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
        include( dirname(__FILE__) . "/../../public/intro.php");
    } elseif ($_SERVER['QUERY_STRING'] == "site=logout") {
        include( dirname(__FILE__) . "/../../public/intro.php");
    } elseif ($_SERVER['QUERY_STRING'] == "site=profile") {
        include(dirname(__FILE__) . "/../../private/myProfile.php");
    } elseif ($_SERVER['QUERY_STRING'] == "site=config") {
        include( dirname(__FILE__) . "/../../admin/configuration.php");
    } elseif ($_SERVER['QUERY_STRING'] == "site=sdr") {
        include(dirname(__FILE__) . "/../../private/sdr.php");
    } elseif ($_SERVER['QUERY_STRING'] == "site=channels") {
        include( dirname(__FILE__) . "/../../private/channels.php");
    }
}
?>