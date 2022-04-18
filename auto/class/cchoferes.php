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

class Chofer {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list
            var $ChoferId = 'NULL',
            $FirstName = '',
            $LastName = '',
            $Legajo = 'NULL',
            $Celular = '',
            $ValorHoraInhabil = 0,
            $ValorHoraHabil = 0,
            $ValorHoraExtra = 0,
            $Licencia1 = 'NULL',
            $Licencia2 = 'NULL',
            $Licencia3 = 'NULL',
            $Active = 'NULL';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            $this->$key = $value;
        }
    }

    function GetHoraExtra($type, $choferId) {
        $choferes = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call choferes_horaExtra(" . $type . "," . $choferId . ");";

            if ($db->setQuery($query))
                $choferes = $db->ListObject();
            $db->CloseMysql();
            return $choferes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cchoferes.php - choferes_horaExtra", $query);
        }
        return null;
    }

    function Search() {
        $choferes = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call choferes_search(" . $this->ChoferId . ",'" . $this->FirstName . "','" . $this->LastName . "'," . $this->Legajo . "," . $this->Active . ");";
            if ($db->setQuery($query))
                $choferes = $db->ListObject();
            $db->CloseMysql();
            /* $e = new Errors();
              $e->SendErrorMessage(new Exception("update act"), "cchoferes.php - Save", $query); */
            return $choferes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cchoferes.php - Search", $query);
        }
        return null;
    }

    function Search2() {
        $choferes = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call choferes_search(" . $this->ChoferId . ",'" . $this->FirstName . "','" . $this->LastName . "','" . $this->Legajo . "'," . $this->Active . ");";
            if ($db->setQuery($query)) {
                $choferes = $db->ListObject2();
                $db->CloseMysql();
            }
            return $choferes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cchoferes.php - Search", $query);
        }
        return null;
    }

    function GetByChoferName() {
        $choferes = array();
        $query = "call choferes_getByName";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call choferes_getByName('" . $this->FirstName . "','" . $this->LastName . "');";

            if ($db->setQuery($query)) {
                $choferes = $db->ListObject();
            }
            $db->CloseMysql();
            return $choferes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cchoferes.php - GetByName", $query);
        }
        return null;
    }

    function GetByChoferId() {
        $choferes = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call choferes_getById(" . $this->ChoferId . ");";
            if ($db->setQuery($query)) {
                $choferes = $db->ListObject();
            }
            $db->CloseMysql();
            return $choferes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cchoferes.php - GetById", $query);
        }
        return null;
    }

    function Save() {
        $query = "";
        try {
            $query = "call choferes_update(" . $this->ChoferId . ",'" . $this->FirstName . "','" . $this->LastName . "','" . $this->Legajo . "','" . $this->Celular . "'," . $this->ValorHoraExtra . "," . $this->ValorHoraHabil . "," . $this->ValorHoraInhabil . "," . $this->Active . ");";
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
            $e->SendErrorMessage($ex, "cchoferes.php - Save", $query);
        }
        return false;
    }

    function Insert() {

        $query = "";
        try {
            $this->Active = 1;
            $query = "call choferes_insert('" . $this->FirstName . "','" . $this->LastName . "','" . $this->Legajo . "','" . $this->Celular . "','" . $this->ValorHoraExtra . "','" . $this->ValorHoraHabil . "','" . $this->ValorHoraInhabil . "'," . $this->Active . ");";
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
            $e->SendErrorMessage($ex, "cchoferes.php - Insert", $query);
        }
        return false;
    }

    function Delete() {

        $query = "";
        try {
            $query .="call choferes_delete(" . $this->ChoferId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            $result = $db->execute();
            if ($result == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $e = new Errors();
                $e->SendErrorMessage(new Exception("Eliminar Chofer - Failed"), "cchoferes.php - Delete", $query);
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cchoferes.php - Delete", $query);
        }
        return false;
    }

    function GetAll() {
        $choferes = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call choferes_getAll();";

            if ($db->setQuery($query))
                $choferes = $db->ListArray();
            $db->CloseMysql();
            return $choferes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cchoferes.php - Getall", $query);
        }
        return null;
    }

    function GetDisponibles($feI, $feF, $reId) {
        $choferes = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call choferes_getDisponibles('" . $feI . "','" . $feF . "'," . $reId . ");";
            if ($db->setQuery($query))
                $choferes = $db->ListArray();
            $db->CloseMysql();
            return $choferes;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cchoferes.php - GetDisponibles", $query);
        }
        return null;
    }

    function GetDropDown($choferesIds) {
        $choferes = $this->GetAll();

        $select = "<select id=\"ddlChoferes\" name=\"ddlchoferes\" >";
        $select.= "<option value='0'>-------</option>";
        foreach ($choferes as $ch) {
            $select.= "<option value='" . $ch->ChoferId . "' " . $sel . ">" . $ch->FirstName . "</option>";
        }
        $select.="</select>";
        return $select;
    }

    function GetChoferDispo($choferesIds, $feI, $feF, $reId) {
        $choferes = $this->GetDisponibles($feI, $feF, $reId);
        $chs = explode(",", $choferesIds);
        $select = "<select id=\"ddlChoferes\" multiple=\"multiple\" name=\"nlchoferes\" size=\"5\">";
        $sel = "";
        foreach ($choferes as $ch) {
            foreach ($chs as $c) {
                if ($ch->ChoferId == $c) {
                    $sel = "selected = \"selected\"";
                    break;
                }
                else
                    $sel = "";
            }
            $select.= "<option value='" . $ch->ChoferId . "' " . $sel . ">" . $ch->FirstName . "</option>";
        }
        $select.="</select>";
        return $select;
    }

}
?>