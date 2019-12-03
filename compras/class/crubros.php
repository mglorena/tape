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

class Rubros {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list
    public $RubroId = null;
    
    var
            $Nombre = '',
            $PadreRubroId = '';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            if ($value == null) {
                $this->$key = "NULL";
            } else {
                $this->$key = "'" . mysql_real_escape_string($value) . "'";
            }
        }
    }

    function Guardar() {
        $query = "";
        try {

            $query = "call rubros_update(" . $this->RubroId . "," . $this->Nombre . ",
               " . $this->PadreRubroId . ");";

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
            $e->SendErrorMessage($ex, "crubros.php - Guardar", $query);
        }
        return false;
    }

    

    function Search() {
        $rubros = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call rubros_search(" . $this->RubroId . "," . $this->Nombre . ");";
            if ($db->setQuery($query))
                $rubros = $db->ListObject();
            $db->CloseMysql();
            /* $e = new Errors();
              $e->SendErrorMessage(new Exception("update act"), "crubros.php - Save", $query); */
            return $rubros;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "crubros.php - Search", $query);
        }
        return null;
    }

    function GetByRubroId() {
        $rubros = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call rubros_getById(" . $this->RubroId . ");";
            if ($db->setQuery($query)) {
                $rubros = $db->ListObject();
            }
            $db->CloseMysql();
            return $rubros;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "crubros.php - GetById", $query);
        }
        return null;
    }

   
    function Delete() {

        $query = "";
        try {
            $query .="call rubros_delete(" . $this->RubroId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            $result = $db->execute();
            if ($result == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $e = new Errors();
                $e->SendErrorMessage(new Exception("Eliminar Rubro - Failed"), "crubros.php - Delete", $query);
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "crubros.php - Delete", $query);
        }
        return false;
    }

    function GetAll() {
        $rubros = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call rubros_getAll();";

            if ($db->setQuery($query))
                $rubros = $db->ListArray();
            $db->CloseMysql();

            return $rubros;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "crubros.php - Getall", $query);
        }
        return null;
    }
    

}
?>