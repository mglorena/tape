


DROP PROCEDURE IF EXISTS `profile_insert`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `profile_insert`(
IN n varchar(200),
IN a BIT
)
BEGIN

    INSERT INTO Profiles (Name,Active)
    VALUES(n,a); 
    
END ;

