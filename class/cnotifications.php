<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of cnotifications
 *
 * @author root
 */
require_once('/var/www/html/tape/class/cphpmailer.php');
require_once ('/var/www/html/tape/auto/class/creservas.php');
require_once('/var/www/html/tape/auto/class/cvehiculos.php');
require_once('/var/www/html/tape/class/cconf.php');
require_once('/var/www/html/tape/tarja/class/cpersonas.php');

class Notifications {

    //put your code here

    function GetReservas() {
        $re = new Reserva();
        $reservas = $re->GetPendientes();
        $table = "";
        if (isset($reservas[0])) {
            $table = "<b>Reservas Proximas a vencerse</b><br/>";
            $styleTable = " style='border:solid 0px black;'";
            $styleTd = "style='font-weight:bold;border-top:solid 1px black;border-bottom:solid 1px black;padding:0px 5px;";
            $styleTd .="border-left:solid 1px black;text-align:center;'";
            $styleTd1 = "style='font-weight:bold;border:solid 1px black;text-align:center;padding:0px 5px;'";
            $styleTd2 = "style='border-bottom:solid 1px black;border-left:solid 1px black;text-align:center;padding:0px 5px;'";
            $styleTd3 = "style='border-right:solid 1px black;border-bottom:solid 1px black;border-left:solid 1px black;text-align:center;padding:0px 5px;'";
            $table .= "<table cellpadding='0' cellspacing='0'" . $styleTable . ">";
            $table .= "<tr>";
            $table .= "<td " . $styleTd . ">Solicitante</td>
                       <td  " . $styleTd . ">Destino</td>
                       <td  " . $styleTd . ">Vehiculo</td>
                       <td  " . $styleTd . ">Periodo</td>
                       <td  " . $styleTd . ">Choferes</td>
                       <td " . $styleTd1 . ">Estado</td></tr>";
            foreach ($reservas as $r) {
                $table .= "<tr >";
                $table .= "<td " . $styleTd2 . ">&nbsp;" . $r['Solicitante'] . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r['Destino'] . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r['Vehiculo'] . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r['FechaInicio'] . " - " . $r['FechaFin'] . " -- " . $r['HoraSalida'] . " - " . $r['HoraLlegada'] . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r['ChoferName'] . "</td>
                
                   <td " . $styleTd3 . ">" . ( $r['Estado'] == 'Confirmada' ? '<font color=green>' . $r['Estado'] : '<font color=red>' . $r['Estado'] ) . "</font></td>";
                //   <td>" . $ve['FileName'] . "</td>                       

                $table .= "</tr>";
            }
            $table .= "</table>";
        }
        return $table;
    }

    function SaveFileReservas($body) {
        /*
          getdate()
         * 
          Array
          (
          [seconds] => 45
          [minutes] => 52
          [hours] => 14
          [mday] => 24
          [wday] => 2
          [mon] => 1
          [year] => 2006
          [yday] => 23
          [weekday] => Tuesday
          [month] => January
          [0] => 1138110765
          )
         */
        $d = getdate();
        $namefile = "/var/www/" . Conf::ROOT . "/alerts/reservas" . $d['mday'] . "-" . $d['mon'] . "-" . $d['year'] . "-" . $d['hours'] . ":" . $d['minutes'] . ":" . $d['seconds'] . ".html";
        $ar = fopen($namefile, "a") or die("Problemas en la creacion");
        fputs($ar, "<html><head><title>Reservas Pendientes </title></head><body>");
        fputs($ar, "<div><b>Lista de Reservas</b></div></br>");
        fputs($ar, $body);
        fputs($ar, "</body></html>");
        fclose($ar);
    }

    function SendMailReservas($body) {
        $mailer = new TapeMailer();

        $mailer->From = Conf::FROM_ALERT;
        $mailer->FromName = "Info Tape";
        $mailer->Subject = 'Tape - Información de Reservas';
        $mailer->Host = 'localhost';
        $mailer->Mailer = 'smtp';
        $mailer->Body = $body;
        $mailer->IsHTML(true);
        /* $mailer->AddAttachment($namefile); */
        $mailer->to = Conf::TO_ALERT;
        $mail->Host = Conf::HOST_MAIL;
        $mail->Port = Conf::SMTP_PORT;
        $mailer->Username = Conf::ERROR_USER;
        $mailer->Password = Conf::ERROR_PASS;
        $mailer->Send();
    }

    /*     * ******** VERHICULOS
     * 
     */

    function GetVehiculos() {
        $ve = new Vehiculo();
        $vehiculos = $ve->GetForMantenimiento();
        //echo do_dump($vehiculos);
        $table = "";
        if (isset($vehiculos[0])) {
            $ve->UpdateKilometrajeRef();
            $table = "<b>Vehiculos que requieren mantenimiento</b><br/><br/>";
            $styleTable = " style='border:solid 0px black;'";
            $styleTd = "style='font-weight:bold;border-top:solid 1px black;border-bottom:solid 1px black;padding:0px 5px;";
            $styleTd .="border-left:solid 1px black;text-align:center;'";
            $styleTd1 = "style='font-weight:bold;border:solid 1px black;text-align:center;padding:0px 5px;'";
            $styleTd2 = "style='border-bottom:solid 1px black;border-left:solid 1px black;text-align:center;padding:0px 5px;'";
            $styleTd3 = "style='border-right:solid 1px black;border-bottom:solid 1px black;border-left:solid 1px black;text-align:center;padding:0px 5px;'";
            $table .= "<table cellpadding='0' cellspacing='0'" . $styleTable . ">";
            $table .= "<tr>";
            $table .= "<td " . $styleTd . ">Modelo</td>
                       <td  " . $styleTd . ">Patente</td>
                       <td  " . $styleTd . ">Kilometraje Actual</td>
                       <td  " . $styleTd1 . ">Kilometraje Referencia</td>
                       </tr>";
            foreach ($vehiculos as $r) {
                $table .= "<tr >";
                $table .= "<td " . $styleTd2 . ">&nbsp;" . $r->Modelo . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r->Patente . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r->Kilometraje . "</td>
                   <td " . $styleTd3 . ">&nbsp;" . $r->KilometrajeRef . "</td>";
                $table .= "</tr>";
            }
            $table .= "</table>";
        }
        return $table;
    }

    function SaveFileVehiculos($body) {
        /*
          getdate()
         * 
          Array
          (
          [seconds] => 45
          [minutes] => 52
          [hours] => 14
          [mday] => 24
          [wday] => 2
          [mon] => 1
          [year] => 2006
          [yday] => 23
          [weekday] => Tuesday
          [month] => January
          [0] => 1138110765
          )
         */
        $d = getdate();
        $namefile = "/var/www/" . Conf::ROOT . "/alerts/vehiculos" . $d['mday'] . "-" . $d['mon'] . "-" . $d['year'] . "-" . $d['hours'] . ":" . $d['minutes'] . ":" . $d['seconds'] . ".html";
        $ar = fopen($namefile, "a") or die("Problemas en la creacion");
        fputs($ar, "<html><head><title>Vehiculos para Mantenimiento </title></head><body>");
        fputs($ar, "<div><b>Lista de Vehiculos</b></div></br>");
        fputs($ar, $body);
        fputs($ar, "</body></html>");
        fclose($ar);
    }

    function SendMailVehiculos($body) {
        $mailer = new TapeMailer();

        $mailer->From = Conf::FROM_ALERT;
        $mailer->FromName = "Info Tape";
        $mailer->Subject = 'Tape - Información de Vehiculos - Mantenimiento';
        $mailer->Host = 'localhost';
        $mailer->Mailer = 'smtp';
        $mailer->Body = $body;
        $mailer->IsHTML(true);
        /* $mailer->AddAttachment($namefile); */
        $mailer->to = Conf::TO_ALERT;
        $mail->Host = Conf::HOST_MAIL;
        $mail->Port = Conf::SMTP_PORT;
        $mailer->Username = Conf::ERROR_USER;
        $mailer->Password = Conf::ERROR_PASS;
        $mailer->Send();
    }

    function GetAllEmploys() {
        $pe = new Persona();
        $personas = $pe->GetArtsDay();
        $table = "";

        if (isset($personas[0])) {
            date_default_timezone_set("America/Argentina/Salta");

            $dia = date("d") . "/" . date("m") . "/" . date("Y");
            $table = "<b>LISTADO Personas con Articulo/Permiso del dia " . $dia . "</b><br/><br/>";
            $styleTable = " style='border:solid 0px black;'";
            $styleTd = "style='font-weight:bold;border-top:solid 1px black;border-bottom:solid 1px black;padding:0px 5px;";
            $styleTd .="border-left:solid 1px black;text-align:center;'";
            $styleTd1 = "style='font-weight:bold;border:solid 1px black;text-align:center;padding:0px 5px;'";
            $styleTd2 = "style='border-bottom:solid 1px black;border-left:solid 1px black;text-align:center;padding:0px 5px;'";
            $styleTd3 = "style='border-right:solid 1px black;border-bottom:solid 1px black;border-left:solid 1px black;text-align:center;padding:0px 5px;'";
            $table .= "<table cellpadding='0' cellspacing='0'" . $styleTable . ">";
            $table .= "<tr>";
            $table .= "<td " . $styleTd . ">Apellido</td>
                       <td  " . $styleTd . ">Nombre</td>
                       <td  " . $styleTd . ">Cargo</td>
                       <td  " . $styleTd . ">Legajo</td>
                       <td  " . $styleTd . ">Articulo</td>
                       <td " . $styleTd1 . ">Descripcion</td></tr>";
            foreach ($personas as $r) {
                $table .= "<tr >";
                $table .= "<td " . $styleTd2 . ">&nbsp;" . $r['Apellido'] . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r['Nombre'] . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r['CargoDesc'] . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r['Legajo'] . "</td>
                   <td " . $styleTd2 . ">&nbsp;" . $r['ArticuloName'] . "</td>
                   <td " . $styleTd3 . ">&nbsp;" . $r['Descripcion'] . "</td>";
                //   <td>" . $ve['FileName'] . "</td>                       

                $table .= "</tr>";
            }
            $table .= "</table>";
        }
        return $table;
    }

    function SaveFilePersonas($body) {

        date_default_timezone_set("America/Argentina/Salta");

        $namefile = "/var/www/" . Conf::ROOT . "/alerts/vehiculos" . date("d") . "-" . date("m") . "-" . date("Y") . "-" . date("G") . ":" . date("i") . ":" . date("s") . ".html";
        $ar = fopen($namefile, "a") or die("Problemas en la creacion");
        fputs($ar, "<html><head><title>Personas con Articulo </title></head><body>");
        fputs($ar, "<div><b>Lista de Personas</b></div></br>");
        fputs($ar, $body);
        fputs($ar, "</body></html>");
        fclose($ar);
    }

    function SendMailPersonas($body) {

        $mailer = new TapeMailer();
        $mailer->From = "errores@obras.unsa.edu.ar";
        $mailer->FromName = "Lorena García";
        $mailer->Subject = "Listado de personas con articulo";
        $mailer->Host = 'localhost';
        $mailer->Mailer = 'smtp';
        $mailer->Body = $body;
        $mailer->IsHTML(true);
      
        $mailer->AddAddress(Conf::FROM_ALERT, 'Tape');
        array_push($mailer->to,"mlgarcia@unsa.edu.ar");
        //$mailer->AddAddress("mglorena@gmail.com", 'Lorena1');
        $mailer->Host = Conf::HOST_MAIL;
        $mailer->Port = Conf::SMTP_PORT;
        $mailer->Username = Conf::ERROR_USER;
        $mailer->Password = Conf::ERROR_PASS;
       
        return $mailer->Send();
    }

}

?>
