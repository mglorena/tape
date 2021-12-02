


DROP PROCEDURE IF EXISTS `vehiculos_checkMantenimiento`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_checkMantenimiento`(

)
BEGIN
SET NAMES 'utf8';
SELECT * FROM Vehiculos
WHERE Kilometraje > KilometrajeRef;
END ;

