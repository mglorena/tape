<?php require('calendario.php') ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Mini Calendar</title>
<link type="text/css" rel="stylesheet" href="table.css" />
<link type="text/css" rel="stylesheet" href="style.css" />
<script type="text/javascript" src="jquery-1.2.3.min.js"></script>
<script type="text/javascript" src="jquery.func.js"></script>
</head>

<body>
<div id="calendarview">
<?php
	$objCalendario = new calendario;
	$objCalendario->mostrarBarra();
	$objCalendario->mostrar();
?>
</div>
</body>
</html>
