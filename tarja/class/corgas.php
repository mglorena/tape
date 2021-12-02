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

class Organizacion {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list
    public $DependenciaId = null;
    public $PadreId = null;
    public $Nombre = '';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            if ($value == null) {
                $this->$key = "NULL";
            } else {
                $this->$key = "'" . mysqli_real_escape_string($value) . "'";
            }
        }
    }

    function Guardar() {
        $query = "";
        try {

            $query = "call orgas_update(" . $this->DependenciaId . "," . $this->PadreId . ",
               " . $this->Nombre . ");";

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
            $e->SendErrorMessage($ex, "corgas.php - Guardar", $query);
        }
        return false;
    }

    function Search() {
        $orgas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call orgas_search(" . $this->DependenciaId . "," . $this->PadreId . "," . $this->Nombre . ");";
            if ($db->setQuery($query))
                $orgas = $db->ListObject();
            $db->CloseMysql();
            /* $e = new Errors();
              $e->SendErrorMessage(new Exception("update act"), "corgas.php - Save", $query); */
            return $orgas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "corgas.php - Search", $query);
        }
        return null;
    }

    function GetByDependenciaId() {
        $orgas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call orgas_getChilds(" . $this->DependenciaId . ");";
            if ($db->setQuery($query)) {
                $orgas = $db->ListArray();
            }
            $db->CloseMysql();
            /*  $e = new Errors();
              $e->SendErrorMessage(new Exception("testing"), "corgas.php - GetById", $orgas); */
            return $orgas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "corgas.php - GetByDependenciaId", $query);
        }
        return null;
    }

    function DeleteAll() {
        $query = "";
        try {

            $query = "call orgas_delAll();";
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
            $e->SendErrorMessage($ex, "corgas.php - DeleteAll", $query);
        }
        return false;
    }

    function Insert() {
        $query = "";
        try {

            $query = "call orgas_insert(".$this->DependenciaId.",'".$this->Nombre."',".$this->PadreId.");";
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
            $e->SendErrorMessage($ex, "corgas.php - DeleteAll", $query);
        }
        return false;
    }

    function AllowToDelete() {

        $query = "";
        try {
            $query .="call orgas_delete(" . $this->DependenciaId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            if ($db->setQuery($query)) {
                $orgas = $db->ListArray();
            }
            $db->CloseMysql();
            if ($orgas[0]['Used'] === '0' && $orgas[0]['UsedBy'] === '0') {
                return true;
            } else {
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "corgas.php - Delete", $query);
        }
        return false;
    }

    function GetAll() {
        $orgas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call orgas_getAll();";

            if ($db->setQuery($query))
            {  $orgas = $db->ListArray();}
            $db->CloseMysql();

            return $orgas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "corgas.php - Getall", $query);
        }
        return null;
    }

}
?>