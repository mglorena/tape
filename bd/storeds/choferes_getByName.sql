


DROP PROCEDURE IF EXISTS `choferes_getByName`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `choferes_getByName`(
IN fname varchar(100),
IN lame varchar(100)
)
BEGIN
SET NAMES 'utf8';
   SELECT * FROM Choferes 
   WHERE 
    (FirstName COLLATE utf8_spanish_ci LIKE CONCAT(fName,'%'))
    OR
    (LastName COLLATE utf8_spanish_ci LIKE CONCAT(lName,'%'));
END ;

