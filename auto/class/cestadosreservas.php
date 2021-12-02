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
class EstadoReserva {

    private static $enum = array(1 => "Pendiente", 2 => "Confirmada", 3=> "Suspendida", 4 => "Realizada");

    public function toOrdinal($name) {
        return array_search($name, self::$enum);
    }

    public function toString($ordinal) {
        return self::$enum[$ordinal];
    }

}

?>
