


DROP PROCEDURE IF EXISTS `vehiculos_update`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vehiculos_update`(
IN veId INT,
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
    SET NAMES 'utf8';
    SET CHARACTER SET 'utf8';

    IF(veId = 0 OR veId IS NULL) 
    THEN
        INSERT INTO `Vehiculos`
        (
        `Modelo`,`Patente`,`Capacidad`,`CombustibleId`,`Descripcion`,`Fecha`,`ConsumoxKM`,`Color`,`TipoVehiculoId`,Kilometraje,KilometrajeRef,`Active`) 
        VALUES
        (modele,pat,capac,cmbId,descrip,fe,cons,col,typeVeId,km,km+10000,a);
    ELSE
    /*SELECT  descrip INTO OUTFILE '/tmp/mail.txt' 
              FIELDS TERMINATED by '\r\n' ESCAPED BY '';*/
           
        UPDATE Vehiculos SET Modelo=modele, Patente=pat, Kilometraje = Km,
        CombustibleId=cmbId,Capacidad=capac,Descripcion=descrip, 
        Color=col, Fecha = fe, ConsumoxKM=cons,TipoVehiculoId=typeVeId,Active = a
        WHERE VehiculoId = veId;
END IF;

END ;

