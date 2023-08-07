<?php

require_once('/var/www/html/tape/class/cphpmailer.php');
require_once('/var/www/html/tape/class/cconf.php');

function SendMailBacks() {


    $mailer = new TapeMailer();
    $mailer->From = "mlgarcia@unsa.edu.ar";
    $mailer->FromName = "Lorena García";

    $mailer->Subject = "Backups de bases de datos - 170.210.200.20";
    $mailer->Host = 'unsa.edu.ar';
    $mailer->Mailer = 'smtp';
    $mailer->Body = "Backups";
    $mailer->IsHTML(true);
    $mailer->AddAddress('mlgarcia@unsa.edu.ar', 'Backup Bases de Datos - 170.210.200.20');
    $mailer->AddAttachment('/var/www/html/tape/bd/bases.tgz');
    $mailer->Host = "unsa.edu.ar";
    $mailer->Port = "25";
    $mailer->Username = "mlgarcia";
    $mailer->Password = "miomia11";

    echo "Resultado : (".$mailer->Send().")";
}

echo SendMailBacks();

?>
