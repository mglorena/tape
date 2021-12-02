


DROP PROCEDURE IF EXISTS `patrimonio_update`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `patrimonio_update`(
IN patId INT,
IN l VARCHAR(45)
-- ,IN b INT
)
BEGIN

-- IF(b is NULL) THEN SET b=0; ELSE SET b=1; END IF;


UPDATE Patrimonio
SET
-- `Baja` = b,
Localizado = l
WHERE PatrimonioId = patId;


END ;

