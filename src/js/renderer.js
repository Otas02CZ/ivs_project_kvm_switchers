/**
 * @file renderer.js
 * @description This file contains the main logic of the calculator such as parsing
 * the inputed equation and using object of the MathEngine class to calculate the
 * result, keyboard bindings, toggles between menus, repositioning the caret in the
 * input field, inserting results to the history and clearing the history and input fields.
 * @summary Main logic of the calculator. Uses MathEngine and is binded to index.html.
 * @module renderer
 * @requires MathEngine
 * @author Otakar Kočí
 * @author Kryštof Valenta
 * @author Team KVM Switchers FIT BUT
 * @license GNU GPL v3
 * @todo Remove debug console.log() calls
 * @todo Fix behavior of the history panel
 */
//FILE:             renderer.js
//AUTHORS:          Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
//                  Kryštof Valenta <xvalenk00@stud.fit.vutbr.cz>
//                  <>
//TEAM              KVM Switchers FIT BUT
//CREATED:          31/03/2024
//LAST MODIFIED:    14/04/2024
//DESCRIPTION:      Renderer JS script for index.html

/**
 * @description Object of the MathEngine class used to calculate the result of the equation
 * @name mathEngine
 * @type {MathEngine}
 * @see MathEngine
 * @see calculate
 */
const mathEngine = new MathEngine();

/**
 * @description Saves state of the button pages, so that correct animation can be applied.
 * @name buttonPageAnimToggle
 * @type {boolean}
 * @default false
 * @see toggleSecondaryPage
 */
let buttonPageAnimToggle = false;

/**
 * @description When true, enter key will trigger the calculate function
 * this is used to prevent unwanted behavior when user is in the menu.
 * @name canCalculate
 * @type {boolean}
 * @default true
 * @see calculate
 * @see navControl
 */
let canCalculate = true;

/** Binds eventListener to keypresses such as Enter */
document.addEventListener("keypress", function onEvent(event) {
    switch (event.key) {
        case "Enter":
            /** Do not calculate if user is in menu */
            if (canCalculate) {
                calculate();
            }
            break;
        default:
            break;
    }
});

/**
 * @description Array of objects of class HistoryItem.
 * @name historyItems
 * @type {HistoryItem[]}
 * @default []
 * @see HistoryItem
 * @see calculate
 * @see copyHistoryItem
 * @see clearHistory 
 */
let historyItems = [];

/**
 * Toggles between the main and secondary page of buttons of the calculator.
 * Takes care of animations during the transition.
 * @summary Handles transition animation between pages of buttons.
 * @function toggleSecondaryPage
 * @see buttonPageAnimToggle
 */
function toggleSecondaryPage() {
    var page1 = document.querySelector('.page1');
    var page2 = document.querySelector('.page2');
    var icon = document.querySelector('.secondary-toggle');
    var button = document.querySelector('.secondary-button');
    var animWrapper = document.querySelector('.switchRow');

    if (!buttonPageAnimToggle) {
        buttonPageAnimToggle = true;
        // page2.style.display = 'block';
        animWrapper.classList.add('switchRow-up');
        animWrapper.classList.remove('switchRow-down');
        // icon.classList.replace("fa-chevron-up", "fa-chevron-down");
        icon.style.transform = 'rotateX(180deg) rotateY(180deg)';
        button.style.borderRadius = '0 0 10px 10px';

    } else {
        buttonPageAnimToggle = false;
        // page2.style.display = 'none';
        animWrapper.classList.add('switchRow-down');
        animWrapper.classList.remove('switchRow-up');
        // icon.classList.replace("fa-chevron-down", "fa-chevron-up");
        icon.style.transform = 'rotateX(0deg) rotateY(0deg)';
        button.style.borderRadius = '10px 10px 0 0';
    }
}

/**
 * Toggles the navigation menu and handles animations. Disables calculation on Enter key press
 * for the duration of the menu being open.
 * @summary Toggles the nav menu, handles animations.
 * @function navControl
 * @see canCalculate
 */
function navControl() {
    canCalculate = canCalculate ? false : true;
    console.log(canCalculate);
    var nav = document.getElementById('navOverlay');
    if (document.getElementById('navControlCheck').checked) {
        // $('.overlay').animate({
        //     display: 'block'
        // }, 500);
        nav.style.display = 'block';
    }
    else {
        $('.overlay').fadeOut(500);
        nav.style.display = 'none';
        // $('.overlay').animate({
        //     display: 'none'
        // }, 500);
    }
}
/**
 * Returns caret position in the input field (as a number). Uses the selectionStart
 * property, so it always returns the leftmost position of a selection in the input field or the
 * position of the caret itself.
 * @summary Gets the caret position in the input field.
 * @function getCaretPosition
 * @see {@link setCaretPosition} [setCaretPosition]{@link setCaretPosition}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/selectionStart|MDN Web Docs}
 * @returns {number}
 */
function getCaretPosition() {
    const display = document.getElementById('display');
    const caretPosition = display.selectionStart;
    console.log("Current value: " + caretPosition);

    return caretPosition;
}

function setCaretPosition(position) {
    const display = document.getElementById('display');
    display.setSelectionRange(position, position);
    console.log("Setting to: " + position);
    console.log("Current value: " + display.selectionStart);
    console.log("Current value: " + display.selectionEnd);
    console.log("---------------------");
    display.focus();
}

function insertToDisplayAtCaret(contentToInsert) {
    const caretPosition = getCaretPosition();
    const display = document.getElementById('display');
    const displayValue = display.value;
    const displayValueBeforeCaret = displayValue.substring(0, caretPosition);
    const displayValueAfterCaret = displayValue.substring(caretPosition);
    display.value = displayValueBeforeCaret + contentToInsert + displayValueAfterCaret;
    setCaretPosition(caretPosition + contentToInsert.length);
}

function replaceAll(string, searchedStr, replaceStr) {
    let regex = new RegExp(searchedStr, 'g');
    return string.replace(regex, replaceStr);
}

function parseInput() {
    const display = document.getElementById('display');
    let input = display.value;

    input = replaceAll(input, "π", Math.PI);
    input = replaceAll(input, "pi", Math.PI);
    input = replaceAll(input, "Pi", Math.PI);
    input = replaceAll(input, "PI", Math.PI);

    input = replaceAll(input, "eu", Math.E);
    input = replaceAll(input, "Eu", Math.E);
    input = replaceAll(input, "EU", Math.E);
    console.log(input);

    const leftBrackets = ["(", "{", "["];
    const rightBrackets = [")", "}", "]"];
    const numbers = "0123456789.";

    let roofIndex;
    
    while ((roofIndex = input.indexOf("^")) !== -1) {
        if (roofIndex == 0 || roofIndex == input.length-1) {
            throw new EqvFormatError("Caret without a number before or after it.");
        }
        console.log(`Roof index: ${roofIndex}`);
        let caretPosition = roofIndex;
        let valueBefore = ""; // Value before the roof
        let valueAfter = "";  // Value after the roof
        let startOfRange = caretPosition-1; // Start of the range to replace
        let endOfRange = caretPosition+1;  // End of the range to replace

        if (!(rightBrackets.includes(input[caretPosition - 1]) || numbers.includes(input[caretPosition - 1]))) {
            throw new EqvFormatError("Wrong character before the caret.");
        }
        if (!(leftBrackets.includes(input[caretPosition + 1]) || numbers.includes(input[caretPosition + 1]))) {
            throw new EqvFormatError("Wrong character after the caret.");
        }

        // get value before the roof

        // are there brackets before the caret?
        if (rightBrackets.includes(input[caretPosition - 1])) {
            let bracketCounter = 0;
            let bracketType = input[caretPosition - 1];
            let closingBracketType = leftBrackets[rightBrackets.indexOf(bracketType)];
            // find the corresponding bracket
            while(true) {
                if (startOfRange<0) {
                    throw new EqvFormatError("Bracket not closed.");
                }
                if (input[startOfRange] === closingBracketType) {
                    bracketCounter--;
                } else if (input[startOfRange] === bracketType) {
                    bracketCounter++;
                }
                if (bracketCounter === 0) {
                    break;
                }
                startOfRange--;
            }
        }
        // are there numbers before the caret?
        else {
            while (true) {
                if (startOfRange < 0) {
                    break;
                }
                if (numbers.includes(input[startOfRange])) {
                    startOfRange--;
                } else {
                    break;
                }
            }
            startOfRange++;
        }
        valueBefore = input.substring(startOfRange, caretPosition);

        // get value after the roof

        // are there brackets before the caret?
        if (leftBrackets.includes(input[caretPosition + 1])) {
            let bracketCounter = 0;
            let bracketType = input[caretPosition + 1];
            let closingBracketType = rightBrackets[leftBrackets.indexOf(bracketType)];
            // find the corresponding bracket
            while(true) {
                if (endOfRange>=input.length) {
                    throw new EqvFormatError("Bracket not closed.");
                }
                if (input[endOfRange] === closingBracketType) {
                    bracketCounter++;
                } else if (input[endOfRange] === bracketType) {
                    bracketCounter--;
                }
                if (bracketCounter === 0) {
                    break;
                }
                endOfRange++;
            }
            endOfRange++;
        }
        // are there numbers before the caret?
        else {
            while (true) {
                if (endOfRange >= input.length) {
                    break;
                }
                if (numbers.includes(input[endOfRange])) {
                    endOfRange++;
                } else {
                    break;
                }
            }
        }
        valueAfter = input.substring(caretPosition+1, endOfRange);

        console.log(`Value before: ${valueBefore}`);
        console.log(`Value after: ${valueAfter}`);
        const substringBefore = input.substring(0, startOfRange);
        const substringAfter = input.substring(endOfRange);
        console.log(`Substring before: ${substringBefore}`);
        console.log(`Substring after: ${substringAfter}`);
        input = `${substringBefore} pow(${valueBefore}, ${valueAfter}) ${substringAfter}`;
        console.log(`Input after parsing: ${input}`);
    }
    
    return input;
}



function calculate() {
    var displayBoxWrapper = document.getElementsByClassName('displayBoxWrapper');
    var display = document.getElementById('display');
    let input = display.value;
    let historyItem = null;
    let result = "";
    try {
        input = parseInput();
        result = mathEngine.solveEquation(input);
        historyItem = new HistoryItem(HISTORY_ITEM_CALCULATION, input, result, "");
    } catch (error) {
        let errorMsg = "";
        switch (error.name) {
            case "RangeError":
                errorMsg = "INVALID RANGE";
                break;
            case "EqvFormatError":
                errorMsg = "WRONG FORMAT";
                break;
            case "DivideByZeroError":
                errorMsg = "ZERO DIVISION";
                break;
            case "ExponentTypeError":
                errorMsg = "WRONG EXPONENT";
                break;
            case "FactorialValueError":
                errorMsg = "WRONG FAC VALUE";
                break;
            default:
                errorMsg = "UNKNOWN ERROR";
                break;
        }
        historyItem = new HistoryItem(HISTORY_ITEM_MESSAGE, "", "", errorMsg);
    }
    const resultsField = document.getElementById('results');
    if (historyItems.length > 0  && (historyItems[historyItems.length - 1].type === HISTORY_ITEM_MESSAGE)) {
        resultsField.removeChild(resultsField.lastChild);
        historyItems.pop();
    }
    historyItems.push(historyItem);
    resultsField.innerHTML += historyItem.getHistoryItemHTML(historyItems.length - 1);
    resultsField.scrollTop = resultsField.scrollHeight;
    resultsField.lastChild.scrollLeft = resultsField.lastChild.scrollWidth;
    if (historyItem.type === HISTORY_ITEM_CALCULATION) {
        display.value = result;
        setCaretPosition(result.toString().length);
    }

    // var resultField = document.getElementById('result');
    // resultField.value = result;

    // var calcWrapper = document.querySelector('.displayWrapper');

    // calcWrapper.classList.add('displayResultOrder');

    // displayBoxWrapper[0].style.flexDirection = 'column-reverse';
    // display.classList.add('displayResultDis');
}

function copyHistoryItem(id) {
    const display = document.getElementById('display');
    insertToDisplayAtCaret(historyItems[id].result.toString());
}

function hideMenu() {
    document.getElementById('navControlCheck').checked = false;
    navControl();
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function clearHistory() {
    const resultsField = document.getElementById('results');
    historyItems = [];
    resultsField.innerHTML = '';
    hideMenu();
}