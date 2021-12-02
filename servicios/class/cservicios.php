<?php

/*
 * Created on 14/11/2011
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
require_once ('../class/cerrors.php');
require_once ('../class/csqlprovider.php');
require_once ('../class/cdump.php');

class Servicio {

// Next comes the variable list as defined above
// Note the key word 'var' and then a comma-separated list

    var $ServicioId = 'NULL',
            $Medidor = '',
            $Usuario = '',
            $Mes = '',
            $Anio = 'NULL',
            $Medicion = 'NULL',
            $CargoFijo = 'NULL',
            $TipoServicioId = 'NULL';

    function SearchComplejo($mes, $anio, $type) {
        $servicios = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call servicios_search(" . $mes . "," . $anio . "," . $type . ");";
//            echo $query;
            if ($db->setQuery($query))
                $servicios = $db->ListObject();
            $db->CloseMysql();
            return $servicios;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cservicios.php - Search", $query);
        }
        return null;
    }

    function Search($mes, $anio, $type) {
        $servicios = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call servicios_search(" . $mes . "," . $anio . "," . $type . ");";
//            echo $query;
            if ($db->setQuery($query))
                $servicios = $db->ListObject();
            $db->CloseMysql();
            return $servicios;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cservicios.php - Search", $query);
        }
        return null;
    }

    function ReporteSave($mes, $anio, $type) {

        $servicios = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call servicios_reporte(" . $mes . "," . $anio . "," . $type . ");";
            $db->setQuery($query);

            if (is_null($db->execute())) {
//            $n ="/var/www/html/tape/servicios/class/servocops.txt";
//            $ar =fopen($n,"a");
//            fputs($ar,"hubo errhor\n". $query);
//            fclose($ar);

                $e = new Errors();
                $e->SendErrorMessage(new ErrorException("Error en Save - ReporteSave :" . $query), "cservicios.php - ReporteSave", $db->execute());
                $db->CloseMysql();
                return false;
            }
            return true;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cservicios.php - ReporteSave", $query);
            return false;
        }
    }

    function Reporte($mes, $anio, $type) {
        $servicios = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call servicios_getReporte(" . $mes . "," . $anio . "," . $type . ");";
//            echo $query;
            if ($db->setQuery($query)) {
                $servicios = $db->ListObject();
            }
            $db->CloseMysql();
            return $servicios;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cservicios.php - Reporte", $query);
        }
        return null;
    }

    function ReporteAnual($anio, $type) {
        $servicios = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call servicios_getReporteAnual(" . $anio . "," . $type . ");";
//            echo $query;
            if ($db->setQuery($query)) {
                $servicios = $db->ListObject();
            }
            $db->CloseMysql();
            return $servicios;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cservicios.php - Reporte", $query);
        }
        return null;
    }

    function Grafico($anio, $type) {
        $servicios = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call servicios_grafico(" . $anio . "," . $type . ");";

            if ($db->setQuery($query))
                $servicios = $db->ListObject();
            $db->CloseMysql();
            return $servicios;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cservicios.php - Reporte", $query);
        }
        return null;
    }

    function GraficoComplejo($anio) {
        $servicios = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call servicios_graficoCom(" . $anio . ");";

            if ($db->setQuery($query)) {
                $servicios = $db->ListObject();
            }
            $db->CloseMysql();
            return $servicios;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cservicios.php - GraficoComplejo", $query);
        }
        return null;
    }

    function Save($servicio, $t, $m, $a) {
        $query = "";
        $db = new sqlprovider();
        $db->getInstance();

        try {

$n ="/var/www/html/tape/servicios/class/servocops.txt";
                    $ar =fopen($n,"a");
            foreach ($servicio as $s) {
                if (is_null($s->Medicion) || $s->Medicion === "") {
                    $s->Medicion = 0;
                }
                $query = "call servicios_update(" . $s->ServicioId . "," . $s->Medicion . "," . $s->Mes . "," . $s->Anio . "," . $t . ");";
                $db->setQuery($query);
//                $r = $db->execute();
                fputs($ar,"Se ejecuto : ". $query."\n");
		fputs($ar,"Resultado : ". $db->execute()."\n");
                if (is_null($db->setQuery($query))) {
                    
                    
                    fputs($ar,"hubo error\n");
                    
                    $e = new Errors();
                    $e->SendErrorMessage(new ErrorException("Error en Save - Servicios :" . $query), "cservicios.php - Save", $s);
                    $db->CloseMysql();
                    return false;
                }
            }
fclose($ar);
/*            if ($this->ReporteSave($m, $a, $t)) {
                return true;
            } else {
                $error = new Errors();
                $error->SendErrorMessage(new Exception("No se actualizo el reporte"), "servicios.php - SaveServicio", $s);
                return false;
            }*/
            return true;
        } catch (Exception $ex) {

            $e = new Errors();
            $e->SendErrorMessage($ex, "cserviciosselect ;.php - Save:" . $query, $query);
        }
        $db->CloseMysql();
        return false;
    }

}

?>
             