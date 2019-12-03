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

class Vehiculo {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list

            var $VehiculoId = 'NULL',
            $Modelo = '',
            $Patente = '',
            $CombustibleId = 'NULL',
            $Capacidad = '',
            $Fecha = 'NULL',
            $Descripcion = 'NULL',
            $ConsumoxKM = 'NULL',
            $Color = '',
            $TipoVehiculoId = 'NULL',
            $Kilometraje = 'NULL',
            $UserName = 'NULL',
            $Active = 'NULL';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            $this->$key = $value;
        }
    }

    function Search() {
        $vehiculos = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call vehiculos_search();";
//            echo $query;
            if ($db->setQuery($query))
                $vehiculos = $db->ListObject();
            $db->CloseMysql();
            return $vehiculos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cvehiculos.php - Search", $query);
        }
        return null;
    }

    function GetByVehiculoModelo() {
        $vehiculos = array();
        $query = "call vehiculos_getByModelo";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call vehiculos_getByModelo('" . $this->Modelo . "');";

            if ($db->setQuery($query)) {
                $vehiculos = $db->ListObject();
            }
            $db->CloseMysql();
            return $vehiculos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cvehiculos.php - GetByModelo", $query);
        }
        return null;
    }

    function GetByVehiculoId() {
        $vehiculos = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call vehiculos_getById(" . $this->VehiculoId . ");";
//            echo $query;
            if ($db->setQuery($query)) {
                $vehiculos = $db->ListObject();
            }
            $db->CloseMysql();
            return $vehiculos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cvehiculos.php - GetById", $query);
        }
        return null;
    }

    function UpdateKilometrajeRef() {
        $query = "";
        try {

            $query = "call vehiculos_updateKmRef();";
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
            $e->SendErrorMessage($ex, "cvehiculos.php - vehiculos_updateKmRef", $query);
        }
        return false;
    }

    function UpdateKilometraje() {
        $query = "";
        try {
            $query = "call vehiculos_updateKm(" . $this->VehiculoId . ",'" . $this->Kilometraje . "','" . $this->UserName . "');";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                $e = new Errors();
                $e->SendErrorMessage(new ErrorException("Error en Update Kilometraje - Vehiculos :" . $query), "cvehiculos.php - UpdateKilometraje", $query);
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cvehiculos.php - UpdateKilometraje:" . $query, $query);
        }
        return false;
    }

    function Save() {
        $query = "";
        try {
            $query = "call vehiculos_update(" . $this->VehiculoId . ",'" . $this->Modelo . "','" . $this->Patente . "',
            '" . $this->CombustibleId . "','" . $this->Capacidad . "','" . $this->Fecha . "','" . $this->Descripcion . "',
            '" . $this->ConsumoxKM . "','" . $this->Color . "'," . $this->TipoVehiculoId . "," . $this->Kilometraje . "," . $this->Active . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);

            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                $e = new Errors();
                $e->SendErrorMessage(new ErrorException("Error en Save - Vehiculos :" . $query), "cvehiculos.php - Save", $query);
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cvehiculosselect ;.php - Save:" . $query, $query);
        }
        return false;
    }

    function Insert() {

        $query = "";
        try {
            $this->Active = 1;
            $query = "call vehiculos_insert('" . $this->Modelo . "','" . $this->Patente . "',
            '" . $this->CombustibleId . "','" . $this->Capacidad . "','" . $this->Fecha . "','" . $this->Descripcion . "',
            '" . $this->ConsumoxKM . "','" . $this->Color . "'," . $this->TipoVehiculoId . "," . $this->Kilometraje . "," . $this->Active . ");";
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
            $e->SendErrorMessage($ex, "cvehiculos.php - Insert", $query);
        }
        return false;
    }

    function Delete() {

        $query = "";
        try {
            $query .="call vehiculos_delete(" . $this->VehiculoId . ");";
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
            $e->SendErrorMessage($ex, "cvehiculos.php - Delete", $query);
        }
        return false;
    }

    function FormatFecha() {
        return strftime($this->Fecha, "%d/%m/%Y");
    }

    function GetForMantenimiento() {
        $vehiculos = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call vehiculos_checkMantenimiento();";

            if ($db->setQuery($query))
                $vehiculos = $db->ListObject();
            $db->CloseMysql();
            return $vehiculos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cvehiculos.php -vehiculos_checkMantenimiento", $query);
        }
        return null;
    }

    function GetAll() {
        $vehiculos = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call vehiculos_getAll();";

            if ($db->setQuery($query))
                $vehiculos = $db->ListArray();
            $db->CloseMysql();
            return $vehiculos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cvehiculos.php - Getall", $query);
        }
        return null;
    }
 function GetAllWithTipo() {
        $vehiculos = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call vehiculos_getAllWithTipo();";

            if ($db->setQuery($query))
                $vehiculos = $db->ListArray();
            $db->CloseMysql();
            return $vehiculos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cvehiculos.php - getAllWithTipo", $query);
        }
        return null;
    }
    function GetVehiculosDispo($feI, $feF, $nump, $reId) {
        $vehiculos = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call vehiculos_getDisponibles('" . $feI . "','" . $feF . "'," . $nump . "," . $reId . ");";
            if ($db->setQuery($query))
                $vehiculos = $db->ListArray();
//              echo do_dump($vehiculos);
            $db->CloseMysql();
            return $vehiculos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cvehiculos.php - GetVehiculosDispo", $query);
        }
        return null;
    }

    function GetDropDown() {
        $vehiculos = $this->GetAll();
        $select = "<select id=\"ddlVehiculos\" >";
        $select.= "<option value='0'> ---------</option>";
        foreach ($vehiculos as $t) {
            $select.= "<option value='" . $t->VehiculoId . "'>" . $t->Modelo . "</option>";
        }
        $select.="</select>";
        //echo do_dump($select);
        return $select;
    }

    function GetDropDownDispo($feI, $feF, $nump, $reId) {
//        echo $feI;
        $vehiculos = $this->GetVehiculosDispo($feI, $feF, $nump, $reId);
        return $vehiculos;
//        echo do_dump($vehiculos);
       /* $select = "<select id=\"ddlVehiculos\" style=\"width:350px\" >";
        foreach ($vehiculos as $t) {
            $select.= "<option value='" . $t->VehiculoId . "'>" . $t->Modelo . "- " . $t->Capacidad . "</option>";
        }
        $select.="</select>";
        return $select;*/
    }

}

?>