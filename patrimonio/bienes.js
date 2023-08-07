/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/****************/
var CurrentObject;
var inv = 0, dep = "44", leg = 0, ba = 2;
x_LoadBienes(inv, leg, dep, ba, LoadBienes_callback);
var grid, ridx;

function GridPanel(store, deps, legs)
{
    Ext.tip.QuickTipManager.init();
    var baja = [[2, 'Todos'], [1, 'Baja'], [0, 'En Uso']];

    var stbaja = new Ext.data.ArrayStore({
        fields: ['BajaId', 'Baja'],
        data: baja
    });

    var a = [0, 'Todas'];
    deps.push(a);
    var stdeps = new Ext.data.ArrayStore({
        fields: ['DependenciaId', 'Nombre'],
        data: deps
    });
    var b = [0, 'Todos'];
    legs.push(b);
    var stlegs = new Ext.data.ArrayStore({
        fields: ['Leg', 'Responsable'],
        data: legs
    });
    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });
    grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [{
                header: 'Inventario',
                dataIndex: 'Inventario',
                flex: 1
            },
            {
                header: 'Descripcion',
                dataIndex: 'Descripcion',
                flex: 1
            },
            {
                header: 'Leg',
                dataIndex: 'Leg',
                flex: 1
            },
            {
                header: 'Responsable',
                dataIndex: 'Responsable',
                flex: 1
            },
            {
                header: 'Dependencia',
                dataIndex: 'Dependencia',
                flex: 1
            },
            {
                header: 'Baja',
                dataIndex: 'Baja',
                flex: 1
            }
            ,
            {
                header: 'Localizado',
                dataIndex: 'Localizado',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            }
        ],
        selModel: {
            selType: 'cellmodel'
        },
        renderTo: 'tblBienes',
        width: 900,
        height: 457,
        //stripeRows: true,
        title: 'Reporte Bienes Obras y Servicios - UNSa',
        frame: true,
        tbar: [{
                xtype: 'textfield',
                fieldLabel: 'Inv',
                labelWidth: 20,
                id: 'txtInv',
                mode: 'local',
                value: inv,
                width: 100,
                listeners: {
                    blur: function(txt, record, idx) {
                        inv = txt.value;
                        if (!inv)
                            inv = 0;
                        x_LoadBienes(inv, leg, dep, ba, LoadBienes_callback);

                    },
                    specialkey: function(txt, e) {
                        if (e.getKey() === e.ENTER) {
                            inv = txt.value;
                            if (!inv)
                                inv = 0;
                            x_LoadBienes(inv, leg, dep, ba, LoadBienes_callback);

                        }
                    }
                }

            }
            ,
            {
                xtype: 'combo',
                fieldLabel: 'Res',
                labelWidth: 30,
                store: stlegs,
                id: 'ddlResp',
                valueField: 'Leg',
                displayField: 'Responsable',
                typeAhead: true,
                mode: 'local',
                // forceSelection: true,
                value: leg,
                width: 250,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        leg = combo.value;
                        x_LoadBienes(inv, leg, dep, ba, LoadBienes_callback);
                    }
                }

            }
            , {
                xtype: 'combo',
                fieldLabel: 'Dep',
                labelWidth: 30,
                store: stdeps,
                id: 'ddlDep',
                valueField: 'DependenciaId',
                displayField: 'Nombre',
                typeAhead: true,
                mode: 'local',
                //forceSelection: true,
                value: dep,
                width: 250,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        dep = combo.value;
                        x_LoadBienes(inv, leg, dep, ba, LoadBienes_callback);
                    }
                }

            }, '-', {
                xtype: 'combo',
                fieldLabel: 'Baja',
                labelWidth: 30,
                store: stbaja,
                id: 'ddlBaja',
                valueField: 'BajaId',
                displayField: 'Baja',
                typeAhead: true,
                mode: 'local',
                //forceSelection: true,
                value: ba,
                width: 120,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        ba = combo.value;
                        x_LoadBienes(inv, leg, dep, ba, LoadBienes_callback);
                    }
                }

            }, '-', {
                text: 'Guardar',
                iconCls: 'icon-add',
                handler: function() {
                    SavePat(grid);
                }
            },
            {
                text: 'Print',
                iconCls: 'icon-print',
                handler: function() {
                    Ext.ux.grid.Printer.mainTitle = "Lista de Bienes";
                    Ext.ux.grid.Printer.headerText = "Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios";
                    Ext.ux.grid.Printer.printLinkText = "Imprimir";
                    Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                    Ext.ux.grid.Printer.printAutomatically = false;
                    Ext.ux.grid.Printer.print(grid);

                }
            }
        ],
        plugins: [cellEditing]
    });
    return grid;
}
function LoadBienes_callback(response)
{
    $("#tblBienes").html("");
    var data = ObjToArray(response[1]);
    var deps = ObjToArray(response[2]);
    var legs = ObjToArray(response[3]);
    Ext.onReady(function() {
        // Define our data model
        var win;
        Ext.define('Bien', {
            extend: 'Ext.data.Model',
            fields: ['PatrimonioId', 'Inventario', 'Responsable', 'Descripcion', 'DependenciaId', 'Dependencia', 'Leg', 'Baja', 'Localizado']
        });


        // create the Data Store
        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            pageSize: 10,
            remoteSort: true,
            model: 'Bien',
            proxy: {
                type: 'memory',
            },
            data: data
        });
        var grid = GridPanel(store, deps, legs);
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
            if (key === "PatrimonioId" || key === "Localizado") {
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
            }
            if (!found) { // model field not used on Grid Column, can be used on RowExpander
                var varName = Ext.String.createVarName(key);
                convertedData[varName] = value;
            }
        }

        data.push(convertedData);
    });
    return data;
}

function SavePat(grid)
{
    var data = GetAllDataGrid(grid);
    //alert(var_export(data));
    var pat = JSON.stringify(data);
    console.log(pat);
    x_SavePat(pat, SavePat_callback);
}
function SavePat_callback(response)
{
    if (response)
    {
        humane.success("Se ha guardado las modificaciones correctamente.");
        x_LoadBienes(inv, leg, dep, ba, LoadBienes_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar las modificaciones.");
        SendJsError(new Error("Error Actualizando Bienes"), "bienes.js", response);
    }

}
