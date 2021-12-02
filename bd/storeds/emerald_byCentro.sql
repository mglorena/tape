


DROP PROCEDURE IF EXISTS `emerald_byCentro`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `emerald_byCentro`(
 IN c INT,
 IN m INT,
 IN a INT
)
BEGIN

SELECT 
    interno,
    usuario,
    cantllam,
    tiempo,
    costo,
 `centros`.`id_centro`,
`centros`.`centrocosto`,
`centros`.`Nombre`,
`centros`.`Orga`,
`centros`.`COMUN`,
`centros`.`JEFE-SEC`,
`centros`.`SINDDE`,
`centros`.`PIN-FIC`,
`centros`.`VOZDATOS`,
`centros`.`Credito`,
`centros`.`CargoConexion`
FROM emerald2.internos 
INNER JOIN emerald2.centros ON centros.id_centro = internos.id_centro
WHERE mes=m
AND anio=a
AND id_centro=c;

END ;

