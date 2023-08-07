
CREATE TABLE IF NOT EXISTS   `llamadas` (
  `interno` int(4) unsigned NOT NULL DEFAULT '0',
  `fecha` date NOT NULL DEFAULT '0000-00-00',
  `hora` time NOT NULL DEFAULT '00:00:00',
  `tiempo` time DEFAULT NULL,
  `nromarcado` text CHARACTER SET latin1,
  `localidad` text CHARACTER SET latin1,
  `tipo` text CHARACTER SET latin1,
  `costo` double(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
