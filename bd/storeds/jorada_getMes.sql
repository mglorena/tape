


DROP PROCEDURE IF EXISTS `jornada_GetMes`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `jornada_GetMes`(
IN pId INT,
IN m INT,
IN a INT
)
BEGIN

 SELECT 
DATE_FORMAT(Fecha,"%d/%m/%y") as Fecha,
-- DATE_FORMAT(HoraEntrada,'%T') as HoraEntrada,
DATE_FORMAT(HoraSalida,'%T') as HoraSalida,
SUM(TotalHoras) as TotalHoras,
PersonaId,
GROUP_CONCAT(CONCAT(DATE_FORMAT(HoraEntrada,'%T'),' - ',DATE_FORMAT(HoraSalida,'%T')) SEPARATOR '<br/>') as Horarios
FROM ComputoHoras WHERE PersonaId = pId AND 
   DATE(Fecha) BETWEEN DATE(CONCAT(a,'-',m,'-','01'))  AND LAST_DAY( DATE(CONCAT(a,'-',m,'-','01'))) 
GROUP BY Fecha;
END ;

