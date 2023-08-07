


DROP PROCEDURE IF EXISTS `servicios_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `servicios_search`(

IN m INT,
IN a INT,
IN t INT

)
BEGIN
SET NAMES 'utf8';

IF((Select count(*) FROM ServiciosConsumo WHERE Mes = m AND Anio = a AND TipoServicioId = t) = 0)
THEN
  INSERT INTO `ServiciosConsumo`
(`ServicioId`,
`Mes`,
`Anio`,
`TipoServicioId`,
`Consumo`,
`Medicion`)
SELECT 
   DISTINCT ServicioId,m,a,t,null,null
FROM 
   Servicios
WHERE
   TipoServicioId = t AND Active = 1;
END IF;

   SELECT
    `Servicios`.`ServicioId`,
    `Servicios`.`Medidor`,
    `Servicios`.`Usuario`,
    `ServiciosConsumo`.`Mes`,
    `ServiciosConsumo`.`Anio`,
    `Servicios`.`TipoServicioId`,
    `TipoServicio`.`CargoFijo`,
    ifnull(`ServiciosConsumo`.`Medicion`,'') as Medicion,
     CASE WHEN Servicios.Paga = 1 THEN 'Si' ELSE 'No' END as Paga
    FROM `Servicios`
    INNER JOIN ServiciosConsumo ON ServiciosConsumo.ServicioId = Servicios.ServicioId
    INNER JOIN TipoServicio ON TipoServicio.TipoServicioId = Servicios.TipoServicioId
    WHERE
       Servicios.Todo = 0
    AND
      (Mes = m)
    AND
      (Anio = a)
    AND
      (Servicios.TipoServicioId = t) AND Servicios.Active = 1;
   
   
END ;

