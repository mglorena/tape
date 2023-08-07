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
/*!40101 SET character_set_client = latin1 */;
CREATE TABLE `Choferes` (
  `ChoferId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `LastName` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Legajo` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `Celular` varchar(100) COLLATE latin1_spanish_ci DEFAULT NULL,
  `HorarioLab` varchar(45) COLLATE latin1_spanish_ci DEFAULT NULL,
  `ValorHoraInhabil` float DEFAULT NULL,
  `ValorHoraHabil` float DEFAULT NULL,
  `ValorHoraExtra` float DEFAULT NULL,
  `Active` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`ChoferId`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Choferes`
--

LOCK TABLES `Choferes` WRITE;
/*!40000 ALTER TABLE `Choferes` DISABLE KEYS */;
INSERT INTO `Choferes` VALUES (1,'$fname','$lname','7016','(387)-15-5226928',NULL,250.21,22.3,222.22,''),(32,'Claudio','Meriles','8564','154978634',NULL,454.54,787.87,787.87,''),(39,'Francisco','Aguero','802','155296898',NULL,45,45,45,''),(40,'Federico','Laureano','9658','155789898',NULL,65,65,65,''),(41,'Segovia','Ramon','5968','155289652',NULL,78,250,78,'');
/*!40000 ALTER TABLE `Choferes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profiles`
--

DROP TABLE IF EXISTS `Profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = latin1 */;
CREATE TABLE `Profiles` (
  `ProfileId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ProfileId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profiles`
--

LOCK TABLES `Profiles` WRITE;
/*!40000 ALTER TABLE `Profiles` DISABLE KEYS */;
INSERT INTO `Profiles` VALUES (1,'Admin',''),(2,'Chofer',''),(3,'Automotores',''),(4,'Stock','\0');
/*!40000 ALTER TABLE `Profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservas`
--

DROP TABLE IF EXISTS `Reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = latin1 */;
CREATE TABLE `Reservas` (
  `ReservaId` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `Destino` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `Solicitante` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `EmailSolicitante` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `AutorizadoPor` varchar(115) COLLATE latin1_spanish_ci DEFAULT NULL,
  `VehiculoId` tinyint(4) NOT NULL,
  `FechaInicio` datetime NOT NULL,
  `HoraSalida` datetime DEFAULT NULL,
  `FechaFin` datetime NOT NULL,
  `HoraLlegada` datetime DEFAULT NULL,
  `Observacion` varchar(400) COLLATE latin1_spanish_ci DEFAULT NULL,
  `FileName` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `NumPasajeros` int(11) DEFAULT NULL,
  `EstadoId` tinyint(4) NOT NULL,
  `Distancia` int(4) DEFAULT '1',
  `PrecioCombustible` float DEFAULT NULL,
  `FechaCreacion` datetime NOT NULL,
  `Mantenimiento` bit(1) DEFAULT b'0',
  `GastoTotal` float DEFAULT NULL,
  PRIMARY KEY (`ReservaId`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservas`
--

LOCK TABLES `Reservas` WRITE;
/*!40000 ALTER TABLE `Reservas` DISABLE KEYS */;
INSERT INTO `Reservas` VALUES (1,'San Juan','Facultad de Humanidades - CEPHIA','cephia@unsa.edu.ar','Rector Humanidades',1,'2012-10-10 08:15:00','0000-00-00 08:15:00','2012-12-12 08:30:00','0000-00-00 08:30:00','Prueba','pasajeros.doc',34,1,1,NULL,'0000-00-00 00:00:00','\0',NULL),(2,'Rosario de Santa Fe','Facultad de Naturales - Geonorte','geonorte@unsa.edu.ar','Rector Naturales',2,'2012-09-09 00:00:00','0000-00-00 09:00:00','2012-09-12 00:00:00','0000-00-00 22:00:00','Congreso','lista.doc',45,2,1234,0.75,'0000-00-00 00:00:00','',3500),(3,'sd','sd','sd','sd',1,'2012-10-08 00:00:00','0000-00-00 00:00:00','2012-10-12 00:00:00','0000-00-00 12:12:00','rtrtr','lista.doc',565,1,0,0,'2012-10-18 00:00:00','',0),(4,'sd','sd','sd','sd',1,'2012-10-08 00:00:00','0000-00-00 00:00:00','2012-10-12 00:00:00','0000-00-00 12:12:00','rtrtr','lista.doc',565,1,0,0,'2012-10-18 00:00:00','',0),(5,'sd','sd','sd','sd',1,'2012-10-08 00:00:00','0000-00-00 00:00:00','2012-10-12 00:00:00','0000-00-00 00:00:00','rtrtr','lista.doc',565,1,0,0,'2012-10-18 00:00:00','',0),(6,'sd','sd','sd','sd',1,'2012-10-08 00:00:00','0000-00-00 12:12:00','2012-10-12 00:00:00','0000-00-00 00:00:00','rtrtr','lista.doc',565,1,0,0,'2012-10-18 00:00:00','',0),(7,'sd','sd','sd','sd',1,'2012-10-08 00:00:00','0000-00-00 00:00:00','2012-10-12 00:00:00','0000-00-00 00:00:00','rtrtr','lista.doc',565,1,0,0,'2012-10-18 00:00:00','',0),(8,'destino','solicitante',' solcisnte@sksk.com','skdjskds',1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','asdasa','lista.doc',34,1,0,0,'2012-10-18 00:00:00','',0),(9,'sd','sd','sd','sd',1,'2012-10-08 00:00:00','0000-00-00 12:12:00','2012-10-12 00:00:00','0000-00-00 12:12:00','rtrtr','lista.doc',565,1,0,0,'2012-10-18 00:00:00','',0),(10,'wew','wew','wew','wew',1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','asasasa','lista.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(11,'san luis','geonorte','geonorte@gmail.com','decano',2,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(12,'san luis','geonorte','geonorte@gmail.com','decano',2,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(13,'san luis','geonorte','geonorte@gmail.com','decano',2,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(14,'san luis','geonorte','geonorte@gmail.com','decano',2,'1969-12-31 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(15,'san luis','geonorte','geonorte@gmail.com','decano',2,'1969-12-31 00:00:00','2012-10-18 23:50:00','0000-00-00 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(16,'san luis','geonorte','geonorte@gmail.com','decano',2,'1969-12-31 00:00:00','2012-10-18 23:50:00','1969-12-31 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(17,'san luis','geonorte','geonorte@gmail.com','decano',2,'1969-12-31 00:00:00','2012-10-18 23:50:00','1969-12-31 00:00:00','2012-10-18 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(18,'san luis','geonorte','geonorte@gmail.com','decano',2,'1969-12-31 00:00:00','2012-10-18 23:50:00','1969-12-31 00:00:00','2012-10-18 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(19,'san luis','geonorte','geonorte@gmail.com','decano',2,'1969-12-31 00:00:00','2012-10-18 23:50:00','1969-12-31 00:00:00','2012-10-18 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(20,'san luis1','geonorte','geonorte@gmail.com','decano',2,'1969-12-31 00:00:00','2012-10-18 23:50:00','1969-12-31 00:00:00','2012-10-18 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(21,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 00:00:00','2012-10-23 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(22,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 00:00:00','2012-10-23 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(23,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 00:00:00','2012-10-23 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(24,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(25,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 00:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(26,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(27,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(28,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(29,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(30,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(31,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(32,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(33,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(34,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(35,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(36,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(37,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(38,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(39,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(40,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(41,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-18 00:00:00','',0),(42,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(43,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(44,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(45,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(46,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(47,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(48,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(49,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(50,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(51,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(52,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(53,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(54,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(55,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(56,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(57,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(58,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(59,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(60,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(61,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(62,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(63,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(64,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(65,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(66,'san luis3','geonorte','geonorte@gmail.com','decano',2,'2012-10-19 00:00:00','0000-00-00 23:50:00','2012-10-23 00:00:00','0000-00-00 12:00:00','testing','listap.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(71,'Londres','Lorena garcia','mglorena@gmail.com','MI',2,'2012-10-16 00:00:00','0000-00-00 23:56:00','2012-10-17 00:00:00','0000-00-00 05:45:00','nuevo testeo de inserccion teetetete','lista.doc',2,2,0,0,'2012-10-19 00:00:00','',0),(72,'Londres','Lorena garcia','mglorena@gmail.com','MI',2,'2012-10-16 00:00:00','0000-00-00 23:56:00','2012-10-17 00:00:00','0000-00-00 05:45:00','nuevo testeo de inserccion teetetete','lista.doc',2,2,0,0,'2012-10-19 00:00:00','',0),(73,'Londres','Lorena garcia','mglorena@gmail.com','MI',2,'2012-10-16 00:00:00','0000-00-00 23:56:00','2012-10-17 00:00:00','0000-00-00 05:45:00','nuevo testeo de inserccion teetetete','lista.doc',2,2,0,0,'2012-10-19 00:00:00','',0),(74,'Londres','Lorena garcia','mglorena@gmail.com','MI',2,'2012-10-16 00:00:00','0000-00-00 23:56:00','2012-10-17 00:00:00','0000-00-00 05:45:00','nuevo testeo de inserccion teetetete','lista.doc',2,2,0,0,'2012-10-19 00:00:00','',0),(75,'wew','wew','wew','wew',1,'2012-10-09 00:00:00','0000-00-00 23:23:00','2012-10-09 00:00:00','0000-00-00 23:23:00','sdwewew','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(76,'wseds','sds','sds','sds',1,'2012-10-02 00:00:00','0000-00-00 23:23:00','2012-10-02 00:00:00','0000-00-00 23:23:00','asasasa','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(77,'wseds','sds','sds','sds',1,'2012-10-02 00:00:00','0000-00-00 23:23:00','2012-10-02 00:00:00','0000-00-00 23:23:00','asasasa','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(78,'ere','ere','er','er',1,'2012-10-01 00:00:00','0000-00-00 22:32:00','2012-10-24 00:00:00','0000-00-00 23:23:00','sadaasasa','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(79,'ere','ere','er','er',1,'2012-10-01 00:00:00','0000-00-00 22:32:00','2012-10-24 00:00:00','0000-00-00 23:23:00','sadaasasa','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(80,'ere','ere','er','er',1,'2012-10-01 00:00:00','0000-00-00 22:32:00','2012-10-24 00:00:00','0000-00-00 23:23:00','sadaasasa','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(81,'ere','ere','er','er',1,'2012-10-01 00:00:00','0000-00-00 22:32:00','2012-10-24 00:00:00','0000-00-00 23:23:00','sadaasasa','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(82,'ere','ere','er','er',1,'2012-10-01 00:00:00','0000-00-00 22:32:00','2012-10-24 00:00:00','0000-00-00 23:23:00','sadaasasa','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(83,'sd','sd','sd','sdsd',1,'2012-10-17 00:00:00','0000-00-00 23:23:00','2012-10-17 00:00:00','0000-00-00 11:11:00','qasqwq','lista.doc',12,2,0,0,'2012-10-19 00:00:00','\0',0),(84,'we','we','we','we',1,'2012-10-09 00:00:00','0000-00-00 22:22:00','2012-10-02 00:00:00','0000-00-00 22:22:00','qawqwq','lista.doc',12,2,0,0,'2012-10-19 00:00:00','',0),(85,'dfd','dfd','dfd','dfd',1,'2012-10-16 00:00:00','0000-00-00 03:44:00','2012-10-09 00:00:00','0000-00-00 23:22:00','','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(86,'454','454','454','4545',1,'2012-10-16 00:00:00','0000-00-00 22:22:00','2012-10-17 00:00:00','0000-00-00 22:22:00','2323232','lista.doc',222,2,0,0,'2012-10-19 00:00:00','',0),(87,'er','er','er','er',1,'2012-10-01 00:00:00','0000-00-00 22:22:00','2012-10-15 00:00:00','0000-00-00 11:11:00','qwqwqwq','lista.doc',121,1,0,0,'2012-10-19 00:00:00','',0),(88,'343','343','343','34',1,'2012-10-24 00:00:00','0000-00-00 12:12:00','2012-10-18 00:00:00','0000-00-00 12:12:00','xcxcxcx','lista.doc',223,2,0,0,'2012-10-19 00:00:00','',0),(89,'wewe','wewew','wewew','wewew',1,'2012-10-17 00:00:00','0000-00-00 12:12:00','2012-10-09 00:00:00','0000-00-00 12:12:00','sxdsds','lista.doc',12121,2,0,0,'2012-10-19 00:00:00','',0),(90,'sd','sd','sd','sd',1,'2012-10-24 00:00:00','0000-00-00 12:12:00','2012-10-25 00:00:00','0000-00-00 12:12:00','asasasa','lista.doc',32,2,0,0,'2012-10-19 00:00:00','',0),(91,'sds','sds','sds','sdsd',1,'2012-10-01 00:00:00','0000-00-00 12:12:00','2012-10-18 00:00:00','0000-00-00 12:12:00','fgfgf','lista.doc',23,2,0,0,'2012-10-19 00:00:00','',0),(92,'azxsa','asa','asa','asasa',1,'2012-10-17 00:00:00','0000-00-00 12:11:00','2012-10-09 00:00:00','0000-00-00 12:12:00','12121','lista.doc',12121,2,0,0,'2012-10-19 00:00:00','',0),(93,'','222','ss@.com','asas',2,'2012-10-19 00:00:00','0000-00-00 11:30:00','2012-11-23 00:00:00','0000-00-00 13:00:00','testing','lista22.doc',45,1,0,0,'2012-10-19 00:00:00','',0),(94,'','222','ss@.com','asas',2,'2012-10-19 00:00:00','0000-00-00 11:30:00','2012-11-23 00:00:00','0000-00-00 13:00:00','testing','lista22.doc',45,1,0,0,'2012-10-19 00:00:00','',0),(95,'','222','ss@.com','asas',2,'2012-10-19 00:00:00','0000-00-00 11:30:00','2012-11-23 00:00:00','0000-00-00 13:00:00','testing','lista22.doc',45,1,0,0,'2012-10-19 00:00:00','',0),(96,'','222','ss@.com','asas',2,'2012-10-19 00:00:00','0000-00-00 11:30:00','2012-11-23 00:00:00','0000-00-00 13:00:00','testing','lista22.doc',45,1,0,0,'2012-10-19 00:00:00','',0),(97,'','222','ss@.com','asas',2,'2012-10-19 00:00:00','0000-00-00 11:30:00','2012-11-23 00:00:00','0000-00-00 13:00:00','testing','lista22.doc',45,1,0,0,'2012-10-19 00:00:00','',0),(98,'','222','ss@.com','asas',2,'2012-10-19 00:00:00','0000-00-00 11:30:00','2012-11-23 00:00:00','0000-00-00 13:00:00','testing','lista22.doc',45,1,0,0,'2012-10-19 00:00:00','',0),(99,'','222','ss@.com','asas',2,'2012-10-19 00:00:00','0000-00-00 11:30:00','2012-11-23 00:00:00','0000-00-00 13:00:00','testing','lista22.doc',45,1,0,0,'2012-10-19 00:00:00','',0),(104,'Catamarca','Facultad de Humanidades - CEPHIA','cephia@unsa.edu.ar','Decano facultad',4,'2012-10-01 00:00:00','0000-00-00 23:23:00','2012-10-10 00:00:00','0000-00-00 10:30:00','23232cs tesging las partes de la ovjls sd','',232,2,0,0,'2012-10-19 00:00:00','',NULL),(106,'Formosa','Facultad de Naturales - Bilogia','asa','decano',1,'2012-10-08 00:00:00','0000-00-00 23:23:00','2012-10-11 00:00:00','0000-00-00 12:12:00','sadasasa','',121,2,0,0,'2012-10-19 00:00:00','',NULL),(107,'Jujuy','Facultad de Ingenieria','sss@unsa.edu.ar','Decano',5,'2012-10-24 00:00:00','0000-00-00 06:50:00','2012-11-02 00:00:00','0000-00-00 03:00:00','Nos vamos todos','lista.doc',16,2,0,0,'2012-10-24 00:00:00','',NULL),(108,'Cachi','Facultad de Naturales','de@unsa.edu.ar','Decano',2,'2012-12-25 00:00:00','0000-00-00 13:31:00','2013-01-03 00:00:00','0000-00-00 05:00:00','','lista.doc',4,2,0,0,'2012-10-24 00:00:00','',NULL),(109,'des','sol','','',1,'2012-10-10 00:00:00','0000-00-00 15:00:00','2012-10-20 00:00:00','0000-00-00 21:00:00','','',0,1,0,0,'2012-10-25 00:00:00','',NULL),(110,'dsds','dsds','','',1,'2012-10-01 00:00:00','0000-00-00 07:00:00','2012-10-26 00:00:00','0000-00-00 21:00:00','','',0,1,0,0,'2012-10-25 00:00:00','',NULL),(111,'wewe','wewewew','wewewew','',4,'2012-10-01 00:00:00','0000-00-00 00:00:00','2012-10-31 00:00:00','0000-00-00 00:00:00','','',34,1,0,0,'2012-10-25 00:00:00','\0',0);
/*!40000 ALTER TABLE `Reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rules`
--

DROP TABLE IF EXISTS `Rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = latin1 */;
CREATE TABLE `Rules` (
  `RuleId` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `Descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`RuleId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rules`
--

LOCK TABLES `Rules` WRITE;
/*!40000 ALTER TABLE `Rules` DISABLE KEYS */;
INSERT INTO `Rules` VALUES (1,'VER_USER','Ver administracion de Usuarios'),(2,'UPD_USER','Modificar Usuarios'),(3,'INS_USER','Insertar Usuarios'),(4,'VER_PROFILE','Ver administracion de profiles'),(5,'UPD_PROFILE','Modificar profiles'),(6,'INS_PROFILE','Insertar profiles'),(7,'VER_STOCK','Ver stock'),(8,'UPD_STOCK','Modificar stock'),(9,'INS_STOCK','Insertar stock'),(10,'VER_AUTO','Ver automotores'),(11,'UPD_AUTO','Modificar automotores'),(12,'INS_AUTO','Insertar automotores'),(13,'VER_RES','Ver reservas'),(14,'UPD_RES','Modificar reserva'),(15,'INS_RES','Insertar reservas'),(16,'VER_VEHI','Ver vehiculos'),(17,'UPD_VEHI','Modificar Vehiculo'),(18,'INS_VEHI','Insertar Vehiculo'),(19,'VER_CHOFER','Ver choferes'),(20,'UPD_CHOFER','Modificar Choferes'),(21,'INS_CHOFER','Insertar Chofer');
/*!40000 ALTER TABLE `Rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoVehiculo`
--

DROP TABLE IF EXISTS `TipoVehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = latin1 */;
CREATE TABLE `TipoVehiculo` (
  `TipoVehiculoId` int(11) NOT NULL,
  `Nombre` varchar(45) COLLATE latin1_spanish_ci DEFAULT NULL,
  `ValorPeajexKm` float DEFAULT NULL,
  PRIMARY KEY (`TipoVehiculoId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoVehiculo`
--

LOCK TABLES `TipoVehiculo` WRITE;
/*!40000 ALTER TABLE `TipoVehiculo` DISABLE KEYS */;
INSERT INTO `TipoVehiculo` VALUES (1,'Camioneta',0.025),(2,'Auto',0.025),(3,'Combi',0.025),(4,'Omnibus',0.3);
/*!40000 ALTER TABLE `TipoVehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = latin1 */;
CREATE TABLE `Users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Password` varchar(20) COLLATE latin1_spanish_ci NOT NULL,
  `FirstName` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `LastName` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Email` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `ProfileId` int(10) DEFAULT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'mlgarcia','1234','Lorena','Garcia','mlgarcia2@unsa.edu.ar',1,NULL),(7,'admin','miomia','Hector','Cristofari','mglorena@gmail.com',1,NULL),(10,'er','123','ere','ere','erere',1,NULL),(11,'mg','pass','firs','last','mlg@uns.edu',1,'\0'),(12,'fgf','345','fgf','fgf','fgf',1,'\0'),(13,'mg','pass','firs','last','mlg@uns.edu',1,'\0');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehiculos`
--

DROP TABLE IF EXISTS `Vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = latin1 */;
CREATE TABLE `Vehiculos` (
  `VehiculoId` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `Modelo` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Patente` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Capacidad` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `CombustibleId` tinyint(4) NOT NULL,
  `Descripcion` varchar(400) COLLATE latin1_spanish_ci DEFAULT NULL,
  `ConsumoxKM` int(11) DEFAULT NULL,
  `Color` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `Active` bit(1) DEFAULT b'1',
  `Fecha` datetime DEFAULT NULL,
  `TipoVehiculoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`VehiculoId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehiculos`
--

LOCK TABLES `Vehiculos` WRITE;
/*!40000 ALTER TABLE `Vehiculos` DISABLE KEYS */;
INSERT INTO `Vehiculos` VALUES (1,'pickup chevrolet','DXM-021','23',2,'4x4 ',17234,'#cccccc','','2012-12-12 00:00:00',1),(2,'Renault Trafic Mod 1991','LFD-234','20',3,'desc',789,'#ccffee','','2011-11-11 00:00:00',2),(4,'Combi','DXM-232','16',1,'wwewew',23,'#fffddd','','2012-12-12 00:00:00',3),(5,'Ford 4x4 Rural Stilo Cangu','FLG-222','6',2,'wewewew',12,'#fff070','',NULL,1);
/*!40000 ALTER TABLE `Vehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transReservaChofer`
--

DROP TABLE IF EXISTS `transReservaChofer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = latin1 */;
CREATE TABLE `transReservaChofer` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ReservaId` int(11) DEFAULT NULL,
  `ChoferId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transReservaChofer`
--

LOCK TABLES `transReservaChofer` WRITE;
/*!40000 ALTER TABLE `transReservaChofer` DISABLE KEYS */;
INSERT INTO `transReservaChofer` VALUES (27,69,40),(32,100,1),(33,100,39),(34,101,1),(35,101,39),(36,102,1),(37,102,39),(148,107,41),(152,108,32),(153,104,32),(157,111,32),(158,106,32),(159,106,39),(160,106,41),(161,109,40),(162,110,32);
/*!40000 ALTER TABLE `transReservaChofer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transRuleProfile`
--

DROP TABLE IF EXISTS `transRuleProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = latin1 */;
CREATE TABLE `transRuleProfile` (
  `ProfileId` tinyint(4) unsigned NOT NULL,
  `RuleId` tinyint(4) unsigned NOT NULL,
  PRIMARY KEY (`ProfileId`,`RuleId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transRuleProfile`
--

LOCK TABLES `transRuleProfile` WRITE;
/*!40000 ALTER TABLE `transRuleProfile` DISABLE KEYS */;
INSERT INTO `transRuleProfile` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22);
/*!40000 ALTER TABLE `transRuleProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tape'
--
/*!50003 DROP PROCEDURE IF EXISTS `choferes_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
    (FirstName COLLATE latin1_spanish_ci LIKE CONCAT(fName,'%'))
    OR
    (LastName COLLATE latin1_spanish_ci LIKE CONCAT(lName,'%'));
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
BEGIN-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------


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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
      (fName is NULL or Choferes.FirstName COLLATE latin1_spanish_ci like concat(fName,'%'))
   AND
      (lName is NULL or Choferes.LastName COLLATE latin1_spanish_ci like concat(lName,'%'))
   AND
      (leg is NULL or Choferes.Legajo COLLATE latin1_spanish_ci like concat(leg,'%'));
   
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `profile_getByName`(
IN n varchar(200)
)
BEGIN

   SELECT * FROM Profiles WHERE Name COLLATE latin1_spanish_ci LIKE CONCAT(n,'%');
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
      (n is NULL or Profiles.Name COLLATE latin1_spanish_ci like concat(n,'%'))
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
-- SELECT  mes,  DATE(CONCAT(anio,'-',mes,'-','01')), LAST_DAY( CONCAT(anio,'-',mes,'-','01'));
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `reservas_getListByFechas`(
IN fI DATETIME,
IN fF DATETIME,
IN reId INT
)
BEGIN
 -- SELECT fI as Inicio, DATE(fI) AS d, fF as Fin, DATE(fF) as df ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
      (inputText is NULL or Reservas.Destino COLLATE latin1_spanish_ci like concat(inputText,'%'))
   AND
      (inputText is NULL or Reservas.Solicitante COLLATE latin1_spanish_ci like concat(inputText,'%'))
   AND
      (inputText is NULL or Reservas.Destino COLLATE latin1_spanish_ci like concat(inputText,'%'))
   AND
      (inputText is NULL or Reservas.Observacion COLLATE latin1_spanish_ci like concat(inputText,'%'))
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
delimiter_length);
      END WHILE;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_getByUserId`(
IN userId INT
)
BEGIN
SELECT * FROM Users where UserId= userId;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_getByUserName`(
IN userName varchar(200)
)
BEGIN

   SELECT * FROM Users WHERE UserName COLLATE latin1_spanish_ci LIKE CONCAT(userName,'%');
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
    INNER JOIN Users On Users.UserName = uName;

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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
      (firstName is NULL or Users.FirstName COLLATE latin1_spanish_ci like concat(firstName,'%'))
   AND
      (lastName is NULL or Users.LastName COLLATE latin1_spanish_ci like concat(lastName,'%'))
   AND
      (email is NULL or Users.Email COLLATE latin1_spanish_ci like concat(email,'%'))
   AND
      (userName is NULL or Users.UserName COLLATE latin1_spanish_ci like concat(userName,'%'));
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `users_updateUser`(
IN uName varchar(200),
IN e varchar(200),
IN fName varchar(100),
IN lName varchar(100),
IN pId INT,
IN a BIT
)
BEGIN

    DECLARE u INT;
    SELECT UserId INTO u FROM Users WHERE UserName COLLATE latin1_spanish_ci = uName;
    UPDATE Users SET UserName=uName, FirstName=fName, LastName=lName,Email=e, ProfileId=pId, Active=a
    WHERE UserId = u;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
    (Modelo COLLATE latin1_spanish_ci LIKE CONCAT(modle,'%'));
    
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
IN cons int,
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
STR_TO_DATE(fe, '%m/%d/%Y'),
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
      (modele is NULL or Vehiculos.Modelo COLLATE latin1_spanish_ci like concat(modele,'%'))
   AND
      (pat is NULL or Vehiculos.Patente COLLATE latin1_spanish_ci like concat(pat,'%'));
   
   
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
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_spanish_ci */ ;
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
IN cons int,
IN col varchar(45),
IN typeVeId INT,
IN a BIT
)
BEGIN  
    
   -- SELECT fe as fecha1,STR_TO_DATE(fe, '%m/%d/%Y') as fecha2, Convert(fe,Date) as fecha3;
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

-- Dump completed on 2012-10-26 10:57:36
