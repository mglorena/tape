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
var choferId = 0;
x_LoadReservas(choferId, mes, anio, estado, LoadReservas_callback);
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

function GridPanel(store, ch)
{
    // create the grid and specify what field you want
    // to use for the editor at each column.
    var anios = [[2020, '2020'],[2021, '2021'],[2022, '2022'],[2023, '2023'],[2024, '2024'],[2025, '2025'],[2026, '2026']];

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
    ch.push(a);
    var stchoferes = new Ext.data.ArrayStore({
        fields: ['ChoferId', 'NombreCompleto'],
        data: ch
    });

    Ext.tip.QuickTipManager.init();
    var win;
    grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [
            {
                header: 'Choferes',
                dataIndex: 'ChoferName',
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

            }
        ],
        renderTo: 'tblReservas',
        width: '98%',
        height: '78%',
        //stripeRows: true,
        title: 'Reporte Reservas Automotores UNSa',
        frame: true,
        tbar: [{
                xtype: 'combo',
                fieldLabel: 'Chofer',
                labelWidth: 50,
                store: stchoferes,
                id: 'ddlChoferes',
                valueField: 'ChoferId',
                displayField: 'NombreCompleto',
                typeAhead: true,
                mode: 'local',
                // forceSelection: true,
                value: choferId,
                width: 420,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        choferId = combo.value;
                        x_LoadReservas(choferId, mes, anio, estado, LoadReservas_callback);
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
                        x_LoadReservas(choferId, mes, anio, estado, LoadReservas_callback);
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
                        x_LoadReservas(choferId, mes, anio, estado, LoadReservas_callback);
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
                        x_LoadReservas(choferId, mes, anio, estado, LoadReservas_callback);
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
    var ch = Ext.getCmp('ddlChoferes').rawValue;
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
        header += "Chofer: " + ch;
    return [header, colshide, footer];

}
function LoadReservas_callback(response)
{
    $("#tblReservas").html("");
    var data = ObjToArray(response[1]);
    ch = ObjToArray(response[2]);
    
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
            //remoteSort: true,
            model: 'Reserva',
            proxy: {
                type: 'memory'/*,
                 simpleSortMode: true*/
            },
            data: data,
            sorters: [{
                    property: 'ChoferName',
                    direction: 'ASC'
                    }]

        });
        var grid = GridPanel(store, ch);
    });
}