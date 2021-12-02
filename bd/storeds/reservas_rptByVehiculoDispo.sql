


DROP PROCEDURE IF EXISTS `reservas_rptVehiculoDispo`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_rptVehiculoDispo`(
IN desde DATE,
IN hasta DATE,
IN veId INT
)
BEGIN

SET NAMES 'utf8';

If (veId = 0 ) THEN SET veId = NUll; END IF;

 SELECT 
       Reservas.ReservaId, DATE(desde) as desde, DATE(hasta) as hasta,
       Destino,
       Solicitante,
       EmailSolicitante,
       FileName,
       AutorizadoPor,
       Vehiculos.TipoVehiculoId as Tipo,
       Vehiculos.VehiculoId,
       Vehiculos.Capacidad,
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
    (veId is null OR Vehiculos.VehiculoId = veId)
 
 AND 
 
   (
        DATE(FechaInicio) BETWEEN DATE(desde)  AND  DATE(hasta) 
    )

    
  AND Reservas.Papelera = 0
GROUP BY Reservas.ReservaId
ORDER BY Vehiculo,DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y"),Solicitante;
END ;

