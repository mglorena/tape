<?php

/*
  miCalendario, manejador de eventos
  Copyright © Jesus Liñan www.ribosomatic.com

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>. */
require_once 'class/ctipovehiculo.php';

class calendario {

    var $nombre_dias = array('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo');

    function calendario() {
        
    }

    function mostrarBarra() {

        $barra = "
        
        <div id=\"barcal\">
            <div style=\"padding:5px;width:100%\">
                Mes: <select id=\"ddlMes\" >
                    <option value=\"1\">Enero</option>
                    <option value=\"2\">Febrero</option>
                    <option value=\"3\">Marzo</option>
                    <option value=\"4\">Abril</option>
                    <option value=\"5\">Mayo</option>
                    <option value=\"6\">Junio</option>
                    <option value=\"7\">Julio</option>
                    <option value=\"8\">Agosto</option>
                    <option value=\"9\">Septiembre</option>
                    <option value=\"10\">Octubre</option>
                    <option value=\"11\">Noviembre</option>
                    <option value=\"12\">Diciembre</option>
                </select>
                Año: 
                <select id=\"ddlAnio\" >
                    <option value=\"2017\">2017</option>
                    <option value=\"2018\">2018</option>
                    <option value=\"2019\">2019</option>
                    <option value=\"2020\">2020</option>
                    <option value=\"2021\">2021</option>
                    <option value=\"2022\">2022</option>
                    <option value=\"2023\">2023</option>
                    <option value=\"2024\">2024</option>
                    <option value=\"2025\">2025</option>
                </select>
                Tipo Vehiculo:";
        $ve = new TipoVehiculo();
        $barra .=$ve->GetDropDown();
        $barra .="&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='Ver >>' onclick='GetCalendar();'/> </div>";

        return $barra;
    }

    function PrintCalendar($month, $year) {

        $html = "";

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
        $html.="<table id=\"minical\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" ><thead><tr >";
        // $html.="<caption>" . $meses[$month] . " " . $year . "</caption>";
        // $html.="<tr style=\"vertical-align:top\" >";
        $html.="<th>Lun</th><th>Mar</th><th>Mie</th><th>Jue</th>";
        $html.="<th>Vie</th><th>Sab</th><th>Dom</th>";
        $html.="</tr></thead><tbody>";
        $html.="<tr bgcolor=\"silver\" id='firtstr'> ";

        $last_cell = $diaSemana + $ultimoDiaMes;
        // hacemos un bucle hasta 42, que es el máximo de valores que puede
        // haber... 6 columnas de 7 dias
        for ($i = 1; $i <= 43; $i++) {

            if ($i == $diaSemana) {
                // determinamos en que dia empieza

                $day = 1;
            }
            if ($i < $diaSemana || $i >= $last_cell) {
                // celca vacia
                $html.="<td  style=\"vertical-align:top\"  class=\"disabled\">&nbsp;</td>";
            } else {
                // mostramos el dia

                $html.="<td  style=\"vertical-align:top\"  id=\"c" . $day . "\" >";
                $html.= "<div  class=\"headbox\" style=\"vertical-align:top\"  id=\"d" . $day . "\"> \n";
                $html.= $day;
                $html.= "</div> \n";
                $html.="</td>";

                $day++;
            }
            // cuando llega al final de la semana, iniciamos una columna nueva
            if ($i % 7 == 0) {
                $html.="</tr><tr>\n";
            }
        }

        $html.="</tr>";
        $html.= "</tbody>";
        $html.="</table>";
        return $html;
    }

}

?>
