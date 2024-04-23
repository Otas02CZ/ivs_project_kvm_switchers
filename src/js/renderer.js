/**
 * @file renderer.js
 * @description This file contains the main logic of the calculator such as parsing
 * the inputed equation and using object of the MathEngine class to calculate the
 * result, keyboard bindings, toggles between menus, repositioning the cursor in the
 * input field, inserting results to the history and clearing the history and input fields.
 * This file is binded to index.html.
 * @summary Main logic of the calculator. Uses MathEngine and is binded to index.html.
 * @module renderer
 * @requires MathEngine
 * @requires HistoryItem
 * @author Otakar Kočí
 * @author Kryštof Valenta
 * @author Team KVM Switchers FIT BUT
 * @license GNU GPL v3
 * @todo Remove debug console.log() calls
 */
//FILE:             renderer.js
//AUTHORS:          Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
//                  Kryštof Valenta <xvalenk00@stud.fit.vutbr.cz>
//                  <>
//TEAM:             KVM Switchers FIT BUT
//LICENSE:          GNU GPL v3
//CREATED:          31/03/2024
//LAST MODIFIED:    15/04/2024
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
 * @description Array of strings (symbols) representing left brackets.
 * @name LEFT_BRACKETS
 * @type {string[]}
 * @default ["(", "{", "["]
 * @see parseInput
 * @see insertToDisplayAtCursor
 * @constant
 */
const LEFT_BRACKETS = ["(", "{", "["];
/**
 * @description Array of strings (symbols) representing right brackets.
 * @name RIGHT_BRACKETS
 * @type {string[]}
 * @default [")", "}", "]"]
 * @see parseInput
 * @see insertToDisplayAtCursor
 * @constant
 */
const RIGHT_BRACKETS = [")", "}", "]"];
/**
 * @description String representing numbers and the decimal point.
 * @name NUMBERS
 * @type {string}
 * @default "0123456789."
 * @see parseInput
 * @see insertToDisplayAtCursor
 * @constant
 */
const NUMBERS = "0123456789.";

/**
 * Toggles between the main and secondary page of buttons of the calculator.
 * Takes care of animations during the transition.
 * @summary Handles transition animation between pages of buttons.
 * @function toggleSecondaryPage
 * @see buttonPageAnimToggle
 * @returns {void}
 */
function toggleSecondaryPage() {
    var page1 = document.querySelector('.page1'); // main button page
    var page2 = document.querySelector('.page2'); // advanced button page
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
 * @returns {void}
 */
function navControl() {
    canCalculate = canCalculate ? false : true;
    console.log(canCalculate);
    const nav = document.getElementById('navOverlay');
    const about = document.getElementById('about');
    const help = document.getElementById('builtInHelp');

    if (document.getElementById('navControlCheck').checked) {
        // $('.overlay').animate({
        //     display: 'block'
        // }, 500);
        nav.style.display = 'block';
    }
    else {
        $('.overlay').fadeOut(500);
        nav.style.display = 'none';
        about.style.display = 'none';
        help.style.display = 'none';
        // $('.overlay').animate({
        //     display: 'none'
        // }, 500);
    }
}

/**
 * Returns cursor position in the input field (as a number). Uses the selectionStart
 * property, so it always returns the leftmost position of a selection in the input field or the
 * position of the cursor itself.
 * @summary Gets the cursor position in the input field.
 * @function getCursorPosition
 * @see setCursorPosition
 * @see insertToDisplayAtCursor
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/selectionStart|MDN Web Docs}
 * @returns {number}
 */
function getCursorPosition() {
    const display = document.getElementById('display');
    const cursorIndex = display.selectionStart;
    console.log("Current value: " + cursorIndex);

    return cursorIndex;
}

/**
 * Sets the cursor position in the input field to the specified position. Uses the setSelectionRange method.
 * The selection is set from the defined position to the defined position, so that the range has length 0.
 * Also focuses the input field.
 * @summary Sets the cursor position in the input field.
 * @function setCursorPosition
 * @param {number} position - position to set the cursor to
 * @returns {void}
 * @see getCursorPosition
 * @see insertToDisplayAtCursor
 * @see removeLastAfterCursor
 * @see calculate
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange|MDN Web Docs}
 */
function setCursorPosition(position) {
    const display = document.getElementById('display');
    display.setSelectionRange(position, position);
    console.log("Setting to: " + position);
    console.log("Current value: " + display.selectionStart);
    console.log("Current value: " + display.selectionEnd);
    console.log("---------------------");
    display.focus();
}

/**
 * Inserts the specified content to the input field at the cursor position. The cursor position is then updated to
 * reflect the length and content of the inserted string. If the inserted content contains the character 'x', the cursor
 * is positioned at the first occurence of 'x' in the inserted content (and 'x' is removed). In case of '^' character, the cursor
 * is positioned depending on the character before the cursor in the input field. If the character is a number, right bracket or
 * left bracket, the cursor is positioned at the end of the inserted content. Otherwise, the cursor is positioned in the place of
 * x in the string
 * @summary Inserts content to the input field at the cursor position. Also updates the cursor position.
 * @param {string} contentToInsert - content to insert at the cursor position
 * @function insertToDisplayAtCursor
 * @returns {void}
 * @see getCursorPosition
 * @see setCursorPosition
 */
function insertToDisplayAtCursor(contentToInsert) {
    const cursorIndex = getCursorPosition();
    const display = document.getElementById('display');
    const displayValue = display.value;
    const displayValueBeforeCursor = displayValue.substring(0, cursorIndex);
    const displayValueAfterCursor = displayValue.substring(cursorIndex);
    const xPositionInContent = contentToInsert.indexOf('x');
    contentToInsert = contentToInsert.replace('x', '');
    display.value = displayValueBeforeCursor + contentToInsert + displayValueAfterCursor;
    //if there is a cursor in the content
    if (contentToInsert.includes('^')) {
        const symbolBeforeCursor = displayValueBeforeCursor[cursorIndex - 1];
        if (NUMBERS.includes(symbolBeforeCursor) || RIGHT_BRACKETS.includes(symbolBeforeCursor)) {
            setCursorPosition(cursorIndex + contentToInsert.length);
            return;
        }
    }
    if (xPositionInContent !== -1) {
        setCursorPosition(cursorIndex + xPositionInContent);
    } else {
        setCursorPosition(cursorIndex + contentToInsert.length);
    }
}

/**
 * Replaces all occurences of a searched string in given string with a specified replace string.
 * Uses the replace method with a global regular expression.
 * @summary Replaces all occurences of a string in a string with another string.
 * @param {string} string - string to replace in
 * @param {string} searchedStr - string to search for
 * @param {string} replaceStr - string to replace searched string with
 * @function replaceAll
 * @returns {string} - new string with all occurences of searched string replaced with replace string
 * @see parseInput
 */
function replaceAll(string, searchedStr, replaceStr) {
    let regex = new RegExp(searchedStr, 'g');
    return string.replace(regex, replaceStr);
}

/**
 * Parses the contents of the input field to a format supported by the MathEngine class. Symbols like
 * π and e (and their derivatives) are replaced with their respective values. The caret operator '^'
 * is replaced with the function pow().
 * @summary Parses the input from the input field to a format supported by the MathEngine class.
 * @function parseInput
 * @returns {string} parsed string in format supported by the MathEngine class
 * @see calculate
 * @see MathEngine
 * @see replaceAll
 * @see NUMBERS
 * @see LEFT_BRACKETS
 * @see RIGHT_BRACKETS
 * @throws {EqvFormatError} if the format of the equation is wrong
 */
function parseInput() {
    const display = document.getElementById('display');
    let input = display.value;

    // replace all occurences of π and e (and variations) with their values
    input = replaceAll(input, "π", Math.PI);
    input = replaceAll(input, "pi", Math.PI);
    input = replaceAll(input, "Pi", Math.PI);
    input = replaceAll(input, "PI", Math.PI);
    input = replaceAll(input, "eu", Math.E);
    input = replaceAll(input, "Eu", Math.E);
    input = replaceAll(input, "EU", Math.E);
    console.log(input);


    let caretIndex; // Index of caret in input
    
    while ((caretIndex = input.indexOf("^")) !== -1) { // for all carets in the input
        if (caretIndex == 0 || caretIndex == input.length-1)
            throw new EqvFormatError("Caret without a number before or after it.");
        console.log(`Roof index: ${caretIndex}`);
        let valueBefore = ""; // Value before the caret
        let valueAfter = "";  // Value after the caret
        let startOfRange = caretIndex-1; // Start of the range to replace
        let endOfRange = caretIndex+1;  // End of the range to replace
        const symBeforeCaret = input[caretIndex - 1];
        const symAfterCaret = input[caretIndex + 1];

        if (!(RIGHT_BRACKETS.includes(symBeforeCaret) || NUMBERS.includes(symBeforeCaret)))
            throw new EqvFormatError("Wrong character before the caret.");
        if (!(LEFT_BRACKETS.includes(symAfterCaret) || NUMBERS.includes(symAfterCaret)))
            throw new EqvFormatError("Wrong character after the caret.");

        // get value before the caret

        // are there brackets before the caret?
        if (RIGHT_BRACKETS.includes(symBeforeCaret)) {
            // if there are brackets, find the corresponding leftmost bracket
            let bracketCounter = 0;
            let bracketType = symBeforeCaret;
            let closingBracketType = LEFT_BRACKETS[RIGHT_BRACKETS.indexOf(bracketType)];
            while(true) {
                if (startOfRange<0)
                    throw new EqvFormatError("Bracket not closed.");

                if (input[startOfRange] === closingBracketType)
                    bracketCounter--;
                else if (input[startOfRange] === bracketType)
                    bracketCounter++;
                
                if (bracketCounter === 0)
                    break;
                startOfRange--;
            }
        }
        // are there numbers before the caret?
        else {
            // if there are numbers, find the leftmost digit of the number
            while (true) {
                if (startOfRange < 0)
                    break;

                if (NUMBERS.includes(input[startOfRange]))
                    startOfRange--;
                else
                    break;
            }
            startOfRange++;
        }
        // get value before the caret that is to be placed into pow()
        valueBefore = input.substring(startOfRange, caretIndex);

        // get value after the caret

        // are there brackets after the caret?
        if (LEFT_BRACKETS.includes(symAfterCaret)) {
            // if there are brackets, find the corresponding rightmost bracket
            let bracketCounter = 0;
            let bracketType = symAfterCaret;
            let closingBracketType = RIGHT_BRACKETS[LEFT_BRACKETS.indexOf(bracketType)];
            while(true) {
                if (endOfRange>=input.length)
                    throw new EqvFormatError("Bracket not closed.");

                if (input[endOfRange] === closingBracketType)
                    bracketCounter++;
                else if (input[endOfRange] === bracketType) 
                    bracketCounter--;

                if (bracketCounter === 0)
                    break;
                endOfRange++;
            }
            endOfRange++;
        }
        // are there numbers before the caret?
        else {
            // if there are numbers, find the rightmost digit of the number
            while (true) {
                if (endOfRange >= input.length)
                    break;

                if (NUMBERS.includes(input[endOfRange]))
                    endOfRange++;
                else
                    break;
            }
        }
        // get value after the caret that is to be placed into pow()
        valueAfter = input.substring(caretIndex+1, endOfRange);

        console.log(`Value before: ${valueBefore}`);
        console.log(`Value after: ${valueAfter}`);
        // get substrings before and after the range to replace (ommiting the previous x^n part)
        const substringBefore = input.substring(0, startOfRange);
        const substringAfter = input.substring(endOfRange);
        console.log(`Substring before: ${substringBefore}`);
        console.log(`Substring after: ${substringAfter}`);
        // replace the range with the pow() function
        input = `${substringBefore} pow(${valueBefore}, ${valueAfter}) ${substringAfter}`;
        console.log(`Input after parsing: ${input}`);
    }
    return input;
}

/**
 * Attempts to calculate the result of the equation in the input field. If the calculation is successful,
 * the result is displayed in the input field and the equation (and result) are added to the history.
 * If the calculation fails, an error message is displayed in the history. History is scrolled to the right-bottom.
 * All previous error messages are removed from the history.
 * @summary Attempts to calculate the result of the equation in the input field and show the outcome.
 * @function calculate
 * @returns {void}
 * @see MathEngine
 * @see mathEngine
 * @see parseInput
 * @see HistoryItem
 * @see HISTORY_ITEM_CALCULATION
 * @see HISTORY_ITEM_MESSAGE
 * @see historyItems
 * @see setCursorPosition
 */
function calculate() {
    var displayBoxWrapper = document.getElementsByClassName('displayBoxWrapper');
    var display = document.getElementById('display');
    let input = display.value;
    let historyItem = null;
    let result = "";
    try {
        input = parseInput();
        result = mathEngine.solveEquation(input);
        historyItem = new HistoryItem(HISTORY_ITEM_CALCULATION, display.value, result, "");
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
        setCursorPosition(result.toString().length);
    }

    // var resultField = document.getElementById('result');
    // resultField.value = result;

    // var calcWrapper = document.querySelector('.displayWrapper');

    // calcWrapper.classList.add('displayResultOrder');

    // displayBoxWrapper[0].style.flexDirection = 'column-reverse';
    // display.classList.add('displayResultDis');
}

/**
 * Removes the character before the cursor in the input field.
 * The cursor position is then updated to reflect the changes.
 * @summary Removes the character before the cursor in the input field.
 * @function removeLastAfterCursor
 * @returns {void}
 * @see getCursorPosition
 * @see setCursorPosition
 */
function removeLastAfterCursor() {
    const display = document.getElementById('display');
    const cursorIndex = getCursorPosition();
    const displayValue = display.value;
    const displayValueBeforeCursor = displayValue.substring(0, cursorIndex - 1);
    const displayValueAfterCursor = displayValue.substring(cursorIndex);
    display.value = displayValueBeforeCursor + displayValueAfterCursor;
    setCursorPosition(cursorIndex - 1);

}

/**
 * Copies the result of the history item with the specified index to the input field.
 * The cursor position is then updated to reflect the changes.
 * @summary Copies the result of the history item with the specified index to the input field.
 * @function copyHistoryItem
 * @param {number} index - index of the history item in historyItems array
 * @returns {void}
 * @see insertToDisplayAtCursor
 * @see historyItems
 * @see HistoryItem
 */
function copyHistoryItem(index) {
    const display = document.getElementById('display');
    insertToDisplayAtCursor(historyItems[index].result.toString()); 
}

/**
 * Hides the navigation menu. Sets the checked property of the checkbox to false.
 * And calls the navControl function to handle the animation.
 * @summary Hides the navigation menu.
 * @function hideMenu
 * @returns {void}
 * @see navControl
 */
function hideMenu() {
    document.getElementById('navControlCheck').checked = false;
    navControl();
}

/**
 * @summary Clears the input field.
 * @function clearDisplay
 * @returns {void}
 */
function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

/**
 * Clears the history of calculations and messages. Removes all displayed history items.
 * And all internally stored history items.
 * @summary Clears the history.
 * @function clearHistory
 * @returns {void}
 * @see historyItems
 * @see HistoryItem
 * @see hideMenu
 */
function clearHistory() {
    const resultsField = document.getElementById('results');
    historyItems = [];
    resultsField.innerHTML = '';
    hideMenu();
}

function showAboutUsPage() {
    const about = document.getElementById('about');
    about.style.display = 'block';
}

function showHelpPage() {
    const help = document.getElementById('builtInHelp');
    help.style.display = 'block';
}