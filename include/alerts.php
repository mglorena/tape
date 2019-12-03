<?php


require_once ('/var/www/html/tape/class/cnotifications.php');
$n = new Notifications();
/********* RESERVAS************/
/*$table = $n->GetReservas();
if($table != "")
{
    $n->SaveFileReservas($table);
    $n->SendMailReservas($table);
}
*/
/********* MANTENIMIENTO VEHICULOS *********/
/*$table1 = $n->GetVehiculos();
if($table1 != "")
{
    $n->SaveFileVehiculos($table1);
    $n->SendMailVehiculos($table1);
}
*/
/*********** AVISO DE INASISTENCIA JUSTIFICADS *********/
$table = $n -> GetAllEmploys();

if($table != "")
{
    //$n->SaveFilePersonas($table);
    $n->SendMailPersonas($table);
}
?>
