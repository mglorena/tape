<?php
require('class/cpersonas.php');
require('class/cjornada.php');
require("../class/csajax.php");
require_once ('/var/www/html/tape/class/cerrors.php');

function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

$sajax_request_type = "POST";
sajax_init();
sajax_export("LoadMes", "SendJsError");
sajax_handle_client_request();
$personaId = 25; //$_SESSION['s_personaId'];

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(35, $rulesIds)) { // ver la pagina bienes
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Novedades';</script>";
    }
}

/*
  function SendJsError($ex, $pageName, $object)
  {
  $e = new Errors();
  $e->SendJsErrorMessage($ex, $pageName, $object);
  } */

function LoadMes($personaId, $mes, $anio) {

    $p = new Jornada();
    $p->PersonaId = $personaId;
    $info = $p->GetByPersonaId($anio);
    $jornada = $p->LoadMes($mes, $anio, $personaId);
    $response = array("1" => $jornada, "2" => $info);
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
<?php SecurityPage();
echo "<script>var personaId=" . $personaId . ";</script>";
?>
<div id="content">

    <div class="titlePag" style="padding-bottom: 15px;">Jornada Laboral</div>
    <div id="panel">
        <div id="tblJornada" style='width:790px;float:left;height: 150px'>
        </div>
        <div style="clear:both;"></div>
    </div>
</div>
</div>
<?php
echo '<script type="text/javascript" src="jornada.js?' . Conf::VERSION . '"></script>';
echo '<script type="text/javascript" src="js/Printer.js?' . Conf::VERSION . '"></script>';
?>
<?php include "../include/footer.php"; ?>