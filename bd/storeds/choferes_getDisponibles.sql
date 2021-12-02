


DROP PROCEDURE IF EXISTS `choferes_getDisponibles`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `choferes_getDisponibles`(

IN feI DATE,
IN feF DATE,
IN reId INT

)
BEGIN

SET NAMES 'utf8';

SELECT 
    Choferes.ChoferId, CONCAT(FirstName ,", ", LastName) as FirstName -- ,feI,feF
FROM Choferes
WHERE 
  Choferes. ChoferId NOT IN

(
    SELECT 
        Choferes.ChoferId
    FROM Reservas
    INNER JOIN transReservaChofer ON transReservaChofer.ReservaId = Reservas.ReservaId
    INNER JOIN Choferes ON Choferes.ChoferId = transReservaChofer.ChoferId
    WHERE
    (
        DATE(feI) BETWEEN   DATE(FechaInicio)  AND   DATE(FechaFin)
        OR
        DATE(feF) BETWEEN   DATE(FechaInicio)  AND   DATE(FechaFin)
    )
  AND Reservas.ReservaId <> reId AND Reservas.Papelera = 0
  AND Reservas.EstadoId <> 3
)
AND
    Active=1
GROUP BY Choferes.ChoferId;
END ;

