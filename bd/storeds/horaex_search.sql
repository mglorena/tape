


DROP PROCEDURE IF EXISTS `horaex_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `horaex_search`(
IN mes INT,
IN anio INT,
IN chId INT,
IN dep INT

)
BEGIN


IF(chId = 0 ) THEN SET chId = NULL;END IF;
IF(dep = 0 ) THEN SET dep = NULL;END IF;


SET NAMES 'utf8';

 SELECT
`HorasExtra`.`HoraExId`,
`HorasExtra`.`ChoferId`,
HorasExtra.Fecha,
DATE_FORMAT(HorasExtra.Fecha,"%d/%m/%y") as FechaG,
DATE_FORMAT(HorasExtra.Entrada,"%H:%i") as Entrada,
DATE_FORMAT(HorasExtra.Salida,"%H:%i") as Salida,
DATE_FORMAT(HorasExtra.TMSalida,"%H:%i") as TMSalida,
DATE_FORMAT(HorasExtra.TMEntrada,"%H:%i") as TMEntrada,
DATE_FORMAT(HorasExtra.TTSalida,"%H:%i") as TTSalida,
DATE_FORMAT(HorasExtra.TTEntrada,"%H:%i") as TTEntrada,
REPLACE(CONCAT(DATE_FORMAT(HorasExtra.Entrada,"%H:%i"),' a ',DATE_FORMAT(HorasExtra.Salida,"%H:%i")),'00:00','24:00') as Horario,
`HorasExtra`.`Concepto`,
`HorasExtra`.`Calculado`,
`HorasExtra`.`Zona`,
Descansos.DescansoId,
`HorasExtra`.`TotalHoras`,
HorasExtra.Hora50,
HorasExtra.Hora100,
CONCAT(
    IFNULL(
        CONCAT(
            DATE_FORMAT(HorasExtra.TMEntrada,"%H:%i"),' a ',DATE_FORMAT(HorasExtra.TMSalida,"%H:%i")
               ),''
         )
     ,'',
IFNULL(
        CONCAT(
            DATE_FORMAT(HorasExtra.TTEntrada,"%H:%i"),' a ',DATE_FORMAT(HorasExtra.TTSalida,"%H:%i")
                ),''
      )
) as Laboral,
CASE 
     WHEN Jornada = 0 AND Zona = 1 THEN ''
     WHEN Jornada = 1 AND Zona = 1 THEN 'Completa' 
     WHEN Zona = 2 THEN ' '
     WHEN Jornada is NULL THEN '' END as Jornada,

`HorasExtra`.`DependenciaId`,
Dependencias.Nombre as Dependencia,
`HorasExtra`.`Create`,
`HorasExtra`.`Modified`,
`HorasExtra`.`VehiculoId`,
HorasExtra.Responsable,
 CONCAT(Choferes.LastName,', ',Choferes.FirstName) as ChoferName,
 GROUP_CONCAT(CONCAT(Descansos.Entrada," a ",Descansos.Salida) SEPARATOR ' <br/> ') as Interrupciones
FROM HorasExtra
INNER JOIN Choferes ON Choferes.ChoferId = HorasExtra.ChoferId
INNER JOIN Dependencias ON Dependencias.DependenciaId = HorasExtra.DependenciaId
LEFT JOIN Descansos ON Descansos.HoraExId = HorasExtra.HoraExId

WHERE 
      (chId is Null or HorasExtra.ChoferId = chId)
   AND
      DATE(HorasExtra.Fecha) BETWEEN DATE(CONCAT(anio,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(anio,'-',mes,'-','01'))) 
   AND
      (dep is NULL or HorasExtra.DependenciaId = dep)
GROUP BY HorasExtra.HoraExId
ORDER BY HorasExtra.Fecha,CONCAT(Choferes.LastName,', ',Choferes.FirstName),Dependencias.Nombre;
END ;

