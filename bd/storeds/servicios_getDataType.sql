


DROP PROCEDURE IF EXISTS `servicios_getDataType`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `servicios_getDataType`(
IN t INT

)
BEGIN
SELECT
`TipoServicio`.`TipoServicioId`,
`TipoServicio`.`Nombre`,
`TipoServicio`.`CargoFijo`,
`TipoServicio`.`ValorConsumo`,
  Unidad
FROM `TipoServicio`
WHERE TipoServicioId = t
;

END ;

