<?php
/*
 * Created on 09/11/2011
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
/* session_start(); */

//echo $HOST_URL;
$rulesIds = explode(",", $_SESSION['S_rules']);
?>
<div style='border-bottom:solid 0px  navy;height:33px;width:99%;padding-left:23px'>


    <?php
    // RULES
    echo '<script>var rules="';
    $sep = "";
    foreach ($rulesIds as $r) {
        echo $sep . $r;
        $sep = ",";
    }
    echo '"; ';
    echo '</script>';
    ?>
    <script>
        Ext.onReady(function () {
            Ext.QuickTips.init();
            rules = rules.split(",");

            // FUNCTION ONCLICK

            function oUrlClick(item) {
                if (typeof (item.stateId) !== "undefined")
                {
                    if (jQuery.inArray(item.stateId, rules) !== -1)
                    {
                        document.location.href = _WebSitePath + item.url;
                    }
                }
                else
                    document.location.href = _WebSitePath + item.url;

            }

            ///

            var autoMenu,
                    servMenu,
                    patMenu,
                    persoMenu,
                    adminMenu,
                    comprasMenu,
                    depoMenu;
            var ms = [], ma = [], mp = [], mad = [], mper = [], mcom = [], md = [];
            var smenu, admenu, permenu, amenu, pmenu, cmenu, dmenu;
            var rsub = [], esub = [], agsub = [], gsub = [], tsub = [], hsub = [];

            // MENU AUTOMOTORES
            if (jQuery.inArray("19", rules) !== -1) {
                ma.push({text: 'Choferes',
                    url: 'auto/choferes.php',
                    stateId: '19',
                    handler: oUrlClick});
            }

            if (jQuery.inArray("10", rules) !== -1)
            {
                ma.push({text: 'Reservas', menu: rsub});
                if (jQuery.inArray("13", rules) !== -1)
                    rsub.push({text: 'Cargar/Editar', url: 'auto/reservas.php', stateId: '13', handler: oUrlClick});
                if (jQuery.inArray("23", rules) !== -1)
                {
                    rsub.push({text: 'Reporte',
                        url: 'auto/reservasrep.php',
                        stateId: '23',
                        handler: oUrlClick});
                    rsub.push({text: 'Reporte por Vehiculo',
                        url: 'auto/reservasrepv.php',
                        stateId: '23',
                        handler: oUrlClick});
                    rsub.push({text: 'Reporte por Vehiculo Disponibilidad',
                        url: 'auto/reservasrepv2.php',
                        stateId: '23',
                        handler: oUrlClick});
                }
            }
            rsub.push({text: 'Calendario',
                url: 'auto/calendario.php',
                handler: oUrlClick});
            if (jQuery.inArray("16", rules) !== -1) {
                ma.push({text: 'Vehiculos',
                    url: 'auto/vehiculos.php',
                    stateId: '16',
                    handler: oUrlClick});
            }

            if (jQuery.inArray("24", rules) !== -1) {
                ma.push({text: 'Horas Extras',
                    menu: hsub});
                if (jQuery.inArray("25", rules) !== -1)
                    hsub.push({text: 'Cargar /Editar',
                        url: 'auto/horaex.php',
                        stateId: '25',
                        handler: oUrlClick});
                if (jQuery.inArray("26", rules) !== -1)
                    hsub.push({text: 'Impresion',
                        url: 'auto/horaexrep.php',
                        stateId: '26',
                        handler: oUrlClick});
                if (jQuery.inArray("26", rules) !== -1)
                    hsub.push({text: 'Reporte por Chofer',
                        url: 'auto/horaexrepch.php',
                        stateId: '26',
                        handler: oUrlClick});
                if (jQuery.inArray("26", rules) !== -1)
                    hsub.push({text: 'Reporte por Dependencia',
                        url: 'auto/horaexrepdep.php',
                        stateId: '26',
                        handler: oUrlClick});
            }
            amenu = Ext.create('Ext.menu.Menu', {
                id: 'menuAutomotores',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: ma
            });


            if (jQuery.inArray("10", rules) !== -1)
            {
                autoMenu = {text: 'Automotores', iconCls: 'bmenu', menu: amenu};

            }
            //

            // MENU COMPRAS
            mcom.push({text: 'Proveedores', url: 'compras/proveedores.php',
                stateId: '34',
                handler: oUrlClick});
            mcom.push({text: 'Expedientes', url: 'compras/expedientes.php',
                stateId: '34',
                handler: oUrlClick});
            cmenu = Ext.create('Ext.menu.Menu', {
                id: 'menuCompras',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: mcom
            });
            if (jQuery.inArray("33", rules) !== -1)
            {
                comprasMenu = {text: 'Compras', iconCls: 'bmenu', menu: cmenu};

            }

            //MENU SERVICIOS
            ms.push({text: 'Electricidad', url: 'servicios/carga.php?s=2',
                stateId: '28',
                handler: oUrlClick});
            ms.push({text: 'Agua', url: 'servicios/carga.php?s=1',
                stateId: '28',
                handler: oUrlClick});
            ms.push({text: 'Gas', url: 'servicios/carga.php?s=3',
                stateId: '28',
                handler: oUrlClick});
            tsub.push({text: 'Cargar', url: 'emerald/carga.php',
                stateId: '28',
                handler: oUrlClick});
            tsub.push({text: 'Reporte', url: 'emerald/reportetelefonico.php',
                stateId: '28',
                handler: oUrlClick});
            ms.push({text: 'Telefónia', menu: tsub});

            mp.push({text: 'Informe', url: 'patrimonio/bienes.php',
                stateId: '27',
                handler: oUrlClick});
            ms.push({text: 'Graficos', url: 'servicios/graficos.php',
                stateId: '28',
                handler: oUrlClick});

            smenu = Ext.create('Ext.menu.Menu', {
                id: 'menuServicios',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: ms
            });
            if (jQuery.inArray("28", rules) !== -1)
            {
                servMenu = {text: 'Servicios', iconCls: 'bmenu', menu: smenu};

            }
            // MENU ADMIN
            mad.push({text: 'Usuarios', url: 'admin/users.php',
                stateId: '1',
                handler: oUrlClick});
            mad.push({text: 'Profiles', url: 'admin/ruleprofiles.php',
                stateId: '1',
                handler: oUrlClick});
            admenu = Ext.create('Ext.menu.Menu', {
                id: 'menuAdmin',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: mad
            });
            if (jQuery.inArray("1", rules) !== -1)
            {
                adminMenu = {text: 'Admin', iconCls: 'bmenu', menu: admenu};

            }

            // MENU PERSONAL
            mper.push({text: 'Novedades', url: 'tarja/novedades.php',
                stateId: '30',
                handler: oUrlClick});
            mper.push({text: 'Personal', url: 'tarja/personas.php',
                stateId: '30',
                handler: oUrlClick});
            mper.push({text: 'Jornada', url: 'tarja/jornada.php',
                stateId: '32',
                handler: oUrlClick});
            mper.push({text: 'Organizaciones', url: 'tarja/orgas.php',
                stateId: '35',
                handler: oUrlClick});
            mper.push({text: 'Licencia Anual', url: 'tarja/licencia.php',
                stateId: '30',
                handler: oUrlClick});
            mper.push({text: 'Registro Contratados', url: 'tarja/regcontratado.php',
                stateId: '30',
                handler: oUrlClick});
            permenu = Ext.create('Ext.menu.Menu', {
                id: 'menuPersonas',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: mper
            });
            if (jQuery.inArray("30", rules) !== -1)
            {
                persoMenu = {text: 'Personal', iconCls: 'bmenu', menu: permenu};

            }

            // MENU PATRIMONIO
            if (jQuery.inArray("1", rules) !== -1)
                mp.push({text: 'Importar', url: 'patrimonio/import.php',
                    stateId: '1',
                    handler: oUrlClick});

            pmenu = Ext.create('Ext.menu.Menu', {
                id: 'menuPatrimonio',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: mp
            });
            if (jQuery.inArray("27", rules) !== -1)
            {
                patMenu = {text: 'Patrimonio', iconCls: 'bmenu', menu: pmenu};

            }

            // MENU DEPOSITO
            if (jQuery.inArray("1", rules) !== -1)
                md.push({text: 'Inventario', url: 'deposito/inventario.php',
                    stateId: '1',
                    handler: oUrlClick});
            dmenu = Ext.create('Ext.menu.Menu', {
                id: 'menuDeposito',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: md
            });
            if (jQuery.inArray("27", rules) !== -1)
            {
                depoMenu = {text: 'Deposito', iconCls: 'bmenu', menu: dmenu};

            }


            // INICIALIZANDO MENU

            var tb = Ext.create('Ext.toolbar.Toolbar');
            tb.render('toolbar');
            tb.suspendLayouts();

            tb.add(autoMenu);
            tb.add(servMenu);
            tb.add(patMenu);
            tb.add(adminMenu);
            tb.add(persoMenu);
            tb.add(comprasMenu);
            tb.add(depoMenu);

            tb.resumeLayouts(true);
        });
    </script>


    <?php
    /* if (in_array(1, $rulesIds)) {
      echo "<li><a href=\"#\" class=\"menulink\">Deposito</a>";
      echo "<ul>";
      echo '<li><a  href="' . $host . 'deposito/inventario.php">Materiales</a></li>';
      echo "</ul>";
      echo "</li>";
      } */



    /*  if (in_array(1, $rulesIds)) {
      echo "<li><a href=\"#\" class=\"menulink\">Admin</a><ul>";
      echo '<li><a href="' . $host . 'admin/users.php">Usuarios</a></li>';
      }
      if (in_array(4, $rulesIds)) {
      echo '<li><a href="' . $host . 'admin/profiles.php">Perfiles</a></li>';
      }
      if (in_array(1, $rulesIds))
      echo "</ul>";
      ?> */
    ?>



    <div id="toolbar"></div>
</div>

<script>

</script>
