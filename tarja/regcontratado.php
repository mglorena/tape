
<?php
require("/var/www/html/tape/class/csajax.php");
require_once ('/var/www/html/tape/class/cerrors.php');

function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

$sajax_request_type = "POST";
sajax_init();
sajax_export("SendJsError", "Save");
sajax_handle_client_request();

function Save($person) {
    try {
        $deps = json_decode($person);
        $p = new Persona();
        $p->Guardar();
        return true;
    } catch (Exception $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "regcontratado.php - Save", $person);
    }
}

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(35, $rulesIds)) { // ver la pagina bienes
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Organizaciones';</script>";
    }
}

?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php"; ?>
<script type="text/javascript" src="js/regcontratado.js"></script>
<script>
<?php
sajax_show_javascript();
?>
</script>
<div id="content">
    <table cellpadding="0" cellspacing='0' width="100%">
        <tr>
            <td style="padding:30px;font-size:12px; font-weight: bold;" align="center">
                Planilla de Registro de Datos Personales
            </td>
            
        </tr>
        <tr>
            <td>
                <div style="float:left;padding:5px;">Apellido(15):</div>
                <div style="float:lett"><input type="text" value="" maxlength="15" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                <div style="float:left;padding:5px;">Nombre(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Tipo Documento*:</div>
                   <div style="float:left;padding:5px;">DNI(<input type="text" value=""  maxlength="1" style="width:10px;border:none;border-bottom: 1px solid black;background:transparent;"/>)</div>
                   <div style="float:left;padding:5px;">/LE(<input type="text" value=""  maxlength="1" style="width:10px;border:none;border-bottom: 1px solid black;background:transparent;"/>)</div>
                   <div style="float:left;padding:5px;">/LC(<input type="text" value=""  maxlength="1" style="width:10px;border:none;border-bottom: 1px solid black;background:transparent;"/>)</div>
                   <div style="float:left;padding:5px;">/CI(<input type="text" value=""  maxlength="1" style="width:10px;border:none;border-bottom: 1px solid black;background:transparent;"/>)</div>
                   <div style="float:left;padding:5px;">/DNI EXT(<input type="text" value=""  maxlength="1" style="width:10px;border:none;border-bottom: 1px solid black;background:transparent;"/>)</div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Numero de Documento(17):</div>
                <div style="float:lett"><input type="text" value="" maxlength="17" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Provincia del Documento(2)*:</div>
                   <div style="float:left;padding:5px;">17-Salta(<input type="text" value=""  maxlength="2" style="width:10px;border:none;border-bottom: 1px solid black;background:transparent;"/>)</div>
                   <div style="float:left;padding:5px;">/10-Jujuy(<input type="text" value=""  maxlength="2" style="width:10px;border:none;border-bottom: 1px solid black;background:transparent;"/>)</div>
                   <div style="float:left;padding:5px;">/OTRO:<input type="text" value=""  maxlength="2" style="width:10px;border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                <div style="float:left;padding:5px;">Nacionalidad(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Fecha de Nacimiento(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Sexo(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Estado Civil:(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Domicilio-Calle(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Nro(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Localidad(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Codigo Postal(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
                   <div style="float:left;padding:5px;">Fecha Ingreso(16):</div>
                <div style="float:lett"><input type="text" value="" maxlength="16" style="border:none;border-bottom: 1px solid black;background:transparent;"/></div>
                <div style="clear:both"></div>
            </td>
        </tr>
    </table>
</div>

<?php include "../include/footer.php"; ?>
