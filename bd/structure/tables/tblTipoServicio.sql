
CREATE TABLE IF NOT EXISTS   `TipoServicio` (
  `TipoServicioId` int(11) NOT NULL,
  `Nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `CargoFijo` float DEFAULT NULL,
  `ValorConsumo` float DEFAULT NULL,
  `Unidad` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`TipoServicioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
