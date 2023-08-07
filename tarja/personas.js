var CurrentObject,hasUpdate,hasInsert;
function Mascaras()
{
    jQuery(function ($) {
        jQuery("[name='DNI']").mask("?99.999.999");
        //   jQuery("[name='Telefono']").mask("(0387)999999999");
    });
}

function FormField(record)
{
    try { // coment
        var tdni = [['DNI', 'DNI'], ['LC', 'LC'], ['LE', 'LE']];
        // console.log(record.data);
        var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
        var formFields = [
            {
                xtype: 'displayfield',
                fieldLabel: 'ID',
                name: 'PersonaId',
                value: (record ? record.data['PersonaId'] : null),
                editable: false
            },
            {
                fieldLabel: 'Nombre',
                name: 'Nombre',
                width: 450,
                afterLabelTextTpl: required,
                value: (record ? record.data['Nombre'] : null),
                allowBlank: false
            }
            ,
            {
                fieldLabel: 'Apellido',
                name: 'Apellido',
                width: 450,
                afterLabelTextTpl: required,
                value: (record ? record.data['Apellido'] : null),
                allowBlank: false
            },
            {
                fieldLabel: 'Fecha Nac.',
                name: 'FechaNac',
                value: (record ? record.data['FechaNac'] : null),
                // afterLabelTextTpl: required,
                // allowBlank: false,
                width: 190,
                xtype: 'datefield',
                format: 'd/m/Y',
                submitFormat: 'Y-m-d H:i:s',
            },
            {
                fieldLabel: 'Ingreso',
                name: 'FechaIngreso',
                value: (record ? record.data['FechaIngreso'] : null),
                afterLabelTextTpl: required,
                allowBlank: false,
                width: 190,
                xtype: 'datefield',
                format: 'd/m/Y',
                submitFormat: 'Y-m-d H:i:s',
            }, /*
             {
             fieldLabel: 'Tipo DNI',
             name: 'TipoDNI',
             value: (record ? record.data['TipoDNI'] : null)
             }, */{
                xtype: 'combo',
                fieldLabel: 'Tipo DNI',
                name: 'TipoDNI',
                store: new Ext.data.ArrayStore({
                    fields: ['Tipo', 'Nombre'],
                    data: tdni // from states.js
                }),
                afterLabelTextTpl: required,
                valueField: 'Tipo',
                displayField: 'Nombre',
                editable: false,
                forceSelection: true,
                allowBlank: false,
                width: 150,
                value: (record ? record.data['TipoDNI'] : null)
            },
            {
                fieldLabel: 'DNI',
                name: 'DNI',
                width: 180,
                value: (record ? record.data['DNI'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                fieldLabel: 'Domicilio',
                name: 'Domicilio',
                width: 450,
                value: (record ? record.data['Domicilio'] : null),
                //afterLabelTextTpl: required,
                //allowBlank: false
            },
            {
                fieldLabel: 'Legajo',
                name: 'Legajo',
                width: 170,
                value: (record ? record.data['Legajo'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                fieldLabel: 'Tel',
                name: 'Telefono',
                value: (record ? record.data['Telefono'] : null),
                //afterLabelTextTpl: required,
                //allowBlank: false
            },
            {
                fieldLabel: 'Cargo',
                name: 'CargoDesc',
                width: 450,
                value: (record ? record.data['CargoDesc'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                fieldLabel: 'Cat',
                name: 'Categoria',
                width: 130,
                value: (record ? record.data['Categoria'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                xtype: 'checkboxfield',
                name: 'Activo',
                id: 'Activo',
                fieldLabel: 'Activo',
                boxLabel: 'Esta activo?',
                afterLabelTextTpl: required,
                checked: (record ? (record.data['Activo'] == 'off' ? false : true) : null)
            }/*,
             {
             fieldLabel: 'Email',
             name: 'Email',
             width: 130,
             value: (record ? record.data['Email'] : null),
             afterLabelTextTpl: required,
             allowBlank: false
             }*/
        ];
        return formFields;
    }
    catch (e)
    {
        SendJsError(e, "FormField - addperso.js", record);
    }
}

function GuardarPersona(form, action)
{
    try
    {
        var rec = form.getValues();
        var personas;

        if (action !== "add") {
            if (!hasUpdate) {
                return;
            }
            rec['PersonaId'] = CurrentObject.data['PersonaId'];
            personas = JSON.stringify(rec);
	    console.log(personas);
            x_GuardarPersona(personas, GuardarPersona_callback);
        }
        else
        {
            personas = JSON.stringify(rec);
            x_AgregarPersona(personas, AgregarPersona_callback);
        }


    }
    catch (e)
    {
        SendJsError(e, "GuardarPersona - addperso.js", action);
    }
}
function AgregarPersona_callback(response)
{
 

    if (response)
    {
        humane.success("Se ha agregado la persona correctamente.");
        x_LoadPersonas(LoadPersonas_callback);
    }
    else
    {
        humane.error("Hubo un error al agregar los datos.");
        SendJsError(new Error("Error AgregarPersona_callback - personas.js"), "personas.js", response);
    }

}

function GuardarPersona_callback(response)
{
   
    if (response)
    {
        humane.success("Se ha guardado la persona correctamente.");
        x_LoadPersonas(LoadPersonas_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar los datos.");
        SendJsError(new Error("Error GuardarPersona - addperso.js"), "addperso.js", response);
    }

}

function PopinPersona(action, record, rIdx, grid)
{
    try
    {
        var formFields = FormField(record);
        CurrentObject = record;
        var title;
        if (action === "add")
            title = "Agregar Persona";
        else
            title = "Editar Persona";
        var win = Ext.create("Ext.window.Window", {
            title: title,
            bodyStyle: "padding: 5px",
            width: 500,
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
                        handler: function () {
                            var form = this.up("form").getForm();
                            
                            if (form.isValid())
                            {
                                GuardarPersona(form, action);
                                this.up("window").close();
                            }
                        }
                    },
                    {
                        text: "Cancelar",
                        handler: function () {
                            this.up("window").close();
                        }
                    }

                ],
                listeners: {
                    afterrender: function () {
                        var that = this;
                        setTimeout(function () {
                            that.items.first().focus();
                        }, 750);
                        this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                            enter: function () {
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
        SendJsError(e, "PopinPersona - personas.js", action);
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
                    header: 'Nombre',
                    dataIndex: 'Empleado',
                    flex: 1,
		    width: 200,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Ingreso',
                    dataIndex: 'FechaIngreso',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Nac.',
                    dataIndex: 'FechaNac',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Domicilio',
                    dataIndex: 'Domicilio',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Leg',
                    dataIndex: 'Legajo',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Tipo',
                    dataIndex: 'TipoDNI',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'DNI',
                    dataIndex: 'DNI',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Cargo',
                    dataIndex: 'CargoDesc',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Cat.',
                    dataIndex: 'Categoria',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Tel',
                    dataIndex: 'Telefono',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                }/*,
                 {
                 header: 'Activo',
                 dataIndex: 'Activo',
                 width: 60
                 }*/,
                {
                    menuDisabled: true,
                    sortable: false,
                    xtype: 'actioncolumn',
                    header: 'Acciones',
                    align: 'center',
                    width: 70,
                    items: [/*{
                     icon: '../images/icons/fam/delete.gif', // Use a URL in the icon config
                     tooltip: 'Borrar',
                     align: 'center',
                     altText: 'Borrar',
                     cls: 'x-icon-action',
                     handler: function (grid, rowIndex, colIndex) {
                     var record = grid.store.getAt(rowIndex);
                     if (hasUpdate) {
                     DeleteChofer(record, grid);
                     }
                     
                     }
                     },*/ {
                            icon: '../images/icons/edit16x16.png',
                            tooltip: 'Editar',
                            align: 'center',
                            altText: 'Editar',
                            handler: function (grid, rowIndex, colIndex) {
                                if (hasUpdate) {
                                    var record = grid.store.getAt(rowIndex);
                                    var win = PopinPersona('edit', record, rowIndex, grid);
                                    win.show();
                                    Mascaras();
                                }
                            }

                        }]
                }
            ],
            renderTo: 'tblPersonas',
            width: 1024,
            height: 600,
            title: 'Personal  - Dirección General de Obras y Servicios',
            frame: true,
            tbar: [{
                    text: 'Agregar Persona',
                    iconCls: 'icon-add',
                    handler: function () {
                        if (hasInsert) {
                            var record = null;
                            var win = PopinPersona('add', record, 0, grid);
                            win.show();
                            Mascaras();
                        }
                    }
                },
                {
                    text: 'Print',
                    iconCls: 'icon-print',
                    handler: function () {
                        Ext.ux.grid.Printer.mainTitle = "Personal ";
                        Ext.ux.grid.Printer.headerText = "Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios";
                        Ext.ux.grid.Printer.printLinkText = "Imprimir";
                        Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                        Ext.ux.grid.Printer.printAutomatically = false;
                        Ext.ux.grid.Printer.print(grid);
                    }
                }
            ], viewConfig: {
                getRowClass: function (record, index) {
                    var active = record.get('Activo');
                //    console.log(active);
                    return (active === 'off' ? 'inactive' : '');

                }
            }
        });
        return grid;
    }
    catch (e)
    {
        SendJsError(e, "GridPanel - personas.js", "load grid");
    }
    return null;
}

$(function () {
    x_LoadPersonas(hasUpdate, hasInsert, LoadPersonas_callback);
});
function LoadPersonas_callback(response)
{
    try
    {
        $("#tblPersonas").html("");
        var data = ObjToArray(response[1]);
        //  console.log("daaaaa");
        //  console.log(data);
        Ext.onReady(function () {
            Ext.define('Personas', {
                extend: 'Ext.data.Model',
                fields: [
                    'PersonaId', 'Nombre', 'Apellido', 'Empleado', 'Legajo', 'TipoDNI', 'CargoDesc',
                    'Categoria', 'UserId', 'Telefono',
                    'Email', 'Domicilio', 'Activo',
                    'VacacionesDias', 'Observaciones', 'Antiguedad',
                    'Compensatorio', 'CUIL', 'FechaNac',
                    'FechaIngreso', 'DNI', 'AntAnses']
            });
            var store = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                model: 'Personas',
                proxy: {type: 'memory'},
                data: data,
                sorters: [{
                        property: 'Empleado',
                        direction: 'ASC'
                    }]
            });
            var grid = GridPanel(store);
        });
    }
    catch (e)
    {
        SendJsError(e, "LoadPersonas_callback - personas.js", response);
    }
}



function DeletePersona_callback(response)
{

    if (response)
    {
        humane.success("Se ha eliminado la persona correctamente.");
        x_LoadChoferes(hasUpdate, hasInsert, LoadChoferes_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar la persona.");
        SendJsError(new Error("Error DeletePersona-personas.js"), "personas.js", response);
    }

}
