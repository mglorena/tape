/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/****************/
var CurrentObject;
var interno = null;
var date = new Date();
var mes = date.getMonth();
var anio = date.getFullYear();
var mesNom = date.toLocaleString();
var filtroId = 1;
mes = mes;
var centroId = 0;
var centroNom = "";
var depto = 0;
x_LoadEmeralds(interno, mes, anio, centroId, depto, filtroId, LoadEmeralds_callback);
var deptos;

var centros;

var grid, ridx, ac, ve, ch;

function GridPanel(store)
{
    // create the grid and specify what field you want
    // to use for the editor at each column.
    var anios = [[2012, '2012'], [2013, '2013'], [2014, '2014'], [2015, '2015'], [2016, '2016'], [2017, '2017'], [2018, '2018']];

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
    deptos.push(a);

    var stdeptos = new Ext.data.ArrayStore({
        fields: ['id_depto', 'NombreCompleto'],
        data: deptos
    });
    centros.push(a);
    var stcentros = new Ext.data.ArrayStore({
        fields: ['id_centro', 'nombre'],
        data: centros
    });
    Ext.tip.QuickTipManager.init();
    var win;
    var scrollFiltro = Ext.create('Ext.menu.Menu');
    scrollFiltro.add({icon: '../images/icons/preview.png', text: 'Por Centro de Costo', stateId: 1, handler: oFilterClick});
    //  scrollFiltro.add({icon: 'preview.png', text: 'Por Departamento', stateId: '2', handler: oFilterClick});
    // scrollFiltro.add({icon: 'preview.png', text: 'Por Interno', stateId: '3', handler: oFilterClick});
    scrollFiltro.add({icon: '../images/icons/preview.png', text: 'Para Cobro', stateId: 4, handler: oFilterClick});
    var menuFiltro = {text: 'Resumen', iconCls: 'bmenu', menu: scrollFiltro};

    var scrollDep = Ext.create('Ext.menu.Menu');
    for (var i = 0; i < deptos.length; ++i) {
        scrollDep.add({
            icon: '../images/icons/preview.png',
            text: deptos[i]['NombreCompleto'],
            stateId: deptos[i]['id_depto'],
            handler: oFilterDepClick
        });
    }
    var menudep = {text: 'Dependencia', iconCls: 'bmenu', menu: scrollDep};

    var scrollCentro = Ext.create('Ext.menu.Menu');
    for (var i = 0; i < centros.length; ++i) {
        scrollCentro.add({
            icon: '../images/icons/preview.png',
            text: centros[i]['nombre'],
            stateId: centros[i]['id_centro'],
            handler: oFilterCenClick
        });
    }
    var menucen = {text: 'Centro de Costo', menu: scrollCentro};
    grid = Ext.create('Ext.grid.Panel', {
        store: store,
        features: [{
                ftype: 'summary',
                id: 'summary'
            }],
        columns: [{
                header: 'Usuario',
                dataIndex: 'Centro',
                width: 250,
                hidden: (filtroId === 0 ? true : false),
                align: 'left',
                summaryType: function (records)
                {
                    return "<b>TOTALES</b>";
                }
            },
            {
                header: 'Departamento',
                dataIndex: 'Dep',
                flex: 1,
                hidden: true,
                align: 'left',
            },
            {
                header: 'Interno',
                dataIndex: 'Interno',
                //flex: 3,
                hidden: (filtroId === 0 ? false : true),
                align: 'center',
                width: 40
            },
            {
                header: 'Usuario',
                dataIndex: 'Usuario',
                hidden: (filtroId === 0 ? false : true),
                width: 250,
                align: 'left',
                summaryType: function (records)
                {
                    return "<b>TOTALES</b>";
                }
            },
            {
                header: 'Comun',
                dataIndex: 'Comun',
                hidden: (filtroId === 4 ? false : true),
                width: 50,
                align: 'right',
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' Comun)' : '(1 Comun)');
                }
            },
            {
                header: 'Jefe-Sec',
                dataIndex: 'JefeSec',
                hidden: (filtroId === 4 ? false : true),
                flex: 1,
                align: 'right',
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' Jefe Sec)' : '(1 Jefe Sec)');
                }
            },
            {
                header: 'Sin DDE',
                dataIndex: 'SinDDE',
                hidden: (filtroId === 4 ? false : true),
                flex: 1,
                align: 'right',
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' Sin DDE)' : '(1 Sin DDE)');
                }
            },
            {
                header: 'Voz/Datos',
                dataIndex: 'VozDatos',
                hidden: (filtroId === 4 ? false : true),
                flex: 1,
                align: 'right',
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' Voz / Datos)' : '(1 Voz /Datos)');
                }
            },
            {
                header: 'PIN Fic.',
                dataIndex: 'PINFic',
                hidden: (filtroId === 4 ? false : true),
                align: 'right',
                flex: 1,
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' PIN Ficticio)' : '(1 PIN Ficticio)');
                }
            },
            {
                header: 'Cargo Con.',
                dataIndex: 'CargoCon',
                hidden: (filtroId === 4 ? false : true),
                flex: 1,
                align: 'right',
                renderer: 'usMoney',
                summaryType: function (records) {
                    var dataIndex = 'CargoCon';
                    return SumTotal(records, dataIndex);
                },
                summaryRenderer: Ext.util.Format.usMoney
            },
            {
                header: 'Abono Comun',
                dataIndex: 'Abono',
                width: 50,
                hidden: (filtroId === 0 ? true : false),
                align: 'right',
                renderer: 'usMoney',
                summaryType: function (records) {
                    var dataIndex = 'Abono';
                    return SumTotal(records, dataIndex);
                },
                summaryRenderer: Ext.util.Format.usMoney
            },
            {
                header: 'Tiempo',
                dataIndex: 'Tiempo',
                hidden: (filtroId === 4 ? true : false),
                width: 50,
                align: 'center',
                summaryType: function (records) {
                    var dataIndex = 'Tiempo';
                    return SumTime(records, dataIndex);
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return value;
                }
            },
            {
                header: 'Llamadas',
                dataIndex: 'CantLlam',
                align: 'center',
                summaryType: 'sum',
                width: 50,
                renderer: 'numberfield',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return value + ' llamadas';
                },
                field: {
                    xtype: 'numberfield'
                }

            },
            {
                header: 'Pesos',
                dataIndex: 'Costo',
                align: 'right',
                renderer: 'usMoney',
                summaryType: function (records) {
                    var dataIndex = 'Costo';
                    return SumTotal(records, dataIndex);
                },
                summaryRenderer: Ext.util.Format.usMoney
            },
            {
                header: 'Credito',
                dataIndex: 'Credito',
                align: 'right',
                hidden: (filtroId === 0 ? true : false),
                renderer: 'usMoney',
                summaryType: function (records) {
                    var dataIndex = 'Credito';
                    return SumTotal(records, dataIndex);
                },
                summaryRenderer: Ext.util.Format.usMoney

            },
            {
                header: 'Periodo',
                dataIndex: 'Periodo',
                align: 'right',
                hidden: (filtroId === 0 ? true : false),
                renderer: 'usMoney',
                summaryType: function (records) {
                    var dataIndex = 'Periodo';
                    return SumTotal(records, dataIndex);
                },
                summaryRenderer: Ext.util.Format.usMoney

            },
            {
                header: 'Total a Pagar',
                dataIndex: 'Total',
                hidden: (filtroId === 0 ? true : false),
                align: 'right',
                renderer: 'usMoney',
                summaryType: function (records) {
                    var dataIndex = 'Total';
                    return SumTotal(records, dataIndex);
                },
                summaryRenderer: Ext.util.Format.usMoney

            },
            {
                header: 'Paga',
                dataIndex: 'Paga',
                align: 'center'

            }, {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                header: 'Acciones',
                hidden: (filtroId === 0 ? false : true),
                align: 'center',
                width: 90,
                items: [{
                        icon: '../images/icons/fam/file.gif',
                        tooltip: 'Imprimir Detalle',
                        align: 'center',
                        altText: 'Imprimir Detalle',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.store.getAt(rowIndex);
                            var ints = (record ? record.data['Interno'] : null);
                            x_ImprimirDetalle(mes, anio, ints, ImprimirDetalle_callback);

                        }
                    }]
            }
        ],
        renderTo: 'tblEmeralds',
        width: 900,
        height: 457,
        //stripeRows: true,
        title: 'Emeralds - DGOyS UNSa',
        frame: true,
        tbar: [menuFiltro, '-', menudep, '-', menucen, '-', {
                xtype: 'textfield',
                fieldLabel: 'Interno',
                labelWidth: 40,
                id: 'txtInterno',
                mode: 'local',
                value: interno,
                width: 125,
                listeners: {
                    blur: function (txt, record, idx) {
                        interno = txt.value;
                        filtroId = 0;
                        if (interno === "")
                            interno = 0;
                        if (interno)
                            x_LoadEmeralds(interno, mes, anio, centroId, depto, filtroId, LoadEmeralds_callback);
                    },
                    specialkey: function (txt, e) {
                        if (e.getKey() === e.ENTER) {
                            interno = txt.value;
                            filtroId = 0;
                            if (interno === "")
                                interno = 0;
                            if (interno)
                                x_LoadEmeralds(interno, mes, anio, centroId, depto, filtroId, LoadEmeralds_callback);
                        }
                    }
                }

            }, '-'
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
                            'select': function (combo, record, idx) {
                                mes = combo.value;
                                //console.log("mes " + mes +" interno :" + interno);
                                x_LoadEmeralds(interno, mes, anio, centroId, depto, filtroId, LoadEmeralds_callback);
                            }
                        }

                    }, '-'
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
                            'select': function (combo, record, idx) {
                                anio = combo.value;
                                x_LoadEmeralds(interno, mes, anio, centroId, depto, filtroId, LoadEmeralds_callback);
                            }
                        }

                    }, '-',
            {
                text: 'Imprimir',
                iconCls: 'icon-print',
                handler: function () {
                    var resume = ResumeHeader();
                    Ext.ux.grid.PrinterEmerald.mainTitle = "";
                    Ext.ux.grid.PrinterEmerald.headerText = resume[0];
                    Ext.ux.grid.PrinterEmerald.printLinkText = "Imprimir";
                    Ext.ux.grid.PrinterEmerald.closeLinkText = "Cerrar";
                    Ext.ux.grid.PrinterEmerald.printSummary = true;
                    Ext.ux.grid.PrinterEmerald.columnsHide = resume[1];
                    Ext.ux.grid.PrinterEmerald.marginExpte = "";
                    Ext.ux.grid.PrinterEmerald.printAutomatically = false;
                    Ext.ux.grid.PrinterEmerald.footerText = resume[2];
                    Ext.ux.grid.PrinterEmerald.print(grid);
                }
            }, '-',
            {
                text: 'Imprimir Facturas',
                iconCls: 'icon-print',
                handler: function () {
                    var resume = ResumeHeader();
                    Ext.ux.grid.PrinterEmeraldFact.mainTitle = "";
                    Ext.ux.grid.PrinterEmeraldFact.headerText = resume[0];
                    Ext.ux.grid.PrinterEmeraldFact.printLinkText = "Imprimir";
                    Ext.ux.grid.PrinterEmeraldFact.closeLinkText = "Cerrar";
                    Ext.ux.grid.PrinterEmeraldFact.printSummary = false;
                    Ext.ux.grid.PrinterEmeraldFact.columnsHide = resume[1];
                    Ext.ux.grid.PrinterEmeraldFact.marginExpte = "";
                    Ext.ux.grid.PrinterEmeraldFact.printAutomatically = false;
                    Ext.ux.grid.PrinterEmeraldFact.footerText = resume[2];
                    Ext.ux.grid.PrinterEmeraldFact.print(grid);
                }
            }
        ]
    });

    return grid;
}
function ImprimirDetalle_callback(response) {
    try
    {
        Ext.create('Ext.Window', {
            title: 'Archivos - Detalle de llamadas',
            width: 200,
            height: 200,
            //x: 10,
            //y: 200,
            //plain: true,
            // headerPosition: 'left',
            layout: 'fit',
            defaults: {
                //padding : 10,
                //width : 300,
                border: 0,
                cellCls: 'verticalAlignTop'
            },
            items: {
                border: 0,
                xtype: "form",
                frame: true,
                defaultType: "textfield",
                overflowY: 'auto', items: [{
                        xtype: 'displayfield',
                        fieldLabel: '',
                        name: 'Link',
                        value: response[1],
                        editable: false
                    }]
            }
        }).show();

//        getId("tdDetalle").innerHTML = ;

    }
    catch (e)
    {
        SendJsError(e, "index.js", response);
    }
}
function ResumeHeader()
{
    var ABONO_SINDDE = 9.6;
    var ABONO_COMUN = 148.00;
    var ABONO_PINFIC = 148.00;
    var ABONO_VOZDATOS = 148;
    var ABONO_JEFESEC = 22;
    var colshide = '';
    var title = "<div align='left'><b><u>TELEFONIA </u></b></div>";

    var d = new Date(anio, mes, 1, 0, 0);

    var v1 = new Date(date.getUTCFullYear(), parseInt(date.getMonth() + 1), parseInt(7 + date.getDate()), 0, 0);
    var v2 = new Date(date.getUTCFullYear(), parseInt(date.getMonth() + 1), parseInt(14 + date.getDate()), 0, 0);




    //header = "<div style='border:solid 1px black;font-size:16px;'> <br/>Universidad Nacional de Salta <br/>Dirección General de Obras y Servicios - TELEFONÍA</div>";
    var mesNom = new Date(date.getUTCFullYear(), parseInt(date.getMonth() - 1), 1);






    /*if (centroId === 0 || centroId === null) {*/
    if (centroId !== 0 && centroId !== null)
    {
        header = "<div style='border:solid 1px black;font-size:16px;'>Universidad Nacional de Salta <br/>Dirección General de Obras y Servicios - TELEFONÍA - " + centroNom + "<p></p></div>";
    }
    else
    {
        header = "<div style='border:solid 1px black;font-size:16px;'> <br/>Universidad Nacional de Salta <br/>Dirección General de Obras y Servicios - TELEFONÍA</div>";
    }
    header += "<div style='clear:both;'></div>";
    header += "<div style='border-top:solid 0px black;border-left:solid 1px black;border-right:solid 1px black;font-size:10px;'>";
    header += "<div class='efact'>Fecha: " + date.getDate() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getUTCFullYear() + "   </div>";
    if (centroId === 0 || centroId === null) {
        header += "<div class='efact'> Periodo: " + "01/" + mes + "/" + anio + " a " + d.getDaysInMonth() + "/" + mes + "/" + anio + "   </div>";
        header += "<div class='efact'> 1º Venc.: " + +v1.getDate() + "/" + v1.getMonth() + "/" + anio + "  </div>";
        header += "<div class='efact'> 2º Venc.: " + v2.getDate() + "/" + v2.getMonth() + "/" + anio + "  </div>";
        header += "<div style='clear:both;'></div>";
        header += "<div class='efact'>Recon. Serv.: $ 22,50</div>";
        header += "<div class='efact'>Valor Pulso: $ 0,55</div>";
        header += "<div class='efact'>Reconexión. PIN-FIC: $ 5,0</div>";
        header += "<div class='efact'>Recargo 2º Venc.: 1,6 %</div>";
        header += "<div style='clear:both;'></div>";
        header += "<div class='efact'>Cargo p/Conex.: $ 151,30</div>";
        /*header += "<div class='efact'>Abono comun s/DDE: $ 9,60</div>";*/
        header += "<div class='efact'>Abono comun: $ 26,00</div>";
        /*header += "<div class='efact'>Abono Jefe-Sec: $ 22,00</div>";*/
        
        /*header += "<div class='efact'>Cargo p/Conex. s/DDE: $ 90,40</div>";*/
        /*header += "<div class='efact'>Abono voz y datos: $ 32,00</div>";*/
        header += "<div class='efact'>Abono PIN-Fic: $ 15.00</div>";
header += "<div style='clear:both;'></div>";
        header += "<div class='efact'>&nbsp;</div>";
         header += "<div style='clear:both;' class='efact'></div>";
    }
    else
    {
        header += "<div> Periodo: " + "01/" + mes + "/" + anio + " a " + d.getDaysInMonth() + "/" + mes + "/" + anio + "   </div>";
    }
    header += "<div  style='clear:both;border:1px;font-size:9px;padding:0px;margin:0px;'>EL PAGO SE DEBERA REALIZAR EN LA OFICINA DE LA DIRECCION GRAL. DE OBRAS Y SERVICIOS. PRODUCIDO EL 2° VENCIMIENTO SE PRODECERA AL CORTE DEL SERVICIO.    </div>";
    header += "</div>";
    /*  }
     else
     {
     header += "<div style='border-left:solid 1px black; border-right:solid 1px black;padding:3px;font-size:16px;'>Fecha de Emisión: " + date.getDate() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getUTCFullYear() + "   </div>";
     header += "<div style='border-left:solid 1px black; border-right:solid 1px black;padding:3px;font-size:16px;'>Centro de Costo: " + centroNom + "   </div>";
     }*/
    var mesNom = Ext.getCmp('ddlMes').rawValue;
    header += "<div style='clear:both;'></div>";
    header += "<div  style='padding-left:30px;border:solid 1px black;border-bottom:none;font-size:14px;text-transform:uppercase;'>" + mesNom + "</div>";



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
        if (record === "" || record === null || record === "undefined")
            record = 0;
        total += parseFloat(record);
    }
    total = total.toFixed(2);
    return total;

}
function oFilterDepClick(item) {
    if (typeof (item.stateId) !== "undefined")
    {
        depto = item.stateId;
        filtroId = 0;

        x_LoadEmeralds(interno, mes, anio, centroId, depto, filtroId, LoadEmeralds_callback);
    }
}
function oFilterCenClick(item) {
    if (typeof (item.stateId) !== "undefined")
    {
        centroId = item.stateId;
        centroNom = item.text;

        filtroId = 0;
        interno = 0;
        x_LoadEmeralds(interno, mes, anio, centroId, depto, filtroId, LoadEmeralds_callback);
    }
}
function oFilterClick(item) {
    if (typeof (item.stateId) !== "undefined")
    {
        filtroId = item.stateId;
        /*  centroId = 0;
         depto = 0;
         interno = null;*/
        columns = [];
        x_LoadEmeralds(interno, mes, anio, centroId, depto, filtroId, LoadEmeralds_callback);
    }
}
function LoadEmeralds_callback(response)
{
    $("#tblEmeralds").html("");
    var data = ObjToArray(response[1]);
    centros = ObjToArray(response[2]);
    deptos = ObjToArray(response[3]);

    Ext.onReady(function () {
        // Define our data model
        var win;
        Ext.define('Emerald', {
            extend: 'Ext.data.Model',
            fields: ['Centro', 'Dep', 'Interno', 'Usuario', 'Comun', 'JefeSec', 'SinDDE', 'VozDatos', 'PINFic', 'CargoCon',
                'Abono', {name: 'Tiempo', type: 'time'}, {
                    name: 'CantLlam',
                    type: 'number',
                    align: 'center'
                }, 'Costo', 'Credito', 'Periodo', 'Total', 'Paga']
        });


        // create the Data Store
        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            pageSize: 10,
            remoteSort: true,
            model: 'Emerald',
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
        var grid = GridPanel(store);
    });

}
function SumTime(records, dataIndex)
{
    var length = records.length,
            totalH = 0, totalM = 0, totalS = 0,
            record;
    var h, m, s;
    for (i = 0; i < length; ++i) {
        record = records[i].get(dataIndex).split(":");

        if (record[0])
        {
            h = parseInt(record[0]);
            m = parseInt(record[1]);
            s = parseInt(record[2]);
            totalH += h;
            totalM += m;
            totalS += s;
        }
    }
    var e = new Date();
    var tm = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), 0, totalM, totalS);
    var total = (totalH + tm.getHours()) + " h " + tm.f('mm') + " m " + tm.f('ss') + ' s';
    return total;

}