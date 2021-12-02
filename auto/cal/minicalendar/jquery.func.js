// JavaScript Document
$(document).ready(function(){
	$(window).load(function(){ $(window).resize() });
	
	$(window).resize(function(){
		var wscr = $(window).width();
		var hscr = $(window).height()-1-$('#barcal').height();
		var counttr = $("#minical tr").length-1; //numero de filas menos cabecera
		var counttd = $("#minical th").length; //numero de filas menos cabecera
		
		$('#minical').css("width", wscr);
		$('#minical').css("height", hscr);
		//alto de cada bodybox menos alto de headbox
		$('.bodybox').css("height",(hscr/counttr)-($('.headbody').height()+$('#barcal').height()))
		//ancho de cada columna (ancho pantalla/numero columnas)
		$('#minical th').css("width",(wscr/counttd));
		
	});
	
	$('.prevmonth').click(function(){
		alert('mes anterior');
	});

	$('.nextmonth').click(function(){
		alert('mes siguiente');
	});

});