<?php
$stateSites = [
    "NoAccess" => "/../../public/noAccess.php",
    "NotFound" => "/../../public/notFound.php",
];

$publicSites = [
    "Home" => "/../../public/intro.php",
];

$privateSites = [
    "Channels" => "/../../private/channels.php",
    "SDR" => "/../../private/sdr.php",
    "My Profile" => "/../../private/myProfile.php",
    "Logout" => "/../../public/intro.php",
];

$adminSite = [
    "Config" => "/../../admin/configuration.php",
];

$siteIncluded = false;

function drawNavigation(){
    global $adminSite, $privateSites ,$publicSites;

    //Build public menupoints
    $keys = array_keys($publicSites);
    foreach($keys as $key){
        echo(buildMenupoint($key));
    }

	//Restricted area
	if(isUserLoggedIn()){
		$userLevel = getUserLevel();
        if($userLevel <= 1){ //admin level
            $keys = array_keys($adminSite);
            foreach($keys as $key){
                echo(buildMenupoint($key));
            }
        }
        if($userLevel <= 20){ //private level
            $keys = array_keys($privateSites);
            foreach($keys as $key){
                echo(buildMenupoint($key));
            }
        }
	}
}

function buildMenupoint($label){
    $siteLocation = "site=".$label;
	$response = '<li id="menu-item-1" class="'.setCurrent($label).'">';
	$response .= '<a href="index.php?'.$siteLocation.'">'.$label.'</a>';
	$response .= '</li>';
	return $response;
}

function setCurrent($siteName){
    parse_str($_SERVER['QUERY_STRING']);
    if(isset($site)){
        if($siteName == $site) return "current";
    } else {
        if($siteName == "Home") return "current";
    }
    return "";
}

function buildPageContent(){
    global $siteIncluded, $stateSites, $publicSites, $privateSites, $adminSite;
    $siteIncluded = false;

    parse_str($_SERVER['QUERY_STRING']);
    if(isset($site)){
        if(isset($publicSites[$site])) includeSite($publicSites[$site]);
        if(isUserLoggedIn()){
            $userLevel = getUserLevel();
            if(isset($privateSites[$site])){
                if($userLevel <= 20){
                    includeSite($privateSites[$site]);
                } else {
                    includeSite($stateSites["NoAccess"]);
                }
            }
            if(isset($adminSite[$site])){
                if($userLevel <= 1){
                    includeSite($adminSite[$site]);
                } else {
                    includeSite($stateSites["NoAccess"]);
                }
            }
        }
    } else {
        includeSite($publicSites["Home"]);
    }
    includeSite($stateSites["NotFound"]);
}

function includeSite($fileLocation){
    global $siteIncluded;
    if(!$siteIncluded){
        include( dirname(__FILE__) . $fileLocation);
        $siteIncluded = true;
    }
}
?>

<nav id="main-nav" class="two thirds column omega">
    <ul id="main-nav-menu" class="nav-menu">
        <?php drawNavigation(); ?>
    </ul>
</nav>
