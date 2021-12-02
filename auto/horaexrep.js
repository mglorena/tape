/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/****************/
var date = new Date();
var mes = date.getMonth() + 1;
var anio = date.getFullYear();
var CurrentObject, choferId = 0, depId = 0, desde = null, hasta = null;
x_LoadHoraEx(desde, hasta, mes, anio, choferId, depId, LoadHoraEx_callback);
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

function GridPanel(store)
{
    try
    {
        var meses = [[1, 'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'], [5, 'Mayo'], [6, 'Junio'], [7, 'Julio'], [8, 'Agosto'], [9, 'Septiembre'], [10, 'Octubre'], [11, 'Noviembre'], [12, 'Diciembre']];
        var stmes = new Ext.data.ArrayStore({
            fields: ['id', 'mes'],
            data: meses
        });

        var anios = [[2020, '2020'], [2021, '2021'], [2022, '2022'], [2023, '2023']];
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
                },
                {
                    header: 'Horario Habitual',
                    dataIndex: 'Laboral',
                    flex: 1
                }
                ,
                {
                    header: 'Hs. Hábiles',
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
                    header: 'Hs. Inhabiles',
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
                    header: 'Jornada',
                    dataIndex: 'Jornada',
                    flex: 1
                }
            ],
            renderTo: 'tblHoraEx',
            width: 900,
            height: 457,
            title: 'Horas Extraordinarias - Automotores UNSa',
            frame: true,
            tbar: [{
                    xtype: 'datefield',
                    fieldLabel: '',
                    id: 'txtDesde',
                    mode: 'local',
                    submitFormat: 'YYYY-mm-dd H:i:m',
                    value: desde,
                    width: 85,
                    listeners: {
                        blur: function(txt, record, idx) {
                            desde = txt.value;
                            if (desde && hasta)
                            {
                                if (hasta instanceof Date)
                                    hasta = hasta.f("yyyy-MM-dd");
                                desde = desde.f("yyyy-MM-dd");
                                x_LoadHoraEx(desde, hasta, mes, anio, choferId, depId, LoadHoraEx_callback);
                            }

                        },
                        'change': function(txt, record, idx) {
                            desde = txt.value;
                            if (desde && hasta)
                            {
                                if (hasta instanceof Date)
                                    hasta = hasta.f("yyyy-MM-dd");
                                desde = desde.f("yyyy-MM-dd");
                                x_LoadHoraEx(desde, hasta, mes, anio, choferId, depId, LoadHoraEx_callback);
                            }
                        }
                    }

                }, 'a', {
                    xtype: 'datefield',
                    fieldLabel: '',
                    id: 'txtHasta',
                    mode: 'local',
                    submitFormat: 'YYYY-mm-dd H:i:m',
                    value: hasta,
                    width: 85,
                    listeners: {
                        blur: function(txt, record, idx) {
                            hasta = txt.value;
                            if (hasta && desde)
                            {
                                hasta = hasta.f("yyyy-MM-dd");
                                if (desde instanceof Date)
                                    desde = desde.f("yyyy-MM-dd");
                                x_LoadHoraEx(desde, hasta, mes, anio, choferId, depId, LoadHoraEx_callback);
                            }

                        },
                        'change': function(txt, record, idx) {
                            hasta = txt.value;
                            if (hasta && desde)
                            {
                                hasta = hasta.f("yyyy-MM-dd");
                                if (desde instanceof Date)
                                    desde = desde.f("yyyy-MM-dd");
                                x_LoadHoraEx(desde, hasta, mes, anio, choferId, depId, LoadHoraEx_callback);
                            }
                        }
                    }

                },
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
                    value: mes,
                    width: 90,
                    emptyText: '......',
                    listeners: {
                        'select': function(combo, record, idx) {
                            mes = combo.value;
                            x_LoadHoraEx(desde, hasta, mes, anio, choferId, depId, LoadHoraEx_callback);
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
                    emptyText: '......',
                    listeners: {
                        'select': function(combo, record, idx) {
                            anio = combo.value;
                            x_LoadHoraEx(desde, hasta, mes, anio, choferId, depId, LoadHoraEx_callback);
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
                    mode: 'local',
                    width: 200,
                    emptyText: '......',
                    listeners: {
                        'select': function(combo, record, idx) {
                            choferId = combo.value;
                            x_LoadHoraEx(desde, hasta, mes, anio, choferId, depId, LoadHoraEx_callback);
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
                    width: 220,
                    emptyText: '......',
                    listeners: {
                        'select': function(combo, record, idx) {
                            depId = combo.value;
                            x_LoadHoraEx(desde, hasta, mes, anio, choferId, depId, LoadHoraEx_callback);
                        }
                    }
                },
                {
                    text: 'Imprimir',
                    iconCls: 'icon-print',
                    handler: function() {
                        var resume = ResumeHeader();
                        Ext.ux.grid.Printer.mainTitle = "";
                        Ext.ux.grid.Printer.headerText = resume[0];
                        Ext.ux.grid.Printer.printLinkText = "Imprimir";
                        Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                        Ext.ux.grid.Printer.printSummary = true;
                        Ext.ux.grid.Printer.columnsHide = resume[1];
                        Ext.ux.grid.Printer.marginExpte = "<br/><br/><br/><br/><br/><br/>";
                        Ext.ux.grid.Printer.printAutomatically = false;
                        Ext.ux.grid.Printer.footerText = resume[2];
                        Ext.ux.grid.Printer.print(grid);
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
        SendJsError(e, "GridPanelF - horaex.js", meses);
    }
}

function ResumeHeader()
{
    var header = "<div>Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios</div><br/>";
    try
    {
        var chText = Ext.getCmp('ddlChoferes').rawValue;
        var depText = Ext.getCmp('ddlDependencias').rawValue;
        var mes = Ext.getCmp('ddlMes').rawValue;
        var anio = Ext.getCmp('ddlAnio').rawValue;
        var colshide = '';

        var title = "<div align='center'><u>HORAS EXTRAORDINARIAS </u></div>";
        var addHeader = "";
        var footer;
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
            footer = "<br/><br/><br/><div style='top:600;left:0'><table cellpadding='2' cellspacing='2' style='border-width:0px;'>" +
                    "<tr  style='border-width:0px;'><td  style='border-width:0px;'>--------------------</td><td  style='border-width:0px;'>----------------------------</td></tr>" +
                    "<tr  style='border-width:0px;'><td  style='border-width:0px;'>Firma del Agente<br/>"+ chText +"</td><td  style='border-width:0px;'>Firma del Jefe Inmediato</td></tr></table></div>";

        }
        if (depText === "Todas" && chText !== "Todos")
        {
            title = "<div align='center'><u>HORAS EXTRAORDINARIAS </u>: " + chText + "</div>";
            addHeader += "<div>Apellido y Nombre : " + chText + "</div>";
            addHeader += "<div>Cargo: Chofer</div>";
            colshide = '4';
            footer = "<br/><br/><br/><div style='top:600;left:0'><table cellpadding='2' cellspacing='2' style='border-width:0px;'>" +
                    "<tr  style='border-width:0px;'><td  style='border-width:0px;'>--------------------</td><td  style='border-width:0px;'>----------------------------</td></tr>" +
                    "<tr  style='border-width:0px;'><td  style='border-width:0px;'>Firma del Agente<br/>"+ chText +"</td><td  style='border-width:0px;'>Firma del Jefe Inmediato</td></tr></table></div>";
        }
        header += title;
        header += "<div>Fecha Emisión: " + (new Date()).f('dd/MM/yyyy') + "<br/> Mes/Año : " + mes + "/" + anio + "</div>";
        header += addHeader;
        return [header, colshide, footer];
    }
    catch (e)
    {
        SendJsError(e, "ResumeHeader - horaexrep.js", header);
    }
}

function LoadHoraEx_callback(response)
{
    try
    {
        $("#tblHoraEx").html("");
        var data = ObjToArray(response[1]);
        deps = ObjToArray(response[2]);
        ch = ObjToArray(response[3]);
        ve = ObjToArray(response[4]);
        Ext.onReady(function() {
            Ext.define('HoraEx', {
                extend: 'Ext.data.Model',
                fields: ['HoraExId', 'ChoferId', 'Interrupciones',
                    {
                        name: 'Hora100',
                        type: 'time'
                    }, {
                        name: 'Hora50',
                        type: 'time'
                    }, 'Responsable', 'Dependencia', 'TTEntrada', 'TTSalida', 'TMEntrada', 'TMSalida',
                    'Fecha', 'FechaG', 'Entrada', 'Salida', 'Horario', 'Concepto', 'Calculado', 'DescansosId', 'Zona', 'TotalHoras', 'DependenciaId', 'Create', 'Modified', 'VehiculoId', 'ChoferName', 'Laboral', 'Jornada']
            });
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
            var grid = GridPanel(store, ch, deps);
        });
    }
    catch (e)
    {
        SendJsError(e, "LoadHoraEx_callback - horaexrep.js", response);
    }
}


function SumTime(records, dataIndex)
{
    try
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
    catch (e)
    {
        SendJsError(e, "SumTime - horaexrep.js", dataIndex);
    }
}