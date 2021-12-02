<?php
require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');

class Users {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list
    var $UserId = 'NULL',
            $FirstName = '',
            $LastName = '',
            $UserName = '',
            $Email = '',
            $ProfileId = 'NULL',
            $Profile = 'NULL',
            $Password = 'NULL',
            $Active = 'NULL';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            $this->$key = $value;
        }
    }

    function Search() {
        $users = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call users_search(" . $this->UserId . ",'" . $this->UserName . "','" . $this->FirstName . "','" . $this->LastName . "','" . $this->Email . "'," . $this->ProfileId . "," . $this->Active . ");";
            if ($db->setQuery($query))
                $users = $db->ListArray();
            $db->CloseMysql();

            return $users;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cusers.php - Search", $query);
        }
        return null;
    }

    function GetByUserName() {
        $users = array();
        $query = "call users_GetByUserName";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call users_GetByUserName('" . $this->UserName . "');";

            if ($db->setQuery($query)) {
                $users = $db->ListObject();
            }
            $db->CloseMysql();
            return $users;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cusers.php - GetByUserName", $query);
        }
        return null;
    }

    function GetByUserId() {
        $users = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call users_GetById(" . $this->UserId . ");";
            if ($db->setQuery($query)) {
                $users = $db->ListObject();
            }
            $db->CloseMysql();
            return $users;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cusers.php - GetByUserId", $query);
        }
        return null;
    }

    function Save() {
        $query = "";
        try {
            $query = "call users_update('" . $this->UserName . "','" . $this->Email . "','" . $this->FirstName . "','" . $this->LastName . "'," . $this->ProfileId . "," . $this->Active . "," . $this->UserId . ",'" . $this->Password . "');";
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
            $e->SendErrorMessage($ex, "cusers.php - Save", $query);
        }
        return false;
    }

    function Insert() {

        $query = "";
        try {
            $this->Active = 1;
            $query = "call users_insert('" . $this->FirstName . "','" . $this->LastName . "','" . $this->UserName . "','" . $this->Email . "','" . $this->ProfileId . "'," . $this->Active . ");";
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
            $e->SendErrorMessage($ex, "cusers.php - Insert", $query);
        }
        return false;
    }

    function Delete() {

        $query = "";
        try {
            $query .="call users_delete(" . $this->UserId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            $result = $db->execute();
            if ($result == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $e = new Errors();
                $e->SendErrorMessage(new Exception("Eliminar usuario - Failed"), "cusers.php - Delete", $query);
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cusers.php - Delete", $query);
        }
        return false;
    }

    function GetAll() {
        $users = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call users_getAll();";

            if ($db->setQuery($query))
                $users = $db->ListArray();
            $db->CloseMysql();
            return $users;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cusers.php - Getall", $query);
        }
        return null;
    }

}
?>