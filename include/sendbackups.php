<?php

require_once('/var/www/html/tape/class/cphpmailer.php');
require_once('/var/www/html/tape/class/cconf.php');

function SendMailBacks() {


    $mailer = new TapeMailer();
    $mailer->From = "mlgarcia@unsa.edu.ar";
    $mailer->FromName = "Lorena García";

    $mailer->Subject = "Backups de bases de datos y etc de servidor";
    $mailer->Host = 'unsa.edu.ar';
    $mailer->Mailer = 'smtp';
    $mailer->Body = "Backups";
    $mailer->IsHTML(true);
    $mailer->AddAddress('mlgarcia@unsa.edu.ar', 'Backup Bases de Datos y etcs');
    $mailer->AddAttachment('/var/www/html/tape/bd/backupOYS.tgz');
    $mailer->Host = "unsa.edu.ar";
    $mailer->Port = "25";
    $mailer->Username = "mlgarcia";
    $mailer->Password = "miomia11";

    echo "Resultado : (".$mailer->Send().")";
}

echo SendMailBacks();

?>
