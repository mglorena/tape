


DROP PROCEDURE IF EXISTS `split_string`  ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `split_string`(
    IN input TEXT,
    IN delimiter VARCHAR(10)
)
    SQL SECURITY INVOKER
BEGIN
      DECLARE cur_position INT DEFAULT 1 ;
      DECLARE remainder TEXT;
      DECLARE cur_string VARCHAR(1000);
      DECLARE delimiter_length TINYINT UNSIGNED;

      DROP TEMPORARY TABLE IF EXISTS SplitValues;

      CREATE TEMPORARY TABLE SplitValues (
        value VARCHAR(1000) NOT NULL PRIMARY KEY
      ) ENGINE=MEMORY;

      SET remainder = input;
      SET delimiter_length = CHAR_LENGTH(delimiter);

      WHILE CHAR_LENGTH(remainder) > 0 AND cur_position > 0 DO
         SET cur_position = INSTR(remainder, delimiter);

         IF cur_position = 0 THEN
            SET cur_string = remainder;
         ELSE
            SET cur_string = LEFT(remainder, cur_position - 1);
         END IF;

         IF TRIM(cur_string) != '' THEN
            INSERT INTO SplitValues VALUES (cur_string);
         END IF;

         SET remainder = SUBSTRING(remainder, cur_position +
delimiter_length);      END WHILE;   END ;

