


DROP PROCEDURE IF EXISTS `personas_update`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_update`(
IN pId INT,
IN Ap VARCHAR(150),
IN Nn VARCHAR(150),
IN l INT(11),
IN cdesc VARCHAR(150),
IN cat VARCHAR(45),
IN dom VARCHAR(150),
IN vdias INT
)
BEGIN
UPDATE `Personas`
SET
`Apellido` = Ap,
`Nombre` = Nn,
`Legajo` = l,
`CargoDesc` = cdesc,
`Categoria` = cat,
`Domicilio` = dom,
VacacionesDias = vdias
WHERE `PersonaId` =pId;

END ;

