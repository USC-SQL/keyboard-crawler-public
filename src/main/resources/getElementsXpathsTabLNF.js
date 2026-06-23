
window.isReady = false;
window.xpathstr = "";
window.v0 = "";
window.v0isReady = false;

// initial focus
window.xpathstr = getAbsoluteXPath(document.activeElement);
window.isReady = true;
window.quitt = false;


document.onkeydown = function(e){
    if(e.keyCode==9) {  //tab
	console.log("TAB");
	var elemInFocus = document.activeElement;

	var returnStr = getAbsoluteXPath(elemInFocus);
  	window.xpathstr = returnStr;
    	window.isReady = true;
    } else if(e.keyCode==81) {
		console.log("q");
		window.isReady = true;
		window.quitt = true;
	} else if(e.keyCode==48){
		console.log("0");
		var elemInFocus = document.activeElement;
		window.v0 = getAbsoluteXPath(elemInFocus);
		window.v0isReady = true;

	}

	};
