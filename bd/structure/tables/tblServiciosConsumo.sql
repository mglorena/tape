
CREATE TABLE IF NOT EXISTS   `ServiciosConsumo` (
  `ServicioId` int(11) NOT NULL,
  `Mes` int(11) NOT NULL,
  `Anio` int(11) NOT NULL,
  `Consumo` int(11) DEFAULT NULL,
  `Medicion` int(11) DEFAULT NULL,
  `TipoServicioId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ServicioId`,`Mes`,`Anio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
