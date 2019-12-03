<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/tarja/class/cpersonas.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');

/**
 * Description of jornada
 *
 * @author root
 */
class Jornada extends Persona {

    //put your code here

    function LoadMes($mes, $anio) {
        $personas = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call jornada_getMes(" . $this->PersonaId . "," . $mes . "," . $anio . ");";
            if ($db->setQuery($query)) {
                $personas = $db->ListObject();
            }
            $db->CloseMysql();

            return $personas;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cjornada.php - LoadMes", $query);
        }
        return null;
    }

}

?>
