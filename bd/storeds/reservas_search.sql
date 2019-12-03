


DROP PROCEDURE IF EXISTS `reservas_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_search`(
IN dia DATETIME,
IN mes Int,
IN anio Int,
IN type Int,
IN est INT

)
BEGIN
SET NAMES 'utf8';
If (MONTH(dia)=0) 
    THEN SET dia = NUll; 
ELSE 
         SET anio = NULL; 
END IF;
If (type = 0 ) THEN SET type = NUll; END IF;
If (est = 0 ) THEN SET est = NUll; END IF;
/*
SELECT  dia,mes,anio,type,est INTO OUTFILE '/tmp/mailreservas16.txt' 
              FIELDS TERMINATED by '\r\n' ESCAPED BY '';*/
 SELECT 
       Reservas.ReservaId,
       Destino,
       Solicitante,
       EmailSolicitante,
       FileName,
       AutorizadoPor,
       Vehiculos.TipoVehiculoId as Tipo,
       Vehiculos.VehiculoId,
       CONCAT(Vehiculos.Modelo," ",Vehiculos.Patente) as Vehiculo,
       GROUP_CONCAT(Choferes.ChoferId) as ChoferesIds,
       CASE 
            WHEN Reservas.EstadoId = 1 THEN 'Pendiente' 
            WHEN Reservas.EstadoId = 2  THEN 'Confirmada' 
            WHEN Reservas.EstadoId = 4  THEN 'Realizada' 
       ELSE 'Suspendida' END  as Estado,
       DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
       DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
       DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
       DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada,
       CONCAT(DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y"), " - " , DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") , " -- " , DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") , " - " , DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") ) as Periodo,
       NumPasajeros,
      --  Vehiculos.Color as Color,
      --  Vehiculos.Capacidad,
       Distancia,
       GastoTotal,
       Observacion
        ,
       GROUP_CONCAT(CONCAT(Choferes.FirstName," ",Choferes.LastName) SEPARATOR ' - ') as ChoferName
 FROM
    Reservas
   INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
   INNER JOIN Vehiculos ON Vehiculos.VehiculoId = Reservas.VehiculoId
   INNER JOIN Choferes ON transReservaChofer.ChoferId = Choferes.ChoferId
 WHERE
    (type is null OR Vehiculos.TipoVehiculoId = type)
 AND (dia is null OR ((DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") = DATE_FORMAT(dia,"%d/%m/%Y")) OR (DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") = DATE_FORMAT(dia,"%d/%m/%Y"))))
 AND 
 ( anio is NULL OR 
   (
        DATE(FechaInicio) BETWEEN DATE(CONCAT(anio,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(anio,'-',mes,'-','01'))) 
    OR
        DATE(FechaFin) BETWEEN DATE(CONCAT(anio,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(anio,'-',mes,'-','01'))) 
   )
)
  AND (est is null OR Reservas.EstadoId = est)
  
  AND Reservas.Papelera = 0
GROUP BY Reservas.ReservaId
ORDER BY Vehiculo,DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y"),Solicitante;
END ;

