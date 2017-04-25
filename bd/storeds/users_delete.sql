


DROP PROCEDURE IF EXISTS `users_delete`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_delete`(
IN uId INT
)
BEGIN

   DELETE FROM Users WHERE UserId = uId;

END ;

