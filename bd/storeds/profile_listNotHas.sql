


DROP PROCEDURE IF EXISTS `profile_listNotHas`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `profile_listNotHas`(
IN p INT
)
BEGIN

   SELECT Rules.Descripcion as 'desc', Rules.Nombre as 'name', Rules.RuleId as 'id' 
   FROM Rules 
   WHERE RuleId NOT IN (SELECT RuleId FROM transRuleProfile WHERE ProfileId = p);

END ;

