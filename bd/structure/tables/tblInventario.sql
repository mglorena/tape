
CREATE TABLE IF NOT EXISTS   `Inventario` (
  `InvId` int(11) NOT NULL,
  `MatId` int(11) NOT NULL,
  `FechaIngreso` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `FechaEgreso` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `NroOrdenId` int(11) DEFAULT NULL,
  `Saldo` int(11) NOT NULL,
  `Movimiento` int(11) DEFAULT NULL,
  PRIMARY KEY (`InvId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
