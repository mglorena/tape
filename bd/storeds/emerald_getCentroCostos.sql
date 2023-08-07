


DROP PROCEDURE IF EXISTS `emerald_getCentroCostos`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `emerald_getCentroCostos`()
BEGIN
SET NAMES 'utf8';
  select centros.id_centro,nombre from emerald2.centros
 inner join emerald2.internos on internos.id_centro = centros.id_centro
where nombre <> ''
 GROUP BY centros.id_centro, nombre;
END ;

