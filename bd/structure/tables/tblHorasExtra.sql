
CREATE TABLE IF NOT EXISTS   `HorasExtra` (
  `HoraExId` int(11) NOT NULL AUTO_INCREMENT,
  `ChoferId` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Entrada` time NOT NULL,
  `Salida` time NOT NULL,
  `Concepto` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Calculado` bit(1) DEFAULT b'0',
  `Zona` int(11) NOT NULL DEFAULT '1',
  `TotalHoras` float DEFAULT NULL,
  `DependenciaId` int(11) NOT NULL,
  `Create` datetime NOT NULL,
  `Modified` datetime NOT NULL,
  `VehiculoId` tinyint(4) NOT NULL,
  `TMEntrada` time DEFAULT NULL,
  `TMSalida` time DEFAULT NULL,
  `TTEntrada` time DEFAULT NULL,
  `TTSalida` time DEFAULT NULL,
  `Responsable` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Hora50` time DEFAULT NULL,
  `Hora100` time DEFAULT NULL,
  `Jornada` bit(1) DEFAULT NULL,
  PRIMARY KEY (`HoraExId`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
