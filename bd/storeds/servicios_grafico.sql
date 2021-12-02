


DROP PROCEDURE IF EXISTS `servicios_grafico`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `servicios_grafico`(

IN a INT,
IN t INT
)
BEGIN
DECLARE aa INT;
DECLARE c INT;
DECLARE cc INT;
SET c = 12;
SET aa = a; -- 2013
SET cc = c; -- 12

CREATE TEMPORARY TABLE Grafic
(
  Mes INT(2) NOT NULL,
  Mes2 INT(2) NOT NULL,
 Anio INT(2) NOT NULL,
 Anio2 INT(2) NOT NULL,
  Consumo INT(11),
 Med1 INT(11),
 Med2 INT(11)
);


WHILE c > 0 DO

   IF(c = 1 ) THEN SET cc = 12; SET aa = a - 1; END IF; -- aa= 2012
   -- SELECT c, cc, aa, a;
   INSERT INTO Grafic (Mes,Mes2,Anio,Anio2,Consumo,Med1,Med2)
   SELECT
    c,cc,a,aa,
    CASE WHEN (SUM(ServiciosConsumo.Medicion) - SUM(s.Medicion) ) < 0 THEN 0 ELSE (SUM(ServiciosConsumo.Medicion) - SUM(s.Medicion) ) END as Consumo,
    SUM(ServiciosConsumo.Medicion),
    SUM(s.Medicion)

    FROM `Servicios`
    INNER JOIN ServiciosConsumo ON ServiciosConsumo.ServicioId = Servicios.ServicioId
    INNER JOIN TipoServicio ON TipoServicio.TipoServicioId = Servicios.TipoServicioId
    INNER JOIN ServiciosConsumo s ON s.ServicioId = Servicios.ServicioId AND TipoServicio.TipoServicioId = s.TipoServicioId
    WHERE
     Servicios.Todo = 0
     AND
     ServiciosConsumo.Mes = c
     AND
      (ServiciosConsumo.Anio = a)
    AND TipoServicio.TipoServicioId = t
    
    AND 
      (s.Mes =  cc) -- 12
   
    AND
     (s.Anio = ServiciosConsumo.Anio AND s.Anio = aa)
    AND Servicios.Active = 1;

    IF(c = 1 ) THEN SET aa = a; END IF;

    SET c = c - 1 ;
    SET cc = c - 1 ;

END WHILE;

SELECT * FROM Grafic ORDER BY Mes asc;

DROP TABLE Grafic;

END ;

