


DROP PROCEDURE IF EXISTS `patrimonio_getAllDep`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `patrimonio_getAllDep`()
BEGIN
SET NAMES 'utf8';

SELECT DISTINCT DependenciaId , Dependencia as Nombre
FROM Patrimonio;

END ;

