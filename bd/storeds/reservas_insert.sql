


DROP PROCEDURE IF EXISTS `reservas_insert`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_insert`(
IN des VARCHAR(200) ,
IN soli VARCHAR(200),
IN esoli VARCHAR(200),
IN auto VARCHAR(200),
IN veId INT,
IN feIni DATETIME,
IN horaIni DATETIME,
IN feFin DATETIME,
IN horaFin DATETIME,
IN np INT,
IN eId INT,
IN obs VARCHAR(400),
IN file VARCHAR(100),
IN mant BIT,
IN dist INT,
IN uId varchar(100)


)
BEGIN

INSERT INTO `Reservas`(
`Destino`,`Solicitante`,`EmailSolicitante`,`AutorizadoPor`,
`VehiculoId`,`FechaInicio`,`HoraSalida`,
`FechaFin`,`HoraLlegada`,`Observacion`,`FileName`,
`NumPasajeros`,
`EstadoId`,
`PrecioCombustible`,
`FechaCreacion`,
`Mantenimiento`,
`GastoTotal`,
Distancia,
`UserId`)
VALUES
(
 des ,
 soli ,
 esoli ,
 auto ,
 veId ,
 feIni,
 horaIni,
 feFin,
 horaFin,
 obs ,
 file ,
 np ,
 eId ,
  0,
CURDATE(),
 mant ,
0,
dist,
uId 
);

SELECT LAST_INSERT_ID() as Id;

END ;

