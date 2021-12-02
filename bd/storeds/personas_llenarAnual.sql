


DROP PROCEDURE IF EXISTS `personas_llenarAnual`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_llenarAnual`(
IN a INT
)
BEGIN
DECLARE c INT;
DECLARE m INT;
SET NAMES 'utf8';


SET c = (SELECT COUNT(PersonaId) FROM Personas WHERE PersonaId IS NOT NULL);

WHILE c > 0 DO

     SET m = 12;
     WHILE m > 0 DO
      INSERT INTO PersonasAnio (PersonaId,Mes)
      SELECT 
            Personas.PersonaId,
            m        
      FROM Personas
      WHERE Personas.PersonaId = c;
      SET m = m - 1;
     END WHILE;
 SET c = c - 1;
  END WHILE;
END ;

