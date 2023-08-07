
CREATE TABLE IF NOT EXISTS   `Servicios` (
  `ServicioId` int(11) NOT NULL AUTO_INCREMENT,
  `Medidor` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Usuario` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `TipoServicioId` int(11) DEFAULT NULL,
  `Paga` bit(1) DEFAULT b'0',
  `FechaMod` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Todo` bit(1) DEFAULT b'0',
  `Active` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ServicioId`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
