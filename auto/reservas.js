/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/****************/
var CurrentObject;
var date = new Date();
var dia = 0;
var mes = date.getMonth() + 1;
var anio = date.getFullYear();
var mesNom = date.toLocaleString();
var tvehiculoId = 0, estado = 0;
x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
var estados = [[0, 'Todos'], [1, 'Pendiente'], [2, 'Confirmada'], [3, 'Suspendida'], [4, 'Realizada']];
var stestados = new Ext.data.ArrayStore({
    fields: ['Id', 'Estado'],
    data: estados
});

var grid, ridx, ac, ve, ch;

var msg = function(title, msg) {
    Ext.Msg.show({
        title: title,
        msg: msg,
        minWidth: 200,
        modal: true,
        icon: Ext.Msg.INFO,
        buttons: Ext.Msg.OK
    });
};

function GetChVe(evt)
{
    try
    {
        ac = evt;
        var fInicio = Ext.getCmp('txtFechaInicio').getValue();
        var reId = Ext.getCmp('txtReservaId').getValue();
        var fFin = Ext.getCmp('txtFechaFin').getValue();
        var nPas = Ext.getCmp('txtNumPasajeros').getValue();
        if (fInicio !== null && fFin !== null && nPas !== "")
        {
            if (reId === "")
                reId = 0;
            x_GetDisponibles(fInicio.f("yyyy-MM-dd"), fFin.f("yyyy-MM-dd"), nPas, reId, GetDisponibles_callback);
        }
    }
    catch (e)
    {
        SendJsError(e, "GetChVe - reservas.js", evt);
    }
}

function GetDisponibles_callback(response)
{
    try
    {
        var record = grid.store.getAt(ridx);
        var cmbCh = Ext.getCmp('ddlChoferes');
        var cmbVe = Ext.getCmp('ddlVehiculos');
        var ve = ObjToArray(response[1]);
        var stvehiculos = new Ext.data.ArrayStore({
            fields: ['VehiculoId', 'Modelo'],
            data: ve
        });
        cmbVe.store = stvehiculos;
        cmbVe.bindStore(stvehiculos);
        cmbVe.store.reload();

        if (ac === "")
            cmbVe.setValue(record ? record.data['VehiculoId'] : null);
        else
            cmbVe.setValue(null);

        var ch = ObjToArray(response[2]);

        var stchoferes = new Ext.data.ArrayStore({
            fields: ['ChoferId', 'Choferes'],
            data: ch
        });
        var choferes = null;
        if (record)
            choferes = record.data['ChoferesIds'].split(",");

        cmbCh.store = stchoferes;
        cmbCh.bindStore(stchoferes);
        cmbCh.store.reload();

        if (ac === "")
            cmbCh.setValue(choferes);
        else
            cmbCh.setValue("");
    }
    catch (e)
    {
        SendJsError(e, "GetDisponibles_callback - reservas.js", response);
    }

}

function FormField(record)
{
    var formFields;
    try
    {
        var es = estados.slice();
        es.shift();
        var stestados = new Ext.data.ArrayStore({
            fields: ['Id', 'Estado'],
            data: es
        });
        var es, filename, link;
        if (record)
        {
            if (record.data['Estado'] === 'Pendiente')
                es = 1;
            else if (record.data['Estado'] === 'Confirmada')
                es = 2;
            else if (record.data['Estado'] === 'Suspendida')
                es = 3;
            else
                es = 4; // Realizada

            var resId = record.data['ReservaId'];
            var name = record.data['FileName'];
            filename = "<a target='_blank' href='files/" + resId + "/" + name + "'/>" + name + "</a>";
            var dest = record.data['Destino'];
            var url1 = "https://maps.google.com/maps?saddr=Salta,+Argentina&daddr=" + dest + ",+Argentina";
            link = "<a href='" + url1 + "' target='_blank'>Google Maps.</a>";
        }

        var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
        formFields = [
            {
                xtype: 'displayfield',
                fieldLabel: 'ID',
                id: 'txtReservaId',
                name: 'ReservaId',
                value: (record ? record.data['ReservaId'] : null),
                editable: false
            },
            {
                fieldLabel: 'Fecha Salida',
                name: 'FechaInicio',
                id: 'txtFechaInicio',
                afterLabelTextTpl: required,
                value: (record ? record.data['FechaInicio'] : null),
                xtype: 'datefield',
                format: 'd/m/Y',
                submitFormat: 'Y-m-d H:i:s',
                allowBlank: false,
                listeners: {
                    'change': function() {
                        GetChVe("fs");
                    }
                }
            },
            {
                fieldLabel: 'Fecha llegada',
                name: 'FechaFin',
                id: 'txtFechaFin',
                afterLabelTextTpl: required,
                value: (record ? record.data['FechaFin'] : null),
                xtype: 'datefield',
                format: 'd/m/Y',
                submitFormat: 'Y-m-d H:i:s',
                allowBlank: false,
                listeners: {
                    'change': function() {
                        GetChVe("fl");
                    }
                }
            },
            {
                fieldLabel: 'Hora Salida',
                name: 'HoraSalida',
                afterLabelTextTpl: required,
                value: (record ? record.data['HoraSalida'] : null),
                xtype: 'timefield',
                submitFormat: 'Y-m-d H:i:s',
                allowBlank: false
            },
            {
                fieldLabel: 'Hora Llegada',
                name: 'HoraLlegada',
                afterLabelTextTpl: required,
                value: (record ? record.data['HoraLlegada'] : null),
                xtype: 'timefield',
                submitFormat: 'Y-m-d H:i:s',
                allowBlank: false
            },
            {
                fieldLabel: 'Cant. Pas.',
                name: 'NumPasajeros',
                id: 'txtNumPasajeros',
                value: (record ? record.data['NumPasajeros'] : null),
                afterLabelTextTpl: required,
                allowBlank: false,
                width: 130,
                listeners: {
                    'blur': function() {
                        GetChVe("pas");
                    }
                }
            },
            {
                fieldLabel: 'Destino',
                name: 'Destino',
                afterLabelTextTpl: required,
                value: (record ? record.data['Destino'] : null),
                allowBlank: false,
                width: 500,
                listeners: {
                    'blur': function(obj) {
                        var dest = obj.getValue();
                        var url1 = "https://maps.google.com/maps?saddr=Salta,+Argentina&daddr=" + dest + ",+Argentina";
                        Ext.getCmp('linkmap').setValue("<a href='" + url1 + "' target='_blank'>Google Maps.</a>");
                    }
                }

            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Link en Google Map',
                id: 'linkmap',
                value: link,
                width: 200,
                editable: false

            },
            {
                fieldLabel: 'Distancia (Km)',
		xtype:'numberfield',
                name: 'Distancia',
                value: (record ? record.data['Distancia'] : null),
                width: 160
            },
            {
                fieldLabel: 'Solicitante',
                name: 'Solicitante',
		afterLabelTextTpl: required,
                value: (record ? record.data['Solicitante'] : null),
                allowBlank: false,
                width: 500
            },
            {
                fieldLabel: 'Email solicitante',
                name: 'EmailSolicitante',
                value: (record ? record.data['EmailSolicitante'] : null),
                width: 500
            }
            ,
            {
                fieldLabel: 'Autorizado por',
                name: 'AutorizadoPor',
                value: (record ? record.data['AutorizadoPor'] : null),
                width: 500

            }, {
                xtype: 'combo',
                fieldLabel: 'Estado',
                name: 'EstadoId',
                store: stestados,
                valueField: 'Id',
                displayField: 'Estado',
                value: es,
                emptyText: '......'
            },
            {
                xtype: 'combo',
                fieldLabel: 'Vehiculo',
                id: 'ddlVehiculos',
                name: 'VehiculoId',
                // store:stvehiculos,
                afterLabelTextTpl: required,
                valueField: 'VehiculoId',
                displayField: 'Modelo',
                allowBlank: false,
                width: 500,
                listeners:
                        {
                            expand: function(combo, newval, oldval)
                            {
                            }
                        }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Chofer/es',
                id: 'ddlChoferes',
                name: 'ChoferesIds',
                //store:stchoferes,
                afterLabelTextTpl: required,
                valueField: 'ChoferId',
                displayField: 'Choferes',
                multiSelect: true,
                editable: false,
                forceSelection: true,
                allowBlank: false,
                //  value:choferes,
                width: 500,
                listeners:
                        {
                            expand: function(combo, newval, oldval)
                            {
                                combo.store.reload();
                            }
                        }
            },
            {
                xtype: 'textareafield',
                fieldLabel: 'Observaciones',
                name: 'Observacion',
                value: (record ? record.data['Observacion'] : null),
                width: 500
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Archivo',
                id: 'txtFileName',
                name: 'FileName',
                value: filename
            }
        ];

        return formFields;
    }
    catch (e)
    {
        SendJsError(e, "FormField - reservas.js", formFields);
    }
}

function FechaCompleta(cfecha) {

    try
    {
        var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        var dias = new Array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado");
        var fecha = new Date(Date.parse(cfecha));
        var dia = fecha.getDate();
        var mes = meses[fecha.getMonth()];
        var ano = fecha.getFullYear();
        var day = fecha.getUTCDay();
        return (dias[day] + " " + dia + " de " + mes + " de " + ano);
    }
    catch (e)
    {
        SendJsError(e, "FechaCompleta - reservas.js", cfecha);
    }
}

function FieldsCosto()
{
    try
    {
        var checkboxes = new Ext.form.CheckboxGroup({
            fieldLabel: 'Es',
            columns: 2, //mostrar dos columnas de checkboxes 
            width: 300, //mostrar dos columnas de checkboxes                         
            items: [
                {
                    boxLabel: 'Dia Hábil',
                    name: 'chkHI',
                    id: 'chkHI',
                    value: '0',
                    listeners: {
                        'change': function(obj, newValue, oldValue, eOpts)
                        {
                            GetValorHora(obj);
                        }
                    }

                },
                {
                    boxLabel: 'Dial Inhábil',
                    name: 'chkII',
                    id: 'chkII',
                    value: '1',
                    listeners: {
                        'change': function(obj, newValue, oldValue, eOpts)
                        {
                            GetValorHora(obj);
                        }
                    }

                }
            ]
        });
        var checkboxes2 = new Ext.form.CheckboxGroup({
            fieldLabel: 'Es',
            columns: 2, //mostrar dos columnas de checkboxes 
            width: 300,
            items: [
                {
                    boxLabel: 'Día Hábil',
                    name: 'chkHV',
                    id: 'chkHV',
                    value: '0',
                    listeners: {
                        'change': function(obj, newValue, oldValue, eOpts)
                        {
                            GetValorHora(obj);
                        }
                    }
                },
                {
                    boxLabel: 'Día Inhábil',
                    name: 'chkIV',
                    id: 'chkIV',
                    value: '1',
                    listeners: {
                        'change': function(obj, newValue, oldValue, eOpts)
                        {
                            GetValorHora(obj);
                        }
                    }
                }
            ]
        });
        var formFields = [
            {
                xtype: 'fieldset',
                title: 'Datos Viaje',
                width: 810,
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 2
                },
                defaults: {
                    //padding : 10,
                    //width : 300,
                    border: 0,
                    cellCls: 'verticalAlignTop'
                },
                items: [{
                        xtype: 'fieldset',
                        //title: 'Viaje',
                        collapsible: false,
                        width: 390,
                        items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'Destino',
                                name: 'Destino',
                                id: 'txtDestino'
                                        //width:500
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Fecha Salida',
                                name: 'FechaInicio',
                                id: 'txtFechaInicio'


                            }, checkboxes,
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Fecha llegada',
                                name: 'FechaFin',
                                id: 'txtFechaFin'
                            }, checkboxes2]

                    }, {
                        xtype: 'fieldset',
                        //title: 'Viaje2',
                        collapsible: false,
                        width: 390,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Kilometros (total)',
                                name: 'Distancia',
                                width: 150,
                                id: 'txtDistancia'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Horas Ida',
                                name: 'horasI',
                                id: 'txtHorasIda',
                                width: 150,
                                listeners: {
                                    'blur': function() {
                                        CalculoHoraExtra();
                                    }
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Horas Vuelta',
                                name: 'horasV',
                                id: 'txtHorasVue',
                                width: 150,
                                listeners: {
                                    'blur': function() {
                                        CalculoHoraExtra();
                                    }
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Dias en Total',
                                name: 'diasT',
                                id: 'txtDiasT',
                                width: 150
                            }
                        ]
                    }]
            },
            {
                xtype: 'fieldset',
                title: 'Datos Choferes',
                width: 810,
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 2
                },
                defaults: {
                    //padding : 10,
                    //width : 300,
                    cellCls: 'verticalAlignTop'
                },
                items: [{
                        xtype: 'fieldset',
                        title: 'Chofer1',
                        layout: {
                            type: 'table',
                            columns: 2
                        },
                        width: 390,
                        collapsible: false,
                        items: [
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Chofer 1',
                                name: 'Chofer1',
                                id: 'txtChofer1'
                            }, {
                                xtype: 'displayfield'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Horas Ida',
                                width: 150,
                                id: 'txtHEC1I'


                            },
                            ,
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Valor',
                                        width: 150,
                                        id: 'txtVHEC1I'

                                    }
                            ,
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Horas Vuelta',
                                width: 150,
                                id: 'txtHEC1V'


                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Valor',
                                width: 150,
                                id: 'txtVHEC1V'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Viaticos',
                                id: 'txtViaticos1',
                                width: 150
                            }
                        ]
                    }, {
                        xtype: 'fieldset',
                        id: 'blockChofer2',
                        title: 'Chofer2',
                        width: 390,
                        collapsible: false,
                        layout: {
                            type: 'table',
                            columns: 2
                        },
                        items: [
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Chofer 2',
                                name: 'Chofer2',
                                id: 'txtChofer2'
                            }, {
                                xtype: 'displayfield'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Horas Ida',
                                width: 150,
                                id: 'txtHEC2I'

                            }
                            ,
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Valor',
                                width: 150,
                                id: 'txtVHEC2I'
                            }
                            ,
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Horas Vuelta',
                                width: 150,
                                id: 'txtHEC2V'

                            }
                            ,
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Valor',
                                width: 150,
                                id: 'txtVHEC2V'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Viaticos',
                                id: 'txtViaticos2',
                                width: 150

                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Datos Vehiculo',
                width: 800,
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 3,
                    anchor: 100,
                    padding: 3
                },
                items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Vehiculo',
                        name: 'Vehiculo',
                        id: 'txtVehiculo',
                        padding: 10
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Combustible',
                        name: 'Cmb',
                        id: 'txtCmb'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Consumo x Km',
                        name: 'Consumo',
                        id: 'txtCKm'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Precio Litro',
                        name: 'PrecioCmb',
                        id: 'txtCCmb',
                        width: 150
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Total Peaje',
                        name: 'PrecioPeaje',
                        id: 'txtPeaje'
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: 'Costo Aproximado',
                collapsible: false,
                width: 800,
                items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Total $',
                        name: 'txtTotal',
                        id: 'txtTotal',
                        width: 100
                    }
                ]
            }
        ];

        return formFields;
    }
    catch (e)
    {
        SendJsError(e, "FechaCompleta - reservas.js", "formFields");
    }
}

function GetValorHora(obj)
{

    try
    {
        if (obj.checked)
        {
            var id = obj.id; // si termina en I es ida y si termina en V vuelta
            var viaje = id.substring(id.length - 1, id.length);
            var tdia = id.substring(id.length - 2, id.length - 1);
            var ids = $("#hdnChoferesIds").val();

            if (tdia === "H")
            {
                if (viaje === "I") // dia ida habil
                {
                    Ext.getCmp('txtVHEC1I').setValue(choferes[0]['ValorHoraHabil']);

                    if (typeof choferes[1] !== "undefined")
                        Ext.getCmp('txtVHEC2I').setValue(choferes[1]['ValorHoraHabil']);
                    Ext.getCmp('chkII').setValue(false);
                }
                else // dia vuelta habil
                {
                    Ext.getCmp('txtVHEC1V').setValue(choferes[0]['ValorHoraHabil']);
                    if (typeof choferes[1] !== "undefined")
                        Ext.getCmp('txtVHEC2V').setValue(choferes[1]['ValorHoraHabil']);
                    Ext.getCmp('chkIV').setValue(false);
                }

            }
            else
            {
                if (viaje === "I") // dia ida inhabil
                {
                    Ext.getCmp('txtVHEC1I').setValue(choferes[0]['ValorHoraInhabil']);
                    if (typeof choferes[1] !== "undefined")
                        Ext.getCmp('txtVHEC2I').setValue(choferes[1]['ValorHoraInhabil']);
                    Ext.getCmp('chkHI').setValue(false);
                }
                else // dia vuelta inhabil
                {
                    Ext.getCmp('txtVHEC1V').setValue(choferes[0]['ValorHoraInhabil']);
                    if (typeof choferes[1] !== "undefined")
                        Ext.getCmp('txtVHEC2V').setValue(choferes[1]['ValorHoraInhabil']);
                    Ext.getCmp('chkHV').setValue(false);
                }
            }
        }

        CalculoHoraExtra();
    }
    catch (e)
    {
        SendJsError(e, "GetValorHora - reservas.js", obj);
    }
}

function CalculoHoraExtra()
{

    /******calculo horas ******/
    Ext.getCmp('txtHEC1I').setValue(Ext.getCmp('txtHorasIda').getValue());
    Ext.getCmp('txtHEC1V').setValue(Ext.getCmp('txtHorasVue').getValue());
    var horaS = parseInt(horaSalida.split(":")[0]);
    var minS = parseInt(horaSalida.split(":")[1]);
    var horaV = parseInt(horaLlegada.split(":")[0]);
    var minV = parseInt(horaLlegada.split(":")[1]);
    var hIda = parseInt(Ext.getCmp('txtHorasIda').getValue());
    var hVuelta = parseInt(Ext.getCmp('txtHorasVue').getValue());
    var p = feIni.split("/");
    var p1 = feFin.split("/");
    if (!isNaN(hIda)) {
        if (Ext.getCmp('chkII').getValue()) {
            Ext.getCmp('txtHEC1I').setValue(hIda);
        }
    }
    if (!isNaN(hVuelta)) {
        if (Ext.getCmp('chkIV').getValue()) {
            Ext.getCmp('txtHEC1V').setValue(hVuelta);
        }
    }

}

var dias;
function CostoTotal()
{
    try
    {

        var totalViaticos = Ext.getCmp('txtViaticos1').getValue() * dias + Ext.getCmp('txtViaticos2').getValue() * dias;
        var maxCH = Math.max(Ext.getCmp('txtVHEC1I').getValue(), Ext.getCmp('txtVHEC1V').getValue());
        maxCH = Math.max(maxCH, Ext.getCmp('txtVHEC2I').getValue());
        maxCH = Math.max(maxCH, Ext.getCmp('txtVHEC2V').getValue());
        var ccmb = Ext.getCmp('txtCKm').getValue();
        var pcmb = Ext.getCmp('txtCCmb').getValue();
        var costoVehiculo = ((km * ccmb) * parseFloat(pcmb).toFixed(2)).toFixed(2) + parseFloat(Ext.getCmp('txtPeaje').getValue()).toFixed(2);
        var hci = parseFloat(Ext.getCmp('txtHorasIda').getValue());
        var hcv = parseFloat(Ext.getCmp('txtHorasVue').getValue());
        var horasC = 0;
        if (Ext.getCmp('chkII').getValue())
            horasC = hci;
        else
        {
            if (hci > 7)
                horasC = hci - 7;
        }

        if (Ext.getCmp('chkIV').getValue())
            horasC += hcv;
        else
        {
            if (hcv > 7)
                horasC = hcv - 7;
        }
        var suma = parseFloat(horasC) * parseFloat(maxCH);
        var total = parseFloat(totalViaticos) + parseFloat(suma) + parseFloat(costoVehiculo);
        Ext.getCmp('txtTotal').setValue(total.toFixed(2));
    }
    catch (e)
    {
        SendJsError(e, "CostoTotal - reservas.js", "obj");
    }
}

function ImprimirCosto()
{
    var html;
    try
    {
        var ccmb = Ext.getCmp('txtCKm').getValue();
        var pcmb = Ext.getCmp('txtCCmb').getValue();
        var costoVehiculo = ((km * ccmb) * parseFloat(pcmb).toFixed(2)).toFixed(2);
        var costoViaticos = (Ext.getCmp('txtViaticos1').getValue() * dias) + (Ext.getCmp('txtViaticos2').getValue() * dias);
        html = "<table cellpadding='2' cellspacing='4'  border=0 width='88%'>";
        html += "<tr>";
        html += "<td>";
        html += "- " + cmb + " para " + km + " km: " + (km * ccmb) + " por $" + parseFloat(pcmb).toFixed(2) + " aprox.";
        html += "</td>";
        html += "<td style='text-align:right'>$" + costoVehiculo + "</td>";
        html += "</tr>";

        html += "<tr>";
        html += "<td>";
        html += "- Viáticos " + dias + " días x " + ((typeof choferes[1] !== "undefined") ? 2 : 1) + " chofer/es a $" + Ext.getCmp('txtViaticos1').getValue() + " aprox ";
        html += "</td>";
        html += "<td style='text-align:right'>$" + costoViaticos + "</td>";
        html += "</tr>";

        html += "<tr>";
        html += "<td>";
        html += "- Peajes aproximados ";
        html += "</td>";
        html += "<td style='text-align:right'>$" + parseFloat(Ext.getCmp('txtPeaje').getValue()).toFixed(2) + "</td>";
        html += "</tr>";

        html += "<tr>";
        html += "<td>";
        var hci = parseFloat(Ext.getCmp('txtHorasIda').getValue());
        var hcv = parseFloat(Ext.getCmp('txtHorasVue').getValue());
        var horasC = 0;
        if (Ext.getCmp('chkII').getValue())
            horasC = hci;
        else
        {
            if (hci > 7)
                horasC = hci - 7;
        }

        if (Ext.getCmp('chkIV').getValue())
            horasC += hcv;
        else
        {
            if (hcv > 7)
                horasC = hcv - 7;
        }
        var costoIdaHoraExCh1 = parseFloat(Ext.getCmp('txtHEC1I').getValue() * Ext.getCmp('txtVHEC1I').getValue()).toFixed(2);
        var costoVueHoraExCh1 = parseFloat(Ext.getCmp('txtHEC1V').getValue() * Ext.getCmp('txtVHEC1V').getValue()).toFixed(2);
        var maxCH = Math.max(Ext.getCmp('txtVHEC1I').getValue(), Ext.getCmp('txtVHEC1V').getValue());

        var cCh1 = parseFloat(costoIdaHoraExCh1) + parseFloat(costoVueHoraExCh1);
        var costoIdaHoraExCh2 = parseFloat(Ext.getCmp('txtHEC2I').getValue() * Ext.getCmp('txtVHEC2I').getValue()).toFixed(2);
        var costoVueHoraExCh2 = parseFloat(Ext.getCmp('txtHEC2V').getValue() * Ext.getCmp('txtVHEC2V').getValue()).toFixed(2);
        var cCh2 = parseFloat(costoIdaHoraExCh2) + parseFloat(costoVueHoraExCh2);
        maxCH = Math.max(maxCH, Ext.getCmp('txtVHEC2I').getValue());
        maxCH = Math.max(maxCH, Ext.getCmp('txtVHEC2V').getValue());
        var suma = parseFloat(horasC) * parseFloat(maxCH);

        html += "- Horas extras aprox. " + horasC + "hs por $" + parseFloat(maxCH).toFixed(2);
        html += "</td>";
        html += "<td style='text-align:right'>$" + parseFloat(suma).toFixed(2) + "</td>";
        html += "</tr>";


        html += "<tr>";
        html += "<td>";
        html += "&nbsp;";
        html += "</td>";
        html += "<td style='text-align:right;height:25px;font-weight:bold;font-size:14px'>" + Ext.getCmp('txtTotal').getValue() + "</td>";
        html += "</tr>";


        html += "</table>";

        var w = window.open('Costo Aproximado', '', 'width=450,height=400,resizeable,scrollbars');
        w.document.write(html);
        w.document.title = "Costo Aproximado";
        w.document.close(); // needed for chrome and safari
    }
    catch (e)
    {
        SendJsError(e, "ImprimirCosto - reservas.js", html);
    }
}

function PopinCosto(res)
{
    try
    {
        var formFields = FieldsCosto(res);


        var win = Ext.create("Ext.window.Window", {
            title: 'Calculo de Costo Aproximado',
            bodyStyle: "padding: 5px;",
            //width:540,
            closable: true,
            layout: 'table',
            modal: true,
            items: {
                xtype: 'form',
                id: 'myForm',
                layout: {
                    /*   type : 'table',
                     columns : 2*/
                },
                defaults: {
                    padding: 10,
                    //width : 300,
                    cellCls: 'verticalAlignTop'
                },
                border: false,
                //labelWidth : 100,
                labelAlign: 'right',
                items: formFields,
                method: 'post',
                buttons: [
                    {
                        text: 'Calcular',
                        id: "new-record-cal-button",
                        handler: function() {
                            var form = this.up("form").getForm();
                            if (form.isValid())
                            {
                                CostoTotal();
                                //this.up("window").close();
                            }
                        }
                    },
                    {
                        text: 'Grabar Costo',
                        id: "new-record-grab-button",
                        handler: function() {
                            var form = this.up("form").getForm();
                            if (form.isValid())
                            {
                                var costo = Ext.getCmp('txtTotal').getValue();
                                costo = parseFloat(costo);
                                var reId = $("#hdnReservaId").val();
                                x_GrabarCosto(costo, reId, GrabarCosto_callback);
                            }
                        }
                    },
                    {
                        text: 'Imprimir',
                        id: "new-record-imp-button",
                        handler: function() {
                            var form = this.up("form").getForm();
                            if (form.isValid())
                            {
                                ImprimirCosto();
                            }
                        }
                    },
                    {
                        text: "Salir",
                        handler: function() {
                            this.up("window").close();
                        }
                    }

                ],
                listeners: {
                    afterrender: function() {
                        var that = this;
                        setTimeout(function() {
                            that.items.first().focus();
                        }, 750);

                        this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                            enter: function() {
                                Ext.getCmp("new-record-add-button").handler();
                            },
                            scope: this
                        });
                    }
                }
            }
        });

        return win;
    }
    catch (e)
    {
        SendJsError(e, "PopinCosto - reservas.js", res);
    }
}

var choferes, horaSalida, horaLlegada, feIni, km, cmb, ckm;
function InfoPresupuesto_callback(response)
{
    try
    {
        Ext.getCmp('txtDestino').setValue(response[1]);
        // $("#hdnChoferesIds").val(response[2]);
        Ext.getCmp('txtDistancia').setValue(response[8] * 2);
        km = response[8] * 2;
        feIni = response[4].split("/")[1] + "/" + response[4].split("/")[0] + "/" + response[4].split("/")[2];
        feFin = response[6].split("/")[1] + "/" + response[6].split("/")[0] + "/" + response[6].split("/")[2];
        Ext.getCmp('txtFechaInicio').setValue(FechaCompleta(new Date(feIni)) + " a las " + response[5]);
        Ext.getCmp('txtFechaFin').setValue(FechaCompleta(new Date(feFin)) + " a las " + response[7]);
        horaSalida = response[5];
        horaLlegada = response[7];
        Ext.getCmp('txtVehiculo').setValue(response[3]);
        Ext.getCmp('txtCmb').setValue(response[12]);
        cmb = response[12];
        Ext.getCmp('txtCKm').setValue(response[11]);
        ckm = response[11];
        choferes = response[13];
        Ext.getCmp('txtChofer1').setValue(choferes[0]['LastName'] + ", " + choferes[0]['FirstName']);
        if (typeof choferes[1] !== "undefined")
            Ext.getCmp('txtChofer2').setValue(choferes[1]['LastName'] + ", " + choferes[1]['FirstName']);
        else
        {
            Ext.getCmp('blockChofer2').hide();
        }
        $("#hdnReservaId").val(response[10]);
        var s1 = new Date(feIni + " " + horaSalida);
        var l1 = new Date(feFin + " " + horaLlegada);
        dias = Math.abs(Math.floor((s1.getTime() - l1.getTime()) / (1000 * 60 * 60 * 24)));
        Ext.getCmp('txtDiasT').setValue(dias);

    }
    catch (e)
    {
        SendJsError(e, "reservas.js", response);
    }


}
function PopinUpload(res)
{

    var win = new Ext.Window(
            {
                layout: 'fit',
                title: 'Lista de Pasajeros',
                modal: true,
                closeAction: 'hide',
                items: new Ext.Panel(
                        {
                            items: Ext.create('Ext.form.Panel', {
                                renderTo: 'fi-form',
                                frame: true,
                                //title: 'Subiendo Archivo',
                                bodyPadding: '10 10 0',
                                defaults: {
                                    anchor: '100%',
                                    allowBlank: false,
                                    msgTarget: 'side',
                                    labelWidth: 50
                                },
                                items: [{
                                        xtype: 'filefield',
                                        id: 'form-file',
                                        emptyText: 'Seleccione un archivo',
                                        fieldLabel: 'Archivo',
                                        name: 'archi-path',
                                        buttonText: 'Buscar'
                                    }],
                                buttons: [{
                                        text: 'Subir',
                                        handler: function() {
                                            var form = this.up('form').getForm();
                                            if (form.isValid()) {
                                                form.submit({
                                                    params: {
                                                        reservaId: res
                                                    },
                                                    url: 'file-upload.php',
                                                    waitMsg: 'Subiendo archivo...',
                                                    success: function(fp, o) {
                                                        msg('Success', 'Archivo "' + o.result.file + '" subido al servidor');
                                                        x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                                                    },
                                                    failure: function() {
                                                        msg('Error', 'No se pudo subir el archivo');
                                                    }
                                                });
                                            }
                                        }
                                    }, {
                                        text: 'Limpiar',
                                        handler: function() {
                                            this.up('form').getForm().reset();
                                        }
                                    }]
                            })
                        })
            });
    return win;
}
function PopinReserva(action, record)
{
    try
    {
        var formFields = FormField(record);
        CurrentObject = record;
        var title;
        var btnText = 'Guardar';
        if (action === "add") {
            title = "Agregar Reserva";
            btnText = 'Agregar';
        }
        else
            title = "Editar Reserva : " + (record ? record.data['Solicitante'] + " - " + record.data['Destino'] : '');

        var win = Ext.create("Ext.window.Window", {
            title: title,
            bodyStyle: "padding: 5px",
            width: 540,
            closable: true,
            layout: 'fit',
            modal: true,
            items: {
                xtype: "form",
                frame: true,
                defaultType: "textfield",
                overflowY: 'auto',
                url: 'file-upload.php',
                fileUpload: true,
                items: formFields,
                method: 'post',
                buttons: [
                    {
                        text: btnText,
                        id: "new-record-add-button",
                        handler: function() {
                            var form = this.up("form").getForm();
                            if (form.isValid())
                            {
                                SaveReserva(form, action);
                                this.up("window").close();
                            }
                        }
                    },
                    {
                        text: "Cancelar",
                        handler: function() {
                            this.up("window").close();
                        }
                    }

                ],
                listeners: {
                    afterrender: function() {
                        var that = this;
                        setTimeout(function() {
                            that.items.first().focus();
                        }, 750);

                        this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                            enter: function() {
                                Ext.getCmp("new-record-add-button").handler();
                            },
                            scope: this
                        });
                    }
                }
            }
        });

        return win;
    }
    catch (e)
    {
        SendJsError(e, "PopinReserva - reservas.js", action);
    }
}
function GridPanel(store, tve)
{
    var anios;
    try
    {
        // create the grid and specify what field you want
        // to use for the editor at each column.
        anios = [[2012, '2012'], [2013, '2013'], [2014, '2014'], [2015, '2015'], [2016, '2016'], [2017, '2017'], [2018, '2018'], [2019, '2019'], [2020, '2020']];

        var stanio = new Ext.data.ArrayStore({
            fields: ['id', 'anio'],
            data: anios
        });

        var meses = [[1, 'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'], [5, 'Mayo'], [6, 'Junio'], [7, 'Julio'], [8, 'Agosto'], [9, 'Septiembre'], [10, 'Octubre'], [11, 'Noviembre'], [12, 'Diciembre']];

        var stmes = new Ext.data.ArrayStore({
            fields: ['id', 'mes'],
            data: meses
        });


        var a = [0, 'Todos'];
        tve.push(a);
        var sttve = new Ext.data.ArrayStore({
            fields: ['TipoVehiculoId', 'Nombre'],
            data: tve
        });
        Ext.tip.QuickTipManager.init();
        var win;
        grid = Ext.create('Ext.grid.Panel', {
            store: store,
            columns: [{
                    header: 'Solicitante',
                    dataIndex: 'Solicitante',
                    flex: 1
                },
                {
                    header: 'Destino',
                    dataIndex: 'Destino',
                    flex: 1
                },
                {
                    header: 'Vehiculo',
                    dataIndex: 'Vehiculo',
                    flex: 1
                },
                {
                    header: 'Periodo',
                    dataIndex: 'Periodo',
                    flex: 1
                },
                {
                    header: 'Choferes',
                    dataIndex: 'ChoferName',
                    flex: 1
                },
                {
                    header: 'Estado',
                    dataIndex: 'Estado',
                    align: 'center',
                    renderer: function(value)
                    {
                        if (value === 'Pendiente')
                            return "<font color=red>" + value + "</font>";
                        else if (value === 'Confirmada')
                            return "<font color=green>" + value + "</font>";
                        else if (value === 'Realizada')
                            return "<font color=navy>" + value + "</font>";
                        else
                            return value;
                    }

                },
                {
                    header: 'Costo Aprox',
                    dataIndex: 'GastoTotal',
                    align: 'center',
                    renderer: 'usMoney'

                }, {
                    menuDisabled: true,
                    sortable: false,
                    xtype: 'actioncolumn',
                    header: 'Acciones',
                    align: 'center',
                    width: 90,
                    items: [{
                            icon: '../images/icons/fam/delete.gif', // Use a URL in the icon config
                            tooltip: 'Borrar',
                            align: 'center',
                            altText: 'Borrar',
                            cls: 'x-icon-action',
                            handler: function(grid, rowIndex, colIndex) {
                                if (hasUpdate) {
                                    var record = grid.store.getAt(rowIndex);
                                    DeleteReserva(record, grid, rowIndex);
                                }

                            }
                        }, {
                            icon: '../images/icons/money.png',
                            tooltip: 'Calcular Costo',
                            align: 'center',
                            altText: 'Calcular Costo',
                            handler: function(grid, rowIndex, colIndex) {
                                if (hasUpdate) {
                                    var record = grid.store.getAt(rowIndex);
                                    var win = PopinCosto(record);
                                    win.show();
                                    ridx = rowIndex;
                                    x_InfoPresupuesto((record ? record.data['ReservaId'] : null), InfoPresupuesto_callback);
                                }

                            }
                        }, {
                            icon: '../images/icons/fam/file.gif',
                            tooltip: 'Adjuntar Archivo',
                            align: 'center',
                            altText: 'Adjuntar archivo',
                            handler: function(grid, rowIndex, colIndex) {
                                if (hasUpdate) {
                                    var record = grid.store.getAt(rowIndex);
                                    var win = PopinUpload((record ? record.data['ReservaId'] : null));
                                    win.show();
                                    ridx = rowIndex;
                                }

                            }
                        }
                        , {
                            icon: '../images/icons/edit16x16.png',
                            tooltip: 'Editar',
                            align: 'center',
                            altText: 'Editar',
                            handler: function(grid, rowIndex, colIndex) {
                                var record = grid.store.getAt(rowIndex);
                                if (hasUpdate) {
                                    var win = PopinReserva('edit', record);
                                    win.show();
                                    ridx = rowIndex;
                                    GetChVe("");
                                }


                            }

                        }]
                }
            ],
            renderTo: 'tblReservas',
            width: '98%',
            height: '75%',
            //stripeRows: true,
            title: 'Reservas - Automotores UNSa',
            frame: true,
            tbar: [{
                    xtype: 'datefield',
                    fieldLabel: 'Dia',
                    labelWidth: 30,
                    id: 'txtDia',
                    mode: 'local',
                    submitFormat: 'YYYY-mm-dd H:i:m',
                    value: dia,
                    width: 125,
                    listeners: {
                        'change': function(txt, record, idx) {
                            dia = txt.value;
                            if (dia)
                                dia = dia.f("yyyy-MM-dd");
                            x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                        }
                    }

                }
                , {
                    xtype: 'combo',
                    fieldLabel: 'Mes',
                    labelWidth: 30,
                    store: stmes,
                    id: 'ddlMes',
                    valueField: 'id',
                    displayField: 'mes',
                    typeAhead: true,
                    mode: 'local',
                    // forceSelection: true,
                    value: mes,
                    width: 120,
                    emptyText: '......',
                    listeners: {
                        'select': function(combo, record, idx) {
                            mes = combo.value;
                            x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                        }
                    }

                }
                , {
                    xtype: 'combo',
                    fieldLabel: 'Año',
                    labelWidth: 30,
                    store: stanio,
                    id: 'ddlAnio',
                    valueField: 'id',
                    displayField: 'anio',
                    typeAhead: true,
                    mode: 'local',
                    //forceSelection: true,
                    value: anio,
                    width: 120,
                    emptyText: '......',
                    listeners: {
                        'select': function(combo, record, idx) {
                            anio = combo.value;
                            x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                        }
                    }

                }, {
                    xtype: 'combo',
                    fieldLabel: 'Estado',
                    labelWidth: 50,
                    store: stestados,
                    id: 'ddlEstado',
                    valueField: 'Id',
                    displayField: 'Estado',
                    typeAhead: true,
                    mode: 'local',
                    // forceSelection: true,
                    value: estado,
                    width: 150,
                    emptyText: '......',
                    listeners: {
                        'select': function(combo, record, idx) {
                            estado = combo.value;
                            x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Tipo vehículo',
                    labelWidth: 90,
                    store: sttve,
                    id: 'ddlTipoVehiculo',
                    valueField: 'TipoVehiculoId',
                    displayField: 'Nombre',
                    typeAhead: true,
                    mode: 'local',
                    // forceSelection: true,
                    value: tvehiculoId,
                    width: 180,
                    emptyText: '......',
                    listeners: {
                        'select': function(combo, record, idx) {
                            tvehiculoId = combo.value;
                            x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
                        }
                    }
                }, {
                    text: 'Agregar Reserva',
                    iconCls: 'icon-add',
                    handler: function() {
                        if (hasInsert) {

                            var record = null;
                            var win = PopinReserva('add', record);
                            win.show();

                        }
                    }
                },
                {
                    text: 'Print',
                    iconCls: 'icon-print',
                    handler: function() {
                        var mesn = Ext.getCmp("ddlMes");
                        var mesn = mesn.rawValue;
                        var anio = Ext.getCmp("ddlAnio").getValue();
                        Ext.ux.grid.Printer.mainTitle = "Lista de Reservas <br/> Mes: " + mesn + "    Año : " + anio;
                        Ext.ux.grid.Printer.headerText = "Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios";
                        Ext.ux.grid.Printer.printLinkText = "Imprimir";
                        Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                        Ext.ux.grid.Printer.printAutomatically = false;
                        Ext.ux.grid.Printer.print(grid);

                    }
                }
            ]/*,bbar: new Ext.PagingToolbar({
             store         : store,
             pageSize      : 4,
             displayInfo   : true
             }),
             viewConfig: {
             forceFit: true
             }*/
        });

        //store.loadPage(1);

        return grid;
    }
    catch (e)
    {
        SendJsError(e, "PopinReserva - reservas.js", anios);
    }
}
function LoadReservas_callback(response)
{
    var data;
    try
    {
        $("#tblReservas").html("");
        data = ObjToArray(response[1]);
        var tve = ObjToArray(response[2]);
        ve = ObjToArray(response[3]);
        ch = ObjToArray(response[4]);
        Ext.onReady(function() {
            // Define our data model
            var win;
            Ext.define('Reserva', {
                extend: 'Ext.data.Model',
                fields: ['ReservaId', 'Destino', 'Solicitante', 'EmailSolicitante', 'AutorizadoPor', 'Tipo', 'Vehiculo', 'VehiculoId', 'ChoferesIds',
                    'Estado', 'FechaInicio', 'FechaFin', 'HoraSalida', 'HoraLlegada', 'Periodo', 'Distancia', 'NumPasajeros', 'ChoferName', 'Observacion', 'FileName',
                    {
                        name: 'GastoTotal',
                        type: 'usMoney'
                    }]
            });


            // create the Data Store
            var store = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                pageSize: 10,
                //remoteSort: true,
                model: 'Reserva',
                proxy: {
                    type: 'memory'/*,
                     simpleSortMode: true*/
                },
                data: data,
                 sorters: [{
                 property: 'Solicitante',
                 direction: 'ASC'
                 }]/*,
                 totalProperty : 8,
                 autoLoad  : {
                 params:
                 
                 {
                 start:0, 
                 limit:4
                 }
                 }*/
            });
            var grid = GridPanel(store, tve);
        });
    }
    catch (e)
    {
        SendJsError(e, "LoadReservas_callback - reservas.js", data);
    }
}
var rowDelete;
function DeleteReserva(record, grid, rowId)
{
    try
    {
        if (hasUpdate) {
            rowDelete = rowId;
            Ext.Msg.confirm('Eliminar Reserva', 'Esta seguro que quiere eliminar este Reserva?', function(button) {
                if (button === 'yes') {

                    var sm = grid.getSelectionModel();
                    if (rowDelete)
                    {
                        var rec = grid.getSelectionModel().getSelection()[rowDelete];

                        grid.store.remove(record);
                        if (grid.store.getCount() > 0) {
                            sm.select(0);
                        }
                        var vehiculoId = record.data['ReservaId'];
                        x_DeleteReserva(vehiculoId, DeleteReserva_callback);
                        rowDelete = null;
                    }
                }
            });

        }
    }
    catch (e)
    {
        SendJsError(e, "DeleteReserva - reservas.js", rowId);
    }
}
function DeleteReserva_callback(response)
{

    if (response)
    {
        humane.success("Se ha eliminado el vehiculo correctamente.");

        x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar el vehiculo.");
        SendJsError(new Error("Error DeleteReserva-vehiculos.js"), "vehiculos.js", response);

    }

}
function SaveReserva(form, action)
{
    var rec;
    try
    {
        rec = form.getValues();
        if (action !== "add") {
            if (!hasUpdate) {
                return;
            }
            rec['ReservaId'] = CurrentObject.data['ReservaId'];
        }
        else
            rec['ReservaId'] = 0;
        rec['UserId'] = user;
        var reserva = JSON.stringify(rec);
        console.log(reserva);
        x_SaveReserva(reserva, SaveReserva_callback);
    } catch (e)
    {
        SendJsError(e, "SaveReserva - reservas.js", rec);
    }
}


function SaveReserva_callback(response)
{
    if (response)
    {
        humane.success("Se ha guardado la reserva correctamente.");
        x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar la reserva.");
        SendJsError(new Error("Error SaveReserva-reservas.js"), "reservas.js", response);
    }

}
function GrabarCosto_callback(response)
{

    if (response)
    {
        humane.success("Se grabado correctamente.");
        x_LoadReservas(dia, mes, anio, tvehiculoId, estado, LoadReservas_callback);
    }
    else
    {
        humane.error("Hubo un error al grabar el costo.");
        SendJsError(new Error("GrabarCosto_callback-reservas.js"), "reservas.js", response);
    }
}