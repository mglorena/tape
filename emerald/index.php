<?php
require_once ('../class/cutil.php');
require_once ('class/cinfo.php');
require_once ('class/creport.php');
require_once ('../class/cdump.php');
require_once ('../class/cconf.php');
require_once ('class/cdatos.php');
require("../class/csajax.php");
require('../class/mpdf/mpdf.php');
require_once ('/var/www/html/tape/class/cerrors.php');
function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}
$sajax_request_type = "POST";
//$sajax_debug_mode = 0;

sajax_init();
sajax_export("LoadInforme", "GenerarPDF", "SendJsError", "ImprimirDetalle");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(13, $rulesIds)) { // ver la pagina de emerald
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Emerald';</script>";
    }
}

function ImprimirDetalle($mes, $anio, $int) {
    try {
        if ($mes <= 9)
            $mes = "0" . $mes;

        $internos = explode(",", $int);

        foreach ($internos as $i) {
            if ($i != "") {
                $fileName = $i . $mes . $anio . ".txt";
                $link .= "<a target='_blank' href='http://localhost/" . Conf::ROOT . "/emerald/datos/" . $fileName . "'>" . $i . "-Detalles</a><br/>";
            }
        }
        $response = array("1" => utf8_decode($link));
    } catch (Exception $ex) {
        $response = array("1" => $ex->getMessage());
    }
    return $response;
}

function LoadInforme($mes, $anio, $tipo, $dpto, $centro, $dptoN, $centroN, $interno) {

    $info = new Report();
    $info->Anio = $anio;
    $info->Mes = $mes;
    $titulo = "";
    $enc = "<tr class='listtitle'>";
    $enc .= "<td  style=\"text-align:center;padding:5px\"  class='chkbox' ><input type='checkbox' id='chkAll' value='all' onclick='SelectAll(this);'  class='chkbox'/> </td>";
    if ($tipo == "dpto") {
        $info->Departamento = $dpto;
        $rep = $info->ByDepartamento();
        $titulo = $dptoN;
        $enc .= "<td  style=\"text-align:center;\">Interno</td>
        <td  style=\"text-align:center;\">Usuario</td>
        <td  style=\"text-align:center;\">Cant. Llamadas</td>
        <td  style=\"text-align:center;\">Costo</td>";
        $enc .= "</tr>";
    }
    if ($tipo == "centro") {
        $info->Centro = $centro;
        $rep = $info->ByCentro();
        $titulo = $centroN;
        $enc .= "<td  style=\"text-align:center;\">Interno</td>
        <td  style=\"text-align:center;\">Usuario</td>
        <td  style=\"text-align:center;\">Cant. Llamadas</td>
        <td  style=\"text-align:center;\">Costo</td>";
        $enc .= "</tr>";
    }
    if ($tipo == "interno") {
        $info->Interno = $interno;
        $info->Departamento = $dpto;
        $titulo = "Interno " . $interno;
        $rep = $info->ByInterno();
        $enc .= "<td  style=\"text-align:center;\">Interno</td>
        <td  style=\"text-align:center;\">Usuario</td>
        <td  style=\"text-align:center;\">Cant. Llamadas</td>
        <td  style=\"text-align:center;\">Costo</td>";
        $enc .= "</tr>";
    }
    if ($tipo == "totalcostos") {
        $rep = $info->ByTotalCosto();
        $titulo = "Total por Centro de Costo";
        $enc .= "<td  style=\"text-align:center; width:250px;\">Centro Costo</td>
        <td  style=\"text-align:center;\">Tiempo</td>
        <td  style=\"text-align:center;\" class='fact'>Abono</td>
        <td  style=\"text-align:center;\">Cant. Llamadas</td>
        <td  style=\"text-align:center;\">Costo</td>
        <td  style=\"text-align:center;\" class='fact'>Credito</td>
        <td  style=\"text-align:center;\" class='fact'>Periodo</td>
        <td  style=\"text-align:center;\" class='fact'>Total</td>";
        $enc .= "</tr>";
    }
    if ($tipo == "gral") {
        $info->Departamento = $dpto;
        $rep = $info->ByTotalLlamadas();
    }
    $bar1 = "<div align='center' style='font-size:14px;font-weight:bold'>" . utf8_encode($titulo) . "</div><div style='clear:both'></div>";
    $bar = "<div style='text-align:right;width:940px; border:solid 0px black;padding:5px;'>" .
            "<div class='dlink'><table cellpadding='4' cellspacing='4' align='right' style='border-collapse:separate;border-spacing:5'><tr>";

    $bar.="<td><label class='link' onclick='Imprimir();'>Imprimir</label></td><td style='width:10px'>&nbsp;</td>";
    //$bar.="<td><label class='link' id='tdPDF' onclick='GenerarPDF();'>Generar PDF</label></td><td style='width:10px'>&nbsp;</td>";
    if ($tipo == "dpto" || $tipo == "centro")
        $bar.="<td id='tdDetalle'><label class='link' onclick='ImprimirDetalle();'>Imprimir Detalle</label></td><td style='width:10px'>&nbsp;</td>";
    if ($tipo == "totalcostos")
        $bar.="<td><label class='link' onclick='ImprimirFac();'>Imprimir Factura</label></td>";
    $bar.="</tr></table></div><div style='clear:both'></div></div>";

    $table .= "<table cellpadding='2' cellspacing='2' class='tableList' style='width:940px'>";
    $table .=$enc;

    $i = 0;
    $j = 0;
    $class = "";
    $total = 0;
    $periodo = 0;
    $credito = 0;
    $cantllam = 0;
    $costo = 0;
    $abono = 0;
    $tiempo = 0;
    $abonom = 0;
    $isOrga = 0;
    foreach ($rep as $ve) {
        //  echo "entre";
        if ($i % 2 == 0)
            $class = "listitemeven";
        else
            $class = 'listitemuneven';
        //$er = new EstadoReserva();
        //$table .="<td>&nbsp; Vector:".intval( $ve['Orga'])."</td><td>Variable:". $isOrga."</td></tr>";
        if ($j == 45 || (intval($ve['Orga']) == $isOrga && $tipo == "totalcostos")) {
            if (intval($ve['Orga']) == $isOrga && $tipo == "totalcostos") {
                $table .="<td class='chkbox'></td><td>TOTAL&nbsp;</td><td>" . $tiempo . "&nbsp;</td><td>" . $abono . "&nbsp;</td>";
                $table .="<td style='text-align:center;font-weight:bold;'>" . $cantllam . "</td>";
                $table .="<td style='text-align:center;font-weight:bold;'>$" . $costo . "</td>";
                $table .="<td >$" . $credito . "&nbsp;</td>";
                $table .="<td >$" . $periodo . "&nbsp;</td>";
                $table .="<td >$" . $total . "&nbsp;</td></tr></table>";
                $total = 0;
                $periodo = 0;
                $credito = 0;
                $cantllam = 0;
                $costo = 0;
                $abono = 0;
                $tiempo = 0;
            }
            $table.="</table>";
            $table .= "<br style='page-break-after: always;'/> <br/><br/><br/><br/><br/>";
            $table .= "<table cellpadding='2' cellspacing='2' class='tableList' style='width:940px'>";
            $table .= $enc;
            $isOrga = 2;
            $j = 0;
        }

        $table .= "<tr class='" . $class . "'>";
        $table .= "<td style='text-align:center;'  class='chkbox'><input type='checkbox' class='chkbox' id='int_" . $ve['interno'] . "' /></td>";

        if ($tipo == "centro" || $tipo == "dpto" || $tipo == "interno") {
            $table .= "<td>" . $ve['interno'] . "</td>
                   <td>" . $ve['usuario'] . "</td>";
        }

        if ($tipo == "totalcostos") {
            $table .= "<td style=' width:250px;'>" . $ve['centrocosto'] . "</td>";
            $table .= "<td>" . $ve['tiempo'] . "</td>";
            $abonom = $ve['COMUN'] * DFac::ABONO_COMUN;
            $abonom = $abonom + $ve['JEFE-SEC'] * DFac::ABONO_JEFESEC;
            $abonom = $abonom + $ve['VOZDATOS'] * DFac::ABONO_VOZDATOS;
            $abonom = $abonom + $ve['SINDDE'] * DFac::ABONO_SINDDE;
            $abonom = $abonom + $ve['PIN-FIC'] * DFac::ABONO_PINFIC;
            $table .= "<td  class='fact'>" . $abonom . "</td>";
        }
        $table .= "<td  style='text-align:center;'>" . $ve['cantllam'] . "</td>
                  <td  style='text-align:center;' > $" . $ve['costo'] . "</td>";
        if ($tipo == "totalcostos") {
            $table .= "<td class='fact'>$" . $ve['Credito'] . "</td>";
            $totalperiodo = $ve['costo'] + $ve['Credito'];
            $table .= "<td  class='fact'> $" . $totalperiodo . "</td>";
            if ($ve['cantllam'] != '0') {
                $importeTotal = $totalperiodo + $ve['CargoConexion'] + $abonom;
            }
            else
                $importeTotal = 0;
            $table .= "<td  class='fact'>$" . $importeTotal . "</td>";
        }
        $table .= "</tr>";
        $i++;
        $costo += $ve['costo'];
        $cantllam += $ve['cantllam'];
        $credito +=  $ve['Credito'];
        $total +=$importeTotal;
        $periodo += $totalperiodo;
        $abono +=$abonom;
        $j++;
    }
    $table.="<tr class='" . $class . "'>";
    if ($tipo == "dpto")
        $table .="<td class='chkbox'>&nbsp;</td>";
    $table .="<td ></td><td>TOTAL&nbsp;</td>";
    //$table .="<td>" . $tiempo . "&nbsp;</td>
    //<td>" . $abono . "&nbsp;</td>";
                $table .="<td style='text-align:center;font-weight:bold;'>" . $cantllam . "</td>";
                $table .="<td style='text-align:center;font-weight:bold;'>$" . $costo . "</td>";
      //          $table .="<td >$" . $credito . "&nbsp;</td>";
        //        $table .="<td >$" . $periodo . "&nbsp;</td>";
           //     $table .="<td >$" . $total . "&nbsp;</td></tr></table>";
                     $table .="</tr></table>";

    $response = array("1" => $bar1 . $bar . $table, "2" => $rep);
    return $response;
}

function GenerarPDF($table) {
    $mpdf = new mPDF();
    $mpdf->WriteHTML(utf8_decode($table));
    $mpdf->Output('/var/www/' . Conf::ROOT . '/filename.pdf', 'F');
    $link = "<a href='http://localhost/" . Conf::ROOT . "/filename.pdf'>PDF</a>";
    $response = array("1" => utf8_decode($link));
    return $response;
}
?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php";
?>
<script>
<?php
sajax_show_javascript();
?>
</script>
<?php SecurityPage(); ?>
<?php /* LoadReservas(true, true,11,2012,1); */ ?>

<?php
echo '<script type="text/javascript" src="index.js?' . Conf::VERSION . '"></script>';
?>
<div id="content"> 
    <h1>Emerald</h1>
    <div>
        Mes : <select id="ddlMes">
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
        </select>
        Año : <input type="text" id="txtAnio"  style="width:60px;"/>
      
        <br/>
        <br/>
        <fieldset name="clubfields">
            <legend> <label>

                    Opciones
                </label> </legend>
            <table cellpadding="2" cellspacing="2" border="0">
                <tr>
                    <td style="vertical-align: top;">
                        <table cellpadding="2" cellspacing='0'>
                            <tr>
                                <td> Departamentos :</td>
                                <td><?php
$i = new Info();
echo $i->GetDeptoDropDown();
?></td>
                            </tr>
                            <tr>
                                <td>Centro de Costo :</td>
                                <td><?php
$i = new Info();
echo $i->GetCostosDropDown();
?></td>
                            </tr>
                            <tr>
                                <td>Interno:</td>
                                <td><input type='text' id="txtInterno" style='width:100px'/><input type='checkbox' id="chkTodos" value="0">Todos</td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top;">
                        <input type="radio" name="tipo" value="dpto" checked >Informe por Departamento<br>
                        <input type="radio" name="tipo" value="centro" >Informe por Centro de Costos<br>
                        <input type="radio" name="tipo" value="interno">Informe por Interno<br>
                        <input type="radio" name="tipo" value="totalcostos">Resumen Total de Costos de Llamadas<br>
                        <input type="radio" name="tipo" value="gral">Resumido Total de Llamadas<br>


                    </td>
                </tr>
            </table>
            <div><input type="button" id="btnGenerar" value="Generar Informe" onclick='GenerarInforme();'/></div>
        </fieldset>


    </div>
</div>
<div align="center">
    <div id="tblReport"></div>
</div>
<?php include "../include/footer.php"; ?>
