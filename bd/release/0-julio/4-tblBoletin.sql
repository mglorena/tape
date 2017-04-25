
CREATE TABLE IF NOT EXISTS   `Boletin` (
  `BoletinId` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Url` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Length` int(11) DEFAULT NULL,
  `LastResNumber` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `LastLastResNumber` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `FirstResNumber` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Folder` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`BoletinId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
