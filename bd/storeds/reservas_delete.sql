


DROP PROCEDURE IF EXISTS `reservas_delete`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_delete`(
IN reId INT
)
BEGIN

  /** Indicar que fue enviada a papelera**/ 
   
    UPDATE Reservas SET Papelera = 1 WHERE ReservaId = reId;

END ;

