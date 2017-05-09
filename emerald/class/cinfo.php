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
require_once '/var/www/tape/class/csqlprovider.php';
require_once '/var/www/tape/class/cdump.php';

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
            $select .= "<option value='" . $t['id_depto'] . "' >" . $t['NombreCompleto'] . "</option>";
        }
        $select .= "</select>";
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
            $select .= "<option value='" . $c['id_centro'] . "' >" . $c['nombre'] . "</option>";
        }
        $select .= "</select>";
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
            $ddn = 0.335;
            $ddi = 0.335;
            $local = -0.21;
            $cell = 0.335;
            $otro = 0.1244;
            $usuario = Conf::BD_USER;
            $clave = Conf::BD_PASS;
            $url = Conf::BD_SERVER;
            $base = Conf::BD_NAME;
            $depa = "";
            $centro = "";
            $numint = "";
            $mes = null;
            $anio = null;
            $conexion = mysqli_connect($url, $usuario, $clave);
            mysqli_select_db($base, $conexion);
            //mysqli_query(, );
            mysqli_query($conexion, "delete from llamadas;");
            while (!feof($fp)) {
                $linea = fgets($fp, 1024);
                $campo = explode(";", $linea);
                $campo[14] = substr_replace($campo[14], ".", -3, -2);
                $fec = explode("/", $campo[7]);
                if ($fec[2] < 100) {
                    $fec[2] = "20$fec[2]";
                };
                if ($fec[2] == 20)
                    break;
                $mes = $fec[1];
                $anio = $fec[2];
                $campo[7] = "$fec[2]" . '/' . "$fec[1]" . '/' . "$fec[0]";
                if ($numint != $campo[5]) {
                    if ($centro != $campo[3]) {
                        $query = "select id_centro from emerald2.centros where centrocosto='$campo[3]';";
                        $result = mysqli_query($conexion, $query);
                        if (mysqli_error($conexion)) {
                            $error = new Errors();
                            $error->SendMysqlErrorMessage(mysqli_error($conexion), "cinfo.php", "cargames - select centros", $query . "\n" . $linea);
                        } else {
                            if (!($centro1 = mysqli_fetch_row($result))) {
                                mysqli_query($conexion, "insert into centros (centrocosto) values ('$campo[3]');");
                                $result = mysqli_query($conexion, "select id_centro from emerald2.centros where centrocosto='$campo[3]';");
                                $centro1 = mysqli_fetch_row($result);
                                if (mysqli_error($conexion)) {
                                    $error = new Errors();
                                    $error->SendMysqlErrorMessage(mysqli_error($conexion), "cinfo.php", "cargames - insert centros", $query . "\n" . $linea);
                                }
                            };
                        }
                        $centro = $campo[3];
                        $id_costo = $centro1[0];
                    };
                    if ($depa != $campo[2]) {
                        $query = "select id_depto from emerald2.departamentos where depto='$campo[2]';";
                        $result = mysqli_query($conexion, $query);
                        if (mysqli_error($conexion)) {
                            $error = new Errors();
                            $error->SendMysqlErrorMessage(mysqli_error($conexion), "cinfo.php", "cargames - select deptos", $query . "\n" . $linea);
                        } else {
                            if (!($depa1 = mysqli_fetch_row($result))) {
                                mysqli_query($conexion, "insert into emerald2.departamentos (depto) values ('$campo[2]');");
                                $result = mysqli_query($conexion, "select id_depto from emerald2.departamentos where depto='$campo[2]';");
                                $depa1 = mysqli_fetch_row($result);
                                if (mysqli_error($conexion)) {
                                    $error = new Errors();
                                    $error->SendMysqlErrorMessage(mysqli_error($conexion), "cinfo.php", "cargames - insert deptos", $query . "\n" . $linea);
                                }
                            };
                            $depa = $campo[2];
                            $id_depa = $depa1[0];
                        }
                    };
                    if ($campo[12] != "ENTRN") {
                        $query = "insert into emerald2.internos (interno,usuario,id_centro,id_depto,mes,anio) values ('$campo[5]','$campo[6]','$id_costo','$id_depa','$mes',$anio);";
                        mysqli_query($conexion, $query);
                        if (mysqli_error($conexion)) {
                          //  $error = new Errors();
                          //  $error->SendMysqlErrorMessage(mysqli_error($conexion), "cinfo.php", "cargames - insert internos", $query . "\n" . $linea);
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
                    mysqli_query($conexion, $query);
                    if (mysqli_error($conexion)) {
                        $error = new Errors();
                        $error->SendMysqlErrorMessage(mysqli_error($conexion), "cinfo.php", "cargames - insert llamadas", $query . "\n" . $linea);
                        return;
                    }
                };
            };

            $query = "call emerald_updateForCobro($anio,$mes);";
            mysqli_query($conexion, $query);
            if (mysqli_error($conexion)) {
                $error = new Errors();
                $error->SendMysqlErrorMessage(mysqli_error($conexion), "cinfo.php", "cargames - emerald_UpdateForCobro", $query . "\n" . $linea);
            }
            mysqli_close($conexion);
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
            $directorio = "/var/www/tape/emerald"; /* ubicaci�n del sistema dentro del servidor */
            $datos2 = "$directorio/datos";
            $base = Conf::BD_NAME;
            $conexion = mysqli_connect($url, $usuario, $clave);
            mysqli_select_db($base, $conexion);
            
            $error = new Errors();
            $error->SendMysqlErrorMessage("mysqli_error($conexion)", "cinfo.php", "genera informe prueba - select llamadas", $query . "\n" . $linea);
            
            $q = "";
            $result = mysqli_query($conexion, "select interno,fecha,sec_to_time(sum(time_to_sec(tiempo))),sum(costo),count(interno) from emerald2.llamadas group by(interno);");
            if (mysqli_error($conexion)) {
                $error = new Errors();
                $error->SendMysqlErrorMessage(mysqli_error($conexion), "cinfo.php", "genera informe - select llamadas", $query . "\n" . $linea);
            }
            while ($llamada = mysqli_fetch_row($result)) {

                $fecha = explode("-", $llamada[1]);
                $chivo = "$datos2/$llamada[0]$fecha[1]$fecha[0].txt";
                //echo"archivo a crear:    $chivo";
                $fp = fopen($chivo, "w");
                $q = fputs($fp, "=============================================================================\n");
                $q = fputs($fp, "====     INFORME DE LLAMADAS TELEFONICAS DEL INTERNO $llamada[0] DEL MES $fecha[1]/$fecha[0]     ====\n");
                $q = fputs($fp, "=============================================================================\n");
                $result1 = mysqli_query($conexion, "select usuario,id_centro,id_depto from emerald2.internos where interno='$llamada[0]' and mes='$fecha[1]' and anio='$fecha[0]';");
                $inter = mysqli_fetch_row($result1);
                $result2 = mysqli_query($conexion, "select centrocosto from emerald2.centros where id_centro='$inter[1]';");
                $centro = mysqli_fetch_row($result2);
                $result3 = mysqli_query($conexion, "select depto from emerald2.departamentos where id_depto='$inter[2]';");
                $depa = mysqli_fetch_row($result3);
                $result4 = mysqli_query($conexion, "select fecha,hora,tiempo,costo,tipo,nromarcado,localidad from emerald2.llamadas where interno='$llamada[0]';");
                $q = fputs($fp, "Interno: $llamada[0]\nPertenece a: $inter[0]\nCentro de Costo: $centro[0]\nDepartamento: $depa[0]\n");
                $q = fputs($fp, "Dia    Hora      Tiempo    Costo  Tipo     Nro Marcado      Localidad   \n");
                $q = fputs($fp, "-----------------------------------------------------------------------------\n");
                while ($line = mysqli_fetch_row($result4)) {
                    $fecha = explode("-", $line[0]);
                    $linea = "$fecha[2]   $line[1]   $line[2]   $line[3]   $line[4]       $line[5]      $line[6]\n";
                    $q = fputs($fp, $linea);
                    switch ($line[4]) {
                        case "DDN":
                            $tipocosto[0] += $line[3];
                            $tipo[0] = "DDN";
                            break;
                        case "LOCAL":
                            $tipo[1] = "LOCAL";
                            $tipocosto[1] += $line[3];
                            break;
                        case "CELL":
                            $tipo[2] = "CELL";
                            $tipocosto[2] += $line[3];
                            break;
                        case "DDI":
                            $tipo[3] = "DDI";
                            $tipocosto[3] += $line[3];
                            break;
                        default:
                            $tipo[4] = "OTROS";
                            $tipocosto[4] += $line[3];
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
                mysqli_query($conexion, "update emerald2.internos set tiempo='$llamada[2]',costo='$llamada[3]',cantllam='$llamada[4]' where interno='$llamada[0]' and mes='$fecha[1]' and anio='$fecha[0]';");
                if (mysqli_error($conexion)) {
                    $error = new Errors();
                    $error->SendMysqlErrorMessage(mysqli_error($conexion), "cinfo.php", "genera informe - update internos", $query . "\n" . $linea);
                }
                //echo "generando $chivo ......";
                //echo 'listo<br>';
            };
            // echo '<h3>Todos los informes fueron generados</h3>';
            mysqli_query($conexion, "delete from emerald2.llamadas;");

            mysqli_close($conexion);
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