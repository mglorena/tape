


DROP PROCEDURE IF EXISTS `emerald_update`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `emerald_update`(
IN m INT,
IN a INT
)
BEGIN
INSERT INTO `emerald2`.`internos`
(`interno`,`usuario`,`id_centro`,`id_depto`,`mes`,`anio`,`cantllam`,`tiempo`,`costo`,`dependencia`,`personas`)
SELECT DISTINCT interno,usuario,id_centro,id_depto,m,a,0,Null,0,dependencia,personas
from internos where interno 
NOT IN (SELECT interno FROM internos where anio=a and mes=m)
AND anio= a
;

END ;

