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

class Articulo {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list
    var $ArticuloId = 'NULL',
            $Nombre = '',
            $Descripcion = '';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            $this->$key = $value;
        }
    }

    function GetAll() {
        $articulos = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call articulos_getAll();";

            if ($db->setQuery($query))
                $articulos = $db->ListArray();
            $db->CloseMysql();
            return $articulos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "carticulos.php - Getall", $query);
        }
        return null;
    }

}
?>