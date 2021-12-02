/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/****************/
var CurrentObject;
var date = new Date();
var dia = null;
var mes = date.getMonth();
var anio = date.getFullYear();
var mesNom = date.toLocaleString();



x_LoadServicios(mes, anio, tservicioId, LoadServicios_callback);

var grid, ridx;

function Name(tservicioId)
{
    if (tservicioId === 3)
        return "GAS";
    if (tservicioId === 1)
        return "AGUA";
    if (tservicioId === 2)
        return "ENERGIA ELECTRICA";

}
function GridPanel(store)
{
    // create the grid and specify what field you want
    // to use for the editor at each column.

    var anios = [[2015, '2015'], [2016, '2016'], [2017, '2017'], [2018, '2018'],[2019,'2019'],[2020,'2020'],[2021,'2021']];
    var anios = [[2010, '2010'], [2011, '2011'], [2012, '2012'], [2013, '2013'], [2014, '2014'], [2015, '2015'], [2016, '2016'], [2017, '2017'], [2018, '2018'],[2019,'2019']];
0

    var stanio = new Ext.data.ArrayStore({
        fields: ['id', 'anio'],
        data: anios
    });

    var meses = [[1, 'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'], [5, 'Mayo'], [6, 'Junio'], [7, 'Julio'], [8, 'Agosto'], [9, 'Septiembre'], [10, 'Octubre'], [11, 'Noviembre'], [12, 'Diciembre']];

    var stmes = new Ext.data.ArrayStore({
        fields: ['id', 'mes'],
        data: meses
    });

    Ext.tip.QuickTipManager.init();
    var win;

    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });

    grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [{
                header: 'Usuario',
                dataIndex: 'Usuario',
                flex: 1
            },
{ 
header: 'Paga',
dataIndex: 'Paga',
flex: 1
},
            {
                header: 'Medidor',
                dataIndex: 'Medidor',
                flex: 1
            },
{
header: 'Medicion Anterior',
dataIndex: 'MedicionA',
flex: 1
},

            {
                xtype: 'numbercolumn',
                format: '0',
                header: 'Medicion',
                dataIndex: 'Medicion',
                //renderer:'numberfield',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            }

        ],
        selModel: {
            selType: 'cellmodel'
        },
        renderTo: 'tblServicios',
        width: 900,
        height: 457,
        //stripeRows: true,
        title: "SERVICIO DE " + Name(tservicioId) + " - DGOyS UNSa",
        frame: true,
        tbar: [{
                xtype: 'combo',
                fieldLabel: 'Mes',
                labelWidth: 30,
                store: stmes,
                id: 'ddlMes',
                valueField: 'id',
                displayField: 'mes',
                typeAhead: true,
                mode: 'local',
                value: mes,
                width: 120,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        mes = combo.value;
                        x_LoadServicios(mes, anio, tservicioId, LoadServicios_callback);
                    }
                }

            }
            , {
                xtype: 'combo',
                fieldLabel: 'Año',
                labelWidth: 30,
                store: stanio,
                id: 'ddlAnio',
                valueField: 'id',
                displayField: 'anio',
                typeAhead: true,
                mode: 'local',
                value: anio,
                width: 120,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        anio = combo.value;
                        x_LoadServicios(mes, anio, tservicioId, LoadServicios_callback);
                    }
                }

            }, {
                text: 'Guardar Todo',
                iconCls: 'icon-add',
                handler: function() {
                    SaveServicio(grid);
                }
            }, {
                text: 'Imprimir Planilla',
                iconCls: 'icon-print',
                handler: function() {
                    var mesn = Ext.getCmp("ddlMes");
                    var mesn = mesn.rawValue;
                    var anio = Ext.getCmp("ddlAnio").getValue();
                    Ext.ux.grid.Printer.mainTitle = " Servicio de " + Name(tservicioId) + " <br/> Mes: " + mesn + "    Año : " + anio;
                    Ext.ux.grid.Printer.headerText = "Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios";
                    Ext.ux.grid.Printer.printLinkText = "Imprimir";
                    Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                    Ext.ux.grid.Printer.printAutomatically = false;
                    Ext.ux.grid.Printer.print(grid);
                }
            }, {
                text: 'Reporte',
                iconCls: 'icon-list',
                handler: function() {

                    document.location.href = _WebSitePath + 'servicios/reporte.php?s=' + tservicioId;
                }
            }, {
                text: 'Reporte Anual',
                iconCls: 'icon-list',
                handler: function() {

                    document.location.href = _WebSitePath + 'servicios/reporteanual.php?s=' + tservicioId;
                }
            }
        ],
        plugins: [cellEditing]
    });

    return grid;
}
function LoadServicios_callback(response)
{
    $("#tblServicios").html("");
    var data = ObjToArray(response[1]);

    Ext.onReady(function() {

        var win;
        Ext.define('Servicio', {
            extend: 'Ext.data.Model',
            fields: ['ServicioId', {name: 'Usuario', type: 'string'}, 'Medidor', 'Medicion', 'Mes', 'Anio','Paga','MedicionA']});


        // create the Data Store
        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            pageSize: 10,
            remoteSort: true,
            model: 'Servicio',
            proxy: {
                type: 'memory'

            },
            data: data
        });
        var grid = GridPanel(store);
    });
}

function GetAllDataGrid(grid)
{
    var columns = [];
    //account for grouped columns
    Ext.each(grid.columns, function(c) {
        if (c.items.length > 0) {
            columns = columns.concat(c.items.items);
        } else {
            columns.push(c);
        }
    });
    var data = [];
    grid.store.data.each(function(item, row) {
        var convertedData = {};

        //apply renderers from column model
        for (var key in item.data) {
            var value = item.data[key];
            var found = false;
            if (key !== "Usuario") {
                Ext.each(columns, function(column, col) {

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
        }
        data.push(convertedData);
    });
    return data;
}
function SaveServicio(grid)
{
    var data = GetAllDataGrid(grid);

    var servicio = JSON.stringify(data);
    console.log(servicio);
    x_SaveServicio(servicio,mes,anio, tservicioId, SaveServicio_callback);
}
function SaveServicio_callback(response)
{
    if (response)
    {
        humane.success("Se ha guardado las mediciones correctamente.");
        x_LoadServicios(mes, anio, tservicioId, LoadServicios_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar las mediciones.");
        SendJsError(new Error("Error Save Servicio"), "SaveServicio_callback - carga.js", response);
    }

}
