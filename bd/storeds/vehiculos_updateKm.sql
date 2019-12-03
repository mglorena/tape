


DROP PROCEDURE IF EXISTS `vehiculos_updateKm`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_updateKm`(
IN veId INT,
IN Km INT,
IN user VARCHAR(100)
)
BEGIN
UPDATE `Vehiculos`
SET
Kilometraje = Km,
UserName = user
WHERE VehiculoId = veId;

END ;

