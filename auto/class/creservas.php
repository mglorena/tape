<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of reservas
 *
 * @author root
 */
require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');

class Reserva {

//put your code here


    var $ReservaId = 'NULL',
            $Destino = '',
            $Solicitante = '',
            $EmailSolicitante = '',
            $AutorizadoPor = '',
            $ChoferesIds = '',
            $VehiculoId = 'NULL',
            $FechaInicio = 'NULL',
            $HoraSalida = 'NULL',
            $FechaFin = 'NULL',
            $HoraLlegada = 'NULL',
            $Observacion = '',
            $FileName = '',
            $NumPasajeros = 'NULL',
            $EstadoId = 'NULL',
            $Distancia = 'NULL',
            $PrecioCombustible = 'NULL',
            $FechaCreacion = 'NULL',
            $Mantenimiento = 'NULL',
            $GastoTotal = 'NULL',
            $UserId = 'NULL',
            $FechaMod = '';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            $this->$key = $value;
        }
    }

    function GetListReservas($fI, $fF, $reId) {
        $reservas = array();
        $query = "call reservas_getListByFechas";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call reservas_getListByFechas('" . $fI . "','" . $fF . "'," . $reId . ");";

            if ($db->setQuery($query)) {
                $reservas = $db->ListArray();
            }
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - getListByFechas", $query);
        }
        return null;
    }

    function GetPendientes() {
        $reservas = array();
        $query = "call reservas_getPendientes();";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            if ($db->setQuery($query)) {
                $reservas = $db->ListArray();
            }
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - GetPendientes", $query);
        }
        return null;
    }

    function Search($dia, $mes, $anio, $typeve, $estado) {
        $reservas = array();
        $query = "call reservas_Search";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call reservas_Search('" . $dia . "'," . $mes . "," . $anio . "," . $typeve . "," . $estado . ");";

            if ($db->setQuery($query)) {
                $reservas = $db->ListObject();
            }
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - Search", $query);
        }
        return null;
    }

    function ReporteVehiculo($veId, $mes, $anio, $estado) {
        $reservas = array();
        $query = "call reservas_Search";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call reservas_rptVehiculo(" . $veId . "," . $mes . "," . $anio . "," . $estado . ");";

            if ($db->setQuery($query)) {
                $reservas = $db->ListObject();
            }
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - ReporteVehiculo", $query);
        }
        return null;
    }

    function ReporteVehiculoDisp($desde, $hasta, $veId) {
        $reservas = array();
        $query = "call reservas_Search";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call reservas_rptVehiculoDispo('" . $desde . "','" . $hasta . "'," . $veId . ");";
            /* $e = new Errors();
              $e->SendErrorMessage(new Exception("testing"), "creservas.php - reservas_ReporteVehiculoDisp", $query); */
            if ($db->setQuery($query)) {
                $reservas = $db->ListObject();
            }
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - ReporteVehiculoDisp", $query);
        }
        return null;
    }

    function GetForCalendar($mes, $anio, $typeve, $estado) {
        $reservas = array();
        $query = "call reservas_getForCalendar";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call reservas_getForCalendar(" . $mes . "," . $anio . "," . $typeve . "," . $estado . ");";

            if ($db->setQuery($query)) {
                $reservas = $db->ListArray();
            }
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - GetForCalendar", $query);
        }
        return null;
    }

    function GetByVehiculoId() {
        $reservas = array();
        $query = "call reservas_getByVehiculoId";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call reservas_getByVehiculoId('" . $this->VehiculoId . "');";

            if ($db->setQuery($query)) {
                $reservas = $db->ListObject();
            }
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - GetByVehiculoId", $query);
        }
        return null;
    }

    function GetById() {
        $reservas = array();
        $query = "call reservas_getById";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call reservas_getById('" . $this->ReservaId . "');";

            if ($db->setQuery($query)) {
                $reservas = $db->ListObject();
            }
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - GetById", $query);
        }
        return null;
    }

    function GetByEstadoId() {
        $reservas = array();
        $query = "call reservas_getByEstadoId";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call reservas_getByEstadoId('" . $this->EstadoId . "');";

            if ($db->setQuery($query)) {
                $reservas = $db->ListObject();
            }
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - GetByEstadoId", $query);
        }
        return null;
    }

    function GrabarCosto($costo, $reId) {
        $query = "";
        try {
            $query = "call reservas_updateCosto(" . $costo . "," . $reId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                $e = new Errors();
                $e->SendErrorMessage(new ErrorException("Error en update costo - Reservas :" . $query), "creservas.php - updateCosto", $query);
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - updateCosto:" . $query, $query);
        }
        return false;
    }

    function UploadFile($name, $reId) {
        $query = "";
        try {
            $query = "call reservas_updateFile('" . $name . "'," . $reId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                $e = new Errors();
                $e->SendErrorMessage(new ErrorException("Error en update file - Reservas :" . $query), "creservas.php - updateFile", $query);
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - UploadFile:" . $query, $query);
        }
        return false;
    }

    function Save() {
        $query = "";
        try {
            $query = "call reservas_update('" . $this->Destino . "','" . $this->Solicitante . "','" . $this->EmailSolicitante . "',
            '" . $this->AutorizadoPor . "'," . $this->VehiculoId . ",'" . $this->FechaInicio . "',
            '" . $this->HoraSalida . "','" . $this->FechaFin . "','" . $this->HoraLlegada . "','" . $this->Observacion . "',
            '" . $this->FileName . "'," . $this->NumPasajeros . "," . $this->EstadoId . "
            ," . $this->Mantenimiento . "," . $this->GastoTotal . "," . $this->Distancia . "," . $this->ReservaId . ",'" . $this->UserId . "');";

            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                $this->DeleteChoferes($this->ReservaId);
                $this->UpdateChoferes($this->ReservaId, $this->ChoferesIds);
                return true;
            } else {
                $db->CloseMysql();
                $e = new Errors();
                $e->SendErrorMessage(new ErrorException("Error en Save - Reservas :" . $query), "creservas.php - Save", $query);
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - Save:" . $query, $query);
        }
        return false;
    }

    function Insert() {
        $query = "";
        try {
            $query = "call reservas_insert('" . $this->Destino . "','" . $this->Solicitante . "','" . $this->EmailSolicitante . "',
            '" . $this->AutorizadoPor . "'," . $this->VehiculoId . ",'" . $this->FechaInicio . "',
            '" . $this->HoraSalida . "','" . $this->FechaFin . "','" . $this->HoraLlegada . "'," . $this->NumPasajeros . "
                ," . $this->EstadoId . ",'" . $this->Observacion . "',
            '" . $this->FileName . "'," . $this->Mantenimiento . ",'" . $this->Distancia . "','" . $this->UserId . "');";
            $db = new sqlprovider();
            $db->getInstance();
            $reserva = array();
            if ($db->setQuery($query)) {
                $reserva = $db->ListArray();
            }
            $db->CloseMysql();
            if (isset($reserva) == 1) {
                $this->DeleteChoferes($reserva[0][0]);
                $this->UpdateChoferes($reserva[0][0], $this->ChoferesIds);
                return true;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - Insert:" . $query, $query);
        }
        return false;
    }

    function DeleteChoferes($reId) {

        $query = "";
        try {
            $query .="call reservas_delChoferes(" . $reId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);

            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - DeleteChofer", $query);
        }
        return false;
    }

    function UpdateChoferes($reId, $choferesIds) {

        $query = "";
        try {
            foreach ($choferesIds as $ch) {
                if ($ch != '') {
                    $query = "call reservas_addChofer(" . $reId . "," . $ch . ");";
                    $db = new sqlprovider();
                    $db->getInstance();
                    $reserva = array();
                    if ($db->setQuery($query)) {
                        $reserva = $db->ListArray();
                    }
                    $db->CloseMysql();

                    if (isset($reserva) != 1) {
                        $e = new Errors();
                        $e->SendErrorMessage(new Exception("Error updating ReservaChofer"), "creservas.php - Add Chofer" . $query, $query);
                    }
                }
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - UpdateChoferes:" . $query, $query);
        }
    }

    function Delete() {

        $query = "";
        try {
            $query .="call reservas_delete(" . $this->ReservaId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creservas.php - Delete", $query);
        }
        return false;
    }

}

?>
