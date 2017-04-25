


DROP PROCEDURE IF EXISTS `reservas_getByVehiculoId`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_getByVehiculoId`(

IN veId INT
)
BEGIN
SET NAMES 'utf8';
SELECT
`Reservas`.`ReservaId`,
`Reservas`.`Destino`,
`Reservas`.`Solicitante`,
`Reservas`.`EmailSolicitante`,
`Reservas`.`AutorizadoPor`,
`Reservas`.`VehiculoId`,
`Reservas`.`Observacion`,
`Reservas`.`FileName`,
`Reservas`.`NumPasajeros`,
`Reservas`.`EstadoId`,
`Reservas`.`Distancia`,
`Reservas`.`PrecioCombustible`,
`Reservas`.`Mantenimiento`,
`Reservas`.`GastoTotal`,
GROUP_CONCAT(Choferes.ChoferId) as ChoferesIds,
GROUP_CONCAT(CONCAT (Choferes.FirstName ,'  ',Choferes.LastName)) as Choferes,
  DATE_FORMAT(`Reservas`.`FechaCreacion` ,"%d/%m/%Y") as FechaCreacion,
 DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
 DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
 DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
 DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada
FROM `Reservas`

   INNER JOIN Vehiculos ON Vehiculos.VehiculoId = Reservas.VehiculoId  
   INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
   INNER JOIN Choferes ON Choferes.ChoferId = transReservaChofer.ChoferId
WHERE VehiculoId = veId  AND Reservas.Papelera = 0
GROUP BY Reservas.ReservaId;
END ;

