var date = new Date();
var anio = date.getFullYear();
var CurrentObject;
var meses;
x_LoadHoraEx(meses, anio, LoadHoraEx_callback);
var grid, ridx;

function GridPanel(store)
{
    try
    {
        var mess = [[1, 'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'], [5, 'Mayo'], [6, 'Junio'], [7, 'Julio'], [8, 'Agosto'], [9, 'Septiembre'], [10, 'Octubre'], [11, 'Noviembre'], [12, 'Diciembre']];
        var stmes = new Ext.data.ArrayStore({
            fields: ['id', 'mes'],
            data: mess
        });

        var anios = [[2011, '2011'], [2012, '2012'], [2013, '2013'], [2014, '2014'], [2015, '2015'], [2016, '2016'], [2017, '2017'], [2018, '2018'], [2019, '2019'], [2020, '2020']];
        var stanio = new Ext.data.ArrayStore({
            fields: ['id', 'anio'],
            data: anios
        });

        var b = [0, 'Todos'];
        Ext.tip.QuickTipManager.init();
        grid = Ext.create('Ext.grid.Panel', {
            store: store,
            features: [{
                    ftype: 'summary',
                    id: 'summary'
                }],
            columns: [{
                    header: 'Leg',
                    dataIndex: 'Leg',
                    flex: 1

                },
                {
                    header: 'Nombre',
                    dataIndex: 'Nombre',
                    flex: 1
                },
                {
                    header: 'Mes',
                    dataIndex: 'Mes',
                    flex: 1
                }
                ,
                {
                    header: 'Hs. Hábiles',
                    dataIndex: 'HorasHabiles',
                    format: 'H:i',
                    flex: 1,
                    summaryType: function (records) {
                        var dataIndex = 'HorasHabiles';
                        return SumTime(records, dataIndex);
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return value;
                    }
                },
                {
                    header: 'Hs. Inhabiles',
                    dataIndex: 'HorasInhabiles',
                    format: 'H:i',
                    flex: 1,
                    summaryType: function (records) {
                        var dataIndex = 'HorasInhabiles';
                        return SumTime(records, dataIndex);
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return value;
                    }
                },
                {
                    header: 'Dependencia',
                    dataIndex: 'Dependencia',
                    flex: 1
                }
            ],
            renderTo: 'tblHoraEx',
            width: 900,
            height: 457,
            title: 'Horas Extraordinarias - Automotores UNSa',
            frame: true,
            tbar: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Mes',
                    labelWidth: 25,
                    store: stmes,
                    id: 'ddlMes',
                    valueField: 'id',
                    displayField: 'mes',
                    multiSelect: true,
                    value: meses,
                    width: 250,
                    listeners: {
                        change: function (thisCmb, newValue, oldValue) {
                            meses = (Ext.getCmp('ddlMes').getValue()).sort();
                            anio = Ext.getCmp('ddlAnio').rawValue;
                            x_LoadHoraEx(meses, anio, LoadHoraEx_callback);

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
                    value: anio,
                    width: 90,
                    listeners: {
                        change: function (thisCmb, newValue, oldValue) {
                            //meses = (Ext.getCmp('ddlMes').getValue()).sort();
                            anio = Ext.getCmp('ddlAnio').rawValue;
                            x_LoadHoraEx(meses, anio, LoadHoraEx_callback);
                        },
                        beforerender: function (thisCmb, eOpts) {
                        }
                    }


                }/*, {
                    xtype: 'button',
                    text: 'Obtener',
                    iconCls: 'icon-get',
                    handler: function () {
                        meses = (Ext.getCmp('ddlMes').getValue()).sort();
                        anio = Ext.getCmp('ddlAnio').rawValue;
                        x_LoadHoraEx(meses, anio, LoadHoraEx_callback);
                    }
                }*/
                ,
                {
                    text: 'Imprimir',
                    iconCls: 'icon-print',
                    handler: function () {
                        RptMesDep(grid.data);
                        /* var resume = ResumeHeader();
                         Ext.ux.grid.Printer.mainTitle = "";
                         Ext.ux.grid.Printer.headerText = resume[0];
                         Ext.ux.grid.Printer.printLinkText = "Imprimir";
                         Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                         Ext.ux.grid.Printer.printSummary = true;
                         Ext.ux.grid.Printer.columnsHide = resume[1];
                         Ext.ux.grid.Printer.marginExpte = "<br/><br/><br/><br/><br/><br/>";
                         Ext.ux.grid.Printer.printAutomatically = false;
                         Ext.ux.grid.Printer.footerText = resume[2];
                         Ext.ux.grid.Printer.print(grid);*/
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
    catch (e)
    {
        SendJsError(e, "GridPanel - horaexrepch.js", meses);
    }
}
function ResumeHeader()
{
    var header = "<div>Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios</div><br/>";
    try
    {
        var mes = Ext.getCmp('ddlMes').rawValue;
        var anio = Ext.getCmp('ddlAnio').rawValue;
        var colshide = '';

        var title = "<div align='center'><u>HORAS EXTRAORDINARIAS </u></div>";
        var addHeader = "";
        var footer;
        header += title;
        header += "<div>Fecha Emisión: " + (new Date()).f('dd/MM/yyyy') + "<br/> Meses/Año : " + mes + "/" + anio + "</div>";
        header += addHeader;
        return [header, colshide, footer];
    }
    catch (e)
    {
        SendJsError(e, "ResumeHeader - horaexrepch.js", header);
    }
}
function LoadHoraEx_callback(response)
{

    try
    {
        $("#tblHoraEx").html("");
        var data = ObjToArray(response[1]);

        Ext.onReady(function () {
            var win;
            Ext.define('HoraEx', {
                extend: 'Ext.data.Model',
                fields: ['Leg', 'Mes', 'Nombre',
                    {
                        name: 'HorasHabiles',
                        type: 'time'
                    }, {
                        name: 'HorasInhabiles',
                        type: 'time'
                    }, 'Dependencia']
            });
            // create the Data Store
            var store = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                model: 'HoraEx',
                proxy: {
                    type: 'memory'
                },
                data: data,
                sorters: [{
                        property: 'Modelo',
                        direction: 'ASC'
                    }]
            });
            var grid = GridPanel(store);
        });
    }
    catch (e)
    {
        SendJsError(e, "ResumeHeader - horaexrepch.js", response);
    }
}


function SumTime(records, dataIndex)
{
    try {
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
    catch (e)
    {
        SendJsError(e, "SumTime - horaexrepch.js", dataIndex);
    }
}