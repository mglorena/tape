<?php
require_once '/var/www/html/tape/class/cdump.php';
require_once '/var/www/html/tape/emerald/class/cinfo.php';

function Import() {
    extract($_POST, EXTR_SKIP);
    include("config.php");
    $importar = $_POST["importar"];
    $chivo = $_FILES['chivo']['tmp_name'];
    // echo "<script> var loading = new Ext.LoadMask(panel0, {msg: 'Por favor espere ...'}); loading.show();</script>";
    if (isset($importar)) {
#        echo "<br>";
        $fp = fopen($chivo, "r") or die("NO SE PUEDE ABRIR archivo <b>$chivo</b>");
        $i = new Info();
        if ($i->CargaMes($fp)) {
#            echo '<center><h3>' . "El archivo $chivo fue importado con exito" . '</h3></center>';
#            echo '<center><a href="carga.php"> Volver </a></center>';
        }
        else
            echo '<center><h3>' . "El archivo $chivo no pudo ser importado con exito" . '</h3></center>';
#        echo "1";
        $i->GenerarInforme();
        //echo "<script>  loading.hide();</script>";
    } else {
        echo '<form enctype=multipart/form-data action="carga.php" method=post>';
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
   

    <div id="fi-form"></div>
    <script>
        Ext.onReady(function() {

//  Class which shows invisible file input field.
            if (window.location.href.indexOf('debug') !== -1) {
                Ext.getBody().addCls('x-debug');
            }

            var msg = function(title, msg) {
                Ext.Msg.show({
                    title: title,
                    msg: msg,
                    minWidth: 200,
                    modal: true,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            };

            Ext.create('Ext.form.Panel', {
                renderTo: 'fi-form',
                width: 500,
                frame: true,
                title: 'TELEFONÍA - Importar archivo del sistema Emerald CASW',
                bodyPadding: '10 10 0',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',
                    labelWidth: 50
                },
                items: [ {
                        xtype: 'filefield',
                        id: 'form-file',
                        emptyText: 'Seleccione un archivo',
                        fieldLabel: 'Archivo',
                        name: 'file-path',
                        buttonText: 'Buscar'
                    }],
                buttons: [{
                        text: 'Importar',
                        handler: function() {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    url: 'file-upload.php',
                                    waitMsg: 'Subiendo y procesando archivo...',
                                    success: function(fp, o) {
                                        msg('Importe Existoso', 'Archivo importado "' + o.result.file + '"');
                                    }
                                });
                            }
                        }
                    }, {
                        text: 'Limpiar',
                        handler: function() {
                            this.up('form').getForm().reset();
                        }
                    }]
            });
        });

    </script>
</div>
<?php include "../include/footer.php"; ?>