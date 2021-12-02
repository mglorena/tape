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
mes = mes + 1;
var tvehiculoId = 0;
var estado = 0;
var vehiculoId = 0;
x_LoadReservas(vehiculoId, mes, anio, estado, LoadReservas_callback);
var estados = [[0, 'Todos'], [1, 'Pendiente'], [2, 'Confirmada'], [3, 'Suspendida'],[4,'Realizada']];
var stestados = new Ext.data.ArrayStore({
    fields: ['Id', 'Estado'],
    data: estados
});

var grid, ridx, ac, ve;

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

function GridPanel(store, tve, ve)
{
    // create the grid and specify what field you want
    // to use for the editor at each column.
    var anios = [[2012, '2012'], [2013, '2013'], [2014, '2014'], [2015, '2015'], [2016, '2016'], [2017, '2017'], [2018, '2018'], [2019, '2019'], [2020, '2020']];

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

    ve.push(a);
    var stvehiculos = new Ext.data.ArrayStore({
        fields: ['VehiculoId', 'Modelo'],
        data: ve
    });

    Ext.tip.QuickTipManager.init();
    var win;
    grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [
            {
                header: 'Vehiculo',
                dataIndex: 'Vehiculo',
                flex: 1
            }, {
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
                xtype: 'combo',
                fieldLabel: 'Vehiculo',
                labelWidth: 50,
                store: stvehiculos,
                id: 'ddlVehiculo',
                valueField: 'VehiculoId',
                displayField: 'Modelo',
                typeAhead: true,
                mode: 'local',
                // forceSelection: true,
                value: vehiculoId,
                width: 420,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        vehiculoId = combo.value;
                        x_LoadReservas(vehiculoId, mes, anio, estado, LoadReservas_callback);
                    }
                }

            }, {
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
                        x_LoadReservas(vehiculoId, mes, anio, estado, LoadReservas_callback);
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
                        x_LoadReservas(vehiculoId, mes, anio, estado, LoadReservas_callback);
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
                value: estado,
                width: 150,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        estado = combo.value;
                        x_LoadReservas(vehiculoId, mes, anio, estado, LoadReservas_callback);
                    }
                }
            }, '-',
            {
                text: 'Imprimir',
                iconCls: 'icon-print',
                handler: function() {
                    var resume = ResumeHeader();
                    Ext.ux.grid.Printer.mainTitle = "";
                    Ext.ux.grid.Printer.headerText = resume[0];
                    Ext.ux.grid.Printer.printLinkText = "Imprimir";
                    Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                    Ext.ux.grid.Printer.printSummary = false;
                    Ext.ux.grid.Printer.columnsHide = resume[1];
                    Ext.ux.grid.Printer.marginExpte = "<br/>";
                    Ext.ux.grid.Printer.printAutomatically = false;
                    Ext.ux.grid.Printer.footerText = resume[2];
                    Ext.ux.grid.Printer.print(grid);
                }
            }
        ]
    });
    return grid;
}
function ResumeHeader()
{
    var ve = Ext.getCmp('ddlVehiculo').rawValue;
    var mes = Ext.getCmp('ddlMes').rawValue;
    var anio = Ext.getCmp('ddlAnio').rawValue;
    var colshide = '';
    var header = "<div>Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios - Automotores</div><br/>";
    var title = "<div align='center'><u>Reservas </u></div>";
    var addHeader = "";
    var footer;

    header += title;
    header += "<div>Fecha Emisión: " + (new Date()).f('dd/MM/yyyy') + "<br/> Meses/Año : " + mes + "/" + anio + "</div>";
    header += addHeader;
    if (ve !== "Todos")
        header += "Vehiculo: " + ve;
    return [header, colshide, footer];

}
function LoadReservas_callback(response)
{
    $("#tblReservas").html("");
    var data = ObjToArray(response[1]);
    var tve = ObjToArray(response[2]);
    ve = ObjToArray(response[3]);
    ch = ObjToArray(response[4]);
    //var ve = ObjToArray(response[1]);
    Ext.onReady(function() {
        // Define our data model
        var win;
        Ext.define('Reserva', {
            extend: 'Ext.data.Model',
            fields: ['ReservaId', 'Destino', 'Solicitante', 'EmailSolicitante', 'AutorizadoPor', 'Tipo', 'Vehiculo', 'VehiculoId', 'ChoferesIds', 'Capacidad',
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
        var grid = GridPanel(store, tve, ve);
    });
}