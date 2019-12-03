
CREATE TABLE IF NOT EXISTS   `Choferes` (
  `ChoferId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `LastName` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Legajo` int(11) NOT NULL,
  `Celular` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `HorarioLab` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ValorHoraInhabil` float DEFAULT NULL,
  `ValorHoraHabil` float DEFAULT NULL,
  `ValorHoraExtra` float DEFAULT NULL,
  `Active` bit(1) NOT NULL DEFAULT b'1',
  `LicenciaEnf` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Licencia2` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Licencia3` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`ChoferId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
