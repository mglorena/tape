<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of cinfo
 *
 * @author root
 */
require_once '/var/www/html/tape/class/csqlprovider.php';
require_once '/var/www/html/tape/class/cdump.php';

class Info {

    //put your code here

    function GetDepartamentos() {
        $dptos = array();

        try {
            $db = new sqlprovider();
            /* $db->dbname ="emerald22"; */
            $db->getInstance();

            $query = "call emerald_getDeptos();";
            if ($db->setQuery($query))
                $dptos = $db->ListArray();
            $db->CloseMysql();
            return $dptos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creport.php - GetDepartamentos", $query . "\n" . $linea);
        }
        return null;
    }

    function GetDeptoDropDown() {
        $dptos = $this->GetDepartamentos();
        $select = "<select id=\"ddlDepartamento\" >";
        foreach ($dptos as $t) {
            $select.= "<option value='" . $t['id_depto'] . "' >" . $t['NombreCompleto'] . "</option>";
        }
        $select.="</select>";
        return $select;
    }

    function GetCostos() {
        $dptos = array();

        try {
            $db = new sqlprovider();
            $db->getInstance();
            if ($db->setQuery("call emerald_getCentroCostos();"))
                $dptos = $db->ListArray();
            $db->CloseMysql();
            return $dptos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cinfo.php - GetCostos", $dptos);
        }
        return null;
    }

    function GetCostosDropDown() {
        $costos = $this->GetCostos();
        $select = "<select id=\"ddlCostos\" >";
        foreach ($costos as $c) {
            $select.= "<option value='" . $c['id_centro'] . "' >" . $c['nombre'] . "</option>";
        }
        $select.="</select>";
        return $select;
    }

    function GetByDepto($depto) {
        $dptos = array();
        $query = "";
        try {
            $db = new sqlprovider();
            $db->getInstance();

            $query = "call emerald_GetByDepto(" . $depto . ");";
            if ($db->setQuery($query))
                $dptos = $db->ListArray();
            $db->CloseMysql();
            return $dptos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "creport.php - GetByDepartamento", $query . "\n" . $linea);
        }
        return null;
    }

    function CargaMes($fp) {
        try {
            $ddn = 0.56;
            $ddi = 0.70;
            $local = 0.55;
            $cell = 0.335;
            $otro = 0.70;
            $usuario = Conf::BD_USER;
            $clave = Conf::BD_PASS;
            $url = Conf::BD_SERVER;
            $base = Conf::BD_NAME;
            $depa = "";
            $centro = "";
            $numint = "";
            $mes = null;
            $anio = null;
            $conexion = mysql_connect($url, $usuario, $clave);
            mysql_select_db($base, $conexion);
            mysql_query("delete from llamadas;", $conexion);
            while (!feof($fp)) {
                $linea = fgets($fp, 1024);
                $campo = explode(";", $linea);
                $campo[14] = substr_replace($campo[14], ".", -3, -2);
                $fec = explode("/", $campo[7]);
                if ($fec[2] < 100) {
                    $fec[2] = "20$fec[2]";
                };
                if($fec[2] == 20) break;
                $mes = $fec[1];
                $anio = $fec[2];
                $campo[7] = "$fec[2]" . '/' . "$fec[1]" . '/' . "$fec[0]";
                if ($numint != $campo[5]) {
                    if ($centro != $campo[3]) {
                        $query = "select id_centro from emerald2.centros where centrocosto='$campo[3]';";
                        $result = mysql_query($query, $conexion);
                        if (mysql_error()) {
/*                            $error = new Errors();*/
/*                            $error->SendMysqlErrorMessage(mysql_error(), "cinfo.php", "cargames - select centros", $query . "\n" . $linea);*/
                        } else {
                            if (!($centro1 = mysql_fetch_row($result))) {
                                mysql_query("insert into centros (centrocosto) values ('$campo[3]');", $conexion);
                                $result = mysql_query("select id_centro from emerald2.centros where centrocosto='$campo[3]';", $conexion);
                                $centro1 = mysql_fetch_row($result);
                                if (mysql_error()) {
/*                                    $error = new Errors();*/
/*                                    $error->SendMysqlErrorMessage(mysql_error(), "cinfo.php", "cargames - insert centros", $query . "\n" . $linea);*/
                                }
                            };
                        }
                        $centro = $campo[3];
                        $id_costo = $centro1[0];
                    };
                    if ($depa != $campo[2]) {
                        $query = "select id_depto from emerald2.departamentos where depto='$campo[2]';";
                        $result = mysql_query($query, $conexion);
                        if (mysql_error()) {
/*-                            $error = new Errors();*/
/*                            $error->SendMysqlErrorMessage(mysql_error(), "cinfo.php", "cargames - select deptos", $query . "\n" . $linea);*/
                        } else {
                            if (!($depa1 = mysql_fetch_row($result))) {
                                mysql_query("insert into emerald2.departamentos (depto) values ('$campo[2]');", $conexion);
                                $result = mysql_query("select id_depto from emerald2.departamentos where depto='$campo[2]';", $conexion);
                                $depa1 = mysql_fetch_row($result);
                                if (mysql_error()) {
/*                                    $error = new Errors();*/
/*                                    $error->SendMysqlErrorMessage(mysql_error(), "cinfo.php", "cargames - insert deptos", $query . "\n" . $linea);*/
                                }
                            };
                            $depa = $campo[2];
                            $id_depa = $depa1[0];
                        }
                    };
                    if ($campo[12] != "ENTRN") {
                        $query = "insert into emerald2.internos (interno,usuario,id_centro,id_depto,mes,anio) values ('$campo[5]','$campo[6]','$id_costo','$id_depa','$mes',$anio);";
                        mysql_query($query, $conexion);
                        if (mysql_error()) {
/*                            $error = new Errors();*/
                    /*        $error->SendMysqlErrorMessage(mysql_error(), "cinfo.php", "cargames - insert internos", $query . "\n" . $linea);*/
                        }
                        $numint = $campo[5];
                        //echo "$numint...ok ";
                    };
                };
                switch ($campo[12]) {
                    case "DDN";
                        $ivan = $campo[14] * $ddn;
                        break;
                    case "DDI";
                        $ivan = $campo[14] * $ddi;
                        break;
                    case "CELL";
                        $ivan = $campo[14] * $cell;
                        break;
                    case "LOCAL";
                        $ivan = $campo[14] * $local;
                        break;
                    default;
                        $ivan = $campo[14] * $otro;
                        break;
                };

                if ($campo[12] != "ENTRN") {
                    $query = "insert into emerald2.llamadas (interno,fecha,hora,tiempo,nromarcado,localidad,tipo,costo) values ($campo[5],'$campo[7]','$campo[8]','$campo[9]','$campo[10]','$campo[11]','$campo[12]',$campo[14]+$ivan);";
                    mysql_query($query, $conexion);
                    if (mysql_error()) {
/*                        $error = new Errors();*/
/*                        $error->SendMysqlErrorMessage(mysql_error(), "cinfo.php", "cargames - insert llamadas", $query . "\n" . $linea);*/
                    }
                };
            };

            $query = "call emerald_updateForCobro($anio,$mes);";
            mysql_query($query, $conexion);
            if (mysql_error()) {
/*                $error = new Errors();*/
/*                $error->SendMysqlErrorMessage(mysql_error(), "cinfo.php", "cargames - emerald_UpdateForCobro", $query . "\n" . $linea);*/
            }
            mysql_close($conexion);
        } catch (Exception $ex) {
            return false;
        }
        return true;
    }

    function GenerarInforme() {
        try {

            $usuario = Conf::BD_USER;
            $clave = Conf::BD_PASS;
            $url = Conf::BD_SERVER;
            $directorio = "/var/www/html/tape/emerald"; /* ubicaci�n del sistema dentro del servidor */
            $datos2 = "$directorio/datos";
            $base = Conf::BD_NAME;
            $conexion = mysql_connect($url, $usuario, $clave);
            mysql_select_db($base, $conexion);

            $q = "";
            $result = mysql_query("select interno,fecha,sec_to_time(sum(time_to_sec(tiempo))),sum(costo),count(interno) from emerald2.llamadas group by(interno);", $conexion);
            if (mysql_error()) {
/*                $error = new Errors();*/
/*                $error->SendMysqlErrorMessage(mysql_error(), "cinfo.php", "genera informe - select llamadas", $query . "\n" . $linea);*/
            }
            while ($llamada = mysql_fetch_row($result)) {

                $fecha = explode("-", $llamada[1]);
                $chivo = "$datos2/$llamada[0]$fecha[1]$fecha[0].txt";
                //echo"archivo a crear:    $chivo";
                $fp = fopen($chivo, "w");
                $q = fputs($fp, "=============================================================================\n");
                $q = fputs($fp, "====     INFORME DE LLAMADAS TELEFONICAS DEL INTERNO $llamada[0] DEL MES $fecha[1]/$fecha[0]     ====\n");
                $q = fputs($fp, "=============================================================================\n");
                $result1 = mysql_query("select usuario,id_centro,id_depto from emerald2.internos where interno='$llamada[0]' and mes='$fecha[1]' and anio='$fecha[0]';", $conexion);
                $inter = mysql_fetch_row($result1);
                $result2 = mysql_query("select centrocosto from emerald2.centros where id_centro='$inter[1]';", $conexion);
                $centro = mysql_fetch_row($result2);
                $result3 = mysql_query("select depto from emerald2.departamentos where id_depto='$inter[2]';", $conexion);
                $depa = mysql_fetch_row($result3);
                $result4 = mysql_query("select fecha,hora,tiempo,costo,tipo,nromarcado,localidad from emerald2.llamadas where interno='$llamada[0]';", $conexion);
                $q = fputs($fp, "Interno: $llamada[0]\nPertenece a: $inter[0]\nCentro de Costo: $centro[0]\nDepartamento: $depa[0]\n");
                $q = fputs($fp, "Dia    Hora      Tiempo    Costo  Tipo     Nro Marcado      Localidad   \n");
                $q = fputs($fp, "-----------------------------------------------------------------------------\n");
                while ($line = mysql_fetch_row($result4)) {
                    $fecha = explode("-", $line[0]);
                    $linea = "$fecha[2]   $line[1]   $line[2]   $line[3]   $line[4]       $line[5]      $line[6]\n";
                    $q = fputs($fp, $linea);
                    switch ($line[4]) {
                        case "DDN":
                            $tipocosto[0]+=$line[3];
                            $tipo[0] = "DDN";
                            break;
                        case "LOCAL":
                            $tipo[1] = "LOCAL";
                            $tipocosto[1]+=$line[3];
                            break;
                        case "CELL":
                            $tipo[2] = "CELL";
                            $tipocosto[2]+=$line[3];
                            break;
                        case "DDI":
                            $tipo[3] = "DDI";
                            $tipocosto[3]+=$line[3];
                            break;
                        default:
                            $tipo[4] = "OTROS";
                            $tipocosto[4]+=$line[3];
                            break;
                    };
                };
                $q = fputs($fp, "\n\nTiempo Total:  $llamada[2]\nCosto Total:  \$$llamada[3]\n");
                for ($j = 0; $j < 5; $j++) {
                    if ($tipocosto[$j] != "") {
                        $q = fputs($fp, "Total $tipo[$j]: $tipocosto[$j]\n");
                    };
                    $tipo[$j] = "";
                    $tipocosto[$j] = "";
                    $renglon++;
                };
                fclose($fp);
                mysql_query("update emerald2.internos set tiempo='$llamada[2]',costo='$llamada[3]',cantllam='$llamada[4]' where interno='$llamada[0]' and mes='$fecha[1]' and anio='$fecha[0]';", $conexion);
                if (mysql_error()) {
/*                    $error = new Errors();*/
/*                    $error->SendMysqlErrorMessage(mysql_error(), "cinfo.php", "genera informe - update internos", $query . "\n" . $linea);*/
                }
                //echo "generando $chivo ......";
                //echo 'listo<br>';
            };
            // echo '<h3>Todos los informes fueron generados</h3>';
            mysql_query("delete from emerald2.llamadas;", $conexion);

            mysql_close($conexion);
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    function Search($interno, $mes, $anio, $centro, $depto, $filtro) {
        $report = array();
        $query = "call emerald_search";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call emerald_search(" . $interno . "," . $mes . "," . $anio . "," . $centro . "," . $depto . "," . $filtro . ");";
            if ($db->setQuery($query)) {
                $report = $db->ListObject();
            }
            $db->CloseMysql();
            return $report;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cinfo.php - Search", $query . "\n" . $linea);
        }
        return null;
    }

}

?>
