<?php

require_once('/var/www/tape/class/cphpmailer.php');
require_once('/var/www/tape/class/cconf.php');

function SendMailBacks() {


    $mailer = new TapeMailer();
    $mailer->From = "infotape@obras.unsa.edu.ar";
    $mailer->FromName = "Lorena García";

    $mailer->Subject = "Backups de bases de datos y etc de servidor";
    $mailer->Host = 'unsa.edu.ar';
    $mailer->Mailer = 'smtp';
    $mailer->Body = "Backups";
    $mailer->IsHTML(true);
    $mailer->AddAddress('mglorena@gmail.com', 'Tape Errores');
    $mailer->AddAttachment('/var/www/tape/bd/backupOYS.tgz');
    $mailer->Host = "unsa.edu.ar";
    $mailer->Port = "25";
    $mailer->Username = "mlgarcia";
    $mailer->Password = "miomia11";

    echo "Resultado : (".$mailer->Send().")";
}

echo SendMailBacks();

?>
