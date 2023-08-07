<?php
require_once ('class/creservas.php');
require_once ('class/cvehiculos.php');
require_once ('../class/cdump.php');
require_once ('../class/cconf.php');
require("../class/csajax.php");
require_once ('/var/www/html/tape/class/cerrors.php');
function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

$sajax_request_type = "POST";
//$sajax_debug_mode = 0;

sajax_init();
sajax_export("LoadReservas","SendJsError");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(13, $rulesIds)) { // ver la pagina reservas
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Reservas';</script>";
    }
}
function LoadReservas($desde,$hasta,$veId) {

    $reservaSearch = new Reserva();
    $ve = new Vehiculo();
    $reservas = $reservaSearch->ReporteVehiculoDisp($desde,$hasta,$veId);
    $response = array("1" => $reservas, "2" => $ve->GetAllWithTipo());
    return $response;
}
?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php";
?>
<script>
<?php
sajax_show_javascript();
?>
</script>
<?php SecurityPage(); ?>

<?php
echo '<script type="text/javascript" src="reservasrepv2.js?' . Conf::VERSION . '"></script>';
?>
<div id="content">
    <div id="tblReservas"></div>
</div>
<?php include "../include/footer.php"; ?>
