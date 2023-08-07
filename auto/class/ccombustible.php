<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of cestadosreservas
 *
 * @author root
 */
class Combustible {

    private static $enum = array(1 => "Gas Oil", 2 => "Nafta", 3 => "GNC-Nafta",4 => "Ultra Diesel");

    public function toOrdinal($name) {
        return array_search($name, self::$enum);
    }

    public function toString($ordinal) {
        return self::$enum[$ordinal];
    }

}

?>
