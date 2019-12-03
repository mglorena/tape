


DROP PROCEDURE IF EXISTS `choferes_insert`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `choferes_insert`(
IN fName varchar(100),
IN lName varchar(100),
IN leg varchar(100),
IN cel varchar(100),
IN vhInhabil float,
IN vhHabil float,
IN vhExtra double,
IN a BIT
)
BEGIN

    INSERT INTO Choferes (FirstName,LastName,Legajo,ValorHoraExtra,ValorHoraInhabil,ValorHoraHabil,Celular,Active)
    VALUES(fName,lName,leg,vhExtra,vhInhabil,vhHabil,cel,a);
    
END ;

