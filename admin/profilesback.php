<?php
require_once ('../class/cprofiles.php');
require_once ('../class/cdump.php');

require_once ('../class/cconf.php');
require("../class/csajax.php");
$sajax_request_type = "POST";
sajax_init();
sajax_export("EditProfile", "SaveProfile", "LoadProfiles", "DeleteProfile", "InsertProfile", "SendJsError");
sajax_handle_client_request();
function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
   $HOST_URL  = $_SERVER['DOCUMENT_ROOT'] . "/tape";
    if (!in_array(4, $rulesIds)) { // ver la pagina reservas
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Users';</script>";
    }
    
}
function EditProfile($profileId) {
    
    $profileSearch = new Profile();
    $profileSearch->ProfileId = $profileId;
    $profile = $profileSearch->GetByProfileId();
    $profilename = "";
    $active ="";

    foreach ($profile as $p) {
        
        $profilename = $p->Name;
        $active = $p->Active;
       
        
    }
    $return = array("1" => $profilename, "2" => $active,"3"=>$profileId);
    return $return;
}

function SaveProfile($pId,$name,$a) {
    $p = new Profile();
    $p->ProfileId =$pId;
    $p->Name = $name;
    $p->Active = $a;
    return $p->Save();
}

function InsertProfile($profile, $a) {
    $p = new Profile();
    $p->Name = $profile;
    $p->Active = $a;
    return $p->Insert();
}

function DeleteProfile($profileId) {

    $p = new Profile();
    $p->ProfileId = $profileId;
    return $p->Delete();
}

session_start();

if (!isset($_SESSION['S_username'])) {
    echo "<script>window.location.host = '".Conf::ROOT."/login.php'</script>";
    exit();
}

function LoadProfiles() {


    $table = "<div style='text-align:right;width:640px; border:solid 0px black;padding:5px;'>" .
            "<div class='dlink'>" .
            "<label class='link' onclick='PopinInsertProfile(event);'>Agregar</label>" .
            "</div>" .
            "</div>";  
    $table .= "<table cellpadding='2' cellspacing='2' class='tableList' style='width:640px''>";
    $table .= "<tr class='listtitle'>";
    $table .= "<td>ProfileName</td><td>Active</td><td>Acciones</td>";
    $table .= "</tr>";
    $profileSearch = new Profile();

    $perfiles = $profileSearch->Search();
 
    $i = 0;
    foreach ($perfiles as $p) {
        if ($i % 2 == 0)
            $class = "listitemeven";
        else
            $class = 'listitemuneven';
        $active="";
        if($p->Active== 1) $active="Si"; else $active="No";
        $table .= "<tr class='" . $class . "'>";
        $table .= "<td>" . $p->Name . "</td><td>" .$p->Active. "</td>";
        $table .="<td style='width:50px;text-align:center;'><table cellpadding='0' cellspacing='0' style='border:0px;text-align:center;' align='center'><tr>";
        $table .= "<td><label class='link' onclick=\"EditProfile(event,'" . $p->ProfileId . "');\">Editar</label></td>";
        $table .= "<td><label class='link' onclick=\"DeleteProfile('" . $p->ProfileId . "');\">Borrar</label></td>";
        $table .= "</tr></table></td>";
        $table .= "</tr>";
        $i++;
    }
    $table.="</table>";
//   echo do_dump($table);
    return $table;
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
<script type="text/javascript" src="profiles.js"></script>
<div id="content">
    <div class="titlePag">Perfiles</div>
    <div id="tblProfiles"></div>
    <div id="divProfile" style="width:400px;height:230px;display:none;">
        <div style="padding:5px;">
            <table cellpadding='0' cellspacing='4'>
                <tr>
                    <td class='label'>ProfileName:</td>
                    <td><input type ='text' id='txtProfilename' class='textbox'/></td>
                </tr>
                <tr>
                    <td class='label'>Active:</td>
                    <td><input type ='checkbox' id='chkActive'/></td>
                </tr>
                

            </table>
            
            <div style="text-align:center;vertical-align: center;padding-top:10px;">
                <input type="button" id="btnSave" name="btnSave" value="Guardar" onclick="SaveProfile();" />
                &nbsp;
                <input type="button" id="btnCancel" name="btnCancel" value="Cancelar" onclick="Cancel();" />
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdnProfileId" value='0'/>
<?php include "../include/footer.php"; ?>