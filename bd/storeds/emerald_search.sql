


DROP PROCEDURE IF EXISTS `emerald_search`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `emerald_search`(
IN i INT,
IN m INT,
IN a INT,
IN c INT,
IN d INT,
IN f INT
)
BEGIN
DECLARE ABONO_COMUN FLOAT;
DECLARE ABONO_PINFIC FLOAT;
DECLARE ABONO_VOZDATOS FLOAT;
DECLARE ABONO_JEFESEC FLOAT;
DECLARE ABONO_SINDDE FLOAT;
SET NAMES 'utf8';
SET ABONO_SINDDE =9.6;
SET ABONO_COMUN =12.6;
SET ABONO_PINFIC = 1.5;
SET ABONO_VOZDATOS = 32;
SET ABONO_JEFESEC = 22;

If (i = 0 ) THEN SET i = NUll; END IF;
If (c = 0 ) THEN SET c = NUll; END IF;
If (d = 0 ) THEN SET d = NUll; END IF;
/*
SELECT  dia,mes,anio,type,est INTO OUTFILE '/tmp/mailreservas16.txt' 
              FIELDS TERMINATED by '\r\n' ESCAPED BY '';*/

IF(f = 1) THEN SELECT *
        FROM ( 

SELECT   
                `centros`.`COMUN` as Comun,
                `centros`.`JefeSec` as JefeSec,
                `centros`.`SINDDE`,
                `centros`.`PINFic`,
                `centros`.`VOZDATOS` as VozDatos,
                `centros`.`Credito`,
                `centros`.`CargoConexion` as CargoCon,
--                 interno as Interno,
                centros.Nombre as Centro,
                centros.id_centro,
                usuario as Usuario,
                centros.Orga,
                CAST(centros.COMUN * ABONO_COMUN  +  centros.JefeSec * ABONO_JEFESEC + centros.VOZDATOS * ABONO_VOZDATOS + centros.SINDDE * ABONO_SINDDE + centros.PINFic * ABONO_PINFIC AS Decimal(10,2)) as Abono,
                COALESCE(sec_to_time(sum(time_to_sec(tiempo))),"00:00:00") as Tiempo,
                sum(cantllam) as CantLlam,
                sum(costo) as Costo,
                sum(costo) + centros.Credito as Periodo,
                sum(costo) + centros.Credito + centros.CargoConexion + centros.COMUN * ABONO_COMUN  +  centros.JefeSec * ABONO_JEFESEC + centros.VOZDATOS * ABONO_VOZDATOS + centros.SINDDE * ABONO_SINDDE + centros.PINFic * ABONO_PINFIC as Total,
                CASE WHEN centros.Paga = 1 THEN 'Si' ELSE 'No' END as Paga
            FROM emerald2.internos 
            INNER JOIN emerald2.centros on centros.id_centro = internos.id_centro 
            WHERE mes=m 
            AND anio=a  and centros.id_centro > 7 AND centros.id_centro < 136
GROUP BY (internos.id_centro)
   ) as Data
            GROUP BY Data.Comun,Data.JefeSec,Data.SINDDE,Data.PINFic,Data.VozDatos,
                Data.Credito,Data.CargoCon,Data.Centro,Data.id_centro,Data.Usuario,Data.Orga,Data.Abono,Data.Tiempo,Data.CantLlam,
                Data.Costo,Data.Periodo,Data.Total,Data.Paga
            ORDER BY Data.Orga desc, Data.Centro asc;
END IF;
IF( f = 0 ) THEN
SELECT 
          centros.Nombre as Centro,
          departamentos.NombreCompleto as Dep,
          internos.interno as Interno,
          internos.usuario as Usuario,
          centros.COMUN as Comun,
          centros.JefeSec,
          centros.SINDDE,
          centros.PINFic,
          centros.VOZDATOS as VozDatos,
          centros.CargoConexion as CargoCon,
          centros.Credito,
           CAST(centros.COMUN * ABONO_COMUN  +  centros.JefeSec * ABONO_JEFESEC + centros.VOZDATOS * ABONO_VOZDATOS + centros.SINDDE * ABONO_SINDDE + centros.PINFic * ABONO_PINFIC as Decimal(10,2)) as Abono,
          COALESCE(sec_to_time(tiempo),"00:00:00") as Tiempo,
          internos.cantllam as CantLlam,
          internos.costo as Costo,
          internos.costo + centros.Credito as Periodo ,
          internos.costo + centros.Credito + centros.CargoConexion + centros.COMUN * ABONO_COMUN  +  centros.JefeSec * ABONO_JEFESEC + centros.VOZDATOS * ABONO_VOZDATOS + centros.SINDDE * ABONO_SINDDE + centros.PINFic * ABONO_PINFIC as Total,
           CASE WHEN centros.Paga = 1 THEN 'Si' ELSE 'No' END as Paga
       
 FROM
   emerald2.internos
   LEFT JOIN emerald2.centros ON centros.id_centro = internos.id_centro
   LEFT JOIN emerald2.departamentos ON departamentos.id_depto = internos.id_depto
   
 WHERE
    ( c is null OR internos.id_centro = c)
 AND
    ( d is null OR internos.id_depto = d)
 AND 
    (i is null OR internos.interno = i)
 AND 
    (a is null OR internos.anio = a)
 AND 
    (m is null OR internos.mes = m)
 ORDER BY centros.Orga desc,centros.Nombre,departamentos.NombreCompleto,interno,usuario;
END IF;
IF( f = 4 ) THEN
SELECT 
          centros.Nombre as Centro,
          departamentos.NombreCompleto as Dep,
          -- internos.interno as Interno,
          -- internos.usuario as Usuario,
          centros.COMUN as Comun,
          centros.JefeSec,
          centros.SINDDE,
          centros.PINFic,
          centros.VOZDATOS as VozDatos,
          centros.CargoConexion as CargoCon,
          centros.Credito,
          CAST(centros.COMUN * ABONO_COMUN  +  centros.JefeSec * ABONO_JEFESEC + centros.VOZDATOS * ABONO_VOZDATOS + centros.SINDDE * ABONO_SINDDE + centros.PINFic * ABONO_PINFIC as Decimal(10,2)) as Abono,
          COALESCE(sec_to_time(tiempo),"00:00:00") as Tiempo,
          sum(cantllam) as CantLlam,
                sum(costo) as Costo,
                sum(costo) + centros.Credito as Periodo,
          sum(costo) + centros.Credito + centros.CargoConexion + centros.COMUN * ABONO_COMUN  +  centros.JefeSec * ABONO_JEFESEC + centros.VOZDATOS * ABONO_VOZDATOS + centros.SINDDE * ABONO_SINDDE + centros.PINFic * ABONO_PINFIC as Total,
          CASE WHEN centros.Paga = 1 THEN 'Si' ELSE 'No' END as Paga
       
 FROM
   emerald2.internos
   LEFT JOIN emerald2.centros ON centros.id_centro = internos.id_centro
   LEFT JOIN emerald2.departamentos ON departamentos.id_depto = internos.id_depto
   
 WHERE
    ( c is null OR internos.id_centro = c)
 AND
    ( d is null OR internos.id_depto = d)
 AND 
    (i is null OR internos.interno = i)
 AND 
    (a is null OR internos.anio = a)
 AND 
   (m is null OR internos.mes = m)
 AND 
    (centros.Paga = 1 AND centros.Orga = 1)


GROUP BY centros.Orga desc,centros.Nombre,departamentos.NombreCompleto

UNION 

SELECT 
          centros.Nombre as Centro,
          departamentos.NombreCompleto as Dep,
          -- internos.interno as Interno,
          -- internos.usuario as Usuario,
          centros.COMUN as Comun,
          centros.JefeSec,
          centros.SINDDE,
          centros.PINFic,
          centros.VOZDATOS as VozDatos,
          centros.CargoConexion as CargoCon,
          centros.Credito,
          CAST(centros.COMUN * ABONO_COMUN  +  centros.JefeSec * ABONO_JEFESEC + centros.VOZDATOS * ABONO_VOZDATOS + centros.SINDDE * ABONO_SINDDE + centros.PINFic * ABONO_PINFIC as Decimal(10,2)) as Abono,
          COALESCE(sec_to_time(tiempo),"00:00:00") as Tiempo,
       sum(cantllam) as CantLlam,
                sum(costo) as Costo,
                sum(costo) + centros.Credito as Periodo,
          internos.costo + centros.Credito + centros.CargoConexion + centros.COMUN * ABONO_COMUN  +  centros.JefeSec * ABONO_JEFESEC + centros.VOZDATOS * ABONO_VOZDATOS + centros.SINDDE * ABONO_SINDDE + centros.PINFic * ABONO_PINFIC as Total,
           CASE WHEN centros.Paga = 1 THEN 'Si' ELSE 'No' END as Paga  
       
 FROM
   emerald2.internos
   LEFT JOIN emerald2.centros ON centros.id_centro = internos.id_centro
   LEFT JOIN emerald2.departamentos ON departamentos.id_depto = internos.id_depto
   
 WHERE
    ( c is null OR internos.id_centro = c)
 AND
    ( d is null OR internos.id_depto = d)
 AND 
    (i is null OR internos.interno = i)
 AND 
    (a is null OR internos.anio = a)
 AND 
    (m is null OR internos.mes = m)
 AND 
    (centros.Paga = 1 AND centros.Orga = 0)
 AND
  (internos.cantllam <> 0 )

GROUP BY centros.Orga desc,centros.Nombre,departamentos.NombreCompleto;
-- ORDER BY centros.Nombre,departamentos.NombreCompleto;
END IF;
END ;

