<?php
require_once ('../class/cutil.php');
require_once ('class/choraex.php');
require_once ('class/cdependencias.php');
require_once ('class/cchoferes.php');
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
sajax_init();
sajax_export("LoadHoraEx","SendJsError");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(13, $rulesIds)) { // ver la pagina horaex
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=HoraEx';</script>";
    }
    echo "<script>";
    if (!in_array(14, $rulesIds)) // editor o borrar
        echo "var hasUpdate =false;";
    else
        echo "var hasUpdate =true;";
    if (!in_array(15, $rulesIds)) // insertar 
        echo "var hasInsert =false;";
    else
        echo "var hasInsert =true;";
    echo "</script>";
}



function LoadHoraEx($desde,$hasta,$mes,$anio,$choferId,$dep) {

    $horaexSearch = new HoraEx();
    $deps = new Dependencias();
    $chs = new Chofer();
    $ve = new Vehiculo();
    //if(isset($dia)) $dia=0;
    if(!isset($choferId)) $choferId=0;
    if(!isset($dep)) $dep=0;
    $horaex = $horaexSearch->SearchReporte($desde,$hasta,$mes,$anio, $choferId, $dep);
    $response = array("1" => $horaex, "2" => $deps->GetAll(), "3" => $chs->GetAll(),"4"=>$ve->GetAll());
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
<?php /* LoadHoraEx(true, true,11,2012,1); */ ?>

<?php
echo '<script type="text/javascript" src="horaexrep.js?' . Conf::VERSION . '"></script>';
?>

<div id="content">
    <div id="tblHoraEx"></div>
</div>
<input type="hidden" id="hdnHoraExId" value="0"/>
<input type="hidden" id="hdnChoferesIds" value=""/>
<?php include "../include/footer.php"; ?>
