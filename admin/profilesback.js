/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
x_LoadProfiles(LoadProfiles_callback);
function ClearData()
{
    getId("txtProfilename").value="";
    
}
function LoadProfiles_callback(response)
{
    getId("tblProfiles").innerHTML =response;
      
}
function PopinInsertProfile(ev)
{
    ClearData();
    getId("btnSave").onclick = function (){
        InsertProfile();
    };
    titlePopin ="Agregar Perfil "; 
    Popin(ev,"divProfile",5);
        
}
function InsertProfile()
{
      
    var name = getId("txtProfilename").value;
    var active = getId("chkActive").checked;
    x_InsertProfile(name,active,InsertProfile_callback);
       
}

function InsertProfile_callback(response)
{
    
    if(response)
    {
        humane.success("Se ha guardado el perfil correctamente.");
        ClosePopin();
        x_LoadProfiles(LoadProfiles_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar el perfil.");
        SendJsError(new Error("Error InsertProfile-profiles.js"),"profiles.js",response);
    }
    ClosePopin();
       
}

function EditProfile(ev,profileId)
{
    
    x_EditProfile(profileId,EditProfile_callback);
     getId("btnSave").onclick = function (){
        SaveProfile();
    };
    titlePopin ="Editar Perfil ";
    Popin(ev,"divProfile",5);
        
}
function EditProfile_callback(response)
{
    getId("txtProfilename").value = response[1];
    getId("chkActive").checked = response[2];
    getId("hdnProfileId").value= response[3];
}
function SaveProfile()
{
    var name = getId("txtProfilename").value;
    var active =getId("chkActive").checked;
    var pId =getId("hdnProfileId").value;
    x_SaveProfile(pId,name,active,SaveProfile_callback);
        
}
function SaveProfile_callback(response)
{
    if(response)
    {
        humane.success("Se ha guardado el perfil correctamente.");
        ClosePopin();
        x_LoadProfiles(LoadProfiles_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar el perfil.");
        SendJsError(new Error("Error SaveProfile-profiles.js"),"profiles.js",response);
    }
    ClosePopin();
}
function Cancel()
{
    getId("txtProfilename").value = "";
    getId("chkActive").checked = false;
    ClosePopin();
}
function DeleteProfile(profileId)
{
    
    smoke.confirm('Esta seguro que quiere borrar este perfil?',function(e){
        if (e){
            x_DeleteProfile(profileId,DeleteProfile_callback);
           
        }
    });
}
function DeleteProfile_callback(response)
{
        
    if(response)
    {
        humane.success("Se ha eliminado el perfil correctamente.");
        ClosePopin();
        x_LoadProfiles(LoadProfiles_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar el perfil.");
        SendJsError(new Error("Error DeleteProfile-profiles.js"),"profiles.js",response);
    }
    ClosePopin();
}
