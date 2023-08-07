/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
x_LoadUsers(LoadUsers_callback);

function ClearData()
{
    getId("txtUsername").value="";
    getId("txtNombre").value="";
    getId("txtApellido").value="";
    getId("txtPassword").value="";
    getId("txtConfirmPassword").value="";
    getId("txtEmail").value="";
    
}
function LoadUsers_callback(response)
{
    getId("tblUsers").innerHTML =response;
      
}
function PopinInsertUser(ev)
{
    ClearData();
    $("#tblPassword").show();
    getId("btnSave").onclick = function (){
        InsertUser();
    };
    titlePopin ="Agregar Usuario "; 
    Popin(ev,"divUser",5);
        $("#hdnUserId").val("");
}
function InsertUser()
{
      
    var user = getId("txtUsername").value;
    var nom =getId("txtNombre").value;
    var ape = getId("txtApellido").value;
    var email = getId("txtEmail").value;
    var pass = getId("txtPassword").value;
    var confpass = getId("txtConfirmPassword").value;
   
    if(pass != confpass)
    {
        humane.error("Las contrase&ntilde;as no coinciden.");
    }
    else
    {
        x_InsertUser(user,nom,ape,pass,email,InsertUser_callback);
    }
       
}

function InsertUser_callback(response)
{
    
    if(response)
    {
        humane.success("Se ha guardado el usuario correctamente.");
        ClosePopin();
        x_LoadUsers(LoadUsers_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar el usuario.");
        SendJsError(new Error("Error InsertUser-users.js"),"users.js",response);
    }
    ClosePopin();
       
}

function EditUser(ev,userId)
{
    ClearData();
    $("#tblPassword").hide();  
    x_EditUser(userId,EditUser_callback);
    getId("btnSave").onclick = function (){
        SaveUser();
    };
    titlePopin ="Editar Usuario ";
    Popin(ev,"divUser",5);
        
}
function EditUser_callback(response)
{
        
    getId("txtUsername").value = response[1];
    getId("txtNombre").value = response[2];
    getId("txtApellido").value = response[3];
    getId("txtEmail").value = response[4];
    $("#hdnUserId").val(response[5]);
       
}
function SaveUser()
{
    var username = getId("txtUsername").value;
    var nombre =getId("txtNombre").value;
    var apellido = getId("txtApellido").value;
    var email = getId("txtEmail").value;
    var uId = getId("hdnUserId").value;
    x_SaveUser(username,nombre,apellido,email,uId,SaveUser_callback);
        
}
function SaveUser_callback(response)
{
    if(response)
    {
        humane.success("Se ha guardado el usuario correctamente.");
        ClosePopin();
        x_LoadUsers(LoadUsers_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar el usuario.");
        SendJsError(new Error("Error SaveUser-users.js"),"users.js",response);
    }
    ClosePopin();
}
function Cancel()
{
    getId("txtUsername").value = "";
    getId("txtNombre").value = "";
    getId("txtApellido").value = "";
    getId("txtEmail").value = "";
    getId("txtPassword").value = "";
    getId("txtConfirmPassword").value = "";
    ClosePopin();
}
function DeleteUser(userId)
{
    
    smoke.confirm('Esta seguro que quiere borrar este usuario?',function(e){
        if (e){
            x_DeleteUser(userId,DeleteUser_callback);
           
        }
    });
}
function DeleteUser_callback(response)
{
        
    if(response)
    {
        humane.success("Se ha eliminado el usuario correctamente.");
        ClosePopin();
        x_LoadUsers(LoadUsers_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar el usuario.");
        SendJsError(new Error("Error DeleteUser-users.js"),"users.js",response);
    }
    ClosePopin();
}
