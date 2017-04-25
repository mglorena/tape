


DROP PROCEDURE IF EXISTS `reservas_update`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_update`(
IN des VARCHAR(200),
IN soli VARCHAR(200),
IN esoli VARCHAR(200),
IN auto VARCHAR(200),
IN veId INT,
IN feIni DATETIME,
IN horaIni DATETIME,
IN feFin DATETIME,
IN horaFin DATETIME,
IN obs VARCHAR(400),
IN file VARCHAR(100),
IN np INT,
IN eId INT,
IN mant BIT,
IN gast FLOAT,
IN dist INT,
IN reId INT,
IN uId varchar(100)

)
BEGIN
UPDATE `Reservas`
SET
`Destino` = des,
`Solicitante` = soli,
`EmailSolicitante` = esoli,
`AutorizadoPor` = auto,
`VehiculoId` = veId,
`FechaInicio` = feIni,
`HoraSalida` = horaIni,
`FechaFin` =  feFin,
`HoraLlegada` = horaFin,
`Observacion` = obs,
`FileName` = file,
`NumPasajeros` = np,
`EstadoId` = eId,
`Mantenimiento` = mant,
`GastoTotal` = gast,
Distancia = dist,
UserId = uId,
FechaMod = CURDATE()
WHERE ReservaId = reId;

END ;

