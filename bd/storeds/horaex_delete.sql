


DROP PROCEDURE IF EXISTS `horaex_delete`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `horaex_delete`(
IN heId INT
)
BEGIN
DELETE FROM Descansos WHERE HoraExId = heId;
DELETE FROM HorasExtra WHERE HoraExId = heId;

END ;

