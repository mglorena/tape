


DROP PROCEDURE IF EXISTS `users_getByUserName`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_getByUserName`(
IN user varchar(200)
)
BEGIN
SET NAMES 'utf8';
   SELECT * FROM Users WHERE UserName COLLATE utf8_spanish_ci LIKE CONCAT(user,'%');
END ;

