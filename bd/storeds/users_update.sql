


DROP PROCEDURE IF EXISTS `users_update`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_update`(
IN uName varchar(200),
IN e varchar(200),
IN fName varchar(100),
IN lName varchar(100),
IN pId INT,
IN a BIT,
IN uId INT,
IN pass varchar(20)
)
BEGIN
 IF(uId = 0 OR uId IS NULL) 
     THEN
        INSERT INTO Users (UserName,FirstName, LastName,Email,ProfileId,Password, Active)
        VALUES(uName, fName, lName,e,pId,pass,a); 
    ELSE
         UPDATE Users SET UserName=uName, FirstName=fName, LastName=lName,Email=e, ProfileId=pId, Active=a, Password=pass
         WHERE UserId = uId;
    END IF;
       
   
END ;

