-- MySQL dump 10.13  Distrib 5.1.61, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: emerald2
-- ------------------------------------------------------
-- Server ve
--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Password` varchar(20) COLLATE latin1_spanish_ci NOT NULL,
  `FirstName` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `LastName` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Email` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `ProfileId` int(11) DEFAULT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
)ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES  `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('1','mlgarcia','1234','Lorena','Garcia','',1,1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centros`
--
DROP TABLE IF EXISTS `Profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Profiles` (
  `ProfileId` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`ProfileId`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `Profiles` WRITE;
INSERT INTO `Profiles` VALUES (1,'Admin');
INSERT INTO `Profiles` VALUES (2,'Chofer');
INSERT INTO `Profiles` VALUES (3,'Automotores');
INSERT INTO `Profiles` VALUES (4,'Stock');
INSERT INTO `Profiles` VALUES (5,'Servicios');
UNLOCK TABLES;



DROP TABLE IF EXISTS `Rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Rules` (
  `RuleId` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `Descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`RuleId`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Rules` WRITE;
INSERT INTO `Rules` VALUES (1,'VER_USER','Ver administracion de Usuarios');
INSERT INTO `Rules` VALUES (2,'UPD_USER','Modificar Usuarios');
INSERT INTO `Rules` VALUES (3,'INS_USER','Insertar Usuarios');
INSERT INTO `Rules` VALUES (4,'VER_PROFILE','Ver administracion de profiles');
INSERT INTO `Rules` VALUES (5,'UPD_PROFILE','Modificar profiles');
INSERT INTO `Rules` VALUES (6,'INS_PROFILE','Insertar profiles');
INSERT INTO `Rules` VALUES (7,'VER_STOCK','Ver stock');
INSERT INTO `Rules` VALUES (8,'UPD_STOCK','Modificar stock');
INSERT INTO `Rules` VALUES (9,'INS_STOCK','Insertar stock');
INSERT INTO `Rules` VALUES (10,'VER_AUTO','Ver automotores');
INSERT INTO `Rules` VALUES (11,'UPD_AUTO','Modificar automotores');
INSERT INTO `Rules` VALUES (12,'INS_AUTO','Insertar automotores');
UNLOCK TABLES;


DROP TABLE IF EXISTS `transRuleProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transRuleProfile`(
  `ProfileId` tinyint(4) unsigned NOT NULL,
  `RuleId` tinyint(4) unsigned NOT NULL
 ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `transRuleProfile` WRITE;
INSERT INTO `transRuleProfile` VALUES (1,1);
INSERT INTO `transRuleProfile` VALUES (1,2);
INSERT INTO `transRuleProfile` VALUES (1,3);
INSERT INTO `transRuleProfile` VALUES (1,4);
INSERT INTO `transRuleProfile` VALUES (1,5);
INSERT INTO `transRuleProfile` VALUES (1,6);
INSERT INTO `transRuleProfile` VALUES (1,7);
INSERT INTO `transRuleProfile` VALUES (1,8);
INSERT INTO `transRuleProfile` VALUES (1,9);
INSERT INTO `transRuleProfile` VALUES (1,10);
INSERT INTO `transRuleProfile` VALUES (1,11);
INSERT INTO `transRuleProfile` VALUES (1,12);
UNLOCK TABLES;

