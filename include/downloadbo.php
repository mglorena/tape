<?php

require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/tarja/class/cboletin.php');

function DescargarNuevas($ultima, $anio, $url, $folder) {
    $archivo = $url . "R-" . strtoupper($folder) . "-" . $anio . "-" . $ultima . ".pdf";
    $file = fopen($archivo, "rb");
    $last = $ultima;
    while ($file) {
        if (!@copy($archivo, '/backup/boletin/' . $folder . '/' . $anio . '/R-' . strtoupper($folder) . '-' . $anio . '-' . $ultima . '.pdf')) {
            $errors = error_get_last();
            echo "COPY ERROR: " . $errors['type'];
            echo "<br />\n" . $errors['message'];
            $e = new Errors();
            $e->SendErrorMessage(new Exception($errors['message']), "Error descargando pdf", $archivo);
        }
        $ultima = sprintf("%04d", $ultima + 1);
        $archivo = $url . "R-" . strtoupper($folder) . "-" . $anio . "-" . $ultima . ".pdf";
        $file = fopen($archivo, "rb");
       
        if (!$file) {
            $last = $ultima;
            $ultima  = $ultima + 1;
            for ($i = 1; $i < 5; $i++) {
                $ver = $ultima;
                $ver = sprintf("%04d", $ver);
                $archivo = $url . "R-" . strtoupper($folder) . "-" . $anio . "-" . $ver . ".pdf";
                $file = fopen($archivo, "rb");
                if ($file) {
                    $e = new Errors();
                    $e->SendErrorMessage(new Exception("Resolucion faltante"), "Error descargando pdf", $ultima - 1);
                    break;
                } else {
                    $ultima = $ultima + 1;
                    
                }
            }
        }
    }
    fclose($file);
    return $last;
}

function Boletin() {
    $anio = date("Y");
    try {
        for ($index = 1; $index < 3; $index++) {
            $b = new Boletin();
            $b->BoletinId = $index;
            $bo = $b->GetByBoletinId()[0];
            // echo "tetetete 222";
            if ($bo) {
                $url = $bo->Url . "R" . $anio . "/";
                $url_content = file_get_contents($url);
                $tamañoviejo = $bo->Length;
                $ultima_dia = $bo->LastResNumber; //"0549";
                $folder = $bo->Folder;

                $tamaño = strlen($url_content);
                $boo = mkdir("/backup/boletin/" . $folder . "/" . $anio, 0700, true);

                echo $tamaño . "!=" . $tamañoviejo . "<br/>";
              //  if ($tamaño != $tamañoviejo) {
                    $ultima = DescargarNuevas($ultima_dia, $anio, $url, $folder);
                    UpdateDB($b, $ultima, $tamaño);
              //  }
            }
        }
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "dashboard.php - GetResoluciones", $anio);
    }
}

function UpdateDB($bo, $ult, $len) {
    $ult = $ult - 1;
    $ult = sprintf("%04d", $ult);
    // echo "<br/>update :" . $ult;
    $bo->LastResNumber = $ult;
    //  echo "<br/>" . do_dump($bo);
    $bo->UpdateResolucion($ult, $len);
    // echo "<br/>que paso";
}

Boletin();
?>
