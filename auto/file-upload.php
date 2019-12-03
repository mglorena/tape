<?php

require_once ('class/creservas.php');
sleep(1);
$reserva = $_POST['reservaId'];

if (is_uploaded_file($_FILES['archi-path']['tmp_name'])) {
    $filename = $_FILES['archi-path']['name'];
    $folder = 'files/'.$reserva;
    if (!file_exists($folder))
        mkdir($folder);
    chmod($folder, 0777);
    move_uploaded_file($_FILES['archi-path']['tmp_name'],$folder . "/" . $filename);
    $re = new Reserva();
    if ($re->UploadFile($filename, $reserva))
        echo " {success:true,file:" . json_encode($filename) . '}';
    else {
        unlink($folder . "/" . $filename);
        echo "{failure: " . json_encode($_FILES['archi-path']['name']) . '}';
    }
} else {
    echo "{failure: " . json_encode($_FILES['archi-path']['name']) . '}';
}
?>