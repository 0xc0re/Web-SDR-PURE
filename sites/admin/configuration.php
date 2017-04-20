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
    <div class="two columns">&nbsp;</div>
    <div class="twelve columns">
        <div id="" class="tagline">
            <h1>Server Configuration</h1>
        </div>
        <?php echo buildConfigurationForm() ?>
    </div>
    <hr>
</div>


<?php
function buildConfigurationForm(){
    $confRoot = getConfig();
    $action = getMySite();
    $content = buildFormHead($action, "post");
    foreach($confRoot->children() as $topic) {
        $content .= buildTopic($topic);
    }
    $content .= '<button type=\"submit\" name=\"changeUser\">Save Changes</button>';
    $content .= '</form>';

    return $content;
}

function buildTopic($topic){
    $topicContent = buildH3Form($topic['label']);
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