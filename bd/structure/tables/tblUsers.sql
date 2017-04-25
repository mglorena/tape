
CREATE TABLE IF NOT EXISTS   `Users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Password` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `FirstName` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `LastName` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Email` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `ProfileId` int(10) DEFAULT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
