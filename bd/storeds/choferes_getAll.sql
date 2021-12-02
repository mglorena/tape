


DROP PROCEDURE IF EXISTS `choferes_getAll`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `choferes_getAll`()
BEGIN
SET NAMES 'utf8';
SELECT ChoferId, CONCAT(LastName ,", ", FirstName," - Leg: ",Legajo) as FirstName 
FROM Choferes
WHERE Active=1
;
END ;

