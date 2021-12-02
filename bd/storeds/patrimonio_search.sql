


DROP PROCEDURE IF EXISTS `patrimonio_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `patrimonio_search`(
IN i INT,
IN l INT,
IN d INT,
IN b INT

)
BEGIN

SET NAMES 'utf8';


If (i = 0 ) THEN SET i = NUll; END IF;
If (d = 0 ) THEN SET d = NUll; END IF;
If (l = 0 ) THEN SET l = NUll; END IF;
If (b = 2 ) THEN SET b = NUll; END IF;
/*
SELECT  dia,mes,anio,type,est INTO OUTFILE '/tmp/mailreservas16.txt' 
              FIELDS TERMINATED by '\r\n' ESCAPED BY '';*/


SELECT
`Patrimonio`.`PatrimonioId`,
`Patrimonio`.`Inventario`,
`Patrimonio`.`Cta`,
`Patrimonio`.`Sub`,
`Patrimonio`.`Inv`,
`Patrimonio`.`AltaDep`,
`Patrimonio`.`AltaNro`,
`Patrimonio`.`AltaAno`,
`Patrimonio`.`Descripcion` ,
`Patrimonio`.`DependenciaId`,
Dependencia,
`Patrimonio`.`Leg`,
`Patrimonio`.`Responsable`,
CASE WHEN `Patrimonio`.`Baja` = 0 THEN '' ELSE 'SI' END As Baja,
`Patrimonio`.`Motivo`,
 Patrimonio.Localizado
FROM Patrimonio
WHERE
(i is null OR Patrimonio.Inventario = i)
AND
(d is null OR Patrimonio.DependenciaId = d)
AND
(l is null OR Patrimonio.Leg = l)
AND
(b is null OR Patrimonio.Baja = b)
;

END ;

