<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of cbienes
 *
 * @author root
 */
require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');

class Bienes {

    //put your code here

    var $PatrimonioId = 'NULL', $Inventario = 'NULL', $Responsable = '', $Descripcion = '', $DependenciaId = 'NULL',$Localizado='',$Baja='';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            $this->$key = $value;
        }
    }

    function Search($inv, $leg, $dep, $b) {
        $bienes = array();
        $query = "call patrimonio_search";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call patrimonio_search(" . $inv . "," . $leg . "," . $dep . "," . $b . ");";

            if ($db->setQuery($query)) {
                $bienes = $db->ListObject();
            }
            $db->CloseMysql();
            return $bienes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cbienes.php - Search", $query);
        }
        return null;
    }

    function GetAllLegs() {
        $bienes = array();
        $query = "call patrimonio_getAllResp";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call patrimonio_getAllResp();";

            if ($db->setQuery($query)) {
                $bienes = $db->ListArray();
            }
            $db->CloseMysql();
            return $bienes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cbienes.php - GetAllLegs", $query);
        }
        return null;
    }

    function GetAllDeps() {
        $bienes = array();
        $query = "call patrimonio_getAllDep";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call patrimonio_getAllDep();";

            if ($db->setQuery($query)) {
                $bienes = $db->ListArray();
            }
            $db->CloseMysql();
            return $bienes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cbienes.php - GetAllDeps", $query);
        }
        return null;
    }

    function Save($bienes) {
        $query = "";
        $db = new sqlprovider();
        $db->getInstance();
        try {
            foreach ($bienes as $b) {
               
                $query = "call patrimonio_update(" . $b->PatrimonioId . ",'" . $b->Localizado. "');";
                $db->setQuery($query);
                if ($db->execute() == "1") {
                    
                } else {

                    $e = new Errors();
                    $e->SendErrorMessage(new ErrorException("Error en Update - Patrimonio :" . $query), "cbienes.php - Save", $b);
                    $db->CloseMysql();
                    return false;
                }
            }
            return true;
        } catch (Exception $ex) {

            $e = new Errors();
            $e->SendErrorMessage($ex, "cbienes.php - Save:" . $query, $query);
        }
        $db->CloseMysql();
        return false;
    }

}

?>
