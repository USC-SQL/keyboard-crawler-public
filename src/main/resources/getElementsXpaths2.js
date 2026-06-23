

window.isReady = false;
window.xpathstr = "";


document.addEventListener("dblclick", event => {
    event.preventDefault();
    var targetElement = event.target || event.srcElement;
    window.focus();
    var thisxpath = getAbsoluteXPath(targetElement)
    //console.log("4x " + thisxpath);
    window.xpathstr = thisxpath;
    window.isReady = true;
});

    
document.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
}, true);
