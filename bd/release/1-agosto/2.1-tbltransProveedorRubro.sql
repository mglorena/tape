
CREATE TABLE `transProveedorRubro` (
  `ProveedorId` INT(11) unsigned NOT NULL,
  `RubroId` INT(11) unsigned NOT NULL,
  PRIMARY KEY (`ProveedorId`,`RubroId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
