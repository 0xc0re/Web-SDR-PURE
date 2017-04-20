<!-- Message Area -->
<?php if(isset($_SESSION['ERROR_MESSAGE']) && empty($_SESSION['ERROR_MESSAGE'])) : ?>
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

<!-- Intro -->
<div class="container">
    <div class="sixteen columns">
        <div id="" class="tagline">
			<h1>Server Configuration</h1>
        </div>
    </div>
    <hr>
</div>

<div class="container">
    <div class="four">
        <div id="" class="tagline">
            <?php echo buildConfigurationForm() ?>
        </div>
    </div>
    <hr>
</div>




<?php
function buildConfigurationForm(){
    $confRoot = getConfig();

    $content = '<form class="borderlessForm" action="" method="post">';

    foreach($confRoot->children() as $topic) {
        $content .= buildTopic($topic);
    }

    $content .= '<button type=\"submit\" name=\"changeUser\">Save Changes</button>';
    $content .= '</form>';

    //Add Save button
    return $content;
}

/*
<topic id="pureSettings" label="PURE Manager Settings">
		<item id="purePort" label="Port"></item>
		<item id="pureIP" label="IP"></item>
	</topic>
*/

function buildTopic($topic){
    $topicContent = '<div class="container">';
    $topicContent .= '<div class="sixteen columns">';
    $topicContent .= '<div id="" class="tagline">';
    $topicContent .= '<h3>'.$topic['label'].'</h3>';
    foreach($topic->children() as $item) {
        $topicContent .= buildConfigRow($item);
    }
    $topicContent .= '</div>';
    $topicContent .= '</div>';
    $topicContent .= '<hr>';
    $topicContent .= '</div>';

    return $topicContent;
}

function buildConfigRow($item){

}

?>