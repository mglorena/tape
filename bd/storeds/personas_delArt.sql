


DROP PROCEDURE IF EXISTS `personas_DelArt`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_DelArt`(IN pId INT,
IN f DATETIME)
BEGIN

DELETE FROM transArticuloPersona WHERE PersonaId = pId AND   DATE(Fecha) = DATE(f);

END ;

