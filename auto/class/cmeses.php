<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of cmeses
 *
 * @author root
 */
class Meses   {
    const __default = self::Enero;
    const Enero = 1;
    const Febrero = 2;
    const Marzo = 3;
    const Abril = 4;
    const Mayo = 5;
    const Junio = 6;
    const Julio = 7;
    const Agosto = 8;
    const Septiembre = 9;
    const Octubre = 10;
    const Noviembre = 11;
    const Diciembre = 12;
    
    public function echoConstant()
    {
        echo self::Enero ;
    }
}

?>
