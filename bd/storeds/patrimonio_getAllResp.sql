


DROP PROCEDURE IF EXISTS `patrimonio_getAllResp`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `patrimonio_getAllResp`()
BEGIN
SET NAMES 'utf8';
SELECT DISTINCT Leg, Responsable FROM Patrimonio
ORDER BY Responsable ASC
;

END ;

