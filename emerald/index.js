/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var date = new Date();
var mes = date.getMonth();
var anio = date.getFullYear();

var mesNom = date.toLocaleString();


$(function() {
    $("#txtAnio").val(anio);

    $("#ddlMes").val(mes);
});

function Imprimir()
{
    $(".chkbox").hide();
    $(".fact").hide();
    html = $("#tblReport").html();
    $(".chkbox").show();
    $(".fact").show();
    var mesn = $("#ddlMes :selected").text();
    tpage = "<b>Universidad Nacional de Salta</b><br/>DIRECCION DE SERVICIOS GENERALES<br/>SERVICIO DE TELEFONIA<br/><br/><b>Mes:</b> " + mesn + "<br/><b>Año:</b> " + anio;
    html = "<link rel=\"stylesheet\" href='" + _WebSitePath + "css/print.css' type='text/css' />" + tpage + html;

    var w = window.open('Informe Telefonía', '', 'width=960,height=800,resizeable,scrollbars');
    w.document.write(html);
    w.document.title = "Informe Telefonía";
    w.document.close(); // needed for chrome and safari

}

function ImprimirFac()
{
    var ints = "", sep = "";
    if ($("#chkAll").is(':checked'))
    {
        $(".chkbox").hide();
        html = $("#tblReport").html();
        $(".chkbox").show();
        var mesn = $("#ddlMes :selected").text();
        tpage = "<b>Universidad Nacional de Salta</b><br/>DIRECCION DE SERVICIOS GENERALES<br/>SERVICIO DE TELEFONIA<br/><br/><b>Mes:</b> " + mesn + "<br/><b>Año:</b> " + anio;
        html = "<link rel=\"stylesheet\" href='" + _WebSitePath + "css/print.css' type='text/css' />" + tpage + html;

        var w = window.open('Informe Telefonía', '', 'width=960,height=800,resizeable,scrollbars');
        w.document.write(html);
        w.document.title = "Informe Telefonía";
        w.document.close(); // needed for chrome and safari
    }
}
function SelectAll(chkAll)
{
    var check = chkAll.checked;
    $(".chkbox").each(function() {
        this.checked = check;
    }
    );
}
function ImprimirDetalle()
{
    var ints = "", sep = "";
    $(".chkbox").each(function() {
        if (this.checked)
            ints += this.id.split("_")[1] + sep;
        sep = ",";
    }
    );
    x_ImprimirDetalle(mes, anio, ints, ImprimirDetalle_callback);
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
function GenerarInforme()
{
    mes = $("#ddlMes :selected").val();
    anio = $("#txtAnio").val();
    tipo = $("input[name='tipo']:checked").val();
    dpto = $("#ddlDepartamento :selected").val();
    centro = $("#ddlCostos :selected").val();
    dpton = $("#ddlDepartamento option:selected").text();
    centron = $("#ddlCostos option:selected").text();
    interno = $("#txtInterno").val();
    itodos = getId("chkTodos").checked;
    if (itodos)
        interno = 0;

    x_LoadInforme(mes, anio, tipo, dpto, centro, dpton, centron, interno, LoadInforme_callback);
}

function LoadInforme_callback(response)
{
    try
    {
        getId("tblReport").innerHTML = response[1];
        $("#ddlMes").val(mes);
        $("#ddlAnio").val(anio);
    }
    catch (e)
    {
        SendJsError(e, "index.js", response);
    }
}

function GenerarPDF()
{
    $(".chkbox").remove();
    var html = $("#tblReport").html();

    var mesn = $("#ddlMes :selected").text();
    var dpton = $("#ddlDepartamento option:selected").text();
    var centron = $("#ddlCostos option:selected").text();
    var tpage = "<b>Universidad Nacional de Salta</b><br/>DIRECCION DE SERVICIOS GENERALES<br/>SERVICIO DE TELEFONIA<br/><br/><b>Mes:</b> " + mesn + "<br/><b>Año:</b> " + anio;
    html = "<link rel=\"stylesheet\" href='" + _WebSitePath + "css/print.css' type='text/css' />" + tpage + html;
    /* html = utf8_decode(html);
     console.log(html);*/
    x_GenerarPDF(html, GenerarPDF_callback);
}

function GenerarPDF_callback(response)
{
   // alert(response);
    try
    {
        /*alert(response[1]);*/
        getId("tdPDF").innerHTML = response[1];

    }
    catch (e)
    {
        SendJsError(e, "index.js", response);
    }
}


