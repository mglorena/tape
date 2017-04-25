DROP PROCEDURE IF EXISTS `proveedores_update`  ;


CREATE DEFINER=`root`@`localhost` PROCEDURE `proveedores_update`(
IN prId INT,
IN rs varchar(250),
IN dom varchar(250),
IN obs varchar(250),
IN cu varchar(50),
in cel varchar(20),
in tel varchar(20),
in mail varchar(50),
in perso varchar(50),
in a char(2),
in rubs varchar(30),
in prov varchar(200),
in loc varchar(200)


)
BEGIN
if (a='on') THEN SET a = 1; END IF;
call split_string(rubs,','); 
if (prId <> 0)
THEN

	DELETE FROM transProveedorRubro WHERE ProveedorId = prId;

	UPDATE `Proveedores`
	SET
		`RazonSocial` = rs,
		`Domicilio` =dom,
		`Observaciones` = obs,
		`Fecha` =CURDATE(),
		`CUIT` = cu,
		`Celular` =cel,
		`Telefono` = tel,
		`Email` =mail,
		`PersonaContacto` = perso,
		 Localidad = loc,
		 Provincia = prov,
		 Active = a
	WHERE `ProveedorId` =prId;

ELSE 

	INSERT INTO Proveedores(`RazonSocial`,`Domicilio`,`Observaciones`,`Fecha`,`CUIT`,`Celular`,`Telefono`,`Email`,`PersonaContacto`,`Active`,Localidad,Provincia)VALUES
	(rs,dom,obs,CURDATE(),cu,cel,tel,mail,perso,a,loc,prov);
	SET prId = LAST_INSERT_ID();

END IF;


	INSERT INTO transProveedorRubro (ProveedorId,RubroId)
	SELECT prId,value FROM SplitValues ;




END