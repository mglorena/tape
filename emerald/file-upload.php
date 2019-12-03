<?php

require_once '/var/www/html/tape/emerald/class/cinfo.php';
sleep(1);
$reserva = $_POST['reservaId'];

if (is_uploaded_file($_FILES['file-path']['tmp_name'])) {
    $filename = $_FILES['file-path']['name'];
    $folder = 'files/';
    if (!file_exists($folder))
        mkdir($folder);
    chmod($folder, 0777);
    move_uploaded_file($_FILES['file-path']['tmp_name'], $folder . "/" . $filename);

    $fp = fopen( $folder . "/" . $filename, "r") or die("NO SE PUEDE ABRIR archivo <b>$filename</b>");


    $i = new Info();
    if ($i->CargaMes($fp)) {
        $i->GenerarInforme();
        echo " {success:true,file:" . json_encode($filename) . '}';
    }
    else
        echo "{failure: " . json_encode($_FILES['file-path']['name']) . '}';
}
?>