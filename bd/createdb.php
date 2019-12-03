<?php

function Main() {
    try {
        $usuario = "root";
        $contraseña = "tapeoys";
        $db = new PDO('mysql:host=localhost;dbname=tape', $usuario, $contraseña);
        CreateDB($db);
        ImportTables($db, "/var/www/html/tape/bd/structure/tables/");
        ImportDatos($db, "/var/www/html/tape/bd/datos/");
        ImportStoreds($db, "/var/www/html/tape/bd/storeds/");
        Releases($db);
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
}

function CreateDB($db) {
    echo "<div style='border:solid 1px #ACACAC;background-color:#CCC;margin: 10px 0 10px 0'>BASE DE DATOS</div>";
    $sql = file_get_contents('createDBandData.sql'); //file name should be name of SQL file with .sql extension. 
    $qr = $db->exec($sql);
    if ($qr === 1) {
        print_r($db->errorInfo());
        return;
    }
    echo "base de datos creada ...<br/>";
}

function ImportTables($db, $dir) {
    echo "<div style='border:solid 1px #ACACAC;background-color:#CCC;margin: 10px 0 10px 0'>TABLAS</div>";
    $dh = opendir($dir);
    while (false !== ($filename = readdir($dh))) {
        $files[] = $filename;
    }
    sort($files);
    for ($i = 0; $i < count($files); $i++) {
        $sql = file_get_contents($dir . $files[$i]); //file name should be name of SQL file with .sql extension. 
        $qr1 = $db->exec($sql);
        if ($qr1 === 1 && $files != "." && $files != "..") {
            $error = $db->errorInfo()[2];
            if ($error !== "") {
                echo "error table  " . $dir . $files[$i] . "<br/>";
                print_r($db->errorInfo());
            } else {
                echo "Tabla '" . $dir . $files[$i] . "' existosamente importada<br/>";
            }
        }
    }
    echo "tablas creadas ...<br/>";
}

function ImportStoreds($db, $dir) {
    echo "<div style='border:solid 1px #ACACAC;background-color:#CCC;margin: 10px 0 10px 0'>PROCEDURES</div>";
    $dh3 = opendir($dir);
    while (false !== ($filename = readdir($dh3))) {
        $files3[] = $filename;
    }
    sort($files3);
    for ($i = 0; $i < count($files3); $i++) {
        if ($files3[$i] != "." && $files3[$i] != "..") {
            echo $dir . $files3[$i] . "<br/>";
            $sql3 = file_get_contents($dir . $files3[$i]); //file name should be name of SQL file with .sql extension. 
            $qr = $db->exec($sql3);
            if ($qr === 1) {
                if ($db->errorInfo()[2] != "") {
                    echo "error stored " . $dir . $files3[$i] . "<br/>";
                    print_r($db->errorInfo());
                } else {
                    echo "Stored '" . $dir . $files3[$i] . "' exitosamente importado<br/>";
                }// break;
            }
        }
    }
    echo "storeds procedures creados ...<br/>";
}

function ImportDatos($db, $dir) {
    try {
        echo "<div style='border:solid 1px #ACACAC;background-color:#CCC;margin: 10px 0 10px 0'>DATOS</div>";
        $dh2 = opendir($dir);
        while (false !== ($filename = readdir($dh2))) {
            $files2[] = $filename;
        }
        sort($files2);
        for ($i = 0; $i < count($files2); $i++) {
            $sql2 = file_get_contents($dir . $files2[$i]); //file name should be name of SQL file with .sql extension. 
            $qr1 = $db->exec($sql2);
            if ($qr1 === 1 && $files2 != "." && $files2 != "..") {
                if ($db->errorInfo()[2] != "") {
                    echo "error data en sql " . $dir . $files2[$i] . "<br/>";
                    print_r($db->errorInfo());
                } else {
                    echo "Datos '" . $dir . $files2[$i] . "' existosamente importados<br/>";
                }// break;
            }
        }
        echo "datos importados ...<br/>";
    } catch (Excpetion $ex) {
        echo "ERORR :" . $ex . message();
    }
}

function Releases($db) {
    echo "<div style='border:solid 1px #ACACAC;background-color:#CCC;margin: 10px 0 10px 0'>RELEASES</div>";
    $dh = opendir("/var/www/html/tape/bd/release/");
    while (false !== ($filename = readdir($dh))) {
        $files[] = $filename;
    }
    sort($files);
    // print_r($files);
    for ($i = 0; $i < count($files); $i++) {

        if ($files[$i] != "." && $files[$i] != "..") {
            echo "folder:" . $files[$i] . "------------------------------------------------------ <br/>";
            $dir = opendir("/var/www/html/tape/bd/release/" . $files[$i]);
            $f=[];
            while (false !== ($filename = readdir($dir))) {
                $f[] = $filename;
            }
            sort($f);
            //print_r($f);
            for ($j = 0; $j < count($f); $j++) {

                if ($f[$j] != "." && $f[$j] != "..") {
                    //echo "file :" . $f[$j] . "<br/>";
                    $s = file_get_contents("/var/www/html/tape/bd/release/" . $files[$i] . "/" . $f[$j]);
                    //echo "/var/www/html/tape/bd/release/".$files[$i]."/". $f[$j]. "<br/>";
                    $q = $db->exec($s);
                   // echo "do_dump qeeee" . $q . "<br/>";

                    if ($db->errorInfo()[2] != "") {
                        echo "error en sql " . "/var/www/html/tape/bd/release/" . $files[$i] . "/" . $f[$j] . "<br/>";
                        print_r($db->errorInfo());
                    } else {
                       // if ($q === 1) {
                            echo "Datos de release '" . "/var/www/html/tape/bd/release/" . $files[$i] . "/" . $f[$j] . "' existosamente importados<br/>";
                        //}// break;
                    }
                }
            }
        }
    }
    echo "releases importados ...<br/>";
}

Main();
