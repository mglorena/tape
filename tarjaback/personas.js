var date = new Date();
var mes = date.getMonth();
var anio = date.getFullYear();
var mesNom = date.toLocaleString();
mes = mes + 1;
var personaId = null;
var art, arts;
var info;


$(function () {
    x_LoadCalendar(personaId, mes, anio, LoadCalendar_callback);
});
function LoadCalendar_callback(response)
{
    try
    {
        Ext.onReady(function () {
            $("#panel").html("");

            var emp = ObjToArray(response[1]);
            var b = [0, 'Todos'];

            var emp = emp.slice();
            emp.push(b);
            var stemp = new Ext.data.ArrayStore({
                fields: ['PersonaId', 'Nombre'],
                data: emp
            });

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

// ComboBox with multiple selection enabled
            var panel0 = Ext.create('widget.panel', {
                width: 900,
                height: 400,
                title: 'Novedades de Empleados PAU - DGOyS ',
                renderTo: 'panel',
                autoScroll: false,
                columns: 2,
                bodyStyle: "background-color:#F7F9FC",
                padding: 0,
                margin: 0

            });
            var cmbMes = Ext.create('Ext.form.field.ComboBox', {
                fieldLabel: 'Mes',
                //renderTo: 'multiSelectCombo',
                //multiSelect: true,
                id: 'ddlMes',
                valueField: 'id',
                displayField: 'mes',
                width: 120,
                labelWidth: 30,
                store: stmes,
                queryMode: 'local',
                value: mes,
                listeners: {
                    'select': function (combo, record, idx) {
                        mes = combo.value;
                        x_LoadCalendar(personaId, mes, anio, LoadCalendar_callback);
                    }
                }
            });

            loading = new Ext.LoadMask(panel0, {msg: "Por favor espere ..."});
            var cmbEmp = Ext.create('Ext.form.field.ComboBox', {
                fieldLabel: 'Empleado',
                id: 'ddlEmpleado',
                valueField: 'PersonaId',
                displayField: 'Nombre',
                width: 320,
                labelWidth: 70,
                store: stemp,
                queryMode: 'local',
                value: personaId,
                listeners: {
                    'select': function (combo, record, idx) {
                        personaId = combo.value;
                        x_LoadCalendar(personaId, mes, anio, LoadCalendar_callback);
                    }
                }
            });
            var tb = Ext.create('Ext.toolbar.Toolbar',
                    {items: [cmbMes, '-',
                            {
                                xtype: 'combo',
                                fieldLabel: 'Año',
                                labelWidth: 30,
                                store: stanio,
                                id: 'ddlAnio',
                                valueField: 'id',
                                displayField: 'anio',
                                // typeAhead: true,
                                mode: 'local',
                                //forceSelection: true,
                                value: anio,
                                width: 120,
                                emptyText: '......',
                                listeners: {
                                    'select': function (combo, record, idx) {
                                        anio = combo.value;
                                        x_LoadCalendar(personaId, mes, anio, LoadCalendar_callback);
                                    }
                                }

                            }, '-', cmbEmp, '-',
                            {
                                text: 'Impresion Mensual',
                                iconCls: 'icon-print',
                                handler: function () {
                                    loading.show();
                                    PrintMensual(mes, anio);

                                }
                            }, '-',
                            {
                                text: 'Impresion Anual',
                                iconCls: 'icon-print',
                                handler: function () {


                                    loading.show();
                                    PrintAnual(anio, personaId);
                                }
                            }, ,
                                    {
                                        text: 'Reporte',
                                        iconCls: 'icon-print',
                                        handler: function () {
                                            if (personaId) {
                                                loading.show();
                                                PrintAnual(anio, personaId);
                                            } else
                                            {
                                                humane.error("Debe seleccionar una persona.");
                                            }

                                        }
                                    }]
                    });

            var tb1 = Ext.create('Ext.toolbar.Toolbar',
                    {items: [
                            {
                                text: 'Editar',
                                id: 'btnEditar',
                                iconCls: 'icon-edit',
                                disabled: true,
                                handler: function () {

                                    EditPerson();

                                }
                            }, {
                                text: 'Reporte Horas',
                                id: 'btnReporteHoras',
                                iconCls: 'icon-list',
                                disabled: true,
                                handler: function () {

                                    ReporteHoras();

                                }
                            }, {
                                text: 'Compensatorio',
                                id: 'btnCompensatorio',
                                iconCls: 'icon-list',
                                disabled: true,
                                handler: function () {
                                    if (personaId) {
                                        PopinCompensatorio();
                                    }

                                }
                            }/*, {
                             text: 'LAO',
                             id: 'btnLAO',
                             iconCls: 'icon-list',
                             disabled: true,
                             handler: function () {
                             if (personaId) {
                             PopinHistoryLic();
                             }
                             
                             }
                             }*/]
                    });
            panel0.add(tb);
            panel0.add(tb1);
            if (personaId) {
                Ext.getCmp('btnEditar').enable();
                Ext.getCmp('btnReporteHoras').enable();
                //Ext.getCmp('btnLAO').enable();
                Ext.getCmp('btnCompensatorio').enable();
                info = response[2][0];
                var htmlInfo = InfoEmpleado(info);
                var html = "<div style='border:solid 0px black;widt:100%; background-color: #F7F9FC;'>" + htmlInfo + "</div>";
                html += "<div style='float:left;width:445px'>" + response[3] + "</div>";
                html += "<div style='float:left;width:200px'><table cellpadding='2' cellspacing='1'><tr><td valign=top class='labelinfo'>Observaciones:&nbsp;</td><td><textarea id='txtObs' style='resize:none;margin: 0px; height: 150px; width: 320px;'>" + info['Observaciones'] + "</textarea><button id='btnSave' onclick='GuardarDesc();'>Guardar</button></td></tr></table></div>";

                if (panel0.body) {
                    panel0.body.insertHtml("beforeEnd", html);
                } else {
                    panel0.html += html;
                }
            }
            $("#ddlMes").val(mes);
            $("#ddlAnio").val(anio);
            $("#lblNameMonth").html($("#ddlMes :selected").text() + " " + $("#ddlAnio :selected").text());
            arts = ObjToArray(response[4]);
            if ($('#firtstr').find("#d1").length === 0)
                $('#firtstr').hide();
        });
    }
    catch (e)
    {
        SendJsError(e, "LoadCalendar_callback - calendario.js", response);
    }
}
var loading;

function GuardarDesc()
{
    var obser = $("#txtObs").val();
    // var cp = $("#txtCP").val();
    x_GuardarDesc(personaId, obser, GuardarDesc_callback);
}
function GuardarDesc_callback(response)
{

    if (response)
    {

        humane.success("Se ha guardado correctamente.");
        // x_LoadCalendar(personaId, mes, anio, 1, LoadCalendar_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar los datos.");
        SendJsError(new Error("GuardarPersona_callback-personas.js"), "personas.js", response);
    }
}

function GrabarPersona_callback(response)
{
    Ext.getCmp('popinPerson').close();
    if (response)
    {

        humane.success("Se ha guardado correctamente.");
        x_LoadCalendar(personaId, mes, anio, 1, LoadCalendar_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar los datos.");
        SendJsError(new Error("GuardarPersona_callback-personas.js"), "personas.js", response);
    }
}
var win2;
function EditPerson()
{

    //console.log(emp);
    var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
    if (win2)
        win2.close();
    win2 = Ext.create('Ext.Window', {
        title: 'Modificación de Datos de Empleado',
        width: 450,
        id: 'popinPerson',
        height: 300,
        layout: 'fit',
        defaults: {
            border: 0,
            cellCls: 'verticalAlignTop'
        },
        items: {
            border: 0,
            xtype: "form",
            frame: true,
            defaultType: "textfield",
            //overflowY: 'auto',
            items: [{
                    fieldLabel: 'Nombre',
                    name: 'Nombre',
                    id: 'Nombre',
                    value: emp['Nombre'],
                    //width: 300,
                    afterLabelTextTpl: required,
                    allowBlank: false

                }, {
                    fieldLabel: 'Apellido',
                    name: 'Apellido',
                    id: 'Apellido',
                    value: emp['Apellido'],
                    //width: 300,
                    afterLabelTextTpl: required,
                    allowBlank: false

                }, {
                    fieldLabel: 'Legajo',
                    name: 'Legajo',
                    id: 'Legajo',
                    value: emp['Legajo'],
                    // width: 300,
                    afterLabelTextTpl: required,
                    allowBlank: false

                }, {
                    fieldLabel: 'Cargo Descripcion',
                    name: 'CargoDesc',
                    id: 'CargoDesc',
                    value: emp['CargoDesc'],
                    //width: 300

                }, {
                    fieldLabel: 'Categoria',
                    name: 'Categoria',
                    id: 'Categoria',
                    value: emp['Categoria'],
                    //width: 300

                }, {
                    fieldLabel: 'Domicilio',
                    name: 'Domicilio',
                    id: 'Domicilio',
                    value: emp['Domicilio'],
                    // width: 300

                }, {
                    fieldLabel: 'Vacaciones',
                    name: 'VacacionesDias',
                    id: 'VacacionesDias',
                    value: emp['VacacionesDias'],
                    //width: 300,
                    field: {
                        xtype: 'numberfield'
                    }
                }],
            buttons: [
                {
                    text: 'Grabar',
                    id: "new-record-grab-button",
                    handler: function () {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            var rec = form.getValues();
                            rec['PersonaId'] = personaId;
                            var persona = JSON.stringify(rec);
                            console.log(persona);
                            x_GrabarPersona(persona, GrabarPersona_callback);
                        }
                    }
                },
                {
                    text: 'Cancelar',
                    id: "new-record-cancel-button",
                    handler: function () {
                        this.up("window").close();
                    }
                }]
        }
    }).show();
}
var emp;
function InfoEmpleado(info)
{
    emp = info;
    if (info) {
        var deudas = parseFloat(info['ArtPS'] - info['ArtPSD']);
        var htmlinfo = "<table id='info' cellpadding='4' cellspacing='4' style='width:95%;' ><tr>";

        htmlinfo += "<td class='labelinfo' >Nombre y Apellido:</td><td class='textinfo' >" + info['Nombre'] + ' ' + info['Apellido'] + "</td>";
        htmlinfo += "<td class='labelinfo'>Legajo:</td><td class='textinfo' >" + info['Legajo'] + "</td>";
        htmlinfo += "<td class='labelinfo'>Cargo:</td><td class='textinfo'>" + info['CargoDesc'] + '<b> Cat:&nbsp;</b>' + info['Categoria'] + "</td>";
        htmlinfo += "</tr><tr >";
        htmlinfo += "<td class='labelinfo'>Domicilio:</td><td class='textinfo' >" + info['Domicilio'] + "</td>";
        htmlinfo += "<td class='labelinfo'>Lic. Enfermedad:</td><td class='textinfo' > " + info['E'] + "/45</td>";
        htmlinfo += "<td class='labelinfo'>Lic. Familiar enfermo:</td><td class='textinfo'> " + info['Fe'] + "/20</td>";
        htmlinfo += "</tr><tr>";
        htmlinfo += "<td class='labelinfo'>Largo Tratamiento:</td><td class='textinfo' >" + info['LT'] + "/730</td>";
        htmlinfo += "<td class='labelinfo'><a href='http://www.fatun.org.ar/fatun2_convenio_colectivo.html' target='_blank'>Articulo 101:</a></td><td class='textinfo' >" + info['Art101'] + "/6</td>";
        htmlinfo += "<td class='labelinfo'>Articulo 102:</td><td class='textinfo'>" + info['Art102'] + "/5</td>";
        htmlinfo += "</tr><tr>";
        htmlinfo += "<td class='labelinfo'>Permisos de Salida (horas):</td><td class='textinfo' >" + deudas + "</td>";
        htmlinfo += "<td class='labelinfo'>Vacaciones Tomadas (" + anio + "):</td><td class='textinfo' >" + info['VACAS'] + "</td>";
        htmlinfo += "<td class='labelinfo'>Vacaciones Corresponden:</td><td class='textinfo'>" + info['VacacionesDias'] + "</td>";
        htmlinfo += "</tr><tr>";
        htmlinfo += "<td class='labelinfo'>Compensatorio dias:</td><td class='textinfo' >" + info['Tcp'] + "/" + info['Compensatorio'] + "</td>";
        htmlinfo += "<td class='labelinfo'></td><td class='textinfo' ></td>";
        htmlinfo += "<td class='labelinfo'></td><td class='textinfo'></td>";
        htmlinfo += "</tr></table><p style='line-height:10px'/>";
    }
    return htmlinfo;
}
var win;

function AddUpdArt(box, artId, val)
{

    var starticulos = new Ext.data.ArrayStore({
        fields: ['ArticuloId', 'Nombre'],
        data: arts
    });

    var mes = Ext.getCmp('ddlMes').value;
    var anio = Ext.getCmp('ddlAnio').rawValue;
    var starticulos;
    var dia = box.id.replace("d", "");
    dia = (parseInt(dia) < 10 ? '0' + dia : dia);
    mes = (parseInt(mes) < 10 ? '0' + mes : mes);
    var fecha = dia + "/" + mes + "/" + anio;
    var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
    if (win)
        win.close();
    win = Ext.create('Ext.Window', {
        title: 'Carga de Inasistencias',
        width: 500,
        id: 'popin',
        height: 230,
        layout: 'fit',
        defaults: {
            border: 0,
            cellCls: 'verticalAlignTop'
        },
        items: {
            border: 0,
            xtype: "form",
            frame: true,
            defaultType: "textfield",
            overflowY: 'auto',
            items: [{
                    fieldLabel: 'Fecha',
                    name: 'Fecha',
                    id: 'Fecha',
                    afterLabelTextTpl: required,
                    value: fecha,
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d H:i:s',
                    allowBlank: false,
                    width: 230,
                    labelWidth: 130,
                    labelAlign: 'left',
                    readonly: true
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Articulo o Licencia',
                    name: 'ArticuloId',
                    id: 'ArticuloId',
                    labelWidth: 130,
                    store: starticulos,
                    valueField: 'ArticuloId',
                    displayField: 'Nombre',
                    // value: artId,
                    allowBlank: false,
                    queryMode: 'local',
                    width: 400,
                    emptyText: '......',
                    listeners: {
                        'blur': function (obj) {
                            var p = obj.getValue();
                            ChangeDataArt(p);

                        },
                        'change': function (obj) {
                            var p = obj.getValue();
                            ChangeDataArt(p);
                        }
                    }
                },
                {
                    fieldLabel: 'Cant. Horas',
                    name: 'CantHoras',
                    id: 'CantHoras',
                    afterLabelTextTpl: required,
                    value: (val ? val : null),
                    editable: false,
                    width: 150,
                    hidden: true,
                    field: {
                        xtype: 'numberfield'
                    }
                },
                {
                    fieldLabel: 'Motivo',
                    name: 'Motivo',
                    id: 'Motivo',
                    afterLabelTextTpl: required,
                    //value: (val ? val : null),
                    editable: false,
                    width: 400,
                    hidden: false
                }, {
                    xtype: 'checkboxfield',
                    name: 'IsOficial',
                    id: 'IsOficial',
                    fieldLabel: 'Oficial',
                    checked: false
                }, {
                    xtype: 'checkboxfield',
                    name: 'IsParticular',
                    id: 'IsParticular',
                    fieldLabel: 'Particular',
                    checked: false
                },
                {
                    fieldLabel: 'Desde',
                    name: 'Desde',
                    id: 'Desde',
                    afterLabelTextTpl: required,
                    //value: (record ? record.data['CantHoras'] : null),
                    editable: false,
                    width: 200,
                    hidden: false, xtype: 'datefield',
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d H:i:s'

                },
                {
                    fieldLabel: 'Hasta',
                    name: 'Hasta',
                    id: 'Hasta',
                    afterLabelTextTpl: required,
                    //value: (record ? record.data['CantHoras'] : null),
                    editable: false,
                    width: 200,
                    hidden: false, xtype: 'datefield',
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d H:i:s'
                }

            ],
            buttons: [
                {
                    text: 'Grabar',
                    id: "new-record-grab-button",
                    handler: function () {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            var rec = form.getValues();
                            rec['PersonaId'] = personaId;
                            var persona = JSON.stringify(rec);
                            console.log(persona);
                            x_GrabarArticulo(persona, GrabarArticulo_callback);
                        }
                    }
                },
                {
                    text: 'Cancelar',
                    id: "new-record-cancel-button",
                    handler: function () {
                        this.up("window").close();
                    }
                },
                {
                    text: 'Borrar',
                    id: "new-record-del-button",
                    handler: function () {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            Ext.Msg.confirm('Eliminar Permiso', 'Esta seguro que quiere eliminar este Permiso?', function (button) {
                                if (button === 'yes') {
                                    var rec = form.getValues();
                                    rec['PersonaId'] = personaId;
                                    var persona = JSON.stringify(rec);
                                    x_BorrarArticulo(persona, BorrarArticulo_callback);

                                }
                            })
                        }
                    }
                },
                {
                    text: 'Imprimir',
                    icon: "icon-print",
                    id: 'print-permiso-button',
                    handler: function () {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            var rec = form.getValues();
                            rec['PersonaId'] = personaId;
                            rec['NombreArticulo'] = Ext.getCmp("ArticuloId").rawValue;
                            if (rec['ArticuloId'] === "30") {
                                PrintPermiso(rec);
                            }
                            else
                                PrintArticulo(rec);
                        }
                    }
                }]
        }
    }).show();
    var cmbVe = Ext.getCmp('ArticuloId');
    cmbVe.setValue(artId);


}

function GrabarArticulo_callback(response)
{

    Ext.getCmp('popin').close();
    if (response)
    {

        humane.success("Se grabado correctamente.");
        x_LoadCalendar(personaId, mes, anio, LoadCalendar_callback);
    }
    else
    {
        humane.error("Hubo un error al grabar el permiso.");
        SendJsError(new Error("GrabarArticulo_callback-personas.js"), "personas.js", response);
    }

}

function BorrarArticulo_callback(response)
{
    Ext.getCmp('popin').close();
    if (response)
    {

        humane.success("Se ha borrado correctamente.");
        x_LoadCalendar(personaId, mes, anio, LoadCalendar_callback);
    }
    else
    {
        humane.error("Hubo un error al borrar el permiso.");
        SendJsError(new Error("BorrarArticulo_callback-personas.js"), "personas.js", response);
    }
}

function PrintMensual(mes, anio)
{
    x_PrintMensual(mes, anio, PrintMensual_callback);

}
function PrintMensual_callback(response)
{

    try
    {
        var data = ObjToArray(response[1]);

        var textMes = $("#ddlMes :selected").text() + " DE " + $("#ddlAnio :selected").text();
        PrintMes(data);
        loading.hide();
    }
    catch (e)
    {
        SendJsError(e, "PrintMensual_callback - personas.js", response);
    }
}
function PrintAnual(anio)
{
    if (personaId !== null && personaId !== 0) {

        x_PrintAnualById(anio, personaId, PrintAnual_callback);
    }
    else
        x_PrintAnual(anio, PrintAnual_callback);

}
function PrintAnual_callback(response)
{

    try
    {
        var data = ObjToArray(response[1]);
        PrintAnio(data);
        loading.hide();

    }
    catch (e)
    {
        humane.error("Hubo un error.");
        SendJsError(e, "PrintAnual_callback - personas.js");
        loading.hide();
    }
}
function PrintPermiso(per)
{
    var fecha = per['Fecha'];
    var hora = GetNumberName(per['CantHoras']);
    var motivo = per['Motivo'];
    var empleado = info['Apellido'] + "," + info['Nombre'];
    var oficial = "OFICIAL";
    var part = "PARTICULAR";
    if (per['IsOficial'])
        oficial = '<strike>' + oficial + '</strike>';
    if (per['IsParticular'])
        part = '<strike>' + part + '</strike>';

    var html = "<div><div style='float:left;width:50%;'><FONT FACE='Century Schoolbook L, serif'>Universidad Nacional de Salta</FONT><br style='line-heigth:10px;'/>";
    html += "<FONT FACE='URW Chancery L'>Dirección General de Obras y Servicios</FONT></div><divstyle='float:left;width:50%;'><P ALIGN=RIGHT>Of. de Tarja<br style='line-heigth:10px;'/><FONT SIZE=4 STYLE='font-size: 16pt'>PERMISO DE SALIDA</FONT></P></div></div>";
    html += "<div style='padding:5px;clear:both'><div style='float:right;border:1px solid black;width:150px;text-align:center;'>" + oficial + "</div><div style='float:right;border:1px solid black;width:150px;text-align:center;'>" + part + "</div></div>";
    html += "<div style='padding:5px;text-align:right;clear:both'><b>Fecha:&nbsp;&nbsp;&nbsp;&nbsp;</b>" + fecha + "</div>";
    html += "<div style='padding:5px;text-align:right;'><b>EMPLEADO: &nbsp;&nbsp;&nbsp;&nbsp;</b>" + empleado + "</div>";
    html += "<div style='padding:5px;text-align:right;'><b>OFICINA D.S.G/14</b></div>";
    html += "<div style='padding:10px;text-align:left;text-ident:50px;'>Se autoriza a retirarse por el tiempo de <b>" + hora + "</b> hora/s y por el siguiente motivo <b><i>" + motivo + "</b></i>.</div>";
    html += "<div style='padding-top:50px;text-align:center;vertical-align:center'><div style='width:200px;float:left;height:30px;border-top:1px solid black;'><b>FIRMA DEL EMPLEADO</b></div><div style='width:350px;float:right;height:30px;border-top:1px solid black;'><b>FIRMA DEL DIRECTOR O JEFE SUPERIOR</b></div></div>"
    html += "<div style='clear:both;padding:10px;text-align:left;text-ident:50px;'>PARA USO DE DIRECCION DE PERSONAL<br style='line-heigth:10px;'/>Salio a Hs....... Regresó a Hs.......... Computó de Hs................</div>";
    var scriptPath = Ext.Loader.getPath('Ext.ux.grid.Printer');
    var host = scriptPath.substring(0, scriptPath.indexOf('tape'));
    var stylesheetPath = scriptPath.substring(0, scriptPath.indexOf('Printer.js')) + 'gridPrinterCss/print.css';

    var data = "";
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
        '</div><br/><br/>',
        html,
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
function ReporteHoras()
{
    var date = new Date();
    var mes = date.getMonth();
    var anio = date.getFullYear();
    var mesNom = date.toLocaleString();
    mes = mes + 1;
    var d = date.getDay();
    if (mes < 10)
        mes = "0" + mes;
    if (d < 10)
        d = "0" + d;
    var fecha = d + "/" + mes + "/" + anio;
    var empleado = info['Apellido'] + "," + info['Nombre'];
    var thoras = parseFloat(info['ArtPS'] - info['ArtPSD']);
    var horas = 0;
    if (thoras > 7)
    {
        dias = parseInt(thoras / 7);
        horas = thoras - (dias * 7);
    }
    else
    {
        dias = 0;
        horas = thoras;
    }
    var html = "<div><div style='float:left;width:50%;'><FONT FACE='Century Schoolbook L, serif'>Universidad Nacional de Salta</FONT><br style='line-heigth:10px;'/>";
    html += "<FONT FACE='URW Chancery L'>Dirección General de Obras y Servicios</FONT></div><divstyle='float:left;width:50%;'><P ALIGN=RIGHT>Of. de Tarja<br style='line-heigth:10px;'/><FONT SIZE=4 STYLE='font-size: 16pt'>RESUMEN HORAS - PERMISOS DE SALIDA</FONT></P></div></div>";
    html += "<div style='padding:5px;text-align:right;clear:both'><b>Fecha:&nbsp;&nbsp;&nbsp;&nbsp;</b>" + fecha + "</div>";
    html += "<div style='padding:5px;text-align:right;'><b>EMPLEADO: &nbsp;&nbsp;&nbsp;&nbsp;</b>" + empleado + "</div>";
    html += "<div style='padding:5px;text-align:right;'><b>OFICINA D.S.G/14</b></div>";
    html += "<div style='padding:10px;text-align:left;text-ident:50px;'>Al día de la fecha se adeudan un total de <b>" + thoras + "</b> horas equivalentes a &nbsp;<b><i>" + dias + " día/s con " + horas + " hora/s</b></i>.</div>";
    html += "<div style='padding-top:50px;text-align:center;vertical-align:center'><div style='width:200px;float:left;height:30px;border-top:1px solid black;'><b>FIRMA DEL EMPLEADO</b></div><div style='width:350px;float:right;height:30px;border-top:1px solid black;'><b>FIRMA DEL DIRECTOR O JEFE SUPERIOR</b></div></div>"

    var scriptPath = Ext.Loader.getPath('Ext.ux.grid.Printer');
    //var host = scriptPath.substring(0, scriptPath.indexOf('tape')) ;
    var stylesheetPath = scriptPath.substring(0, scriptPath.indexOf('Printer.js')) + 'gridPrinterCss/print.css';
    var data = "";
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
        '</div><br/><br/>',
        html,
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
function GetNumberName(n)
{
    n = parseInt(n);
    switch (n) {
        case 1:
            return "1 (un) ";
            break;
        case 2:
            return "2 (dos) ";
            break;
        case 3:
            return "3 (tres) ";
            break;
        case 4:
            return "4 (cuatro) ";
            break;
        default:
            return n;
    }
}
function ChangeDataArt(p)
{
    Ext.getCmp('CantHoras').setVisible(false);
    // Ext.getCmp('Motivo').setVisible(false);
    // Ext.getCmp('Desde').setVisible(false);
    // Ext.getCmp('Hasta').setVisible(false);
    Ext.getCmp('IsParticular').setVisible(false);
    Ext.getCmp('IsOficial').setVisible(false);
    if (p === "30") {
        Ext.getCmp('CantHoras').setVisible(true);
        //Ext.getCmp('Motivo').setVisible(true);
        Ext.getCmp('IsParticular').setVisible(true);
        Ext.getCmp('IsOficial').setVisible(true);
        Ext.getCmp('Desde').setVisible(false);
        Ext.getCmp('Hasta').setVisible(false);
    }
    if (p === "31")
    {
        Ext.getCmp('CantHoras').setVisible(true);
        Ext.getCmp('Motivo').setVisible(false);
        Ext.getCmp('Desde').setVisible(false);
        Ext.getCmp('Hasta').setVisible(false);
        Ext.getCmp('print-permiso-button').disable();
    }
    /*if (p === "14" || p === "4") {
     Ext.getCmp('Desde').setVisible(true);
     Ext.getCmp('Hasta').setVisible(true);
     }*/
}
function PrintArticulo(per)
{

    var fecha = per['Fecha'];
    var articulo = per['NombreArticulo'];
    var desde = new Date((per['Desde']) ? per['Desde'] : new Date());
    var hasta = new Date((per['Hasta']) ? per['Hasta'] : new Date());
    var cdias = Math.abs(Math.floor((desde.getTime() - hasta.getTime()) / (1000 * 60 * 60 * 24)));
    cdias++;
    cdias = GetNumberName(cdias);
    var date = new Date();
    var anio = date.getFullYear();
    var dia = date.getDate();
    var mes = date.getMonth();

    var mesNom = new Date(date.getUTCFullYear(), mes, dia);
    if (dia < 10)
        dia = "0" + dia;

    var motivo = per['Motivo'];
    var empleado = info['Apellido'] + "," + info['Nombre'];
    var cargo = info['CargoDesc'];
    var html = "<div><div style='float:left;width:50%;'><FONT FACE='Century Schoolbook L, serif'>Universidad Nacional de Salta</FONT><br style='line-heigth:10px;'/>";
    html += "<FONT FACE='URW Chancery L'>Dirección General de Obras y Servicios</FONT></div>";
    html += "<div style='float:left;width:50%;'><P ALIGN=RIGHT>Of. de Tarja<br style='line-heigth:10px;'/></P></div>";
    html += "<div style='clear:both;text-align:center;padding-top:10px;font-size:16px;font-family: Arial;'><u>LICENCIAS Y JUSTIFICACION DE INASISTENCIA</u></div>";
    html += "<div style='font-size:12pt;padding:5px;text-align:center;clear:both;font-family: Arial;font-weight:bold;'>SALTA, " + dia + " de " + mesNom.f("MMM") + " de " + anio + "</div>";
    html += "<div style='font-size:12pt;padding:10px;text-align:left;font-family: Arial;font-weight:normal;'>Señor: Director Gral. de Obras y Servicios<br/>Ing. Jorge A. ROVALETTI<br/><u>S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D</u></div>";
    html += "<div style='font-size:12pt;padding:5px;text-align:left;text-indent:250px;font-family: Arial;'>Me dirijo a Ud., solicitándole Articulo <i>\"" + articulo + "\"</i> por <i>" + cdias + "</i> día/s (" + desde.f("dd/MM/yyyy") + " al " + hasta.f("dd/MM/yyyy") + "). Con motivo de <i><b>" + motivo + "</b></i>.</div>";
    html += "<div style='font-size:12pt;padding:5px;text-align:left;font-family: Arial;'><b>APELLIDO  Y NOMBRE: &nbsp;&nbsp;&nbsp;&nbsp;</b>" + empleado + "</div>";
    html += "<div style='font-size:12pt;padding:5px;text-align:left;font-family: Arial;'><b>CARGO Y DEPENDENCIA : </b>" + cargo + "</div>";
    html += "<div style='font-size:12pt;padding-top:20px;text-align:center;vertical-align:center;font-family: Arial;'><div style='width:200px;float:right;height:30px;border-top:1px solid black;'><b>Firma del Interesado</b></div></div>"
    html += "<div style='font-size:12pt;padding:5px;text-align:center;clear:both'><b>Salta, ................ de ............................. de " + anio + "</b></div>";
    html += "<div style='font-size:12pt;clear:both;padding:1px;text-align:center;clear:both;'>Pase a la Oficina de Personal para su informe.</div>";
    html += "<div style='font-size:12pt;padding-top:20px;text-align:center;vertical-align:center'><div style='width:200px;float:right;height:30px;border-top:1px solid black;'><b>Firma del Jefe Inmediato</b></div></div>"
    html += "<div style='font-size:12pt;padding:5px;text-align:center;clear:both'><b>Salta, ................ de ............................. de " + anio + "</b></div>";
    html += "<div style='font-size:12pt;padding:5px;text-align:left;text-indent:250px;font-family: Arial;'>La ....................................solicitada ....... está encuadrada en ...... Art ........... Inc...........del Decreto Reglamento de Licencias .......... ............ .......... ................. .................. ....... .....................</div>";
    html += "<div style='font-size:12pt;padding:5px;text-align:left;text-indent:250px;font-family: Arial;'>El interesado ............registra ...............día ..........de licencia con igual imputación.</div>";
    html += "<div style='font-size:12pt;padding-top:20px;text-align:center;vertical-align:center'><div style='width:200px;float:right;height:30px;border-top:1px solid black;'><b>Jefe Oficina Personal</b></div></div>"
    html += "<div style='font-size:12pt;padding:5px;text-align:center;clear:both'><b>Salta, ................ de ............................. de " + anio + "</b></div>";
    html += "<div style='font-size:12pt;padding:5px;text-align:left;font-family: Arial;'><b>VISTO:</b></div>";
    html += "<div style='font-size:12pt;padding:5px;text-align:left;font-family: Arial;'>Las presentes actuaciones y las atribuciones conferidas por las normas en vigencia para otorgar licencias y justificaciones, como así también lo informado por la Oficina de Personal.<br/></div>";
    html += "<div style='font-size:12pt;padding:5px;text-align:center;clear:both'><b>RESUELVE</b></div>";
    html += "<div style='font-size:12pt;padding:3px;text-align:left;font-family: Arial;'><b>ARTICULO 1º.- ....... otorgar al recurrente la .....................solicitada.</b></div>";
    html += "<div style='font-size:12pt;padding:3px;text-align:left;font-family: Arial;'><b>ARTICULO 2º.- ........ Hágase saber al interesado y comuníquese a la Dirección de Personal para su registro y archivo.</b></div>";
    html += "<div style='font-size:12pt;padding:3px;text-align:left;font-family: Arial;'><b>NOTIFICADO:</b></div>";
    html += "<div style='font-size:12pt;padding-top:20px;text-align:center;vertical-align:center'><div style='width:200px;float:right;height:30px;border-top:1px solid black;'><b>Firma del Interesado</b></div></div>"
    var scriptPath = Ext.Loader.getPath('Ext.ux.grid.Printer');
    var host = scriptPath.substring(0, scriptPath.indexOf('tape'));
    var stylesheetPath = scriptPath.substring(0, scriptPath.indexOf('Printer.js')) + 'gridPrinterCss/print.css';

    var data = "";
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
        html,
        '</body>',
        '</html>'
    ];
    var html = Ext.create('Ext.XTemplate', htmlMarkup).apply(data);
    var win = window.open('', '_blank');
    win.document.open();
    win.document.write(html);
    win.document.close();
}
var summaryData = [];
function SumCompensatorio()
{
    var dias = parseInt(summaryData['Dias'] + parseInt(summaryData['Horas'] / 7));
    summaryData['Dias'] = dias;
    var horas = (summaryData['Horas'] % 7);
    summaryData['Horas'] = horas;
    var sumText = summaryData['Dias'] + ' Dias ' + summaryData['Horas'] + ' Horas';
    return sumText;
}

function CalculoHorasComp(e, s, a)
{
    var response = [];
    var hs1 = e.split(":");
    var hs2 = s.split(":");
    var dt = new Date();
    dt.setHours(hs2[0] - hs1[0], hs2[1] - hs1[1]);
    var horas = dt.getHours();
    
    var dias = parseInt(horas / 7);
    if (a === 'Inhabil') {
        horas = horas * 2;
        dias = parseInt(horas / 7);
    }
    else
    {
        horas = horas * 1.5;
        dias = parseInt(horas / 7);
    }
    horas = horas % 7;

    response[0] = dias;
    response[1] = horas;
    return response;
}
function PopinCompensatorio()
{
    var compe = [];
    console.log(emp['Compensatorios']);
    if (emp && emp['Compensatorios']) {
        var inte = emp['Compensatorios'].split("<br/>");
        for (i = 0; i < inte.length; i++)
        {
            var a = inte[i].split("@");
            if ((a[2]) || (a[1] !== "") || (a[3] !== "") || (a[4] !== ""))
            {
                a[0] = a[0].replace(/^\s+|\s+$/g, '');
                a[1] = a[1].replace(/^\s+|\s+$/g, '');
                a[2] = a[2].replace(/^\s+|\s+$/g, '');
                a[3] = a[3].replace(/^\s+|\s+$/g, '');
                a[4] = a[4].replace(/^\s+|\s+$/g, '');
                var res = CalculoHorasComp(a[2], a[3], a[4]);
                a[5] = res[1];
                a[6] = res[2];
                compe.push(a);
            }
        }
    }

    Ext.define('Compensatorios', {
        extend: 'Ext.data.Model',
        fields: ['CompensatorioId',
            {
                name: 'Fecha',
                type: 'date', dateFormat: 'd/m/Y'
            },
            {
                name: 'Entrada',
                type: 'time'
            },
            {
                name: 'Salida',
                type: 'time'
            },
            'IsHabil',
            {
                name: 'Dias',
                type: 'number'
            },
            {
                name: 'Horas',
                type: 'time'
            }
        ]
    });
    var store = Ext.create('Ext.data.ArrayStore', {
        model: 'Compensatorios',
        data: compe
    });
//console.log(compe);
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false,
        listeners: {
            edit: function (editor, e) {
                var res = CalculoHorasComp(e.record.data['Entrada'], e.record.data['Salida'], e.record.data['IsHabil']);
                e.record.data['Dias'] = res[0];
                e.record.data['Horas'] = res[1];
                e.record.commit();
                Ext.getCmp('Total').setValue(SumCompensatorio());
            }
        }
    });
    var haina = [['Habil', 'Hábil'], ['Inhabil', 'Inhábil']];

    var sthaina = new Ext.data.ArrayStore({
        fields: ['id', 'text'],
        data: haina
    });
    console.log(store);
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        id: 'gridCompe',
        features: [{
                ftype: 'summary',
                id: 'summary'
            }],
        columns: [{
                header: 'ID',
                dataIndex: 'CompensatorioId',
            }, {
                xtype: 'datecolumn',
                header: 'Fecha',
                dataIndex: 'Fecha',
                format: 'd/m/Y',
                editor: {
                    xtype: 'datefield',
                    allowBlank: false,
                    format: 'd/m/Y',
                    minValue: '01/01/' + anio,
                }
            }, {
                header: 'Habil/Inhabil',
                dataIndex: 'IsHabil',
                editor:
                        {
                            xtype: 'combo',
                            store: sthaina,
                            displayField: 'text',
                            valueField: 'id',
                            mode: 'local',
                            typeAhead: false,
                        }
            }, {
                header: 'Entrada',
                dataIndex: 'Entrada',
                flex: 1,
                format: 'H:i',
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'Salida',
                dataIndex: 'Salida',
                format: 'H:i',
                editor: {
                    allowBlank: false
                }

            }, {
                header: 'Dias',
                dataIndex: 'Dias',
                summaryType: function (records) {
                    var dataIndex = 'Dias';
                    var s = SumTotal(records, dataIndex);
                    summaryData['Dias'] = s;

                    Ext.getCmp('Total').setValue(SumCompensatorio());
                    return s;
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return value;
                }
            }, {
                header: 'Horas',
                dataIndex: 'Horas',
                format: 'H:i',
                summaryType: function (records) {
                    var dataIndex = 'Horas';

                    var s = SumTotal(records, dataIndex);
                    summaryData['Horas'] = s;
                    Ext.getCmp('Total').setValue(SumCompensatorio());
                    return s;
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return value;
                }
            }],
        height: 250,
        title: 'Total de Compensatorios realizados Año ' + anio,
        frame: true,
        tbar: [{
                text: 'Agregar',
                iconCls: 'icon-add',
                handler: function () {
                    rowEditing.cancelEdit();
                    var r = Ext.create('Compensatorios', {
                        Fecha: new Date(),
                        IsHabil: 'Habil',
                        Entrada: '14:00:00',
                        Salida: '20:30:00'
                    });
                    store.insert(0, r);
                    rowEditing.startEdit(0, 0);
                }
            }, {
                itemId: 'removeCompensatorio',
                text: 'Borrar',
                iconCls: 'icon-remove',
                handler: function (editor, e) {
                    var sm = grid.getSelectionModel();
                    store.remove(sm.getSelection());
                    Ext.getCmp('Total').setValue(SumCompensatorio());
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                    grid.getView().refresh();
                    rowEditing.cancelEdit();
                },
                disabled: true
            }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function (view, records) {
                grid.down('#removeCompensatorio').setDisabled(!records.length);
            }
        }
    });


    if (win2)
        win2.close();
    win2 = Ext.create('Ext.Window', {
        title: 'Compensatorio',
        width: 650,
        id: 'popinCompensatorio',
        height: 400,
        layout: 'fit',
        defaults: {
            border: 0,
            cellCls: 'verticalAlignTop'
        },
        items: {
            border: 0,
            xtype: "form",
            frame: true,
            defaultType: "textfield",
            overflowY: 'auto',
            items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Nombre',
                    name: 'Nombre',
                    id: 'Nombre',
                    value: emp['Nombre'] + ' ' + emp['Apellido'],
                    width: 450

                }, grid, {
                    xtype: 'displayfield',
                    fieldLabel: 'Total',
                    name: 'Total',
                    id: 'Total',
                    width: 450,
                }],
            buttons: [
                {
                    text: 'Grabar',
                    id: "new-record-grab-button",
                    handler: function () {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            var rec = form.getValues();
                            var grid = Ext.getCmp('gridCompe');
                            var compes = grid.store.data.items;
                            var comp = [];
                            for (i = 0; i < compes.length; i++)
                            {
                                var a = new Array();
                                console.log("problema de tip");
                                console.log(compes[i].data['CompensatorioId']);
                                a[0, 0] = (compes[i].data['CompensatorioId']===""?0:compes[i].data['CompensatorioId']);
                                a[0, 1] = compes[i].data['Fecha'];
                                a[0, 2] = compes[i].data['Entrada'];
                                a[0, 3] = compes[i].data['Salida'];
                                a[0, 4] = compes[i].data['IsHabil'];
                                
                                comp.push(a);
                            }

                            rec['PersonaId'] = personaId;
                            rec['Compensatorios'] = comp;
                            rec['Compensatorio'] = summaryData['Dias'];
                            console.log(rec);
                            var persona = JSON.stringify(rec);

                            x_GrabarCompesatorios(persona, GrabarCompesatorios_callback);
                        }
                    }
                },
                {
                    text: 'Cancelar',
                    id: "new-record-cancel-button",
                    handler: function () {
                        this.up("window").close();
                    }
                }]
        }
    }).show();

}
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
function GrabarCompesatorios_callback(response)
{
    Ext.getCmp('popinCompensatorio').close();
    if (response)
    {

        humane.success("Se ha guardado correctamente.");
        x_LoadCalendar(personaId, mes, anio, 1, LoadCalendar_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar los datos.");
        SendJsError(new Error("GrabarCompesatorios_callback-personas.js"), "personas.js", response);
    }
}


function HistoryLic_callback(response)
{
    Ext.getCmp('popinHistoryLic').close();
    if (response)
    {



    }
    else
    {
        humane.error("Hubo un error al guardar los datos.");
        SendJsError(new Error("GrabarCompesatorios_callback-personas.js"), "personas.js", response);
    }
}
function PopinHistoryLic()
{

    var history = [];

    if (emp && emp['HistoryLic']) {
        var inte = emp['HistoryLic'].split("<br/>");
        for (i = 0; i < inte.length; i++)
        {
            var a = inte[i].split("@");
            history.push(a);

        }
    }

    Ext.define('HistoyLic', {
        extend: 'Ext.data.Model',
        fields: ['ComputoA', 'Antiguedad', 'LAO', 'LicTOM', 'DEUDA']
    });
    var store = Ext.create('Ext.data.ArrayStore', {
        model: 'HistoyLic',
        data: history
    });



    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        id: 'gridHistoryLic',
        features: [{
                ftype: 'summary',
                id: 'summary'
            }],
        columns: [{
                header: 'Año',
                dataIndex: 'ComputoA',
            }, {
                header: 'Antiguedad',
                dataIndex: 'Antiguedad',
            }, {
                header: 'LAO',
                dataIndex: 'LAO',
                flex: 1,
            }, {
                header: 'Lic. Tom.',
                dataIndex: 'LicTOM',
            }, {
                header: 'Deuda',
                dataIndex: 'DEUDA'}
        ],
        height: 250,
        title: 'Historial de Vacaciones',
        frame: true,
        listeners: {
            'selectionchange': function (view, records) {
                grid.down('#removeCompensatorio').setDisabled(!records.length);
            }
        }
    });


    if (win2)
        win2.close();
    win2 = Ext.create('Ext.Window', {
        title: 'Historial de LAO',
        width: 650,
        id: 'popinHistoryLic',
        height: 400,
        layout: 'fit',
        defaults: {
            border: 0,
            cellCls: 'verticalAlignTop'
        },
        items: {
            border: 0,
            xtype: "form",
            frame: true,
            defaultType: "textfield",
            overflowY: 'auto',
            items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Nombre',
                    name: 'Nombre',
                    id: 'Nombre',
                    value: emp['Nombre'] + ' ' + emp['Apellido'],
                    width: 450

                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Fecha Ingreso',
                    name: 'FechaIngreso',
                    id: 'FechaIngreso',
                    value: emp['FechaIngreso'],
                    width: 450

                }, grid],
            buttons: [
                {
                    text: 'Cerrar',
                    id: "new-record-cerrar-button",
                    handler: function () {
                        this.up("window").close();
                    }
                }]
        }
    }).show();

}
function workingDaysBetweenDates(startDate, endDate) {
  
    // Validate input
    if (endDate < startDate)
        return 0;
    
    // Calculate days between dates
    var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    startDate.setHours(0,0,0,1);  // Start just after midnight
    endDate.setHours(23,59,59,999);  // End just before midnight
    var diff = endDate - startDate;  // Milliseconds between datetime objects    
    var days = Math.ceil(diff / millisecondsPerDay);
    
    // Subtract two weekend days for every week in between
    var weeks = Math.floor(days / 7);
    var days = days - (weeks * 2);

    // Handle special cases
    var startDay = startDate.getDay();
    var endDay = endDate.getDay();
    
    // Remove weekend not previously removed.   
    if (startDay - endDay > 1)         
        days = days - 2;      
    
    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay == 0 && endDay != 6)
        days = days - 1  
            
    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay == 6 && startDay != 0)
        days = days - 1  
    
    return days;
}