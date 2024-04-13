//FILE:             renderer.js
//AUTHORS:          Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
//                  Kryštof Valenta <xvalenk00@stud.fit.vutbr.cz>
//                  <>
//TEAM              KVM Switchers FIT BUT
//CREATED:          31/03/2024
//LAST MODIFIED:    13/04/2024
//DESCRIPTION:      Renderer JS script for index.html

var i = 0;
const mathEngine = new MathEngine();
let canCalculate = true;

document.addEventListener("keypress", function onEvent(event) {
    switch (event.key) {
        case "Enter":

            if (canCalculate) {
                calculate();
            }
            break;
        default:
            break;
    }
});

function toggleSecondaryPage() {
    var page1 = document.querySelector('.page1');
    var page2 = document.querySelector('.page2');
    var icon = document.querySelector('.secondary-toggle');
    var button = document.querySelector('.secondary-button');
    var animWrapper = document.querySelector('.switchRow');

    if (i == 0) {
        i = 1;
        // page2.style.display = 'block';
        animWrapper.classList.add('switchRow-up');
        animWrapper.classList.remove('switchRow-down');
        // icon.classList.replace("fa-chevron-up", "fa-chevron-down");
        icon.style.transform = 'rotateX(180deg) rotateY(180deg)';
        button.style.borderRadius = '0 0 10px 10px';

    } else {
        i = 0;
        // page2.style.display = 'none';
        animWrapper.classList.add('switchRow-down');
        animWrapper.classList.remove('switchRow-up');
        // icon.classList.replace("fa-chevron-down", "fa-chevron-up");
        icon.style.transform = 'rotateX(0deg) rotateY(0deg)';
        button.style.borderRadius = '10px 10px 0 0';
    }
}

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
    input = replaceAll(input, "e", Math.E);
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
    let result = "";
    try {
        input = parseInput();
        result = mathEngine.solveEquation(input);
    } catch (error) {
        switch (error.name) {
            case "EqvFormatError":
                alert("Invalid equation format.");
                return;
            case "DivideByZeroError":
                alert("Division by zero.");
                return;
            case "ExponentTypeError":
                alert("Wrong exponent used.");
                return;
            case "FactorialValueError":
                alert("Inccorect number for the factorial function.");
                return;
            default:
                alert("Unknown error occured.");
                return;
        }
    }
    const resultsField = document.getElementById('results');
    resultsField.innerHTML += `<input type="text" value="${display.value} = ${result}" readonly>`;
    display.value = result;
    setCaretPosition(result.toString().length);

    // var resultField = document.getElementById('result');
    // resultField.value = result;

    // var calcWrapper = document.querySelector('.displayWrapper');

    // calcWrapper.classList.add('displayResultOrder');

    // displayBoxWrapper[0].style.flexDirection = 'column-reverse';
    // display.classList.add('displayResultDis');
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function clearHistory() {
    const resultsField = document.getElementById('results');
    resultsField.innerHTML = '';
}