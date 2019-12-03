<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of cutil
 *
 * @author root
 */
class Util {

    //put your code here
    function strinformatdate($date) {

        if (!empty($date)) {
            $var = explode('/', str_replace('-', '/', $date));
            return "$var[2]-$var[1]-$var[0]";
        }
    }

    function BorrarDirectorio($dir) {
        if (!is_dir($dir))
            throw new NoDirectoryException("$dir::No es un directorio");

        if (!($open = opendir($dir)))
            throw new NoOpenException("$dir::No se puede abrir");

        while ($file = readdir($open)) {
            if ($file == "." || $file == "..")
                continue;
            if (is_dir("$dir/$file"))
                borrar_directorio("$dir/$file");
            else
            if (!unlink("$dir/$file"))
                throw new UnlinkException("$dir/$file::No se pudo borrar el archivo");
        }
        closedir($open);

        if (!rmdir($dir))
            throw new NoDeleteException("$dir::No ha podido ser borrado");

        return true;
    }

}

?>
