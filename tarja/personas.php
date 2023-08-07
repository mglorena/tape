<?php  
require_once ('class/cpersonas.php');
require_once ('/var/www/html/tape/class/cerrors.php');
require("../class/csajax.php");
$sajax_request_type = "POST";
sajax_init();
sajax_export("GuardarPersona", "LoadPersonas", "AgregarPersona", "DeletePersona", "SendJsError");
sajax_handle_client_request();

function SecurityPage() {
    try {
        $rulesIds = explode(",", $_SESSION['S_rules']);
        if (!in_array(30, $rulesIds)) { // ver la pagina reservas
            echo "<script>window.location ='" . $_SERVER['SERVER_ADDR'] . "noautorization.php?p=Personal';</script>";
        }
        echo "<script>";
        if (!in_array(30, $rulesIds)) // editor o borrar
            echo "var hasUpdate =false;";
        else
            echo "var hasUpdate =true;";
        if (!in_array(30, $rulesIds)) // insertar
            echo "var hasInsert =false;";
        else
            echo "var hasInsert =true;";
        echo "</script>";
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - SecurityPage", "rulesIds");
    }
}

function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

function GuardarPersona($p) {
    try {

	$persona = json_decode(utf8_encode($p), JSON_UNESCAPED_UNICODE);
        $pe = new Persona();
        $pe->Nombre = utf8_decode($persona['Nombre']);
        $pe->Apellido = utf8_decode($persona['Apellido']);
        $pe->Legajo = $persona['Legajo'];
        $pe->CargoDesc = $persona['CargoDesc'];
        $pe->Categoria = $persona['Categoria'];
        $pe->Domicilio = utf8_decode($persona['Domicilio']);
        $pe->Telefono = $persona['Telefono'];
        $pe->TipoDNI = $persona['TipoDNI'];
        $pe->DNI = $persona['DNI'];
        $pe->FechaIngreso = $persona['FechaIngreso'];
        $pe->PersonaId = $persona['PersonaId'];
        $pe->Activo = ($persona['Activo'] == "on" ? "1" : "0");
        $pe->FechaNac = ($persona['FechaNac'] == "" ? "0000-00-00 00:00:00" : $persona['FechaNac']);
        return $pe->Guardar();
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "cchoferes.php - GuardarPersona", $p);
    }
}

function DeletePersona($pId) {
    try {
        $p = new Persona();
        $p->PersonaId = $pId;
        return $p->Delete();
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - DeletePersona", $pId);
    }
}

function LoadPersonas() {
    $persona = new Persona();
    try {
        $personas = $persona->GetAllPersons();
        $return = array("1" => $personas);
        return $return;
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - LoadPersonas", $persona);
    }
}

function AgregarPersona($p) {
    $persona = json_decode($p);
    try {

        $pe = new Persona();
        $pe->copy($persona);
        $pe->Activo = ($pe->Activo == "on" ? "1" : "0");
        return $pe->AddNew();
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - AgregarPersona", $p);
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

<?php
echo '<script type="text/javascript" src="personas.js?' . Conf::VERSION . '"></script>';
?>
<div id="content">
    <div id="tblPersonas"></div>
</div>
<input type="hidden" id="hdnPersonaId" value="0"/>
<?php include "../include/footer.php"; ?>
