<?php

//require_once ('class/cusers.php');
//require_once ('../class/cdump.php');
//require_once ('../class/cconf.php');


$salt = md5(uniqid(rand(), true)); // O incluso mejor si tuviese mayúsculas, minúsculas, caracteres especiales...
$hash = hash('sha512', $salt . 'dgoys2022..');
echo "Contraseña de Lorena:\n";
echo "Salt:". $salt;
echo "\n New Pass :" . $hash;
