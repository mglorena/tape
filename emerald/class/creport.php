<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Report
 *
 * @author root
 */
require_once '/var/www/html/tape/class/csqlprovider.php';
/*require_once '../class/cpgsqlprovider.php';*/
class Report {
    //put your code here
     var $Departamento = 'NULL', $Interno = '', $Centro = '',$Mes='NULL',$Anio='NULL';
            

    
    function ByDepartamento() {
        $reservas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();

            $query = "call emerald_byDepto(" . $this->Departamento. ",".$this->Mes.",".$this->Anio.");";
            /*$e = new Errors();
            $e->SendErrorMessage(new Exception("reporte por depto"), "creport.php - ByDepartamento", $query);*/
            if ($db->setQuery($query))
                $reservas = $db->ListArray();
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creport.php - ByDepartamento", $query);
        }
        return null;
    }
     function ByInterno() {
        $reservas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();

            $query = "call emerald_byInterno(" . $this->Departamento. ",".$this->Mes.",".$this->Anio.",".$this->Interno.");";
            /*$e = new Errors();
            $e->SendErrorMessage(new Exception("reporte por depto"), "creport.php - ByDepartamento", $query);*/
            if ($db->setQuery($query))
                $reservas = $db->ListArray();
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creport.php - emerald_byInterno", $query);
        }
        return null;
    }
     function ByTotal() {
        $reservas = array();
        $query = "";
        try {
            $db = new PSQLProvider();
            $query = "call emerald_ByTotalLlamadas(".$this->Mes.",".$this->Anio.");";
            
            if ($db->setQuery($query))
                $reservas = $db->ListArray();
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creport.php - emerald_ByTotalLlamadas", $query);
        }
        return null;
    }
     function ByTotalCosto() {
        $reservas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();

            $query = "call emerald_byTotalCosto(".$this->Mes.",".$this->Anio.");";
            if ($db->setQuery($query))
                $reservas = $db->ListArray();
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creport.php - emerald_byTotalCosto", $query);
        }
        return null;
    }
    function ByCentro() {
        $reservas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();

            $query = "call emerald_byCentro(" . $this->Centro. ",".$this->Mes.",".$this->Anio.");";
            /*$e = new Errors();
            $e->SendErrorMessage(new Exception("reporte por depto"), "creport.php - ByDepartamento", $query);*/
            if ($db->setQuery($query))
                $reservas = $db->ListArray();
            $db->CloseMysql();
            return $reservas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creport.php - ByCentro", $query);
        }
        return null;
    }
}

?>
