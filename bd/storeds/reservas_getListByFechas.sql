


DROP PROCEDURE IF EXISTS `reservas_getListByFechas`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_getListByFechas`(
IN fI DATETIME,
IN fF DATETIME,
IN reId INT
)
BEGIN
 SET NAMES 'utf8';
    SELECT
        Reservas.ReservaId,
        Destino,
        Solicitante,
        EmailSolicitante,
        transReservaChofer.ChoferId,
        DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
        DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
        DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
        DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada,
        Reservas.VehiculoId,
        CONCAT(Vehiculos.Modelo," ",Vehiculos.Patente) as Modelo,
        GROUP_CONCAT(CONCAT(Choferes.FirstName,' ',Choferes.LastName) SEPARATOR ';') as Choferes 
    FROM
      Reservas
    INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
    INNER JOIN Choferes ON Choferes.ChoferId = transReservaChofer.ChoferId
    INNER JOIN Vehiculos ON Vehiculos.VehiculoId= Reservas.VehiculoId
    WHERE
     (
        DATE(FechaInicio) BETWEEN DATE(fI)  AND  DATE(fF)
   OR
        DATE(FechaFin) BETWEEN DATE(fI)  AND  DATE(fF)
      )
      AND 
    Reservas.ReservaId <> reId  AND Reservas.Papelera = 0
      GROUP BY Reservas.ReservaId;
END ;

