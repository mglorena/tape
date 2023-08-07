
CREATE TABLE IF NOT EXISTS   `Centros` (
  `CentroId` tinyint(4) NOT NULL AUTO_INCREMENT,
  `Centrocosto` text CHARACTER SET latin1,
  `Nombre` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `Orga` int(11) DEFAULT NULL,
  `COMUN` int(11) DEFAULT NULL,
  `JefeSec` int(11) DEFAULT NULL,
  `SINDDE` int(11) DEFAULT NULL,
  `PINFic` int(11) DEFAULT NULL,
  `VOZDATOS` int(11) DEFAULT '0',
  `Credito` float DEFAULT '0',
  `CargoConexion` float DEFAULT '0',
  `Paga` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`CentroId`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
