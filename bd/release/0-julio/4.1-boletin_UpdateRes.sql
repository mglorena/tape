

CREATE DEFINER=`root`@`localhost` PROCEDURE `boletin_updateRes`(
IN boId INT,
IN res Varchar(45),
IN len INT
)
BEGIN

UPDATE `Boletin`
SET
`Length` = len,
`LastResNumber` = res,
`Fecha` = CURDATE()

WHERE `BoletinId` = boId;


END;