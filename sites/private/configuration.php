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
    <div class="two columns">&nbsp;</div>
    <div class="twelve columns">
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

function buildTopic($topic){
    $topicContent = '<h2>'.$topic['label'].'</h2>';
    foreach($topic->children() as $item) {
        $topicContent .= buildConfigRow($item);
    }
    $topicContent .= '<hr>';
    return $topicContent;
}

function buildConfigRow($item){
    $action = getMySite();
    $row = buildFormHead($action, "post");
    $row .= buildRow($item["label"], $item["id"], $item, true);
    return $row;
}

?>