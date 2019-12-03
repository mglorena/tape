
CREATE TABLE IF NOT EXISTS   `transRuleProfile` (
  `ProfileId` tinyint(4) unsigned NOT NULL,
  `RuleId` tinyint(4) unsigned NOT NULL,
  PRIMARY KEY (`ProfileId`,`RuleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
