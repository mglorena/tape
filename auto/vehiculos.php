<?php
require_once ('class/cvehiculos.php');
require_once ('class/ctipovehiculo.php');
require_once ('../class/cdump.php');

require_once ('../class/cconf.php');
require("../class/csajax.php");
$sajax_request_type = "POST";
sajax_init();
sajax_export("SaveVehiculo", "LoadVehiculos", "DeleteVehiculo", "UpdateKm", "SendJsError");
sajax_handle_client_request();
require_once ('/var/www/html/tape/class/cerrors.php');
function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}
function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);

    if (!in_array(16, $rulesIds)) { // ver la pagina vehiculos
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Vehiculos';</script>";
    }
    echo "<script>";
    if (!in_array(17, $rulesIds)) // editor o borrar
        echo "var hasUpdate =false;";
    else
        echo "var hasUpdate =true;";
    if (!in_array(18, $rulesIds)) // insertar 
        echo "var hasInsert =false;";
    else
        echo "var hasInsert =true;";
    echo "var rootDir ='" . Conf::ROOT . "';";
    echo "</script>";
    //echo do_dump($rulesIds);
}

function UpdateKm($vehiculoId, $km, $user) {
    $ve = new Vehiculo();
    try {

        $ve->VehiculoId = $vehiculoId;
        $ve->Kilometraje = $km;
        $ve->UserName = $user;
        return $ve->UpdateKilometraje();
    } catch (Exception $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "vehiculos.php - UpdateKm", $ve);
    }
    return false;
}

function SaveVehiculo($v) {
    $ve = new Vehiculo();

    try {
        $vehiculo = json_decode($v);
        $ve->copy($vehiculo);
        $ve->Active = ($ve->Active == "on" ? "1" : "0");
        return $ve->Save();
    } catch (Exception $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "vehiculos.php - SaveVehiculo", $ve);
    }
    return false;
}

function DeleteVehiculo($vehiculoId) {

    $ve = new Vehiculo();
    $ve->VehiculoId = $vehiculoId;
    return $ve->Delete();
}

function LoadVehiculos() {

    $vehiculoSearch = new Vehiculo();
    $vehiculos = $vehiculoSearch->Search();
    $tve = new TipoVehiculo();


    $return = array("1" => $vehiculos, "2" => $tve->GetAll(), "3" => $tve->GetCombustibles());
    return $return;
}
?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php"; ?>
<script>
<?php
sajax_show_javascript();
?>
</script>
<?php SecurityPage(); ?>
<?php
echo '<script type="text/javascript" src="vehiculos.js?' . Conf::VERSION . '"></script>';
?>
<div id="content">
    <div id="tblVehiculos"></div>
</div>

<?php include "../include/footer.php"; ?>
