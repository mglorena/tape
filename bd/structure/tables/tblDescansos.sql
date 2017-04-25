
CREATE TABLE IF NOT EXISTS   `Descansos` (
  `DescansoId` int(11) NOT NULL AUTO_INCREMENT,
  `Entrada` time DEFAULT NULL,
  `Salida` time DEFAULT NULL,
  `HoraExId` int(11) NOT NULL,
  PRIMARY KEY (`DescansoId`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
