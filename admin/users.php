<?php
require_once ('class/cusers.php');
require_once ('class/cprofile.php');
require_once ('../class/cdump.php');

require_once ('../class/cconf.php');
require("../class/csajax.php");
$sajax_request_type = "POST";
sajax_init();
sajax_export("SaveUser", "LoadUsers", "DeleteUser", "SendJsError");
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

function SaveUser($cch) {
      $user = json_decode($cch);
    try {
      
        $us = new Users();
        $us->copy($user);
        if (!isset($us->UserId))
            $us->UserId = 0;
        $us->Active = ($us->Active == "on" ? "1" : "0");
        return $us->Save();
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "cusers.php - SaveUser", $user);
    }
}

function DeleteUser($userId) {

    $us = new Users();
    $us->UserId = $userId;
    return $us->Delete();
}

function LoadUsers() {
    $userSearch = new Users();
    $prof = new Profile();$prof->Active="1";
    $users = $userSearch->Search();
    $return = array("1" =>  $users,"2"=>$prof->Search());
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
echo '<script type="text/javascript" src="users.js?' . Conf::VERSION . '"></script>';
?>
<div id="content">
    <div id="tblUsers"></div>
</div>
<input type="hidden" id="hdnUserId" value="0"/>
<?php include "../include/footer.php"; ?>