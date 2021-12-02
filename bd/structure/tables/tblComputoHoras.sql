
CREATE TABLE IF NOT EXISTS   `ComputoHoras` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `PersonaId` int(11) NOT NULL,
  `Fecha` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `HoraEntrada` datetime DEFAULT NULL,
  `HoraSalida` datetime DEFAULT NULL,
  `TotalHoras` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
