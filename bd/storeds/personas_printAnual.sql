


DROP PROCEDURE IF EXISTS `personas_printAnual`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `personas_printAnual`(
IN a INT
)
BEGIN

DECLARE c INT;
DECLARE count INT;
DECLARE m INT;
SET NAMES 'utf8';

CREATE TEMPORARY TABLE tmpPersonas
(
id INT(11) NOT NULL AUTO_INCREMENT,
PersonaId INT(11),
PRIMARY KEY (id),
UNIQUE KEY id (id)
);

INSERT INTO tmpPersonas (PersonaId)
SELECT PersonaId FROM Personas WHERE PersonaId IS NOT NULL AND Active = 1;

SET count = (SELECT COUNT(PersonaId) FROM tmpPersonas);


WHILE count > 0 DO

     SET c = (SELECT PersonaId FROM tmpPersonas WHERE id = count);
     
     SET m = 12;
     WHILE m > 0 DO
     
     UPDATE PersonasAnio  SET
           D1 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','01'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )  
 ,
                        D2 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','02'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D3 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','03'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D4 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','04'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D5 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','05'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D6 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','06'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) ),
                        D7 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','07'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) ),
                        D8 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','08'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D9 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','09'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D10 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','10'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D11 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','11'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D12 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','12'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D13 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','13'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D14 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','14'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D15 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','15'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) ),
                        D16 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','16'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D17 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','17'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D18 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','18'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D19 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','19'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D20 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','20'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D21 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','21'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D22 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','22'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D23 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','23'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D24 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','24'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D25 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','25'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D26 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','26'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D27 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','27'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D28 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','28'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D29 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','29'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D30 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','30'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        D31 = (SELECT Articulos.Nombre FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE DATE(transArticuloPersona.Fecha) = DATE(CONCAT(a,'-',m,'-','31'))  AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        E = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="E" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) ),
                        
                        Fe = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Fe" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TE = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="E" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )

,
                        V = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="V" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        Tom = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="V" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        Ic = (SELECT CASE WHEN COUNT(Articulos.ArticuloId) =0 THEN '' ELSE  COUNT(Articulos.ArticuloId) END  FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Ic" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TIc = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Ic" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        Ma = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Ca" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TMa = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Ca" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        Ins = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Is" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TIns = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Is" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TFe = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Fe" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        Ac = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Ac" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TAc = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Ac" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        LT = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="LT" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TLT = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="LT" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )

,
                        Na = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Na" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TNa = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Na" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        Re = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Re" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TRe = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Re" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )

,
                        Ds = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Ds" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TDs = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Ds" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        Cp = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE MONTH(transArticuloPersona.Fecha) = m AND YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Cp" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )
,
                        TCp = (SELECT COUNT(Articulos.ArticuloId) FROM transArticuloPersona INNER JOIN  Articulos ON Articulos.ArticuloId = transArticuloPersona.ArticuloId
WHERE YEAR(transArticuloPersona.Fecha) = a  AND Articulos.Nombre ="Cp" AND transArticuloPersona.PersonaId = PersonasAnio.PersonaId AND PersonasAnio.PersonaId = c  AND Articulos.ArticuloId NOT IN (30,31) )


WHERE PersonasAnio.PersonaId = c AND PersonasAnio.Mes = m;


       SET m = m - 1;
 END WHILE;
 DELETE FROM tmpPersonas where id = count;
 SET count = count - 1;
 
 END WHILE;

-- Select  dfdfd

 SELECT 
  Personas.PersonaId,
  Mes,
  Personas.Legajo as Leg,
  CONCAT(Personas.Apellido,', ',Personas.Nombre) as Nombre,
CONCAT(Personas.CargoDesc,' Cat.',IFNULL(Personas.Categoria,'')) as Cat,
  VacacionesDias as VDias,
  D1,
  D2,
  D3,
  D4,
  D5 ,
  D6 ,
  D7 ,
  D8 ,
  D9 ,
  D10 ,
  D11 ,
  D12 ,
  D13 ,
  D14 ,
  D15 ,
  D16 ,
  D17 ,
  D18 ,
  D19 ,
  D20 ,
  D21 ,
  D22 ,
  D23 ,
  D24 ,
  D25 ,
  D26 ,
  D27 ,
  D28 ,
  D29 ,
  D30 ,
  D31 ,
  E ,
  Fe,
  TFe,
  V,
  TE,
  Ic,
  Tom,
  TIc,
  Ma,
  TMa,
  Ins,
  TIns,
  Ac,
  TAc,
  VacacionesDias - Tom as TAde,
  LT,
  TLT,
  Na,
  TNa,
  Re,
  TRe,
  Ds,
  TDs,
  Cp,
  TCp

  FROM PersonasAnio 
  INNER JOIN Personas ON Personas.PersonaId = PersonasAnio.PersonaId
  ORDER BY Personas.PersonaId asc, Mes asc;
  DROP TABLE tmpPersonas;
END ;

