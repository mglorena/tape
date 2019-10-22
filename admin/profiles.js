/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('DataObject', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'desc']
});
var perfilId =null;
function oFilterClick(item) {
    if (typeof (item.stateId) !== "undefined")
    {
        anio = item.stateId;
        x_LoadServicios(anio, LoadServicios_callback);
    }
}
x_LoadPerfiles(perfilId,LoadPerfiles_callback);

function LoadPerfiles_callback(response) {
    $("#panel").html("");
    $("#panel0").html("");
    var prof = ObjToArray(response[1]);
    var listhas =ObjToArray(response[2]);
    var listnothas = ObjToArray(response[3]);
    //console.log(listhas);
   // console.log(listnothas);
//    myData = listnothas;
    Ext.onReady(function() {
        var stprofiles = new Ext.data.ArrayStore({
            fields: ['ProfileId', 'Name'],
            data: prof
        });
        


        var tb = Ext.create('Ext.toolbar.Toolbar',
                {items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Perfil',
                            id: 'ProfileId',
                            name: 'ProfileId',
                            store: stprofiles,
                            valueField: 'ProfileId',
                            displayField: 'Name',
                            labelWidth: 50,
                            width: 150,
                            editable: false,
                            allowBlank: false,
                            value: perfilId,
                            listeners: {
                                'select': function(combo,data,func) {
                                   perfilId = combo.value;
                                   x_LoadPerfiles(perfilId,LoadPerfiles_callback);
                                }
                            }}]
                });
        // create the data store
        var firstGridStore = Ext.create('Ext.data.Store', {
            model: 'DataObject',
            data: listnothas
        });

        // Column Model shortcut array
        var columns = [
            {text: "Regla Id", width: 10, flex: 1, sortable: true, dataIndex: 'id'},
            {text: "Permiso", width: 50, flex: 1, sortable: true, dataIndex: 'name'},
            {text: "Descripcion", width: 120, dataIndex: 'desc'}

        ];

        // declare the source Grid
        var firstGrid = Ext.create('Ext.grid.Panel', {
            multiSelect: true,
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'firstGridDDGroup',
                    dropGroup: 'secondGridDDGroup'
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                        alert("Drag from right to left" + 'Dropped ' + data.records[0].get('name') + dropOn);
                        // Ext.example.msg("Drag from right to left", 'Dropped ' + data.records[0].get('name') + dropOn);
                    }
                }
            },
            store: firstGridStore,
            columns: columns,
            stripeRows: true,
            flex:1,
            title: 'Permisos',
            margins: '0 2 0 0'
        });

        var secondGridStore = Ext.create('Ext.data.Store', {
            model: 'DataObject',
                    data:listhas
        });
        var profile = Ext.getCmp('ProfileId').rawValue;
        // create the destination Grid
        var secondGrid = Ext.create('Ext.grid.Panel', {
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'secondGridDDGroup',
                    dropGroup: 'firstGridDDGroup'
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                        //Ext.example.msg("Drag from left to right", 'Dropped ' + data.records[0].get('name') + dropOn);
                    }
                }
            },
            store: secondGridStore,
            columns: columns,
            stripeRows: true,
            flex:1,
            title: 'Perfil - ' + profile,
            margins: '0 0 0 3'
        });

        //Simple 'border layout' panel to house both grids
        var display = Ext.create('Ext.Panel', {
            width: 950,
           //height: 300,
            layout: {
               // type: 'hbox',
                align: 'stretch',
                padding: 5
            },
            renderTo: 'panel0',
            //defaults     : { flex : 1 }, //auto stretch
            items: [tb]
            
        });
        var displayPanel = Ext.create('Ext.Panel', {
            width: 950,
            height: 300,
            layout: {
                type: 'hbox',
                align: 'stretch',
                padding: 0
            },
            renderTo: 'panel',
            defaults     : { flex : 1 }, //auto stretch
            items: [/*tb,*/
                firstGrid,
                secondGrid
            ],
            dockedItems: {
                xtype: 'toolbar',
                dock: 'bottom',
                items: ['->', // Fill
                    {
                        text: 'Reset both grids',
                        handler: function() {
                            perfilId=null;
                            //refresh source grid
                            /*firstGridStore.loadData(listnothas);
                            profileId=null;
                            Ext.getCmp('ProfileId').value = profileId;
                            //purge destination grid
                            secondGridStore.removeAll();*/
                            x_LoadPerfiles(perfilId,LoadPerfiles_callback);
                        }
                    }]
            }
        });
    });
}