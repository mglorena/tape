

<?php
require('class/cproveedores.php');
require("../class/csajax.php");
require_once ('/var/www/html/tape/class/cerrors.php');

function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

$sajax_request_type = "POST";
sajax_init();
sajax_export("LoadProveedores", "SendJsError", "SaveProveedor", "DeleteProveedor", "LoadRubros");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(34, $rulesIds)) { // ver la pagina bienes
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Proveedores';</script>";
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

function DeleteProveedor($prId) {
    try {

        $pr = new Proveedor();
        $pr->ProveedorId = $prId;
        return $pr->Delete();
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "proveedors.php - DeleteProveedor", $prId);
    }
}

function SaveProveedor($r) {
    try {
        $proveedor = json_decode($r);
        $pr = new Proveedor();
        $proveedor->RubrosIds = implode(",", $proveedor->RubrosIds);
        $pr->copy($proveedor);
        return $pr->Guardar();
        /* $e = new Errors();
          $e->SendErrorMessage(new Exception("Guardar2 mail automatico no hay error aun"), "cproveedores.php - guardar", $pr->Guardar()); */
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "proveedors.php - SaveProveedor", $r);
    }
}

function LoadRubros($m) {
    try {
        $pro = new Proveedor();
        $rubros = $pro->RubrosGetAll();
        $response = array("1" => $rubros);
        return $response;
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

function LoadProveedores($provId, $rubId, $nom) {
    try {
        $pro = new Proveedor();
        $pro->ProveedorId = $provId;
        $pro->Rubros = $rubId;
        $pro->RazonSocial = $nom;
        $prv = $pro->Search();
        $response = array("1" => $prv);
        return $response;
    } catch (Exception $ex) {
        echo $ex->getMessage();
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
   
    <div id="panel"></div>
</div>
</div>
<?php
echo '<script type="text/javascript" src="proveedores.js?' . Conf::VERSION . '"></script>';
?>
<?php include "../include/footer.php"; ?>