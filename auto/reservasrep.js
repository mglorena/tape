/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/****************/
var CurrentObject;
var date = new Date();
var dia = null;
var mes = date.getMonth() + 1;
var anio = date.getFullYear();
var mesNom = date.toLocaleString();
var tvehiculoId = 0, estado = 0;
x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
var estados = [[0, 'Todos'], [1, 'Pendiente'], [2, 'Confirmada'], [3, 'Suspendida'], [4, 'Realizada']];
var stestados = new Ext.data.ArrayStore({
    fields: ['Id', 'Estado'],
    data: estados
});

var grid, ridx, ac, ve, ch;

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

function GridPanel(store, tve)
{
    // create the grid and specify what field you want
    // to use for the editor at each column.
    var anios = [[2020, '2020'], [2021, '2021'], [2022, '2022'], [2023, '2023'], [2024, '2024']];

    var stanio = new Ext.data.ArrayStore({
        fields: ['id', 'anio'],
        data: anios
    });

    var meses = [[1, 'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'], [5, 'Mayo'], [6, 'Junio'], [7, 'Julio'], [8, 'Agosto'], [9, 'Septiembre'], [10, 'Octubre'], [11, 'Noviembre'], [12, 'Diciembre']];

    var stmes = new Ext.data.ArrayStore({
        fields: ['id', 'mes'],
        data: meses
    });


    var a = [0, 'Todos'];
    tve.push(a);
    var sttve = new Ext.data.ArrayStore({
        fields: ['TipoVehiculoId', 'Nombre'],
        data: tve
    });
    Ext.tip.QuickTipManager.init();
    var win;
    grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [{
                header: 'Solicitante',
                dataIndex: 'Solicitante',
                flex: 1
            },
            {
                header: 'Destino',
                dataIndex: 'Destino',
                flex: 1
            },
            {
                header: 'Vehiculo',
                dataIndex: 'Vehiculo',
                flex: 1
            },
            {
                header: 'Periodo',
                dataIndex: 'Periodo',
                flex: 1
            },
            {
                header: 'Choferes',
                dataIndex: 'ChoferName',
                flex: 1
            },
            {
                header: 'Estado',
                dataIndex: 'Estado',
                align: 'center',
               // hidden:true,
                renderer: function(value)
                {
                    if (value === 'Pendiente')
                        return "<font color=red>" + value + "</font>";
                    else if (value === 'Confirmada')
                        return "<font color=green>" + value + "</font>";
                    else if (value === 'Realizada')
                        return "<font color=navy>" + value + "</font>";
                    else
                        return value;
                }

            },
            {
                header: 'Costo Aprox',
                dataIndex: 'GastoTotal',
                //hidden:true,
                align: 'center',
                renderer: 'usMoney'

            }
        ],
        renderTo: 'tblReservas',
        width: 900,
        height: 457,
        //stripeRows: true,
        title: 'Reporte Reservas Automotores UNSa',
        frame: true,
        tbar: [{
                xtype: 'datefield',
                fieldLabel: 'Dia',
                labelWidth: 30,
                id: 'txtDia',
                mode: 'local',
                submitFormat: 'YYYY-mm-dd H:i:m',
                value: dia,
                width: 125,
                listeners: {
                    'change': function(txt, record, idx) {
                        dia = txt.value;
                        if (dia)
                            dia = dia.f("yyyy-MM-dd");
                        x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                    }
                }

            }
            , {
                xtype: 'combo',
                fieldLabel: 'Mes',
                labelWidth: 30,
                store: stmes,
                id: 'ddlMes',
                valueField: 'id',
                displayField: 'mes',
                typeAhead: true,
                mode: 'local',
                // forceSelection: true,
                value: mes,
                width: 120,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        mes = combo.value;
                        x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
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
                //forceSelection: true,
                value: anio,
                width: 120,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        anio = combo.value;
                        x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                    }
                }

            }, {
                xtype: 'combo',
                fieldLabel: 'Estado',
                labelWidth: 50,
                store: stestados,
                id: 'ddlEstado',
                valueField: 'Id',
                displayField: 'Estado',
                typeAhead: true,
                mode: 'local',
                // forceSelection: true,
               // hidden:true,
                value: estado,
                width: 150,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        estado = combo.value;
                        x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                    }
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Tipo vehículo',
                labelWidth: 90,
                store: sttve,
                id: 'ddlTipoVehiculo',
                valueField: 'TipoVehiculoId',
                displayField: 'Nombre',
                typeAhead: true,
                mode: 'local',
                // forceSelection: true,
                value: tvehiculoId,
                width: 180,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        tvehiculoId = combo.value;
                        x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                    }
                }
            }, '-',
            {
                text: 'Imprimir',
                iconCls: 'icon-print',
                handler: function() {
                    var resume = ResumeHeader();
                    Ext.ux.grid.PrinterAuto.mainTitle = "";
                    Ext.ux.grid.PrinterAuto.headerText = resume[0];
                    Ext.ux.grid.PrinterAuto.printLinkText = "Imprimir";
                    Ext.ux.grid.PrinterAuto.closeLinkText = "Cerrar";
                    Ext.ux.grid.PrinterAuto.printSummary = false;
                    Ext.ux.grid.PrinterAuto.columnsHide = resume[1];
                    Ext.ux.grid.PrinterAuto.marginExpte = "<br/>";
                    Ext.ux.grid.PrinterAuto.printAutomatically = false;
                    Ext.ux.grid.PrinterAuto.footerText = resume[2];
                    Ext.ux.grid.PrinterAuto.print(grid);
                }
            }
        ]
    });
    return grid;
}
function ResumeHeader()
{
    var header;
    try
    {
        var mes = Ext.getCmp('ddlMes').rawValue;
        var anio = Ext.getCmp('ddlAnio').rawValue;
        var tipVe = Ext.getCmp('ddlTipoVehiculo').rawValue;
        var colshide = '5,6';
        header = "<div>Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios - Automotores</div>";
        var title = "<div align='center'><u>Reservas "+ tipVe +"</u></div>";
        var addHeader = "";
        var footer;

        header += title;
        header += "Fecha Emisión: " + (new Date()).f('dd/MM/yyyy') + "<br/> Meses/Año : " + mes + "/" + anio;
        header += addHeader;

        return [header, colshide, footer];
    } catch (e)
    {
        SendJsError(e, "ResumeHeader - reservas.js", header);
    }
}
function LoadReservas_callback(response)
{
    $("#tblReservas").html("");
    var data = ObjToArray(response[1]);
    var tve = ObjToArray(response[2]);
    ve = ObjToArray(response[3]);
    ch = ObjToArray(response[4]);
    Ext.onReady(function() {
        // Define our data model
        var win;
        Ext.define('Reserva', {
            extend: 'Ext.data.Model',
            fields: ['ReservaId', 'Destino', 'Solicitante', 'EmailSolicitante', 'AutorizadoPor', 'Tipo', 'Vehiculo', 'VehiculoId', 'ChoferesIds',
                'Estado', 'FechaInicio', 'FechaFin', 'HoraSalida', 'HoraLlegada', 'Periodo', 'Distancia', 'NumPasajeros', 'ChoferName', 'Observacion', 'FileName',
                {
                    name: 'GastoTotal',
                    type: 'usMoney'
                }]
        });


        // create the Data Store
        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            pageSize: 10,
            remoteSort: true,
            model: 'Reserva',
            proxy: {
                type: 'memory'/*,
                 simpleSortMode: true*/
            },
            data: data/*,
             sorters: [{
             property: 'Modelo',
             direction: 'ASC'
             }],
             totalProperty : 8,
             autoLoad  : {
             params:
             
             {
             start:0, 
             limit:4
             }
             }*/
        });
        var grid = GridPanel(store, tve);
    });
}