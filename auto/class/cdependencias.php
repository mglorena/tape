<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of cdependencias
 *
 * @author root
 */
require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');
class Dependencias {
 //put your code here
            var $DependenciaId = 'NULL',
            $Nombre = '',
            $PadreId = 'NULL';

    function GetAll() {
        $dependencia = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call dependencia_getAll();";
//            echo $query;
            if ($db->setQuery($query))
                $dependencia = $db->ListArray();
            $db->CloseMysql();
            return $dependencia;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cdependencia.php - Search", $query);
        }
        return null;
    }

    function GetDropDown() {
        $select = "";
        try {
            $dependencias = $this->GetAll();
            $select = "<select id=\"ddlDependencia\" onclick=\"GetDependencia(this);\" >";
            $select.= "<option value='0' >Todos</option>";
            $selected ="";
            foreach ($dependencias as $t) {
                if($t['DependenciaId']=='9') $selected = "selected ";
                $select.= "<option value='" . $t['DependenciaId'] . "'".$selected." >" . $t['Nombre'] . "</option>";
                $selected ="";
            }
            $select.="</select>";
           
          
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cdependencia.php - Search", $select);
        }
        return $select;
    }

    
}

?>
