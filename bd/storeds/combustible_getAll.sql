


DROP PROCEDURE IF EXISTS `combustible_getAll`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `combustible_getAll`()
BEGIN

  SELECT * FROM TipoCombustible;
END ;

