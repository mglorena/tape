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
var vehiculoId = 0;
var desde = anio+'-'+mes+'-01', hasta = anio+'-'+mes+'-07';
x_LoadReservas(desde,hasta,vehiculoId,LoadReservas_callback);

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

function GridPanel(store,ve)
{
    var a = [0, 'Todos'];
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

            }
        ],
        renderTo: 'tblReservas',
        width: 900,
        height: 457,
        //stripeRows: true,
        title: 'Reporte Reservas Automotores UNSa',
        frame: true,
        tbar: [{
            xtype:'datefield',
            fieldLabel:'Desde',
            labelWidth: 30,
            id:'desde',
            mode: 'local',
            submitFormat:'YYYY-mm-dd H:i:m',
            value:desde,
            width: 125,
            listeners :{ 
                'change':function(txt, record, idx){
                    desde = txt.value;
                    if(desde)
                        desde = desde.f("yyyy-MM-dd");
                    x_LoadReservas(desde,hasta,vehiculoId,LoadReservas_callback);
                }
            }
           
        },{
            xtype:'datefield',
            fieldLabel:'Hasta',
            labelWidth: 30,
            id:'hasta',
            mode: 'local',
            submitFormat:'YYYY-mm-dd H:i:m',
            value:hasta,
            width: 125,
            listeners :{ 
                'change':function(txt, record, idx){
                    hasta = txt.value;
                    if(hasta)
                        hasta = hasta.f("yyyy-MM-dd");
                    x_LoadReservas(desde,hasta,vehiculoId,LoadReservas_callback);
                }
            }
           
        },{
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
                        x_LoadReservas(desde,hasta,vehiculoId,LoadReservas_callback);
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
   
    var colshide = '';
    var header = "<div>Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios - Automotores</div><br/>";
    var title = "<div align='center'><u>Reservas </u></div>";
    var addHeader = "";
    var footer;

    header += title;
    header += "<div>Fecha Emisión: " + (new Date()).f('dd/MM/yyyy') + "<br/> Rango: " + new Date(desde).f('dd/MM/yyyy')  + " a " + new Date(hasta).f('dd/MM/yyyy')  + "</div>";
    header += addHeader;
    if (ve !== "Todos")
        header += "Vehiculo: " + ve;
    return [header, colshide, footer];

}
function LoadReservas_callback(response)
{
    $("#tblReservas").html("");
    var data = ObjToArray(response[1]);
    ve = ObjToArray(response[2]);
    
    Ext.onReady(function() {
        
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
        var grid = GridPanel(store, ve);
        
    });
}