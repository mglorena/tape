


DROP PROCEDURE IF EXISTS `reservas_getPendientes`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_getPendientes`()
BEGIN
     SELECT 
       Reservas.ReservaId,
       Destino,
       Solicitante,
       EmailSolicitante,
       AutorizadoPor,
       Vehiculos.TipoVehiculoId as Tipo,
       CONCAT(Vehiculos.Modelo," ",Vehiculos.Patente) as Vehiculo,
       CASE 
            WHEN Reservas.EstadoId = 1 THEN 'Pendiente' 
            WHEN Reservas.EstadoId = 2  THEN 'Confirmada' 
       ELSE 'Suspendida' END  as Estado,
       DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
       DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
       DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
       DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada,
       NumPasajeros,
       Vehiculos.Color as Color,
       Vehiculos.Capacidad,
       GROUP_CONCAT(CONCAT(Choferes.FirstName," ",Choferes.LastName) SEPARATOR ' - ') as Choferes
 FROM
    Reservas
   INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
   INNER JOIN Vehiculos ON Vehiculos.VehiculoId = Reservas.VehiculoId
   INNER JOIN Choferes ON transReservaChofer.ChoferId = Choferes.ChoferId
 WHERE
     
        DATEDIFF(CURDATE(),FechaInicio) > -7  AND Reservas.Papelera = 0
GROUP BY Reservas.ReservaId;
END ;

