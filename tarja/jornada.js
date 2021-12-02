var date = new Date();
var mes = date.getMonth();
var anio = date.getFullYear();
var mesNom = date.toLocaleString();
mes = mes + 1;


/*$(function() {*/

x_LoadMes(personaId, mes, anio, LoadMes_callback);
/*});*/
function LoadMes_callback(response)
{
    try
    {

        var data = ObjToArray(response[1]);

        var info = response[2][0];

        //console.log(data);
        Ext.onReady(function() {
            Ext.define('Jornada', {
                extend: 'Ext.data.Model',
                fields: ['PersonaId', 'Fecha', {name: 'Horarios', type: 'time'}, 'TotalHoras']});


            var store = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                pageSize: 10,
                remoteSort: true,
                model: 'Jornada',
                proxy: {
                    type: 'memory'

                },
                data: data
            });
            //console.log(data);
            var anios = [[2014, '2014'], [2015, '2015'], [2016, '2016'], [2017, '2017'], [2018, '2018'], [2019, '2019'], [2020, '2021'], [2022, '2022'], [2023, '2023']];

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
                columns: [{
                        header: 'Fecha',
                        dataIndex: 'Fecha',
                        flex: 1
                    },
                    {
                        header: 'Horarios',
                        dataIndex: 'Horarios',
                        flex: 1,
                        format: 'H:i'
                    },
                    {
                        header: 'Total Horas',
                        dataIndex: 'TotalHoras',
                        flex: 1,
                        summaryType: function(records) {
                            var dataIndex = 'TotalHoras';
                            return SumTotal(records, dataIndex);
                        }
                    }, {
                        menuDisabled: true,
                        sortable: false,
                        xtype: 'actioncolumn',
                        header: 'Acciones',
                        align: 'center',
                        width: 70,
                        items: [{
                                icon: '../images/icons/play16x16.png', // Use a URL in the icon config
                                tooltip: 'Play',
                                align: 'center',
                                altText: 'Play',
                                cls: 'x-icon-action',
                                handler: function(grid, rowIndex, colIndex) {

                                }
                            }, {
                                icon: '../images/icons/pause16x16.png',
                                tooltip: 'Pause',
                                align: 'center',
                                altText: 'Pause',
                                handler: function(grid, rowIndex, colIndex) {

                                }
                            }
                            , {
                                icon: '../images/icons/stop16x16.png',
                                tooltip: 'Parar',
                                align: 'center',
                                altText: 'Parar',
                                handler: function(grid, rowIndex, colIndex) {


                                }

                            }]
                    }

                ],
                renderTo: 'tblJornada',
                width: 900,
                height: 457,
                //stripeRows: true,
                title: "Jornada Laboral de " + info['Apellido'] + ', ' + info['Nombre'],
                frame: true,
                tbar: [{
                        xtype: 'combo',
                        fieldLabel: 'Mes',
                        labelWidth: 30,
                        store: stmes,
                        id: 'ddlMes',
                        valueField: 'id',
                        displayField: 'mes',
                        typeAhead: true,
                        mode: 'local',
                        value: mes,
                        width: 120,
                        emptyText: '......',
                        listeners: {
                            'select': function(combo, record, idx) {
                                mes = combo.value;
                                x_LoadServicios(mes, anio, tservicioId, LoadServicios_callback);
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
                        value: anio,
                        width: 120,
                        emptyText: '......',
                        listeners: {
                            'select': function(combo, record, idx) {
                                anio = combo.value;
                                x_LoadServicios(mes, anio, tservicioId, LoadServicios_callback);
                            }
                        }

                    }, {
                        text: 'Imprimir Lista',
                        iconCls: 'icon-print',
                        handler: function() {
                            var mesn = Ext.getCmp("ddlMes");
                            var mesn = mesn.rawValue;
                            var anio = Ext.getCmp("ddlAnio").getValue();
                            Ext.ux.grid.Printer.mainTitle = "<font size=5> SERVICIO DE " + Name(tservicioId) + " <br/> Mes: " + mesn + "    Año : " + anio + "</font>";
                            Ext.ux.grid.Printer.headerText = "Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios";
                            Ext.ux.grid.Printer.printLinkText = "Imprimir";
                            Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                            Ext.ux.grid.Printer.printSummary = true;
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
        SendJsError(e, "LoadMes_callback", response);
    }
}
var loading;
function SumTotal(records, dataIndex)
{
    var length = records.length,
            total = 0,
            record;

    for (i = 0; i < length; ++i) {
        record = records[i].get(dataIndex);
           if(record ==="" || record=== null || record === "undefined")
            record =0;
        total += parseFloat(record);
    }
    total = total.toFixed(2);
    return total;

}