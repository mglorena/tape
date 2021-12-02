<?php
require_once ('../class/cutil.php');
require_once ('class/cservicios.php');
require_once ('class/ctiposervicio.php');
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
$tiposervicioId = $_GET['s'];
sajax_init();
sajax_export("LoadServicios","SendJsError");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(28, $rulesIds)) { // ver la pagina servicios
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Servicios';</script>";
    }
   
}

function LoadServicios($anio, $type) {

    $servicioSearch = new Servicio();
    $servicios = $servicioSearch->ReporteAnual($anio, $type);
    $tsdata = new TipoServicio();
    $response = array("1" => $servicios,"2"=>$tsdata->GetDataServicio($type));
    return $response;
}
?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php";
?>
<script>
<?php
sajax_show_javascript();
echo "var tservicioId =".$tiposervicioId.";";
?>
</script>
<style>
    .recuadre{
        background-color: #ccc;
    }
</style>
<?php SecurityPage(); ?>


<?php
echo '<script type="text/javascript" src="reporteanual.js?' . Conf::VERSION . '"></script>';
?>
<link type="text/css" rel="stylesheet" href="../css/jquery.tooltip.css" />
<script type="text/javascript" src="../js/jquery.tooltip.min.js"></script>

<div id="content">
    <div id="tblServicios"></div>
</div>
<input type="hidden" id="hdnServicioId" value="0"/>
<?php include "../include/footer.php"; ?>
