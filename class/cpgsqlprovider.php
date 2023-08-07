<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of cpgsqlprovider
 *
 * @author root
 */
require_once 'cerrors.php';
include '../include/../class/cconf.php';

class PSQLProvider {
    //put your code here
    
    var $conexion;
    var $resource;
    var $sql;
    var $queries;
    var $singleton;
    /*var $dbname = $BD_NAME;*/

   
    
    function execute() {
        try {
            //$this->conexion = pg_connect($BD_SERVER, $BD_USER, $BD_PASS);
            $this->conexion = pg_connect("host=".$BD_SERVER." dbname=".$BD_NAME." user=".$BD_USER." password=". $BD_PASS);
            //mysql_select_db($BD_NAME, $this->conexion);
            $this->queries = 0;
            $this->resource = null;
           // mysql_query("SET NAMES 'utf8'", $this->conexion);
            if (!($this->resource =pg_query($this->sql))) {
                $error = new Errors();
                $error->SendMysqlErrorMessage(pg_last_error(), "cpgsqlprovider", "execute", $this->sql);
                ClosePgsql();
                return null;
            }
            $this->queries++;
            return $this->resource;
            ClosePgsql();
        } catch (Exception $ex) {
            CloseMysql();
            $error = new Errors();
            $error->SendMysqlErrorMessage($ex, "cpgsqlprovider", "update", $this->sql);
        }
        return null;
    }

     function update() {
        // echo $this->sql;
        if (!($this->resource = pg_query($this->sql))) {
            $error = new Errors();
            $error->SendMysqlErrorMessage(pg_last_error(), "cpgsqlprovider", "update", $this->sql);
            return false;
        }
        return true;
    }

    function ListArray() {
        if (!($cur = $this->execute())) {

            return null;
        }
        $array = array();
        while ($row = pg_fetch_array($cur, null, PGSQL_ASSOC)) {
            $array[] = $row;
        }
        return $array;
    }

    function ListObject() {
        if (!($cur = $this->execute())) {

            return null;
        }

        $array = array();
        while ($row = pg_fetch_object($cur)) {
            $array[] = $row;
//            echo do_dump($array);
        }
        return $array;
    }

    function setQuery($sql) {
        if (empty($sql)) {
            return false;
        }
        $this->sql = $sql;
        return true;
    }

    function freeResults() {
        pg_free_result($this->resource);
        return true;
    }

    function getObject() {
        if (!($cur = $this->execute())) {
            if (!($object = pg_fetch_object($cur))) {
                pg_free_result($cur);
                return $object;
            } else {
                $error = new Errors();
                $error->SendMysqlErrorMessage(pg_last_error(), "cpgsqlprovider.php", "getObject", $this->sql);
                return null;
            }
        } else {
            return false;
        }
    }

    function ClosePgsql() {
        pg_free_result($this->resource);
        pg_close($this->conexion);
    }
}

?>
