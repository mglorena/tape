

<?php
require('class/cpersonas.php');
require("../class/csajax.php");
require_once ('/var/www/html/tape/class/cerrors.php');

function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

$sajax_request_type = "POST";
sajax_init();
sajax_export("LoadLicencias", "SendJsError", "PrintAnual", "Actualizar", "Guardar");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(30, $rulesIds)) { // ver la pagina bienes
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Personas';</script>";
    }
    echo "<script>";
    if (!in_array(30, $rulesIds)) { // editor o borrar
        echo "var hasUpdate =false;";
    } else {
        echo "var hasUpdate =true;";
    }
    if (!in_array(30, $rulesIds)) { // insertar 
        echo "var hasInsert =false;";
    } else {
        echo "var hasInsert =true;";
    }
    echo "</script>";
}

function LoadLicencias($anio) {
    try {
        $p = new Persona();
        $lic = $p->GetLicencias($anio);
        $response = array("1" => $lic);
        return $response;
    } catch (Exception $ex) {
        $errorS = new Errors();
        return $errorS->SendErrorMessage($ex, "LoadLicencias - licencia.php", $anio);
    }
}

function PrintAnual($anio) {
    try {
        $p = new Persona();
        $p->PrintAnual($anio);
        $lic = $p->GetLicencias($anio);
        $response = array("1" => $lic);
        return $response;
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "licencia.php - PrintAnual", $anio);
    }
}

function Actualizar($anio) {
    try {
        $p = new Persona();
        $lic = $p->ActualizarLic($anio);
        $response = array("1" => $lic);
        return $response;
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "licencia.php - PrintAnual", $anio);
    }
}

function Guardar($lic) {
    try {
        $licencias = json_decode($lic);
        $p = new Persona();
        if ($p->SaveLicencias($licencias)) {
            return true;
        } else {
            return false;
        }
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "licencia.php - Guardar", $lic);
    }
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
<div id="content">

    <div id="editor-grid"></div>
</div>
</div>
<?php
echo '<script type="text/javascript" src="licencia.js?' . Conf::VERSION . '"></script>';
?>
<?php include "../include/footer.php"; ?>