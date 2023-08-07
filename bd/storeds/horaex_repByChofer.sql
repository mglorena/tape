


DROP PROCEDURE IF EXISTS `horaex_repByChofer`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `horaex_repByChofer`(
IN meses VARCHAR(5),
IN a INT
)
BEGIN
DECLARE c INT DEFAULT 0;
DECLARE mes INT DEFAULT 0;
call split_string(meses,',');
SELECT Count(*) FROM SplitValues INTO c;
SET lc_time_names = 'es_AR';
SET c = c + 1;

CREATE TEMPORARY TABLE RepChofer
(
 Leg INT(5) NOT NULL ,
 Nombre varchar(250),
 Mes varchar(15),
 HorasHabiles TIME,
 HorasInhabiles TIME,
 Dependencia varchar(250)
);


WHILE c > 0 DO
    SELECT value FROM SplitValues  LIMIT 1 into mes ;

    INSERT INTO RepChofer (Leg,Nombre, Mes,HorasHabiles,HorasInhabiles,Dependencia)
    SELECT 
    Legajo as Leg,
    CONCAT(FirstName,' ',LastName) as Chofer,
    CONCAT(CONVERT(MONTHNAME(HorasExtra.Fecha),char(15)),'/',CONVERT(DATE_FORMAT(HorasExtra.Fecha,'%y'),char(5))) as Mes,
    SEC_TO_TIME( SUM( TIME_TO_SEC( `Hora50` ) ) )  as 'Hs. Habiles',
    SEC_TO_TIME( SUM( TIME_TO_SEC( `Hora100` ) ) ) as 'Hs. Inhabiles',
    Dependencias.Nombre as Dependencia
    FROM 
    HorasExtra
    INNER JOIN Choferes ON Choferes.ChoferId = HorasExtra.ChoferId
    INNER JOIN Dependencias ON Dependencias.DependenciaId = HorasExtra.DependenciaId
    WHERE 
    DATE(HorasExtra.Fecha) BETWEEN DATE(CONCAT(a,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(a,'-',mes,'-','01')))
    GROUP BY Choferes.ChoferId
    ORDER BY Legajo asc, Dependencias.Nombre asc;
    DELETE FROM SplitValues WHERE value = mes;
    SET c = c-1;
END WHILE;

SELECT * FROM RepChofer;
DROP TABLE RepChofer;
END ;

