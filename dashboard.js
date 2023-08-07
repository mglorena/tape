
function WidgetResos_callback(response)
{
    try
    {

        var resos = response[1];
             var win1 = Ext.create('Ext.Window', {
                title: 'Resoluciones',
                width: 240,
                height:410,
                // Constraining will pull the Window leftwards so that it's within the parent Window
                x: 0,
                y: 0,
                constrain: true,
                layout: 'fit',
                items: [{
                        html: (resos?resos:" &nbsp;Hubo un error - consulte con su administrador"),
                       
                    }]
            });
        var win2 = Ext.create('Ext.Window', {
            title: 'Alertas',
            width: 200,
            height: 100,
            // Constraining will pull the Window leftwards so that it's within the parent Window
            x: 245,
            y: 0,
            constrain: true,
            layout: 'fit',
            items: {
                border: false
            }
        });
        Ext.onReady(function() {
            var panel = Ext.create('Ext.Panel', {
                id: 'main-panel',
                baseCls: 'x-plain',
                renderTo: 'divBoard',
                height: 400,
                width: 990,
                items: [win1, win2]
            });
            win2.show();
            win1.show();
        });
    }
    catch (ex)
    {
        alert(ex.message);
        SendJsError(ex, "WidgetResos_callback", response);
    }
}





