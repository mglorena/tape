var date = new Date();
var mes = date.getMonth() + 1;
var anio = date.getFullYear();
var mesNom = date.toLocaleString();
var tvehiculoId = 1;

$(function() {
    x_LoadCalendar(mes, anio, 1, LoadCalendar_callback);

});

function LoadCalendar_callback(response)
{
    try
    {
        if (response)
        {
            $("#calendarview").html(response[0]);
            if (tvehiculoId !== "undefined")
                $('#ddlTipoVehiculo').val(tvehiculoId);
            else
                $('#ddlTipoVehiculo').val(1);
            $("#ddlMes").val(mes);
            $("#ddlAnio").val(anio);
            $("#lblNameMonth").html($("#ddlMes :selected").text() + " " + $("#ddlAnio :selected").text());
            resizeCalendar();
            if ($('#firtstr').find("#d1").length === 0)
                $('#firtstr').hide();
            ShowReservas(response[1]);
        }
        else
        {
            humane.error("Hubo un error.");
            SendJsError(new Error("Error LoadCalendar_callback-calendario.js"), "calendario.js", response);
        }
    }
    catch (e)
    {
        SendJsError(e, "LoadCalendar_callback - calendario.js", response);
    }
}

function GetCalendar()
{
    try
    {
        mes = $("#ddlMes :selected").val();
        tvehiculoId = $('#ddlTipoVehiculo').val();
        anio = $("#ddlAnio :selected").val();
        $("#lblNameMonth").html($("#ddlMes :selected").text());
        x_LoadCalendar(mes, anio, tvehiculoId, LoadCalendar_callback);
    } catch (e)
    {
        SendJsError(e, "GetCalendar - calendario.js", mes);
    }
}

function ShowReservas(list)
{
    try
    {
        i = 0;
        for (x in list)
        {
            try
            {
                fIni = list[x]['FechaInicio'];
                fFin = list[x]['FechaFin'];
                color = list[x]['Color'];
                aFi = fIni.split("/");
                aFf = fFin.split("/");
                dia = parseInt(aFi[0]);
                udia = parseInt(aFf[0]);
                messelec = parseInt($("#ddlMes").val());
                if (aFi[1] < aFf[1]) // distintos meses
                {
                    // pasa al otro mes
                    //console.log(parseInt($("#ddlMes").val()) +"!==" + parseInt(aFi[1]));
                    if ( messelec !== parseInt(aFi[1]))
                    {
                        //console.log("son distintos meses");
                        dia = 1;
                    }
                    else
                    {
                        //console.log("empieza en este mes");
                        udia = daysInMonth(aFi[1], aFi[2]);
                        //console.log(udia);
                    }
                }
                else
                {
                    if (aFi[2] !== aFf[2])
                    {
                        if ( messelec !== parseInt(aFi[1]))
                        {
                            dia = 1;
                        }
                        else
                            udia = daysInMonth(aFf[1], aFf[2]);
                    }

                }
                j = dia;
                for (j = dia; j <= udia; j++)
                {
                    position = $("#d" + j).position();
                    h = $("#d" + j).height();
                    width = ($("#c" + j).width() + 9);
                    var newdiv = null;
                    newdiv = document.createElement('div');
                    newdiv.setAttribute('class', 'event');
                    newdiv.setAttribute('id', 'event' + i);
                    var kids = $("#c" + j).children('.event').length;
                    var title1 = list[x]['Destino'];// +" - "+list[x]['Solicitante'];
                    title = "<b>Destino:</b> " + list[x]['Destino'] + "\n<b>Solicitante:</b> " + list[x]['Solicitante'] + "\n<b>Email:</b> " + list[x]['EmailSolicitante'];
                    title += "\n<b>Vehiculo:</b> " + list[x]['Vehiculo'] + " <b>Capacidad: </b>" + list[x]['Capacidad'];
                    title += "\n<b>Cant. Pasajeros:</b> " + list[x]['NumPasajeros'];
                    title += "\n<b>Fechas:</b> " + list[x]['FechaInicio'] + " al " + list[x]['FechaFin'];
                    title += "\n<b>Chofer/es:</b> " + list[x]['ChoferName'];
                    var url1 = "https://maps.google.com/maps?saddr=Salta,+Argentina&daddr=" + list[x]['Destino'] + ",+Argentina";

                    if (list[x]['Estado'] === "Confirmada")
                    {
                        es = "<font color=\"green\"><b>&radic;</b></font>";
                        title += "\n<font color='green'><b>" + list[x]['Estado'] + " </b></font>";
                    }
                    else if (list[x]['Estado'] === "Pendiente")
                    {
                        es = "";
                        title += "\n<font color='red'><b>" + list[x]['Estado'] + " </b></font>";

                    }
                    else if (list[x]['Estado'] === "Realizada")
                    {
                        es = "";
                        title += "\n<font color='blue'><b>" + list[x]['Estado'] + " </b></font>";

                    }
                    title1 = title1.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                        return letter.toUpperCase();
                    });
                    title1 = title1.substring(0, 13) + "&hellip;";
                    $(newdiv).html("<a target='_blank' class='toolE' style='font-size:12px;text-transform:capitalize;!important' href=\"" + url1 + "\" title=\"" + title + "\">&nbsp;" + es + " " + title1 + "</a>");
                    $(newdiv).css("background-color", color);
                    ttop = position['top'] + (16 * kids) + h;
                    $(newdiv).css("top", ttop + 3);
                    $(newdiv).css("left", position['left'] - 3);
                    $(newdiv).css("position", "absolute");
                    $(newdiv).css("text-align", "left");
                    $(newdiv).css("width", width);
                    $("#d" + j).after($(newdiv));
                    title1 = "";

                }
                i++;
            }
            catch (e)
            {
                SendJsError(e, "ShowReservas- calendario.js", list);
            }
        }
        $('.toolE').tooltip({
            track: true,
            delay: 0,
            showURL: false,
            showBody: "\n",
            fade: 250
        });
    }
    catch (e)
    {
        SendJsError(e, "ShowReservas- calendario.js", list);
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}