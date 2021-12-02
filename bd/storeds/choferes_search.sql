


DROP PROCEDURE IF EXISTS `choferes_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `choferes_search`(
 IN chId INT,
 IN fName varchar(100),
 IN lName varchar(100),
 IN leg INT,
 IN a BIT 

)
BEGIN
SET NAMES 'utf8';
  SELECT
`Choferes`.`ChoferId`,
`Choferes`.`FirstName`,
`Choferes`.`LastName`,
`Choferes`.`Legajo`,
`Choferes`.`Celular`,
`Choferes`.`HorarioLab`,
`Choferes`.`ValorHoraInhabil`,
`Choferes`.`ValorHoraHabil`,
`Choferes`.`ValorHoraExtra`,
CASE WHEN Active = 1 THEN 'Si' ELSE 'No' END as Active
FROM `Choferes`  WHERE 
      (chId is Null or Choferes.ChoferId = chId)
   AND
     (a is Null or Choferes.Active = a)
   AND
      (fName is NULL or Choferes.FirstName COLLATE utf8_spanish_ci like concat(fName,'%'))
   AND
      (lName is NULL or Choferes.LastName COLLATE utf8_spanish_ci like concat(lName,'%'))
   AND
      (leg is NULL or Choferes.Legajo =leg);
   
END ;

