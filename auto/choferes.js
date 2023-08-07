var CurrentObject;
function Mascaras()
{
    jQuery(function($) {
        jQuery("[name='Celular']").mask("(387)-15-9999999");
        jQuery("[name='ValorHoraInhabil']").mask("999,9?9");
        jQuery("[name='ValorHoraHabil']").mask("999,9?9");
    });
}

function FormField(record)
{
    try {
        var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
        var formFields = [
            {
                xtype: 'displayfield',
                fieldLabel: 'ID',
                name: 'ChoferId',
                value: (record ? record.data['ChoferId'] : null),
                editable: false
            },
            {
                fieldLabel: 'Nombre',
                name: 'FirstName',
                afterLabelTextTpl: required,
                value: (record ? record.data['FirstName'] : null),
                allowBlank: false
            },
            {
                fieldLabel: 'Apellido',
                name: 'LastName',
                value: (record ? record.data['LastName'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                fieldLabel: 'Celular',
                name: 'Celular',
                value: (record ? record.data['Celular'] : null)
            },
            {
                fieldLabel: 'Legajo',
                name: 'Legajo',
                value: (record ? record.data['Legajo'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                fieldLabel: 'Valor Hora Inhabil',
                name: 'ValorHoraInhabil',
                value: (record ? record.data['ValorHoraInhabil'] : null)
            },
            {
                fieldLabel: 'Valor Hora Habil',
                name: 'ValorHoraHabil',
                value: (record ? record.data['ValorHoraHabil'] : null)
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
    catch (e)
    {
        SendJsError(e, "FormField - choferes.js", record);
    }
}

function SaveChofer(form, action)
{
    try
    {
        var rec = form.getValues();
        if (action !== "add") {
            if (!hasUpdate) {
                return;
            }
            rec['ChoferId'] = CurrentObject.data['ChoferId'];
        }
        else
            rec['VehiculoId'] = 0;
        rec['ValorHoraInhabil'] = rec['ValorHoraInhabil'].replace(",", ".");
        rec['ValorHoraHabil'] = rec['ValorHoraHabil'].replace(",", ".");
        var chofer = JSON.stringify(rec);
        x_SaveChofer(chofer, SaveChofer_callback);
    }
    catch (e)
    {
        SendJsError(e, "SaveChofer - choferes.js", action);
    }
}

function SaveChofer_callback(response)
{
    if (response)
    {
        humane.success("Se ha guardado el chofer correctamente.");
        x_LoadChoferes(LoadChoferes_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar el chofer.");
        SendJsError(new Error("Error SaveChofer-choferes.js"), "choferes.js", response);
    }

}

function PopinChofer(action, record, rIdx, grid)
{
    try
    {
        var formFields = FormField(record);
        CurrentObject = record;
        var title;
        if (action === "add")
            title = "Agregar Chofer";
        else
            title = "Editar Chofer";
        var win = Ext.create("Ext.window.Window", {
            title: title,
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
                        text: "Agregar",
                        id: "new-record-add-button",
                        handler: function() {
                            var form = this.up("form").getForm();
                            if (form.isValid())
                            {
                                SaveChofer(form, action);
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
    catch (e)
    {
        SendJsError(e, "PopinChofer - choferes.js", action);
    }
}

function GridPanel(store)
{
    try
    {
        Ext.tip.QuickTipManager.init();
        var win;
        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            columns: [{
                    header: 'Apellido',
                    dataIndex: 'LastName',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Nombre',
                    dataIndex: 'FirstName',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Celular',
                    dataIndex: 'Celular',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Legajo',
                    dataIndex: 'Legajo',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Valor Hora Inhabil',
                    dataIndex: 'ValorHoraInhabil',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    },
                    renderer: 'usMoney'
                },
                {
                    header: 'Valor Hora Habil',
                    dataIndex: 'ValorHoraHabil',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    },
                    renderer: 'usMoney'
                },
                {
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
                                var record = grid.store.getAt(rowIndex);
                                if (hasUpdate) {
                                    DeleteChofer(record, grid);
                                }

                            }
                        }, {
                            icon: '../images/icons/edit16x16.png',
                            tooltip: 'Editar',
                            align: 'center',
                            altText: 'Editar',
                            handler: function(grid, rowIndex, colIndex) {
                                if (hasUpdate) {
                                    var record = grid.store.getAt(rowIndex);
                                    var win = PopinChofer('edit', record, rowIndex, grid);
                                    win.show();
                                    Mascaras();
                                }
                            }

                        }]
                }
            ],
            renderTo: 'tblChoferes',
            width: '99%',
            height: '78%',
            title: 'Choferes - Automotores UNSa',
            frame: true,
            tbar: [{
                    text: 'Agregar Chofer',
                    iconCls: 'icon-add',
                    handler: function() {
                        if (hasInsert) {
                            var record = null;
                            var win = PopinChofer('add', record, 0, grid);
                            win.show();
                            Mascaras();
                        }
                    }
                },
                {
                    text: 'Print',
                    iconCls: 'icon-print',
                    handler: function() {
                        Ext.ux.grid.Printer.mainTitle = "Lista de Choferes";
                        Ext.ux.grid.Printer.headerText = "Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios";
                        Ext.ux.grid.Printer.printLinkText = "Imprimir";
                        Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                        Ext.ux.grid.Printer.printAutomatically = false;
                        Ext.ux.grid.Printer.print(grid);

                    }
                }
            ]
        });

        return grid;
    }
    catch (e)
    {
        SendJsError(e, "GridPanel - choferes.js", "load grid");
    }
    return null;
}

x_LoadChoferes(hasUpdate, hasInsert, LoadChoferes_callback);

function LoadChoferes_callback(response)
{
    try
    {
        $("#tblChoferes").html("");
        var data = ObjToArray(response[1]);

        Ext.onReady(function() {
            Ext.define('Chofer', {
                extend: 'Ext.data.Model',
                fields: ['ChoferId', 'FirstName', 'LastName', 'Celular', 'Legajo',
                    {name: 'ValorHoraInhabil', type: 'usMoney'},
                    {name: 'ValorHoraHabil', type: 'usMoney'}, 'Active']
            });
            var store = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                model: 'Chofer',
                proxy: {type: 'memory'},
                data: data,
                sorters: [{
                        property: 'LastName',
                        direction: 'ASC'
                    }]
            });
            var grid = GridPanel(store);
        });
    }
    catch (e)
    {
        SendJsError(e, "LoadChoferes_callback - choferes.js", response);
    }
}

function DeleteChofer(record, grid)
{
    try
    {
        if (hasUpdate) {
            Ext.Msg.confirm('Eliminar Chofer', 'Esta seguro que quiere eliminar este Chofer?', function(button) {
                if (button === 'yes') {

                    var sm = grid.getSelectionModel();
                    var rec = grid.getSelectionModel().getSelection()[0];

                    grid.store.remove(sm.getSelection());
                    if (grid.store.getCount() > 0) {
                        sm.select(0);
                    }
                    var choferId = record.data['ChoferId'];
                    x_DeleteChofer(choferId, DeleteChofer_callback);
                }
            });

        }
    }
    catch (e)
    {
        SendJsError(e, "DeleteChofer - choferes.js", record);
    }
}

function DeleteChofer_callback(response)
{

    if (response)
    {
        humane.success("Se ha eliminado el chofer correctamente.");
        x_LoadChoferes(hasUpdate, hasInsert, LoadChoferes_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar el chofer.");
        SendJsError(new Error("Error DeleteChofer-choferes.js"), "choferes.js", response);

    }

}
