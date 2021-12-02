


DROP PROCEDURE IF EXISTS `emerald_byDepto`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `emerald_byDepto`(
IN d INT,
IN m INT,
IN a INT

)
BEGIN

SET NAMES 'utf8';

SELECT 
    interno,
    usuario,
    cantllam,
    tiempo,
    costo ,
    SUM(costo) as Total,
    SUM(cantllam) as LTotal,
    mes, anio 
FROM emerald2.internos 
WHERE mes= m 
AND anio=a 
AND id_depto=d
GROUP BY interno,usuario
ORDER BY interno,usuario;
  

END ;

