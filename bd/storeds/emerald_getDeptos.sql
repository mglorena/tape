


DROP PROCEDURE IF EXISTS `emerald_getDeptos`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `emerald_getDeptos`()
BEGIN
SET NAMES 'utf8';
-- select id_depto, NombreCompleto from emerald2.departamentos where NombreCompleto <> 'NULL';
SELECT departamentos.id_depto, departamentos.NombreCompleto 
FROM emerald2.departamentos 
INNER JOIN emerald2.internos ON internos.id_depto = departamentos.id_depto 
WHERE internos.interno NOT LIKE '7%' 
AND departamentos.NombreCompleto <> '' 
AND departamentos.NombreCompleto <> 'Por Defecto' 
group by departamentos.NombreCompleto 
Order by departamentos.NombreCompleto;
END ;

