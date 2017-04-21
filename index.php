<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<?PHP
session_start();
include( dirname(__FILE__) . './sites/template/pageSetup.php');
?>

<body class="wrap">
<!-- Primary Page Layout
================================================== -->
<!-- phplogic -->
<?PHP
include( dirname(__FILE__) . './php/common.php');
?>

<!-- Header -->
<?PHP
include( dirname(__FILE__) . './sites/template/header.php');
?>

<!-- Content -->
<?PHP
	buildPageContent();
?>

<!-- Footer -->
<?PHP
include( dirname(__FILE__) . './sites/template/footer.php');
?>
</body>
</html>

