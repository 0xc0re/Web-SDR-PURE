<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<?PHP
include "./sites/template/pageSetup.php";
?>

<body class="wrap">
<!-- Primary Page Layout
================================================== -->
<!-- Header -->
<?PHP
include "./sites/template/header.php";
?>

<!-- Content -->
<?PHP
    if ($_SERVER['QUERY_STRING'] == "") {
        include "./sites/public/intro.php";
    } elseif ($_SERVER['QUERY_STRING'] == "site=socketTest") {
        include "./sites/public/socketTester.php";
    }
?>

<!-- Footer -->
<?PHP
include "./sites/template/footer.php";
?>
</body>
</html>

