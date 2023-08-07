


DROP PROCEDURE IF EXISTS `vehiculos_getAll`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_getAll`()
BEGIN
SET NAMES 'utf8';
SELECT VehiculoId, CONCAT(Modelo," - ",Patente) as Modelo FROM Vehiculos;
END ;

