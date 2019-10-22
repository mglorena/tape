<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Widget
 *
 * @author root
 */
require_once ('/var/www/html/tape/tarja/class/cboletin.php');

class Widget {

    //put your code here

    public $WidgetId = null;
    public $Nombre = null;
    var
            $Height = '', $Width = '';

    function Resoluciones() {
        $bo = new Boletin();
        $bo->BoletinId = 1;
        $html = "<table cellpadding='0' cellspacing='0' style='font-size:12px;border:solid 0px navy'><tr>";
        if ($bo->GetLinksResos()) {
            $html.="<td>" . $bo->GetLinksResos() . "</td>";
        }
        $bo->BoletinId = 2;
        if ($bo->GetLinksResos()) {
            $html.="<td>" . $bo->GetLinksResos() . "</td>";
        }
        $html.="</tr><table>";
        return $html;
    }

}

?>
