<?php      
require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');

class HoraEx {

// Next comes the variable list as defined above
// Note the key word 'var' and then a comma-separated list

    var $HoraExId = 'NULL',
            $ChoferId = 'NULL',
            $Fecha = 'NULL',
            $Entrada = 'NULL',
            $Salida = 'NULL',
            $Concepto = 'NULL',
            $Calculado = 'NULL',
            $Zona = 'NULL',
            $TotalHoras = '0',
            $DependenciaId = 'NULL',
            $Create = 'NULL',
            $Modified = 'NULL',
            $VehiculoId = 'NULL',
            $TMEntrada = '00:00',
            $TMSalida = '00:00',
            $TTEntrada = '00:00',
            $TTSalida = '00:00',
            $Responsable = 'NULL',
            $Hora50 = '00:00',
            $Hora100 = '00:00',
            $Descansos = 'NULL',
            $EstadoId ='NULL',
            $Estado ='NULL',
            $Jornada='NULL';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            $this->$key = $value;
        }
    }

    function GetHoraExtra($horaexId) {
        $horaex = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call horaex_byId(" . $horaexId . ");";

            if ($db->setQuery($query))
                $horaex = $db->ListObject();
            $db->CloseMysql();
            return $horaex;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - horaex_ById", $query);
        }
        return null;
    }

    function Search($mes, $anio, $choferId, $dep) {
        $horaex = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call horaex_search(" . $mes . "," . $anio . "," . $choferId . "," . $dep . ");";
            if ($db->setQuery($query))
                $horaex = $db->ListArray();
            $db->CloseMysql();
            return $horaex;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - Search", $query);
        }
        return $horaex;
    }

    function SearchReporte($desde, $hasta, $mes, $anio, $choferId, $dep) {
        $horaex = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call horaex_searchReporte('" . $desde . "','" . $hasta . "'," . $mes . "," . $anio . "," . $choferId . "," . $dep . ");";
            if ($db->setQuery($query))
                $horaex = $db->ListArray();
            $db->CloseMysql();
            return $horaex;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - searchReporte", $query);
        }
        return $horaex;
    }
 function SearchRepByChofer($meses, $anio) {
        $horaex = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call horaex_repByChofer('" . $meses . "'," . $anio . ");";
            if ($db->setQuery($query))
                $horaex = $db->ListArray();
            $db->CloseMysql();
            return $horaex;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - SearchRepByChofer", $query);
        }
        return $horaex;
    }
    function SearchRepByDep($meses, $anio) {
        $horaex = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call horaex_repByDep('" . $meses . "'," . $anio . ");";
            if ($db->setQuery($query))
                $horaex = $db->ListArray();
            $db->CloseMysql();
            return $horaex;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - searchByDep", $query);
        }
        return $horaex;
    }
    function GetByChofer() {
        $horaex = array();
        $query = "call horaex_getByName";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call horaex_getByChofer(" . $this->ChoferId . ");";

            if ($db->setQuery($query)) {
                $horaex = $db->ListObject();
            }
            $db->CloseMysql();
            return $horaex;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - GetByChofer", $query);
        }
        return null;
    }

    function GetByDia() {
        $horaex = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call horaex_getByDia(" . $this->Dia . ");";
            if ($db->setQuery($query)) {
                $horaex = $db->ListObject();
            }
            $db->CloseMysql();
            return $horaex;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - GetByDia", $query);
        }
        return null;
    }

    function CheckDuplicates() {
        $query = "";
        try {

            $query = "call horaex_checkDuplicates(" . $this->HoraExId . "," . $this->ChoferId . ",'" . $this->Fecha . "'," . $this->DependenciaId . "," . $this->VehiculoId . ",'" . $this->Entrada . "','" . $this->Salida . "');";
            $db = new sqlprovider();
            $db->getInstance();
            if ($db->setQuery($query)) {
                $horaextra = $db->ListArray();
                $db->CloseMysql();

                if (!isset($horaextra[0])) {
                    $result = [];
                    $result['HoraExtra'] = $this;
                    $result['DupResult'] = $horaextra;
                   /* $e = new Errors();
                    $e->SendErrorMessage(new Exception("testing Duplicados en Horas Extra"), "choraex.php - CheckDuplicates", $result);*/
                    return true;
                } else {
                    $result = [];
                    $result['HoraExtra'] = $this;
                    $result['DupResult'] = $horaextra;
                    $e = new Errors();
                    $e->SendErrorMessage(new Exception("Duplicados en Horas Extra"), "choraex.php - CheckDuplicates", $result);
                    return false;
                }
            } else {
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - Save", $query);
            //return false;
        }
        return false;
    }

    function Save() {
        $query = "";
        try {

            $query = "call horaex_update(" . $this->HoraExId . "," . $this->ChoferId . ",'" . $this->Fecha . "','" . $this->Entrada . "',
                '" . $this->Salida . "','" . $this->Concepto . "'," . $this->Calculado . "," . $this->Zona . ",'" . $this->TotalHoras . "',
                " . $this->DependenciaId . "," . $this->VehiculoId . ",'" . $this->TMEntrada . "','" . $this->TMSalida . "','" . $this->TTEntrada . "',
                '" . $this->TTSalida . "','" . $this->Responsable . "','" . $this->Hora50 . "','" . $this->Hora100 . "',".$this->Jornada.");";
            $db = new sqlprovider();
            $db->getInstance();
           // $val = $this->CheckDuplicates();
            //  if ($this->CheckDuplicates()) {
            if ($db->setQuery($query)) {
                $horaextra = $db->ListArray();
                if (isset($horaextra) == 1) {
                    $this->HoraExId = $horaextra[0][0];
                    $db->CloseMysql();
                    if ($this->AddDescansos()) {
                        $db->CloseMysql();
                        return true;
                    } else {
                        $db->CloseMysql();
                        return false;
                    }
                }
            } else {
                $db->CloseMysql();
                return false;
            }
            //}
            //  else
            //      return false;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - Save", $query);
            //return false;
        }
        return false;
    }
 function SaveEstado($horaex) {
       $query = "";
        $db = new sqlprovider();
        $db->getInstance();
        try {
        foreach ($horaex as $h) {
               
                $query = "call horaex_saveEstado(" . $h->HoraExId . "," . $h->EstadoId . ");";
                $db->setQuery($query);
                if ($db->execute() != "1") {
                    $e = new Errors();
                   $e->SendErrorMessage(new ErrorException("Error en update horaextra - Horas Extras :" . $query), "choraex.php - SaveEstado", $query);
                    $db->CloseMysql();
                    return false;
                }
                return true;
            }
         
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - SaveEstado:" . $query, $query);
        }
        return false;
    }
    function AddDescansos() {
        if ($this->DeleteDescansos()) {
            foreach ($this->Descansos as $value) {
                if (!$this->InsertDescanso($value[0], $value[1]))
                    return false;
            }
        }
        else
            return false;
        return true;
    }

    function InsertDescanso($entrada, $salida) {
        $query = "";
        try {
            $query = "call horaex_insDesc('" . $this->HoraExId . "','" . $entrada . "','" . $salida . "');";
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
            $e->SendErrorMessage($ex, "choraex.php - Insert", $query);
        }
        return false;
    }

    function DeleteDescansos() {
        $query = "";
        try {
            $query .="call horaex_delDesc(" . $this->HoraExId . ");";
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
            $e->SendErrorMessage($ex, "choraex.php - Delete", $query);
        }
        return false;
    }

    function Delete() {

        $query = "";
        try {
            $query .="call horaex_delete(" . $this->HoraExId . ");";
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
            $e->SendErrorMessage($ex, "choraex.php - Delete", $query);
        }
        return false;
    }

    function GetAll() {
        $horaex = array();
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call horaex_getAll();";

            if ($db->setQuery($query))
                $horaex = $db->ListObject();
            $db->CloseMysql();
            return $horaex;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "choraex.php - Getall", $horaex);
        }
        return null;
    }

}
?>