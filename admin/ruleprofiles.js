/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var profileId = null;
x_LoadPerfiles(profileId, LoadPerfiles_callback);

function LoadPerfiles_callback(response) {
     $("#content").html("");
    var prof = ObjToArray(response[1]);
    var listhas = ObjToArray(response[2]);
    var listnothas = ObjToArray(response[3]);
  //console.log(listhas);
    var stprofiles = new Ext.data.ArrayStore({
        fields: ['ProfileId', 'Name'],
        data: prof
    });

    Ext.onReady(function() {
        Ext.tip.QuickTipManager.init();

        // Simple ComboBox using the data store
        var simpleCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Seleccione el Perfil:',
            renderTo: 'content',
            valueField: 'ProfileId',
            displayField: 'Name',
            width: 320,
            labelWidth: 130,
            store: stprofiles,
            queryMode: 'local',
            typeAhead: true,
            value:profileId,
            listeners: {
                'select': function(combo, data, func) {
                    profileId = combo.value;
                    x_LoadPerfiles(profileId, LoadPerfiles_callback);
                }
            }
        });




    });
}