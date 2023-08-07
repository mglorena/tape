


DROP PROCEDURE IF EXISTS `vehiculos_getDisponibles`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_getDisponibles`(
IN feI DATETIME,
IN feF DATETIME,
IN nump INT,
IN reId INT

)
BEGIN
SET NAMES 'utf8';
  SELECT
      Vehiculos.VehiculoId,
      CONCAT(Vehiculos.Modelo," - ", Vehiculos.Patente) as Modelo,
      CONCAT("Pas: ",Vehiculos.Capacidad) as Capacidad
  FROM 
      Vehiculos
  
  WHERE
     Vehiculos.Capacidad >= nump 
     AND
     Vehiculos.Active = 1
     AND
     Vehiculos.VehiculoId NOT IN (

     SELECT VehiculoId FROM Reservas
     WHERE
        (
           DATE(feI) BETWEEN   DATE(FechaInicio)  AND   DATE(FechaFin)
            OR
           DATE(feF) BETWEEN   DATE(FechaInicio)  AND   DATE(FechaFin)
        )
     AND ReservaId <> reId  AND Reservas.Papelera = 0
     AND Reservas.EstadoId <> 3
    )

   ORDER BY Vehiculos.Capacidad asc, Vehiculos.VehiculoId;

END ;

