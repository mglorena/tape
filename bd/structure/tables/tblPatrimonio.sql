
CREATE TABLE IF NOT EXISTS   `Patrimonio` (
  `PatrimonioId` int(11) NOT NULL AUTO_INCREMENT,
  `Inventario` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Cta` int(11) DEFAULT NULL,
  `Sub` int(11) DEFAULT NULL,
  `Inv` int(11) DEFAULT NULL,
  `AltaDep` int(11) DEFAULT NULL,
  `AltaNro` int(11) DEFAULT NULL,
  `AltaAno` int(11) DEFAULT NULL,
  `Descripcion` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `DependenciaId` int(11) DEFAULT NULL,
  `Leg` int(11) DEFAULT NULL,
  `Responsable` varchar(155) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Baja` bit(1) DEFAULT NULL,
  `Motivo` varchar(155) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Dependencia` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Localizado` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Codigo` int(11) DEFAULT NULL,
  `Planilla` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`PatrimonioId`)
) ENGINE=InnoDB AUTO_INCREMENT=2095 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
