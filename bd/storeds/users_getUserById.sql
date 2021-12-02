


DROP PROCEDURE IF EXISTS `users_getByUserId`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_getByUserId`(
IN uId INT
)
BEGIN
SET NAMES 'utf8';
SELECT * FROM Users where UserId= uId;
END ;

