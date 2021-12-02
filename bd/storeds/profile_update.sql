


DROP PROCEDURE IF EXISTS `profile_update`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `profile_update`(
IN pId INT,
IN n varchar(200),
IN a BIT
)
BEGIN

    UPDATE Profiles SET Name=n,Active=a
    WHERE ProfileId = pId;
END ;

