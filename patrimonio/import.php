<?php
require_once '/var/www/html/tape/class/cdump.php';
require_once ('/var/www/html/tape/class/cconf.php');
require_once ('/var/www/html/tape/class/cerrors.php');

function Import() {
    extract($_POST, EXTR_SKIP);
    include("config.php");
    $usuario = Conf::BD_USER;
    $clave = Conf::BD_PASS;
    $url = Conf::BD_SERVER;
    $base = Conf::BD_NAME;
    $importar = $_POST["importar"];
    $chivo = $_FILES['chivo']['tmp_name'];
    if (isset($importar)) {

        $fp = fopen($chivo, "r") or die("NO SE PUEDE ABRIR archivo <b>$chivo</b>");

        try {
            $conexion = mysql_connect($url, $usuario, $clave);
            mysql_select_db($base, $conexion);

            while (!feof($fp)) {
                try {
                    $linea = fgets($fp, 1024);
                    $campos = explode("\t", $linea);
                    if ($campos[0] != "") {
                        if ($campos[1] == "")
                            $campos[1] = 0;
                        if ($campos[2] == "")
                            $campos[2] = 0;
                        if ($campos[3] == "")
                            $campos[3] = 0;
                        //echo "(".$campos[1].")".($campos[2] == ""?1:0);
                        $query = "INSERT INTO Patrimonio
                  (Inventario,Cta,Sub,Inv,AltaDep,AltaNro,AltaAno,Descripcion,DependenciaId,Leg,Responsable)
                  VALUES
                  (" . $campos[0] . "," . $campos[1] . "," . $campos[2] . "," . $campos[3] . "," . $campos[4] . "," . $campos[5] . "," . $campos[6] . ",'" . $campos[7] . "',"
                                . $campos[10] . "," . $campos[8] . ",'" . $campos[9] . "');";

                        mysql_query($query, $conexion);
                        echo "<br/>" . $query;
                    }
                } catch (Exception $ex) {
                    $error = new Errors();
                    $error->SendErrorMessage($ex, "import.php - Patrimonio", $ex);
                }
            };
            mysql_close($conexion);
        } catch (Exception $ex) {
            echo "Hubo error al cargar el archivo";
        }
    } else {
        echo '<form enctype=multipart/form-data action="import.php" method=post>';
//echo '<center>';
//echo '<center>Ingrese usuario Administrador:<input type="text" name="usuario"></center><br><br>';
//echo '<center>Ingrese clave del Administrador:<input type="password" name="clave"></center><br><br>';
        echo 'Ingrese el Archivo a Importar : &nbsp; <input type="file" name="chivo" id="chivo">><br><br>';
        echo '<input type="submit" name="importar" value="Importar archivo">';
        echo '</form>';
    }
}
?>
    <?php include "../include/header.php"; ?>
<?php include "../include/menu.php"; ?>
<div id="content"> 
<?php Import(); ?>
</div>
<?php include "../include/footer.php"; ?>