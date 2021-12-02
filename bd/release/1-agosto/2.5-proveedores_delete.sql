DROP PROCEDURE IF EXISTS `proveedores_delete`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proveedores_delete`(
IN prId INT
)
BEGIN
DELETE FROM transProveedorRubro WHERE ProveedorId = prId;
DELETE FROM Proveedores WHERE ProveedorId = prId;
END