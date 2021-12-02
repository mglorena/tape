


DROP PROCEDURE IF EXISTS `personas_getById`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_getById`(
IN pId INT,
IN a INT
)
BEGIN
SET NAMES 'utf8';
SELECT 
Personas.PersonaId,
Personas.CargoDesc,
Personas.Categoria,
Personas.Apellido,
Personas.Nombre,
Personas.Legajo,
Personas.Domicilio,
Personas.Observaciones,
Personas.VacacionesDias,
(SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona 
  LEFT JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE transArticuloPersona.PersonaId = Personas.PersonaId
AND YEAR(transArticuloPersona.Fecha) = a AND 
Articulos.Nombre ="Fe") as Fe,

(SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona 
  LEFT JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE transArticuloPersona.PersonaId = Personas.PersonaId
AND YEAR(transArticuloPersona.Fecha) = a AND 
Articulos.Nombre ="E") as E
,

(SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona 
  LEFT JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE transArticuloPersona.PersonaId = Personas.PersonaId
AND YEAR(transArticuloPersona.Fecha) = a AND 
Articulos.Nombre ="LT") as LT,

(SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona 
  LEFT JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE transArticuloPersona.PersonaId = Personas.PersonaId
AND YEAR(transArticuloPersona.Fecha) = a AND 
Articulos.Nombre ="IC") as Art101,

(SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona 
  LEFT JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE transArticuloPersona.PersonaId = Personas.PersonaId
AND YEAR(transArticuloPersona.Fecha) = a AND 
Articulos.Nombre ="102") as Art102,
(SELECT SUM(CONVERT(transArticuloPersona.Data, DECIMAL(10,2))) FROM transArticuloPersona 
  LEFT JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE transArticuloPersona.PersonaId = Personas.PersonaId
AND YEAR(transArticuloPersona.Fecha) = a AND 
Articulos.ArticuloId =30) as ArtPS
,
(SELECT SUM(CONVERT(transArticuloPersona.Data, DECIMAL(10,2))) FROM transArticuloPersona 
  LEFT JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE transArticuloPersona.PersonaId = Personas.PersonaId
AND YEAR(transArticuloPersona.Fecha) = a AND 
Articulos.ArticuloId =31) as ArtPSD,
(SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona 
  LEFT JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE transArticuloPersona.PersonaId = Personas.PersonaId
AND YEAR(transArticuloPersona.Fecha) = a AND 
Articulos.Nombre ="V") as VACAS
FROM Personas 
WHERE Personas.PersonaId = pId;

END ;

