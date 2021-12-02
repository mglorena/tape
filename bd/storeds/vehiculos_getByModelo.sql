


DROP PROCEDURE IF EXISTS `vehiculos_getByModelo`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_getByModelo`(
IN modle varchar(100)

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
    `Vehiculos`.`Active`,
    Fecha FROM Vehiculos 
   WHERE 
    (Modelo COLLATE utf8_spanish_ci LIKE CONCAT(modle,'%'));
    
END ;

