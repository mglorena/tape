


DROP PROCEDURE IF EXISTS `horaex_byChofer`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `horaex_byChofer`(
IN chId INT
)
BEGIN
SELECT
`HorasExtra`.`HoraExId`,
`HorasExtra`.`ChoferId`,
`HorasExtra`.`Fecha`,
`HorasExtra`.`Entrada`,
`HorasExtra`.`Salida`,
`HorasExtra`.`Concepto`,
`HorasExtra`.`Calculado`,
`HorasExtra`.`DescansosId`,
`HorasExtra`.`Zona`,
`HorasExtra`.`HorasNoc`,
`HorasExtra`.`MinNoc`,
`HorasExtra`.`TotalHoras`,
`HorasExtra`.`MinTot`,
`HorasExtra`.`DependenciaId`,
`HorasExtra`.`Create`,
`HorasExtra`.`Modified`,
`HorasExtra`.`VehiculoId`
FROM HorasExtra WHERE ChoferId = chId;

END ;

