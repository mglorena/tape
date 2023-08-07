function Point(x, y) {
    this.X = x;
    this.Y = y;
}
function ClearChildrens(DivId) {
    if (DivId == null) DivId = "";
    var divPopin = getId("BodyPopin" + DivId);
    if (divPopin) {
        var ch = divPopin.childNodes;
        for (var i = 0; i < ch.length; i++) {
            if (ch[i].nodeName == "DIV")
                ch[i].style.display = "none";
        }
    }
}

function GetClickCoordinates(event, iClientX, iClientY) {
    var ClickX = 0;
    var ClickY = 0;
    if (document.all) {
        if (event != null) {
            ClickX = event.clientX;
            ClickY = event.clientY;
        }
        else {
            ClickX = iClientX;
            ClickY = iClientY;
        }

        if (window.pageYOffset) {
            ClickY = ClickY + window.pageYOffset;
            ClickX = ClickX + window.pageXOffset;
        }
        else {
            ClickY = ClickY + Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            ClickX = ClickX + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
        }
    }
    else {
        var ev = event || window.event;
        if (event != null) {
            ClickX = ev.pageX;
            ClickY = ev.pageY;  //+ Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        }
    }
    var oPair = new Point(ClickX, ClickY);
    return oPair;
}
function Popin(event, DivId,iPos, iClientX, iClientY, opMulti) {
   
    var divPopinId = DivId;
    if (opMulti == null) divPopinId = "";
    ClosePopin(divPopinId);
    ClearChildrens(divPopinId);
    DisplayPopin(event, DivId, iPos, iClientX, iClientY, divPopinId);
    if (getId("BodyPopin" + divPopinId)) getId("BodyPopin" + divPopinId).appendChild(getId(DivId));
}
function DisplayPopin(event, DivId, iPos, iClientX, iClientY, divPopinId) { 
    var ptClick = new Point(0, 0);
    //var IE = document.all ? true : false;                
    if (iClientX && iClientY) {
        ptClick.X = iClientX;
        ptClick.Y = iClientY;
    }
    else {
        if (event != null) {
            ptClick = GetClickCoordinates(event, iClientX, iClientY);
            //margenes            
            var sup = ptClick.Y - window.pageYOffset;
            var inf = window.innerHeight - sup;
            var der = ptClick.X - window.pageXOffset;
            var izq = window.innerWidth - der;
        }
    }
    if (ptClick.X < 0) ptClick.X = 0;
    if (ptClick.Y < 0) ptClick.Y = 0;
    var dvData = getId(DivId);
    var iWidthPopin;
    var iHeightPopIn;
    if (dvData) {
        dvData.style.display = 'block';
        //recuperamos el tamaño del div popin
        iWidthPopin = dvData.offsetWidth; // parseInt(getId(DivId).style.width.replace('px',''));        
        iHeightPopIn = dvData.offsetHeight;  //  parseInt(getId(DivId).style.height.replace('px', ''));
        dvData.style.display = 'none';
    }
    var i = 63;
    var alt;
    var down = 0;
    
    Pos = iPos;
    CreatePopIn(Pos, divPopinId);
    
    if (getId('popin' + divPopinId)) {
        var dvPopin = getId('popin' + divPopinId);
        dvPopin.style.width = (iWidthPopin + 20) + 'px';
    }

    
    var winH = $(window).height();
    var winW = $(window).width();
    if (browser.isCH) {
        dvPopin.style.top = document.body.scrollTop + "px";
        dvPopin.style.left = winW / 2 - $("#" + dvPopin.id).width() / 2 + ("px");
    }
    else {
        dvPopin.style.top = document.documentElement.scrollTop + "px";
        dvPopin.style.left = winW / 2 - $("#" + dvPopin.id).width() / 2 + ("px");
    }
    dvData.style.display = "block";
    dvPopin.style.display = "block";
    return;
}
function Browser() {
    var ua, s, c, i;
    this.isIE = false;
    this.isNS = false;
    this.isCH = false;
    this.version = null;

    ua = navigator.userAgent;
    s = "MSIE";
    if ((i = ua.indexOf(s)) >= 0) {
        this.isIE = true;
        this.version = parseFloat(ua.substr(i + s.length));
        return;
    }

    s = "Netscape6/";
    if ((i = ua.indexOf(s)) >= 0) {
        this.isNS = true;
        this.version = parseFloat(ua.substr(i + s.length));
        return;
    }

    // Treat any other "Gecko" browser as NS 6.1.

    s = "Gecko"; c = "Chrome";
    var j;
    if ((i = ua.indexOf(s)) >= 0 && (j = ua.indexOf(c)) >= 0) {
        this.isCH = true;
        this.isNS = true;
        this.version = parseFloat(ua.substr(j + s.length)); ;
        return;
    }
    s = "Gecko";
    if ((i = ua.indexOf(s)) >= 0) {
        this.isNS = true;
        this.version = 6.1;
        return;
    }
}
var browser = new Browser();
var dragObj = new Object();
dragObj.zIndex = 0;
function dragStart(event, id) {
    var el;
    var x, y;
    if (id)
        dragObj.elNode = document.getElementById(id);
    else {
        if (browser.isIE)
            dragObj.elNode = window.event.srcElement;
        if (browser.isNS)
            dragObj.elNode = event.target;
        if (dragObj.elNode.nodeType == 3)
            dragObj.elNode = dragObj.elNode.parentNode;
    }
    if (browser.isIE) {
        x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
        y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
    }
    if (browser.isNS) {
        x = event.clientX + window.scrollX;
        y = event.clientY + window.scrollY;
    }
    dragObj.cursorStartX = x;
    dragObj.cursorStartY = y;
    dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
    dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
    if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
    if (isNaN(dragObj.elStartTop)) dragObj.elStartTop = 0;
    dragObj.elNode.style.zIndex = ++dragObj.zIndex;
    if (browser.isIE) {
        document.attachEvent("onmousemove", dragGo);
        document.attachEvent("onmouseup", dragStop);
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
    if (browser.isNS) {
        document.addEventListener("mousemove", dragGo, true);
        document.addEventListener("mouseup", dragStop, true);
        event.preventDefault();
    }
}
function dragGo(event) {

    var x, y;
    if (browser.isIE) {
        x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
        y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
    }
    if (browser.isNS) {
        x = event.clientX + window.scrollX;
        y = event.clientY + window.scrollY;
    }
    dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
    dragObj.elNode.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";

    if (browser.isIE) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
    if (browser.isNS)
        event.preventDefault();
}

function dragStop(event) {
    dragObj.elNode = null;
    if (browser.isIE) {
        document.detachEvent("onmousemove", dragGo);
        document.detachEvent("onmouseup", dragStop);
    }
    if (browser.isNS) {
        document.removeEventListener("mousemove", dragGo, true);
        document.removeEventListener("mouseup", dragStop, true);
    }
}
function CreatePopIn(iPosition, DivId) {
    var dvPopIn = getId('popin' + DivId);
    var sPopDiv = document.createElement('div');
    sPopDiv.id = 'popin' + DivId;
    sPopDiv.className = 'Popin';
    var sDiv = new String();
    sDiv += "<table cellspacing='0' cellpadding='0' border='0' style='background-color:Transparent'>";
    /// top bar
    sDiv += "<tr>";
    sDiv += "<td class='tabThinHeight'>";
    sDiv += "</td>";
    sDiv += "<td valign='bottom' class='tabThinHeight'>";
    if (iPosition == 1) {
        sDiv += "<div id='Div1' class='BorderDvSup' style='float:left; height:28px' valign='bottom' onclick=\"ClosePopin('"+DivId+"');\"></div>";
        sDiv += "<div id='Div2' style='float:left'><img id='Image2' src='" + _WebSitePath + "images/ArrowUp.png' /></div>";
        sDiv += "<div id='Div3' class='BorderDvSup' style='float:left;  height:28px' onclick='ClosePopin();'>&nbsp;</div>";
    }
    else {
        sDiv += "<div id='Div1' class='BorderDvSup' style='float:left; height:28px; width:100%' valign='bottom' onclick=\"ClosePopin('" + DivId + "');\">&nbsp;</div>";
    }

    sDiv += "</td>";
    sDiv += "<td class='tabThinHeight'>";
    sDiv += "</td>";
    sDiv += "</tr>";
    sDiv += "<tr>";
    sDiv += "<td class='BorderLeftPopin'>&nbsp;</td>";
    if (iPosition != 5) {
        sDiv += "<td id='tdTopBar' style='text-align:right; background-color:#FFFFFF; padding:4px'>";
        sDiv += "<img ID='Image1' src='" + _WebSitePath + "images/CloseSmallOn.png' onclick=\"javascript:ClosePopin('" + DivId + "');\" alt='Close' />";
        sDiv += "</td>";
    }
    else {
        sDiv += "<td id='tdTopBarMove' onmousedown=\"dragStart(event, 'popin" + DivId + "');\" style='cursor: move;text-align:right;'>";
        var title = (typeof titlePopin != "undefined") ? titlePopin : "&nbsp;";
        title += "<span id=\"spanTitlePopin\"></span>";
        sDiv += "<table cellpadding='0' cellspacing='0' style='border-bottom:solid 4px white;width:100%;padding:3px; background-color:#969696; '><tr><td style='cursor:move;text-align:left;color:white'>" + title + "</td><td style='width:13px;cursor:pointer;'><img ID='Image1' src='" + _WebSitePath + "images/CloseSmallOn.png' onclick=\"javascript:ClosePopin('" + DivId + "');\" alt='Close' /></td></table>";
        sDiv += "</td>";
    }
    sDiv += "<td class='BorderRightPopin'>&nbsp;</td>";
    sDiv += "</tr>";
    /// middle bar
    sDiv += "<tr>";
    if (iPosition == 4) {
        sDiv += "<td class='tabThinWidth'>";
        sDiv += "<div id='Div4' class='BorderLeftPopin' onclick=\"ClosePopin('" + DivId + "');\">&nbsp;</div>";
        sDiv += "<div id='Div5'><img ID='Image4' src='" + _WebSitePath + "images/ArrowLeft.png' /></div>";
        sDiv += "<div id='Div6' class='BorderLeftPopin' onclick=\"ClosePopin('" + DivId + "');\">&nbsp;</div>";
    }
    else {
        sDiv += "<td class='BorderLeftPopin'>&nbsp;";
    }
    sDiv += "</td>";
    sDiv += "<td style='background-color:white'>";
    sDiv += "<div id='BodyPopin" + DivId + "' class='BodyPopin'></div>";
    sDiv += "</td>";
    sDiv += "<td class='BorderRightPopin tabThinWidth' onclick=\"ClosePopin('" + DivId + "');\">"; 
    //right side
    if (iPosition == 2) {
        sDiv += "<div id='Div7'>&nbsp;</div>";
        sDiv += "<div id='Div8'><img ID='Image6' src='" + _WebSitePath + "images/ArrowCorner.png' /></div>";
        sDiv += "<div id='Div9' onclick=\"ClosePopin('" + DivId + "');\">&nbsp;</div>";
    }
    else {
        sDiv += "<div id='Div7' style='width:100%'>&nbsp;</div>";
    }
    sDiv += "</td>";
    sDiv += "</tr>";
    /// bottom bar
    sDiv += "<tr>";
    sDiv += "<td class='tabThinHeight'>";
    sDiv += "</td>";
    sDiv += "<td  style='vertical-align: sub;  background-color:Transparent;'  class='BorderBottomPopin tabThinHeight'>";
    if (iPosition == 3) {
        sDiv += "<div id='Div10' style='float:left;' onclick=\"ClosePopin('" + DivId + "');\">&nbsp;</div>";
        sDiv += "<div id='Div11' style='float:left;'><img ID='Image5' src='" + _WebSitePath + "images/ArrowDown.png' /></div>";
        sDiv += "<div id='Div12' style='float:left;' onclick=\"ClosePopin('" + DivId + "');\">&nbsp;</div>";
    }
    else {
        sDiv += "<div id='Div10' style='float:left; width:100%; background-color:Transparent;' onclick=\"ClosePopin('" + DivId + "');\"></div>";
    }
    sDiv += "</td>";
    sDiv += "<td class='BorderBottomRightPopin tabThinHeight'>&nbsp;";
    sDiv += "</td>";
    sDiv += "</tr>";
    sDiv += "</table>";
    sPopDiv.innerHTML = sDiv;
    document.body.appendChild(sPopDiv);
    $("#popin" + DivId).css("z-index", "6000");
}
function ClosePopin(DivId) {
    try {
        if (DivId == null || typeof DivId == "undefined") DivId = "";
        if (!getId("BodyPopin" + DivId)) DivId = "";
        var divBodyPopin = getId("BodyPopin" + DivId);
        if (divBodyPopin) {
            var ch = divBodyPopin.childNodes;
            for (var i = 0; i < ch.length; i++) {
                ch[i].style.display = "none";
                document.body.appendChild(ch[i]);
            }
            document.body.removeChild(getId('popin'+ DivId));
        }
        
    } catch (e) { }
    try {  ResetPopin();} catch (e) { }

}
function CloseShowAlert() {
    getId('dvShowAlert').style.display = 'none';
    document.body.style.overflow = 'auto';
    getId('dvBG1').style.display = 'none';
}
function ShowAlert(sMessage, sType, sMethodOnClose) {// W:Warning, E:Error, I:Information        
    try {
        if (getId('dvShowAlert')) {
            getId('dvAlertMessage').innerHTML = sMessage;
            getId('dvShowAlert').style.display = 'inline';
            getId('dvBG1').style.display = 'inline';
            var sAlertClass = "alertIconInfo";
            if (sType) {
                switch (sType.toUpperCase()) {
                    case "I": sAlertClass = "alertIconInfo"; break;
                    case "W": sAlertClass = "alertIconWarning"; break;
                    case "E": sAlertClass = "alertIconError"; try { HideProcessing(); } catch (e) { }; break;
                    default: sAlertClass = "alertIconInfo"; break;
                }
            }
            try { getId('tdType').className = sAlertClass; } catch (e) { }
        }
        else {
            sMethodOnClose = (sMethodOnClose != null) ? sMethodOnClose + '();' : '';
            var dvAlert = document.createElement('div');
            dvAlert.style.position = 'fixed';
            dvAlert.style.padding = '4px';
            dvAlert.id = 'dvShowAlert';
            //writeLog('_iBrowserHeight: ' + _iBrowserHeight);
            dvAlert.style.top = Math.round(((_iBrowserHeight - 230) / 2)) + 'px';
            dvAlert.style.left = Math.round((_iBrowserWidth / 2) - 150) + 'px';
            dvAlert.style.zIndex = '10000';
            var sCade = new String();
            sCade += "<table border='0' cellpadding='0' cellspacing='0' width='300px'><tr><td></td><td>&nbsp;</td><td></td>";
            sCade += "<tr><td></td><td>";
            //table center
            sCade += "<table cellpadding='2' cellspacing='0' border='0' width='100%' class='Information'>";
            sCade += "<tr>";
            sCade += "<td  class=\"popinHead\" colspan='3'>Smart Compliance Alert</td>";
            sCade += "<td class=\"popinHead\" style='width:10px; text-align:right;'>";
            sCade += "    <img alt='Close' src='" + _WebSitePath + "/Images/CloseSmallOn.png' onclick='CloseShowAlert();" + sMethodOnClose + "' style=\"cursor:pointer; cursor:hand\" />";
            sCade += "</td>\n";
            sCade += "</tr>";
            sCade += "<tr><td style='width:22px;'>&nbsp;</td><td style='width:22px;'></td><td></td><td></td></tr>";
            sCade += "<tr>";
            var sAlertClass = "alertIconInfo";
            if (sType) {
                switch (sType.toUpperCase()) {
                    case "I": sAlertClass = "alertIconInfo"; break;
                    case "W": sAlertClass = "alertIconWarning"; break;
                    case "E": sAlertClass = "alertIconError"; try { HideProcessing(); } catch (e) { }; break;
                    default: sAlertClass = "alertIconInfo"; break;
                }
            }
            sCade += "    <td id='tdType' style='width:44px; height:38px; text-align:center; padding-left:5px; padding-top:5px' class='" + sAlertClass + "'>";
            sCade += "    </td>";
            sCade += "    <td style='padding:5px' colspan='3'>";
            sCade += "        <div id='dvAlertMessage' style='padding:5px; font-size:12px' >" + sMessage;
            sCade += "        </div>";
            sCade += "    </td>";
            sCade += "</tr>";

            sCade += "<tr>";
            sCade += "<td align='center' style='text-align:center; padding:5px' colspan='4'>";
                        
            sCade += "<button type='button' id='popInBtnOk' class='clientButton' onclick='CloseShowAlert();" + sMethodOnClose + "'><span>OK</span></button>";            
            //sCade += "  <input type='button' value='OK' onclick='' />";
            sCade += "</td>";
            sCade += "</tr>";
            sCade += "</table>";
            //close container
            sCade += "</td><td class='BorderRightPopin'>&nbsp;</td>";
            sCade += "<tr><td></td><td class='BorderBottomPopin'>&nbsp;</td><td class='BorderBottomRightPopin'></td>";
            sCade += "</table>";

            dvAlert.innerHTML = sCade;

            var dvBG = document.createElement('div');
            dvBG.style.position = 'absolute';
            //     dvBG.setAttribute('onclick', 'CloseShowAlert()');

            dvBG.style.padding = '4px';
            dvBG.className = 'modalBackground';
            dvBG.id = 'dvBG1';
            dvBG.style.display = 'block';
            dvBG.style.width = ($(document).width() - 15) + 'px';  //document.documentElement.clientWidth || document.body.clientWidth;
            dvBG.style.height = ($(document).height() - 20) + 'px';  //document.documentElement.clientHeight || document.body.clientHeight; // Math.round(getDocHeight()) - 10 + 'px';                    
            dvBG.style.top = '0px';
            dvBG.style.left = '0px';
            dvBG.style.bottom = '0px';
            dvBG.style.right = '0px';
            dvBG.setAttribute("bottom", "1px");
            document.body.appendChild(dvBG);
            document.body.appendChild(dvAlert);
        }
        getId('popInBtnOk').focus();
    }
    catch (e) { LogJsError(e, "PopinFunctions.js - ShowAlert"); }
}
function BigPopin(sDivId) {// W:Warning, E:Error, I:Information
    try {
        var dvShowed = getId(sDivId);
        dvShowed.style.display = 'block';
        var dvContainer = document.createElement('div');
        dvContainer.id = 'dvBigPopIn';
        var iHeight = dvShowed.style.height ? dvShowed.style.height.replace('px', '') : dvShowed.offsetHeight; //$("#" + sDivId).height();
        var iWidth = dvShowed.style.width ? dvShowed.style.width.replace('px', '') : dvShowed.offsetWidth; //$("#" + sDivId).width();
        var iLeft = (_iBrowserWidth / 2) - (iWidth / 2);
        var iTop = (_iBrowserHeight / 2) - (iHeight / 2);
        iTop = iTop < 40 ? 100 : iTop;
        iTop += document.documentElement.scrollTop;
        iLeft = iLeft < 20 ? 100 : iLeft;

        dvContainer.appendChild(dvShowed);

        //shadow table
        var tabShadow = document.createElement('table');
        tabShadow.cellPadding = 0;
        tabShadow.cellSpacing = 0;
        tabShadow.id = 'tbBigPoPin';
        tabShadow.border = 0;
        tabShadow.style.position = 'absolute';
        tabShadow.style.top = iTop + 'px';
        tabShadow.style.left = iLeft + 'px';
        tabShadow.style.zIndex = '1001';
        //tabShadow.style.borderLeft = 'solid 1px #818181';

        //row 1
        var row1 = tabShadow.insertRow(0); //row 1
        var tbCellTop = row1.insertCell(0);
        tbCellTop.className = 'BorderTopPopin bgWhite LeftLinePopin';
        tbCellTop.innerHTML = '&nbsp;';
        tbCellTop.textAlign = 'right';
        tbCellTop.style.paddingRight = '4px';
        tbCellTop.style.paddingTop = '2px';
        var imgClose = document.createElement('img');
        imgClose.src = _WebSitePath + 'Images/CloseSmallOn.png';
        imgClose.title = 'Close';
        imgClose.setAttribute('onclick', 'javascript:CloseBigPopIn()');
        imgClose.align = 'right';
        tbCellTop.appendChild(imgClose);

        var tbCellClose = row1.insertCell(1);
        tbCellClose.padding = '3px';
        tbCellClose.className = 'BorderRightPopin';
        tbCellClose.innerHTML = '&nbsp;';


        //row 2
        var row2 = tabShadow.insertRow(1); //row 2
        var tbCellContent = row2.insertCell(0);
        tbCellContent.className = 'bgWhite LeftLinePopin';
        tbCellContent.appendChild(dvContainer);
        var tbCellShadowRight = row2.insertCell(1);
        tbCellShadowRight.className = 'BorderRightPopin';
        tbCellShadowRight.innerHTML = '&nbsp;';

        //row 3
        var row3 = tabShadow.insertRow(2);
        var tbCellBottom = row3.insertCell(0);
        tbCellBottom.className = 'BorderBottomPopin LeftLinePopin';
        tbCellBottom.innerHTML = '&nbsp;';
        var tbCellCorner = row3.insertCell(1);
        tbCellCorner.className = 'BorderBottomRightPopin';
        tbCellCorner.innerHTML = '&nbsp;';


        var dvBG = document.createElement('div');
        dvBG.style.position = 'absolute';
        //dvBG.setAttribute('onclick', 'CloseShowAlert()');
        dvBG.style.padding = '4px';
        dvBG.className = 'modalBackground';
        dvBG.id = 'dvBG2';
        dvBG.style.display = 'block';
        dvBG.style.textAlign = 'center';
        dvBG.style.horizontalAlign = 'middle';
        dvBG.style.width = ($(document).width() - 15) + 'px';  //document.documentElement.clientWidth || document.body.clientWidth;
        dvBG.style.height = ($(document).height() - 20) + 'px';  //document.documentElement.clientHeight || document.body.clientHeight; // Math.round(getDocHeight()) - 10 + 'px';
        dvBG.style.top = '0px';
        dvBG.style.left = '0px';
        dvBG.style.bottom = '0px';
        dvBG.style.right = '0px';
        document.body.appendChild(dvBG);
        //ShowShadowTable();
        //getId('tdShadowTable').appendChild(tabShadow);
        document.body.appendChild(tabShadow);
    }
    catch (e) {
        //    writeLog(e.message);  
    }
}

function CloseBigPopIn() {
    try {
        if (getId('dvBigPopIn')) {
            var dvContainer = getId('dvBigPopIn');
            var dvToHide = dvContainer.firstChild;
            var dvBg = getId('dvBG2');
            dvToHide.style.display = 'none';
            document.body.appendChild(dvToHide);
            document.body.removeChild(getId('tbBigPoPin'));
            document.body.removeChild(dvBg);
        }
    } catch (e) {
        LogJsError(e, 'PopinFunctions.js - CloseBigPopIn');
    }
}



function ShowShadowTable(Element) {
    var sCade = new String();
    sCade = "<table border='0' cellpadding='0' cellspacing='0'><tr><td></td><td>&nbsp;</td><td></td>";
    sCade += "<tr><td></td><td id='tdShadowTable'>";
    sCade += "</td><td class='BorderRightPopin'>&nbsp;</td>";
    sCade += "<tr><td></td><td class='BorderBottomPopin'>&nbsp;</td><td class='BorderBottomRightPopin'></td>";
    sCade += "</table>";
    var aTab = document.createElement('div');
    aTab.innerHTML = sCade;

    document.body.appendChild(aTab);

    //
}

var oTimerMesj;

function ShowMessage(msj) {
    var dvMes = getId("dvMessage");
    if (dvMes) {
        dvMes.innerHTML = msj;
        dvMes.style.display = 'inline';
        dvMes.style.opacity = "1";
        $("#dvMessage").fadeOut(7000);
    }
}


function HighlightPopIn(divId) {
    try {
        var dvResalt = getId(divId);
        dvResalt.className = dvResalt.className + " resaltPopIn";
        setTimeout(function delegate() { dvResalt.className = dvResalt.className.replace(" resaltPopIn", ""); }, 30);
    } catch (e) {
        LogJsError(e, 'PopinFunctions.js - HighlightPopIn');
    }
}


function getDocHeight() {
    var D = document;
    return Math.max(Math.max(D.body.scrollHeight, D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight));
}

function ShowDisconnectAlert() {
    var logDiv = document.createElement("div");
    var dvMess = document.createElement('div');
    dvMess.innerHTML = "You seem to have lost connection to the site";
    dvMess.id = "dvAlertMess";
    //dvMess.setAttribute('style', 'width:280px; text-align:left; float:left;');
    with (logDiv) {
        id = "dvAlert";
        className = 'DisconnectAlert';
        style.height = '30px';
        appendChild(dvMess);
    }            
    document.body.appendChild(logDiv);
}

function ShowProcessing(sText) {
    try {
        document.documentElement.style.cursor = 'wait';

        if (getId("dvProcessing")) {
            getId("dvProcessingMess").innerHTML = sText;
            getId("dvProcessing").style.display = "inline";
        } else {
            var logDiv = document.createElement("div");
            var dvMess = document.createElement('div');
            dvMess.innerHTML = sText;
            dvMess.id = "dvProcessingMess";
            dvMess.setAttribute('style', 'width:280px; text-align:left; float:left;');
            with (logDiv) {
                id = "dvProcessing";
                className = 'ProcessingInfo';
                style.height = '30px';
                appendChild(dvMess);
            }
            var dvSep = document.createElement('div');
            dvSep.align = 'right';
            dvSep.setAttribute('style', 'text-align:right; float:right;');
            var lnkCancel = document.createElement('a');
            lnkCancel.href = 'javascript:CancelRequest()';
            lnkCancel.innerHTML = 'Cancel';
            lnkCancel.title = 'Stop request';
            dvSep.appendChild(lnkCancel);
            logDiv.appendChild(dvSep);
            document.body.appendChild(logDiv);
        }
    } catch (e) {
    }
}

function CancelRequest() {
    try {
        var dvMsg = getId("dvProcessing");
        dvMsg.className = 'ProcessCancel';
        dvMsg.innerHTML = 'Request Canceled !!!';
        AjaxPro.queue.abort();
        setTimeout('HideProcessing()', 1000);
    }
    catch (e) { ShowAlert('Error canceling ') }
}


function HideProcessing() {
    document.documentElement.style.cursor = 'default';
    var dvProcessing = getId("dvProcessing");
    if (dvProcessing) {
        document.body.removeChild(dvProcessing);
    }
}


function writeLog(sText) {
    if (getId('dvLog')) {
        getId('dvLog').innerHTML += sText + '<br>';
    }
    else {
        var logDiv = document.createElement('div');
        logDiv.className = 'logDiv';
        logDiv.id = 'dvLog';
        logDiv.innerHTML = sText + '<br>';
        logDiv.setAttribute('onclick', 'javascript:document.documentElement.removeChild(this)');
        document.documentElement.appendChild(logDiv);
    }
}


function CancelEvent(event) {
    if (document.all)
        event.cancelBubble = true;
    else
        event.stopPropagation();
}



function getElemPos(elem) {
    var ptPosition = new Point();
    var inputObj = elem;
    var returnValue = inputObj.offsetTop + inputObj.offsetHeight;
    while ((inputObj = inputObj.offsetParent) != null) {
        returnValue += inputObj.offsetTop - inputObj.scrollTop;      
    }
    var scrollT = $('body').scrollTop();//for chrome and safari 
    ptPosition.Y = returnValue + scrollT;
    inputObj = elem; //reset var
    returnValue = inputObj.offsetLeft;
    while ((inputObj = inputObj.offsetParent) != null) returnValue += inputObj.offsetLeft - inputObj.scrollLeft;
    ptPosition.X = returnValue;

    return ptPosition;
}


function OpenValidator(elem, sMessage) {
    try { 
        $(elem).after("<div id=\"" + elem.id + "-dvVal\" class=\"validatorCallout\" onclick=\"$(this).remove()\">" + sMessage + "</div>");
    } catch (e) { LogJsError(e, 'PopinFunctions.js - OpenValidator'); }
}
function OpenValidatorJ(jElem, sMessage) {
    try {
        jElem.after("<div id=\"" + jElem.attr('id') + "-dvVal\" class=\"validatorCallout\" onclick=\"$(this).remove()\">" + sMessage + "</div>");
        return false;
    } catch (e) { LogJsError(e, 'PopinFunctions.js - OpenValidator'); }
}

    
    