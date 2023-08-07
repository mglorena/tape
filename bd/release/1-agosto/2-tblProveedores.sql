
CREATE TABLE `Proveedores` (
  `ProveedorId` int(11) NOT NULL AUTO_INCREMENT,
  `RazonSocial` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `Domicilio` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `Observaciones` varchar(200) DEFAULT NULL,
  `Fecha` time COLLATE utf8_spanish_ci DEFAULT NULL,
  `CUIT` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Celular` varchar(20) DEFAULT NULL,
  `Telefono` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Email` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `PersonaContacto` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Localidad` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Provincia` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Active` bit(1) DEFAULT NULL,
   PRIMARY KEY (`ProveedorId`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
