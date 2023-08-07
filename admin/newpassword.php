<?php

//require_once ('class/cusers.php');
//require_once ('../class/cdump.php');
//require_once ('../class/cconf.php');


$salt = md5(uniqid(rand(), true)); // O incluso mejor si tuviese mayúsculas, minúsculas, caracteres especiales...
$hash = hash('sha512', $salt . 'unsa.2023');
echo "Contraseña: unsa.2023";
echo "\nSalt:". $salt;
echo "\nNew Pass :" . $hash ."\n";

