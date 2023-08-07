<?php
require_once ('../class/cutil.php');
require_once ('../class/cdump.php');
require_once ('../class/cconf.php');
require_once ('class/creport.php');
require_once ('class/cdatos.php');
require_once ('class/cinfo.php');
require("../class/csajax.php");

require_once ('/var/www/html/tape/class/cerrors.php');
function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}
$sajax_request_type = "POST";
//$sajax_debug_mode = 0;

sajax_init();
sajax_export("LoadEmeralds","SendJsError", "ImprimirDetalle");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(28, $rulesIds)) { // ver la pagina emeralds
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Emeralds';</script>";
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

function ImprimirDetalle($mes, $anio, $int) {
    try {
        if ($mes <= 9)
            $mes = "0" . $mes;

        $internos = explode(",", $int);

        foreach ($internos as $i) {
            if ($i != "") {
                $fileName = $i . $mes . $anio . ".txt";
                $HOST_URL  = "http://". $_SERVER['HTTP_HOST'] ;
                $link .= "<a target='_blank' href='" . $HOST_URL."/". Conf::ROOT . "/emerald/datos/" . $fileName . "'>" . $i . "-Detalles</a><br/>";
            }
        }
        $response = array("1" => utf8_decode($link));
    } catch (Exception $ex) {
        $response = array("1" => $ex->getMessage());
    }
    return $response;
}
function LoadEmeralds($interno,$mes, $anio, $centro, $depto, $filtro) {

    $emeraldSearch = new Info();
    $centros = $emeraldSearch->GetCostos();
    $dptos = $emeraldSearch->GetDepartamentos();
    $emeralds = $emeraldSearch->Search($interno,$mes, $anio, $centro, $depto,$filtro);
    $response = array("1" => $emeralds, "2" => $centros, "3" => $dptos);
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
<style>
    .recuadre{
        background-color: #ccc;
    }
</style>
<?php SecurityPage(); ?>
<?php /* LoadEmeralds(true, true,11,2012,1); */ ?>

<?php
echo '<script type="text/javascript" src="reportetelefonico.js?' . Conf::VERSION . '"></script>';
?>
<link type="text/css" rel="stylesheet" href="../css/jquery.tooltip.css" />
<script type="text/javascript" src="../js/jquery.tooltip.min.js"></script>
<div id="content">

    <div id="opciones"></div>
    <div id="tblEmeralds"></div>


    <div id="fi-form"></div>
  <div id="cost-form"></div>
    
</div>
<?php include "../include/footer.php"; ?>
