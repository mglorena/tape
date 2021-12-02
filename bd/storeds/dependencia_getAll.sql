DROP PROCEDURE IF EXISTS `dependencia_getAll`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `dependencia_getAll`()
BEGIN
SELECT
`Dependencias`.`DependenciaId`,
`Dependencias`.`Nombre`,
`Dependencias`.`PadreId`
FROM Dependencias
ORDER BY Nombre;


END ;

