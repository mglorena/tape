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

class Boletin {

    // Next comes the variable list as defined above
    // Note the key word 'var' and then a comma-separated list
    public $BoletinId = null;
    public $Nombre = null;
    var
            $LastResNumber = '', $LastLastResNumber = '', $Fecha = '', $Length = '', $Url = 'NULL', $Folder = '';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            if ($value == null) {
                $this->$key = "NULL";
            } else {
                $this->$key = "'" . mysqli_real_escape_string($value) . "'";
            }
        }
    }

    function GetByBoletinId() {
        $boletin = array();
        $query = "call boletin_getById(" . $this->BoletinId . ");";
        try {
            $db = new sqlprovider();
            $db->getInstance();

            if ($db->setQuery($query)) {
                $boletin = $db->ListObject();
            }
            $db->CloseMysql();
            /*  $e = new Errors();
              $e->SendErrorMessage(new Exception("testing"), "cpersonas.php - GetById", $personas); */
            return $boletin;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cboletin.php - GetByBoletinId", $query);
        }
        return null;
    }

    function UpdateResolucion($ult, $len) {

        $query = "";
        try {

            $query = "call boletin_updateRes(" . $this->BoletinId . ",'" . $ult . "'," . $len . ");";
            echo $query;
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
            echo "error db";
            $e = new Errors();
            $e->SendErrorMessage($ex, "cboletin.php - UpdateResolucion", $query);
        }
        return false;
    }

    function GetLinksResos() {

        try {

            $anio = date("Y");
            $bo = $this->GetByBoletinId()[0];
            $html = "<div style='padding:3px'><b>" . $bo->Nombre . "</b><br/>";
            if ($bo) {
                $ultima_dia = $bo->LastResNumber; //"0549";
                $ultimaultima_dia = $bo->LastLastResNumber; //"0549";
                $folder = $bo->Folder;
                $url = $bo->Url . "R" . $anio . "/";
                $nreslast = $ultima_dia + 0;
                $nres = $ultimaultima_dia + 0;
                $c = 0;
                while ($nres <= $nreslast && $c < 24) {

                    $archivo = $url . "R-" . strtoupper($folder) . "-" . $anio . "-" . sprintf("%04d", $nreslast) . ".pdf";
                    $html .="<br/><a href='" . $archivo . "'>" . "R-" . strtoupper($folder) . "-" . $anio . "-" . sprintf("%04d", $nreslast) . "</a>";
                    $nreslast = $nreslast - 1;
                    $c++;
                }
                return $html;
            } else {
                return null;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cboletin.php - GetLinksResos", $this);
        }
        return null;
    }

}
?>