<?php

/*
 * Created on 14/11/2011
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
require_once ('cerrors.php');
require_once ('csqlprovider.php');
require_once ('cdump.php');

class User {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list

    var $UserId = 'NULL',
            $UserName = '',
            $Password = '',
            $FirstName = '',
            $LastName = '',
            $Salt = '',
            $ProfileId = 'NULL',
            $Email = '',
            $Active = 'NULL';

    // Next come all our methods with their argument lists
    // The syntax for these is just like normal PHP functions
    // Remember, this is just a skeleton, we will fill in these functions later

    function GetRulesByUser($username) {

        $rules = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();

            $query = "call users_getRules('" . $username . "');";
            if ($db->setQuery($query))
                $rules = $db->ListArray();
            $db->CloseMysql();

            return $rules;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cusers.php - GetRulesByUser", $query);
        }
        return null;
    }

// End registerUser()

    function verifyPassword() {
        $usuarios = $this->GetByUserName();
        $user = $usuarios['0'];

        if ($user->UserName != "") {
            if ($user->Password === hash('sha512', $user->Salt . $this->Password) && $this->UserName == $user->UserName) {
                return "Ok";
            } else
                return "Password incorrecto ";
        }
        else {
            return "Usuario inexistente";
        }
    }

// End verifyPassword()

    function changePassword($newpassword) {
        
    }

// End changePassword()

    function displayUserInfo() {
        
    }

// End displayUserInfo()

    function queryString() {

        $query .="(";
        if (isset($this->UserName))
            $query .=" ( UserName Like '%" . $this->UserName . "')";
        if (isset($this->FirstName))
            $query .=" OR ( FirstName Like '%" . $this->FirstName . "')";
        if (isset($this->LastName))
            $query .=" OR ( LastName Like '%" . $this->LastName . "')";
        if (isset($this->Email))
            $query .=" OR ( Email Like '%" . $this->Email . "')";
        if (isset($this->ProfileId))
            $query .=" OR ( ProfileId =" . $this->ProfileId . ")";
        if (isset($this->UserId))
            $query .=" OR ( UserId =" . $this->UserId . ")";
        $query .=");";

        if ($query != "();")
            $query = " AND " . $query;
        else
            $query = "";
        return $query;
    }

    function Search() {
        $usuarios = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call users_search(" . $this->UserId . ",'" . $this->UserName . "','" . $this->FirstName . "','" . $this->LastName . "','" . $this->Email . "'," . $this->ProfileId . "," . $this->Active . ");";
            if ($db->setQuery($query))
                $usuarios = $db->ListObject();
            $db->CloseMysql();
            return $usuarios;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cusers.php - Search", $query);
        }
        return null;
    }

    function GetByUserName() {
        $usuarios = array();
        $query = "call users_getByUserName";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call users_getByUserName('" . $this->UserName . "');";

            if ($db->setQuery($query)) {
                $usuarios = $db->ListObject();
            }

            $db->CloseMysql();
            return $usuarios;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cusers.php - GetByUserName", $query);
        }
        return null;
    }

    function GetByUserId() {
        $usuarios = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call users_getByUserId(" . $this->UserId . ");";
            if ($db->setQuery($query)) {
                $usuarios = $db->ListObject();
            }
            $db->CloseMysql();
            return $usuarios;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cusers.php - GetByUserId", $query);
        }
        return null;
    }

    function Save() {
        $query = "";
        try {
            $query = "call users_updateUser('" . $this->UserName . "','" . $this->Email . "','" . $this->FirstName . "','" . $this->LastName . "'," . $this->ProfileId . "," . $this->Active . "," . $this->UserId . ");";
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
            $this->ProfileId = 2;
            $this->Active = 0;
            $query = "call users_insertUser('" . $this->UserName . "','" . $this->Email . "','" . $this->FirstName . "','" . $this->LastName . "','" . $this->Password . "'," . $this->ProfileId . "," . $this->Active . ");";
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
            $query .="call users_deleteUser(" . $this->UserId . ");";
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
            $e->SendErrorMessage($ex, "cusers.php - Delete", $query);
        }
        return false;
    }

}

?>