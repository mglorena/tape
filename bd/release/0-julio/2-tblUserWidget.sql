
CREATE TABLE `UserWidget` (
  `UserId` int(11) NOT NULL,
  `WidgetId` int(11) NOT NULL,
  PRIMARY KEY (`UserId`,`WidgetId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
