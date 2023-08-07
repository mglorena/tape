


DROP PROCEDURE IF EXISTS `users_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_search`(
 IN uId INT,
 IN uName varchar(200),
 IN fName varchar(100),
 IN lName varchar(100),
 IN e varchar(200),
 IN pId INT,
 IN a BIT 

)
BEGIN
  
  SELECT
    `Users`.`UserId`,
    `Users`.`UserName`,
    `Users`.`Password`,
    `Users`.`FirstName`,
    `Users`.`LastName`,
    `Users`.`Email`,
    `Users`.`ProfileId`,
    CASE WHEN Users.Active = 1 THEN 'Si' ELSE 'No' END as Active,
Profiles.Name as Profile
FROM `Users`
INNER JOIN Profiles ON Profiles.ProfileId = Users.ProfileId
 
   WHERE 
      (uId is Null or Users.UserId = uId)
   AND
     (pId is Null or Users.ProfileId = pId)
   AND
     (a is Null or Users.Active = a)
   AND
      (fName is NULL or Users.FirstName COLLATE utf8_spanish_ci like concat(fName,'%'))
   AND
      (lName is NULL or Users.LastName COLLATE utf8_spanish_ci like concat(lName,'%'))
   AND
      (e is NULL or Users.Email COLLATE utf8_spanish_ci like concat(e,'%'))
   AND
      (uName is NULL or Users.UserName COLLATE utf8_spanish_ci like concat(uName,'%'));
END ;

