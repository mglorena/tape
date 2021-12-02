DROP PROCEDURE IF EXISTS `orgas_getChilds`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `orgas_getChilds`(
 IN cur INT

)
BEGIN

DECLARE l int;
DECLARE line char(20);

CREATE TEMPORARY TABLE tblist (item char(20));

CREATE TEMPORARY TABLE stack (item char(20), lvl int);

INSERT INTO stack VALUES (cur, 1);

SET l = 1;

 WHILE (l > 0) DO
		IF EXISTS (SELECT item FROM stack WHERE lvl = l LIMIT 1)
			THEN 
				SET cur = (SELECT  item FROM stack 	WHERE lvl = l LIMIT 1);
           		-- SELECT cur;
				INSERT INTO tblist (item) SELECT cur;
				DELETE FROM stack 	WHERE lvl = l AND item = cur;
				INSERT INTO stack (item,lvl) SELECT DependenciaId, l + 1 FROM Dependencias WHERE PadreId = cur;
				IF (FOUND_ROWS() > 0)
				THEN
					SET l = l + 1;
                END IF;
	        ELSE
                SET l = l - 1;
		   END IF;
END WHILE;

SELECT * FROM tblist INNER JOIN Dependencias ON Dependencias.DependenciaId = item;
DROP TABLE stack;
DROP TABLE tblist;

END