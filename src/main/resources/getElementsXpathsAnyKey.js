
window.isReady = false;
window.xpathstr = "";


// initial focus
window.xpathstr = getAbsoluteXPath(document.activeElement);
window.isReady = true;



document.onkeydown = function(e){   
    //if(e.keyCode==9) {  //tab
	console.log("TAB");
	var elemInFocus = document.activeElement;

	var returnStr = getAbsoluteXPath(elemInFocus) + "\t" + elemInFocus.childNodes[0].nodeValue;
  	window.xpathstr = returnStr;
    	window.isReady = true;
    //}
};
