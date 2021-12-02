var date = new Date();
var mes = date.getMonth();
var anio = date.getFullYear();
var mesNom = date.toLocaleString();
mes = mes + 1;
var grid;
$(function () {

    x_LoadLicencias(anio, LoadLicencias_callback);
});

function ResumeHeader()
{
    var header;
    try
    {
        //  var mes = Ext.getCmp('ddlMes').rawValue;
        //   var anio = Ext.getCmp('ddlAnio').rawValue;
        var colshide = '';
        header = "<div>UNIVERSIDAD NACIONAL DE SALTA<br/>OBRAS Y SERVICIOS - RECTORADO</div>";
        var title = "<div align='center'><u>Licencia anual ordinaria correspondiente al año " + (anio + 1) + "</u></div>";
        var addHeader = "";
        var footer = "<ul style='list-style: disc'>" +
                "<li>Lic. Anual calculada en bae a la antiguedad en la liquidacion de sueldos del mes de Noviembre. En caso de ser necesario cada dependencia debe informar cualquier novedad, que se derevide la presente planilla a Dirección General de Personal (DGP)</li>" +
                "<li>Una copia de las planillas deber ser remitida a la DGP, informando los dias de licencia que goza cada agente como la canitdad de días pendientes hasta el 1 marzo de cada año.</li><li>En relacion a las licencias pendientes, se solicita a las responsables de las distintas áreas y/o dependencias programar el goce de las mismas en el resto del año.</li><li>Cada responsable y/o dependencia deberá informar las causas por el reingreso o el no goce integro de la licencia, justificando de esa manera la interrupción recordando lo establecido en las normas reglamentarias en lo que respecta a fraccionamiento y discontinuidad debiendo observar la continuidad en los casos de fallecimiento y/p enfermedad.</li>" +
                "<li>El encargado de personal o quien intervenga en la preparación de las presentes planillas se hará responsable por el goce de licencia en exceso.</li><li>Cada planilla deberá ser girada ala DGP y rubricada por el Jefe de Área Personal y el Director General de la misma.</li>" +
                "</ul><div style='float:right'>Salta, " + (new Date()).f('dd/MM/yyyy') + "</div>";
        header += title;
        //header += "<br/>Fecha Emisión: " + (new Date()).f('dd/MM/yyyy');
        header += addHeader;
        return [header, colshide, footer];
    } catch (e)
    {
        SendJsError(e, "ResumeHeader - licencias.js", header);
    }
}
var loading;
function LoadLicencias_callback(response)
{
    if (response)
    {
        $("#editor-grid").html("");
        var data = ObjToArray(response[1]);
        // Define our data model
        Ext.onReady(function () {
            Ext.define('Personas', {
                extend: 'Ext.data.Model',
                fields: ['Legajo', 'ApellidoNombre', 'Cat', 'AnosAl', 'LicA', 'LicAnt', 'CP', 'Total', {name: 'Inicio', type: 'date', dateFormat: 'd/m/Y'},
                    {name: 'Fin', type: 'date', dateFormat: 'd/m/Y'},
                    'Correccion',
                    'Notificado'
                ]
            });
            var store = Ext.create('Ext.data.Store', {
                // destroy the store if the grid is destroyed
                autoDestroy: true,
                model: 'Personas',
                proxy: {
                    type: 'memory'
                },
                data: data,
                sorters: [{
                        property: 'ApellidoNombre',
                        direction: 'ASC'
                    }]
            });


            var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToMoveEditor: 1,
                autoCancel: false,
                saveText: 'Actualizar',
                listeners: {
                    edit: function (editor, e) {
                        var totalDays = parseInt(e.record.data['LicA']);
                        var tom = e.record.data['LicAnt'].replace(/\D/g, "");
                        var tcp = e.record.data['CP'].replace(/\D/g, "");
                        if (tcp) {
                            /*var nums = tcp.replace(/\D/g, "");
                             var letrs = tcp.replace(/\d/g, "");*/
                            totalDays += parseInt(tcp);

                        }
                        if (tom) {
                            totalDays += parseInt(tom);
                        }
                        e.record.data['Total'] = totalDays;
                        var final = new Date(e.record.data['Inicio']);
                        var finalday = new Date(final.getFullYear(), final.getMonth(), (final.getDate() + totalDays));
                        e.record.data['Fin'] = finalday;
                        e.record.commit();
                        // console.log(e.record);
                        var griddata = GetAllDataGrid(e.record);
                        // console.log(griddata);
                        var data = JSON.stringify(griddata);
                        x_Guardar(data, Guardar_callback);
                    }
                }
            });
            var panel0 = Ext.create('widget.panel', {
                width: 1024,
                height: 440,
                title: 'Licencia ANUAL - DGOyS ',
                renderTo: 'editor-grid',
                autoScroll: true,
                columns: 2,
                bodyStyle: "background-color:#F7F9FC",
                padding: 0,
                margin: 0

            });
            loading = new Ext.LoadMask(panel0, {msg: "Por favor espere ..."});
            // create the grid and specify what field you want
            // to use for the editor at each column.
            grid = Ext.create('Ext.grid.Panel', {
                store: store,
                columns: [{
                        header: 'Leg. Nº',
                        dataIndex: 'Legajo',
                        flex: 1,
                        align: 'center',
                        editor: {
                            // defaults to textfield if no xtype is supplied
                            allowBlank: false
                        }
                    }, {
                        header: 'Apellido y Nombre',
                        dataIndex: 'ApellidoNombre',
                        width: 200,
                        flex: 1,
                        editor: {
                            // defaults to textfield if no xtype is supplied
                            allowBlank: false
                        }
                    }, {
                        header: 'Categ',
                        dataIndex: 'Cat',
                        flex: 1,
                        align: 'center',
                        editor: {
                            // defaults to textfield if no xtype is supplied
                            allowBlank: false
                        }
                    }, {
                        header: 'Años al 01/01/' + (anio + 1),
                        dataIndex: 'AnosAl',
                        width: 30,
                        align: 'center',
                        editor: {
                            allowBlank: false,
                            //vtype: 'email'
                        }
                    }, {
                        header: 'Licencia ANUAL',
                        dataIndex: 'LicA',
                        // width:70,
                        align: 'center',
                        flex: 1,
                        editor: {
                            // defaults to textfield if no xtype is supplied
                            allowBlank: false
                        }
                    }, {
                        header: 'Lic.ant',
                        dataIndex: 'LicAnt',
                        align: 'center',
                        flex: 1,
                        editor: {
                            // defaults to textfield if no xtype is supplied
                            //allowBlank: false
                        }
                    }, {
                        header: 'Compensatorio',
                        dataIndex: 'CP',
                        align: 'center',
                        flex: 1,
                        editor: {
                            // defaults to textfield if no xtype is supplied
                            //allowBlank: false
                        }
                    }, {
                        header: 'Total Dias',
                        dataIndex: 'Total',
                        align: 'center',
                        flex: 1,
                        editor: {
                            // defaults to textfield if no xtype is supplied
                            allowBlank: false
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        header: 'Inicio',
                        align: 'center',
                        dataIndex: 'Inicio',
                        // width: 90, 
                        format: 'd/m/Y',
                        submitFormat: 'Y-m-d H:i:s',
                        editor: {
                            xtype: 'datefield',
                            allowBlank: false,
                            format: 'd/m/Y',
                            submitFormat: 'Y-m-d H:i:s',
                            //minValue: '01/01/' + (anio + 1),
                            // minText: 'La fecha no puede ser anterior al 01/01/2015',
                            //  maxValue: Ext.Date.format(new Date(), 'm/d/Y')
                        }
                    }, {
                        xtype: 'datecolumn',
                        header: 'Fin',
                        dataIndex: 'Fin',
                        align: 'center',
                        //width: 90,
                        format: 'd/m/Y',
                        submitFormat: 'Y-m-d H:i:s',
                        editor: {
                            xtype: 'datefield',
                            allowBlank: false,
                            format: 'd/m/Y',
                            submitFormat: 'Y-m-d H:i:s',
                            //minValue: '21/01/' + (anio + 1),
                            //  minText: 'La fecha no puede ser anterior al 01/01/2015',
                            // maxValue: Ext.Date.format(new Date(), 'm/d/Y')
                        }
                    }, {
                        header: 'Correccion',
                        dataIndex: 'Correccion',
                        //width:150

                    }, {
                        header: 'Notificado',
                        dataIndex: 'Notificado',
                        width: 150
                    }],
                renderTo: 'editor-grid',
                width: 1040,
                height: 456,
                title: 'Personal - DGOyS',
                frame: true,
                tbar: [{
                        text: 'Actualizar',
                        icon: '../images/icons/update16x16.png',
                        handler: function () {

                            Ext.Msg.confirm('Actualizar Datos', 'Esto actualizara todos los datos, perdera los cambios que haya realizado. Esta seguro ?', function (button) {
                                if (button === 'yes') {
                                    loading.show();
                                    x_Actualizar(anio, PrintAnual_callback);

                                }
                            })

                        }
                    }, {
                        itemId: 'imprimir',
                        text: 'Imprimir',
                        iconCls: 'icon-print',
                        handler: function () {
                            var resume = ResumeHeader();
                            Ext.ux.grid.PrinterLicencias.mainTitle = "";
                            Ext.ux.grid.PrinterLicencias.headerText = resume[0];
                            Ext.ux.grid.PrinterLicencias.printLinkText = "Imprimir";
                            Ext.ux.grid.PrinterLicencias.closeLinkText = "Cerrar";
                            Ext.ux.grid.PrinterLicencias.printSummary = false;
                            Ext.ux.grid.PrinterLicencias.columnsHide = resume[1];
                            Ext.ux.grid.PrinterLicencias.marginExpte = "<br/>";
                            Ext.ux.grid.PrinterLicencias.printAutomatically = false;
                            Ext.ux.grid.PrinterLicencias.footerText = resume[2];

                            Ext.ux.grid.PrinterLicencias.print(grid);
                        }
                    }, {
                        itemId: 'personal',
                        text: 'Imprimir Rep. Personal',
                        iconCls: 'icon-print',
                        handler: function () {
                           /* var gridPrint =  Ext.create('Ext.grid.Panel', { store: grid.store});
                            gridPrint.store.filterBy(function (rec) { //console.log(rec); return true;
                            rec.data['LicAnt'] ="---";
                            rec.data['CP'] ="---";
                            rec.data['Total'] = rec.data ['LicA'];
                            return true;
                                if (rec.data['ExpedienteId'] !== "0") {
                                    return true;
                                } else {
                                    return false;
                                }
                            });*/
                            var resume = ResumeHeader();
                            Ext.ux.grid.PrinterLicenciasPersonal.mainTitle = "";
                            Ext.ux.grid.PrinterLicenciasPersonal.headerText = resume[0];
                            Ext.ux.grid.PrinterLicenciasPersonal.printLinkText = "Imprimir";
                            Ext.ux.grid.PrinterLicenciasPersonal.closeLinkText = "Cerrar";
                            Ext.ux.grid.PrinterLicenciasPersonal.printSummary = false;
                         //   Ext.ux.grid.PrinterLicenciasPersonal.columnsHide = "5,6";
                            Ext.ux.grid.PrinterLicenciasPersonal.marginExpte = "<br/>";
                            Ext.ux.grid.PrinterLicenciasPersonal.printAutomatically = false;
                            Ext.ux.grid.PrinterLicenciasPersonal.footerText = resume[2];

                            Ext.ux.grid.PrinterLicenciasPersonal.print(grid);
                        }
                    }/*, , {
                     itemId: 'guardar',
                     text: 'Guardar',
                     iconCls: 'icon-save',
                     handler: function () {
                     loading.show();
                     var griddata = GetAllDataGrid(grid);
                     console.log(griddata);
                     var data = JSON.stringify(griddata);
                     x_Guardar(data, Guardar_callback);
                     }
                     }*/],
                plugins: [rowEditing],
                listeners: {
                    'selectionchange': function (view, records) {
                        //grid.down('#removeEmployee').setDisabled(!records.length);
                    }
                }
            });
            panel0.add(grid);
            //console.log(data);

            //  grid.getView().bindStore(store);
            //  console.log(grid.tbar);
            //grid.getTopToolbar().items.itemAt(2).setHandler(testFunc); 
            return grid;
        });
    }

}
function PrintAnual_callback(response)
{

    try
    {
        loading.hide();
        LoadLicencias_callback(response);
    }
    catch (e)
    {
        humane.error("Hubo un error.");
        SendJsError(e, "PrintAnual_callback - personas.js");
        loading.hide();
    }
}
function Guardar_callback(response)
{

    try
    {
        if (response)
        {
            loading.hide();
            humane.success("Se ha guardado correctamente.");
        }
        else
        {
            humane.error("Hubo un error al guardar los datos.");
            SendJsError(new Error("Guardar_callback-licencia.js"), "licencia.js", response);
        }
    }
    catch (e)
    {
        humane.error("Hubo un error.");
        SendJsError(e, "Guardar_callback - licencia.js");
        loading.hide();
    }
}
function GetAllDataGrid(grid)
{
    var columns = [];
    //account for grouped columns
    Ext.each(grid.columns, function (c) {
        if (c.items.length > 0) {
            columns = columns.concat(c.items.items);
        } else {
            columns.push(c);
        }
    });
    var data = [];
    grid.store.data.each(function (item, row) {
        var convertedData = {};

        //apply renderers from column model
        for (var key in item.data) {
            var value = item.data[key];
            var found = false;
            /*  if (key !== "Usuario") {*/
            Ext.each(columns, function (column, col) {

                if (column && column.dataIndex == key) {

                    /*
                     * TODO: add the meta to template
                     */
                    var meta = {
                        item: '',
                        tdAttr: '',
                        style: ''
                    };
                    if (column.xtype === 'checkcolumn')
                    {
                        if (value === true)
                            value = "Si";
                        else
                            value = "No";
                    }
                    else
                    {
                        value = column.renderer ? column.renderer.call(grid, value, meta, item, row, col, grid.store, grid.view) : value;
                        if (column.xtype === 'datecolumn')
                        {
                            value = new Date(value);
                            value = value.f("yyyy-MM-dd");
                        }
                    }
                    var varName = Ext.String.createVarName(column.dataIndex);
                    convertedData[varName] = value;
                    found = true;

                } else if (column && column.xtype === 'rownumberer') {

                    var varName = Ext.String.createVarName(column.id);
                    convertedData[varName] = (row + 1);
                    found = true;

                } else if (column && column.xtype === 'templatecolumn') {

                    value = column.tpl ? column.tpl.apply(item.data) : value;

                    var varName = Ext.String.createVarName(column.id);
                    convertedData[varName] = value;
                    found = true;

                }
            }, this);

            if (!found) { // model field not used on Grid Column, can be used on RowExpander
                var varName = Ext.String.createVarName(key);
                convertedData[varName] = value;
            }
        }
        /*   }*/
        data.push(convertedData);
    });
    return data;
}