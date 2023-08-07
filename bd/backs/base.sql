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
  `Nombre` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Apellido` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Legajo` int(11) NOT NULL,
  `Celular` varchar(45) COLLATE latin1_spanish_ci DEFAULT NULL,
  `Active` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`ChoferId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Choferes`
--

LOCK TABLES `Choferes` WRITE;
/*!40000 ALTER TABLE `Choferes` DISABLE KEYS */;
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
  `Name` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ProfileId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profiles`
--

LOCK TABLES `Profiles` WRITE;
/*!40000 ALTER TABLE `Profiles` DISABLE KEYS */;
INSERT INTO `Profiles` VALUES (1,'Admin2','\0'),(2,'Chofer',''),(3,'Automotores',''),(4,'Stock','');
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
  `Solicitante` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `Destino` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `VehiculoId` tinyint(4) NOT NULL,
  `FechaInicio` datetime NOT NULL,
  `FechaFin` datetime NOT NULL,
  `Descripcion` varchar(400) COLLATE latin1_spanish_ci DEFAULT NULL,
  `FileName` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `Estado` tinyint(4) NOT NULL,
  `CostoTotal` double DEFAULT NULL,
  `Active` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`ReservaId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservas`
--

LOCK TABLES `Reservas` WRITE;
/*!40000 ALTER TABLE `Reservas` DISABLE KEYS */;
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
  `Nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `Descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`RuleId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rules`
--

LOCK TABLES `Rules` WRITE;
/*!40000 ALTER TABLE `Rules` DISABLE KEYS */;
INSERT INTO `Rules` VALUES (1,'VER_USER','Ver administracion de Usuarios'),(2,'UPD_USER','Modificar Usuarios'),(3,'INS_USER','Insertar Usuarios'),(4,'VER_PROFILE','Ver administracion de profiles'),(5,'UPD_PROFILE','Modificar profiles'),(6,'INS_PROFILE','Insertar profiles'),(7,'VER_STOCK','Ver stock'),(8,'UPD_STOCK','Modificar stock'),(9,'INS_STOCK','Insertar stock'),(10,'VER_AUTO','Ver automotores'),(11,'UPD_AUTO','Modificar automotores'),(12,'INS_AUTO','Insertar automotores');
/*!40000 ALTER TABLE `Rules` ENABLE KEYS */;
UNLOCK TABLES;

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
  `ProfileId` int(10) DEFAULT NULL,
  `Active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'mlgarcia','1234','Lorena','Garcia','mlgarcia2@unsa.edu.ar',NULL,NULL),(7,'admin','miomia','Hector','Cristofari','mglorena@gmail.com',NULL,NULL),(10,'er','123','ere','ere','erere',NULL,NULL),(11,'mg','pass','firs','last','mlg@uns.edu',2,'\0'),(12,'fgf','345','fgf','fgf','fgf',2,'\0'),(13,'mg','pass','firs','last','mlg@uns.edu',2,'\0');
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
  `Modelo` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `Patente` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `Capacidad` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `CombustibleId` tinyint(4) NOT NULL,
  `Descripcion` varchar(400) COLLATE latin1_spanish_ci DEFAULT NULL,
  `Active` bit(1) DEFAULT b'1',
  PRIMARY KEY (`VehiculoId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehiculos`
--

LOCK TABLES `Vehiculos` WRITE;
/*!40000 ALTER TABLE `Vehiculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Vehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transRuleProfile`
--

DROP TABLE IF EXISTS `transRuleProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transRuleProfile` (
  `ProfileId` tinyint(4) unsigned NOT NULL,
  `RuleId` tinyint(4) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transRuleProfile`
--

LOCK TABLES `transRuleProfile` WRITE;
/*!40000 ALTER TABLE `transRuleProfile` DISABLE KEYS */;
INSERT INTO `transRuleProfile` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12);
/*!40000 ALTER TABLE `transRuleProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tape'
--
/*!50003 DROP PROCEDURE IF EXISTS `profile_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 DROP PROCEDURE IF EXISTS `users_deleteUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 DROP PROCEDURE IF EXISTS `users_insertUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-10-08 20:36:45
