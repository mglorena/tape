


DROP PROCEDURE IF EXISTS `emerald_byInterno`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `emerald_byInterno`(
IN d INT,
IN m INT,
IN a INT,
IN i INT
)
BEGIN

IF (i = 0)
THEN
    SET NAMES 'utf8';

    SELECT 
        interno,
        usuario,
        cantllam,
        tiempo,
        costo 
    FROM emerald2.internos 
    WHERE mes= m 
    AND anio=a 
    AND id_depto=d
    ORDER BY interno,usuario;
ELSE
SET NAMES 'utf8';

    SELECT 
        interno,
        usuario,
        cantllam,
        tiempo,
        costo 
    FROM emerald2.internos 
    WHERE mes= m 
    AND anio=a 
    AND interno = i
    ORDER BY interno,usuario;
END IF;
END ;

