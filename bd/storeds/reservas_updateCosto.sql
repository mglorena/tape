


DROP PROCEDURE IF EXISTS `reservas_updateCosto`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_updateCosto`(
IN costo Float,
IN reId INT
)
BEGIN

UPDATE `Reservas`
SET
`GastoTotal` = costo
WHERE ReservaId = reId;

END ;

