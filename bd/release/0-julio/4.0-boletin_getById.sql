

CREATE DEFINER=`root`@`localhost` PROCEDURE `boletin_getById`(
IN bId INT
)
BEGIN

   SELECT * FROM Boletin where BoletinId= bId;
END ;
