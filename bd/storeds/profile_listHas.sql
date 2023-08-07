


DROP PROCEDURE IF EXISTS `profile_listHas`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `profile_listHas`(
IN p INT
)
BEGIN

  SELECT Rules.Nombre as 'name', Rules.Descripcion as 'desc',Rules.RuleId as 'id' FROM transRuleProfile
  INNER JOIN Rules ON Rules.RuleId = transRuleProfile.RuleId
  WHERE ProfileId = p;
 

END ;

