


DROP PROCEDURE IF EXISTS `personas_updateObs`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_updateObs`(IN pId INT,
IN o VARCHAR(250)

)
BEGIN
UPDATE `Personas`
SET
`Observaciones` = o
WHERE PersonaId = pId;


END ;

