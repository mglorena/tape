<?php
require_once '/var/www/tape/class/cerrors.php';
require_once '/var/www/tape/class/cconf.php';

class sqlprovider {

    var $conexion;
    var $resource;
    var $sql;
    var $queries;
    var $singleton;

    /* var $dbname = $BD_NAME; */

    function getInstance() {

        if (isset($this->singleton)) {
            $this->$singleton = new DataBase();
        }
        return $this->singleton;
    }

    function execute() {
        $error = new Errors();
        try {
            echo "test";

            $this->conexion = mysqli_connect(Conf::BD_SERVER, Conf::BD_USER, Conf::BD_PASS);

            //mysqli_select_db(Conf::BD_NAME, $this->conexion);
            mysqli_select_db($this->conexion, Conf::BD_NAME);
            $this->queries = 0;
            $this->resource = null;

            if (!($this->resource = mysqli_query($this->conexion, $this->sql))) {
                $error->SendMysqlErrorMessage(mysqli_error($this->conexion), "csqlprovider.php", "execute", $this->sql);
                return null;
            }
            $this->queries++;
            return $this->resource;
        } catch (Exception $ex) {

            $error->SendMysqlErrorMessage(mysqli_error($this->conexion), "csqlprovider.php", "execute", $this->sql);
        }
        return null;
    }

//    function execute() {
//        try {
//            echo "antes:222";
//            //$this->conexion = mysql_connect(Conf::BD_SERVER, Conf::BD_USER, Conf::BD_PASS);
//            //$this->conexion = mysqli_connect(Conf::BD_SERVER, Conf::BD_USER, Conf::BD_PASS, Conf::BD_NAME);
//           $link = mysqli_connect("localhost", "root", "oysadmin", "tape");
//           echo "3333";
//            if (!$link) {
//                //echo "Error: Unable to connect to MySQL." . PHP_EOL;
//                echo " error";
//                //echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
//                //
//                //echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
//                exit;
//            }
//echo "si";
//            /* echo "conexion:". $this->conexion;
//              mysql_select_db(Conf::BD_NAME, $this->conexion);
//              $this->queries = 0;
//              $this->resource = null;
//              // mysql_query("SET NAMES 'utf8'", $this->conexion);
//              if (!($this->resource = mysql_query($this->sql, $this->conexion))) {
//              $error = new Errors();
//              $error->SendMysqlErrorMessage(mysql_error(), "csqlprovider.php", "execute", $this->sql);
//              return null;
//              }
//              $this->queries++;
//              return $this->resource; */
//        } catch (Exception $ex) {
//            $error = new Errors();
//            $error->SendMysqlErrorMessage(mysql_error(), "csqlprovider.php", "execute", $this->sql);
//        }
//        return null;
//    }

    function update() {
        // echo $this->sql;
        if (!($this->resource = mysql_query($this->sql, $this->conexion))) {
            $error = new Errors();
            $error->SendMysqlErrorMessage(mysql_error(), "csqlprovider.php", "update", $this->sql);
            return false;
        }
        return true;
    }

    function ErrorDetail() {
        return mysqli_error($this->conexion);
    }

    function ListArray() {
       if (!($cur = $this->execute())) {

            return null;
        }
        $array = array();
        while ($row = @mysqli_fetch_array($cur)) {
            $array[] = $row;
        }
        return $array;
    }

    function ListObject() {
      if (!($cur = $this->execute())) {

            return null;
        }

        $array = array();
        while ($row = @mysqli_fetch_object($cur)) {
            array_push($array, $row);
        }
        return $array;
    }

    function ListObject2() {
        if (!($cur = $this->execute())) {

            return null;
        }

        $array = array();
        while ($row = @mysqli_fetch_row($cur)) {
            array_push($array, $row);
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
          @mysqli_free_result($this->resource);
        return true;
    }

    function getObject() {
          if ($cur = $this->execute()) {
            if ($object = mysqli_fetch_object($cur)) {
                @mysqli_free_result($cur);
                return $object;
            } else {
                $error = new Errors();
                $error->SendMysqlErrorMessage(mysqli_error($this->conexion), "csqlprovider.php", "getObject", $this->sql);
                return null;
            }
        } else {
            return false;
        }
    }

    function CloseMysql() {
        @mysqli_free_result($this->resource);
        @mysqli_close($this->conexion);
    }

}
?>