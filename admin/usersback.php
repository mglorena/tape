<?php
require_once ('../class/cusers.php');
require_once ('../class/cdump.php');
require_once ('../class/cconf.php');
require("../class/csajax.php");

$sajax_request_type = "POST";
sajax_init();
sajax_export("EditUser", "SaveUser", "LoadUsers", "DeleteUser", "InsertUser", "SendJsError");
sajax_handle_client_request();


function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);

    if (!in_array(1, $rulesIds)) { // ver la pagina reservas
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Users';</script>";
    }
}

function EditUser($userId) {
    $userSearch = new User();
    try {

        $e = new Errors();
        $userSearch->UserId = $userId;
        $user = $userSearch->GetByUserId();
        $username = "";
        $nombre = "";
        $apellido = "";
        foreach ($user as $u) {
            $username = $u->UserName;
            $nombre = $u->FirstName;
            $apellido = $u->LastName;
            $email = $u->Email;
        }
        $return = array("1" => $username, "2" => $nombre, "3" => $apellido, "4" => $email, "5" => $userId);
        return $return;
    } catch (Exception $ex) {

        $e = new Errors();
        $e->SendErrorMessage($ex, "users.php - EditUser", $userSearch);
    }
}

function SaveUser($user, $n, $a, $email,$uId) {
    $u = new User();
    $u->UserName = $user;
    $u->FirstName = $n;
    $u->LastName = $a;
    $u->Email = $email;
    $u->UserId = $uId;
//    echo do_dump($u);
    return $u->Save();
}

function InsertUser($user, $n, $a, $p, $email) {
    $u = new User();
    $u->UserName = $user;
    $u->FirstName = $n;
    $u->LastName = $a;
    $u->Email = $email;
    $u->Password = $p;
//    echo $p."<br/>";
    return $u->Insert();
}

function DeleteUser($userId) {

    $u = new User();
    $u->UserId = $userId;
    $u->UserName = $_SESSION['S_username'];
    //echo $u->UserId;
    return $u->Delete();
}

session_start();

if (!isset($_SESSION['S_username'])) {
    echo "<script>window.location.host = '".Conf::ROOT."/login.php'</script>";
    exit();
}

function LoadUsers() {
    global $host;
    $table = "<div style='text-align:right;width:640px; border:solid 0px black;padding:5px;'>" .
            "<div class='dlink'>" .
            "<label class='link' onclick='PopinInsertUser(event);'>Agregar</label>" .
            "</div>" .
            "</div>";
    $table .= "<table cellpadding='2' cellspacing='2' class='tableList' style='width:640px''>";
    $table .= "<tr class='listtitle'>";
    $table .= "<td>Nombre</td><td>Apellido</td><td>UserName</td><td>Email</td><td>Acciones</td>";
    $table .= "</tr>";
    $userSearch = new User();
//    echo "que pasa";
    $usuarios = $userSearch->Search();
//    echo  do_dump($usuarios);
    $i = 0;
    foreach ($usuarios as $u) {
        if ($i % 2 == 0)
            $class = "listitemeven";
        else
            $class = 'listitemuneven';
        $table .= "<tr class='" . $class . "'>";
        $table .= "<td>" . $u->FirstName . "</td><td>" . $u->LastName . "</td><td>" . $u->UserName . "</td><td>" . $u->Email . "</td>";
        $table .="<td style='width:50px;text-align:center;'><table cellpadding='0' cellspacing='0' style='border:0px;text-align:center;' align='center'><tr>";
        $table .= "<td><label class='link' onclick=\"EditUser(event,'" . $u->UserId . "');\">Editar</label></td>";
        $table .= "<td><label class='link' onclick=\"DeleteUser('" . $u->UserId . "');\">Borrar</label></td>";
        $table .= "</tr></table></td>";
        $table .= "</tr>";
        $i++;
    }
    $table.="</table>";

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
<script type="text/javascript" src="users.js"></script>
<div id="content">
    <div class="titlePag">Usuarios</div>
    <div id="tblUsers"></div>
    <div id="divUser" style="width:400px;height:230px;display:none;">
        <div style="padding:5px;">
            <table cellpadding='0' cellspacing='4'>
                <tr>
                    <td class='label'>UserName:</td>
                    <td><input type ='text' id='txtUsername' class='textbox'/></td>
                </tr>
                <tr>
                    <td class='label'>Nombre:</td>
                    <td><input type ='text' id='txtNombre' class='textbox'/></td>
                </tr>
                <tr>
                    <td class='label'>Apellido:</td>
                    <td><input type ='text' id='txtApellido' class='textbox'/></td>
                </tr>
                <tr>
                    <td class='label'>Email:</td>
                    <td><input type ='email' id='txtEmail' class='textbox'/></td>
                </tr>

            </table>
            <table cellpadding='0' cellspacing='4' id="tblPassword" style="display:none;">
                <tr>
                    <td class='label'>Password:</td>
                    <td><input type ='password' id='txtPassword' class='textbox'/></td>
                </tr>
                <tr>
                    <td class='label'>Confirmar Password:</td>
                    <td><input type ='password' id='txtConfirmPassword' class='textbox'/></td>
                </tr>


            </table>
            <div style="text-align:center;vertical-align: center;padding-top:10px;">
                <input type="button" id="btnSave" name="btnSave" value="Guardar" onclick="SaveUser();" />
                &nbsp;
                <input type="button" id="btnCancel" name="btnCancel" value="Cancelar" onclick="Cancel();" />
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdnUserId" value="0"/>
<?php include "../include/footer.php"; ?>