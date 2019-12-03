
CREATE TABLE IF NOT EXISTS   `transArticuloPersona` (
  `PersonaId` int(11) NOT NULL,
  `ArticuloId` int(11) NOT NULL,
  `Fecha` datetime NOT NULL,
  `ModDate` datetime DEFAULT NULL,
  `Data` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`PersonaId`,`ArticuloId`,`Fecha`),
  KEY `PersonaId` (`PersonaId`),
  KEY `ArticuloId` (`ArticuloId`),
  CONSTRAINT `ArticuloId` FOREIGN KEY (`ArticuloId`) REFERENCES `Articulos` (`ArticuloId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `PersonaId` FOREIGN KEY (`PersonaId`) REFERENCES `Personas` (`PersonaId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
