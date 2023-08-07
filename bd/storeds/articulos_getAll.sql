DROP PROCEDURE IF EXISTS `articulos_getAll` ;
CREATE  PROCEDURE `articulos_getAll`()
BEGIN
SET NAMES 'utf8';
Select 
    ArticuloId,
    CONCAT(Nombre,' - ', Descripcion) as Nombre

from Articulos
ORDER BY Nombre;
END;
