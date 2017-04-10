<?php
function buildPageContent(){
    if ($_SERVER['QUERY_STRING'] == "") {
        include "./sites/public/intro.php";
    } elseif ($_SERVER['QUERY_STRING'] == "site=socketTest") {
        include "./sites/public/socketTester.php";
    }
}