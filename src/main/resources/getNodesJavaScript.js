





// function isVisible(element) {
//     const style = window.getComputedStyle(element);
//     return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
// }
//
// const element = document.getElementById('myElement');
// if (isVisible(element)) {
//     // Element is visible
// } else {
//     // Element is not visible
// }

function getElementByXpath(path) {
    const elemsSnapshot = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);//.singleNodeValue;
    const elements = [];
    for (let i = 0; i < elemsSnapshot.snapshotLength; i++) {
        const elem = elemsSnapshot.snapshotItem(i);
        elements.push(elem);
    }
    return elements;
}

function checkk(arr) {
    const neww = [];
    for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];
        if(elem.checkVisibility()){
            neww.push(elem);
        }
        //console.log(elem)
    }
    return neww;
}

const linkWebElements = getElementByXpath("//a");
const inputWebElements = getElementByXpath("//input[not(@disabled)]");
const textInputWebElements = getElementByXpath("//input[@type='text' and not(@disabled)]");
const radioInputWebElements = getElementByXpath("//input[@type='radio' and not(@disabled)]");
const checkboxInputWebElements = getElementByXpath("//input[@type='checkbox' and not(@disabled)]");
const passwordInputWebElements = getElementByXpath("//input[@type='password' and not(@disabled)] | //input[@type='PASSWORD' and not(@disabled)]");
const textAreaWebElements = getElementByXpath("//textarea[not(@disabled)]");
const miscInputWebElements = getElementByXpath("//input[@type='file' and not(@disabled)] | //input[@type='image' and not(@disabled)] | //input[@type='range' and not(@disabled)] | //input[@type='search' and not(@disabled)]");
const inputFieldBasedWebElements = getElementByXpath("//input[@type='date' and not(@disabled)] | //input[@type='datetime-local' and not(@disabled)] | //input[@type='email' and not(@disabled)] | //input[@type='month' and not(@disabled)] | //input[@type='number' and not(@disabled)] | //input[@type='search' and not(@disabled)] | //input[@type='tel' and not(@disabled)] | //input[@type='time' and not(@disabled)] | //input[@type='url' and not(@disabled)] | //input[@type='week' and not(@disabled)]");
const inputButtonWebElements = getElementByXpath("//input[@type='button' and not(@disabled)] | //input[@type='submit' and not(@disabled)] | //input[@type='reset' and not(@disabled)]");
const buttonWebElements = getElementByXpath("//button[not(@disabled)]");
const selectWebElements = getElementByXpath("//select[not(@disabled)]");

const nonNegativeTabindexElements = getElementByXpath("//body//*[@tabindex>-1]");


const resultArray = Array.prototype.concat.apply([], [linkWebElements, inputWebElements, textInputWebElements, radioInputWebElements, checkboxInputWebElements, passwordInputWebElements, textAreaWebElements, miscInputWebElements, inputFieldBasedWebElements, inputButtonWebElements, buttonWebElements, selectWebElements, nonNegativeTabindexElements]);
const visibleElements = checkk(resultArray)
return visibleElements

// console.log(linkWebElements.snapshotLength)





// resultArray = linkWebElements
// return resultArray