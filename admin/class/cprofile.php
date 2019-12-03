<?php

require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');

class Profile {
   var $ProfileId = 'NULL',
    $Name = '',
    $Active= 'NULL';

    function Search() {
        $profiles = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call profile_search(".$this->ProfileId.",'".$this->Name."',".$this->Active.");";
           
            if ($db->setQuery($query))
                $profiles = $db->ListArray();
            
            $db->CloseMysql();
            return $profiles;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cprofiles.php - Search", $query);
        }
        return null;
    }
function ListHas($profileId) {
        $profiles = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call profile_listHas(".$profileId.");";
           
            if ($db->setQuery($query))
                $profiles = $db->ListArray();
            
            $db->CloseMysql();
            return $profiles;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cprofiles.php - Search", $query);
        }
        return null;
    }
    function ListNotHas($profileId) {
        $profiles = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call profile_listNotHas(".$profileId.");";
           
            if ($db->setQuery($query))
                $profiles = $db->ListObject();
            
            $db->CloseMysql();
            return $profiles;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cprofiles.php - Search", $query);
        }
        return null;
    }
    function GetByName() {
        $profiles = array();
        $query="call profile_getByName";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call profile_getByName('".$this->Name."');";

            if ($db->setQuery($query)) {
                $profiles = $db->ListObject();
            }
            $db->CloseMysql();
            return $profiles;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cprofiles.php - GetByName", $query);
        }
        return null;
    }

    function GetByProfileId() {
        $profiles = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call profile_getById(".$this->ProfileId.");";
//            echo $query;
            if ($db->setQuery($query)) {
                $profiles = $db->ListObject();
            }
            $db->CloseMysql();
//            echo do_dump($profiles);
            return $profiles;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cprofiles.php - GetByProfileId", $query);
        }
        return null;
    }

    function Save() {
        $query = "";
        try {
            $query = "call profile_update(".$this->ProfileId.",'".$this->Name."',".$this->Active.");";          
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1")
            {
                $db->CloseMysql();
                return true;
            }
            else
            {
                 $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cprofiles.php - Save", $query);
        }
        return false;
    }

    function Insert() {
     
        $query = "";
        try{
            
            $query = "call profile_insert('".$this->Name."',".$this->Active.");";          
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1")
            {
                $db->CloseMysql();
                return true;
            }
            else
            {
                 $db->CloseMysql();
                return false;
            }
       } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cprofiles.php - Insert", $query);
        }
        return false;
    }

    function Delete() {

       $query = "";
        try {
            $query ="call profile_delete(".$this->ProfileId .");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            
            if ($db->execute() == "1")
            {
                $db->CloseMysql();
                return true;
            }
            else
            {
                 $db->CloseMysql();
                return false;
            }
            
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cprofiles.php - Delete", $query);
        }
        return false;
  
}
}
?>
