
CREATE TABLE IF NOT EXISTS   `TipoCombustible` (
  `TipoId` int(11) NOT NULL AUTO_INCREMENT,
  `Combustible` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`TipoId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
