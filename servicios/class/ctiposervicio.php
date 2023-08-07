<?php

require_once ('../class/cerrors.php');
require_once ('../class/csqlprovider.php');
require_once ('../class/cdump.php');


class TipoServicio {

    //put your code here
            var $TipoServicioId = 'NULL',
            $Nombre = '',$CargoFijo='NULL',$ValorConsumo='NULL',$Unidad='';

    function GetAll() {
        $tiposervicio = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call tiposervicio_getAll();";
            if ($db->setQuery($query))
                $tiposervicio = $db->ListObject();
            $db->CloseMysql();
            return $tiposervicio;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "ctiposervicio.php - Search", $query);
        }
        return null;
    }

    function GetDropDown() {
        $tiposervicios = $this->GetAll();
        $select = "<select id=\"ddlTipoServicio\" >";
        $select.= "<option value='0' >Todos</option>";
        
        foreach ($tiposervicios as $t) {
                $select.= "<option value='" . $t->TipoServicioId . "' >" . $t->Nombre . "</option>";
        }
        $select.="</select>";
        return $select;
    }
    
    function GetDataServicio($t)
    {
          $tservicio = array();
        $query = "call servicios_getDataType";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call servicios_getDataType(" . $t. ");";

            if ($db->setQuery($query)) {
                $tservicio = $db->ListObject();
            }
            $db->CloseMysql();
            return $tservicio;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "ctiposervicio.php - GetDataServicio", $query);
        }
        return null;
        
    }

}

?>
