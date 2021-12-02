
CREATE TABLE IF NOT EXISTS   `Profiles` (
  `ProfileId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ProfileId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
