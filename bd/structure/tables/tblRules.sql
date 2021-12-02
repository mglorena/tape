CREATE TABLE IF NOT EXISTS   `Rules` (
  `RuleId` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`RuleId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
