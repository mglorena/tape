<?php
require_once ('../class/cutil.php');
require_once ('class/cservicios.php');
require_once ('class/ctiposervicio.php');
require_once ('../class/cdump.php');
require_once ('../class/cconf.php');
require("../class/csajax.php");
$sajax_request_type = "POST";
//$sajax_debug_mode = 0;
require_once ('/var/www/html/tape/class/cerrors.php');
function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}
sajax_init();
sajax_export("LoadServicios","SendJsError");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(28, $rulesIds)) { // ver la pagina servicios
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Servicios';</script>";
    }
    
}


function LoadServicios($anio) {

    $servicioSearch = new Servicio();
    $luz = $servicioSearch->Grafico($anio, 2);
    $gas = $servicioSearch->Grafico($anio, 3);
    $agua = $servicioSearch->Grafico($anio, 1);
    $tsdata = new TipoServicio();
    $response = array("1" => $luz,"2"=>$agua,"3"=>$gas,"4"=>$tsdata->GetDataServicio(1),"5"=>$tsdata->GetDataServicio(2),"6"=>$tsdata->GetDataServicio(3));
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

<style>

        .x-panel {
            margin: 20px;
        }
        h1 {
            font-size: 18px;
            margin: 10px;
        }
        body {
          padding: 30px;
        }
    </style>
<?php
echo '<script type="text/javascript" src="graficos.js?' . Conf::VERSION . '"></script>';
?>
<link type="text/css" rel="stylesheet" href="../css/jquery.tooltip.css" />
<script type="text/javascript" src="../js/jquery.tooltip.min.js"></script>

<div id="content">
     <div style='float:left;border:solid 0px black' id="tblServicios"></div>
</div>

<?php include "../include/footer.php"; ?>
