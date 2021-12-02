/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/****************/
var CurrentObject;

x_LoadInventario(mes, anio, choferId, depId, LoadInventario_callback);
var grid, ridx, deps, ch, ve;
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
function FormField(record, desc)
{
    var zonas = [['1', 'Hábil'], ['2', 'Inhábil']];

    var zona = (record ? record.data['Zona'] : null);
    var stzonas = new Ext.data.ArrayStore({
        fields: ['Id', 'Zona'],
        data: zonas
    });
    var stvehiculos = new Ext.data.ArrayStore({
        fields: ['VehiculoId', 'Modelo'],
        data: ve
    });
    //ch.pop(0);
    var stchoferes = new Ext.data.ArrayStore({
        fields: ['ChoferId', 'Choferes'],
        data: ch
    });
    //deps.pop(0);
    var stdepend = new Ext.data.ArrayStore({
        fields: ['DependenciaId', 'Nombre'],
        data: deps
    });


    Ext.define('Interrupciones', {
        extend: 'Ext.data.Model',
        fields: [
            {
                name: 'entrada',
                type: 'time'
            },
            {
                name: 'salida',
                type: 'time'
            }
        ]
    });

    var store = Ext.create('Ext.data.ArrayStore', {
        model: 'Interrupciones',
        data: desc
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        id: 'gridDesc',
        columns: [{
                header: 'Entrada',
                dataIndex: 'entrada',
                flex: 1,
                editor: {
                    // defaults to textfield if no xtype is supplied
                    allowBlank: false
                }
            }, {
                header: 'Salida',
                dataIndex: 'salida',
                //width: 160,
                editor: {
                    allowBlank: false
                }
            }],
        //renderTo: 'editor-grid',
        //width: 150,
        height: 150,
        title: 'Interrupciones',
        frame: true,
        tbar: [{
                text: 'Agregar',
                iconCls: 'icon-add',
                handler: function() {
                    rowEditing.cancelEdit();

                    // Create a model instance
                    var r = Ext.create('Interrupciones', {
                        entrada: '13:30:00',
                        salida: '14:30:00'
                    });

                    store.insert(0, r);
                    rowEditing.startEdit(0, 0);
                }
            }, {
                itemId: 'removeDescanso',
                text: 'Borrar',
                iconCls: 'icon-remove',
                handler: function() {
                    var sm = grid.getSelectionModel();
                    rowEditing.cancelEdit();
                    store.remove(sm.getSelection());
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                },
                disabled: true
            }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeDescanso').setDisabled(!records.length);
            }
        }
    });

    var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
    var formFields = [/*{
     xtype: 'fieldset',
     padding:0,
     margin:3,
     height:300,
     collapsible: false,
     defaults:{border:0,padding:0},
     layout : {
     type : 'table',
     columns : 2,
     padding:0
     },
     items:[*/

        {
            xtype: 'displayfield',
            fieldLabel: 'Registro Nº',
            id: 'txtInventarioId',
            name: 'InventarioId',
            value: (record ? record.data['InventarioId'] : null),
            editable: false
        },
        {
            xtype: 'combo',
            fieldLabel: 'Chofer',
            id: 'ChoferId',
            name: 'ChoferId',
            store: stchoferes,
            afterLabelTextTpl: required,
            valueField: 'ChoferId',
            displayField: 'Choferes',
            editable: false,
            allowBlank: false,
            value: (record ? record.data['ChoferId'] : null),
            width: 350

        },
        {
            xtype: 'combo',
            fieldLabel: 'Dependencia',
            id: 'DependenciaId',
            name: 'DependenciaId',
            store: stdepend,
            afterLabelTextTpl: required,
            valueField: 'DependenciaId',
            displayField: 'Nombre',
            editable: false,
            allowBlank: false,
            width: 250,
            value: (record ? record.data['DependenciaId'] : null)

        },
        {
            fieldLabel: 'Fecha',
            name: 'Fecha',
            id: 'txtFecha',
            afterLabelTextTpl: required,
            value: (record ? record.data['Fecha'] : null),
            xtype: 'datefield',
            format: 'd/m/Y',
            submitFormat: 'Y-m-d H:i:s',
            allowBlank: false,
            listeners: {
                'change': function() {
                    //  GetChVe("fs");
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Zona',
            id: 'Zona',
            name: 'Zona',
            store: stzonas,
            afterLabelTextTpl: required,
            valueField: 'Id',
            displayField: 'Zona',
            editable: false,
            allowBlank: false,
            width: 170,
            value: zona

        },
        {
            fieldLabel: 'Concepto/Destino',
            name: 'Concepto',
            id: 'txtConcepto',
            afterLabelTextTpl: required,
            value: (record ? record.data['Concepto'] : null),
            allowBlank: false,
            width: 350
        },
        {
            xtype: 'combo',
            fieldLabel: 'Vehiculo',
            id: 'VehiculoId',
            name: 'VehiculoId',
            store: stvehiculos,
            afterLabelTextTpl: required,
            valueField: 'VehiculoId',
            displayField: 'Modelo',
            width: 350,
            editable: false,
            allowBlank: false,
            value: (record ? record.data['VehiculoId'] : null)

        },
        {
            fieldLabel: 'Responsable',
            name: 'Responsable',
            id: 'txtResponsable',
            width: 350,
            afterLabelTextTpl: required,
            value: (record ? record.data['Responsable'] : null),
            allowBlank: true
                    //height:150
        }/*]
         }*/
        , {
            xtype: 'fieldset',
            padding: 0,
            margin: 3,
            collapsible: false,
            layout: {
                type: 'table'
                        /** columns : 2,
                         padding:0*/
            },
            defaults: {
                border: 0,
                cellCls: 'verticalAlignTop'
            },
            items: [{
                    xtype: 'fieldset',
                    title: 'Horario Cumplido',
                    /**border:0,
                     padding:0,*/
                    collapsible: false,
                    layout: {
                        type: 'table',
                        columns: 2
                                /** padding:0*/
                    },
                    defaults: {
                        /** border:0,
                         cellCls : 'verticalAlignTop' ,
                         padding:0,
                         margin:0*/
                    },
                    items: [{
                            xtype: 'fieldset',
                            collapsible: false,
                            layout: {
                                type: 'table',
                                columns: 2
                            },
                            items: [{
                                    xtype: 'timefield',
                                    submitFormat: 'Y-m-d H:i:s',
                                    name: 'Entrada',
                                    format: 'H:i',
                                    width: 90,
                                    id: 'Entrada',
                                    value: (record ? record.data['Entrada'] : null)

                                },
                                {
                                    xtype: 'timefield',
                                    submitFormat: 'Y-m-d H:i:s',
                                    name: 'Salida',
                                    format: 'H:i',
                                    id: 'Salida',
                                    width: 90,
                                    value: (record ? record.data['Salida'] : null)
                                }]

                        }]
                }, {
                    xtype: 'fieldset',
                    title: 'Horario Tarjeta',
                    collapsible: false,
                    layout: {
                        type: 'table',
                        columns: 2
                    },
                    defaults: {
                        /**  border:2,
                         cellCls : 'verticalAlignTop'    */

                    },
                    items: [{
                            xtype: 'fieldset',
                            title: 'Mañana',
                            collapsible: false,
                            layout: {
                                type: 'table'
                                        ,
                                columns: 2,
                                border: 0
                            },
                            items: [{
                                    xtype: 'timefield',
                                    submitFormat: 'Y-m-d H:i:s',
                                    name: 'TMEntrada',
                                    format: 'H:i',
                                    width: 90,
                                    id: 'TMEntrada',
                                    value: (record ? record.data['TMEntrada'] : null),
                                    vType: 'time'

                                },
                                {
                                    xtype: 'timefield',
                                    submitFormat: 'Y-m-d H:i:s',
                                    name: 'TMSalida',
                                    format: 'H:i',
                                    width: 90,
                                    id: 'TMSalida',
                                    value: (record ? record.data['TMSalida'] : null)
                                }]

                        }, {
                            xtype: 'fieldset',
                            title: 'Tarde',
                            collapsible: false,
                            layout: {
                                type: 'table',
                                columns: 2
                            },
                            items:[
                                {
                                    xtype: 'timefield',
                                    submitFormat: 'Y-m-d H:i:s',
                                    //fieldLabel:'Entrada',
                                    name: 'TTEntrada',
                                    format: 'H:i',
                                    width: 90,
                                    id: 'TTEntrada',
                                    value: (record ? record.data['TTEntrada'] : null)
                                },
                                {
                                    xtype: 'timefield',
                                    submitFormat: 'Y-m-d H:i:s',
                                    //fieldLabel:'Salida',
                                    name: 'TTSalida',
                                    format: 'H:i',
                                    width: 90,
                                    id: 'TTSalida',
                                    value: (record ? record.data['TTSalida'] : null)

                                }
                            ]
                        }]
                }
            ]
        }
        , grid, {
            xtype: 'fieldset',
            title: 'Horas Extraordinarias',
            layout: {
                type: 'table',
                columns: 3,
                tableAttrs: {
                    style: {
                        width: '99%'
                    }
                }
            },
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Con 50%',
                    name: 'Hora50',
                    //width:150,
                    id: 'Hora50',
                    format: 'H:i',
                    submitFormat: 'H:i',
                    value: (record ? record.data['Hora50'] : null)

                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Con 100%',
                    name: 'Hora100',
                    // width:150,
                    id: 'Hora100',
                    format: 'H:i',
                    submitFormat: 'H:i',
                    value: (record ? record.data['Hora100'] : null)

                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Efectivas',
                    name: 'TotalHoras',
                    // width:600,
                    id: 'TotalHoras',
                    format: 'H:i',
                    submitFormat: 'H:i',
                    value: (record ? record.data['TotalHoras'] : null)
                            //value:(record?(record.data['Zona']== 2?record.data['TotalHoras']:null):null)

                }

            ]
        }

    ];

    return formFields;
}
function PopinInventario(action, record)
{


    var desc = [];
    if (record) {
        var inte = record.data['Interrupciones'].split("<br/>");
        for (i = 0; i < inte.length; i++)
        {
            var a = inte[i].split("a");
            if ((a[1]) || (a[0] !== ""))
            {
                a[0] = a[0].replace(/^\s+|\s+$/g, '');
                a[1] = a[1].replace(/^\s+|\s+$/g, '');
                desc.push(a);
            }
        }
    }
    var formFields = FormField(record, desc);
    CurrentObject = record;
    var title;
    var btnText = 'Guardar';
    if (action === "add") {
        title = "Agregar Hora Extra";
        btnText = 'Agregar';
    }
    else
        title = "Editar Hora Extra : " + (record ? record.data['ChoferName'] : '');

    var win = Ext.create("Ext.window.Window", {
        title: title,
        bodyStyle: "padding: 5px",
        width: 700,
        closable: true,
        layout: 'fit',
        modal: true,
        items: {
            xtype: "form",
            frame: true,
            defaultType: "textfield",
            overflowY: 'auto',
            url: 'file-upload.php',
            fileUpload: true,
            items: formFields,
            method: 'post',
            buttons: [
                {
                    text: btnText,
                    id: "new-record-add-button",
                    handler: function() {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            SaveInventario(form, action);
                            this.up("window").close();
                        }
                    }
                },
                {
                    text: "Calcular",
                    handler: function() {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            CalcularInventario(form, action);
                            //this.up("window").close();
                        }
                    }
                }
                ,
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
function SumTime(records, dataIndex)
{
    var length = records.length,
            totalH = 0, totalM = 0,
            record;
    var h, m;
    for (i = 0; i < length; ++i) {
        record = records[i].get(dataIndex).split(":");

        if (record[0])
        {
            h = parseInt(record[0]);
            m = parseInt(record[1]);
            totalH += h;
            totalM += m;
        }
    }
    var e = new Date();
    var tm = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), 0, totalM);
    var total = (totalH + tm.getHours()) + ":" + tm.f('mm');
    return total;

}
function GridPanel(store)
{
    // create the grid and specify what field you want
    // to use for the editor at each column.

    var meses = [[1, 'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'], [5, 'Mayo'], [6, 'Junio'], [7, 'Julio'], [8, 'Agosto'], [9, 'Septiembre'], [10, 'Octubre'], [11, 'Noviembre'], [12, 'Diciembre']];

    var stmes = new Ext.data.ArrayStore({
        fields: ['id', 'mes'],
        data: meses
    });
    var anios = [[2012, '2012'], [2013, '2013'], [2014, '2014']];

    var stanio = new Ext.data.ArrayStore({
        fields: ['id', 'anio'],
        data: anios
    });

    var b = [0, 'Todos'];

    var chg = ch.slice();
    chg.push(b);
    var choferes = new Ext.data.ArrayStore({
        fields: ['ChoferId', 'Choferes'],
        data: chg
    });
    var a = [0, 'Todas'];

    var depsg = deps.slice();

    depsg.push(a);
    var stdeps = new Ext.data.ArrayStore({
        fields: ['DependenciaId', 'Nombre'],
        data: depsg
    });

    Ext.tip.QuickTipManager.init();
    var win;
    grid = Ext.create('Ext.grid.Panel', {
        store: store,
        features: [{
                ftype: 'summary',
                id: 'summary'
            }],
        columns: [{
                header: 'Dia',
                dataIndex: 'FechaG',
                flex: 1

            },
            {
                header: 'Horario Cumplido',
                dataIndex: 'Horario',
                flex: 1
            },
            {
                header: 'Destino',
                dataIndex: 'Concepto',
                flex: 1
            },
            {
                header: 'Interrupciones',
                dataIndex: 'Interrupciones',
                flex: 1,
                summaryType: function(records)
                {
                    return "<b>TOTALES</b>";
                }
            },
            {
                header: 'Chofer',
                dataIndex: 'ChoferName',
                flex: 1
            },
            {
                header: 'Dependencia',
                dataIndex: 'Dependencia',
                flex: 1
            }
            ,
            {
                header: 'Con 50%',
                dataIndex: 'Hora50',
                format: 'H:i',
                flex: 1,
                summaryType: function(records) {
                    var dataIndex = 'Hora50';
                    return SumTime(records, dataIndex);
                },
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return value;
                }
            },
            {
                header: 'Con 100%',
                dataIndex: 'Hora100',
                format: 'H:i',
                flex: 1,
                summaryType: function(records) {
                    var dataIndex = 'Hora100';
                    return SumTime(records, dataIndex);
                },
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return value;
                }
            },
            {
                header: 'Efectivas',
                dataIndex: 'TotalHoras',
                format: 'HH:MI',
                flex: 1,
                summaryType: function(records) {
                    var dataIndex = 'TotalHoras';
                    return SumTime(records, dataIndex);
                },
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return value;
                }
            }, {
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
                        handler: function(grid, rowIndex, colIndex) {
                            var record = grid.store.getAt(rowIndex);
                            DeleteInventario(record, grid);

                        }
                    }
                    , {
                        icon: '../images/icons/edit16x16.png',
                        tooltip: 'Editar',
                        align: 'center',
                        altText: 'Editar',
                        handler: function(grid, rowIndex, colIndex) {
                            var record = grid.store.getAt(rowIndex);
                            var win = PopinInventario('edit', record);
                            win.show();
                            ridx = rowIndex;




                        }

                    }]
            }
        ],
        renderTo: 'tblInventario',
        width: 900,
        height: 457,
        title: 'Horas Extraordinarias - Automotores UNSa',
        frame: true,
        tbar: [/*{
                xtype: 'datefield',
                fieldLabel: '',
                //labelWidth: 30,
                id: 'txtDesde',
                mode: 'local',
                submitFormat: 'YYYY-mm-dd H:i:m',
               // value: dia,
                width: 85,
                listeners: {
                    'select': function(combo, record, idx) {
                        mes = combo.value;
                        x_LoadInventario(mes, anio, choferId, depId, LoadInventario_callback);
                    }
                }

            },'a',{
                xtype: 'datefield',
                fieldLabel: '',
                //labelWidth: 30,
                id: 'txtHasta',
                mode: 'local',
                submitFormat: 'YYYY-mm-dd H:i:m',
               // value: dia,
                width: 85,
                listeners: {
                    'select': function(combo, record, idx) {
                        mes = combo.value;
                        x_LoadInventario(mes, anio, choferId, depId, LoadInventario_callback);
                    }
                }

            }*/,
            {
                xtype: 'combo',
                fieldLabel: 'Mes',
                labelWidth: 25,
                store: stmes,
                id: 'ddlMes',
                valueField: 'id',
                displayField: 'mes',
                typeAhead: true,
                mode: 'local',
                // forceSelection: true,
                value: mes,
                width: 100,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        mes = combo.value;
                        x_LoadInventario(mes, anio, choferId, depId, LoadInventario_callback);
                    }
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Año',
                labelWidth: 25,
                store: stanio,
                id: 'ddlAnio',
                valueField: 'id',
                displayField: 'anio',
                typeAhead: true,
                mode: 'local',
                //forceSelection: true,
                value: anio,
                width: 100,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        anio = combo.value;
                        x_LoadInventario(mes, anio, choferId, depId, LoadInventario_callback);
                    }
                }

            }
            , {
                xtype: 'combo',
                fieldLabel: 'Chofer',
                labelWidth: 40,
                store: choferes,
                id: 'ddlChoferes',
                valueField: 'ChoferId',
                displayField: 'Choferes',
                value: choferId,
                //typeAhead: true,
                mode: 'local',
                width: 250,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        choferId = combo.value;
                        x_LoadInventario(mes, anio, choferId, depId, LoadInventario_callback);
                    }
                }

            }, {
                xtype: 'combo',
                fieldLabel: 'Dependencia',
                labelWidth: 70,
                store: stdeps,
                id: 'ddlDependencias',
                valueField: 'DependenciaId',
                displayField: 'Nombre',
                typeAhead: true,
                mode: 'local',
                value: depId,
                width: 320,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        depId = combo.value;
                        x_LoadInventario(mes, anio, choferId, depId, LoadInventario_callback);
                    }
                }
            }, {
                text: 'Agregar',
                iconCls: 'icon-add',
                handler: function() {
                    if (hasInsert) {

                        var record = null;
                        var win = PopinInventario('add', record);
                        win.show();

                    }
                }
            }
        ],
        bbar: new Ext.PagingToolbar({
            pageSize: 14,
            displayInfo: true,
            displayMsg: 'Total Registros {0} - {1} of {2}',
            store: store,
            emptyMsg: "No hay registros"
        })
    });


    return grid;
}
function ResumeHeader()
{
    var chText = Ext.getCmp('ddlChoferes').rawValue;
    var depText = Ext.getCmp('ddlDependencias').rawValue;
    var mes = Ext.getCmp('ddlMes').rawValue;
    var anio = Ext.getCmp('ddlAnio').rawValue;
    var colshide = '';
    var header = "<div>Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios</div><br/>";
    var title = "<div align='center'><u>HORAS EXTRAORDINARIAS </u></div>";
    var addHeader = "";
    if (depText !== "Todas" && chText === "Todos")
    {
        title = "<div align='center'><u>HORAS EXTRAORDINARIAS </u>: " + depText + "</div>";
        colshide = "5";
    }
    if (depText !== "Todas" && chText !== "Todos")
    {
        title = "<div align='center'><u>HORAS EXTRAORDINARIAS </u>: " + depText + "</div>";
        addHeader += "<div>Apellido y Nombre : " + chText + "</div>";
        addHeader += "<div>Cargo: Chofer</div>";
        colshide = "4,5";


    }
    if (depText === "Todas" && chText !== "Todos")
    {
        title = "<div align='center'><u>HORAS EXTRAORDINARIAS </u>: " + chText + "</div>";
        addHeader += "<div>Apellido y Nombre : " + chText + "</div>";
        addHeader += "<div>Cargo: Chofer</div>";
        colshide = '4';

    }
    header += title;
    header += "<div>Fecha Emisión: " + (new Date()).f('dd/MM/yyyy') + "<br/> Mes/Año : " + mes + "/" + anio + "</div>";
    //    header +="<div>Dependencia : Obras y Servicios</div>";
    header += addHeader;
    var footer = "<br/><br/><br/><div style='top:600;left:0'><table cellpadding='2' cellspacing='2' style='border-width:0px;'>" +
            "<tr  style='border-width:0px;'><td  style='border-width:0px;'>--------------------</td><td  style='border-width:0px;'>----------------------------</td></tr>" +
            "<tr  style='border-width:0px;'><td  style='border-width:0px;'>Firma del Agente</td><td  style='border-width:0px;'>Firma del Jefe Inmediato</td></tr></table></div>";
    return [header, colshide, footer];

}
function LoadInventario_callback(response)
{
    $("#tblInventario").html("");
    var data = ObjToArray(response[1]);
    deps = ObjToArray(response[2]);
    ch = ObjToArray(response[3]);
    ve = ObjToArray(response[4]);
    Ext.onReady(function() {
        // Define our data model
        var win;
        Ext.define('Inventario', {
            extend: 'Ext.data.Model',
            fields: ['InventarioId', 'ChoferId', 'Interrupciones',
                {
                    name: 'Hora100',
                    type: 'time'
                }, {
                    name: 'Hora50',
                    type: 'time'
                }, 'Responsable', 'Dependencia', 'TTEntrada', 'TTSalida', 'TMEntrada', 'TMSalida',
                'Fecha', 'FechaG', 'Entrada', 'Salida', 'Horario', 'Concepto', 'Calculado', 'DescansosId', 'Zona', {
                    name: 'TotalHoras',
                    type: 'time'
                }, 'DependenciaId', 'Create', 'Modified', 'VehiculoId', 'ChoferName']
        });
        // create the Data Store
        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            model: 'Inventario',
            proxy: {
                type: 'memory'
            },
            data: data,
            sorters: [{
                    property: 'Modelo',
                    direction: 'ASC'
                }]
        });
        var grid = GridPanel(store, ch, deps);
    });
}
function DeleteInventario(record, grid)
{
    if (hasUpdate) {
        Ext.Msg.confirm('Eliminar hora extraordinaria', 'Esta seguro que quiere eliminar este hora extraordinaria?', function(button) {
            if (button === 'yes') {

                var sm = grid.getSelectionModel();
                var rec = grid.getSelectionModel().getSelection()[0];

                grid.store.remove(sm.getSelection());
                if (grid.store.getCount() > 0) {
                    sm.select(0);
                }
                var horaexId = record.data['InventarioId'];
                x_DeleteInventario(horaexId, DeleteInventario_callback);
            }
        });

    }
}
function DeleteInventario_callback(response)
{

    if (response)
    {
        humane.success("Se ha eliminado el vehiculo correctamente.");

        x_LoadInventario(mes, anio, choferId, depId, LoadInventario_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar el vehiculo.");
        SendJsError(new Error("Error DeleteInventario-vehiculos.js"), "vehiculos.js", response);

    }

}

function GetHorarioTarjeta()
{
    var te, ts;
    if (Ext.getCmp('TMEntrada').getValue())
    {
        te = new Date(Ext.getCmp('TMEntrada').getValue())
    }
    if (Ext.getCmp('TTEntrada').getValue())
    {
        te = new Date(Ext.getCmp('TTEntrada').getValue())
    }
    if (Ext.getCmp('TMSalida').getValue())
    {
        ts = new Date(Ext.getCmp('TMSalida').getValue());
    }
    if (Ext.getCmp('TTSalida').getValue())
    {
        ts = new Date(Ext.getCmp('TTSalida').getValue());
    }
    var t = new Date();
    var ht = [];
    if (ts && te)
    {
        t.setHours(ts.getHours() - te.getHours(), ts.getMinutes() - te.getMinutes(), 0, 0);
        ht[0] = te.getHours() + ":" + te.getMinutes();
        ht[1] = ts.getHours() + ":" + ts.getMinutes();
    }
    else
    {
        t.setHours(0, 0, 0, 0);
        ht[0] = "00:00";
        ht[1] = "00:00";
    }
    ht[2] = t;

    return ht;
}
function CalcularInventario(form)
{
    var rec = form.getValues();
    var e, s, he, hs, ms, me, zona, te, ts, a, am, b, bm, hex;
    e = new Date(rec['Entrada']);
    s = new Date(rec['Salida']);
    he = e.getHours();
    me = e.getMinutes();
    hs = s.getHours();
    ms = s.getMinutes();
    zona = rec['Zona'];
    if (hs === 0) {
        hs = 24;
        ms = 00;
    }
    var vth = Math.abs(hs - he);
    var vtm = Math.abs(ms - me);
    var vt = new Date();
    vt.setHours(vth, vtm, 0, 0);
    if (rec['Entrada'] && rec['Salida'] && zona === "1")
    {
        var t = GetHorarioTarjeta();
        a = t[0].split(":");
        am = parseInt(a[1]);
        a = parseInt(a[0]);
        b = t[1].split(":");
        bm = parseInt(b[1]);
        b = parseInt(b[0]);
        var ht = t[2];
        if (a <= he && he < b && b < hs)
        {
            hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), hs - b, ms - bm);
        }
        if (he < a && a <= hs && hs <= b)
        {
            hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), a - he, am - ms);
        }
        if (a <= he && hs <= b)
        {
            hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), hs - he, ms - me);
        }
        if (hs <= a && hs < b)
        {
            hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), hs - he, ms - me);
        }
        if (b <= he && a < e)
        {
            hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), hs - he, ms - me);
        }
        if (ht.getHours() === 0)
        {
            var horaex = 0, minex = 0;
            hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), hs - he, ms - me);
            if (hex.getHours() >= 7) {
                horaex = hex.getHours() - 7;
                minex = hex.getMinutes();
            }
            hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), horaex, minex);
        }
    }
    else // dia inhábil se considera todas las horas de viaje
    {
        hex = vt;
    }
    var grid = Ext.getCmp('gridDesc');
    var descs = grid.store.data.items;
    for (var i = 0; i < descs.length; i++)
    {
        var de = descs[i].data['entrada'].split(":")[0];
        var dem = descs[i].data['entrada'].split(":")[1];
        var ds = descs[i].data['salida'].split(":")[0];
        var dsm = descs[i].data['salida'].split(":")[1];
        var dt = new Date();
        dt.setHours(ds - de, dsm - dem);
        if (hex.getHours() >= dt.getHours())
        {
            hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), hex.getHours() - dt.getHours(), hex.getMinutes() - dt.getMinutes());
        }
        else
        {
            hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), 0, 0);
            break;
        }

    }
    Ext.getCmp('Hora50').setValue('00:00');
    Ext.getCmp('Hora100').setValue('00:00');
    Ext.getCmp('TotalHoras').setValue('00:00');
    var totalextra = parseFloat(hex.getHours() + "." + hex.getMinutes());
    if (zona === "1") {
        totalextra = parseFloat(totalextra * 1.5);
        Ext.getCmp('Hora50').setValue(hex.f("HH:mm"));
    }

    else {
        totalextra = totalextra * 2;
        Ext.getCmp('Hora100').setValue(hex.f("HH:mm"));
    }
    totalextra = totalextra.toFixed(2);
    totalextra = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), totalextra.split(".")[0], totalextra.split(".")[1]);
    Ext.getCmp('TotalHoras').setValue(totalextra.f("HH:mm"));
}

function SaveInventario(form, action)
{
    var rec = form.getValues();
    if (action !== "add") {
        if (!hasUpdate) {
            return;
        }
        rec['InventarioId'] = CurrentObject.data['InventarioId'];
        rec['DescansosId'] = CurrentObject.data['DescansosId'];
    }
    else
        rec['InventarioId'] = 0;

    var grid = Ext.getCmp('gridDesc');
    var descs = grid.store.data.items;
    var descan = [];
    for (i = 0; i < descs.length; i++)
    {
        var a = new Array();
        a[0, 0] = descs[i].data['entrada'];
        a[0, 1] = descs[i].data['salida'];
        descan.push(a);

    }

    rec['Descansos'] = descan;
    rec['TotalHoras'] = Ext.getCmp('TotalHoras').getValue().replace(".", ":");
    rec['Hora50'] = Ext.getCmp('Hora50').getValue();
    rec['Hora100'] = Ext.getCmp('Hora100').getValue();
    if (rec['TotalHoras'] !== "00:00" || rec ['TotalHoras'] !== null)
        rec['Calculado'] = 1;
    else
        rec['Calculado'] = 0;

    var horaex = JSON.stringify(rec);
    console.log(horaex);
    x_SaveInventario(horaex, SaveInventario_callback);
}
function SaveInventario_callback(response)
{
    if (response)
    {
        humane.success("Se ha guardado la hora extraordinaria correctamente.");
        x_LoadInventario(mes, anio, choferId, depId, LoadInventario_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar la hora.");
        SendJsError(new Error("Error SaveInventario-horaex.js"), "horaex.js", response);
    }

}
