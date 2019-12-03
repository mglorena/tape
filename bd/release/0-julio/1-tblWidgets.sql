
CREATE TABLE `Widgets` (
  `WidgetId` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Height` int(11) DEFAULT NULL,
  `Width` int(11) DEFAULT NULL,
  `Function` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`WidgetId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
