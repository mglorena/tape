


DROP PROCEDURE IF EXISTS `users_getRules`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_getRules`(
IN uName varchar(100)
)
BEGIN

    SELECT GROUP_CONCAT(RuleId)
    FROM 
        transRuleProfile
    INNER JOIN Profiles ON Profiles.ProfileId = transRuleProfile.ProfileId
    INNER JOIN Users On Users.UserName = uName
    WHERE Users.ProfileId = transRuleProfile.ProfileId;

END ;

