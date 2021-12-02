
INSERT INTO Rules (RuleId,Nombre,Descripcion)
VALUES (33,'VER_COMPRAS','Ver administracion de Compras');
INSERT INTO Rules (RuleId,Nombre,Descripcion)
VALUES (34,'VER_PROV','Ver administracion de Proveedores');
INSERT INTO Rules (RuleId,Nombre,Descripcion)
VALUES (35,'VER_ORGA','Ver administracion de Organizaciones');
INSERT INTO `tapelorena`.`Rules` (`RuleId`, `Nombre`, `Descripcion`) 
VALUES ('36', 'VER_WIDGETS', 'Ver widgets ');
INSERT INTO transRuleProfile (ProfileId,RuleId)
VALUES (1,33);
INSERT INTO transRuleProfile (ProfileId,RuleId)
VALUES (1,34);
INSERT INTO transRuleProfile (ProfileId,RuleId)
VALUES (1,35);
INSERT INTO transRuleProfile (ProfileId,RuleId)
VALUES (1,36);