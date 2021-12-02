


DROP PROCEDURE IF EXISTS `servicios_reporte`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `servicios_reporte`(

IN m INT,
IN a INT,
IN t INT

)
BEGIN
DECLARE aa INT;
DECLARE mm INT;
SET NAMES 'utf8';
IF(m = 1) THEN SET aa = a - 1; SET mm = 12; ELSE SET aa = a; SET mm = m; END IF;

SELECT

   `Servicios`.`ServicioId`,
    `Servicios`.`Medidor`,
    `Servicios`.`Usuario`,
    `ServiciosConsumo`.`Mes`,
    `ServiciosConsumo`.`Anio`,
    `Servicios`.`TipoServicioId`,
    `TipoServicio`.`CargoFijo`,
    `ServiciosConsumo`.`Medicion`,
     s.Medicion as 'MedAnterior',
     (ServiciosConsumo.Medicion - s.Medicion ) as Consumo,
     CASE WHEN Servicios.Paga = 1 THEN 'Si' ELSE 'No' END as Paga,
     CASE WHEN ServiciosConsumo.Medicion = 0 THEN  0 
          WHEN ServiciosConsumo.Medicion is NULL THEN  0
     ELSE
         (1 * TipoServicio.CargoFijo + (ServiciosConsumo.Medicion - s.Medicion ) * TipoServicio.ValorConsumo ) END AS Total
 

    FROM `Servicios`
    INNER JOIN ServiciosConsumo ON ServiciosConsumo.ServicioId = Servicios.ServicioId
    INNER JOIN TipoServicio ON TipoServicio.TipoServicioId = Servicios.TipoServicioId
    INNER JOIN ServiciosConsumo s ON s.ServicioId = Servicios.ServicioId
    WHERE
       Servicios.Todo = 0
    AND
      (ServiciosConsumo.Mes = m)
    AND
      (ServiciosConsumo.Anio = a)
    AND
      (Servicios.TipoServicioId = t)
    AND 
      (s.Mes = mm - 1)
    AND
      (s.Anio = aa)
    AND Servicios.Active = 1
;
   
   
END ;

