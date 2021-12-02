-- MySQL dump 10.13  Distrib 5.5.24, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: tape
-- ------------------------------------------------------
-- Server version	5.5.24-9

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Choferes`
--

DROP TABLE IF EXISTS `Choferes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Choferes` (
  `ChoferId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `LastName` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Legajo` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Celular` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `HorarioLab` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `ValorHoraInhabil` float DEFAULT NULL,
  `ValorHoraHabil` float DEFAULT NULL,
  `ValorHoraExtra` float DEFAULT NULL,
  `Active` bit(1) NOT NULL DEFAULT b'1',
  `Licencia1` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `Licencia2` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `Licencia3` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`ChoferId`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Choferes`
--

LOCK TABLES `Choferes` WRITE;
/*!40000 ALTER TABLE `Choferes` DISABLE KEYS */;
INSERT INTO `Choferes` VALUES (32,'Claudio','Meriles','5424','(387)-15-5049558',NULL,111.11,111.11,111.11,'',NULL,NULL,NULL),(39,'Francisco','Aguero','1318','(387)-15-5049556',NULL,111.11,111.11,111.11,'',NULL,NULL,NULL),(40,'Federico','Lauriano','5392','(387)-15-5049561',NULL,111.11,111.11,111.11,'',NULL,NULL,NULL),(41,'Ramon','Bayón','347','(387)-15-5049568',NULL,111.11,111.11,111.11,'',NULL,NULL,NULL),(42,'Crescencio','Vivero','785','(387)-15-5049572',NULL,111.11,111.11,111.11,'',NULL,NULL,NULL),(43,'Hugo','Herrera','57000','(387)-15-5049568',NULL,111.11,111.11,111.11,'',NULL,NULL,NULL);
/*!40000 ALTER TABLE `Choferes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profiles`
--

DROP TABLE IF EXISTS `Profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Profiles` (
  `ProfileId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ProfileId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profiles`
--

LOCK TABLES `Profiles` WRITE;
/*!40000 ALTER TABLE `Profiles` DISABLE KEYS */;
INSERT INTO `Profiles` VALUES (1,'Admin',''),(2,'Invitado',''),(3,'Automotores',''),(4,'Chofer','');
/*!40000 ALTER TABLE `Profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservas`
--

DROP TABLE IF EXISTS `Reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reservas` (
  `ReservaId` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `Destino` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Solicitante` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `EmailSolicitante` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `AutorizadoPor` varchar(115) COLLATE utf8_spanish_ci DEFAULT NULL,
  `VehiculoId` tinyint(4) NOT NULL,
  `FechaInicio` datetime NOT NULL,
  `HoraSalida` datetime DEFAULT NULL,
  `FechaFin` datetime NOT NULL,
  `HoraLlegada` datetime DEFAULT NULL,
  `Observacion` varchar(400) COLLATE utf8_spanish_ci DEFAULT NULL,
  `FileName` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `NumPasajeros` int(11) DEFAULT NULL,
  `EstadoId` tinyint(4) NOT NULL,
  `Distancia` int(4) DEFAULT '1',
  `PrecioCombustible` float DEFAULT NULL,
  `FechaCreacion` datetime NOT NULL,
  `Mantenimiento` bit(1) DEFAULT b'0',
  `GastoTotal` float DEFAULT NULL,
  PRIMARY KEY (`ReservaId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservas`
--

LOCK TABLES `Reservas` WRITE;
/*!40000 ALTER TABLE `Reservas` DISABLE KEYS */;
INSERT INTO `Reservas` VALUES (1,'Formosa','Facultad de Humanidades','msms@unsa.edu.ar','Decano',1,'2012-10-01 00:00:00','0000-00-00 00:00:00','2012-11-01 00:00:00','0000-00-00 00:00:00','aeqqwqwq','',10,1,0,0,'2012-10-29 00:00:00','',NULL),(2,'CHACO','23232','2323232','2323232',3,'2012-11-01 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','wewewew','',2,1,0,0,'2012-10-29 00:00:00','',NULL),(3,'Jujuy','232','232','23232',2,'2012-10-26 00:00:00','0000-00-00 00:00:00','2012-11-02 00:00:00','0000-00-00 00:00:00','','',5,2,0,0,'2012-10-29 00:00:00','',NULL),(4,'test','test','test','test',11,'2012-10-01 00:00:00','0000-00-00 00:00:00','2012-10-24 00:00:00','0000-00-00 00:00:00','test','',2,1,0,0,'2012-10-30 00:00:00','',0);
/*!40000 ALTER TABLE `Reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rules`
--

DROP TABLE IF EXISTS `Rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Rules` (
  `RuleId` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`RuleId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rules`
--

LOCK TABLES `Rules` WRITE;
/*!40000 ALTER TABLE `Rules` DISABLE KEYS */;
INSERT INTO `Rules` VALUES (1,'VER_USER','Ver administracion de Usuarios'),(2,'UPD_USER','Modificar Usuarios'),(3,'INS_USER','Insertar Usuarios'),(4,'VER_PROFILE','Ver administracion de profiles'),(5,'UPD_PROFILE','Modificar profiles'),(6,'INS_PROFILE','Insertar profiles'),(7,'VER_STOCK','Ver stock'),(8,'UPD_STOCK','Modificar stock'),(9,'INS_STOCK','Insertar stock'),(10,'VER_AUTO','Ver automotores'),(11,'UPD_AUTO','Modificar automotores'),(12,'INS_AUTO','Insertar automotores'),(13,'VER_RES','Ver reservas'),(14,'UPD_RES','Modificar reserva'),(15,'INS_RES','Insertar reservas'),(16,'VER_VEHI','Ver vehiculos'),(17,'UPD_VEHI','Modificar Vehiculo'),(18,'INS_VEHI','Insertar Vehiculo'),(19,'VER_CHOFER','Ver choferes'),(20,'UPD_CHOFER','Modificar Choferes'),(21,'INS_CHOFER','Insertar Chofer'),(22,'VER_CALENDARIO','Ver el calendario');
/*!40000 ALTER TABLE `Rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoVehiculo`
--

DROP TABLE IF EXISTS `TipoVehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TipoVehiculo` (
  `TipoVehiculoId` int(11) NOT NULL,
  `Nombre` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ValorPeajexKm` float DEFAULT NULL,
  PRIMARY KEY (`TipoVehiculoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoVehiculo`
--

LOCK TABLES `TipoVehiculo` WRITE;
/*!40000 ALTER TABLE `TipoVehiculo` DISABLE KEYS */;
INSERT INTO `TipoVehiculo` VALUES (1,'Omnibus',0.025),(2,'Combi',0.025),(3,'Camioneta',0.025),(4,'Auto',0.3),(5,'Camion',0.3);
/*!40000 ALTER TABLE `TipoVehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Password` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `FirstName` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `LastName` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Email` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `ProfileId` int(10) DEFAULT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'mlgarcia','1234','Lorena','Garcia','mlgarcia2@unsa.edu.ar',1,''),(7,'admin','admin12','Hector','Cristofari','hcristofari@gmail.com',1,''),(10,'rovaletti','rovaletti12','Jorge','Rovaletti','jrovalet@unsa.edu.ar',1,''),(11,'invitado','invitado','Invitado','Invitado','testing@unsa.edu.ar',NULL,NULL),(12,'flauriano','flauriano12','Federico','Lauriano','s-d28@hotmail.com',4,''),(13,'auto','auto12','Automotores','Servicios','automotores@unsa.edu.ar',NULL,NULL),(14,'rovalettivip','jorge','Jorge','Rovaletti','jrovalet@unsa.edu.ar',3,''),(15,'cristofari','cristofari12','Hector','Cristofari','hcristofari@unsa.edu.ar',3,'');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehiculos`
--

DROP TABLE IF EXISTS `Vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vehiculos` (
  `VehiculoId` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `Modelo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Patente` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Capacidad` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `CombustibleId` tinyint(4) NOT NULL,
  `Descripcion` varchar(400) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ConsumoxKM` float DEFAULT NULL,
  `Color` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `Active` bit(1) DEFAULT b'1',
  `Fecha` datetime DEFAULT NULL,
  `TipoVehiculoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`VehiculoId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehiculos`
--

LOCK TABLES `Vehiculos` WRITE;
/*!40000 ALTER TABLE `Vehiculos` DISABLE KEYS */;
INSERT INTO `Vehiculos` VALUES (1,'VW17-240','FGW-922','49',1,'',0.3,'#f67855','',NULL,1),(2,'VW17-210','FFK-843','36',1,'',0.25,'#fee000','',NULL,1),(3,'VW9-150','EKK-330','24',1,'',0.16,'#0f8000','',NULL,1),(4,'VW9-150','EKK-329','24',1,'',0.16,'#4D81FB','',NULL,1),(5,'MB SPRINTER','DNG-326','15',1,'',0.125,'#AAAF89','',NULL,2),(6,'TYT SRW','LFP-977','6',4,'',0.125,'#BB8900','',NULL,1),(7,'CHEVROLET S-10','GQI-643','4',1,'',0.125,'#DEAEFF','',NULL,3),(8,'F. RANGER','HVS-126','4',1,'',0.125,'#C23324','',NULL,3),(9,'F. ECOSPORT','IGA-839','4',2,'',0.125,'#F312CC','\0',NULL,3),(10,'F. 100','UAJ-032','2',3,'',0.16,'#CDEDED','',NULL,3),(11,'RENAULT 12','UIJ-908','4',3,'',0.06,'#AAAAAA','',NULL,4),(12,'RASTROJERO FRON','VHK-130','2',1,'',0.06,'#4CB749','\0',NULL,5);
/*!40000 ALTER TABLE `Vehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transReservaChofer`
--

DROP TABLE IF EXISTS `transReservaChofer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transReservaChofer` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ReservaId` int(11) DEFAULT NULL,
  `ChoferId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transReservaChofer`
--

LOCK TABLES `transReservaChofer` WRITE;
/*!40000 ALTER TABLE `transReservaChofer` DISABLE KEYS */;
INSERT INTO `transReservaChofer` VALUES (166,2,32),(167,2,39),(169,3,40),(170,4,40),(174,1,41);
/*!40000 ALTER TABLE `transReservaChofer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transRuleProfile`
--

DROP TABLE IF EXISTS `transRuleProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transRuleProfile` (
  `ProfileId` tinyint(4) unsigned NOT NULL,
  `RuleId` tinyint(4) unsigned NOT NULL,
  PRIMARY KEY (`ProfileId`,`RuleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transRuleProfile`
--

LOCK TABLES `transRuleProfile` WRITE;
/*!40000 ALTER TABLE `transRuleProfile` DISABLE KEYS */;
INSERT INTO `transRuleProfile` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(2,22),(3,10),(3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(3,17),(3,18),(3,19),(3,20),(3,21),(3,22),(4,10),(4,11),(4,12),(4,13),(4,14),(4,15),(4,16),(4,17),(4,18),(4,22);
/*!40000 ALTER TABLE `transRuleProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tape'
--
/*!50003 DROP PROCEDURE IF EXISTS `choferes_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `choferes_delete`(
IN chId INT
)
BEGIN

   DELETE FROM Choferes WHERE ChoferId = chId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `choferes_getAll` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `choferes_getAll`()
BEGIN
SELECT ChoferId, CONCAT(FirstName ,", ", LastName) as FirstName FROM Choferes
WHERE Active=1
;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `choferes_getById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `choferes_getById`(
IN chId INT
)
BEGIN
SELECT
`Choferes`.`ChoferId`,
`Choferes`.`FirstName`,
`Choferes`.`LastName`,
`Choferes`.`Legajo`,
`Choferes`.`Celular`,
`Choferes`.`HorarioLab`,
`Choferes`.`ValorHoraInhabil`,
`Choferes`.`ValorHoraHabil`,
`Choferes`.`ValorHoraExtra`,
CASE WHEN Active = 1 THEN true ELSE false END as Active FROM Choferes where ChoferId= chId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `choferes_getByName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `choferes_getByName`(
IN fname varchar(100),
IN lame varchar(100)
)
BEGIN

   SELECT * FROM Choferes 
   WHERE 
    (FirstName COLLATE utf8_spanish_ci LIKE CONCAT(fName,'%'))
    OR
    (LastName COLLATE utf8_spanish_ci LIKE CONCAT(lName,'%'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `choferes_getDisponibles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `choferes_getDisponibles`(

IN feI DATETIME,
IN feF DATETIME,
IN reId INT

)
BEGIN
SELECT 
    Choferes.ChoferId, CONCAT(FirstName ,", ", LastName) as FirstName 
FROM Choferes
WHERE 
  Choferes. ChoferId NOT IN
(
SELECT 

Choferes.ChoferId


FROM Reservas
INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
INNER JOIN Choferes ON Choferes.ChoferId = transReservaChofer.ChoferId

   WHERE
    (
        DATE(FechaInicio) BETWEEN   DATE(feI)  AND   DATE(feF)
        OR
        DATE(FechaFin) BETWEEN   DATE(feI)  AND   DATE(feF)
    )
  AND Reservas.ReservaId <> reId
)
AND
    Active=1
GROUP BY Choferes.ChoferId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `choferes_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `choferes_insert`(
IN fName varchar(100),
IN lName varchar(100),
IN leg varchar(100),
IN cel varchar(100),
IN vhInhabil float,
IN vhHabil float,
IN vhExtra double,
IN a BIT
)
BEGIN





    INSERT INTO Choferes (FirstName,LastName,Legajo,ValorHoraExtra,ValorHoraInhabil,ValorHoraHabil,Celular,Active)
    VALUES(fName,lName,leg,vhExtra,vhInhabil,vhHabil,cel,a);
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `choferes_search` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `choferes_search`(
 IN chId INT,
 IN fName varchar(100),
 IN lName varchar(100),
 IN leg varchar(00),
 IN a BIT 

)
BEGIN
  SELECT
`Choferes`.`ChoferId`,
`Choferes`.`FirstName`,
`Choferes`.`LastName`,
`Choferes`.`Legajo`,
`Choferes`.`Celular`,
`Choferes`.`HorarioLab`,
`Choferes`.`ValorHoraInhabil`,
`Choferes`.`ValorHoraHabil`,
`Choferes`.`ValorHoraExtra`,
CASE WHEN Active = 1 THEN true ELSE false END as Active
FROM `tape`.`Choferes`  WHERE 
      (chId is Null or Choferes.ChoferId = chId)
   AND
     (a is Null or Choferes.Active = a)
   AND
      (fName is NULL or Choferes.FirstName COLLATE utf8_spanish_ci like concat(fName,'%'))
   AND
      (lName is NULL or Choferes.LastName COLLATE utf8_spanish_ci like concat(lName,'%'))
   AND
      (leg is NULL or Choferes.Legajo COLLATE utf8_spanish_ci like concat(leg,'%'));
   
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `choferes_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `choferes_update`(
IN chId INT,
IN fName varchar(100),
IN lName varchar(100),
IN leg varchar(100),
IN cel varchar(100),
IN vhInhabil double,
IN vhHabil double,
IN vhExtra double,
IN a BIT
)
BEGIN  
    
    UPDATE Choferes SET FirstName=fName, LastName=lName, 
    Legajo=leg,ValorHoraInhabil=vhInhabil,Celular=cel, 
    ValorHoraHabil=vhHabil, ValorHoraExtra = vhExtra, Active=a
    WHERE ChoferId = chId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `profile_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `profile_delete`(
IN pId INT
)
BEGIN

   DELETE FROM Profiles WHERE ProfileId = pId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `profile_getById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `profile_getById`(
IN pId INT
)
BEGIN
SELECT ProfileId,Name,CASE Active WHEN 1 THEN 'SI' ELSE 'NO' END as Active FROM Profiles where ProfileId= pId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `profile_getByName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `profile_getByName`(
IN n varchar(200)
)
BEGIN

   SELECT * FROM Profiles WHERE Name COLLATE utf8_spanish_ci LIKE CONCAT(n,'%');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `profile_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `profile_insert`(
IN n varchar(200),
IN a BIT
)
BEGIN

    INSERT INTO Profiles (Name,Active)
    VALUES(n,a); 
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `profile_search` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `profile_search`(
 
 IN pId INT,
 IN n varchar(200), 
 IN a BIT 

)
BEGIN
  
   SELECT ProfileId,Name,CASE Active WHEN 1 THEN 'SI' ELSE 'NO' END as Active from Profiles WHERE 
     (pId is Null or Profiles.ProfileId = pId)
   AND
      (a is NULL or Profiles.Active = a)
   
   AND
      (n is NULL or Profiles.Name COLLATE utf8_spanish_ci like concat(n,'%'))
   ;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `profile_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `profile_update`(
IN pId INT,
IN n varchar(200),
IN a BIT
)
BEGIN

    UPDATE Profiles SET Name=n,Active=a
    WHERE ProfileId = pId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_addChofer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_addChofer`(
IN reId INT,
IN chId INT
)
BEGIN

    INSERT INTO transReservaChofer(ReservaId,ChoferId)
    VALUES
    (reId,chId);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_delChoferes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_delChoferes`(
IN reId INT
)
BEGIN

   DELETE FROM transReservaChofer WHERE ReservaId = reId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_delete`(
IN reId INT
)
BEGIN
DELETE FROM transReservaChofer WHERE ReservaId = reId;
DELETE FROM Reservas WHERE ReservaId = reId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_getByEstadoId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_getByEstadoId`(

IN esId INT
)
BEGIN
SELECT
`Reservas`.`ReservaId`,
`Reservas`.`Destino`,
`Reservas`.`Solicitante`,
`Reservas`.`EmailSolicitante`,
`Reservas`.`AutorizadoPor`,

`Reservas`.`VehiculoId`,
`Reservas`.`Observacion`,
`Reservas`.`FileName`,
`Reservas`.`NumPasajeros`,
`Reservas`.`EstadoId`,
`Reservas`.`Distancia`,
`Reservas`.`PrecioCombustible`,
`Reservas`.`Mantenimiento`,
`Reservas`.`GastoTotal`,
GROUP_CONCAT(Choferes.ChoferId) as ChoferesIds,
 GROUP_CONCAT(CONCAT (Choferes.FirstName ,'  ',Choferes.LastName)) as Choferes,
  DATE_FORMAT(`Reservas`.`FechaCreacion` ,"%d/%m/%Y") as FechaCreacion,
 DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
 DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
 DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
 DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada
FROM `tape`.`Reservas`

   INNER JOIN Vehiculos ON Vehiculos.VehiculoId = Reservas.VehiculoId  
   INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
   INNER JOIN Choferes ON Choferes.ChoferId = transReservaChofer.ChoferId
WHERE EstadoId = esId
GROUP BY Reservas.ReservaId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_getById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_getById`(

IN reId INT
)
BEGIN
SELECT
`Reservas`.`ReservaId`,
`Reservas`.`Destino`,
`Reservas`.`Solicitante`,
`Reservas`.`EmailSolicitante`,
`Reservas`.`AutorizadoPor`,
`Reservas`.`VehiculoId`,
`Reservas`.`Observacion`,
`Reservas`.`FileName`,
`Reservas`.`NumPasajeros`,
`Reservas`.`EstadoId`,
`Reservas`.`Distancia`,
`Reservas`.`PrecioCombustible`,
`Reservas`.`Mantenimiento`,
`Reservas`.`GastoTotal`,
 GROUP_CONCAT(Choferes.ChoferId) as ChoferesIds,
 GROUP_CONCAT(CONCAT (Choferes.FirstName ,'  ',Choferes.LastName)) as Choferes,
 DATE_FORMAT(`Reservas`.`FechaCreacion` ,"%d/%m/%Y") as FechaCreacion,
 DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
 DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
 DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
 DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada
FROM `tape`.`Reservas`INNER JOIN Vehiculos ON Vehiculos.VehiculoId = Reservas.VehiculoId  
   INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
   INNER JOIN Choferes ON Choferes.ChoferId = transReservaChofer.ChoferId
WHERE Reservas.ReservaId = reId
GROUP BY Reservas.ReservaId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_getByVehiculoId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_getByVehiculoId`(

IN veId INT
)
BEGIN
SELECT
`Reservas`.`ReservaId`,
`Reservas`.`Destino`,
`Reservas`.`Solicitante`,
`Reservas`.`EmailSolicitante`,
`Reservas`.`AutorizadoPor`,
`Reservas`.`VehiculoId`,
`Reservas`.`Observacion`,
`Reservas`.`FileName`,
`Reservas`.`NumPasajeros`,
`Reservas`.`EstadoId`,
`Reservas`.`Distancia`,
`Reservas`.`PrecioCombustible`,
`Reservas`.`Mantenimiento`,
`Reservas`.`GastoTotal`,
GROUP_CONCAT(Choferes.ChoferId) as ChoferesIds,
GROUP_CONCAT(CONCAT (Choferes.FirstName ,'  ',Choferes.LastName)) as Choferes,
  DATE_FORMAT(`Reservas`.`FechaCreacion` ,"%d/%m/%Y") as FechaCreacion,
 DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
 DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
 DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
 DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada
FROM `tape`.`Reservas`

   INNER JOIN Vehiculos ON Vehiculos.VehiculoId = Reservas.VehiculoId  
   INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
   INNER JOIN Choferes ON Choferes.ChoferId = transReservaChofer.ChoferId
WHERE VehiculoId = veId
GROUP BY Reservas.ReservaId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_getForCalendar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_getForCalendar`(
IN mes Int,
IN anio Int,
IN type Int

)
BEGIN

If (type = 0 ) THEN SET type = NUll; END IF;

 SELECT 
       Reservas.ReservaId,
       Destino,
       Solicitante,
       EmailSolicitante,
       AutorizadoPor,
       Vehiculos.TipoVehiculoId as Tipo,
       CONCAT(Vehiculos.Modelo," ",Vehiculos.Patente) as Vehiculo,
       CASE WHEN Reservas.EstadoId = 1 THEN 'Pendiente' ELSE 'Confirmada' END as Estado,
       DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
       DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
       DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
       DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada,
       NumPasajeros,
       Vehiculos.Color as Color,
       GROUP_CONCAT(CONCAT(Choferes.FirstName," ",Choferes.LastName) SEPARATOR ' - ') as ChoferName
 FROM
    Reservas
 INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
 INNER JOIN Vehiculos ON Vehiculos.VehiculoId = Reservas.VehiculoId
 INNER JOIN Choferes ON transReservaChofer.ChoferId = Choferes.ChoferId
 WHERE
    (type is null OR Vehiculos.TipoVehiculoId = type)
   AND 
 (
    DATE(FechaInicio) BETWEEN DATE(CONCAT(anio,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(anio,'-',mes,'-','01'))) 
   OR
    DATE(FechaFin) BETWEEN DATE(CONCAT(anio,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(anio,'-',mes,'-','01'))) 
 )

GROUP BY Reservas.ReservaId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_getListByFechas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_getListByFechas`(
IN fI DATETIME,
IN fF DATETIME,
IN reId INT
)
BEGIN
 
    SELECT
        Reservas.ReservaId,
        Destino,
        Solicitante,
        EmailSolicitante,
        transReservaChofer.ChoferId,
        DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
        DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
        DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
        DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada,
        Reservas.VehiculoId,
        CONCAT(Vehiculos.Modelo," ",Vehiculos.Patente) as Modelo,
        GROUP_CONCAT(CONCAT(Choferes.FirstName,' ',Choferes.LastName) SEPARATOR ';') as Choferes 
    FROM
      Reservas
    INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
    INNER JOIN Choferes ON Choferes.ChoferId = transReservaChofer.ChoferId
    INNER JOIN Vehiculos ON Vehiculos.VehiculoId= Reservas.VehiculoId
    WHERE
     (
        DATE(FechaInicio) BETWEEN DATE(fI)  AND  DATE(fF)
   OR
        DATE(FechaFin) BETWEEN DATE(fI)  AND  DATE(fF)
      )
      AND 
    Reservas.ReservaId <> reId
      GROUP BY Reservas.ReservaId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_insert`(
IN des VARCHAR(200) ,
IN soli VARCHAR(200),
IN esoli VARCHAR(200),
IN auto VARCHAR(200),
IN veId INT,
IN feIni DATETIME,
IN horaIni DATETIME,
IN feFin DATETIME,
IN horaFin DATETIME,
IN np INT,
IN eId INT,
IN obs VARCHAR(400),
IN file VARCHAR(100),
IN mant BIT


)
BEGIN

INSERT INTO `tape`.`Reservas`(
`Destino`,`Solicitante`,`EmailSolicitante`,`AutorizadoPor`,
`VehiculoId`,`FechaInicio`,`HoraSalida`,
`FechaFin`,`HoraLlegada`,`Observacion`,`FileName`,
`NumPasajeros`,
`EstadoId`,
`Distancia`,
`PrecioCombustible`,
`FechaCreacion`,
`Mantenimiento`,
`GastoTotal`)
VALUES
(
 des ,
 soli ,
 esoli ,
 auto ,
 veId ,
 feIni,
 horaIni,
 feFin,
 horaFin,
 obs ,
 file ,
 np ,
 eId ,
 0,
 0,
CURDATE(),
 mant ,
0 
);

SELECT LAST_INSERT_ID() as Id;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_search` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_search`(
  IN inputText varchar(200)

)
BEGIN

   SELECT
   Reservas.ReservaId,
     Destino,
    `Reservas`.`Solicitante`,
    `Reservas`.`EmailSolicitante`,
    `Reservas`.`AutorizadoPor`,
     CONCAT(Vehiculos.Modelo," ",Vehiculos.Patente) as VehiculoId,
    `Reservas`.`Observacion`,
    `Reservas`.`FileName`,
    `Reservas`.`NumPasajeros`,
    `Reservas`.`EstadoId`,
    `Reservas`.`Distancia`,
    `Reservas`.`PrecioCombustible`,
    `Reservas`.`Mantenimiento`,
    `Reservas`.`GastoTotal`,
    GROUP_CONCAT(Choferes.ChoferId) as ChoferesIds,
    GROUP_CONCAT(CONCAT (Choferes.FirstName ,'  ',Choferes.LastName)) as Choferes,
    DATE_FORMAT(`Reservas`.`FechaCreacion` ,"%d/%m/%Y") as FechaCreacion,
    DATE_FORMAT(`Reservas`.`FechaInicio` ,"%d/%m/%Y") as FechaInicio,
    DATE_FORMAT(`Reservas`.`FechaFin` ,"%d/%m/%Y") as FechaFin,
    DATE_FORMAT(`Reservas`.`HoraSalida` ,"%H:%i") as HoraSalida,
    DATE_FORMAT(`Reservas`.`HoraLlegada` ,"%H:%i") as HoraLlegada
   FROM Reservas
   INNER JOIN Vehiculos ON Vehiculos.VehiculoId = Reservas.VehiculoId  
   INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
   INNER JOIN Choferes ON Choferes.ChoferId = transReservaChofer.ChoferId
    WHERE 
      (inputText is NULL or Reservas.Destino COLLATE utf8_spanish_ci like concat(inputText,'%'))
   AND
      (inputText is NULL or Reservas.Solicitante COLLATE utf8_spanish_ci like concat(inputText,'%'))
   AND
      (inputText is NULL or Reservas.Destino COLLATE utf8_spanish_ci like concat(inputText,'%'))
   AND
      (inputText is NULL or Reservas.Observacion COLLATE utf8_spanish_ci like concat(inputText,'%'))
   GROUP BY Reservas.ReservaId;
  
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservas_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_update`(
IN des VARCHAR(200),
IN soli VARCHAR(200),
IN esoli VARCHAR(200),
IN auto VARCHAR(200),
IN veId INT,
IN feIni DATETIME,
IN horaIni DATETIME,
IN feFin DATETIME,
IN horaFin DATETIME,
IN obs VARCHAR(400),
IN file VARCHAR(100),
IN np INT,
IN eId INT,
IN mant BIT,
IN gast FLOAT,
IN reId INT

)
BEGIN
UPDATE `tape`.`Reservas`
SET
`Destino` = des,
`Solicitante` = soli,
`EmailSolicitante` = esoli,
`AutorizadoPor` = auto,
`VehiculoId` = veId,
`FechaInicio` = feIni,
`HoraSalida` = horaIni,
`FechaFin` =  feFin,
`HoraLlegada` = horaFin,
`Observacion` = obs,
`FileName` = file,
`NumPasajeros` = np,
`EstadoId` = eId,
`Mantenimiento` = mant,
`GastoTotal` = gast
WHERE ReservaId = reId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `split_string` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `split_string`(
    IN input TEXT,
    IN delimiter VARCHAR(10)
)
    SQL SECURITY INVOKER
BEGIN
      DECLARE cur_position INT DEFAULT 1 ;
      DECLARE remainder TEXT;
      DECLARE cur_string VARCHAR(1000);
      DECLARE delimiter_length TINYINT UNSIGNED;

      DROP TEMPORARY TABLE IF EXISTS SplitValues;

      CREATE TEMPORARY TABLE SplitValues (
        value VARCHAR(1000) NOT NULL PRIMARY KEY
      ) ENGINE=MEMORY;

      SET remainder = input;
      SET delimiter_length = CHAR_LENGTH(delimiter);

      WHILE CHAR_LENGTH(remainder) > 0 AND cur_position > 0 DO
         SET cur_position = INSTR(remainder, delimiter);

         IF cur_position = 0 THEN
            SET cur_string = remainder;
         ELSE
            SET cur_string = LEFT(remainder, cur_position - 1);
         END IF;

         IF TRIM(cur_string) != '' THEN
            INSERT INTO SplitValues VALUES (cur_string);
         END IF;

         SET remainder = SUBSTRING(remainder, cur_position +
delimiter_length);      END WHILE;
   END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tipovehiculo_getAll` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `tipovehiculo_getAll`()
BEGIN

    SELECT * FROM TipoVehiculo;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `users_deleteUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_deleteUser`(
IN uId INT
)
BEGIN

   DELETE FROM Users WHERE UserId = uId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `users_getByUserId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_getByUserId`(
IN uId INT
)
BEGIN
SELECT * FROM Users where UserId= uId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `users_getByUserName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_getByUserName`(
IN user varchar(200)
)
BEGIN

   SELECT * FROM Users WHERE UserName COLLATE utf8_spanish_ci LIKE CONCAT(user,'%');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `users_getRules` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_getRules`(
IN uName varchar(100)
)
BEGIN

    SELECT GROUP_CONCAT(RuleId)
    FROM 
        transRuleProfile
    INNER JOIN Profiles ON Profiles.ProfileId = transRuleProfile.ProfileId
    INNER JOIN Users On Users.UserName = uName
    WHERE Users.ProfileId = transRuleProfile.ProfileId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `users_insertUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_insertUser`(
IN uName varchar(200),
IN e varchar(200),
IN fName varchar(100),
IN lName varchar(100),
IN pass varchar(100),
IN pId INT,
IN a BIT
)
BEGIN

    INSERT INTO Users (UserName,FirstName, LastName,Password,Email,ProfileId, Active)
    VALUES(uName, fName, lName,pass,e,pId,a); 
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `users_search` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_search`(
 IN userId INT,
 IN userName varchar(200),
 IN firstName varchar(100),
 IN lastName varchar(100),
 IN email varchar(200),
 IN profileId INT,
 IN active BIT 

)
BEGIN
  
   SELECT * from Users  WHERE 
      (userId is Null or Users.UserId = userId)
   AND
     (profileId is Null or Users.ProfileId = profileId)
   AND
     (active is Null or Users.Active = active)
   AND
      (firstName is NULL or Users.FirstName COLLATE utf8_spanish_ci like concat(firstName,'%'))
   AND
      (lastName is NULL or Users.LastName COLLATE utf8_spanish_ci like concat(lastName,'%'))
   AND
      (email is NULL or Users.Email COLLATE utf8_spanish_ci like concat(email,'%'))
   AND
      (userName is NULL or Users.UserName COLLATE utf8_spanish_ci like concat(userName,'%'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `users_updateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_updateUser`(
IN uName varchar(200),
IN e varchar(200),
IN fName varchar(100),
IN lName varchar(100),
IN pId INT,
IN a BIT,
IN uId INT
)
BEGIN

       
    UPDATE Users SET UserName=uName, FirstName=fName, LastName=lName,Email=e, ProfileId=pId, Active=a
    WHERE UserId = uId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vehiculos_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `vehiculos_delete`(
IN veId INT
)
BEGIN

   DELETE FROM Vehiculos WHERE VehiculoId = veId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vehiculos_getAll` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `vehiculos_getAll`()
BEGIN

SELECT VehiculoId, Modelo FROM Vehiculos;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vehiculos_getById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `vehiculos_getById`(
IN veId INT
)
BEGIN
SELECT `Vehiculos`.`VehiculoId`,
    `Vehiculos`.`Modelo`,
    `Vehiculos`.`Patente`,
    `Vehiculos`.`Capacidad`,
    `Vehiculos`.`CombustibleId`,
    `Vehiculos`.`Descripcion`,
    `Vehiculos`.`ConsumoxKM`,
    `Vehiculos`.`Color`,
    TipoVehiculoId,
   CASE Active WHEN 1 THEN 'SI' ELSE 'NO' END as Active,
    DATE_FORMAT(`Vehiculos`.`Fecha` ,"%d/%m/%Y") as Fecha FROM Vehiculos where VehiculoId= veId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vehiculos_getByModelo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `vehiculos_getByModelo`(
IN modle varchar(100)

)
BEGIN

   SELECT `Vehiculos`.`VehiculoId`,
    `Vehiculos`.`Modelo`,
    `Vehiculos`.`Patente`,
    `Vehiculos`.`Capacidad`,
    `Vehiculos`.`CombustibleId`,
    `Vehiculos`.`Descripcion`,
    `Vehiculos`.`ConsumoxKM`,
    `Vehiculos`.`Color`,
    TipoVehiculoId,
    `Vehiculos`.`Active`,
    DATE_FORMAT(`Vehiculos`.`Fecha` ,"%d/%m/%Y") as Fecha FROM Vehiculos 
   WHERE 
    (Modelo COLLATE utf8_spanish_ci LIKE CONCAT(modle,'%'));
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vehiculos_getDisponibles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `vehiculos_getDisponibles`(
IN feI DATETIME,
IN feF DATETIME,
IN nump INT,
IN reId INT

)
BEGIN
  SELECT
      Vehiculos.VehiculoId,
      CONCAT(Vehiculos.Modelo," - ", Vehiculos.Patente) as Modelo,
      CONCAT("Num Pas:",Vehiculos.Capacidad) as Capacidad
  FROM 
      Vehiculos
  WHERE
     Vehiculos.Capacidad >= nump 
     AND
     Vehiculos.Active = 1
     AND
     Vehiculos.VehiculoId NOT IN (

     SELECT VehiculoId FROM Reservas
     WHERE
        (
            DATE(FechaInicio) BETWEEN   DATE(feI)  AND   DATE(feF)
            OR
            DATE(FechaFin) BETWEEN   DATE(feI)  AND   DATE(feF)
        )
     AND ReservaId <> reId
    );

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vehiculos_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `vehiculos_insert`(
IN modele varchar(100),
IN pat varchar(100),
IN cmbId int,
IN capac varchar(45),
IN fe varchar(100),
IN descrip varchar(400),
IN cons FLOAT,
IN col varchar(45),
IN typeVeId INT,
IN a BIT
)
BEGIN  

    INSERT INTO `tape`.`Vehiculos`
(
`Modelo`,
`Patente`,
`Capacidad`,
`CombustibleId`,
`Descripcion`,
`Fecha`,
`ConsumoxKM`,
`Color`,
`TipoVehiculoId`,
`Active`) 

VALUES
(
modele,
pat,
capac,
cmbId,
descrip,
CURDATE(),
cons,
col,
typeVeId,
a
);

    

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vehiculos_search` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `vehiculos_search`(
 IN veId INT,
 IN modele varchar(100),
 IN pat varchar(100),
 IN descrip varchar(100),
 IN a BIT 

)
BEGIN

   SELECT 
    `Vehiculos`.`VehiculoId`,
    `Vehiculos`.`Modelo`,
    `Vehiculos`.`Patente`,
    `Vehiculos`.`Capacidad`,
    `Vehiculos`.`CombustibleId`,
    `Vehiculos`.`Descripcion`,
    `Vehiculos`.`ConsumoxKM`,
    `Vehiculos`.`Color`,
     TipoVehiculoId,
    `Vehiculos`.`Active`,
    DATE_FORMAT(`Vehiculos`.`Fecha` ,"%d/%m/%Y") as Fecha
   FROM Vehiculos  WHERE 
      (veId is Null or Vehiculos.VehiculoId = veId)
   AND
     (a is Null or Vehiculos.Active = a)
   AND
      (modele is NULL or Vehiculos.Modelo COLLATE utf8_spanish_ci like concat(modele,'%'))
   AND
      (pat is NULL or Vehiculos.Patente COLLATE utf8_spanish_ci like concat(pat,'%'));
   
   
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vehiculos_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `vehiculos_update`(
IN veId INT,
IN modele varchar(100),
IN pat varchar(100),
IN cmbId int,
IN capac varchar(45),
IN fe varchar(100),
IN descrip varchar(400),
IN cons FLOAT,
IN col varchar(45),
IN typeVeId INT,
IN a BIT
)
BEGIN  
    
   
    UPDATE Vehiculos SET Modelo=modele, Patente=pat, 
    CombustibleId=cmbId,Capacidad=capac,Descripcion=descrip, 
    Color=col, Fecha = STR_TO_DATE(fe, '%m/%d/%Y'), ConsumoxKM=cons,TipoVehiculoId=typeVeId,Active = a
    WHERE VehiculoId = veId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-10-31 10:09:46
