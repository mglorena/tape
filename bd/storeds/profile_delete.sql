


DROP PROCEDURE IF EXISTS `profile_delete`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `profile_delete`(
IN pId INT
)
BEGIN

   DELETE FROM Profiles WHERE ProfileId = pId;

END ;

