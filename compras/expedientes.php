

<?php
require('class/cexpedientes.php');
require("../class/csajax.php");
require_once ('/var/www/html/tape/class/cerrors.php');

function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

$sajax_request_type = "POST";
sajax_init();
sajax_export("LoadExpedientees", "SendJsError", "SaveExpediente", "DeleteExpediente", "LoadRubros");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(34, $rulesIds)) { // ver la pagina bienes
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Expedientees';</script>";
    }
    echo "<script>";
    if (!in_array(34, $rulesIds)) { // editor o borrar
        echo "var hasUpdate =false;";
    } else {
        echo "var hasUpdate =true;";
    }
    if (!in_array(34, $rulesIds)) { // insertar 
        echo "var hasInsert =false;";
    } else {
        echo "var hasInsert =true;";
    }
    echo "</script>";
}
/*
function DeleteExpediente($prId) {
    try {

        $pr = new Expediente();
        $pr->ExpedienteId = $prId;
        return $pr->Delete();
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "expedientes.php - DeleteExpediente", $prId);
    }
}

function SaveExpediente($r) {
    try {
        $expediente = json_decode($r);
        $pr = new Expediente();
        $expediente->RubrosIds = implode(",", $expediente->RubrosIds);
        $pr->copy($expediente);
        return $pr->Guardar();
      
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "expedientes.php - SaveExpediente", $r);
    }
}

function LoadRubros($m) {
    try {
        $pro = new Expediente();
        $rubros = $pro->RubrosGetAll();
        $response = array("1" => $rubros);
        return $response;
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

function LoadExpedientees($provId, $rubId, $nom) {
    try {
        $pro = new Expediente();
        $pro->ExpedienteId = $provId;
        $pro->Rubros = $rubId;
        $pro->RazonSocial = $nom;
        $prv = $pro->Search();
        $response = array("1" => $prv);
        return $response;
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}*/
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
   
    <div id="panel"></div>
</div>
</div>
<?php
echo '<script type="text/javascript" src="expedientes.js?' . Conf::VERSION . '"></script>';
?>
<?php include "../include/footer.php"; ?>