/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/****************/
var CurrentObject;
x_LoadVehiculos(LoadVehiculos_callback);

function PopinUpdateKm(record)
{
    CurrentObject = record;
    var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
    var formFields = [
        {
            xtype: 'displayfield',
            fieldLabel: 'ID',
            name: 'VehiculoId',
            value: (record ? record.data['VehiculoId'] : null),
            editable: false
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Modelo',
            name: 'Modelo',
            value: (record ? record.data['Modelo'] : null),
            editable: false
        },
        {
            fieldLabel: 'Kilometraje',
            name: 'Kilometraje',
            afterLabelTextTpl: required,
            value: (record ? record.data['Kilometraje'] : null)
        }

    ];


    var win = Ext.create("Ext.window.Window", {
        title: 'Actualización de Kilometraje',
        bodyStyle: "padding: 5px",
        closable: true,
        modal: true,
        items: {
            xtype: "form",
            frame: true,
            defaultType: "textfield",
            overflowY: 'auto',
            items: formFields,
            buttons: [
                {
                    text: "Actualizar",
                    id: "new-record-update-button",
                    handler: function() {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            var rec = form.getValues();
                            if (!hasUpdate) {
                                this.up("window").close();
                                return;
                            }
                            x_UpdateKm(CurrentObject.data['VehiculoId'], rec['Kilometraje'], user, UpdateKm_callback);
                            this.up("window").close();
                        }
                    }
                },
                {
                    text: "Cancelar",
                    handler: function() {
                        this.up("window").close();
                    }
                }

            ],
            listeners: {
                afterrender: function() {
                    var that = this;
                    setTimeout(function() {
                        that.items.first().focus();
                    }, 750);

                    this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                        enter: function() {
                            Ext.getCmp("new-record-update-button").handler();
                        },
                        scope: this
                    });
                }
            }
        }
    });
    return win;
}
function FormField(record, tve, tcmb)
{
    var color = Ext.create('Ext.form.field.Picker', {
        fieldLabel: 'Color',
        name: 'Color',
        id: 'Color',
        //xtype:'Color',x-color-picker 
        value: (record ? record.data['Color'] : null),
        createPicker: function() {
            return Ext.create('Ext.picker.Color', {
                resizable: true,
                floating: true,
                select: function(selColor) {
                    Ext.getCmp('Color').setValue("#" + selColor);
                }
            });
        }
    });
    var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
    var formFields = [
        {
            xtype: 'displayfield',
            fieldLabel: 'ID',
            name: 'VehiculoId',
            value: (record ? record.data['VehiculoId'] : null),
            editable: false
        },
        {
            fieldLabel: 'Modelo',
            name: 'Modelo',
            afterLabelTextTpl: required,
            value: (record ? record.data['Modelo'] : null),
            width: 390,
            allowBlank: false
        },
        {
            fieldLabel: 'Patente',
            name: 'Patente',
            value: (record ? record.data['Patente'] : null),
            afterLabelTextTpl: required,
            width: 170,
            allowBlank: false
        },
        {
            fieldLabel: 'Capacidad',
            name: 'Capacidad',
            width: 140,
            afterLabelTextTpl: required,
            value: (record ? record.data['Capacidad'] : null),
            allowBlank: false

        },
        {
            fieldLabel: 'Año',
            name: 'Fecha',
            value: (record ? record.data['Fecha'] : null),
            width: 150,
            allowBlank: false
        },
        {
            xtype: 'combo',
            fieldLabel: 'Tipo Vehiculo',
            name: 'TipoVehiculoId',
            store: new Ext.data.ArrayStore({
                fields: ['TipoVehiculoId', 'Nombre'],
                data: tve // from states.js
            }),
            afterLabelTextTpl: required,
            valueField: 'TipoVehiculoId',
            displayField: 'Nombre',
            editable: false,
            forceSelection: true,
            allowBlank: false,
            value: (record ? record.data['TipoVehiculoId'] : null)
        },
        {
            xtype: 'combo',
            fieldLabel: 'Tipo Combustible',
            name: 'CombustibleId',
            store: new Ext.data.ArrayStore({
                fields: ['TipoId', 'Combustible'],
                data: tcmb // from states.js
            }),
            afterLabelTextTpl: required,
            valueField: 'TipoId',
            displayField: 'Combustible',
            editable: false,
            forceSelection: true,
            allowBlank: false,
            value: (record ? record.data['CombustibleId'] : null)
        },
        {
            fieldLabel: 'Consumo x Km',
            name: 'ConsumoxKM',
            width: 150,
            value: (record ? record.data['ConsumoxKM'] : null)
        },
        {
            fieldLabel: 'Kilometraje',
            name: 'Kilometraje',
            width: 210,
            value: (record ? record.data['Kilometraje'] : null)
        }, color
                /*
                 {
                 fieldLabel:'Color',
                 name: 'Color',
                 //xtype:'Color',
                 value:(record?record.data['Color']:null)
                 }*/,
        {
            xtype: 'textareafield',
            fieldLabel: 'Descripcion',
            name: 'Descripcion',
            width: 390,
            value: (record ? record.data['Descripcion'] : null)
        },
        {
            xtype: 'checkboxfield',
            name: 'Active',
            fieldLabel: 'Activo',
            boxLabel: 'Esta activo?',
            checked: (record ? record.data['Active'] : null)
        }
    ];

    return formFields;
}
function SaveVehiculo(form, action)
{
    var rec = form.getValues();
    if (action !== "add") {
        if (!hasUpdate) {
            return;
        }
        rec['VehiculoId'] = CurrentObject.data['VehiculoId'];
    }
    else
        rec['VehiculoId'] = 0;

    var vehiculo = JSON.stringify(rec);
    x_SaveVehiculo(vehiculo, SaveVehiculo_callback);
}
function SaveVehiculo_callback(response)
{
    if (response)
    {
        humane.success("Se ha guardado el vehiculo correctamente.");
        x_LoadVehiculos(LoadVehiculos_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar el vehiculo.");
        SendJsError(new Error("Error SaveVehiculo-vehiculoes.js"), "vehiculos.js", response);
    }

}
function PopinVehiculo(action, record, tipos, tcmb)
{

    var formFields = FormField(record, tipos, tcmb);
    CurrentObject = record;
    var title;
    if (action === "add")
        title = "Agregar Vehiculo";
    else
        title = "Editar Vehiculo";
    var win = Ext.create("Ext.window.Window", {
        title: title,
        bodyStyle: "padding: 5px",
        width: 440,
        closable: true,
        layout: 'fit',
        modal: true,
        items: {
            xtype: "form",
            frame: true,
            defaultType: "textfield",
            overflowY: 'auto',
            items: formFields,
            buttons: [
                {
                    text: "Agregar",
                    id: "new-record-add-button",
                    handler: function() {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            SaveVehiculo(form, action);
                            this.up("window").close();
                        }
                    }
                },
                {
                    text: "Cancelar",
                    handler: function() {
                        this.up("window").close();
                    }
                }

            ],
            listeners: {
                afterrender: function() {
                    var that = this;
                    setTimeout(function() {
                        that.items.first().focus();
                    }, 750);

                    this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                        enter: function() {
                            Ext.getCmp("new-record-add-button").handler();
                        },
                        scope: this
                    });
                }
            }
        }
    });
    return win;
}
function GridPanel(store, tve, tcmb)
{
    // create the grid and specify what field you want
    // to use for the editor at each column.


    Ext.tip.QuickTipManager.init();
    var win;
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [{
                header: 'Modelo',
                dataIndex: 'Modelo',
                flex: 1
            },
            {
                header: 'Patente',
                dataIndex: 'Patente',
                flex: 1
            },
            {
                header: 'Capacidad',
                dataIndex: 'Capacidad',
                flex: 1
            },
            {
                header: 'Consumo Km',
                dataIndex: 'ConsumoxKM',
                flex: 1
            },
            {
                header: 'Kilometraje',
                dataIndex: 'Kilometraje',
                flex: 1
            },
            {
                header: 'Color',
                dataIndex: 'Color',
                inputType: 'color',
                align: 'center',
                renderer: function(value)
                {
                    return "<div style='text-align:center;width:10px;height:10px;background-color:" + value + "'></div>";
                }
            },
            {
                // xtype: 'checkcolumn',
                header: 'Activo',
                dataIndex: 'Active',
                width: 60
            }, {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                header: 'Acciones',
                align: 'center',
                width: 70,
                items: [{
                        icon: '../images/icons/fam/delete.gif', // Use a URL in the icon config
                        tooltip: 'Borrar',
                        align: 'center',
                        altText: 'Borrar',
                        cls: 'x-icon-action',
                        handler: function(grid, rowIndex, colIndex) {
                            if (hasUpdate) {
                                var record = grid.store.getAt(rowIndex);
                                DeleteVehiculo(record, grid);
                            }
                        }
                    }, {
                        icon: '../images/icons/update16x16.png',
                        tooltip: 'Actualizar KM',
                        align: 'center',
                        altText: 'Actualizar KM',
                        handler: function(grid, rowIndex, colIndex) {
                            if (hasUpdate) {
                                var record = grid.store.getAt(rowIndex);
                                var win = PopinUpdateKm(record);
                                win.show();
                            }
                        }
                    }
                    , {
                        icon: '../images/icons/edit16x16.png',
                        tooltip: 'Editar',
                        align: 'center',
                        altText: 'Editar',
                        handler: function(grid, rowIndex, colIndex) {
                            if (hasUpdate) {
                                var record = grid.store.getAt(rowIndex);
                                var win = PopinVehiculo('edit', record, tve, tcmb);
                                win.show();
                            }

                        }

                    }]
            }
        ],
        renderTo: 'tblVehiculos',
        width: 900,
        height: 457,
        title: 'Vehiculos - Automotores UNSa',
        frame: true,
        tbar: [{
                text: 'Agregar Vehiculo',
                iconCls: 'icon-add',
                handler: function() {
                    if (hasInsert) {

                        var record = null;
                        var win = PopinVehiculo('add', record, tve, tcmb);
                        win.show();
                        Mascaras();
                    }
                }
            },
            {
                text: 'Print',
                iconCls: 'icon-print',
                handler: function() {
                    Ext.ux.grid.Printer.mainTitle = "Lista de Vehiculos";
                    Ext.ux.grid.Printer.headerText = "Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios";
                    Ext.ux.grid.Printer.printLinkText = "Imprimir";
                    Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                    Ext.ux.grid.Printer.printAutomatically = false;
                    Ext.ux.grid.Printer.print(grid);

                }
            }
        ],
        listeners: {
            //'selectionchange': function(view, records) {
            //}
        }
    });



    return grid;
}
function LoadVehiculos_callback(response)
{
    $("#tblVehiculos").html("");
    var data = ObjToArray(response[1]);
    var tiposve = ObjToArray(response[2]);
    var tcmb = ObjToArray(response[3]);
    Ext.onReady(function() {
        // Define our data model
        var win;
        Ext.define('Vehiculo', {
            extend: 'Ext.data.Model',
            fields: ['VehiculoId', 'Modelo', 'Patente', 'Capacidad', 'CombustibleId', 'TipoVehiculoId', 'Descripcion', 'ConsumoxKM', 'Kilometraje', 'Color', 'Active', 'Fecha']
        });
        // create the Data Store
        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            model: 'Vehiculo',
            proxy: {
                type: 'memory'
            },
            data: data,
            sorters: [{
                    property: 'Modelo',
                    direction: 'ASC'
                }]
        });
        var grid = GridPanel(store, tiposve, tcmb);
    });
}
function DeleteVehiculo(record, grid)
{
    if (hasUpdate) {
        Ext.Msg.confirm('Eliminar Vehiculo', 'Esta seguro que quiere eliminar este Vehiculo?', function(button) {
            if (button === 'yes') {

                var sm = grid.getSelectionModel();
                var rec = grid.getSelectionModel().getSelection()[0];

                grid.store.remove(sm.getSelection());
                if (grid.store.getCount() > 0) {
                    sm.select(0);
                }
                var vehiculoId = record.data['VehiculoId'];
                x_DeleteVehiculo(vehiculoId, DeleteVehiculo_callback);
            }
        });

    }
}
function DeleteVehiculo_callback(response)
{

    if (response)
    {
        humane.success("Se ha eliminado el vehiculo correctamente.");

        x_LoadVehiculos(LoadVehiculos_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar el vehiculo.");
        SendJsError(new Error("Error DeleteVehiculo-vehiculos.js"), "vehiculos.js", response);

    }

}
function UpdateKm_callback(response)
{
    if (response)
    {
        humane.success("Se ha actualizado el kilometraje correctamente.");
        x_LoadVehiculos(LoadVehiculos_callback);
    }
    else
    {
        humane.error("Hubo un error al actualizar el kilometraje.");
        SendJsError(new Error("Error UpdateKm-vehiculos.js"), "vehiculos.js", response);
    }

}
