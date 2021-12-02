


DROP PROCEDURE IF EXISTS `vehiculos_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_search`(
 

)
BEGIN
SET NAMES 'utf8';

   SELECT 
    `Vehiculos`.`VehiculoId`,
    `Vehiculos`.`Modelo`,
    `Vehiculos`.`Patente`,
    `Vehiculos`.`Capacidad`,
    `Vehiculos`.`CombustibleId`,
    `Vehiculos`.`Descripcion`,
    `Vehiculos`.`ConsumoxKM`,
    `Vehiculos`.`Color` as Color ,
     Kilometraje,
     TipoVehiculo.TipoVehiculoId,
    CASE WHEN Active = 1 THEN 'Si' ELSE 'No' END as Active,
    Fecha
   FROM Vehiculos  
   INNER JOIN TipoVehiculo ON TipoVehiculo.TipoVehiculoId = Vehiculos.TipoVehiculoId;
  /* WHERE 
      (veId is Null or Vehiculos.VehiculoId = veId)
   AND
     (a is Null or Vehiculos.Active = a)
   AND
      (modele is NULL or Vehiculos.Modelo COLLATE utf8_spanish_ci like concat(modele,'%'))
   AND
      (pat is NULL or Vehiculos.Patente COLLATE utf8_spanish_ci like concat(pat,'%'));*/
   
   
END ;

