
CREATE TABLE IF NOT EXISTS   `Bienes` (
  `InsumoId` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Caracteristicas` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `NroInv` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `FechaIngreso` date DEFAULT NULL,
  `FechaEgreso` date DEFAULT NULL,
  `CategoriaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`InsumoId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
