
CREATE TABLE IF NOT EXISTS   `Dependencias` (
  `DependenciaId` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `PadreId` int(11) DEFAULT NULL,
  PRIMARY KEY (`DependenciaId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
