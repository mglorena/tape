<?php

require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('cpersonas.php');
require_once ('carticulos.php');
date_default_timezone_set('America/Argentina/Salta');

class Novedades {

    var $nombre_dias = array('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo');

    function ShowArts($dia, $mes, $anio, $arts) {

        $return = array();


        $diames = "";
        if ($dia < 10)
            $diames = '0' . $dia;
        else
            $diames = $dia;

        $month = "";
        if ($mes < 10) {
            $month = '0' . $mes;
        } else {
            $month = $mes;
        }
        $articulo = "";
        $data = "";
        $artId = null;
        foreach ($arts as $a) {
            if ($a['Fecha'] === $diames . "/" . $month . "/" . substr($anio, 2)) {
                $articulo = $a['Nombre'];
                $artId = $a['ArticuloId'];
                $data = $a['CantHoras'];

                break;
            }
        }
        $return[0] = ""; /* $diames . "/" . $month . "/" . substr($anio, 2)"lskdlskdls"; */
        $return[1] = "";
        $return[2] = "";
        if ($articulo !== "") {
            $return[0] = $artId;
            $return[1] = $articulo;
            $return[2] = $data;
        }
        return $return;
    }

    function PrintCalendar($month, $year, $personaId) {
        $articulos = array();
        $html = "";
        // $e = new Errors();
        //$e->SendErrorMessage(new Exception("persona id"), "cpersonas.php - Search ", $personaId);
        if (!is_null($personaId)) {
            $p = new Persona();
            $p->PersonaId = $personaId;
            $arts = $p->GetArticulos($month, $year);
        }
        date_default_timezone_set('America/Argentina/Salta');
        //$month = date("n");
        //$year = date("Y");
        $diaActual = date("j");
        # Obtenemos el dia de la semana del primer dia
        # Devuelve 0 para domingo, 6 para sabado
        $diaSemana = date("w", mktime(0, 0, 0, $month, 1, $year)) + 7;
        # Obtenemos el ultimo dia del mes
        $ultimoDiaMes = date("d", (mktime(0, 0, 0, $month + 1, 1, $year) - 1));


        $meses = array(1 => "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

        $html = "";
        $html.="<table  id=\"minical\"  cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\" >";
        // $html.="<caption>" . $meses[$month] . " " . $year . "</caption>";
        $html.="<tr>";
        $html.="<th>Lun</th><th>Mar</th><th>Mie</th><th>Jue</th>";
        $html.="<th>Vie</th><th>Sab</th><th>Dom</th>";
        $html.="</tr>";
        $html.="<tr bgcolor=\"silver\" id='firtstr'> ";

        $last_cell = $diaSemana + $ultimoDiaMes;
        // hacemos un bucle hasta 42, que es el máximo de valores que puede
        // haber... 6 columnas de 7 dias
        for ($i = 1; $i <= 42; $i++) {

            if ($i == $diaSemana) {
                // determinamos en que dia empieza

                $day = 1;
            }
            if ($i < $diaSemana || $i >= $last_cell) {
                // celca vacia
                $html.="<td  class=\"disabled\">&nbsp;</td>";
            } else {
                // mostramos el dia
                /* if ($day == $diaActual)
                  $html.="<td >" . $day . "</td>";
                  else { */
                if (!is_null($personaId))
                    $articulos = $this->ShowArts($day, $month, $year, $arts);
                if ($articulos[0] !== "30" && $articulos[0] !== "31")
                    $articulos[2] = "";
                $html.="<td  id=\"d" . $day . "\" class=\"diabox\" onclick=\"AddUpdArt(this,'" . $articulos[0] . "','" . $articulos[2] . "');\">" . $day . "<br/>";
                $html.= "<font style='font-size:13px;color:blue;'>" .
                        $articulos[1] . ($articulos[2] !== "" ? ":" . $articulos[2] : "") . "</font>";
                $html.="</td>";
                /* } */
                $day++;
            }
            // cuando llega al final de la semana, iniciamos una columna nueva
            if ($i % 7 == 0) {
                $html.="</tr><tr>\n";
            }
        }

        $html.="</tr>";
        $html.="</table>";
        return $html;
    }

}

?>
