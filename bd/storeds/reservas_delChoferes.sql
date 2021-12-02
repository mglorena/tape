


DROP PROCEDURE IF EXISTS `reservas_delChoferes`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_delChoferes`(
IN reId INT
)
BEGIN

   DELETE FROM transReservaChofer WHERE ReservaId = reId;

END ;

