


DROP PROCEDURE IF EXISTS `servicios_update`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `servicios_update`(
IN sId INT,
IN med INT,
IN m INT,
IN a INT,
IN t INT

)
BEGIN
IF(med = 0 ) THEN Set med = NULL; END IF;
UPDATE `ServiciosConsumo`
SET
-- `Consumo` = {Consumo: },
`Medicion` = med
WHERE ServicioId = sId AND Mes = m AND Anio = a;

END ;

