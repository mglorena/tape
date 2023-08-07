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


x_LoadServicios(anio, tservicioId, LoadServicios_callback);

var grid, ridx, tsdata;

function Name(tservicioId)
{
    if (tservicioId === 3)
        return "GAS";
    if (tservicioId === 1)
        return "AGUA";
    if (tservicioId === 2)
        return "ENERGIA ELECTRICA";

}
function GridPanel(store)
{
    // create the grid and specify what field you want
    // to use for the editor at each column.
    var anios = [[2011, '2011'],[2012, '2012'], [2013, '2013'], [2014, '2014'], [2015, '2015'], [2016, '2016'], [2017, '2017'], [2018, '2018'], [2019, '2019'], [2020, '2020']];

    var stanio = new Ext.data.ArrayStore({
        fields: ['id', 'anio'],
        data: anios
    });

    var meses = [[1, 'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'], [5, 'Mayo'], [6, 'Junio'], [7, 'Julio'], [8, 'Agosto'], [9, 'Septiembre'], [10, 'Octubre'], [11, 'Noviembre'], [12, 'Diciembre']];

    var stmes = new Ext.data.ArrayStore({
        fields: ['id', 'mes'],
        data: meses
    });

    Ext.tip.QuickTipManager.init();
    var win;



    grid = Ext.create('Ext.grid.Panel', {
        store: store,
        features: [{
                ftype: 'summary',
                id: 'summary'
            }],
        columns: [
             {
                xtype: 'checkcolumn',
                header: 'Seleccion',
                dataIndex: 'Seleccion',
                width: 60,
                editor: {
                    xtype: 'checkbox',
                    cls: 'x-grid-checkheader-editor'
                }
            }
            ,{
                header: 'Usuario',
                dataIndex: 'Usuario',
                flex: 1,
                summaryType: function(records)
                {
                    return "<b>TOTALES</b>";
                }
            },
            {
                header: 'Medidor',
                dataIndex: 'Medidor',
                flex: 1,
                 align:'center',
                summaryType: 'count',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' Medidores)' : '(1 Medidor)');
                }
            }
            ,
            {
                header: 'Medicion Inicial',
                dataIndex: 'MedicionInicial',
                flex: 1,
                 align:'center',
                renderer: 'numberfield'/*,
                summaryType: function(records) {
                    var dataIndex = 'MedicionInicial';
                    return SumTotal(records, dataIndex);
                }*/
            },
            {
                header: 'Medicion Final',
                dataIndex: 'MedicionFinal',
                flex: 1,
                 align:'center',
                renderer: 'numberfield'/*,
                summaryType: function(records) {
                    var dataIndex = 'MedicionFinal';
                    return Sum(records, dataIndex);
                }*/
            },
            {
                header: 'Ultimo Mes',
                dataIndex: 'MesFinal',
                flex: 1,
                 align:'center',
                renderer: 'numberfield'/*,
                summaryType: function(records) {
                    var dataIndex = 'MesFinal';
                    return SumTotal(records, dataIndex);
                }*/
            },
            {
                header: 'Consumo Total',
                dataIndex: 'ConsumoTotal',
                flex: 1,
                renderer: 'numberfield',
                 align:'right',
                summaryType: function(records) {
                    var dataIndex = 'ConsumoTotal';
                    return Sum(records, dataIndex);
                }
            },
            {
                header: 'Costo Total',
                dataIndex: 'Total',
                flex: 1,
                align:'right',
                renderer: 'usMoney',
                summaryType: function(records) {
                    var dataIndex = 'Total';
                    return SumTotal(records, dataIndex);
                },
                summaryRenderer: Ext.util.Format.usMoney
            },
            {
                header: 'Paga',
                dataIndex: 'Paga',
                flex: 1
            }

        ],
        renderTo: 'tblServicios',
        width: 900,
        height: 457,
        //stripeRows: true,
        title: "Servicio de  " + Name(tservicioId) + " - DGOyS UNSa",
        frame: true,
        tbar: [{
                xtype: 'combo',
                fieldLabel: 'Año',
                labelWidth: 30,
                store: stanio,
                id: 'ddlAnio',
                valueField: 'id',
                displayField: 'anio',
                typeAhead: true,
                mode: 'local',
                value: anio,
                width: 120,
                emptyText: '......',
                listeners: {
                    'select': function(combo, record, idx) {
                        anio = combo.value;
                        x_LoadServicios(anio, tservicioId, LoadServicios_callback);
                    }
                }

            }, {
                text: 'Imprimir Lista',
                iconCls: 'icon-print',
                handler: function() {
                    //console.log(grid.store.data);
                    /*store.filterBy(function(rec) { //console.log(rec); return true;
                     if (rec.data['Seleccion']) { 
                     return true;
                     } else {
                     return false;
                     }
                     });*/
                    var anio = Ext.getCmp("ddlAnio").getValue();
                    Ext.ux.grid.PrinterReportAnual.mainTitle = "<center><br/><font size=4><br/> SERVICIO DE " + Name(tservicioId) + " <br/> Consumo Anual " + anio + "     </font></center>";
                    Ext.ux.grid.PrinterReportAnual.headerText = "Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios";
                    Ext.ux.grid.PrinterReportAnual.printLinkText = "Imprimir";
                    Ext.ux.grid.PrinterReportAnual.closeLinkText = "Cerrar";
                    Ext.ux.grid.PrinterReportAnual.printSummary = true;
                    Ext.ux.grid.PrinterReportAnual.columnsHide ="0,8";
                    Ext.ux.grid.PrinterReportAnual.printAutomatically = false;
                    Ext.ux.grid.PrinterReportAnual.print(grid);
                    grid.store.filterBy(function(rec) { //console.log(rec); return true;

                        return true;

                    });
                }
            }, '-', {
                text: 'Cargar',
                iconCls: 'icon-list',
                handler: function() {

                    document.location.href = _WebSitePath + 'servicios/carga.php?s=' + tservicioId;
                }

            }, {
                text: 'Reporte Mensual',
                iconCls: 'icon-list',
                handler: function() {

                    document.location.href = _WebSitePath + 'servicios/reporte.php?s=' + tservicioId;
                }
            }
        ]
    });

    return grid;
}
function ResumeHeader()
{
    var colshide = '';
    var title = "<div align='left'><b><u>SERVICIO DE  " + Name(tservicioId) + " </u></b></div>";
    var d = new Date(anio, mes, 1, 0, 0);
    var v1 = new Date(date.getUTCFullYear(), parseInt(date.getMonth() + 1), parseInt(7 + date.getDate()), 0, 0);
    var v2 = new Date(date.getUTCFullYear(), parseInt(date.getMonth() + 1), parseInt(14 + date.getDate()), 0, 0);

    header = "<div style='border:solid 1px black;font-size:16px;'><br/> <br/>Universidad Nacional de Salta <br/>Dirección General de Obras y Servicios - SERVICIO DE  " + Name(tservicioId) + "</div>";

    var mesNom = new Date(date.getUTCFullYear(), mes - 1, 1);
    header += "<div style='clear:both;'></div>";
    header += "<div style='border-top:solid 1px black;border-left:solid 1px black;border-right:solid 1px black;padding-left:3px;'>";
    header += "<div class='efact'>Fecha: " + date.getDate() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getUTCFullYear() + "   </div>";
    header += "<div class='efact'> Periodo: " + "01/" + mes + "/" + anio + " a " + d.getDaysInMonth() + "/" + mes + "/" + anio + "   </div>";
    header += "<div class='efact'> 1º Venc.: " + +v1.getDate() + "/" + v1.getMonth() + "/" + anio + "  </div>";
    header += "<div class='efact'> 2º Venc.: " + v2.getDate() + "/" + v2.getMonth() + "/" + anio + "  </div>";
    header += "<div style='clear:both;'></div>";
    header += "<div class='efact'>Valor consumo: $ " + tsdata[0]['ValorConsumo'].replace(".", ",") + "  " + tsdata[0]['Unidad'] + "</div>";
    header += "<div class='efact'>Cargo Fijo Mensual: $ " + tsdata[0]['CargoFijo'].replace(".", ",") + "</div>";
    header += "<div  style='clear:both;border:1px;font-size:9px;padding:3px;margin:0px;'>EL PAGO SE DEBERA REALIZAR EN LA OFICINA DE LA DIRECCION GRAL. DE OBRAS Y SERVICIOS. PRODUCIDO EL 2° VENCIMIENTO SE PRODECERA AL CORTE DEL SERVICIO.    </div>";
    header += "</div>";
    header += "<div  style='padding-left:30px;border:solid 1px black;border-bottom:none;font-size:16px;'>" + mesNom.f("MMM") + "</div>";
    var footer;
    return [header, colshide, footer];
}
function SumTotal(records, dataIndex)
{
    var length = records.length,
            total = 0,
            record;

    for (i = 0; i < length; ++i) {
        record = records[i].get(dataIndex);
        total += parseFloat(record);
    }
    total = total.toFixed(2);
    return convertCurr(total);

}
function Sum(records, dataIndex)
{
    var length = records.length,
            total = 0,
            record;

    for (i = 0; i < length; ++i) {
        record = records[i].get(dataIndex);
        total += parseInt(record);
    }
    total = parseInt(total);
    return total;

}
function LoadServicios_callback(response)
{
    $("#tblServicios").html("");
    var data = ObjToArray(response[1]);
    tsdata = ObjToArray(response[2]);
    //console.log(data);
    Ext.onReady(function() {

        var win;
        Ext.define('Servicio', {
            extend: 'Ext.data.Model',
            fields: ['ServicioId', {name: 'Usuario', type: 'string'}, 'Medidor', 'MesFinal', 'MedicionInicial', 'MedicionFinal', 'Mes', 'Anio', 'Paga', 'ConsumoTotal', 'Total', {name: 'Seleccion', type: 'bool'}]});


        // create the Data Store
        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            pageSize: 10,
            remoteSort: true,
            model: 'Servicio',
            proxy: {
                type: 'memory'

            },
            data: data
        });
        var grid = GridPanel(store);
    });
}

