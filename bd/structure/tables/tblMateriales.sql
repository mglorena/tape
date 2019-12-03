
CREATE TABLE IF NOT EXISTS   `Materiales` (
  `MatId` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Codigo` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `Tipo` int(11) NOT NULL,
  `FechaIngreso` datetime DEFAULT NULL,
  `PrecioUnitario` float DEFAULT NULL,
  `Unidad` int(11) NOT NULL,
  `Rubro` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `StockMin` int(11) DEFAULT NULL,
  `StockMax` int(11) DEFAULT NULL,
  PRIMARY KEY (`MatId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
