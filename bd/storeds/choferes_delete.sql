


DROP PROCEDURE IF EXISTS `choferes_delete`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `choferes_delete`(
IN chId INT
)
BEGIN

  if((SELECT count(ChoferId) FROM transReservaChofer where ChoferId=chId)=0)
   THEN
        if((SELECT count(ChoferId) FROM HorasExtra where ChoferId=chId)=0)
        THEN
            DELETE FROM Choferes WHERE ChoferId = chId;
            SELECT 1;
        ELSE 
            SELECT 0;
        END IF;
    ELSE 
        SELECT 0;
   END IF;

END ;

