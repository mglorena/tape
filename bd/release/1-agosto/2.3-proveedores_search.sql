
DROP PROCEDURE IF EXISTS `proveedores_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proveedores_search`(
IN i INT,
IN razon varchar(250),
IN rub varchar(150),
IN dom varchar(250)
)
BEGIN


IF (i = 0) THEN SET i = NULL; END IF;
IF (razon ='') THEN SET razon = NULL; END IF;
IF (rub ='' OR rub='0') THEN SET rub = NULL;END IF;
IF (dom ='') THEN SET dom = NULL;END IF;


IF((rub is NOT Null) OR (razon is NOT NULL) OR (dom is NOT NUll) OR (i is NOT NUll))
THEN
   call split_string(rub,','); 
SELECT `Proveedores`.`ProveedorId`,
    `Proveedores`.`RazonSocial`,
    `Proveedores`.`Domicilio`,
    `Proveedores`.`Observaciones`,
    `Proveedores`.`Fecha`,
    `Proveedores`.`CUIT`,
    `Proveedores`.`Celular`,
    `Proveedores`.`Telefono`,
    `Proveedores`.`Email`,
    `Proveedores`.`PersonaContacto`,
    `Proveedores`.`Localidad`,
    `Proveedores`.`Provincia`,
    `Proveedores`.`Active`,
    --  Rubros.Nombre as RubroNombre
     GROUP_CONCAT(Rubros.Nombre SEPARATOR ' ,') as RubroNombre,
     GROUP_CONCAT(Rubros.RubroId SEPARATOR ' ,') as RubroIds

FROM Proveedores
INNER JOIN transProveedorRubro ON transProveedorRubro.ProveedorId = Proveedores.ProveedorId
INNER JOIN Rubros ON Rubros.RubroId = transProveedorRubro.RubroId
WHERE 
(i is null OR Proveedores.ProveedorId = i)
AND (razon is NULL or Proveedores.RazonSocial COLLATE utf8_spanish_ci like concat(razon,'%'))
AND (rub is NULL or Rubros.RubroId IN (SELECT value FROM SplitValues))
AND (dom is NULL or Proveedores.Domicilio COLLATE utf8_spanish_ci like concat(dom,'%'));


END IF;
END