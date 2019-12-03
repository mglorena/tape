


DROP PROCEDURE IF EXISTS `profile_getById`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `profile_getById`(
IN pId INT
)
BEGIN
SET NAMES 'utf8';
SELECT ProfileId,Name,CASE Active WHEN 1 THEN 'SI' ELSE 'NO' END as Active FROM Profiles where ProfileId= pId;
END ;

