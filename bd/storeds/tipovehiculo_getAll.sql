


DROP PROCEDURE IF EXISTS `tipovehiculo_getAll`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `tipovehiculo_getAll`()
BEGIN

    SELECT * FROM TipoVehiculo;
END ;

