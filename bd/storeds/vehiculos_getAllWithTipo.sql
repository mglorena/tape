


DROP PROCEDURE IF EXISTS `vehiculos_getAllWithTipo`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_getAllWithTipo`()
BEGIN
SET NAMES 'utf8';
SELECT VehiculoId, CONCAT(Nombre," - ",Modelo,"  ",Patente, "  Cap: ", Capacidad) as Modelo 
FROM Vehiculos
INNER JOIN TipoVehiculo ON Vehiculos.TipoVehiculoId = TipoVehiculo.TipoVehiculoId
ORDER BY Nombre desc;
END ;

