


DROP PROCEDURE IF EXISTS `profile_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `profile_search`(
 
 IN pId INT,
 IN n varchar(200), 
 IN a BIT 

)
BEGIN
  SET NAMES 'utf8';
   SELECT ProfileId,Name,CASE Active WHEN 1 THEN 'SI' ELSE 'NO' END as Active from Profiles WHERE 
     (pId is Null or Profiles.ProfileId = pId)
   AND
      (a is NULL or Profiles.Active = a)
   
   AND
      (n is NULL or Profiles.Name COLLATE utf8_spanish_ci like concat(n,'%'))
   ;
END ;

