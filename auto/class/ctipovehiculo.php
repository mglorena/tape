<?php

require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');

class TipoVehiculo {

    //put your code here
            var $TipoVehiculoId = 'NULL',
            $Nombre = '',
            $ValorPeajexKm = 'NULL';

    function GetAll() {
        $tipovehiculo = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call tipovehiculo_getAll();";
//            echo $query;
            if ($db->setQuery($query))
                $tipovehiculo = $db->ListArray();
            $db->CloseMysql();
            return $tipovehiculo;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "ctipovehiculo.php - Search", $query);
        }
        return null;
    }

    function GetDropDown() {
        $select = "";
        try {
            $tipovehiculos = $this->GetAll();
            $select = "<select id=\"ddlTipoVehiculo\" >";
            $select.= "<option value='0' >Todos</option>";
            
            foreach ($tipovehiculos as $t) {
                $select.= "<option value='" . $t['TipoVehiculoId'] . "' >" . $t['Nombre'] . "</option>";
            }
            $select.="</select>";
           
          
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "ctipovehiculo.php - Search", $select);
        }
        return $select;
    }

    function GetCombustibles() {
        $comb = array();
        try {
            $db = new sqlprovider();
            $db->getInstance();
            if ($db->setQuery("call combustible_getAll();"))
                $comb = $db->ListArray();
            $db->CloseMysql();
            return $comb;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "ctipovehiculo.php - GetCombustibles", "call combustible_getAll();");
        }
        return null;
    }

}

?>
