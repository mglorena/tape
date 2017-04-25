
CREATE TABLE IF NOT EXISTS `Articulos` (
  `ArticuloId` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Descripcion` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Limite` int(11) DEFAULT NULL,
  PRIMARY KEY (`ArticuloId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
