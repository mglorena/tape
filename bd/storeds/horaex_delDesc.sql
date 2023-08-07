


DROP PROCEDURE IF EXISTS `horaex_delDesc`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `horaex_delDesc`(
IN heId INT
)
BEGIN
DELETE FROM Descansos
WHERE HoraExId = heId;

END ;

