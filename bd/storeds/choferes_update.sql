


DROP PROCEDURE IF EXISTS `choferes_update`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `choferes_update`(
IN chId INT,
IN fName varchar(100),
IN lName varchar(100),
IN leg varchar(100),
IN cel varchar(100),
IN vhExtra double,
IN vhHabil double,
IN vhInhabil double,
IN a BIT
)
BEGIN  
    
    IF(chId = 0 OR chId IS NULL) 
     THEN
        INSERT INTO Choferes (FirstName,LastName,Legajo,ValorHoraExtra,ValorHoraInhabil,ValorHoraHabil,Celular,Active)
        VALUES(fName,lName,leg,vhExtra,vhInhabil,vhHabil,cel,a);
    ELSE
        UPDATE Choferes SET FirstName=fName, LastName=lName, 
        Legajo=leg,ValorHoraInhabil=vhInhabil,Celular=cel, 
        ValorHoraHabil=vhHabil, ValorHoraExtra = vhExtra, Active=a
        WHERE ChoferId = chId;
    END IF;

END ;

