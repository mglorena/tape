
CREATE TABLE IF NOT EXISTS   `transReservaChofer` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ReservaId` int(11) unsigned DEFAULT NULL,
  `ChoferId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `tblReserva_Id` (`ReservaId`),
  KEY `tblChoferes_Id` (`ChoferId`),
  CONSTRAINT `tblChoferes_Id` FOREIGN KEY (`ChoferId`) REFERENCES `Choferes` (`ChoferId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tblReserva_Id` FOREIGN KEY (`ReservaId`) REFERENCES `Reservas` (`ReservaId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
