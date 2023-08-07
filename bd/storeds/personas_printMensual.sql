


DROP PROCEDURE IF EXISTS `personas_printMensual`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_printMensual`(
IN m INT,
IN a INT
)
BEGIN
SET NAMES 'utf8';
DELETE FROM PersonasMes;

INSERT INTO PersonasMes (PersonaId,Leg,ApellidoNombre,Cargo)/*,D1,D2,D3,D4,D5,D6,D7,D8,D9,D10,D11,D12,D13,D14,D15,D16,D17,D18,D19,D20,D21,D22,D23,D24,D25,D26,D27,D28,D30,D30,D31)*/
SELECT 
    Personas.PersonaId,
    `Personas`.`Legajo` as Leg,
    CONCAT(`Personas`.`Apellido`,', ',`Personas`.`Nombre`) AS ApellidoNombre,
    `Personas`.`CargoDesc` as Cargo
FROM Personas
LEFT JOIN transArticuloPersona ON transArticuloPersona.PersonaId = Personas.PersonaId
LEFT JOIN Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId 
WHERE Personas.Active = 1
-- WHERE
--    DATE(transArticuloPersona.Fecha) BETWEEN DATE(CONCAT(a,'-',m,'-','01'))  AND LAST_DAY( DATE(CONCAT(a,'-',m,'-','01'))) 

GROUP BY Personas.PersonaId;

UPDATE PersonasMes SET
                        D1 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','01'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31)),
                        D2 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','02'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId  AND Articulos.ArticuloId NOT IN (30,31))
,
                        D3 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','03'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId  AND Articulos.ArticuloId NOT IN (30,31))
,
                        D4 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','04'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId  AND Articulos.ArticuloId NOT IN (30,31))
,
                        D5 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','05'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId  AND Articulos.ArticuloId NOT IN (30,31))
,
                        D6 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','06'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId  AND Articulos.ArticuloId NOT IN (30,31)),
                        D7 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','07'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId  AND Articulos.ArticuloId NOT IN (30,31)),
                        D8 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','08'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D9 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','09'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D10 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','10'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D11 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','11'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D12 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','12'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D13 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','13'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D14 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','14'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D15 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','15'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31)),
                        D16 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','16'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D17 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','17'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D18 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','18'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D19 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','19'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D20 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','20'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D21 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','21'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D22 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','22'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D23 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','23'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D24 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','24'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D25 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','25'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D26 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','26'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D27 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','27'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D28 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','28'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D29 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','29'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D30 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','30'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))
,
                        D31 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','31'))  AND transArticuloPersona.PersonaId = PersonasMes.PersonaId AND Articulos.ArticuloId NOT IN (30,31))

;


SELECT 
		TRIM(PersonaId) as PersonaId,
		TRIM(Leg) as Leg,
		TRIM(ApellidoNombre) as ApellidoNombre,
		TRIM(Cargo) as Cargo,
		TRIM(D1) as D1,
        TRIM(D2) as D2,TRIM(D3) as D3,
		TRIM(D4) as D4,TRIM(D5) as D5,TRIM(D6) As D6,TRIM(D7) As D7,TRIM(D8) As D8,TRIM(D9) As D9,TRIM(D10) As D10,TRIM(D11) As D11,TRIM(D12) As D12,TRIM(D13) As D13,TRIM(D14) As D14,TRIM(D15) As D15,TRIM(D16) As D16,TRIM(D17) As D17,TRIM(D18) As D18,TRIM(D19) As D19,TRIM(D20) As D20,TRIM(D21) As D21,TRIM(D22) As D22,TRIM(D23) As D23,TRIM(D24) As D24,TRIM(D25) As D25,TRIM(D26) As D26,TRIM(D27) As D27,TRIM(D28) As D28,TRIM(D29) As D29,TRIM(D30) As D30,TRIM(D31) as D31 
FROM
    PersonasMes

GROUP BY PersonaId, Leg, ApellidoNombre,Cargo,D1,D2,D3,D4,D5,D6,D7,D8,D9,D10,D11,D12,D13,D14,D15,D16,D17,D18,D19,D20,D21,D22,D23,D24,D25,D26,D27,D28,D29,D30,D31 
ORDER BY ApellidoNombre ASC

;

END ;

