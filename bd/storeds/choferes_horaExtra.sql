


DROP PROCEDURE IF EXISTS `choferes_horaExtra`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `choferes_horaExtra`(
IN type INT,
IN chId INT
)
BEGIN

IF type = 0 THEN
  SELECT ValorHoraHabil,ValorHoraExtra FROM Choferes where ChoferId = chId;
END IF;

IF type = 1 THEN
  SELECT ValorHoraInhabil,ValorHoraExtra FROM Choferes where ChoferId = chId;
END IF;

END ;

