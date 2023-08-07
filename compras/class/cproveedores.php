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

class Proveedor {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list
    public $ProveedorId = null;
    var
            $RazonSocial = '',
            $Domicilio = '', $RubrosIds = '', $Observaciones = '', $Fecha = 'NULL',
            $Telefono = '', $CUIT = '', $Celular = '', $PersonaContacto = 'NULL', $Provincia = '', $Localidad = '',
            $Email = '', $Active = 'NULL';

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

            $query = "call proveedores_update(" . $this->ProveedorId . "," . $this->RazonSocial . ",
               " . $this->Domicilio . "," . $this->Observaciones . ",
               " . $this->CUIT . "," . $this->Celular . "," . $this->Telefono . "," . $this->Email . "," . $this->PersonaContacto . ","
                    . $this->Active . "," . $this->RubrosIds . "," . $this->Provincia . "," . $this->Localidad . ");";
            /* $e = new Errors();
              $e->SendErrorMessage(new Exception("Guardar mail automatico no hay error aun"), "cproveedores.php - guardar", $query); */
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
            $e->SendErrorMessage($ex, "cproveedores.php - Guardar", $query);
        }
        return false;
    }

    function Search() {
        $proveedores = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();

            $query = "call proveedores_search(" . $this->ProveedorId . ",'" . $this->RazonSocial . "','" . $this->Rubros . "','" . $this->Domicilio . "');";

            /*$e = new Errors();
            $e->SendErrorMessage(new Exception("Que query"), "cproveedores.php - guardar", $query);*/
            if ($db->setQuery($query)) {
                $proveedores = $db->ListObject();
            }
            $db->CloseMysql();
            return $proveedores;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cproveedores.php - Search", $query);
        }
        return null;
    }

    function RubrosGetAll() {
        $proveedores = array();
        try {
            $db = new sqlprovider();
            $db->getInstance();
            if ($db->setQuery("call proveedores_rubrosGetAll();")) {
                $proveedores = $db->ListArray();
            }
            $db->CloseMysql();

            return $proveedores;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cproveedores.php - RubrosGetAll", $proveedores);
        }
        return null;
    }

    function GetByProveedorId($anio) {
        $proveedores = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call proveedores_getById(" . $this->ProveedorId . "," . $anio . ");";
            if ($db->setQuery($query)) {
                $proveedores = $db->ListObject();
            }
            $db->CloseMysql();
            /*  $e = new Errors();
              $e->SendErrorMessage(new Exception("testing"), "cproveedores.php - GetById", $proveedores); */
            return $proveedores;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cproveedores.php - GetById", $query);
        }
        return null;
    }

    function Delete() {

        $query = "";
        try {
            $query .="call proveedores_delete(" . $this->ProveedorId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            $result = $db->execute();
            if ($result == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $e = new Errors();
                $e->SendErrorMessage(new Exception("Eliminar Persona - Failed"), "cproveedores.php - Delete", $query);
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cproveedores.php - Delete", $query);
        }
        return false;
    }

    function GetAll() {
        $proveedores = array();

        try {
            $db = new sqlprovider();
            $db->getInstance();
            if ($db->setQuery("call proveedores_getAll();")) {
                $proveedores = $db->ListArray();
            }
            $db->CloseMysql();

            return $proveedores;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cproveedores.php - Getall", $proveedores);
        }
        return null;
    }

}
