<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Errors
 *
 * @author root
 */
require_once('/var/www/html/tape/class/cphpmailer.php');
require_once('/var/www/html/tape/class/cbrowserinfo.php');
require_once('/var/www/html/tape/class/csmtp.php');
require_once('/var/www/html/tape/class/cconf.php');

class Errors {

       

    function SendJsErrorMessage($ex, $pageName, $object) {
        if (!isset($ex))
            $ex = 'Error mensaje - testing';
        $body = "<b>Error Report - SendJsErrorMessage</b><br/>";
        $body .="<br/><b>Method :</b>" . $pageName;
        $body .="<br/><br/><b>Detail</b><br/>" . $ex;
        $browser = new Browser();
        $body .="<br/><br/><b>Browser Info</b><br/>";
        $body .="<br/><b>Browser:</b>" . $browser->getBrowser() . "<br/>";
        $body .="<b>Browser Version:</b>" . $browser->getVersion() . "<br/>";
        $exporte = var_export($object,true);
        $body .="<br/>" . $exporte;
        $body .="<br/>SERVER:" . $_SERVER['SERVER_ADDR'];
        $body .="<br/>REMOTE HOST:" . $_SERVER['REMOTE_ADDR'];

        $mailer = new TapeMailer();
        $mailer->From = "errores@obras.unsa.edu.ar";
        $mailer->FromName = "Lorena García";
        $mailer->Subject = 'obras.unsa.edu.ar - Error Report' . " - HOST:" . $_SERVER['SERVER_ADDR'];
        $mailer->Host = 'localhost';
        $mailer->Mailer = 'smtp';
        $mailer->Body = $body;
        $mailer->IsHTML(true);
        $mailer->AddAddress('mlgarcia@unsa.edu.ar', 'Tape Errores');


        $mailer->Host = 'unsa.edu.ar';
        $mailer->Port = 25;
        $mailer->Username = 'mlgarcia';
        $mailer->Password = 'miomia11';
        return $mailer->Send();
    }

    function SendMysqlErrorMessage($ex, $pageName, $method, $object) {
        if (!isset($ex))
            $ex = 'Error mensaje - testing';
        $name = "/var/www/html/tape/error1.sql";
        $ar = fopen($name,"a");
        fputs($ar,"prueba de escribir error");
        fclose($ar);
        $subject = 'Error Report' . " - HOST:" . $HOST_URL . " - " . $ex;
        $body = "<b>Error Report - SendMysqlErrorMessage</b><br/>";
        $body .="<br/><b>File name:</b>" . $pageName;
        $body .="<br/><b>Method:</b>" . $method;
        $body .="<br/><b>Message: </b><br/>" . $ex;
        $body .="<br/><br/><b>Browser Info</b><br/>";
        $browser = new Browser();
        $body .="<b>Browser:</b>" . $browser->getBrowser() . "<br/>";
        $body .="<b>Browser Version:</b>" . $browser->getVersion() . "<br/>";
        $exporte = var_export($object, true);
        $body .="<br/>" . $exporte;
        $body .="<br/>SERVER:" . (!isset($_SERVER['SERVER_ADDR']) ? '192.168.5.3': $_SERVER['SERVER_ADDR']);
        $body .="<br/>REMOTE HOST:" . $_SERVER['REMOTE_ADDR'];
      
        $mailer = new TapeMailer();
        $mailer->From = "mlgarcia@unsa.edu.ar";
        $mailer->FromName = "Lorena García";
        $mailer->Subject = $subject;
        $mailer->Host = 'localhost';
        $mailer->Mailer = 'smtp';
        $mailer->Body = $body;
        $mailer->IsHTML(true);
        $mailer->AddAddress(Conf::FROM_ALERT, 'Tape Errores');
        $mailer->Host = Conf::HOST_MAIL;
        $mailer->Port = Conf::SMTP_PORT;
        $mailer->Username = Conf::ERROR_USER;
        $mailer->Password = Conf::ERROR_PASS;
        return $mailer->Send();
    }

    function SendErrorMessage($ex, $pageName, $object) {
        if (!isset($ex))
            $ex = 'Error mensaje - testing';
        $subject = 'Error Report' . " - HOST:" . $HOST_URL . " - " . $ex->getMessage();
        ;
        $body = "<b>Error Report - SendErrorMessage</b><br/>";
        $body .="<br/><b>File Name :</b>" . $ex->getFile();
        $body .="<br/><b>Method :</b>" . $pageName;
        $body .="<br/><b>Code :</b>" . $ex->getCode();
        $body .="<br/><b>Line Number:</b>" . $ex->getLine();
        $body .="<br/><b>Message: </b><br/>" . $ex->getMessage();
        $body .="<br/><b>Trace:</b><br/>" . $ex->getTraceAsString();
        $body .="<br/><br/><b>Browser Info</b><br/>";
        $browser = new Browser();
        $body .="<b>Browser:</b>" . $browser->getBrowser() . "<br/>";
        $body .="<b>Browser Version:</b>" . $browser->getVersion() . "<br/>";
        /* $exporte = "Var_DUMP ".do_dump($object,'object',true) . "<br/>";
          $exporte = "Var_DUMP ".var_dump($object,true) . "<br/>";
          $exporte .="DEBUG ".debug_zval_dump($object,true) . "<br/>"; */
        try {
            $exporte .="Export " . var_export($object, true) . "<br/>";
        } catch (Exception $ex) {
            $exporte .="In testing";
        }
        /* $exporte .="Unseralize ".unserialize($object,true) . "<br/>";
          $exporte .="Print_r ".  print_r($object,true) . "<br/>";
          $exporte .="GET TYPE ". gettype($object) . "<br/>"; */
        $body .="<br/>" . $exporte;
        $body .="<br/>SERVER:" . (!isset($_SERVER['SERVER_ADDR']) ? '192.168.1.2' : $_SERVER['SERVER_ADDR']);
        $body .="<br/>REMOTE HOST:" . $_SERVER['REMOTE_ADDR'];
        $body .=" - HOST:" . $HOST_URL;
        $mailer = new TapeMailer();
        $mailer->From = "mlgarcia@unsa.edu.ar";
        $mailer->FromName = "Lorena García";
        $mailer->Subject = $subject;
        $mailer->Host = 'localhost';
        $mailer->Mailer = 'smtp';
        $mailer->Body = $body;
        $mailer->IsHTML(true);
        $mailer->AddAddress(Conf::FROM_ALERT, 'Tape Errores');
        $mailer->Host = Conf::HOST_MAIL;
        $mailer->Port = Conf::SMTP_PORT;
        $mailer->Username = Conf::ERROR_USER;
        $mailer->Password = Conf::ERROR_PASS;
        return $mailer->Send();
    }

   /* function do_dump(&$var, $var_name = NULL, $indent = NULL, $reference = NULL) {
        $result = "";
        $do_dump_indent = "<span style='color:#666666;'>|</span> &nbsp;&nbsp; ";
        $reference = $reference . $var_name;
        $keyvar = 'the_do_dump_recursion_protection_scheme';
        $keyname = 'referenced_object_name';

        // So this is always visible and always left justified and readable
        echo "<div style='text-align:left; background-color:white; font: 100% monospace; color:black;'>";

        if (is_array($var) && isset($var[$keyvar])) {
            $real_var = &$var[$keyvar];
            $real_name = &$var[$keyname];
            $type = ucfirst(gettype($real_var));
            echo "$indent$var_name <span style='color:#666666'>$type</span> = <span style='color:#e87800;'>&amp;$real_name</span><br>";
        } else {
            $var = array($keyvar => $var, $keyname => $reference);
            $avar = &$var[$keyvar];

            $type = ucfirst(gettype($avar));
            if ($type == "String")
                $type_color = "<span style='color:green'>";
            elseif ($type == "Integer")
                $type_color = "<span style='color:red'>";
            elseif ($type == "Double") {
                $type_color = "<span style='color:#0099c5'>";
                $type = "Float";
            } elseif ($type == "Boolean")
                $type_color = "<span style='color:#92008d'>";
            elseif ($type == "NULL")
                $type_color = "<span style='color:black'>";

            if (is_array($avar)) {
                $count = count($avar);
                echo "$indent" . ($var_name ? "$var_name => " : "") . "<span style='color:#666666'>$type ($count)</span><br>$indent(<br>";
                $keys = array_keys($avar);
                foreach ($keys as $name) {
                    $value = &$avar[$name];
                    do_dump($value, "['$name']", $indent . $do_dump_indent, $reference);
                }
                echo "$indent)<br>";
            } elseif (is_object($avar)) {
                echo "$indent$var_name <span style='color:#666666'>$type</span><br>$indent(<br>";
                foreach ($avar as $name => $value)
                    do_dump($value, "$name", $indent . $do_dump_indent, $reference);
                echo "$indent)<br>";
            } elseif (is_int($avar))
                echo "$indent$var_name = <span style='color:#666666'>$type(" . strlen($avar) . ")</span> $type_color" . htmlentities($avar) . "</span><br>";
            elseif (is_string($avar))
                echo "$indent$var_name = <span style='color:#666666'>$type(" . strlen($avar) . ")</span> $type_color\"" . htmlentities($avar) . "\"</span><br>";
            elseif (is_float($avar))
                echo "$indent$var_name = <span style='color:#666666'>$type(" . strlen($avar) . ")</span> $type_color" . htmlentities($avar) . "</span><br>";
            elseif (is_bool($avar))
                echo "$indent$var_name = <span style='color:#666666'>$type(" . strlen($avar) . ")</span> $type_color" . ($avar == 1 ? "TRUE" : "FALSE") . "</span><br>";
            elseif (is_null($avar))
                echo "$indent$var_name = <span style='color:#666666'>$type(" . strlen($avar) . ")</span> {$type_color}NULL</span><br>";
            else
                echo "$indent$var_name = <span style='color:#666666'>$type(" . strlen($avar) . ")</span> " . htmlentities($avar) . "<br>";

            $var = $var[$keyvar];
        }

        echo "</div>";
    }*/

}

?>
