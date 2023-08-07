<?php
require('class/cpersonas.php');
require('class/carticulos.php');
require("../class/csajax.php");
require('class/ccalendario.php');
require_once ('/var/www/html/tape/class/cerrors.php');

function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

$sajax_request_type = "POST";
sajax_init();
sajax_export("LoadCalendar", "SendJsError", "GrabarArticulo", "BorrarArticulo", "PrintMensual", "PrintAnual", "PrintAnualById", "GrabarPersona", "GuardarDesc","GrabarCompesatorios");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(30, $rulesIds)) { // ver la pagina bienes
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Novedades';</script>";
    }
}

function PrintMensual($mes, $anio) {
    try {
        $p = new Persona();
        $personas = $p->PrintMensual($mes, $anio);
        $response = array("1" => $personas);
        return $response;
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - PrintMensual", $per);
    }
}

function GrabarPersona($p) {
    try {
        $persona = json_decode($p);
        $p = new Persona();
        $p->copy($persona);
        return $p->Guardar();
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - GrabarPersona", $p);
    }
}
function GrabarCompesatorios($per) {
    try {
        $persona = json_decode($per);
        $p = new Persona();
        $p->copy($persona);
        return $p->Compesatorios();
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - GrabarPersona", $per);
    }
}
function GuardarDesc($personaId, $obs) {
    try {
        $p = new Persona();
        $p->PersonaId = $personaId;
        $p->Observaciones = $obs;
       // $p->Compensatorio = $cp;
        return $p->GuardarDesc();
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - GuardarDesc", $per);
    }
}

function PrintAnual($anio) {
    try {
        $p = new Persona();
        $personas = $p->PrintAnual($anio);
        $response = array("1" => $personas);
        return $response;
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - PrintAnual", $anio);
    }
}

function PrintAnualById($anio, $personaId) {
    try {
        $p = new Persona();
        $personas = $p->PrintAnualById($anio, $personaId);
        $response = array("1" => $personas);
        return $response;
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - PrintAnualById", $personaId);
    }
}

function GrabarArticulo($p) {
    try {
        $per = json_decode($p);
        $p = new Persona();
        $p->PersonaId = $per->PersonaId;
        $p->ArticuloId = $per->ArticuloId;
        $p->Desde = $per->Desde;
        $p->Hasta = $per->Hasta;
        $p->Fecha = $per->Fecha;
        $p->CantHoras = ($per->CantHoras == null) ? $per->CantHoras = "NULL" : $per->CantHoras;

        if ($p->ArticuloId == "14" || $p->ArticuloId == "4") {
            $d1 = new DateTime($p->Desde);
            $d2 = new DateTime($p->Hasta);
            $interval = $d1->diff($d2);
            $diff = $interval->format('%a');
            $diff1Day = new DateInterval('P1D');
            for ($index = 0; $index < $diff + 1; $index++) {
                $p->Fecha = $d1->format('Y-m-d H:i:s');
                $d1 = $d1->add($diff1Day);
                $p->SaveArticulo();
            }
             // $e = new Errors();
      //  $e->SendErrorMessage(new Exception("depurando errores1"), "personas.php - GrabarPersona", $p);
            return true;
        } else {
             
            return $p->SaveArticulo();
        }
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - GrabarArticulo", $per);
    }
}

function BorrarArticulo($p) {
    try {
        $per = json_decode($p);
        $p = new Persona();
        $p->PersonaId = $per->PersonaId;
        $p->ArticuloId = $per->ArticuloId;
        $p->Desde = $per->Desde;
        $p->Hasta = $per->Hasta;
        $p->Fecha = $per->Fecha;
        $p->CantHoras = ($per->CantHoras == null) ? $per->CantHoras = "NULL" : $per->CantHoras;

        if ($p->ArticuloId == "14" || $p->ArticuloId == "4") {
            $d1 = new DateTime($p->Desde);
            $d2 = new DateTime($p->Hasta);
            $interval = $d1->diff($d2);
            $diff = $interval->format('%a');
            $diff1Day = new DateInterval('P1D');

            for ($index = 0; $index < $diff + 1; $index++) {
                $p->Fecha = $d1->format('Y-m-d H:i:s');
                $d1 = $d1->add($diff1Day);
                $p->BorrarArticulo();
            }
            return true;
        } else {
            return $p->BorrarArticulo();
        }
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "personas.php - BorrarArticulo", $per);
    }
}

function LoadCalendar($personaId, $mes, $anio) {

    $p = new Persona();
    $personas = $p->GetAll();
    $info = "";
    $ocal = new Novedades();
    $cal = "";
    if ($personaId !== 0 && $personaId !== 'null') {
        $p->PersonaId = $personaId;
        $info = $p->GetByPersonaId($anio);
        $cal = $ocal->PrintCalendar($mes, $anio, $personaId);
    }
    $art = new Articulo();
    $articulos = $art->GetAll();






    $response = array("1" => $personas, "2" => $info, "3" => $cal, "4" => $articulos);

    return $response;
}
?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php"; ?>
<link type="text/css" rel="stylesheet" href="css/table.css" />


<script>
<?php
sajax_show_javascript();
?>
</script>
<div id="content">

    <div class="titlePag" style="padding-bottom: 15px;">Calendario de Novedades </div>
    <div id="panel">
     
        <div style="clear:both;"></div>
    </div>
</div>
</div>
<?php
echo '<script type="text/javascript" src="personas.js?' . Conf::VERSION . '"></script>';
echo '<script type="text/javascript" src="js/Printer.js?' . Conf::VERSION . '"></script>';
?>
<?php include "../include/footer.php"; ?>