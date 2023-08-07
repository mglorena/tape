


DROP PROCEDURE IF EXISTS `horaex_insDesc`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `horaex_insDesc`(
IN heId INT,
IN e TIME,
IN s TIME
)
BEGIN
    INSERT INTO Descansos
    (`Entrada`,`Salida`,`HoraExId`)
    VALUES
    (e,s,heId);
END ;

