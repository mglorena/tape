var date = new Date();
var anio = date.getFullYear();
console.log(anio);
x_LoadServicios(anio, LoadServicios_callback);
function oFilterClick(item) {
    alert(1);
    if (typeof (item.stateId) !== "undefined")
    {
        anio = item.stateId;
        x_LoadServicios(anio, LoadServicios_callback);
    }
}
function LoadServicios_callback(response)
{
    var amenu = Ext.create('Ext.menu.Menu');
    amenu.add({icon: '../images/icons/preview.png', text: '2011', stateId: 2011, handler: oFilterClick});
    amenu.add({icon: '../images/icons/preview.png', text: '2012', stateId: 2012, handler: oFilterClick});
    amenu.add({icon: '../images/icons/preview.png', text: '2013', stateId: 2013, handler: oFilterClick});
    amenu.add({icon: '../images/icons/preview.png', text: '2014', stateId: 2014, handler: oFilterClick});
    amenu.add({icon: '../images/icons/preview.png', text: '2015', stateId: 2015, handler: oFilterClick});

    var downloadChart = function(chart) {
        Ext.MessageBox.confirm('Bajar', 'Desea bajar el grafico como imagen?', function(choice) {
            if (choice == 'yes') {
                chart.save({
                    type: 'image/png'
                });
                
            }
        });
    };

    var autoMenu = {text: 'Año', iconCls: 'bmenu', menu: amenu};
    var tb = Ext.create('Ext.toolbar.Toolbar',
            {items: [autoMenu,
                    {
                        text: 'Guardar Luz',
                        handler: function() {
                            downloadChart(chart1);
                        }
                    },
                    {
                        text: 'Guardar Agua',
                        handler: function() {
                            downloadChart(chart2);
                        }
                    },
                    {
                        text: 'Guardar Gas',
                        handler: function() {
                            downloadChart(chart3);
                        }
                    }]
            });
    //tb.width('200');
    //tb.suspendLayouts();
    //tb.add(autoMenu);
    //tb.resumeLayouts(true);

    $("#tblServicios").html("");
    var luz = ObjToArray(response[1]);
    var agua = ObjToArray(response[2]);
    var gas = ObjToArray(response[3]);
    tsagua = ObjToArray(response[4]);
    tsluz = ObjToArray(response[5]);
    tsgas = ObjToArray(response[6]);

console.log(luz);
    var anios = [[2011, '2011'],[2012, '2012'], [2013, '2013'], [2014, '2014'], [2015, '2015'], [2016, '2016'], [2017, '2017'], [2018, '2018'], [2019, '2019'], [2020, '2020']];

    var stanio = new Ext.data.ArrayStore({
        fields: ['id', 'anio'],
        data: anios
    });
    var store1 = Ext.create('Ext.data.JsonStore', {
        fields: ['Mes', 'Consumo'],
        data: luz
    });
    var store2 = Ext.create('Ext.data.JsonStore', {
        fields: ['Mes', 'Consumo'],
        data: agua
    });

    var store3 = Ext.create('Ext.data.JsonStore', {
        fields: ['Mes', 'Consumo'],
        data: gas
    });
    var chart1 = Ext.create('Ext.chart.Chart', {
        xtype: 'chart',
        animate: false,
        store: store1,
        insetPadding: 30,
        gradients: [{
                angle: 90,
                id: 'bar-gradient',
                stops: {
                    500: {
                        color: '#99BBE8'
                    },
                    10000: {
                        color: '#77AECE'
                    },
                    20000: {
                        color: '#77AECE'
                    }
                }
            }],
        axes: [{
                type: 'Numeric',
                minimum: 0,
                maximum: 40000,
                position: 'left',
                fields: ['data1'],
                title: false,
                grid: true,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    font: '10px Arial'
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['Mes'],
                title: false,
                grid: true,
                label: {
                    font: '11px Arial',
                    renderer: function(name) {
                        return name.substr(0, 3);
                    }
                }
            }],
        series: [{
                type: 'column',
                axis: 'left',
                xField: 'name',
                yField: 'Consumo',
                style: {
                    fill: 'url(#bar-gradient)',
                    'stroke-width': 3
                },
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0,
                    fill: '#38B8BF',
                    stroke: '#38B8BF'
                }
            }]
    });
    var chart2 = Ext.create('Ext.chart.Chart', {
        xtype: 'chart',
        animate: false,
        store: store2,
        insetPadding: 30,
        gradients: [{
                angle: 90,
                id: 'bar-gradient',
                stops: {
                    5000: {
                        color: '#99BBE8'
                    },
                    20000: {
                        color: '#77AECE'
                    },
                    70000: {
                        color: '#77AECE'
                    }
                }
            }],
        axes: [{
                type: 'Numeric',
                minimum: 0,
                maximum: 350000,
                position: 'left',
                fields: ['data1'],
                title: false,
                grid: true,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    font: '10px Arial'
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['Mes'],
                title: false,
                grid: true,
                label: {
                    font: '11px Arial',
                    renderer: function(name) {
                        return name.substr(0, 3);
                    }
                }
            }],
        series: [{
                type: 'column',
                axis: 'left',
                xField: 'name',
                yField: 'Consumo',
                style: {
                    fill: 'url(#bar-gradient)',
                    'stroke-width': 3
                },
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0,
                    fill: '#38B8BF',
                    stroke: '#38B8BF'
                }
            }]
    });
    var chart3 = Ext.create('Ext.chart.Chart', {
        xtype: 'chart',
        animate: false,
        store: store3,
        insetPadding: 30,
        gradients: [{
                angle: 90,
                id: 'bar-gradient',
                stops: {
                    500: {
                        color: '#99BBE8'
                    },
                    10000: {
                        color: '#77AECE'
                    },
                    20000: {
                        color: '#77AECE'
                    }
                }
            }],
        axes: [{
                type: 'Numeric',
                minimum: 0,
                maximum: 20000,
                position: 'left',
                fields: ['data1'],
                title: false,
                grid: true,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    font: '10px Arial'
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['Mes'],
                title: false,
                grid: true,
                label: {
                    font: '11px Arial',
                    renderer: function(name) {
                        return name.substr(0, 3);
                    }
                }
            }],
        series: [{
                type: 'column',
                axis: 'left',
                xField: 'name',
                yField: 'Consumo',
                style: {
                    fill: 'url(#bar-gradient)',
                    'stroke-width': 3
                },
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0,
                    fill: '#38B8BF',
                    stroke: '#38B8BF'
                }
            }]
    });
    var panel3 = Ext.create('widget.panel', {
        width: 890,
        height: 445,
        title: tsgas[0]['Nombre'] + ' ' + anio,
        //renderTo: 'tblServicios',
        layout: 'fit',
        items: chart3,
        padding: 0,
        margin: 0
    });
    var panel2 = Ext.create('widget.panel', {
        width: 890,
        height: 445,
        title: tsagua[0]['Nombre'] + ' ' + anio,
        //renderTo: 'tblServicios1',
        layout: 'fit',
        items: chart2,
        padding: 0,
        margin: 0
    });
    var panel1 = Ext.create('widget.panel', {
        width: 890,
        height: 445,
        title: tsluz[0]['Nombre'] + ' ' + anio,
        //renderTo: 'tblServicios2',
        layout: 'fit',
        items: chart1,
        padding: 0,
        margin: 0
    });

    var panel0 = Ext.create('widget.panel', {
        width: 900,
        height: 800,
        title: 'Consumo Servicios de Agua, Electricidad y Gas del año ' + anio,
        renderTo: 'tblServicios',
        autoScroll: true,
        columns: 2,
        padding: 0,
        margin: 0

    });
    panel0.add(tb);
    panel0.add(panel1);
    panel0.add(panel2);
    panel0.add(panel3);
}
