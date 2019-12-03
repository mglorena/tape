<?php

require_once ('class/cprofile.php');
require_once ('../class/cdump.php');

require_once ('../class/cconf.php');
require("../class/csajax.php");
$sajax_request_type = "POST";
sajax_init();
sajax_export("SavePerfil", "LoadPerfiles");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(1, $rulesIds)) { // ver la pagina reservas
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Users';</script>";
    }
    echo "<script>";
    if (!in_array(1, $rulesIds)) // editor o borrar
        echo "var hasUpdate =false;";
    else
        echo "var hasUpdate =true;";
    if (!in_array(1, $rulesIds)) // insertar 
        echo "var hasInsert =false;";
    else
        echo "var hasInsert =true;";
    echo "</script>";
}
function LoadPerfiles($profileId) {
    
    $prof = new Profile();
    $return = array("1" => $prof->Search(),"2"=>$prof->ListHas($profileId),"3"=>$prof->ListNotHas($profileId));
    
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
echo '<script type="text/javascript" src="ruleprofiles.js?' . Conf::VERSION . '"></script>';
?>
<div id="content">

</div>

<?php include "../include/footer.php"; ?>