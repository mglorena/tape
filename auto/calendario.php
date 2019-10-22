<?php
require('cal/calendario.php');
require_once ('class/cvehiculos.php');
require_once ('class/creservas.php');
require("../class/csajax.php");
$sajax_request_type = "POST";
sajax_init();
sajax_export("LoadCalendar", "SendJsError");
sajax_handle_client_request();
require_once ('/var/www/html/tape/class/cerrors.php');

function LoadCalendar($mes, $anio, $tipove) {
    try {
        $objCalendario = new calendario;
        $barra = $objCalendario->mostrarBarra();
        $cal = $objCalendario->PrintCalendar($mes, $anio);
        $cal = $barra . $cal;
        $re = new Reserva();
        $reservas = $re->GetForCalendar($mes, $anio, $tipove, 0);
        $response = array("0" => $cal, "1" => $reservas);
        return $response;
    } catch (Exception $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "calendario.php - LoadCalendar", $mes);
    }
    return false;
}
?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php"; ?>
<link type="text/css" rel="stylesheet" href="../css/jquery.tooltip.css" />
<link type="text/css" rel="stylesheet" href="cal/table.css" />
<script type="text/javascript" src="cal/jquery.func.js"></script>
<script type="text/javascript" src="../js/jquery.tooltip.min.js"></script>
<style>
    thead th {
        text-align: center;
        background: #E6EDF5;
        color: #4F76A3;
        font-size: 100% !important;
        height:18px;
    }
</style>
<script>
<?php
sajax_show_javascript();
?>
</script>
<div id="content">
    <div class="titlePag" style="padding-bottom: 15px;">Calendario Automotores - <label id="lblNameMonth" class='titlePag'></label></div>
    <div id="calendarview" style='width:790px;float:left;'>
    </div>
    <div id="vehiculoview" style="width:160px;float:left;border:0px solid salmon;margin-left:10px;">
        <?php
        $ves = new Vehiculo();
        try {
        
            $vehiculos = $ves->Search();
            $table = "<table cellpadding='0' cellspacing='0' style='width:100%;font-size:12px'><tr >";
            $table .="<td style='border:none;text-align:left;'>Vehículo</td><td></td><td >Cap.</td></tr>";
            foreach ($vehiculos as $v) {
                $table.="<tr >";
                $table .="<td style='text-align:left;'>" . $v->TipoVehiculoId . ", " . $v->Modelo . " - " . $v->Patente . "</td>";
                $table .="<td><div style='width:10px;height:10px;background-color:" . $v->Color . "'></div></td>";
                $table.="<td  style='text-align:center;'>" . $v->Capacidad . "</td>";
                $table.="</tr>";
            }
            $table.="</table>";
            echo $table;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "calendario.php - VehiculoSearch", $ves);
        }
        echo "";
        ?>


    </div>
    <div style="clear:both;"></div>
</div>

</div>

<?php echo '<script type="text/javascript" src="calendario.js?' . Conf::VERSION . '"></script>';?>
<?php include "../include/footer.php"; ?>