


DROP PROCEDURE IF EXISTS `vehiculos_getById`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_getById`(
IN veId INT
)
BEGIN
SET NAMES 'utf8';
SELECT `Vehiculos`.`VehiculoId`,
    `Vehiculos`.`Modelo`,
    `Vehiculos`.`Patente`,
    `Vehiculos`.`Capacidad`,
    `Vehiculos`.`CombustibleId`,
    `Vehiculos`.`Descripcion`,
    `Vehiculos`.`ConsumoxKM`,
    `Vehiculos`.`Color`,
    Kilometraje,
    TipoVehiculoId,
Fecha,
   CASE Active WHEN 1 THEN 'SI' ELSE 'NO' END as Active
   FROM Vehiculos where VehiculoId= veId;
END ;

