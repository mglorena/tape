
function Obtener_contenidos($url, $inicio = '', $final) {
    $source = @file_get_contents($url) or die('se ha producido un error');
    $posicion_inicio = strpos($source, $inicio) + strlen($inicio);
    $posicion_final = strpos($source, $final) - $posicion_inicio;
    $found_text = substr($source, $posicion_inicio, $posicion_final);
    return $inicio . $found_text . $final;
}

function Resos($anio) {
    try {
        $url = "http://bo.unsa.edu.ar/dr/R" . $anio . "/?M=D"; // url de la pagina que queremos obtener  
        //$url_content = Obtener_contenidos($url, '<body ', '</body>');
        $url_content = file_get_contents($url);
        $tamañoviejo = 75693;
        $resviejo = "0549";
        $tamaño = strlen($url_content);
        if ($tamañoviejo != $tamaño) {
            // hay actualizacion, buscar el ultimo numero de resolucion encontrado
            $enlace = "http://bo.unsa.edu.ar/dr/R" . $anio . "/R-DR-" . $anio . "-" . $$resviejo . ".pdf";
            //http://bo.unsa.edu.ar/dr/R2014/R-DR-2014-0544.pdf

            header("Content-Disposition: attachment; filename=R-DR-" . $anio . "-" . $$resviejo);

            header("Content-Type: application/octet-stream");

            header("Content-Length: " . filesize($enlace));

            readfile($enlace);
        }
        /* $file = @fopen($url, 'r');
          if ($file) {
          // while (!feof($file)) {
          $url_content .= fpassthru($file);
          //}
          fclose($file);
          } */
//         $links = extract_links($url_content); 

        /* $options = array('http' => array('method' => 'GET',));
          $links = "hiola";
          $config = stream_context_create($options);
          $url_content = file_get_contents($url, false, $config);
          //preg_match_all("|<div style=\"margin-bottom: 30px;\">(.*)</div>|sU", $config_final, $tiempo);
          preg_match_all('/<a .*?src=["\'](.*?)["\'].*?>/', $url_content, $links);
          //echo $tiempo[1][0]; */


        /*  $doc = new DOMDocument();
          $doc->loadHTML(file_get_contents($url));
          $xpath = new DOMXPath($doc);
          $tags = $xpath->query('//pre/@img');
          $links="SSfs";
          foreach ($tags as $tag)
          $links .=$tag->nodeValue . "\n";

         */
        $response = array("1" => $tamaño);
        return $response;
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "dashboard.php - GetResoluciones", $anio);
    }
}

function extract_links($html) {
    $links = array();
    preg_match_all('/<a\s+.*?href=[\"\']?([^\"\' >]*)[\"\']?[^>]*>(.*?)<\/a>/i', $html, $matches, PREG_SET_ORDER);
    foreach ($matches as $match) {
        $links[] = array($match[1], $match[2]);
    }
    return $links;
}

function Boletin() {
    date_default_timezone_set('America/Argentina/Salta');
    $anio = date("Y");
    $url = "http://bo.unsa.edu.ar/dr/R" . $anio . "/";
    $url_content = file_get_contents($url);
    $nroRes = "0549";
    $lenpage = 75694;

    // Primero verificar que la página se actualizo desde la última vez
    // 
    // 
    if ($lenpage !== strlen($url_content)) {
        $archivo = "http://bo.unsa.edu.ar/dr/R" . $anio . "/R-DR-" . $anio . "-" . $nroRes . ".pdf";
        $file = fopen($archivo, "rb");
        while ($file) {

            if (!@copy('http://bo.unsa.edu.ar/dr/R' . $anio . '/R-DR-' . $anio . '-' . $nroRes . '.pdf', './R-DR-' . $anio . '-' . $nroRes . '.pdf')) {
                $errors = error_get_last();
                echo "COPY ERROR: " . $errors['type'];
                echo "<br />\n" . $errors['message'];
            } else {
                echo "se copioooo";
            }
            $resviejo = $nroRes + 1;
            $resviejo = "0" . $nroRes;
            $archivo = "http://bo.unsa.edu.ar/dr/R" . $anio . "/R-DR-" . $anio . "-" . $nroRes . ".pdf";
            $file = fopen($archivo, "rb");
        }
    }
}

function DescargarNuevas($ultima, $anio, $url, $folder) {
    $archivo = $url . "R-DR-" . $anio . "-" . $ultima . ".pdf";
    $file = fopen($archivo, "rb");
    //echo "<br/>hasta aqui llegamos".$archivo."<br/>".$url;
    while ($file) {
        //echo "estoy en e l archivo";
        if (!@copy($archivo, '/backup/boletin/' . $folder . '/' . $anio . '/R-DR-' . $anio . '-' . $ultima . '.pdf')) {
            $errors = error_get_last();
            echo "COPY ERROR: " . $errors['type'];
            echo "<br />\n" . $errors['message'];
            $e = new Errors();
            $e->SendErrorMessage(new Exception($errors['message']), "Error descargando pdf", $errors);
        }
        //else {
        // @copy($archivo, 'tarja/bo/dr/R-DR-' . $anio . '-' . $ultima . '.pdf');
        // rename('./R-DR-' . $anio . '-' . $ultima . '.pdf', 'tarja/bo/dr/R-DR-' . $anio . '-' . $ultima . '.pdf');
        //echo "moviendo?= ";//. rename('R-DR-' . $anio . '-' . $ultima . '.pdf', 'tarja/bo/dr/R-DR-' . $anio . '-' . $ultima . '.pdf');
        $ultima = $ultima + 1;
        $ultima = sprintf("%04d", $ultima);
        echo $ultima;
        //echo "nuevo nombre de archiuvo :" . $resviejo . "<br/>";
        $archivo = $url . "R-DR-" . $anio . "-" . $ultima . ".pdf";
        $file = fopen($archivo, "rb");
        //}
    }
    fclose($file);
}

function GetResos() {
    try {

        $b = new Boletin();
        $b->BoletinId = "1";
        $bo = $b->GetByBoletinId()[0];
        echo do_dump($bo);
        // echo $bo->Url;
        $anio = 2014;
        $url = $bo->Url . "R" . $anio . "/";
        $url_content = file_get_contents($url);
        $tamañoviejo = $bo->Length;
        $ultima_dia = $bo->LastResNumber; //"0549";
        $folder = $bo->Folder;
        //$primera_dia = $b->LastLastResNumber;
        $tamaño = strlen($url_content);
        echo "antes :" . $tamaño . "---" . $tamañoviejo;
        if ($tamaño != $tamañoviejo) {
            echo "entro a descargar";
            DescargarNuevas($ultima_dia, $anio, $url, $folder);
        }
        /*
          echo "fecha modificacion:" . filemtime($url) . "<br/>";
          echo $tamañoviejo . "----" . $tamaño . "<br/>";
          // url de la pagina que queremos obtener
          //
          //$url_content = Obtener_contenidos($url, '<body ', '</body>');
          //set_time_limit(0);
          //$tamañoviejo = 75693;
          $resviejo = "0549";
          //$url_content = file_get_contents($url);
          //copy($url, "tarja/R-DR-" . $anio . "-" . $resviejo . ".pdf")
          $archivo = "http://bo.unsa.edu.ar/dr/R" . $anio . "/R-DR-" . $anio . "-" . $resviejo . ".pdf";
          $file = fopen($archivo, "rb");
          /*  echo $archivo;
          if (!$file) {

          echo "<p>Imposible abrir el archivo remoto para escritura.\n";
          exit;
          } */
        /* while (copy('http://bo.unsa.edu.ar/dr/R' . $anio,'./R-DR-' . $anio . '-' . $resviejo . '.pdf'))
          {
          $resviejo ="0"+$resviejo + 1;
          }
          echo $resviejo; */
        //$resviejo = "550";

        /* while ($file) {

          if (!@copy('http://bo.unsa.edu.ar/dr/R' . $anio . '/R-DR-' . $anio . '-' . $resviejo . '.pdf', './R-DR-' . $anio . '-' . $resviejo . '.pdf')) {
          //if (copy($file, "tarja/R-DR-" . $anio . "-" . $resviejo . ".pdf"))

          $errors = error_get_last();
          echo "COPY ERROR: " . $errors['type'];
          echo "<br />\n" . $errors['message'];
          } else {

          echo "<a tarjet=\"_blank\" href=\"" . $archivo . "\">R-DR-" . $anio . "-" . $resviejo . ".pdf</a><br/>";
          }
          $resviejo = $resviejo + 1;
          $resviejo = "0" . $resviejo;
          //echo "nuevo nombre de archiuvo :" . $resviejo . "<br/>";
          $archivo = "http://bo.unsa.edu.ar/dr/R" . $anio . "/R-DR-" . $anio . "-" . $resviejo . ".pdf";
          $file = fopen($archivo, "rb");
          //if($file) echo "esta sigue";
          } */
        //echo $resviejo;
        /* if (!@copy('http://bo.unsa.edu.ar/dr/R' . $anio, './R-DR-' . $anio . '-' . $resviejo . '.pdf')) {
          //if (copy($file, "tarja/R-DR-" . $anio . "-" . $resviejo . ".pdf"))

          $errors = error_get_last();
          echo "COPY ERROR: " . $errors['type'];
          echo "<br />\n" . $errors['message'];
          } else {
          echo "se copioooo";
          } */

        /* Escribir los datos aqui. */
        // echo $_SERVER['HTTP_USER_AGENT'];
        /* if (fwrite($file, $_SERVER['HTTP_USER_AGENT'] . "\n"))
          echo "saklio";
          else
          echo "error fwrite"; */
        // fclose($file);
        /* $fd = fopen($url, "r");
          echo $url_content;
          while (!feof($fd)) {
          echo "entre!   ";
          $buffer = fgets($fd, 4096);
          // $buffer = preg_replace("/<a href=\"(.*)\.gif\">/esiU", "caga('leer abajo')", $buffer);
          //echo $buffer;
          break;
          }
          fclose($fd);
         */

        /*
          $url_content = file_get_contents($url);
          $tamañoviejo = 75693;
          $resviejo = "0549";
          $tamaño = strlen($url_content);
          if ($tamañoviejo != $tamaño) {
          echo "entre";
          // hay actualizacion, buscar el ultimo numero de resolucion encontrado
          $enlace = "http://bo.unsa.edu.ar/dr/R" . $anio . "/R-DR-" . $anio . "-" . $resviejo . ".pdf";
          //http://bo.unsa.edu.ar/dr/R2014/R-DR-2014-0544.pdf
          echo $enlace;
          header("Content-Disposition: attachment; filename=R-DR-" . $anio . "-" . $$resviejo);

          header("Content-Type: application/octet-stream");

          header("Content-Length: " . filesize($enlace));

          ob_clean();
          flush();
          readfile($enlace);
          exit; */
        //}
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "dashboard.php - GetResoluciones", $anio);
    }
}