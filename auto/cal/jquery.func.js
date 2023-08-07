// JavaScript Document
$(document).ready(function(){
    $(window).load(function(){
        $(window).resize()
    });
	
    $(window).resize(function(){
           
        resizeCalendar();
		
		
    });
	
    $('.prevmonth').click(function(){
        alert('mes anterior');
    });

    $('.nextmonth').click(function(){
        alert('mes siguiente');
    });

});
function resizeCalendar()
{

    var wscr = $(window).width();
    if(wscr == 0) wscr =_iBrowserWidth;
    var hscr = $(window).height();
    if(hscr == 0) hscr = _iBrowserHeight;
    hscr = hscr-1-$('#barcal').height();
    var counttr = $("#minical tr").length-1; //numero de filas menos cabecera
    var counttd = $("#minical th").length; //numero de filas menos cabecera
    if(wscr > 1024) wscr=1024;
    $('#minical').css("width", wscr);
    $('#minical').css("height", hscr);
    //alto de cada bodybox menos alto de headbox
    $('.bodybox').css("height",(hscr/counttr)-($('.headbody').height()+$('#barcal').height()))
    //ancho de cada columna (ancho pantalla/numero columnas)
    $('#minical th').css("width",(wscr/counttd));
}