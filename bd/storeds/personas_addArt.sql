


DROP PROCEDURE IF EXISTS `personas_AddArt`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_AddArt`(
IN pId INT,
IN f DATETIME,
IN aId INT,
IN cH VARCHAR(50)

)
BEGIN

DELETE FROM transArticuloPersona WHERE PersonaId = pId AND  DATE(Fecha) = DATE(f);


INSERT INTO transArticuloPersona (PersonaId,ArticuloId,Fecha,ModDate,Data)
VALUES(pId,aId,f,CURDATE(),cH);

END ;

