/*String.js*/
function trimL(sString) {
    if (typeof sString != "string") { return sString; }
    return sString.replace(/^\s+/, "");
} function trimR(sString) {
    if (typeof sString != "string") { return sString; }
    return sString.replace(/\s+$/, "");
} function trim(sString) {
    if (typeof sString != "string") { return sString; }
    return trimR(trimL(sString));
} function trimNew(sString) {
    return trim(sString)
}
function convertMoney(num) {
    num = String(num);
    return "$" + currency(num);
}
function OnblurCurr(elem) {
    if (elem.value != null && elem.value != "" && typeof elem.value != "undefined")
        elem.value = convertCurr(elem.value);

}
function convertCurr(value) {
    var newvalue = "0";
    if (value != null && value != "" && typeof value != "undefined") {
        var num = value.toString().trim().replace(/\s/g, "").replace(/,/g, "");        
        newvalue = isNaN(num) ? value : currency(value);        
    }
    return newvalue;
}
function currency(num) {
    num = num.toString().trim().replace(/\s/g, "").replace(/,/g, "");
    if (num === '')
        return;
    // if the number is valid use it, otherwise clean it
    if (isNaN(num))
        num = '0';
    // evalutate number input
    var numParts = String(num).split('.');
    var isPositive = (num == Math.abs(num));
    var hasDecimals = (numParts.length > 1);
    var decimals = (hasDecimals ? numParts[1].toString() : '0');
    var originalDecimals = decimals;

    // format number
    num = Math.abs(numParts[0]);
    num = isNaN(num) ? "0" : num;
    num = String(num);

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }
    return num;
}

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}

String.prototype.ToFileName = function() {
    var regex = new RegExp('[^a-zA-Z0-9.-]+', 'g');
    return regex.test(this) ? this.replace(regex, '_') : this.toString();
}

function ArrayFindAll(list, condition) {
    var listr = new Array();
    for (var i = 0; i < list.length; i++) {
        if (eval("list[i]" + condition)) {
            listr.push(list[i]);
        }
    }
    return listr;
}

function isNull(sValue) {
    if (sValue == null)
        return '';
    else
        return sValue;
}

function getIndexDdl(ddl, text) {
    try {
        var index = -1;
        for (i = 0; i < ddl.options.length; i++) {
            if (ddl.options[i].text == text) {
                index = i;
            }
        }
        return index;
    } catch (e) { LogJsError(e, "js_functions.js - getIndexDdl"); }
}

function getIndexDdlByValue(ddl, value) {
    try {
        var index;
        for (i = 0; i < ddl.options.length; i++) {
            if (ddl.options[i].value == value) {
                index = i;
                break;
            }
        }
        return index;
    } catch (e) { LogJsError(e, "js_functions.js - getIndexDdlByValue"); }
}
function selectDdlByValue(ddl, value) {
    $(ddl).val(value);
}
function selectDdlByValueFilter(ddl, value, pos, sep) {
    try {
        for (i = 0; i < ddl.options.length; i++) {
            var valueD = ddl.options[i].value.split(sep)[pos];
            if (valueD == value) {
                ddl.selectedIndex = i;
                return;
            }
        }
    } catch (e) { LogJsError(e, "js_functions.js - selectDdlByValue"); }
}
function selectDdlByText(ddl, text) {
    try {
        var index;
        for (i = 0; i < ddl.options.length; i++) {
            if (ddl.options[i].text == text) {
                index = i;
                break;
            }
        }
        ddl.selectedIndex = index;
    } catch (e) { LogJsError(e, "js_functions.js - selectDdlByText"); }
}
function ddlTextByVal(ddl, value) {
    try {
        var text = "";
        for (i = 0; i < ddl.options.length; i++) {
            if (ddl.options[i].value == value) {
                text = ddl.options[i].text;
                break;
            }
        }
        return text;
    }
    catch (e) { LogJsError(e, "js_functions.js - ddlTextByVal"); }
}
function ddlTextByIndex(ddl, index) {
    try {
        return ddl.options[index].text;
    } catch (e) { LogJsError(e, "js_functions.js - ddlTextByIndex"); }
}

function GetTypeDate(dateValue) {
    try {
        if (dateValue === "" || dateValue == null) return null;
         else return new Date(dateValue);
    } catch (e) { LogJsError(e, "js_functions.js - GetTypeDate <br/> <b>Date :</b>" + dateValue); }
}


/***************** Generic Functions **************/
//return true if a script is already loaded in the page

function IsLoadedScript(sFileName) {
    var head = document.getElementsByTagName("head")[0];
    var LoadedScripts = head.getElementsByTagName("script");
    var sCade = new String;
    for (var i = 0; i < LoadedScripts.length; i++) {
        if (LoadedScripts[i].src.indexOf(sFileName) >= 0)
            return true;
    }
    return false;
}

function LoadScriptReference(sFileName) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src += sFileName;
    head.appendChild(script);
}


function Include(sScriptName) {
    var sFileName = sScriptName.replace("..", "") + '?v=' + scVersion;
    if (!IsLoadedScript(sFileName)) {
        LoadScriptReference(sScriptName + '?v=' + scVersion);
    }
}

Array.prototype.Contains = function(pObject) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === pObject) { return true; }
    } return false;
}


function AnimationDiv(divId, iFactor, iMaxHeight, iMinHeight) {
    try {
        var dv = getId(divId);
        if (!dv) return;
        if (!iMinHeight) iMinHeight = 10;
        var iHeight = parseInt(dv.offsetHeight != 0 ? dv.offsetHeight : dv.style.height.replace('px', ''), 10);  //parseInt(dv.style.offsetHeight.replace('px', ''), 10);            
        if ((iHeight > iMinHeight && iFactor == -1) || (iHeight < iMaxHeight && iFactor == 1)) {
            iHeight += parseInt((10 * iFactor), 10);
            dv.style.height = iHeight + 'px';
            setTimeout(function delegate() { AnimationDiv(divId, iFactor, iMaxHeight, iMinHeight); }, 2);
        }
        else {
            if (iFactor == 1) {
                dv.style.display = 'block';
            }
            else {

                dv.style.display = iMinHeight == 10 ? 'none' : 'block';
                dv.style.height = iMinHeight + 'px';
            }
            return;
        }
        try { eval(allFunc); } catch (e) { }
    }
    catch (e) {
        LogJsError(e, 'js_functions - AnimationDiv');
        ShowAlert(e.message, 'e');
    }
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString() + ";path=/");
}

function getCookie(c_name) {
    var c_start;
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return null;
}

//function GetDdlSelected(sDdlId) {
//    try {
//        var ddl = getId(sDdlId);
//        if (ddl) {
//            var value = ddl.options[ddl.selectedIndex].value;
//            var index = ddl.selectedIndex;
//            if (index == -1 || value == 0) return null;
//            return ddl.options[ddl.selectedIndex].value;
//        }
//        else
//            return null;
//    }
//    catch (e) { return null; }
//}

function SetSelected(sSelectId, sSelectedValue) {
    $("#" + sSelectId).val(sSelectedValue);   
}

function GetMultipleChecked(dvId) {
    var selected = "";
    var sep = "";
    try {
        var checks = getId(dvId).getElementsByTagName('input');
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].type == 'checkbox') {
                if (checks[i].checked) {
                    try {
                        if (!isNaN(checks[i].value)) {
                            selected += sep + checks[i].value;
                            sep = ",";
                        }
                    } catch (e) { }
                }
            }
        }
    }
    catch (e) { }
    return selected;
}



function CleanDivForm(dvId) {
    var tblPageTypes = getId(dvId);
    var inputs = tblPageTypes.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text" || inputs[i].type == "hidden")
            inputs[i].value = '';
        if (inputs[i].type == "checkbox" || inputs[i].type == "radio")
            inputs[i].checked = false;
    }
    var selects = tblPageTypes.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].selectedIndex = 0;
    }
    var txareas = tblPageTypes.getElementsByTagName('textarea');
    for (var i = 0; i < txareas.length; i++) {
        txareas[i].value = '';
    }
}

function ClearControlChilds(ctrlId) {
    var ctrl = getId(ctrlId);
    var childs = ctrl.childNodes;
    var i = ctrl.length;
    while (ctrl.childNodes.length > 0) {
        ctrl.removeChild(childs[ctrl.childNodes.length - 1]);
    }
}

//function GetRadioValue(sRadioName) {
//    var aRadios = document.getElementsByName(sRadioName);
//    for (var i = 0; i < aRadios.length; i++) {
//        if (aRadios[i].checked) {
//            return aRadios[i].value;
//        }
//    }
//    return -1;
//}

function CleanTable(sTableId) {
    var tbl = getId(sTableId);
    if (tbl) 
        for (var i = tbl.rows.length - 1; i > 0; i--) 
            tbl.deleteRow(i);
}
function DeleteRow(sTableId, iRowIndex) {
    var tbl = getId(sTableId);
    if (tbl)
        tbl.deleteRow(iRowIndex);
}
function UrlGetParam(Param) {
    var Url = location.href;
//    var Url = new String();
    Url=Url.substring(Url.indexOf("?") + 1, Url.length);
    aUrl = Url.split("&");
    for (var i = 0; i < aUrl.length; i++) {
        var aParam = aUrl[i].split("=");
        if (aParam[0] == Param) return aParam[1];
    }
    return ""; 

}
