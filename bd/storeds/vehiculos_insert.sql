


DROP PROCEDURE IF EXISTS `vehiculos_insert`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_insert`(
IN modele varchar(100),
IN pat varchar(100),
IN cmbId int,
IN capac varchar(45),
IN fe INT,
IN descrip text,
IN cons FLOAT,
IN col varchar(45),
IN typeVeId INT,
IN Km INT,
IN a BIT
)
BEGIN  

    INSERT INTO `Vehiculos`
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
Kilometraje,
KilometrajeRef,
`Active`) 

VALUES
(
modele,
pat,
capac,
cmbId,
descrip,
fe,
cons,
col,
typeVeId,
km,
k+10000,
a
);

    

END ;

