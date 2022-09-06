<?php

/*
 * Created on 14/11/2011
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');

class Persona {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list
    public $PersonaId = null;
    public $VacacionesDias = null;
    var
            $Nombre = '',
            $Apellido = '', $Domicilio = '', $ArticuloId = '', $Observaciones = 'NULL', $FechaIngreso = 'NULL',
            $CargoDesc = '', $Categoria = '', $CantHoras = '', $Desde = 'NULL', $Hasta = 'NULL', $DNI = 'NULL',$TipoDNI='',
            $Compensatorio = 'NULL', $CP = 'NULL', $LicAnt = 'NULL', $LicA = 'NULL', $Total = 'NULL', $Telefono = 'NULL',
            $Compensatorios = 'NULL', $FechaNac = 'NULL',$Email ='',
            $Legajo = 'NULL',$Activo='NULL',$CUIL='',
            $Active = 'NULL';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            $this->$key = $value;

            //            $e = new Errors();
            //            $e->SendErrorMessage(new Exception("depurando errores2222"), "personas.php - GrabarPersona", $this->$key);
        }
    }

    function AddNew() {
        $query = "";
        try {

            $query = "call personas_insert(
               
                '" . $this->Apellido . "',
                '" . $this->Nombre . "',
                '" . $this->Legajo . "',
                '" . $this->TipoDNI . "',
                '" . $this->CargoDesc . "',
                '" . $this->Categoria . "',
                '" . $this->Telefono . "',
                '" . $this->Email . "',
                '" . $this->Domicilio . "',
                '" . $this->Active . "',
                '" . $this->CUIL . "',
                '" . $this->FechaNac . "',
                '" . $this->FechaIngreso . "',
                '" . $this->DNI . "')";


            $db = new sqlprovider();
           $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $e = new Errors();
            $e->SendErrorMessage(new Exception("no inserta "), "cpersonas.php - AddNew", $query);
           
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - AddNew", $query);
        }
        return false;
    }

    function Compesatorios() {
        foreach (
        $this->Compensatorios as $value) {
            $del = true;
            if ($value[0] != 0) {
                $del = $this->DeleteCompensatorios($value[0]);
            }
            if ($del) {
                if (!$this->InsertCompensatorio($value[1], $value[2], $value[3], $value[4])) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
        $this->GuardarTotalCompensatorio();

        return true;
    }

    function InsertCompensatorio($fecha
    , $entrada, $salida, $isHabil) {
        $query = "";
        try {
            $query = "    call personas_insCompe('" . $this->PersonaId . "', '" . $fecha . "', '" . $entrada . "', '" . $salida . "', '" . $isHabil . "' );
                    ";
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
            $e->SendErrorMessage($ex, "cpersonas.php - InsertCompensatorio", $query);
        }
        return false;
    }

    function GuardarTotalCompensatorio() {




        $query = "";
        try {

            $query = "call personas_updateCompe(" . $this->PersonaId . ", '" . $this->Compensatorio . "' );
                    ";
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
            $e->SendErrorMessage($ex, "cpersonas.php - GuardarTotalCompensatorio", $query);
        }
        return false;
    }

    function DeleteCompensatorios(
    $cId) {

        $query = "";
        try {

            $query .="call personas_delCompe('" . $this->PersonaId . "', " . $cId . ");
                    ";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            $result = $db->execute();
            if ($result == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $e = new Errors();
                $e->SendErrorMessage(new Exception("Eliminar Compensatorio - Failed "), "cpersonas.php - DeleteCompensatorios", $query);
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - DeleteCompensatorios", $query);
        }
        return false;
    }

    function GetAllPersons()
    {
        
         $personas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_getAllPersons();";

            if ($db->setQuery($query))
                $personas = $db->ListArray();
            $db->CloseMysql();

            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - GetAllPersons", $query);
        }
        return null;
    }
    function Guardar() {
        $query = "";
        try {

            $query = "call personas_update(" . $this->PersonaId . ", '" . $this->Apellido . "', '" . $this->Nombre . "', '" . $this->Legajo . "', '" . $this->CargoDesc . "', " . $this->Categoria . ", '" . $this->Domicilio . "', '" . $this->Telefono . "', '" . $this->FechaNac . "', '" . $this->TipoDNI . "', '" . $this->DNI . "', " . $this->Activo . " , '" . $this->FechaIngreso . "');
                    ";/*
 $e = new Errors();
            $e->SendErrorMessage(new Exception("no inserta fecha de ingreso"), "cpersonas.php - Guardar", $query);
           */ $db = new sqlprovider();
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
            $e->SendErrorMessage($ex, "cpersonas.php - Guardar", $query);
        }
        return false;
    }

    function GuardarDesc() {




        $query = "";
        try {

            $o =$this->Observaciones;
            $query = "call personas_updateObs(" . $this->PersonaId . ",\"".$o."\"); ";
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
            $e->SendErrorMessage($ex, "cpersonas.php - GuardarDesc", $query);
        }
        return false;
    }

    function PrintMensual(
    $mes, $anio) {
        $personas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_printMensual(" . $mes . ", " . $anio . ");
                    ";
            if ($db->setQuery($query)) {
                $personas = $db->ListObject();
            }
            $db->CloseMysql();

            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - PrintMensual", $query);
        }
        return null;
    }

    function GetLicencias($anio) {
        $personas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_getLicencias(" . $anio . ");
                    ";
            if ($db->setQuery($query)) {
                $personas = $db->ListObject();
            }
            $db->CloseMysql();

            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - GetLicencias", $query);
        }
        return null;
    }

    function PrintAnual($anio) {
        $personas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_printAnual(" . $anio . ");
                    ";
            if ($db->setQuery($query))
                $personas = $db->ListObject(
                );
            $db->CloseMysql();

            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - PrintAnual", $query);
        }
        return null;
    }

    function PrintAnualById($anio, $personaId) {
        $personas = array()
        ;
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_printAnualById(" . $anio . ", " . $personaId . ");
                    ";
            if ($db->setQuery($query))
                $personas = $db->ListObject();
            $db->CloseMysql();

            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - PrintAnual", $query);
        }
        return null;
    }

    function ActualizarLic($anio) {
        $personas = array();

        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_updateLic(" . $anio . ");
                    ";
            if ($db->setQuery($query))
                $personas = $db->ListObject();
            $db->CloseMysql();


            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - PrintAnual", $query);
        }
        return null;
    }

    function SaveLicencias($licencias) {
        $query = "";

        $db = new sqlprovider();
        $db->getInstance();

        try {
            foreach ($licencias as $l) {
                $query = "call personas_saveLicencias(" . $l->Legajo . ",  " . $l->LicA . ", " . $l->LicAnt . ", " . $l->CP . ", " . $l->Total . ", '" . $l->Inicio . "', '" . $l->Fin . "');
                    ";

                $db->setQuery($query);
                if ($db->execute() != "1") {
                    $e = new Errors( );
                    $e->SendErrorMessage(new ErrorException("Error en Save - Licencias :" . $query), "cpersonas.php - SaveLicencias", $licencias);
                    $db->CloseMysql();
                    return false;
                }
            }

            return true;
        } catch (Exception $ex) {

            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - SaveLicencias:" . $query, $query);
        }
        $db->CloseMysql();
        return false;
    }

    function SaveArticulo() {
        $query = "";
        try {

            $query = "call personas_AddArt(" . $this->PersonaId . ", '" . $this->Fecha . "', " . $this->ArticuloId . ", " . $this->CantHoras . ");
                    ";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                /* $e = new Errors();
                  $e->SendErrorMessage(new Exception("depurando errores"), "personas.php - GrabarPersona", $query); */
                return true;
            } else {
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - Save", $query);
        }
        return false;
    }

    function BorrarArticulo() {
        $query = "";
        try {
            $query = "call personas_DelArt(" . $this->PersonaId . ", '" . $this->Fecha . "');
                    ";
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
            $e->SendErrorMessage($ex, "cpersonas.php - BorrarArticulo", $query);
        }
        return false;
    }

    function GetArticulos($mes, $anio) {
        $articulos = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_getArticulos(" . $this->PersonaId . ", " . $mes . ", " . $anio . ");
                    ";
            if ($db->setQuery($query)) {
                $articulos = $db->ListArray();
                /* $e = new Errors();
                  $e->SendErrorMessage(new Exception("testing datos"), "cpersonas.php - Search ". $query, $articulos); */
            }
            $db->CloseMysql();

            return $articulos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - Search", $query);
        }
        return null;
    }

    function Search() {
        $personas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_search(" . $this->PersonaId . ", " . $this->FirstName . ", " . $this->LastName . ", " . $this->Legajo . ", " . $this->Active . ");
                    ";
            if ($db->setQuery($query))
                $personas = $db->ListObject();
            $db->CloseMysql();
            /* $e = new Errors();
              $e->SendEr
              rorMessage(new Exception("update act"), "cpersonas.php - Save", $query); */
            return $personas;
        } catch (
        Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - Search", $query);
        }
        return null;
    }

    function GetByPersonaId($anio) {
        $personas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_getById(" . $this->PersonaId . ", " . $anio . ");
                    ";
            if ($db->setQuery($query)) {
                $personas = $db->ListObject();
            }
            $db->CloseMysql();
            /*  $e = new Errors();
              $e->SendErrorMessage(new Exception("testing"), "cpersonas.php - GetById", $personas); */
            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - GetById", $query);
        }
        return null;
    }

    function Insert() {

        $query = "";
        try {
            $this->Active = 1;
            $query = "call personas_insert(" . $this->FirstName . ", " . $this->LastName . ", " . $this->Legajo . ", " . $this->Celular . ", " . $this->ValorHoraExtra . ", " . $this->ValorHoraHabil . ", " . $this->ValorHoraInhabil . ", " . $this->Active . ");
                    ";
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
            $e->SendErrorMessage($ex, "cpersonas.php - Insert", $query);
        }
        return false;
    }

    function Delete() {

        $query = "";
        try {
            $query .="call personas_delete(" . $this->PersonaId . ");
                    ";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            $result = $db->execute();
            if ($result == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $e = new Errors();
                $e->SendErrorMessage(new Exception("Eliminar Persona - Failed"), "cpersonas.php - Delete", $query);
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - Delete", $query);
        }
        return false;
    }

    function GetAll() {
        $personas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_getAll();
                    ";

            if ($db->setQuery($query))
                $personas = $db->ListArray();
            $db->CloseMysql();

            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - Getall", $query);
        }
        return null;
    }

    function GetArtsDay() {
        $personas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call personas_getArtHoy();
                    ";

            if ($db->setQuery($query))
                $personas = $db->ListArray();
            $db->CloseMysql();

            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cpersonas.php - GetArtsDay", $query
            );
        }
        return null;
    }

}

?>
