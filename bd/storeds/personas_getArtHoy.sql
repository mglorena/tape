


DROP PROCEDURE IF EXISTS `personas_getArtHoy`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_getArtHoy`()
BEGIN

select Apellido,Personas.Nombre,Legajo,CargoDesc,Articulos.Nombre As ArticuloName,Descripcion from
Personas
INNER JOIN transArticuloPersona ON transArticuloPersona.PersonaId = Personas.PersonaId
INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId

WHERE 
   DATE(transArticuloPersona.Fecha) = DATE(CURDATE())
 AND 
   Articulos.ArticuloId  IN (1,9,11,12,15,18,19,20,21,22,23,25,26,29,30)
;


END ;

