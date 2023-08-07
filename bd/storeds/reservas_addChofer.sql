


DROP PROCEDURE IF EXISTS `reservas_addChofer`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_addChofer`(
IN reId INT,
IN chId INT
)
BEGIN

    INSERT INTO transReservaChofer(ReservaId,ChoferId)
    VALUES
    (reId,chId);
END ;

