-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------


DROP PROCEDURE IF EXISTS `personas_getAll`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_getAll`()
BEGIN

SET NAMES 'utf8';
    SELECT PersonaId, CONCAT(Apellido,', ',Nombre) as Nombre FROM Personas Where Active = 1 ORDER BY Apellido asc;

END