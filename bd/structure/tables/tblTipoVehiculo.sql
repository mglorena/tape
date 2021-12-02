
CREATE TABLE IF NOT EXISTS   `TipoVehiculo` (
  `TipoVehiculoId` int(11) NOT NULL,
  `Nombre` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ValorPeajexKm` float DEFAULT NULL,
  PRIMARY KEY (`TipoVehiculoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
