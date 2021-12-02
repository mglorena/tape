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
sajax_export("SaveServicio", "LoadServicios", "SendJsError");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(28, $rulesIds)) { // ver la pagina servicios
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Servicios';</script>";
    }
    echo "<script>";
    if (!in_array(29, $rulesIds)) // editor o borrar
        echo "var hasUpdate =false;";
    else
        echo "var hasUpdate =true;";
    if (!in_array(29, $rulesIds)) // insertar 
        echo "var hasInsert =false;";
    else
        echo "var hasInsert =true;";
    echo "</script>";
}

function SaveServicio($s, $m, $a, $t) {
    try {
        $servicio = json_decode($s);
        $se = new Servicio();
        if ($se->Save($servicio, $t,$m,$a)) {
            if($se->ReporteSave($m, $a, $t))
                    return true;
            else 
                return false;
	    return true;
        } else {
            return false;
        }
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "servicios.php - SaveServicio", $s);
    }
}

function DeleteServicio($servicioId) {

    $ve = new Servicio();
    $ve->ServicioId = $servicioId;
    $u = new Util();
    if ($ve->Delete()) {
        return true;
    } else
        return false;
}

function LoadServicios($mes, $anio, $type) {

    $servicioSearch = new Servicio();
    $servicios = $servicioSearch->Search($mes, $anio, $type);
    $response = array("1" => $servicios);
    return $response;
}
?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php";
?>
<script>
<?php
sajax_show_javascript();
echo "var tservicioId =" . $tiposervicioId . ";";
?>
</script>
<style>
    .recuadre{
        background-color: #ccc;
    }
</style>
<?php SecurityPage(); ?>


<?php
echo '<script type="text/javascript" src="carga.js?' . Conf::VERSION . '"></script>';
?>
<link type="text/css" rel="stylesheet" href="../css/jquery.tooltip.css" />
<script type="text/javascript" src="../js/jquery.tooltip.min.js"></script>

<div id="content">
    <div id="tblServicios"></div>
</div>
<input type="hidden" id="hdnServicioId" value="0"/>
<?php include "../include/footer.php"; ?>
