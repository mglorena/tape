DROP PROCEDURE IF EXISTS `proveedores_rubrosGetAll`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proveedores_rubrosGetAll`()
BEGIN
SELECT * FROM Rubros;
END