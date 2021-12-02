<?php
include 'config.php';
require_once $docRoot . '/class/cerrors.php';
require_once $docRoot . '/class/cusers.php';
/*sajax_init();
sajax_export("SendJsError");
sajax_handle_client_request();*/
 $HOST_URL  = "https://". $_SERVER['HTTP_HOST'] . "/tape/";
header( 'X-Frame-Options: SAMEORIGIN' );
session_start(); // NEVER FORGET TO START THE SESSION!!! // es necesaria en todas las p�ginas para poder consultar las variables en la session.
$inactive = 1200;
$host = $HOST_URL;
//echo $host;
//echo do_dump($_SERVER);
if (isset($_GET['nologin']) && $_GET['nologin'] == 'yes') {
    $loginUser = new User();
    $loginUser->UserName = 'invitado';
    $loginUser->Password = 'invitado';
    $_SESSION['S_username'] = $loginUser->UserName;
    $rules = $loginUser->GetRulesByUser($loginUser->UserName);
    $_SESSION['S_rules'] = $rules[0][0];
}
if (isset($_SESSION['start'])) {
    $session_life = time() - $_SESSION['start'];
    if ($session_life > $inactive) {
        echo "<script>window.location = '" . $host . "login.php'</script>";
    }
    if (!isset($_GET['nologin']) && $_SESSION['S_username'] == 'invitado') {
        //  estoy logeada como invitado pero no en la pagina calendario
        echo "<script>window.location = '" . $host . "login.php'</script>";
        exit();
    }
}

$_SESSION['start'] = time();
if (!isset($_SESSION['S_username'])) {
    // no estoy logeada, no existe username en la session
    echo "<script>window.location = '" . $host . "login.php'</script>";
    exit();
}



header('Content-Type: text/html; charset=UTF-8');
/*
function SendJsError($ex, $pageName, $object) {
//echo "testing";
    $errorS = new Errors();
    $errorS->SendJsErrorMessage($ex, $pageName, $object);
    $response = array("1" => "test");
        return $response;
}*/
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"  "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Tape - Dirección General de Obras y Servicios</title>
        <?php echo "<script>var user='" . $_SESSION['S_username'] . "'; var rootDir='" . Conf::ROOT . "';</script>"; ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/json.js?' . Conf::VERSION . '"></script>';
        ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/jquery.js?' . Conf::VERSION . '"></script>';
        ?>
        <?php
        echo '<link rel="stylesheet" href="' . $host . 'css/style.css?' . Conf::VERSION . '" type="text/css" />';
        ?>
        <?php
        echo '<link rel="stylesheet" href="' . $host . 'resources/css/ext-all.css?' . Conf::VERSION . '" type="text/css" />';
        ?>
        <?php
        echo '<link rel="stylesheet" href="' . $host . 'css/popin.css?' . Conf::VERSION . '" type="text/css" />';
        ?>
        <?php
        echo '<link rel="stylesheet" href="' . $host . 'js/ux/css/CheckHeader.css?' . Conf::VERSION . '" type="text/css" />';
        ?> 
        <?php
        echo '<link rel="stylesheet" href="' . $host . 'css/stylemultiselect.css?' . Conf::VERSION . '" type="text/css" />';
        ?>
        <?php
        echo '<link rel="stylesheet" href="' . $host . 'css/jquery.multiselect.css?' . Conf::VERSION . '" type="text/css" />';
        ?>
        <?php
        echo '<link rel="stylesheet" href="' . $host . 'css/prettify.css?' . Conf::VERSION . '" type="text/css" />';
        ?>

        <?php
        echo '<link rel="stylesheet" href="' . $host . 'css/jquery.ui.datepicker.css?' . Conf::VERSION . '" type="text/css" />';
        ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/functions.js?' . Conf::VERSION . '" ></script>';
        ?>


        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/popin.js?' . Conf::VERSION . '" ></script>';
        ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/humane.js?' . Conf::VERSION . '" ></script>';
        ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/smoke.js?' . Conf::VERSION . '" ></script>';
        ?>

        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/ext-all.js?' . Conf::VERSION . '" ></script>';
        ?>
        <?php echo '<script type="text/javascript" src="' . $host . 'js/ext-lang-es.js?' . Conf::VERSION . '" ></script>'; ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/mask.js?' . Conf::VERSION . '" ></script>';
        ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/jquery-ui.js?' . Conf::VERSION . '" ></script>';
        ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/jquery.multiselect.min.js?' . Conf::VERSION . '" ></script>';
        ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/prettify.js?' . Conf::VERSION . '" ></script>';
        ?>
        <?php
        echo '<script type="text/javascript" src="' . $host . 'js/datef.js?' . Conf::VERSION . '" ></script>';
        ?>
    </head>
    <body style='margin:0px; padding:0px'>

        <script>
            Ext.Loader.setConfig({
                enabled: true
            });
            Ext.Loader.setPath('Ext.ux', _WebSitePath +'js/ux');
            Ext.require([
                'Ext.selection.CellModel',
                    'Ext.grid.*',
                    'Ext.data.*',
                    'Ext.util.*',
                    
                    'Ext.chart.*',
                    'Ext.layout.container.Fit',
                    'Ext.window.MessageBox',
    
    
                    'Ext.state.*',
                    'Ext.form.*',
                    'Ext.ux.CheckColumn',
                    
                    'Ext.ux.grid.Printer',
                    'Ext.ux.grid.PrinterAuto',
                    'Ext.ux.grid.PrinterEmeraldFact',
                    'Ext.ux.grid.PrinterServicios',
                    'Ext.ux.grid.PrinterEmerald',
                    'Ext.ux.grid.PrinterReportAnual',
                    'Ext.ux.grid.PrinterLicencias',
                    'Ext.ux.grid.PrinterLicenciasPersonal',
                    'Ext.tab.*',
                    'Ext.window.*',
                    'Ext.tip.*',
                    'Ext.toolbar.Paging',
                    'Ext.ux.PreviewPlugin',
                    'Ext.ModelManager',
                    'Ext.tip.QuickTipManager',
                    'Ext.layout.container.Border',
                    'Ext.window.MessageBox',
                    'Ext.menu.*',
                    'Ext.form.field.ComboBox',
                    'Ext.layout.container.Table',
                    'Ext.container.ButtonGroup'

            ]);
        </script>
        <div id="header" style="padding-left:23px;border:solid 0px red">
            <div align="right" style="width:99%;" class="header">
                <?php
                if ($_SESSION['S_username'] != 'invitado') {
                    echo $_SESSION['S_username'] . "&nbsp;";
                    echo '<a href="' . $host . 'logout.php">Salir</a>';
                }
                ?>

            </div>
            <?php
            echo '<a href="' . $host . 'index.php"><img src="' . $host . 'images/logo.png?' . Conf::VERSION . '" border="0" width="183" height="83"></img></a>';
            ?>
        </div>

