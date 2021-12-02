<?php
require_once ('class/cbienes.php');
require_once ('../class/cdump.php');
require_once ('../class/cconf.php');
require("../class/csajax.php");

require_once ('/var/www/html/tape/class/cerrors.php');
function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}
$sajax_request_type = "POST";
//$sajax_debug_mode = 0;

sajax_init();
sajax_export("LoadBienes","SendJsError","SavePat");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(27, $rulesIds)) { // ver la pagina bienes
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Bienes';</script>";
    }
}
function SavePat($ps) {
    try {
        $pat = json_decode($ps);
        $p = new Bienes();
        return $p->Save($pat);
        
        
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "servicios.php - SaveServicio", $s);
    }
}
function LoadBienes($inv,$leg, $dep,$b) {

    $reservaSearch = new Bienes();
    $bienes = $reservaSearch->Search($inv,$leg, $dep,$b);
    $deps = $reservaSearch->GetAllDeps();
    $legs = $reservaSearch->GetAllLegs();
    $response = array("1" => $bienes,"2"=>$deps,"3"=>$legs);
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
<?php SecurityPage(); ?>

<?php
echo '<script type="text/javascript" src="bienes.js?' . Conf::VERSION . '"></script>';
?>
<div id="content">
    <div id="tblBienes"></div>
</div>
<?php include "../include/footer.php"; ?>
