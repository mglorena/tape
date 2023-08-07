<?php
require_once ('../class/cutil.php');
require_once ('class/creservas.php');
require_once ('class/cchoferes.php');
require_once ('class/cvehiculos.php');
require_once ('class/ctipovehiculo.php');
require_once ('class/cestadosreservas.php');
require_once ('class/ccombustible.php');
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
sajax_export("GetDisponibles", "SaveReserva", "LoadReservas", "DeleteReserva", "GetReservasSaved", "InfoPresupuesto", "GrabarCosto", "SendJsError");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(13, $rulesIds)) { // ver la pagina reservas
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Reservas';</script>";
    }
    echo "<script>";
    if (!in_array(14, $rulesIds)) // editor o borrar
        echo "var hasUpdate =false;";
    else
        echo "var hasUpdate =true;";
    if (!in_array(15, $rulesIds)) // insertar 
        echo "var hasInsert =false;";
    else
        echo "var hasInsert =true;";
    echo "</script>";
}

function GetReservasSaved($fI, $fF, $reId) {
    $u = new Util();

    $reservaSearch = new Reserva();
    try {
        $fI = $u->strinformatdate($fI);
        $fF = $u->strinformatdate($fF);
        $reservas = $reservaSearch->GetListReservas($fI, $fF, $reId);
        return $reservas;
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "reservas.php - GetReservasSaved", $reservaSearch);
    }
    return null;
}

function GetDisponibles($fI, $fF, $nump, $reId) {
    try {

        $ve = new Vehiculo();
        $ch = new Chofer();
        if ($reId == "" || $reId == null)
            $reId = 0;
        $response = array("1" => $ve->GetVehiculosDispo($fI, $fF, $nump, $reId), "2" => $ch->GetDisponibles($fI, $fF, $reId));
        return $response;
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "reservas.php - GetReservasSaved", $reId);
    }
    return null;
}


function InfoPresupuesto($reservaId) {
    $reservaSearch = new Reserva();
    try {
        $reservaSearch->ReservaId = $reservaId;
        $reserva = $reservaSearch->GetById();

        foreach ($reserva as $re) {
            $des = $re->Destino;
            $chIds = $re->ChoferesIds;
            $veId = $re->VehiculoId;
            $feIni = $re->FechaInicio;
            $horaIni = $re->HoraSalida;
            $feFin = $re->FechaFin;
            $horaFin = $re->HoraLlegada;
            $dist = $re->Distancia;
            $gasto = $re->GastoTotal;

            $vehiculoSearch = new Vehiculo();
            $vehiculoSearch->VehiculoId = $veId;
            $vehiculo = $vehiculoSearch->GetByVehiculoId();
            $veDesc = $vehiculo[0]->Modelo . " " . $vehiculo[0]->Patente;
            $cons = $vehiculo[0]->ConsumoxKM;
            $cmb = Combustible::toString($vehiculo[0]->CombustibleId);
            $choferes = array();
            $i = 0;
            $chof = explode(",", $chIds);
            foreach ($chof as $c) {
                $choferSearch = new Chofer();
                $choferSearch->ChoferId = $c;
                $chofer = $choferSearch->GetByChoferId();
                $choferes[$i] = $chofer[0];
                $i++;
            }
        }
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "reservas.php - EditReserva", $reservaSearch);
    }

    $return = array("1" => $des, "2" => $chIds, "3" => $veDesc,
        "4" => $feIni, "5" => $horaIni, "6" => $feFin, "7" => $horaFin, "8" => $dist,
        "9" => $gasto, "10" => $reservaId, "11" => $cons, "12" => $cmb, "13" => $choferes);

    return $return;
}


function GrabarCosto($costo, $reId) {
    $re = new Reserva();
    return $re->GrabarCosto($costo, $reId);
}

function SaveReserva($r) {
    try {
        //$reserva = json_decode($r);
//	$reserva = json_decode($r, trJSON_UNESCAPED_UNICODEue);
	$reserva = json_decode(utf8_encode($r), JSON_UNESCAPED_UNICODE);

        $re = new Reserva();
        //$re->copy($reserva);
	$re->ReservaId = ($reserva['ReservaId'] ? $reserva['ReservaId'] : 0);
        $re->Destino = utf8_decode($reserva['Destino']);
        $re->Solicitante = utf8_decode($reserva['Solicitante']);
        $re->EmailSolicitante = utf8_decode($reserva['EmailSolicitante']);
        $re->AutorizadoPor = utf8_decode($reserva['AutorizadoPor']);
        $re->ChoferesIds = $reserva['ChoferesIds'];
        $re->VehiculoId = $reserva['VehiculoId'];
        $re->FechaInicio = $reserva['FechaInicio'];
        $re->HoraSalida = $reserva['HoraSalida'];
        $re->FechaFin = $reserva['FechaFin'];
        $re->HoraLlegada = $reserva['HoraLlegada'];
        $re->Observacion = utf8_decode($reserva['Observacion']);
        $re->NumPasajeros = $reserva['NumPasajeros'];
        $re->EstadoId = $reserva['EstadoId'];
        $re->Distancia = $reserva['Distancia'];
	//$re->UserId = $reserva['Distancia'];
        if ($re->ReservaId == 0)
            return $re->Insert();
        else
            return $re->Save();
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "reservas.php - SaveReserva con copy2", $r);
    }
}

function DeleteReserva($reservaId) {

    $ve = new Reserva();
    $ve->ReservaId = $reservaId;
    $u = new Util();
    if ($ve->Delete()) {
        if ($u->BorrarDirectorio("files/" . $reservaId))
            return true;
        else
            return false;
    }
    else
        return false;
}

function LoadReservas($dia,$mes, $anio, $type, $estado) {

    $reservaSearch = new Reserva();
    $tve = new TipoVehiculo();
    $ve = new Vehiculo();
    $ch = new Chofer();
    if($dia == 0) $dia = NULL;
    $reservas = $reservaSearch->Search($dia,$mes, $anio, $type, $estado);
    $response = array("1" => $reservas, "2" => $tve->GetAll(), "3" => $ve->GetAll(), "4" => $ch->GetAll());
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
<style>
    .recuadre{
        background-color: #ccc;
    }
</style>
<?php SecurityPage(); ?>
<?php /* LoadReservas(true, true,11,2012,1); */ ?>

<?php
echo '<script type="text/javascript" src="reservas.js?' . Conf::VERSION . '"></script>';
?>
<link type="text/css" rel="stylesheet" href="../css/jquery.tooltip.css" />
<script type="text/javascript" src="../js/jquery.tooltip.min.js"></script>
<div id="content">


    <div id="tblReservas"></div>


    <div id="fi-form"></div>
  <div id="cost-form"></div>
    
</div>
<input type="hidden" id="hdnReservaId" value="0"/>
<input type="hidden" id="hdnChoferesIds" value=""/>
<?php include "../include/footer.php"; ?>
