


DROP PROCEDURE IF EXISTS `choferes_getById`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `choferes_getById`(
IN chId INT
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
CASE WHEN Active = 1 THEN true ELSE false END as Active FROM Choferes where ChoferId= chId;
END ;

