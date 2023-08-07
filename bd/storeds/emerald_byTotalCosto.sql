


DROP PROCEDURE IF EXISTS `emerald_byTotalCosto`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `emerald_byTotalCosto`(
IN m INT,
IN a INT
)
BEGIN
SET NAMES 'utf8';
SELECT *
FROM (  
SELECT   
`centros`.`COMUN`,
`centros`.`JefeSec`,
`centros`.`SINDDE`,
`centros`.`PINFic`,
`centros`.`VOZDATOS`,
`centros`.`Credito`,
`centros`.`CargoConexion`,
centros.Orga as Orga,
internos.id_centro,
interno,
centros.Nombre as centrocosto,
usuario,
sec_to_time(sum(time_to_sec(tiempo))) as tiempo,
sum(cantllam) as cantllam,
sum(costo) as costo
FROM emerald2.internos 
INNER JOIN emerald2.centros on centros.id_centro = internos.id_centro 
WHERE mes=m 
AND anio=a  and centros.id_centro > 7 AND centros.id_centro < 136
GROUP BY
(internos.id_centro)


UNION ALL

SELECT   
`centros`.`COMUN`,
`centros`.`JefeSec`,
`centros`.`SINDDE`,
`centros`.`PINFic`,
`centros`.`VOZDATOS`,
`centros`.`Credito`,
`centros`.`CargoConexion`,
centros.Orga as Orga,
internos.id_centro,
interno,
centros.Nombre as centrocosto,
usuario,
'' as tiempo,
'' as cantllam,
'' as costo
FROM emerald2.internos 
INNER JOIN emerald2.centros on centros.id_centro = internos.id_centro 
WHERE 
centros.id_centro > 7 AND centros.id_centro < 136 
GROUP BY
(internos.id_centro)
) AS Data

ORDER BY Data.Orga desc, Data.id_centro asc;
END ;

