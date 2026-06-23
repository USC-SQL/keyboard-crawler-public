/**
 *
 */
/*
 * This code is a modified version of WebDiff2 - Webdriver Version of WebDiff
 * @author: Shauvik Roy Choudhary
 * Modified by: Abdulmajeed Alameer (to capture textual nodes and input text nodes and other functionality)
 * Copyright: Georgia Institute of Technology
 * License: MIT License
 */

/* added "ACRONYM" to ignore tag to fix DMV subject*/

DEBUG = false;
var ignoredTags = [ "AREA", "B", "BLOCKQUOTE","ACRONYM", "BR", "CANVAS", "CENTER", "CSACTIONDICT",
    "CSSCRIPTDICT", "CUFON", "CUFONTEXT", "DD", "EM", "EMBED", "FIELDSET", "FONT",
    "HEAD", "HR", "I", "LABEL", "LEGEND", "LINK", "MAP", "MENUMACHINE",  "META",
    "NOFRAMES", "NOSCRIPT", "OBJECT", "OPTGROUP", "PARAM", "S", "SCRIPT", "SMALL",
    "STRIKE", "STRONG", "STYLE", "TBODY", "TITLE", "TR", "TT", "U", "UL" , "BODY" ];


var textFormattingTags = [ "EM",  "STRONG",  "CODE",  "SAMP",  "KBD",  "VAR", "NOBR", "SPAN",
    "ACRONYM",  "ABBR",  "ADDRESS",  "B",  "BDI",  "BDO",  "BIG",
    "BLOCKQUOTE",  "CENTER",  "CITE",  "CODE",  "DEL",  "DFN", "BR",
    "EM",  "FONT",  "I",  "INS",  "KBD",  "MARK",  "METER", "PRE",
    "PROGRESS", "Q",  "RP", "RT", "RUBY",  "S", "SAMP",  "SMALL",
    "STRIKE", "STRONG", "SUB", "SUP",  "TIME", "TT", "U", "VAR",  "WBR" ];

var containerTags = [ "DD", "DIV", "DT", "P", "TD", "TR" , "FORM", "TABLE", "SPAN",
    "H1", "H2", "H3", "H4", "H5", "H6", "LI", "NAV", "FOOTER", "HEADER",
    "ARTICLE","SECTION", "A", "ASIDE" ];


var FooterTextToLinkRatio = 1.0;


var defaultPaddings = [0,0,0,0];
var defaultBorders = [0,0,0,0];
var defaultMargins = [0,0,0,0];
var defaultSize = {width:0,height:0};

// CLASS MBR
function MBR(type, nodeID, parentID, xpath,isLayout,isVisible,className,paddings,borders,margins,coords,explicitWidth,explicitHeight,isContentBox,textIndent,displayProperty){

    // MBR object properties:
    this.type = type;
    this.nodeID = nodeID;
    this.parentID = parentID;
    this.xpath = xpath;
    this.isLayout = isLayout;
    this.isVisible =  isVisible;
    this.className = className;
    this.paddings = paddings;
    this.borders = borders;
    this.margins = margins;
    this.coords = coords;
    this.explicitWidth = explicitWidth;
    this.explicitHeight = explicitHeight;
    this.textIndent =  typeof(textIndent)==='undefined' ? 0 : textIndent;
    this.isContentBox = typeof(isContentBox)==='undefined' ? true : isContentBox;
    this.displayProperty = typeof(displayProperty)==='undefined' ? "unknown" : displayProperty;
}

// CLASS VE
function VE(type, nodeID, parentID, xpath,isLayout,isVisible,className,paddings,borders,margins,coords,explicitWidth,explicitHeight,isContentBox,textIndent,displayProperty,zindex,opacity,position,bgcolor,willchange,transitionProperty){

    // VE object properties:
    this.type = type;
    this.nodeID = nodeID;
    this.parentID = parentID;
    this.xpath = xpath;
    this.isLayout = isLayout;
    this.isVisible =  isVisible;
    this.className = className;
    this.paddings = paddings;
    this.borders = borders;
    this.margins = margins;
    this.coords = coords;
    this.explicitWidth = explicitWidth;
    this.explicitHeight = explicitHeight;
    this.textIndent =  typeof(textIndent)==='undefined' ? 0 : textIndent;
    this.isContentBox = typeof(isContentBox)==='undefined' ? true : isContentBox;
    this.displayProperty = typeof(displayProperty)==='undefined' ? "unknown" : displayProperty;
    this.zindex = zindex;
    this.opacity = opacity;
    this.position = position;
    this.bgcolor = bgcolor;
    this.willchange = willchange;
    this.transitionProperty = transitionProperty;
}


//defining class HashTable
function HashTable() {
    this.hashes = {},
        this.cacheID = 0;
}

HashTable.prototype = {
    constructor: HashTable,

    put: function( obj, value ) {
        obj.cacheID = this.cacheID;
        this.hashes[ this.cacheID ] = value;
        this.cacheID++;
    },

    get: function( obj ) {
        return this.hashes[ obj.cacheID ];
    }
};
var renderedCache = new HashTable();


/**
 * Code to get absolute coordinates of DOM element
 * @source: http://www.codeproject.com/KB/scripting/dom-element-abs-pos.aspx
 */
//START Absolute position code
function __getIEVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function __getOperaVersion() {
    var rv = 0; // Default value
    if (window.opera) {
        var sver = window.opera.version();
        rv = parseFloat(sver);
    }
    return rv;
}

var __userAgent = navigator.userAgent;
var __isIE =  navigator.appVersion.match(/MSIE/) != null;
var __IEVersion = __getIEVersion();
var __isIENew = __isIE && __IEVersion >= 8;
var __isIEOld = __isIE && !__isIENew;

var __isFireFox = __userAgent.match(/firefox/i) != null;
var __isFireFoxOld = __isFireFox && ((__userAgent.match(/firefox\/2./i) != null) ||
    (__userAgent.match(/firefox\/1./i) != null));
var __isFireFoxNew = __isFireFox && !__isFireFoxOld;

var __isWebKit =  navigator.appVersion.match(/WebKit/) != null;
var __isChrome =  navigator.appVersion.match(/Chrome/) != null;
var __isOpera =  window.opera != null;
var __operaVersion = __getOperaVersion();
var __isOperaOld = __isOpera && (__operaVersion < 10);

function __parseBorderWidth(width) {
    var res = 0;
    if (typeof(width) == "string" && width != null && width != "" ) {
        var p = width.indexOf("px");
        if (p >= 0) {
            res = parseInt(width.substring(0, p));
        }
        else {
            //do not know how to calculate other values
            //(such as 0.5em or 0.1cm) correctly now
            //so just set the width to 1 pixel
            res = 1;
        }
    }
    return res;
}


//returns the absolute position of some element within document
function getElementAbsolutePos(element) {
    var res = {};
    res.x = 0; res.y = 0;
    if (element !== null) {
        if (element.getBoundingClientRect) {
            var viewportElement = document.documentElement;
            var box = element.getBoundingClientRect();
            var scrollLeft = viewportElement.scrollLeft;
            var scrollTop = viewportElement.scrollTop;

            res.x = box.left + scrollLeft;
            res.y = box.top + scrollTop;

        }
        else { //for old browsers
            res.x = element.offsetLeft;
            res.y = element.offsetTop;

            var parentNode = element.parentNode;
            var borderWidth = null;

            while (offsetParent != null) {
                res.x += offsetParent.offsetLeft;
                res.y += offsetParent.offsetTop;

                var parentTagName =
                    offsetParent.tagName.toLowerCase();

                if ((__isIEOld && parentTagName != "table") ||
                    ((__isFireFoxNew || __isChrome) &&
                        parentTagName == "td")) {
                    borderWidth = kGetBorderWidth
                    (offsetParent);
                    res.x += borderWidth.left;
                    res.y += borderWidth.top;
                }

                if (offsetParent != document.body &&
                    offsetParent != document.documentElement) {
                    res.x -= offsetParent.scrollLeft;
                    res.y -= offsetParent.scrollTop;
                }


                //next lines are necessary to fix the problem
                //with offsetParent
                if (!__isIE && !__isOperaOld || __isIENew) {
                    while (offsetParent != parentNode &&
                    parentNode !== null) {
                        res.x -= parentNode.scrollLeft;
                        res.y -= parentNode.scrollTop;
                        if (__isFireFoxOld || __isWebKit)
                        {
                            borderWidth =
                                kGetBorderWidth(parentNode);
                            res.x += borderWidth.left;
                            res.y += borderWidth.top;
                        }
                        parentNode = parentNode.parentNode;
                    }
                }

                parentNode = offsetParent.parentNode;
                offsetParent = offsetParent.offsetParent;
            }
        }
    }
    return res;
}
//END Absolute position code


/**
 * Helper function to get an applied CSS style
 */
function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle && oElm.nodeName!="#comment"){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}

/**
 * Returns the XPath of a DOM node
 * @param node
 * @returns {String}
 */
function getXPath(node){
    var path = "";
    for (; node && (node.nodeType == 1 || node.nodeType == 3); node = node.parentNode)
    {
        var xname;
        if(node.nodeType == 1)
            xname = node.tagName;
        else
            xname = 'text()';
        if(hasSameTagSiblings(node)){
            var idx = getElementIdx(node);
            xname += "[" + idx + "]";
        }
        path = "/" + xname + path;
    }

    return path;
}

/**
 * Helper function for getXPath
 */
function getElementIdx(node){
    var count = 1;
    if(node.nodeName && node.nodeName == "#text"){
        for (var sib = node.previousSibling; sib ; sib = sib.previousSibling){
            if(sib.nodeName && sib.nodeName == "#text")    count++;
        }
    }
    else{
        for (var sib = node.previousSibling; sib ; sib = sib.previousSibling){
            if(sib.nodeType == 1 && sib.tagName == node.tagName)    count++;
        }
    }
    return count;
}

function hasSameTagSiblings(node){
    if(node.nodeName && node.nodeName == "#text"){
        for (var sib = node.previousSibling; sib ; sib = sib.previousSibling){
            if(sib.nodeName && sib.nodeName == "#text")    return true;
        }
        for (var sib = node.nextSibling; sib ; sib = sib.nextSibling){
            if(sib.nodeName && sib.nodeName == "#text")    return true;
        }
    }
    else{
        for (var sib = node.previousSibling; sib ; sib = sib.previousSibling){
            if(sib.nodeType == 1 && sib.tagName == node.tagName)    return true;
        }
        for (var sib = node.nextSibling; sib ; sib = sib.nextSibling){
            if(sib.nodeType == 1 && sib.tagName == node.tagName)    return true;
        }
    }
    return false;
}

function getDOMCoords(node){
    try{
        var pos = getElementAbsolutePos(node);
        var x = pos.x;
        var y = pos.y;
        if(!isNaN(node.offsetWidth) && !isNaN(node.offsetHeight)){
            return [x, y, x+node.offsetWidth, y+node.offsetHeight];
        }
        else return [-1,-1,-1,-1];
    }catch(e){
        return [-1,-1,-1,-1];
    }
}


function getPaddings(node){
    var paddingCSS = ["padding-left","padding-top","padding-right","padding-bottom"];
    var padd = [0,0,0,0];
    for(var i=0;i<paddingCSS.length;i++){
        var val = window.getComputedStyle(node, null).getPropertyValue(paddingCSS[i]);
        padd[i] = parseFloat(val);
        if(isNaN(padd[i]))
            padd[i] = 0;
    }
    return padd;
}
function getBorders(node){
    var borderCSS = ["border-left-width","border-top-width","border-right-width","border-bottom-width"];
    var bord = [0,0,0,0];
    for(var i=0;i<borderCSS.length;i++){
        var val = window.getComputedStyle(node, null).getPropertyValue(borderCSS[i]);
        bord[i] = parseFloat(val);
        if(isNaN(bord[i]))
            bord[i] = 0;
    }
    return bord;
}
function getMargins(node){
    var marginCSS = ["margin-left","margin-top","margin-right","margin-bottom"];
    var marg = [0,0,0,0];
    for(var i=0;i<marginCSS.length;i++){
        var val = window.getComputedStyle(node, null).getPropertyValue(marginCSS[i]);
        marg[i] = parseFloat(val);
        if(isNaN(marg[i]))
            marg[i] = 0;
    }
    return marg;
}

function isLayoutNode(node, c){


    if(ignoredTags.indexOf(node.nodeName) > -1)
        return false;

    if (c[0] < 0 || c[1] < 0 || c[2] <= 0 || c[3] <= 0) {
        return false;
    }

    t = 5; // 5 (Negligible dimensions)
    if (c[2] - c[0] <= t || c[3] - c[1] <= t) {
        return false;
    }

    // container that is not visible (no boarder or background color is same as parent)
    if (containerTags.indexOf(node.nodeName) > -1) {
        var hasBoarder = false;
        var DifferentBG = false;
        if( (getStyle(node,"border-left-width") != "0px" && getStyle(node,"border-left-color") != "transparent" && getStyle(node,"border-left-color") != getStyle(node.parentNode,"background-color"))
            ||(getStyle(node,"border-top-width") != "0px" && getStyle(node,"border-top-color") != "transparent" && getStyle(node,"border-top-color") != getStyle(node.parentNode,"background-color"))
            ||(getStyle(node,"border-right-width") != "0px" && getStyle(node,"border-right-color") != "transparent" && getStyle(node,"border-right-color") != getStyle(node.parentNode,"background-color"))
            ||(getStyle(node,"border-bottom-width") != "0px" && getStyle(node,"border-bottom-color") != "transparent" && getStyle(node,"border-bottom-color") != getStyle(node.parentNode,"background-color"))
        ){
            hasBoarder = true;
        }
        //then check background info

        if( getStyle(node,"background-color") != getStyle(node.parentNode,"background-color")
            && (getStyle(node,"background-color") !=	"transparent" ) ){
            DifferentBG = true;
        }
        if((getStyle(node,"background-image") != "none"))
            DifferentBG = true;

        if(!DifferentBG && !hasBoarder)
            return false;
    }

    //non selected option in select menu
    if(node.nodeName && node.nodeName == "OPTION" && node.selected == false)
        return false;
    //text of non selected option in option menu
    if(node.nodeName && node.nodeName == "#text" && node.parentNode.nodeName && node.parentNode.nodeName == "OPTION" && node.parentNode.selected == false)
        return false;


    return true;
}


function isVisibleLite(node,c){

    if(node.nodeType!=1){
        node = node.parentNode;
    }

    if (c[0] < 0 || c[1] < 0 || c[2] <= 0 || c[3] <= 0) {
        return false;
    }

    t = 0; // width or height is Zero
    if (c[2] - c[0] <= t || c[3] - c[1] <= t) {
        return false;
    }

    return isRenderedLite(node);

}


function isVisible(node,c){

    if(node.nodeType!=1){
        node = node.parentNode;
    }

    if (c[0] < 0 || c[1] < 0 || c[2] <= 0 || c[3] <= 0) {
        return false;
    }

    t = 0; // width or height is Zero
    if (c[2] - c[0] <= t || c[3] - c[1] <= t) {
        return false;
    }

    return isRendered(node);

}



/**
 * function to get the position of a text node
 * @param node
 */

function getTextNodeCoords(node){
    var range = document.createRange();
    range.selectNodeContents(node);
    var rects = range.getBoundingClientRect();
    var textNodeLeft = rects.left;
    var textNodeTop = rects.top;
    var textNodeRight = rects.right;
    var textNodeBottom = rects.bottom;
    return [textNodeLeft, textNodeTop, textNodeRight, textNodeBottom];

}


function drawRect(left,top,right,bottom,color,comment){
    var tableRectDiv = document.createElement('div');
    tableRectDiv.style.position = 'absolute';
    tableRectDiv.style.border = '1px solid '+color;
    tableRectDiv.style.margin = tableRectDiv.style.padding = '0';
    tableRectDiv.style.top = top + 'px';
    tableRectDiv.style.left = left + 'px';
    // we want rect.width to be the border width, so content width is 2px less.
    tableRectDiv.style.width = (right - left) + 'px';
    tableRectDiv.style.height = (bottom - top) + 'px';
    tableRectDiv.style.zIndex = 9999999;
    tableRectDiv.setAttribute("title", comment);
    tableRectDiv.setAttribute("class", "withTip");
    document.body.appendChild(tableRectDiv);

}

/**
 * Checker function while populating JSON object
 * @param key
 * @param value
 * @param func Optional function to be applied to value
 */
function c(key, value, func, enclose){
    if(func && value) value = func.apply(null, [value]);
    if(value == undefined || value === '') return;
    if(enclose) return key + ":'" + value+"'";
    return key + ':' + value;
}



function getNodeText(node){
    if(node){
        return node.nodeValue;
    }

}


function getInputTextCoords(node){
    if(node.placeholder.trim() == '' && node.value.trim() == '')
        return [-1,-1,-1,-1];
    else{
        var rects = getTextBoundingRect(node,0,Number.MAX_VALUE,false);
        var parentCoords = getDOMCoords(node);

        var textNodeLeft = rects.left;
        var textNodeTop = rects.top;
        var textNodeRight = rects.right;
        var textNodeBottom = rects.bottom;

        var centerText = (textNodeBottom - textNodeTop)/2 + textNodeTop ;
        var centerInput = (parentCoords[3] - parentCoords[1])/2 + parentCoords[1];

        var delta = centerInput - centerText;

        return [textNodeLeft, textNodeTop + delta, textNodeRight, textNodeBottom + delta];

    }
}


// @author Rob W       http://stackoverflow.com/users/938089/rob-w
// @name               getTextBoundingRect
// @param input          Required HTMLElement with `value` attribute
// @param selectionStart Optional number: Start offset. Default 0
// @param selectionEnd   Optional number: End offset. Default selectionStart
// @param debug          Optional boolean. If true, the created test layer
//                         will not be removed.
//
//Known issues
//The only case of an inconsistency was encountered when getComputedStyle returned a wrong value for font-family:
// When a page hasn't defined a font-family property, the computedStyle returns an incorrect value
// (even Firebug is experiencing this issue; environment: Linux, Firefox 3.6.23, font "Sans Serif").
//
//As visible in the demo, the positioning is sometimes slightly off (almost zero, always smaller than 1 pixel).
//
function getTextBoundingRect(input, selectionStart, selectionEnd, debug) {
    // Basic parameter validation
    //debug = true;
    // TODO: set Debug to true and finish add background color
    valueChangedToPlaceholder = false;
    orgInputValue = "";
    if(!input || (!('value' in input) && !('placeholder' in input)))
        return input;
    if(input.value.trim() == "" && ('placeholder' in input) && input.placeholder.trim() != ""){
        orgInputValue = input.value;
        valueChangedToPlaceholder = true;
        input.value = input.placeholder;
    }
    if(typeof selectionStart == "string") selectionStart = parseFloat(selectionStart);
    if(typeof selectionStart != "number" || isNaN(selectionStart)) {
        selectionStart = 0;
    }
    if(selectionStart < 0) selectionStart = 0;
    else selectionStart = Math.min(input.value.length, selectionStart);
    if(typeof selectionEnd == "string") selectionEnd = parseFloat(selectionEnd);
    if(typeof selectionEnd != "number" || isNaN(selectionEnd) || selectionEnd < selectionStart) {
        selectionEnd = selectionStart;
    }
    if (selectionEnd < 0) selectionEnd = 0;
    else selectionEnd = Math.min(input.value.length, selectionEnd);

    // If available (thus IE), use the createTextRange method
    if (typeof input.createTextRange == "function") {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveStart('character', selectionStart);
        range.moveEnd('character', selectionEnd - selectionStart);
        return range.getBoundingClientRect();
    }
    // createTextRange is not supported, create a fake text range
    var offset = getInputOffset(),
        topPos = offset.top,
        leftPos = offset.left,
        width = getInputCSS('width', true),
        height = getInputCSS('height', true);

    // Styles to simulate a node in an input field
    var cssDefaultStyles = "white-space:pre;padding:0;margin:0;",
        listOfModifiers = ['direction', 'font-family', 'font-size', 'font-size-adjust', 'font-variant', 'font-weight', 'font-style', 'letter-spacing', 'line-height', 'text-align', 'text-indent', 'text-transform', 'word-wrap', 'word-spacing'];

    topPos += getInputCSS('padding-top', true);
    topPos += getInputCSS('border-top-width', true);
    leftPos += getInputCSS('padding-left', true);
    leftPos += getInputCSS('border-left-width', true);
    leftPos += 0; //Seems to be necessary this was 1.. I changed it to 0..

    for (var i=0; i<listOfModifiers.length; i++) {
        var property = listOfModifiers[i];
        cssDefaultStyles += property + ':' + getInputCSS(property) +';';
    }
    // End of CSS variable checks

    var text = input.value,
        textLen = text.length,
        fakeClone = document.createElement("div");
    if(selectionStart > 0) appendPart(0, selectionStart);
    var fakeRange = appendPart(selectionStart, selectionEnd);
    if(textLen > selectionEnd) appendPart(selectionEnd, textLen);

    // Styles to inherit the font styles of the element
    fakeClone.style.cssText = cssDefaultStyles;

    // Styles to position the text node at the desired position
    fakeClone.style.position = "absolute";
    fakeClone.style.top = topPos + "px";
    fakeClone.style.left = leftPos + "px";
    fakeClone.style.width = width + "px";
    fakeClone.style.height = height + "px";
    fakeClone.style.backgroundColor = "blue";
    fakeClone.style.zIndex = 4;
    document.body.appendChild(fakeClone);
    var returnValue = fakeRange.getBoundingClientRect(); //Get rect

    if (!debug) fakeClone.parentNode.removeChild(fakeClone); //Remove temp
    if (valueChangedToPlaceholder) input.value = orgInputValue;
    return returnValue;

    // Local functions for readability of the previous code
    function appendPart(start, end){
        var span = document.createElement("span");
        span.style.cssText = cssDefaultStyles; //Force styles to prevent unexpected results
        span.textContent = text.substring(start, end);
        fakeClone.appendChild(span);
        return span;
    }
    // Computing offset position
    function getInputOffset(){
        var body = document.body,
            win = document.defaultView,
            docElem = document.documentElement,
            box = document.createElement('div');
        box.style.paddingLeft = box.style.width = "1px";
        body.appendChild(box);
        var isBoxModel = box.offsetWidth == 2;
        body.removeChild(box);
        box = input.getBoundingClientRect();
        var clientTop  = docElem.clientTop  || body.clientTop  || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
            scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
        return {
            top : box.top  + scrollTop  - clientTop,
            left: box.left + scrollLeft - clientLeft};
    }
    function getInputCSS(prop, isnumber){
        var val = document.defaultView.getComputedStyle(input, null).getPropertyValue(prop);
        return isnumber ? parseFloat(val) : val;
    }
}


function computeArea(coords){
    return (coords[2] - coords[0]) * (coords[3] - coords[1]);
}

function isRenderedLite(domObj) {

    // first check cache..
    if(renderedCache.get(domObj) === true){
        return true;
    }
    else if(renderedCache.get(domObj) === false){
        return false;
    }

    if ((domObj.nodeType != 1) || (domObj == document.body)) {
        renderedCache.put(domObj,true);
        return true;
    }
    var displayProperty = getStyle(domObj, "display");
    var visibilityProperty = getStyle(domObj, "visibility");
    // var clipProperty = getStyle(domObj, "clip");
    // var overFlowProperty = getStyle(domObj, "overflow");
    // var heightProperty = getStyle(domObj, "height");
    // var widthProperty = getStyle(domObj, "width");
    // var textIndentProperty = getStyle(domObj, "text-indent");

    // if (((clipProperty == "rect(1px, 1px, 1px, 1px)")
    //         || (clipProperty == "rect(0px, 0px, 0px, 0px)")
    //         || (heightProperty == "0px") || (widthProperty == "0px")
    //         || (heightProperty == "1px") || (widthProperty == "1px")
    //     ) && overFlowProperty == "hidden") {
    //     renderedCache.put(domObj,false);
    //     return false;
    // }
    // if (parseFloat(textIndentProperty) < -500) {
    //     renderedCache.put(domObj,false);
    //     return false
    // }
    //100% text-indent
    // if (textIndentProperty == getStyle(domObj.parentNode, "width") && overFlowProperty == "hidden" && getStyle(domObj, "white-space") == "nowrap"){
    //     renderedCache.put(domObj,false);
    //     return false;
    // }
    //find first parent with overflow = hidden then check if the element is not outside the borders of the parent
    // var parent = domObj.parentNode;
    // while(parent != document.body){
    //     if(getStyle(parent, "overflow") == "hidden") {
    //         parentCoords = getDOMCoords(parent);
    //         elmCoords = getDOMCoords(domObj);
    //         if(!isOverlap(parentCoords,elmCoords)) {
    //             renderedCache.put(domObj,false);
    //             return false;
    //         }
    //     }
    //     parent = parent.parentNode;
    // }
    //Element is visible, but we also need to make sure that it's parent is visible too
    if (displayProperty != "none" && visibilityProperty != "hidden") {
        isParentRendered = isRenderedLite(domObj.parentNode);
        renderedCache.put(domObj,isParentRendered);
        return isParentRendered;
    }
    // renderedCache.put(domObj,false);
    // return false;
}

function isRendered(domObj) {

    // first check cache..
    if(renderedCache.get(domObj) === true){
        return true;
    }
    else if(renderedCache.get(domObj) === false){
        return false;
    }

    if ((domObj.nodeType != 1) || (domObj == document.body)) {
        renderedCache.put(domObj,true);
        return true;
    }
    var displayProperty = getStyle(domObj, "display");
    var visibilityProperty = getStyle(domObj, "visibility");
    var clipProperty = getStyle(domObj, "clip");
    var overFlowProperty = getStyle(domObj, "overflow");
    var heightProperty = getStyle(domObj, "height");
    var widthProperty = getStyle(domObj, "width");
    var textIndentProperty = getStyle(domObj, "text-indent");

    if (((clipProperty == "rect(1px, 1px, 1px, 1px)")
            || (clipProperty == "rect(0px, 0px, 0px, 0px)")
            || (heightProperty == "0px") || (widthProperty == "0px")
            || (heightProperty == "1px") || (widthProperty == "1px")
        ) && overFlowProperty == "hidden") {
        renderedCache.put(domObj,false);
        return false;
    }
    if (parseFloat(textIndentProperty) < -500) {
        renderedCache.put(domObj,false);
        return false
    }
    //100% text-indent
    if (textIndentProperty == getStyle(domObj.parentNode, "width") && overFlowProperty == "hidden" && getStyle(domObj, "white-space") == "nowrap"){
        renderedCache.put(domObj,false);
        return false;
    }
    //find first parent with overflow = hidden then check if the element is not outside the borders of the parent
    var parent = domObj.parentNode;
    while(parent != document.body){
        if(getStyle(parent, "overflow") == "hidden") {
            parentCoords = getDOMCoords(parent);
            elmCoords = getDOMCoords(domObj);
            if(!isOverlap(parentCoords,elmCoords)) {
                renderedCache.put(domObj,false);
                return false;
            }
        }
        parent = parent.parentNode;
    }
    //Element is visible, but we also need to make sure that it's parent is visible too
    if (displayProperty != "none" && visibilityProperty != "hidden") {
        isParentRendered = isRendered(domObj.parentNode);
        renderedCache.put(domObj,isParentRendered);
        return isParentRendered;
    }
    renderedCache.put(domObj,false);
    return false;
}

function isOverlap(parentCoords,elmCoords){
    // If one rectangle is on left side of other
    if ( parentCoords[0] > elmCoords[2] || elmCoords[0] > parentCoords[2] )
        return false;

    // If one rectangle is above other
    if( parentCoords[1] > elmCoords[3] || elmCoords[1] > parentCoords[3] )
        return false;

    return true;
}

//function to handle special case where the footer is
//a P tag with <a>'s separated by '|' character
function isFooter(n) {
    var textcount = countTextInANode(n);
    var anchorcount = countAnchorText(n);
    if(textcount >= FooterTextToLinkRatio*anchorcount)
        return false;
    else return true;

}

function countAnchorText(n){
    var anchorcount = 0;
    var cs = n.childNodes;
    for(var ch in cs){
        var child = cs[ch];
        if(child){
            var nn = child.nodeName;
            if(nn && nn == "A"){
                anchorcount += countTextInANode(child);
            }
            else if (nn){
                anchorcount += countAnchorText(child);
            }
        }
    }
    return anchorcount;
}


function countTextInANode(n){
    var textcount = 0;
    var cs = n.childNodes;
    for(var ch in cs){
        var child = cs[ch];
        if(child){
            var nn = child.nodeName;
            if(nn && nn == "#text"){
                textcount+=child.nodeValue.trim().length;
            }
            else if( nn && textFormattingTags.indexOf(nn) > -1){
                textcount+= countTextInANode(child);
            }
        }
    }
    return textcount;
}

function getListOfTextChildren(node,textChildren){
    var cs = node.childNodes;
    for(var ch in cs){
        var child = cs[ch];
        if(child){
            var nn = child.nodeName;
            var nt = child.nodeType;
            if(nt && nt == 3){ // text node
                textChildren.push(child);

            }
            else if(nt && nn && nt == 1){ // element node
                var childCoords = getDOMCoords(child);
                if(isVisible(child,childCoords))
                    getListOfTextChildren(child, textChildren)
            }
            else if(nt && nt == 8){ //comment node

            }
        }
    }

}

function hasManyChildren(node){

    if(node.childNodes.length < 2)
        return false;

    var countRealKidz = 0;
    var cs = node.childNodes;
    for(var ch in cs){
        var child = cs[ch];
        if(child){
            var nt = child.nodeType;
            if(nt && nt == 1) // tag node
            {
                countRealKidz++;
            }
            else if(nt && nt == 3 && getNodeText(child).trim().length > 0)// non empty text node
            {
                countRealKidz++;
            }
        }
        if(countRealKidz > 1)
            return true;
    }
    return false;

}

function AllChildrenAreText(node){
    var cs = node.childNodes;
    var alltext = true;
    for(var ch in cs){
        var child = cs[ch];
        if(child){
            var nn = child.nodeName;
            var nt = child.nodeType;
            if(nt && nt == 3) // text node
                continue;
            else if(nt && nt == 8) //comment node
                continue;
            else if(nt && nn && nt == 1 ){ // element node
                if(textFormattingTags.indexOf(nn) > -1){ //text formatting node
                    continue;
                }
                else if(nn == "A"){
                    alltext = AllChildrenAreText(child);
                }
                else{
                    alltext = false;
                    break;
                }
            }
        }
    }
    return alltext;
}

function getCombinedMBRforChildren(children){
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxX = Number.MIN_VALUE;
    var maxY = Number.MIN_VALUE;

    while(children.length > 0){
        //process node
        var child = children.pop();
        var Childcoords;
        if(child && child.nodeName == "#text"){
            Childcoords = getTextNodeCoords(child);
            if(Childcoords[0] < minX && Childcoords[0] != -1)
                minX = Childcoords[0];
            if(Childcoords[1] < minY && Childcoords[1] != -1)
                minY = Childcoords[1];
            if(Childcoords[2] > maxX && Childcoords[2] != -1)
                maxX = Childcoords[2];
            if(Childcoords[3] > maxY && Childcoords[3] != -1)
                maxY = Childcoords[3];
        }
    }

    return [minX,minY,maxX,maxY];
}


function getColor(n){
    return getStyle(n,"color");
}

function getClassName(n){
    var attr = "null";
    if(n && n.attributes){
        if(n.getAttribute('class')){
            attr = n.getAttribute('class');
        }
    }
    attr = attr.replace(/[\n]+/gi, " ");
    return stringEscape(attr);
}


function getFont(n){
    font = getStyle(n,"font-family");
    return stringEscape(font);
}

function getFontSize(n){
    return getStyle(n,"font-size").slice(0, -2);
}

function getDefinedSize(node){
    var defVal = {width: 0, height: 0};
    /*
    var tmp = node.cloneNode(false);
    tmp.innerHTML = '';
    document.body.appendChild(tmp);
    if(tmp.width)
        defVal.width = tmp.width;
    if(tmp.height)
        defVal.height = tmp.height;
    tmp.parentNode.removeChild(tmp); //Remove temp
    */
    return defVal;

}



function stringEscape(s) {
    return s ? s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/\v/g,'\\v').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/[\x00-\x1F\x80-\x9F]/g,hex) : s;
    function hex(c) { var v = '0'+c.charCodeAt(0).toString(16); return '\\x'+v.substr(v.length-2); }
}


function showMBRsOnPage(MBRsInfo){
    for (var i=0; i < MBRsInfo.length; i++) {
        if (MBRsInfo[i].isVisible == 1 && computeArea(MBRsInfo[i].coords) > 10 && MBRsInfo[i].isLayout == 1) {
            var color;
            var comment = "XPATH: " + MBRsInfo[i].xpath + "\n"
                + "coords: " + MBRsInfo[i].coords + "\n"
                + "padding: " + MBRsInfo[i].paddings + "\n"
                + "border: " + MBRsInfo[i].borders + "\n"
                + "margin: " + MBRsInfo[i].margins + "\n"
                + "width: " + (MBRsInfo[i].coords[2] -  MBRsInfo[i].coords[0]) + "\n"
                + "height: " + (MBRsInfo[i].coords[3] -  MBRsInfo[i].coords[1]) + "\n";




            if (MBRsInfo[i].type == 0) {
                color = 'blue'
            } else if (MBRsInfo[i].type == 1) {
                color = 'red'
            } else if (MBRsInfo[i].type == 2) {
                color = 'yellow'
            }
            drawRect(MBRsInfo[i].coords[0], MBRsInfo[i].coords[1], MBRsInfo[i].coords[2], MBRsInfo[i].coords[3], color, comment);

        }
    }
}



/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 *
 *
 * modified by: Abdulmajeed Alameer alameer@usc.edu
 */
function getTextSizeCanvasBased(n, parent) {

    // re-use canvas object for better performance
    var canvas = getTextSizeCanvasBased.canvas || (getTextSizeCanvasBased.canvas = document.createElement("canvas"));
    var text = getNodeText(n);
    var context = canvas.getContext("2d");


    var font = getParentCSS('font-style') + " " + getParentCSS('font-variant') + " " + getParentCSS('font-weight') + " " +
        getParentCSS('font-size') + "/" + getParentCSS('line-height') + " " + getParentCSS('font-family');
    context.font = font;

    var metrics = context.measureText(text);
    return {width:metrics.width,height:metrics.height};


    function getParentCSS(prop){
        var val = document.defaultView.getComputedStyle(parent, null).getPropertyValue(prop);
        return val;
    }
}

function getTextSizeDomBased(n,parent){
    var size = Array();
    var text = getNodeText(n);
    // Styles to simulate a node in an input field
    var cssDefaultStyles = "white-space:pre;padding:0;margin:0;",
        listOfModifiers = ['direction', 'font-family', 'font-size', 'font-size-adjust', 'font-variant', 'font-weight', 'font-style', 'letter-spacing', 'line-height', 'text-align', 'text-indent', 'text-transform', 'word-wrap', 'word-spacing'];

    for (var i=0; i<listOfModifiers.length; i++) {
        var property = listOfModifiers[i];
        cssDefaultStyles += property + ':' + getParentCSS(property) +';';
    }

    var fakeClone = document.createElement("div");
    var fakeRange = appendtxt();
    // Styles to inherit the font styles of the element
    fakeClone.style.cssText = cssDefaultStyles;
    document.body.appendChild(fakeClone);

    var rectangle = fakeRange.getBoundingClientRect(); //Get rect

    fakeClone.parentNode.removeChild(fakeClone); //Remove temp

    var wdth = rectangle.right - rectangle.left;
    var higt = rectangle.bottom - rectangle.top;

    return {width:wdth,height:higt};


    function getParentCSS(prop, isnumber){
        var val = document.defaultView.getComputedStyle(parent, null).getPropertyValue(prop);
        return isnumber ? parseFloat(val) : val;
    }

    function appendtxt(){
        var span = document.createElement("span");
        span.style.cssText = cssDefaultStyles; //Force styles to prevent unexpected results
        span.textContent = text;
        fakeClone.appendChild(span);
        return span;
    }


}


function isContentBox(currentNode) {
    var boxSizing = getStyle(currentNode,"box-sizing");
    return (boxSizing == "content-box");
}



function similarCoords(coords,parentCoords){
    var i;
    for (i = 0; i < coords.length; i++) {
        if(Math.abs(coords[i] - parentCoords[i]) > 0.5)
            return false;
    }
    return true;
}



function isTextEmpty(node){
    return getNodeText(node).trim().length == 0;
}

function isVisibleTextBox(currentNode) {
    var coords = getDOMCoords(currentNode);
    if (currentNode.nodeName && currentNode.nodeName == "INPUT" && isVisible(currentNode,coords)){
        if( (currentNode.type == "text" || currentNode.type == "password" || currentNode.type == "email"))
            return true
    }
    return false;
}


function getMBRforTextNode(currentNode,nodeid,parentid){
    var coords = getTextNodeCoords(currentNode);
    var parentCoords = getDOMCoords(currentNode.parentNode);
    var xpath = getXPath(currentNode);
    var isLayout = isLayoutNode(currentNode,coords);
    var isVis =  isVisible(currentNode.parentNode,parentCoords);
    var className = getClassName(currentNode.parentNode);
    var textSize = getTextSizeDomBased(currentNode,currentNode.parentNode);

    if(similarCoords(coords,parentCoords)) //TODO: (Maybe) Don't use this function and don't use getDOMCoords, instead, always use getTextNodeCoords for both text and DOM nodes
        coords = parentCoords;             // Another idea!! in that case, don't return the text node, return it's parent and make it layout and visible node!

    var txtMBR = new MBR(1,nodeid,parentid,xpath,isLayout,isVis,className,defaultPaddings,defaultBorders,defaultMargins,coords,textSize.width,textSize.height);

    return txtMBR;
}



function getMBRForTagNode(currentNode,nodeid,parentid){
    var coords = getDOMCoords(currentNode);
    var paddings = getPaddings(currentNode);
    var borders = getBorders(currentNode);
    var margins = getMargins(currentNode);
    var xpath = getXPath(currentNode);
    var isLayout = isLayoutNode(currentNode,coords);
    var isVis =  isVisible(currentNode,coords);
    var className = getClassName(currentNode);
    var definedSize = getDefinedSize(currentNode);
    var isCntBox = isContentBox(currentNode);
    var textIndentProperty = parseFloat(getStyle(currentNode, "text-indent"));
    var displayCSSProp = getStyle(currentNode, "display");

    var nodeMBR = new MBR(0,nodeid,parentid,xpath,isLayout,isVis,className,paddings,borders,margins,coords,definedSize.width,definedSize.height,isCntBox,textIndentProperty,displayCSSProp);

    return nodeMBR;

}


function getMBRForPlaceholder(currentNode,nodeid,parentid) {
    var xpath = getXPath(currentNode);
    if(currentNode.value)
        xpath = xpath +  '/@value';
    else
        xpath = xpath + '/@placeholder';

    var coords = getInputTextCoords(currentNode);
    var isLayout = isLayoutNode(currentNode,coords);
    var isVis =  isVisible(currentNode,coords);
    var className = getClassName(currentNode);

    var placeholderMBR = new MBR(2,nodeid,parentid,xpath,isLayout,isVis,className,defaultPaddings,defaultBorders,defaultMargins,coords,defaultSize.width,defaultSize.height);

    return placeholderMBR;
}


function getMBRForCombinedChilds(currentNode, nodeid, parentid) {

    var textChildren = Array();
    getListOfTextChildren(currentNode,textChildren);
    var coords = getCombinedMBRforChildren(textChildren);

    var xpath = getXPath(currentNode) + '/descendant::text()';
    var isLayout = true;
    var isVis =  isVisible(currentNode,coords);
    var className = getClassName(currentNode);

    var CombinedMBR = new MBR(1,nodeid,parentid,xpath,isLayout,isVis,className,defaultPaddings,defaultBorders,defaultMargins,coords,defaultSize.width,defaultSize.height);
    return CombinedMBR;

}

function isTextNode(currentNode) {
    return currentNode.nodeName && currentNode.nodeName == "#text";
}



function getZIndex(n){
    //return window.getComputedStyle(n, null).getPropertyValue("z-index");//getStyle(n,"color");
    // var y;
    // if (window.getComputedStyle)
    // {
    //     y = document.defaultView.getComputedStyle(n,null).getPropertyValue("z-index"); 
    // }  
    // else if (n.currentStyle)
    // {
    //     y = n.currentStyle["z-index"];
    // } 
    // return y;
    return getStyle(n,"z-index");
}

function getWidth(n){
    return getStyle(n,"width");
}

function getHeight(n){
    return getStyle(n,"height");
}

function getOpacity(n){
    return window.getComputedStyle(n).getPropertyValue("opacity");//getStyle(n,"opacity");//
}

function getPosition(n){
    return getStyle(n,"position");
}

function getBGColor(n){
    return getStyle(n,"background-color");
}

function getWillChange(n){
    return window.getComputedStyle(n).getPropertyValue("will-change");
}

function getTransitionProperty(n){
    return window.getComputedStyle(n).getPropertyValue("transition-property");
}




function getVE(currentNode,nodeid,parentid){
    var coords = getDOMCoords(currentNode);
    var paddings = getPaddings(currentNode);
    var borders = getBorders(currentNode);
    var margins = getMargins(currentNode);
    var xpath = getXPath(currentNode);
    var isLayout = isLayoutNode(currentNode,coords);
    var isVis =  isVisible(currentNode,coords);
    var className = getClassName(currentNode);
    var definedSize = getDefinedSize(currentNode);
    var isCntBox = isContentBox(currentNode);
    var textIndentProperty = parseFloat(getStyle(currentNode, "text-indent"));
    var displayCSSProp = getStyle(currentNode, "display");
    var zindex = getZIndex(currentNode);
    var width = getWidth(currentNode);
    var height = getHeight(currentNode);
    var opacity = getOpacity(currentNode);
    var position = getPosition(currentNode);
    var bgcolor = getBGColor(currentNode);
    var willchange = getWillChange(currentNode);
    var transitionProperty = getTransitionProperty(currentNode);   

    var nodeVE = new VE(0,nodeid,parentid,xpath,isLayout,isVis,className,paddings,borders,margins,coords, /*definedSize.*/ width, /*definedSize.*/ height,isCntBox,textIndentProperty,displayCSSProp,zindex,opacity,position,bgcolor,willchange,transitionProperty);

    return nodeVE;

}




/**
 * Perform depth first traversal of DOM and return the DOM
 * data string in JSON format
 */
function computeVEs(){

    var nodes = Array();
    var VEsInfo = Array();
    var nodeCtr=0;

//Process body node and its children
    nodes.push([document.body,-1]);
    while(nodes.length > 0){
        //process node
        var t = nodes.pop(), currentNode = t[0], parentid=t[1];
        var nodeid = nodeCtr++;


        
        if(isTextNode(currentNode)){
            if(!isTextEmpty(currentNode)){
                // var txtMBR = getMBRforTextNode(currentNode,nodeid,parentid);
                // MBRsInfo.push(txtMBR);
            }
        }else{ //TagNode
            //add node
            var ve = getVE(currentNode,nodeid,parentid);
            VEsInfo.push(ve);

            //if node is a textbox, also add the attribute corresponding to it "placeholder" or "value"
            // if(isVisibleTextBox(currentNode)){
            //     parentid = nodeid;
            //     nodeid = nodeCtr++;
            //     var placeholderMBR = getMBRForPlaceholder(currentNode,nodeid,parentid);
            //     MBRsInfo.push(placeholderMBR);
            // }
        }


        // if(currentNode.childNodes && currentNode.childNodes.length > 0){
        //     if(AllChildrenAreText(currentNode) && !isFooter(currentNode) && hasManyChildren(currentNode)){
        //         parentid = nodeid;
        //         nodeid = nodeCtr++;
        //         // var combinedChildsMBR = getMBRForCombinedChilds(currentNode,nodeid,parentid);
        //         // MBRsInfo.push(combinedChildsMBR);
        //     }
        //     else{
                var cs = currentNode.childNodes;
                for(var ch in cs){
                    var child = cs[ch];
                    if(child){
                        var nn = child.nodeName;
                        if(nn && nn != "#comment" && nn.charAt(0) != '/'){ nodes.push([child,nodeid]); }
                    }
                }
        //     }
        // }
    }

    if(DEBUG){
        showMBRsOnPage(VEsInfo);
    }

    return JSON.stringify(VEsInfo);

}

/**
 * Perform depth first traversal of DOM and return the DOM
 * data string in JSON format
 */
function computeMBRs(){

    var nodes = Array();
    var MBRsInfo = Array();
    var nodeCtr=0;

//Process body node and its children
    nodes.push([document.body,-1]);
    while(nodes.length > 0){
        //process node
        var t = nodes.pop(), currentNode = t[0], parentid=t[1];
        var nodeid = nodeCtr++;

        if(isTextNode(currentNode)){
            if(!isTextEmpty(currentNode)){
                var txtMBR = getMBRforTextNode(currentNode,nodeid,parentid);
                MBRsInfo.push(txtMBR);
            }
        }else{ //TagNode
            //add node
            var nodeMBR = getMBRForTagNode(currentNode,nodeid,parentid);
            MBRsInfo.push(nodeMBR);

            //if node is a textbox, also add the attribute corresponding to it "placeholder" or "value"
            if(isVisibleTextBox(currentNode)){
                parentid = nodeid;
                nodeid = nodeCtr++;
                var placeholderMBR = getMBRForPlaceholder(currentNode,nodeid,parentid);
                MBRsInfo.push(placeholderMBR);
            }
        }

        if(currentNode.childNodes && currentNode.childNodes.length > 0){
            if(AllChildrenAreText(currentNode) && !isFooter(currentNode) && hasManyChildren(currentNode)){
                parentid = nodeid;
                nodeid = nodeCtr++;
                var combinedChildsMBR = getMBRForCombinedChilds(currentNode,nodeid,parentid);
                MBRsInfo.push(combinedChildsMBR);
            }
            else{
                var cs = currentNode.childNodes;
                for(var ch in cs){
                    var child = cs[ch];
                    if(child){
                        var nn = child.nodeName;
                        if(nn && nn != "#comment" && nn.charAt(0) != '/'){ nodes.push([child,nodeid]); }
                    }
                }
            }
        }
    }

    if(DEBUG){
        showMBRsOnPage(MBRsInfo);
    }

    return JSON.stringify(MBRsInfo);

}