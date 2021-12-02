<?php
session_start();
require_once ('class/cusers.php');
$login = "";
if (isset($_POST["txtUsername"]))
    $login = $_POST["txtUsername"];
else {
    $_POST["txtUsername"] = "";
    $login = "";
}

function Login() {
    if (isset($_POST["btnInvitado"])) {
        $loginUser = new User();
        $loginUser->UserName = 'invitado';
        $loginUser->Password = 'invitado';
        $msg = $loginUser->verifyPassword();

        if ($msg == "Ok") {
            $_SESSION['S_username'] = $loginUser->UserName;
            $rules = $loginUser->GetRulesByUser($loginUser->UserName);
            $_SESSION['S_rules'] = $rules[0][0];
            echo "<script>window.location = 'auto/calendario.php?nologin=yes'</script>";
            exit();
        }
    }
    if (trim($_POST["txtUsername"]) != "" && trim($_POST["txtPassword"]) != "") {
        $loginUser = new User();
        $loginUser->UserName = trim($_POST["txtUsername"]);
        $loginUser->Password = trim($_POST["txtPassword"]);
        $msg = $loginUser->verifyPassword();

        if ($msg == "Ok") {
            $username = trim($_POST["txtUsername"]);
            $_SESSION['S_username'] = $username;

            $rules = $loginUser->GetRulesByUser($username);
            $_SESSION['S_rules'] = $rules[0][0];
            echo "<script>window.location = 'index.php'</script>";
            exit();
        }
    } else {
        $msg = ''; //Debe especificar un usuario y password';
    }
    echo "<font color='red'>" . $msg . "</font>";
}

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Tape - Dirección General de Obras y Servicios</title>
        <link rel="stylesheet" href="css/style.css" type="text/css" />
      <!--  <script type="text/javascript" src="js/functions.js"></script>-->
    </head>
    <body>

        <form action="login.php" method="post">
            <div id="login" align="center">

                <table cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center"> 

                            <a href="index.php"><img src="images/logo.png" border="0"></img></a>

                            <!--  <div style="text-shadow: -3px -2px 5px rgba(0, 0, 0, .4);
                                                   color: #3D5279; font-size:3em;-webkit-margin-before: 0.17em;
                                                   -webkit-margin-after: 0.17em;
                                                   -webkit-margin-start: 5px;
                                                   -webkit-margin-end: 0px;
                                                   font-weight: bold;">TAPE
                                  <div style="text-shadow: 0 1px 0 #fff, 0 -1px 0 #000;
                                       color: #798396;font-size:0.4em;">Dirección General de Obras y Servicios</div></div>
  
                              </div>--></td>
                    </tr>
                    <tr><td style="height:15px;">&nbsp;</td></tr>
                    <tr>
                        <td align="center">

                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" class="label">Usuario</td></tr>
                                <tr>
                                    <td><input type="text" id="txtUsername" name="txtUsername" class="textbox"></td>
                                </tr>
                                <tr>
                                    <td align="center" class="label">Password</td></tr>
                                <tr>
                                    <td><input type="password" id="txtUsername" name="txtPassword" class="textbox"></td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td  align="center"><input type="submit" id="btnLogin" name="btnLogin" value="Login" />

                            <!--<div id="divInvitado" align='center' style='padding:20px;'>
                                <a href='auto/calendario.php?nologin=yes'>Ver Calendario</a>
                            </div>-->
                        </td></tr>
                </table>
                <div><?php
if (isset($login)) {
    Login();
}
?></div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div align="center">Compatible con:</div>
            <div align="center">
                <a href="http://www.google.com/chrome" target="_blank"><img src="images/chromeLogo.png" border="0" width="48px" height="48px"></a>
                <a href="http://www.mozilla.com" target="_blank"><img src="images/firefox.jpg" border="0"></a>
            </div>
        </form>
    </body>
</html>

