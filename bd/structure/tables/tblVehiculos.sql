
CREATE TABLE IF NOT EXISTS   `Vehiculos` (
  `VehiculoId` tinyint(4) NOT NULL AUTO_INCREMENT,
  `Modelo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Patente` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Capacidad` int(11) NOT NULL,
  `CombustibleId` tinyint(4) NOT NULL,
  `Descripcion` text CHARACTER SET utf8 COLLATE utf8_bin,
  `ConsumoxKM` float DEFAULT NULL,
  `Color` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Active` bit(1) DEFAULT b'1',
  `Fecha` int(4) DEFAULT NULL,
  `TipoVehiculoId` int(11) DEFAULT NULL,
  `Kilometraje` int(11) DEFAULT '0',
  `UserName` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `KilometrajeRef` int(11) DEFAULT NULL,
  `Chasis` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Motor` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`VehiculoId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
