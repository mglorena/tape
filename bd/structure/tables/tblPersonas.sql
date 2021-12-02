
CREATE TABLE `Personas` (
  `PersonaId` int(11) NOT NULL AUTO_INCREMENT,
  `Apellido` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `Legajo` int(11) NOT NULL,
  `CargoDesc` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Categoria` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `Telefono` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Email` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Domicilio` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Active` bit(1) DEFAULT NULL,
  `VacacionesDias` int(11) DEFAULT NULL,
  `Observaciones` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Antiguedad` int(11) DEFAULT NULL,
  PRIMARY KEY (`PersonaId`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
