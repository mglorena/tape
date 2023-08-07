


DROP PROCEDURE IF EXISTS `reservas_getForCalendar`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_getForCalendar`(
IN mes Int,
IN anio Int,
IN type Int,
IN est INT

)
BEGIN
SET NAMES 'utf8';

If (type = 0 ) THEN SET type = NUll; END IF;
If (est = 0 ) THEN SET est = NUll; END IF;

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
            WHEN Reservas.EstadoId = 4  THEN 'Realizada' 
       ELSE 'Suspendida' END  as Estado,
       DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
       DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
       DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
       DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada,
       NumPasajeros,
       Vehiculos.Color as Color,
       Vehiculos.Capacidad,
       GastoTotal,
       GROUP_CONCAT(CONCAT(Choferes.FirstName," ",Choferes.LastName) SEPARATOR ' - ') as ChoferName
 FROM
    Reservas
   INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
   INNER JOIN Vehiculos ON Vehiculos.VehiculoId = Reservas.VehiculoId
   INNER JOIN Choferes ON transReservaChofer.ChoferId = Choferes.ChoferId
 WHERE
    (type is null OR Vehiculos.TipoVehiculoId = type)
   AND 
 (
    DATE(FechaInicio) BETWEEN DATE(CONCAT(anio,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(anio,'-',mes,'-','01'))) 
   OR
    DATE(FechaFin) BETWEEN DATE(CONCAT(anio,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(anio,'-',mes,'-','01'))) 
 )
  AND (est is null OR Reservas.EstadoId = est)
  AND Reservas.Papelera = 0
GROUP BY Reservas.ReservaId;
END ;

