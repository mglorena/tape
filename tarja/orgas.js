var date = new Date();
var mes = date.getMonth();
var anio = date.getFullYear();
var mesNom = date.toLocaleString();
mes = mes + 1;
var depId = 9;


$(function() {
    //console.log(9);
    x_LoadOrganigram(9, LoadOrganigram_callback);
});
var o = new orgChart();
var orgas;
function LoadOrganigram_callback(response)
{
    try
    {
        o = new orgChart();
         o.clearCanvas("canvas1");
        orgas = ObjToArray(response[1]);
        for (i = 0; i < orgas.length; i++)
        {
            o.addNode(orgas[i].DependenciaId, orgas[i].PadreId, '', orgas[i].Nombre, '0', "popin");

        }
        o.drawChart('canvas1');
    }
    catch (e)
    {
        SendJsError(e, "LoadOrganigram_callback - orgas.js", response);
    }
}
var win2, win3;

function PopinOptions(e, id)
{
    var menu = new Ext.menu.Menu({margin: '0 0 10 0', top: 0, left: 110,
        //floating: true,
        items: [
            {
                text: 'Editar',
                icon: '../images/icons/edit16x16.png',
                handler: function() {
                    PopinOrga(id, 'edit');
                }
            }, {
                text: 'Eliminar',
                icon: '../images/icons/del14x14.png',
                handler: function() {
                    DeleteOrga(id);
                }
            }, {
                text: 'Agregar',
                icon: '../images/icons/add12x12.png',
                handler: function() {
                    PopinOrga(id, 'add');
                }
            }

        ]});
    var position = [e.clientX, e.clientY];//e.getXY();
    menu.showAt(position);
}
function PopinOrga(id, ac)
{
    var curorgas = o.allNodes();
    var orgass = new Ext.data.ArrayStore({
        fields: ['id', 'txt', 'parent'],
        data: curorgas
    });
    var orga, odel = '';
    if (ac === "edit") {
        orgass.filterBy(function(rec) {
           // console.log(odel);
            if (rec.data['id'] !== id)
            {
                if (rec.data['parent'] !== id && odel.indexOf("#" + id + "#") === -1 && odel.indexOf("#" + rec.data['parent'] + "#") === -1)
                    return true;
                else {
                    odel += '#' + rec.data['id'] + "#";
                    return false;
                }
            }
            else
            {

                return false;
            }
           
        });
        orga = o.getNode(id);
    }
    else
    {
        orga = o.addNode((id + '#' + Math.floor(Math.random() * 101)), id, 'u', '', '', 'popin');
    }
    // console.log(orga);
    var cmbOrgas = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Padres',
        id: 'ddlOrgas',
        name: 'PadreId',
        valueField: 'id',
        displayField: 'txt',
        width: 300,
        store: orgass,
        queryMode: 'local',
        value: orga.parent
    });

    var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
    if (win2)
        win2.close();
    win2 = Ext.create('Ext.Window', {
        title: 'Modificación de Datos de Empleado',
        width: 360,
        id: 'popinOrga',
        height: 150,
        layout: 'fit',
        defaults: {
            border: 0,
            cellCls: 'verticalAlignTop'
        },
        items: {
            border: 0,
            xtype: "form",
            frame: true,
            defaultType: "textfield",
            overflowY: 'auto',
            items: [{
                    fieldLabel: 'Id',
                    id: 'DependenciaId',
                    name: 'DependenciaId',
                    value: (orga.id ? orga.id : null),
                    editable: false,
                    hidden: true
                }, {
                    fieldLabel: 'Nombre',
                    name: 'Nombre',
                    id: 'Nombre',
                    value: orga.txt,
                    width: 300,
                    afterLabelTextTpl: required,
                    allowBlank: false

                },
                cmbOrgas
            ],
            buttons: [
                {
                    text: 'Grabar',
                    id: "new-record-grab-button",
                    handler: function() {
                        var form = this.up("form").getForm();
                        if (form.isValid())
                        {
                            var rec = form.getValues();
                            ChangeOrga(rec);
                            this.up("window").close();
                        }
                    }
                },
                {
                    text: 'Cancelar',
                    id: "new-record-cancel-button",
                    handler: function() {
                        this.up("window").close();
                    }
                }]
        }
    }).show();
}
function ChangeOrga(rec)
{
    o.changeNode(String(rec['DependenciaId']), rec['PadreId'], rec['Nombre']);
    o.clearCanvas("canvas1");
    o.drawChart('canvas1');
    SaveAll();
}
function AddOrga(rec)
{
    o.changeNode(String(rec['DependenciaId']), rec['PadreId'], rec['Nombre']);
    o.clearCanvas("canvas1");
    o.drawChart('canvas1');
    SaveAll();
}
function DeleteOrga(id)
{
    Ext.Msg.confirm('Eliminar Organización', 'Esta seguro que quiere eliminar este Organizacion?', function(button) {
        if (button === 'yes') {
            x_DeleteOrga(id, DeleteOrga_callback);
        }
    });
}
function DeleteOrga_callback(response)
{
    if (response[1])
    {
        o.removeNode(response[2]);
        o.clearCanvas("canvas1");
        o.drawChart('canvas1');
        SaveAll();
    }
    else
    {
        humane.error("No se puede eliminar esa Organización esta en uso.");
        SendJsError(new Error("No se puede eliminar esa Organización esta en uso."), "DeleteOrga_callback-orgas.js", response);
    }
}
function SaveAll()
{
    var curorgas = o.allNodes();
    var orgas = JSON.stringify(curorgas);
    //console.log(orgas);

    x_SaveAll(orgas, SaveAll_callback);
}
function SaveAll_callback(response)
{
    if (!response)
    {
        humane.error("Hubo un error al guardar los datos.");
        SendJsError(new Error("Hubo un error al guardar los datos, de dependencias Organigrama"), "SaveAll_callback - personas.js", response);
    }
}
/*
 var o = new orgChart();
 
 o.addNode(10, '', '', 'Rectorado');
 o.addNode(2, 10, 'u', 'Bienestar Universitario', '0', 'javascript:alert("testing alert");');
 o.addNode(3, 10, 'u', 'Extension Universitaria');
 o.addNode(4, 1, 'u', 'Secretaría Academica');
 o.addNode(5, 1, 'u', 'l-node 1');
 o.addNode(6, 1, 'l', 'l-node 2');
 o.addNode(7, 1, 'r', 'r-node 1');
 o.addNode(8, 1, 'r', 'r-node 2');
 o.addNode(9, 1, 'r', 'r-node 3');
 
 o.addNode('', '', '', 'Root 2');
 o.addNode('', 'Root 2', 'r', 'using');
 o.addNode('', 'Root 2', 'r', 'text as\nid');
 
 o.drawChart('canvas1');*/


function GetDependencia(ddl)
{
  
    var orgaId = ddl.options[ddl.selectedIndex].value;
  
    x_LoadOrganigram(orgaId, LoadOrganigram_callback);
}