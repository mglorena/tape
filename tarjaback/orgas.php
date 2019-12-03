
<?php
require('class/corgas.php');
require("/var/www/html/tape/class/csajax.php");
require("/var/www/html/tape/auto/class/cdependencias.php");
require_once ('/var/www/html/tape/class/cerrors.php');

function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

$sajax_request_type = "POST";
sajax_init();
sajax_export("LoadOrganigram", "DeleteOrga", "SendJsError", "SaveAll");
sajax_handle_client_request();

function SaveAll($orgas) {
    try {
        $deps = json_decode($orgas);
        $o = new Organizacion();
        $o->DeleteAll();
        for ($i = 0; $i < count($deps); $i++) {
            $o->DependenciaId = $deps[$i][0];
            if ((int) strpos($o->DependenciaId, '#') > 0) {
                $o->DependenciaId = '0';
            }
            $o->Nombre = $deps[$i][1];
            $o->PadreId = ($deps[$i][2] === '' ? '0' : $deps[$i][2]);
            /*  $e = new Errors();
              $e->SendErrorMessage(new Exception("testing" . $i), "orgas.php - SaveAll", $o); */
            if (!$o->Insert()) {
                return false;
            }
        }
        /*  $e = new Errors();
          $e->SendErrorMessage(new Exception("testing"), "orgas.php - SaveAll", $orgas); */
        return true;
    } catch (Exception $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "orgas.php - SaveAll", $orgas);
    }
}

function DeleteOrga($id) {
    $deps = new Organizacion();
    $deps->DependenciaId = $id;
    $o = $deps->AllowToDelete();

    $response = array("1" => $o, "2" => $id);
    return $response;
}

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(35, $rulesIds)) { // ver la pagina bienes
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Organizaciones';</script>";
    }
}

function LoadOrganigram($depId) {
    $deps = new Organizacion();
    $deps->DependenciaId = $depId;
    /*  $e = new Errors();
      $e->SendErrorMessage(new Exception("testing"), "corgas.php - GetById", $depId); */
    $orgas = $deps->GetByDependenciaId();
    $response = array("1" => $orgas);
    return $response;
}
?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php"; ?>
<script type="text/javascript" src="js/orgchart.js"></script>
<script>
<?php
sajax_show_javascript();
?>
</script>
<div id="content">
    <div id="barcal">
        <table cellpadding='0' cellspacing='0'>
            <tr>
                <td>Dependencia:&nbsp;</td>
                <td><?php
                    $d = new Dependencias();
                    echo $d->GetDropDown();
                    ?>
                </td>
            </tr>
        </table>
    </div>
    <canvas id="canvas1" width="1024" height="600"></canvas>


</div>
<script type="text/javascript" src="orgas.js"></script>
<?php include "../include/footer.php"; ?>
