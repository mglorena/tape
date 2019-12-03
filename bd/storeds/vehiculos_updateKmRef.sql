


DROP PROCEDURE IF EXISTS `vehiculos_updateKmRef`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_updateKmRef`()
BEGIN

UPDATE Vehiculos SET KilometrajeRef = Kilometraje
WHERE Kilometraje > KilometrajeRef;

END ;

