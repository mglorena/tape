


DROP PROCEDURE IF EXISTS `personas_getArticulos`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_getArticulos`(
IN pId INT,
IN m INT,
IN a INT
)
BEGIN
SET NAMES 'utf8';
SELECT 
     DATE_FORMAT(transArticuloPersona.Fecha,"%d/%m/%y") as Fecha,
     Articulos.Nombre,
     Articulos.ArticuloId,
	 Data as CantHoras
FROM 
transArticuloPersona
INNER JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE
    DATE(transArticuloPersona.Fecha) BETWEEN DATE(CONCAT(a,'-',m,'-','01'))  AND LAST_DAY( DATE(CONCAT(a,'-',m,'-','01'))) 
AND
  PersonaId = pId
ORDER BY transArticuloPersona.Fecha asc;

END ;

