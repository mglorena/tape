


DROP PROCEDURE IF EXISTS `horaex_repByDep`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `horaex_repByDep`(
IN meses VARCHAR(5),
IN a INT
)
BEGIN
DECLARE c INT DEFAULT 0;
DECLARE mes INT DEFAULT 0;
DECLARE b INT DEFAULT 0;
call split_string(meses,',');
SELECT Count(*) FROM SplitValues INTO c;
SET lc_time_names = 'es_AR';
SET c = c + 1;

CREATE TEMPORARY TABLE RepDep
(
 Dependencia varchar(250),
 MesNumber INT,
 Mes varchar(15),
 HorasHabiles TIME,
 HorasInhabiles TIME

);


WHILE c > 0 DO
    SELECT value FROM SplitValues  LIMIT 1 into mes ;

   

    INSERT INTO RepDep (Dependencia,MesNumber,Mes,HorasHabiles,HorasInhabiles)
    SELECT 
       
        Dependencias.Nombre as Dependencia,
        MONTH(HorasExtra.Fecha),
        CONCAT(CONVERT(MONTHNAME(HorasExtra.Fecha),char(15)),'/',CONVERT(DATE_FORMAT(HorasExtra.Fecha,'%y'),char(5))) as Mes,
        SEC_TO_TIME( SUM( TIME_TO_SEC( `Hora50` ) ) )  as 'Hs. Habiles',
        SEC_TO_TIME( SUM( TIME_TO_SEC( `Hora100` ) ) ) as 'Hs. Inhabiles'
   
    FROM 
    HorasExtra
    INNER JOIN Dependencias ON Dependencias.DependenciaId = HorasExtra.DependenciaId
    WHERE 
    DATE(HorasExtra.Fecha) BETWEEN DATE(CONCAT(a,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(a,'-',mes,'-','01')))
    GROUP BY Dependencias.Nombre
    ORDER BY Dependencias.Nombre asc;
    DELETE FROM SplitValues WHERE value = mes;
    SET c = c-1;
END WHILE;

SELECT * FROM RepDep GROUP BY Dependencia, Mes , HorasHabiles, HorasInhabiles 
ORDER BY Dependencia asc,MesNumber ;
DROP TABLE RepDep;
END ;

