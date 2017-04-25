


DROP PROCEDURE IF EXISTS `emerald_updateForCobro`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `emerald_updateForCobro`(
IN a INT,
IN m INT
)
BEGIN

DECLARE c INT;
DECLARE b INT;
DECLARE cId INT;
DECLARE c1 INT;

DROP TABLE IF EXISTS tmpCentros;
DROP TABLE IF EXISTS tmpInternos;

CREATE temporary table tmpCentros
(
id int(4) NOT NULL AUTO_INCREMENT,
id_centro INT(4),

PRIMARY KEY (id),
UNIQUE KEY id (id)
);

CREATE temporary table tmpInternos
(
id int(4) NOT NULL AUTO_INCREMENT,
interno INT(4),
-- mes INT(2),
-- anio INT(5),
PRIMARY KEY (id),
UNIQUE KEY id (id)
);


INSERT INTO tmpCentros (id_centro)
SELECT DISTINCT centros.id_centro FROM 
emerald2.centros
WHERE 
   centros.id_centro NOT IN (SELECT id_centro FROM emerald2.internos where anio=a and mes=m)
AND id_centro > 4
ORDER BY centros.id_centro asc;

SET c = (SELECT COUNT(*) FROM tmpCentros);

-- SELECT * FROM tmpCentros;
/*
select * from tmpCentros;
SELECT id_centro from tmpCentros ORDER BY id_centro LIMIT 1;

SELECT DISTINCT interno,usuario,internos.id_centro,id_depto,m,a,0,Null,0
	FROM emerald2.internos 
    where
		id_centro = 6
	and anio=2011 and mes=3;

*/

WHILE c > 0 DO
   
    SET cId = (SELECT id_centro from tmpCentros ORDER BY id_centro LIMIT 1);

	INSERT INTO `emerald2`.`internos`
	(`interno`,`usuario`,`id_centro`,`id_depto`,`mes`,`anio`,`cantllam`,`tiempo`,`costo`)
	SELECT DISTINCT interno,usuario,internos.id_centro,id_depto,m,a,0,Null,0
	FROM emerald2.internos 
	where
		id_centro = cId
    and interno NOT IN (SELECT interno FROM emerald2.internos WHERE anio=a and mes = m)
	and anio=2011 and mes=3;

/*
	SELECT cId;
	-- INSERT INTO tmpInternos (interno)
    SELECT interno FROM emerald2.internos where id_centro=cId and anio= 2011 and mes = 3;
    -- SET c1 = (SELECT COUNT(*) FROM tmpInternos);
  
	-- SELECT * FROM tmpInternos;

    WHILE c1 > 0 DO
	    IF((SELECT IF( EXISTS(
             SELECT * FROM emerald2.internos 
			where anio=a and mes=m and interno IN (SELECT interno FROM tmpInternos where id = c1)), 1, 0)) = 0)
		THEN
			INSERT INTO `emerald2`.`internos`
			(`interno`,`usuario`,`id_centro`,`id_depto`,`mes`,`anio`,`cantllam`,`tiempo`,`costo`)
			SELECT DISTINCT interno,usuario,internos.id_centro,id_depto,m,a,0,Null,0
			FROM emerald2.internos 
			where
				id_centro = cId
			and anio=2011 and mes=3;
		END IF;
        DELETE FROM tmpInternos WHERE id=c1;
        SET c1 = c1 - 1;
	END WHILE;
        */
    DELETE FROM tmpCentros WHERE id_centro = cId;
	SET c = c - 1;

END WHILE;

END ;

