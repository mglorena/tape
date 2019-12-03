


DROP PROCEDURE IF EXISTS `vehiculos_delete`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_delete`(
IN veId INT
)
BEGIN

   DELETE FROM Vehiculos WHERE VehiculoId = veId;

END ;

