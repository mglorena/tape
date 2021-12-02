use tapelorena;
CREATE TABLE `Rubros` (
  `RubroId` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `RubroPadreId` int(11) DEFAULT NULL,
  PRIMARY KEY (`RubroId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
