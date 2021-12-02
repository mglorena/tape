var date = new Date();
var mes = date.getMonth();
var anio = date.getFullYear();
var mesNom = date.toLocaleString();
mes = mes + 1;
var expedienteId = 0, rubroIds = '', CurrentObject, grid, strubro, strubro2;

var nom = '';
function Mascaras()
{
    jQuery(function ($) {
        jQuery("[name='Celular']").mask("(387)-15-9999999");
        jQuery("[name='Telefono']").mask("(0387)-9999999");
        // jQuery("[name='ValorHoraInhabil']").mask("999,9?9");
        // jQuery("[name='ValorHoraHabil']").mask("999,9?9");
    });
}

$(function () {
    x_LoadRubros(1, LoadRubros_callback);

});
function LoadRubros_callback(response)
{
    try
    {
        Ext.onReady(function () {
            var rubros = ObjToArray(response[1]);

            strubro = new Ext.data.ArrayStore({
                fields: ['RubroId', 'Nombre'],
                data: rubros
            });
            strubro2 = new Ext.data.ArrayStore({
                fields: ['RubroId', 'Nombre'],
                data: rubros
            });

        });
        Ext.onReady(function () {



            var cmbRub = Ext.create('Ext.form.field.ComboBox', {
                fieldLabel: 'Exp Nº',
                id: 'ddlRubros',
                valueField: 'RubroId',
                displayField: 'Nombre',
                width: 320,
                labelWidth: 70,
                store: strubro,
                queryMode: 'local',
                multiSelect: true,
                value: rubroIds,
                listeners: {
                    'change': function (txt, record, idx) {
                        rubroIds = txt.value;
                        if (rubroIds !== null) {
                            x_LoadExpedientees(expedienteId, rubroIds, nom, LoadExpedientees_callback);
                        }
                    }
                }
            });

            // Define our data model
            var win;
            Ext.define('Expedientees', {
                extend: 'Ext.data.Model',
                fields: ['ComprasId', 'ExpNumber', 'Adjudicado', 'Detalle', 'GroupId', 'FechaUlt', 'Observaciones'
                            , 'UserId', 'EstadoId']
            });




            var win;
            grid = Ext.create('Ext.grid.Panel', {
                //store: store,
                columns: [
                    {
                        header: 'Exp Nº',
                        dataIndex: 'ExpNumber',
                        // flex: 1
                    },
                    {
                        header: 'Detalle',
                        dataIndex: 'Detalle',
                        flex: 1
                    }, {
                        header: 'Adjudicado',
                        dataIndex: 'Adjudicado',
                        flex: 1
                    },
                    {
                        header: 'Depositario',
                        dataIndex: 'GroupId',
                        flex: 1
                    },
                    {
                        header: 'FechaUlt',
                        dataIndex: 'FechaUlt',
                        flex: 1
                    },
                    {
                        header: 'Observaciones',
                        dataIndex: 'Observaciones',
                        flex: 1
                    },
                    {
                        header: 'UserId',
                        dataIndex: 'UserId',
                        flex: 1
                    },
                    {
                        header: 'EstadoId',
                        dataIndex: 'EstadoId',
                        flex: 1
                    },
                    {
                        header: 'Solicitud Compra',
                        dataIndex: 'EstadoId',
                        flex: 1
                    },
                    {
                        menuDisabled: true,
                        sortable: false,
                        xtype: 'actioncolumn',
                        header: 'Acciones',
                        align: 'center',
                        width: 90,
                        items: [{
                                icon: '../images/icons/fam/delete.gif', // Use a URL in the icon config
                                tooltip: 'Borrar',
                                align: 'center',
                                altText: 'Borrar',
                                cls: 'x-icon-action',
                                handler: function (grid, rowIndex, colIndex) {
                                    if (hasUpdate) {
                                        var record = grid.store.getAt(rowIndex);
                                        DeleteExpediente(record, grid, rowIndex);
                                    }

                                }
                            }
                            , {
                                icon: '../images/icons/edit16x16.png',
                                tooltip: 'Editar',
                                align: 'center',
                                altText: 'Editar',
                                handler: function (grid, rowIndex, colIndex) {
                                    var record = grid.store.getAt(rowIndex);
                                    if (hasUpdate) {
                                        var win = PopinExpediente('edit', record, strubro2);
                                        win.show();
                                        Mascaras();
                                    }
                                }

                            }, {
                                icon: '../images/icons/fam/file.gif',
                                tooltip: 'Invitar',
                                align: 'center',
                                altText: 'Invitar',
                                handler: function (grid, rowIndex, colIndex) {
                                    if (hasUpdate) {
                                    }

                                }
                            }]
                    }]

                ,
                renderTo: 'panel',
                width: 900,
                height: 457,
                //stripeRows: true,
                title: 'Expedientees - UNSa',
                frame: true,
                tbar: [cmbRub, {
                        xtype: 'textfield',
                        fieldLabel: 'Buscar',
                        labelWidth: 60,
                        id: 'txtNombre',
                        mode: 'local',
                        value: nom,
                        width: 250,
                        listeners: {
                            blur: function (txt, record, idx) {
                                nom = txt.value;
                                if (nom) {
                                    // rubroIds = '';expedienteId=0;
                                    x_LoadExpedientees(expedienteId, rubroIds, nom, LoadExpedientees_callback);
                                }
                            },
                            specialkey: function (txt, e) {
                                if (e.getKey() === e.ENTER) {
                                    nom = txt.value;
                                    if (nom)
                                        //  rubroIds = '';expedienteId=0;
                                        x_LoadExpedientees(expedienteId, rubroIds, nom, LoadExpedientees_callback);
                                }
                            }
                        }

                    }, {
                        text: 'Agregar Expediente',
                        iconCls: 'icon-add',
                        handler: function () {
                            var record = null;
                            if (hasInsert) {
                                var record = null;
                                var win = PopinExpediente('add', record, strubro2);
                                win.show();
                                Mascaras();

                            }

                        }
                    },
                    {
                        text: 'Print',
                        iconCls: 'icon-print',
                        handler: function () {
                            var rubros = Ext.getCmp('ddlRubros').rawValue;
                            Ext.ux.grid.Printer.mainTitle = "Lista de Expedientees Rubro/s:" + rubros;
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
        });
    }
    catch (e)
    {
        SendJsError(e, "LoadRubros_callback - expedientees.js", response);
    }
}

function LoadExpedientees_callback(response)
{
    try
    {
        var data = ObjToArray(response[1]);

        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            model: 'Expedientees',
            proxy: {type: 'memory'},
            data: data,
            sorters: [{
                    property: 'RazonSocial',
                    direction: 'ASC'
                }]
        });
        store.filterBy(function (rec) { //console.log(rec); return true;
            if (rec.data['ExpedienteId'] !== "0") {
                return true;
            } else {
                return false;
            }
        });
        grid.getView().bindStore(store);


    }
    catch (e)
    {
        SendJsError(e, "LoadExpedientees_callback - expedientees.js", response);
    }
}

function FormField(record, strubros)
{
    var formFields;
    try
    {

        var localidades = [['Salta', 'Salta'], ['Tartagal', 'Tartagal']];
        var stlocal = new Ext.data.ArrayStore({
            fields: ['Id', 'Nombre'],
            data: localidades
        });
        var cmbLocal = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Localidad',
            id: 'Localidad',
            name: 'Localidad',
            valueField: 'Id',
            displayField: 'Nombre',
            width: 500,
            // labelWidth: 70,
            store: stlocal,
            queryMode: 'local',
            value: (record ? record.data['Localidad'] : null)
        });
        var provincias = [['Salta', 'Salta'], ['Tucuman', 'Tucuman']];
        var stprov = new Ext.data.ArrayStore({
            fields: ['Id', 'Nombre'],
            data: provincias
        });
        var cmbProv = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Provincia',
            id: 'Provincia',
            name: 'Provincia',
            valueField: 'Id',
            displayField: 'Nombre',
            width: 500,
            // labelWidth: 70,
            store: stprov,
            queryMode: 'local',
            value: (record ? record.data['Provincia'] : null)
        });
        var rubids = null;
        if (record)
            rubids = record.data['RubroIds'].split(",");
        // alert(rubids);
        // console.log(record.data);
        var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
        formFields = [
            {
                xtype: 'displayfield',
                fieldLabel: 'ID',
                id: 'txtExpedienteId',
                name: 'ExpedienteId',
                value: (record ? record.data['ExpedienteId'] : null),
                editable: false
            },
            {
                fieldLabel: 'RazonSocial',
                name: 'RazonSocial',
                afterLabelTextTpl: required,
                value: (record ? record.data['RazonSocial'] : null),
                allowBlank: false,
                width: 500,
            },
            {
                fieldLabel: 'CUIT',
                name: 'CUIT',
                //afterLabelTextTpl: required,
                value: (record ? record.data['CUIT'] : null),
                // allowBlank: false,
                width: 500,
            },
            {
                fieldLabel: 'Celular',
                name: 'Celular',
                //afterLabelTextTpl: required,
                value: (record ? record.data['Celular'] : null),
                // allowBlank: false,
                width: 500,
            },
            {
                fieldLabel: 'Telefono',
                name: 'Telefono',
                afterLabelTextTpl: required,
                value: (record ? record.data['Telefono'] : null),
                allowBlank: false,
                width: 500,
            },
            {
                fieldLabel: 'Email',
                name: 'Email',
                //afterLabelTextTpl: required,
                value: (record ? record.data['Email'] : null),
                // allowBlank: false,
                width: 500,
            },
            {
                fieldLabel: 'Contacto',
                name: 'PersonaContacto',
                //afterLabelTextTpl: required,
                value: (record ? record.data['PersonaContacto'] : null),
                // allowBlank: false,
                width: 500,
            },
            {
                fieldLabel: 'Domicilio',
                name: 'Domicilio',
                afterLabelTextTpl: required,
                value: (record ? record.data['Domicilio'] : null),
                allowBlank: false,
                width: 500,
            }, cmbLocal, cmbProv, {
                xtype: 'checkboxfield',
                name: 'Active',
                fieldLabel: 'Activo',
                boxLabel: 'Esta activo?',
                checked: (record ? record.data['Active'] : null)
            },
            {
                xtype: 'combo',
                fieldLabel: 'Rubro/es',
                id: 'ddlRubrosIds2',
                name: 'RubrosIds',
                store: strubros,
                afterLabelTextTpl: required,
                valueField: 'RubroId',
                displayField: 'Nombre',
                multiSelect: true,
                queryMode: 'local',
                //editable: false,
                //forceSelection: true,
                allowBlank: false,
                width: 500,
                value: rubids,
                listeners:
                        {
                            expand: function (combo, newval, oldval)
                            {
                                combo.store.reload();
                            }
                        }
            },
            {
                xtype: 'textareafield',
                fieldLabel: 'Observaciones',
                name: 'Observaciones',
                value: (record ? record.data['Observaciones'] : null),
                width: 500
            }
        ];

        return formFields;
    }
    catch (e)
    {
        SendJsError(e, "FormField - expedientees.js", formFields);
    }
}

function PopinExpediente(action, record, strubros)
{
    try
    {
        var formFields = FormField(record, strubros);
        CurrentObject = record;
        //console.log(record.data);
        var title;
        var btnText = 'Guardar';
        if (action === "add") {
            title = "Agregar Expediente";
            btnText = 'Agregar';
        }
        else
            title = "Editar Expediente : " + (record ? record.data['RazonSocial'] + " - " + record.data['CUIT'] : '');

        var win = Ext.create("Ext.window.Window", {
            title: title,
            bodyStyle: "padding: 5px",
            width: 540,
            closable: true,
            layout: 'fit',
            modal: true,
            items: {
                xtype: "form",
                frame: true,
                defaultType: "textfield",
                overflowY: 'auto',
                //url: 'file-upload.php',
                //fileUpload: true,
                items: formFields,
                // method: 'post',
                buttons: [
                    {
                        text: btnText,
                        id: "new-record-add-button",
                        handler: function () {
                            var form = this.up("form").getForm();
                            if (form.isValid())
                            {
                                SaveExpediente(form, action);
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
        SendJsError(e, "PopinExpediente - expedientes.js", action);
    }
}

function SaveExpediente(form, action)
{
    var rec;
    try
    {
        rec = form.getValues();
        if (action !== "add") {
            if (!hasUpdate) {
                return;
            }
            rec['ExpedienteId'] = CurrentObject.data['ExpedienteId'];
        }
        else
            rec['ExpedienteId'] = 0;
        rubroIds = rec['RubrosIds'];
        var expediente = JSON.stringify(rec);
        //console.log(expediente);

        x_SaveExpediente(expediente, SaveExpediente_callback);
    } catch (e)
    {
        SendJsError(e, "SaveExpediente - expedientes.js", rec);
    }
}


function SaveExpediente_callback(response)
{
    //console.log(response);
    if (response)
    {
        humane.success("Se ha guardado el expediente correctamente.");
        x_LoadExpedientees(expedienteId, rubroIds, nom, LoadExpedientees_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar el expediente.");
        SendJsError(new Error("Error guardando expediente"), "expedientees.js", response);
    }

}

function DeleteExpediente(record, grid)
{
    try
    {
        if (hasUpdate) {
            Ext.Msg.confirm('Eliminar Expediente', 'Esta seguro que quiere eliminar este Expediente?', function (button) {
                if (button === 'yes') {

                    var sm = grid.getSelectionModel();
                    var rec = grid.getSelectionModel().getSelection()[0];

                    grid.store.remove(sm.getSelection());
                    if (grid.store.getCount() > 0) {
                        sm.select(0);
                    }
                    var expedienteId = record.data['ExpedienteId'];
                    x_DeleteExpediente(expedienteId, DeleteExpediente_callback);
                }
            });

        }
    }
    catch (e)
    {
        SendJsError(e, "DeleteExpediente - expedientees.js", record);
    }
}

function DeleteExpediente_callback(response)
{

    if (response)
    {
        humane.success("Se ha eliminado el expediente correctamente.");
        x_LoadExpedientees(expedienteId, rubroIds, nom, LoadExpedientees_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar el expediente.");
        SendJsError(new Error("Error DeleteExpediente-expedientees.js"), "expedientees.js", response);

    }

}
