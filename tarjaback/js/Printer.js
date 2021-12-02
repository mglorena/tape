/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function PrintAnio(data)
{
    Ext.require(['Ext.XTemplate']);


    var anio = Ext.getCmp('ddlAnio').rawValue;
    var columns = [];
    columns.push({'text': "", 'dataIndex': "Mes", 'align': "center", 'headAlign': "top", 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;', 'height': '10px'});
    columns.push({'text': "&nbsp;1", 'dataIndex': "D1", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;', 'height': '10px'});
    columns.push({'text': "&nbsp;2", 'dataIndex': "D2", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "&nbsp;3", 'dataIndex': "D3", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "&nbsp;4", 'dataIndex': "D4", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "&nbsp;5", 'dataIndex': "D5", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "&nbsp;6", 'dataIndex': "D6", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "&nbsp;7", 'dataIndex': "D7", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "&nbsp;8", 'dataIndex': "D8", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "&nbsp;9", 'dataIndex': "D9", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "10", 'dataIndex': "D10", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "11", 'dataIndex': "D11", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "12", 'dataIndex': "D12", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "13", 'dataIndex': "D13", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "14", 'dataIndex': "D14", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "15", 'dataIndex': "D15", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "16", 'dataIndex': "D16", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "17", 'dataIndex': "D17", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "18", 'dataIndex': "D18", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "19", 'dataIndex': "D19", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "20", 'dataIndex': "D20", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "21", 'dataIndex': "D21", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "22", 'dataIndex': "D22", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "23", 'dataIndex': "D23", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "24", 'dataIndex': "D24", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "25", 'dataIndex': "D25", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "26", 'dataIndex': "D26", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "27", 'dataIndex': "D27", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "28", 'dataIndex': "D28", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "29", 'dataIndex': "D29", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "30", 'dataIndex': "D30", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "31", 'dataIndex': "D31", 'align': "center", 'headAlign': "center", 'style': ';width:15px;white-space:nowrap;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Justificada", 'dataIndex': "LJ", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;;font-size:11px;font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Injustificada", 'dataIndex': "LI", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Justificada", 'dataIndex': "Ic", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Injustificada", 'dataIndex': "Ins", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "S/Sueldo", 'dataIndex': "IS", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Apercibimiento", 'dataIndex': "SA", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Suspension", 'dataIndex': "SSu", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Del Agente", 'dataIndex': "E", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Familiar Enfermo", 'dataIndex': "Fe", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Maternidad", 'dataIndex': "Ma", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Accidente Trabajo", 'dataIndex': "Ac", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Largo Tratamiento", 'dataIndex': "LT", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;;font-size:11px;   font-weight: bold;margin-top:90px'});
    columns.push({'text': "Sin Goce Haberes", 'dataIndex': "Ss", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Rendir Examen", 'dataIndex': "Re", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Nacimientos", 'dataIndex': "Na", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Donación Sangre", 'dataIndex': "Ds", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Fall", 'dataIndex': "Fall", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Smi", 'dataIndex': "Smi", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Matrimonio", 'dataIndex': "Ma", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Sin Sueldo", 'dataIndex': "VSs", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    //columns.push({'text': "Acumulado", 'dataIndex': "D31", 'align': "left",'headAlign':"left",'specialClass':'rot-neg-90','style':';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Compensatorio", 'dataIndex': "Cp", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Corresponde", 'dataIndex': "Cor", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Tomadas", 'dataIndex': "V", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});
    columns.push({'text': "Adeudadas", 'dataIndex': "Ade", 'align': "left", 'headAlign': "left", 'specialClass': 'rot-neg-90', 'style': ';white-space:nowrap;font-size:11px;   font-weight: bold;margin-top:90px;'});

    headerTpl = [
        '<tpl for=".">',
        '<td  style="{["height:"]}{height}"><div id="{dataIndex}" class="{specialClass}"  style="{["text-align:"]}{headAlign}{[";height:"]}{height}{style}">{text}</div></td>',
        '</tpl>'
    ];
    bodyTpl = [
        '<tpl for=".">',
        '<tpl if="values.dataIndex">',
        '<td  style="{["text-align:"]}{[Ext.String.createVarName(values.align)]}">\{{[Ext.String.createVarName(values.dataIndex)]}\}</td>',
        '<tpl else>',
        '<td>\{{[Ext.String.createVarName(values.id)]}\}</td>',
        '</tpl>',
        '</tpl>'
    ];

    //use the headerTpl and bodyTpl markups to create the main XTemplate below
    var headings = Ext.create('Ext.XTemplate', this.headerTpl).apply(columns);
    var body = Ext.create('Ext.XTemplate', this.bodyTpl).apply(columns);
    var scriptPath = Ext.Loader.getPath('Ext.ux.grid.Printer');
     var host = scriptPath.substring(0, scriptPath.indexOf('tape'));
    var stylesheetPath = scriptPath.substring(0, scriptPath.indexOf('Printer.js')) + 'gridPrinterCss/print.css';
    //Here because inline styles using CSS, the browser did not show the correct formatting of the data the first time that loaded
    var encabezado = '<div  class="' + Ext.baseCSSPrefix + 'ux-grid-printer-header" style="font-size:26px;">Univerisdad Nacional de Salta<br/>Dirección de Personal</div>' +
            '<div style="text-align:center;font-weight:bold;font-size:26px;"> PLANILLA INDIVIDUAL DE ASISTENCIA ANUAL</div>' +
            '<table width=100%>' +
            '<tr><td style="border:none;text-align:center;font-size:18px;"><u>{Nombre}</u></td><td style="border:none;text-align:center;font-size:18px;"><u>Dirección General de Obras y Servicios</u></td><td  style="border:none;text-align:center;font-size:18px;"><u>{Cat}</u></td><td  style="border:none;text-align:center;font-size:18px;"><u>{Leg}</u></td><td  style="border:none;text-align:center;font-size:18px;"><u>' + anio + '</u></td></tr>' +
            '<tr><td style="border:none;text-align:center;font-weight:bold;">Apellido y Nombre</td><td style="border:none;text-align:center;font-weight:bold;">Dependencia</td><td style="border:none;text-align:center;font-weight:bold;">Clase y Categoria</td><td style="border:none;text-align:center;font-weight:bold;">Legajo</td><td style="border:none;text-align:center;font-weight:bold;">Año</td></tr>' +
            '</table>' +
            '<table>' +
            '<tr>' +
            '<th style="border-bottom:none" rowspan=2>M<br/>E<br/>S</th><th style="text-align:center;font-weight:bold;font-size:16px" colspan=31 rowspan=2>D&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  S</th><th  style="text-align:center" colspan=24>L&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; J&nbsp;&nbsp;&nbsp;&nbsp;U&nbsp;&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;S</th>' +
            '</tr>' +
            '<tr>' +
            '<td  style="text-align:center" colspan=2>Llegada Tarde</td><td  style="text-align:center" colspan=3>Inasistencia</td>' +
            '<td  style="text-align:center" colspan=2>Sanción</td><td   style="text-align:center" colspan=6>Enfermedades</td><td style="text-align:center" colspan=7>Varias</td><td style="text-align:center">C P</td><td style="text-align:center" colspan=3>Vacaiones</td>' +
            '</tr>';
    var footer = '<tr><td colspan=29 rowspan=2 style="height:50px;vertical-align:top"> <b>REFERENCIAS :</b> E) Enfermedad Fe) Familiar Enfermo Ma) Maternidad Ac) Accidente de Trabajo Re) Rendir examen Ca) Casamiento Na) Nacimiento Fa) Fallecimiento familiar Ss) Sin sueldo LAO) Licencia Anual Ordinaria Ri) Receso Invierno Ic) Inasistencia con aviso Is) Inasistencia sin aviso T) Tarde Cm) Comisión' +
            ' Cp) Compesación de horas Ds) Donación de sangre As) Asueto Dp) Licencia Deportiva F) Feriado De) Desinfección Ap) Adhesión paro EN ROJO: S) Suspensión I) Injustificado.</td><td colspan=3 style="font-weight:bold">TOTAL</td>' +
            '<td></td><td></td><td><b>{TIc}</b></td><td><b>{TIns}</b></td><td></td><td></td><td></td><td><b>{TE}</b></td><td><b>{TFe}</b></td><td><b>{TMa}</b></td><td><b>{TAc}</b></td><td><b>{TLT}</b></td><td></td><td><b>{TRe}</b></td><td><b>{TNa}</b></td><td><b>{TDs}</b></td><td></td><td></td><td><b>{TMa}</b></td><td></td><td><b>{TCp}</b></td><td><b>{VDias}</b></td><td><b>{Tom}</b></td><td><b>{TAde}</b></td></tr><tr><td colspan=27 style="height:70px;font-weight:bold;">Observaciones</td></tr>';
    
    var startDate =  new Date(anio,0,1);
    var currentDate = new Date();
    var endDate =  new Date(anio,currentDate.getMonth(),currentDate.getDate()+1);
    habiles = workingDaysBetweenDates(startDate, endDate);
   // footer +="<br/> Dias hábiles:" + habiles  +"<br/>";
    //footer +=" Total Inasistencias: {TotalArts}" ;
    
    
    var htmlMarkup = [
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        '<html class="' + Ext.baseCSSPrefix + 'ux-grid-printer">',
        '<head>',
        '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
        '<link href="' + stylesheetPath + '" rel="stylesheet" type="text/css" />',
        '<script type="text/javascript" src="' + host + 'tape/js/jquery.js?1.2.0"></script>',
        '<title>Planilla de Novedades</title>',
        '</head>',
        '<body class="' + Ext.baseCSSPrefix + 'ux-grid-printer-body">',
        '<div class="' + Ext.baseCSSPrefix + 'ux-grid-printer-noprint ' + Ext.baseCSSPrefix + 'ux-grid-printer-links">',
        '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkprint" href="javascript:void(0);" onclick="window.print();">Imprimir </a>',
        '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkclose" href="javascript:void(0);" onclick="window.close();">Cancel</a>',
        '</div>',
        '<tpl for=".">',
        '<tpl if="Mes == 1">',
        encabezado,
        '<tr>',
        headings,
        '</tr>',
        '</tpl>',
        '<tr id="{[Ext.String.createVarName("Mes") ]}" class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
        body,
        '</tr>',
        '<tpl if="Mes == 12">',
        footer,
        '</table>',
        '<p style="page-break-after: always;"></p>',
        '</tpl>',
        '</tpl>',
        '</table>',
        '<script>window.addEventListener("load", function () {    var rotates = document.getElementsByClassName("rotate");    for (var i = 0; i < rotates.length; i++) {        rotates[i].style.height = rotates[i].offsetWidth + "px";    }});</script>',
        '</body>',
        '</html>'
    ];
    var html = Ext.create('Ext.XTemplate', htmlMarkup).apply(data);
//open up a new printing window, write to it, print it and close
    var win = window.open('', '_blank');
//document must be open and closed
    win.document.open();
    win.document.write(html);
    win.document.close();


}


function PrintMes(data)
{
    Ext.require(['Ext.XTemplate']);

    var mes = Ext.getCmp('ddlMes').rawValue;
    var anio = Ext.getCmp('ddlAnio').rawValue;
    var columns = [];
    columns.push({'text': "Leg", 'dataIndex': "Leg", 'align': "center", 'headAlign': "center", 'width': '30px'});
    columns.push({'text': "Apellido y Nombre", 'dataIndex': "ApellidoNombre", 'align': "left", 'headAlign': "left", 'width': '240px;font-size:9px;'});
    columns.push({'text': "Cargo", 'dataIndex': "Cargo", 'align': "left", 'headAlign': "left", 'width': '70px'});
    columns.push({'text': "&nbsp;1", 'dataIndex': "D1", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "&nbsp;2", 'dataIndex': "D2", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "&nbsp;3", 'dataIndex': "D3", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "&nbsp;4", 'dataIndex': "D4", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "&nbsp;5", 'dataIndex': "D5", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "&nbsp;6", 'dataIndex': "D6", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "&nbsp;7", 'dataIndex': "D7", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "&nbsp;8", 'dataIndex': "D8", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "&nbsp;9", 'dataIndex': "D9", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "10", 'dataIndex': "D10", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "11", 'dataIndex': "D11", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "12", 'dataIndex': "D12", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "13", 'dataIndex': "D13", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "14", 'dataIndex': "D14", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "15", 'dataIndex': "D15", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "16", 'dataIndex': "D16", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "17", 'dataIndex': "D17", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "18", 'dataIndex': "D18", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "19", 'dataIndex': "D19", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "20", 'dataIndex': "D20", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "21", 'dataIndex': "D21", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "22", 'dataIndex': "D22", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "23", 'dataIndex': "D23", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "24", 'dataIndex': "D24", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "25", 'dataIndex': "D25", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "26", 'dataIndex': "D26", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "27", 'dataIndex': "D27", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "28", 'dataIndex': "D28", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "29", 'dataIndex': "D29", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "30", 'dataIndex': "D30", 'align': "center", 'headAlign': "center", 'width': '10px'});
    columns.push({'text': "31", 'dataIndex': "D31", 'align': "center", 'headAlign': "center", 'width': '10px'});


    // console.log("columnas");
    // console.log(columns);
    var pags = Math.round(data.length / 25) + 1;
    //console.log((data.length/25 )+"cantidad de paginas");
    var footer = '<div style="font-size:8px;padding-top:10px"> <b>REFERENCIAS :</b> E) Enfermedad Fe) Familiar Enfermo Ma) Maternidad Ac) Accidente de Trabajo Re) Rendir examen Ca) Casamiento Na) Nacimiento Fa) Fallecimiento familiar Ss) Sin sueldo LAO) Licencia Anual Ordinaria Ri) Receso Invierno Ic) Inasistencia con aviso Is) Inasistencia sin aviso T) Tarde Cm) Comisión' +
            ' Cp) Compesación de horas Ds) Donación de sangre As) Asueto Dp) Licencia Deportiva F) Feriado De) Desinfección Ap) Adhesión paro EN ROJO: S) Suspensión I) Injustificado.</div>';
   
    headerTpl = [
        '<tpl for=".">',
        '<th  style="{["text-align:"]}{headAlign}{[";width:"]}{width}">{text}</th>',
        '</tpl>'
    ];
    bodyTpl = [
        '<tpl for=".">',
        '<tpl if="values.dataIndex">',
        '<td  style="height:10px;{["text-align:"]}{[Ext.String.createVarName(values.align)]}">\{{[Ext.String.createVarName(values.dataIndex)]}\}</td>',
        '<tpl else>',
        '<td>\{{[Ext.String.createVarName(values.id)]}\}</td>',
        '</tpl>',
        '</tpl>'
    ];

    //use the headerTpl and bodyTpl markups to create the main XTemplate below
    var headings = Ext.create('Ext.XTemplate', this.headerTpl).apply(columns);
    // console.log(headings);
    var body = Ext.create('Ext.XTemplate', this.bodyTpl).apply(columns);
    // console.log(body);
    var pluginsBody = '',
            pluginsBodyMarkup = [];

    if (pluginsBody !== '') {
        pluginsBodyMarkup = [
            '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}"><td colspan="' + columns.length + '">',
            pluginsBody,
            '</td></tr>'
        ];
    }
    var scriptPath = Ext.Loader.getPath('Ext.ux.grid.Printer');
    var stylesheetPath = scriptPath.substring(0, scriptPath.indexOf('Printer.js')) + 'gridPrinterCss/print.css';
    //Here because inline styles using CSS, the browser did not show the correct formatting of the data the first time that loaded
    var htmlMarkup = [
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        '<html class="' + Ext.baseCSSPrefix + 'ux-grid-printer">',
        '<head>',
        '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
        '<link href="' + stylesheetPath + '" rel="stylesheet" type="text/css" />',
        '<title>Planilla de Novedades</title>',
        '</head>',
        '<body class="' + Ext.baseCSSPrefix + 'ux-grid-printer-body">',
        '<div class="' + Ext.baseCSSPrefix + 'ux-grid-printer-noprint ' + Ext.baseCSSPrefix + 'ux-grid-printer-links">',
        '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkprint" href="javascript:void(0);" onclick="window.print();">Imprimir </a>',
        '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkclose" href="javascript:void(0);" onclick="window.close();">Cancel</a>',
        '</div>',
        '<div style="text-align:right;width:100%;font-weight:bold">Pagina 1 de ' + pags + '</div>',
        '<div class="' + Ext.baseCSSPrefix + 'ux-grid-printer-header">Univerisdad Nacional de Salta<br/>Dependencia: Direccón General de Obras y Servicios</div>',
        '<div  style="font-size:16px;font-weight:bold;">Control de Asistencia y Puntualidad del Mes de ' + mes + ' de ' + anio + '<br/></div>',
        '<table cellpadding=0 cellspacing=0 style="font-size:8px">',
        '<tr>',
        '<th>Nº</th>',
        headings,
        '</tr>',
        '<tpl for=".">',
        '{% if (xindex % 25 === 0) { %}',
        '</table>',
        footer,
        '<p style="page-break-after: always;"></p>',
        '<div style="text-align:right;width:100%;font-weight:bold">Pagina {[(xindex / 25) +1]}  de ' + pags + '</div>',
        '<div class="' + Ext.baseCSSPrefix + 'ux-grid-printer-header">Univerisdad Nacional de Salta<br/>Dependencia: Direccón General de Obras y Servicios</div>',
        '<div c  style="font-size:16px;font-weight:bold;">Control de Asistencia y Puntualidad del Mes de ' + mes + ' de ' + anio + '<br/></div>',
        '<table  cellpadding=0 cellspacing=0 style="font-size:9px">',
        '<tr>',
        '<th>Nº</th>',
        headings,
        '</tr>',
        '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
        '<td style="width:5px">{[xindex]}</td>',
        body,
        '</tr>',
        pluginsBodyMarkup.join(''),
        '{% } else { %}',
        '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
        '<td style="width:5px">{[xindex]}</td>',
        body,
        '</tr>',
        pluginsBodyMarkup.join(''),
        '{% } %}',
        '</tpl>',
        '</table>',
        footer,
        '</body>',
        '</html>'
    ];
    var html = Ext.create('Ext.XTemplate', htmlMarkup).apply(data);
//open up a new printing window, write to it, print it and close
    var win = window.open('', '_blanck');
//document must be open and closed
    win.document.open();
    win.document.write(html);
    win.document.close();

}