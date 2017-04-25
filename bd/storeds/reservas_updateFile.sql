


DROP PROCEDURE IF EXISTS `reservas_updateFile`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_updateFile`(
 IN file VARCHAR(200),
 IN reID int

)
BEGIN
UPDATE `Reservas`
SET
`FileName` = file
WHERE ReservaId = reID;
END ;

