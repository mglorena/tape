var CurrentObject;
function Mascaras()
{
    jQuery(function($) {
        jQuery("[name='Celular']").mask("(387)-15-9999999");
    });
}

function FormField(record, prof)
{

    var stprofiles = new Ext.data.ArrayStore({
        fields: ['ProfileId', 'Name'],
        data: prof
    });


    var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
    var formFields = [
        {
            xtype: 'displayfield',
            fieldLabel: 'ID',
            name: 'UserId',
            value: (record ? record.data['UserId'] : null),
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
            fieldLabel: 'UserName',
            name: 'UserName',
            value: (record ? record.data['UserName'] : null)
        },
        {
            fieldLabel: 'Email',
            name: 'Email',
            value: (record ? record.data['Email'] : null),
            afterLabelTextTpl: required,
            allowBlank: false
        },
        {
            fieldLabel: 'Password',
            name: 'Password',
             inputType: 'password',
            value: (record ? record.data['Password'] : null),
            afterLabelTextTpl: required,
            allowBlank: false
        },
        {
            fieldLabel: 'Confirm Password',
            name: 'ConfPassword',
             inputType: 'password',
            value: (record ? record.data['Password'] : null),
            afterLabelTextTpl: required,
            allowBlank: false,
            validator: function(value) {
                var password1 = this.previousSibling('[name=Password]');
                return (value === password1.getValue()) ? true : 'Passwords do not match.'
            }
        },
        {
            xtype: 'checkboxfield',
            name: 'Active',
            fieldLabel: 'Activo',
            boxLabel: 'Esta activo?',
            checked: (record ? (record.data['Active']==='No'?0:1) : null)
        }, 
        {
            xtype: 'combo',
            fieldLabel: 'Perfil',
            id: 'ProfileId',
            name: 'ProfileId',
            store: stprofiles,
            afterLabelTextTpl: required,
            valueField: 'ProfileId',
            displayField: 'Name',
            width: 350,
            editable: false,
            allowBlank: false,
            value: (record ? record.data['ProfileId'] : null)
        }
    ];

    return formFields;
}

function SaveUser(form, action)
{
    var rec = form.getValues();
    if (action !== "add") {
        if (!hasUpdate) {
            return;
        }
        rec['UserId'] = CurrentObject.data['UserId'];
    }

    var user = JSON.stringify(rec);

    x_SaveUser(user, SaveUser_callback);
}

function SaveUser_callback(response)
{
    if (response)
    {
        humane.success("Se ha guardado el usuario correctamente.");
        x_LoadUsers(LoadUsers_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar el usuario.");
        SendJsError(new Error("Error users.js"), "users.js", response);
    }

}

function PopinUser(action, record, rIdx, grid, prof)
{
    var formFields = FormField(record, prof);
    CurrentObject = record;


    var title;
    if (action === "add")
        {
        title = "Agregar Usuario";
        }
    else
        {
        title = "Editar Usuario";
       // formFields.splice(formFields, 1);
        }
    
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
                            SaveUser(form, action);
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

function GridPanel(store, prof)
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
                header: 'UserName',
                dataIndex: 'UserName',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            },
            {
                header: 'Email',
                dataIndex: 'Email',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            },
            {
                header: 'Perfil',
                dataIndex: 'Profile',
                flex: 1,
                editor: {
                    allowBlank: false
                }
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
                                DeleteUser(record, grid);
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
                                var win = PopinUser('edit', record, rowIndex, grid, prof);
                                win.show();
                                Mascaras();
                            }
                        }

                    }]
            }
        ],
        renderTo: 'tblUsers',
        width: 900,
        height: 457,
        title: 'Usuarios TAPE - DGOyS UNSa',
        frame: true,
        tbar: [{
                text: 'Agregar User',
                iconCls: 'icon-add',
                handler: function() {
                    if (hasInsert) {
                        var record = null;
                        var win = PopinUser('add', record, 0, grid,prof);
                        win.show();
                        Mascaras();
                    }
                }
            },
            {
                text: 'Print',
                iconCls: 'icon-print',
                handler: function() {
                    Ext.ux.grid.Printer.mainTitle = "Lista de Usuarios";
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

x_LoadUsers(hasUpdate, hasInsert, LoadUsers_callback);
var prof;
function LoadUsers_callback(response)
{
    $("#tblUsers").html("");
    var data = ObjToArray(response[1]);
    prof = ObjToArray(response[2]);

    Ext.onReady(function() {
        Ext.define('User', {
            extend: 'Ext.data.Model',
            fields: ['UserId', 'FirstName', 'LastName', 'UserName', 'Email', 'Profile', 'Active', 'ProfileId','Password']
        });
        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            model: 'User',
            proxy: {type: 'memory'},
            data: data,
            sorters: [{
                    property: 'LastName',
                    direction: 'ASC'
                }]
        });
        var grid = GridPanel(store, prof);
    });
}

function DeleteUser(record, grid)
{
    if (hasUpdate) {
        Ext.Msg.confirm('Eliminar Usuario', 'Esta seguro que quiere eliminar este Usuario?', function(button) {
            if (button === 'yes') {

                var sm = grid.getSelectionModel();
                var rec = grid.getSelectionModel().getSelection()[0];

                grid.store.remove(sm.getSelection());
                if (grid.store.getCount() > 0) {
                    sm.select(0);
                }
                var userId = record.data['UserId'];
                x_DeleteUser(userId, DeleteUser_callback);
            }
        });

    }
}

function DeleteUser_callback(response)
{

    if (response)
    {
        humane.success("Se ha eliminado el usuario correctamente.");
        x_LoadUsers(hasUpdate, hasInsert, LoadUsers_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar el usuario.");
        SendJsError(new Error("Error DeleteUser-users.js"), "users.js", response);

    }

}
