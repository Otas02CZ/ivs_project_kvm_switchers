/**
 * @file math_engine.js
 * @description This module contains the MathEngine class, which is used for solving
 * equations and basic math operations. There are also these custom exceptions:
 * ExponentTypeError, EqvFormatError, DivisionByZeroError and FactorialValueError.
 * @summary This module contains the MathEngine class, which is used for solving equations and basic math operations.
 * @module math_engine
 * @author Martin Mendl
 * @author Otakar Kočí - JSdoc changes only
 * @author Team KVM Switchers FIT BUT
 * @license GNU GPL v3
 */
//FILE:             math_engine.js
//AUTHORS:          Martin Mendl <x247581@stud.fit.vutbr.cz>
//                  Otakar Kočí <xkocio00@stud.fit.vutbr.cz> JSDoc changes only
//TEAM:             KVM Switchers FIT BUT
//LICENSE:          GNU GPL v3
//CREATED:          21/03/2024
//LAST MODIFIED:    16/04/2024
//DESCRIPTION:      Math engine for solving equations and basic math operations, including complex math operations like power, root, factorial and logarithm


/**
 * ExponentTypeError
 * @classdesc Exception ExponentTypeError, that is thrown when the base or exponent of a power operation is not a number.
 */
class ExponentTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExponentTypeError'
    }
}

/**
 * EqvFormatError
 * @classdesc Exception EqvFormatError, that is thrown when the equation is not in the correct format.
 */
class EqvFormatError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EqvFormatError';
    }
}

/**
 * DivisionByZeroError
 * @classdesc Exception DivisionByZeroError, that is thrown when the divisor is zero.
 */
class DivisionByZeroError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DivisionByZeroError';
    }
}

/**
 * FactorialValueError
 * @classdesc Exception FactorialValueError, that is thrown when the value of the factorial is not a number or is negative.
 */
class FactorialValueError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FactorialValueError';
    }
}

/**
 * MathEngine class
 * @classdesc The MathEngine class contains methods for solving equations and basic math operations,
 * including complex math operations like power, root, factorial and logarithm. The main method
 * of this class is solveEquation, which takes an equation as a string and returns the result of
 * the equation as a number, or throws an error if the equation is invalid.
 */
class MathEngine {
    /**
    * Creates an instance of MathEngine.
    * @param {boolean} debug - disable or enable debug mode
    * @example
    * let mathEngine = new MathEngine();
    * @example
    * let mathEngine = new MathEngine(true); -> debug mode enabled
    * @example
    * let mathEngine = new MathEngine();
    * mathEngine.solveEquation('2 + 3 * 4'); // -> 14
    * mathEngine.solveEquation('2 + 3 / 4'); // -> 2.75 
    * @see ExponentTypeError
    * @see EqvFormatError
    * @see DivisionByZeroError
    * @see FactorialValueError
    * @see RangeError
    * @see MathEngine#solveEquation
    */
    constructor(debug = false) {
        /**
         * Matching brackets for inner implementation
         * @type {Object<string, string>}
         */
        this.matchingBrackets = {
            '(': ')',
            '[': ']',
            '{': '}'
        };

        /**
         * Equation pattern, matches equations in the form of (digits operator digits operator ...)
         * @type {RegExp}
         */
        this.eqvPattern = /[\(\{\[][-+]?\d+(?:\.\d+)?(?:e[+-]\d+)?((([/*][+-])|[-+*/])\d+(?:\.\d+)?(?:e[+-]\d+)?)*[\)\}\]]/;
        
        /**
         * Integer pattern, matches only integer numbers
         * @type {RegExp}
         */
        this.intPattern = /\d+(?!\.\d+)/;

        /**
         * Positive floating point pattern, matches only positive floating point numbers
         * @type {RegExp}
         */
        this.positiveFloatPattern = /\d+(?:\.\d+)?/;

        /**
         * Floating point pattern, matches floating point numbers including negative numbers and exponential notation
         * @type {RegExp}
         */
        this.floatPattern = /\d+(?:\.\d+)?(?:e[+-]\d+)?/;

        /**
         * Floating point parameter pattern, matches floating point numbers including exponential notation.
         * Without negative numbers.
         * @type {RegExp}
         */
        this.floatParamPattern = /-?\d+(?:\.\d+)?(?:e[+-]\d+)?/;

        /**
         * Basic operator pattern, matches basic arithmetic operators: +, -, *, /, *+, +*, -*, *-
         * @type {RegExp}
         */
        this.basicOperatorPattern = /([/*][+-])|[-+*/]/;

        /**
         * Power pattern, matches power function expressions in the form of pow(x, y)
         * @type {RegExp}
         */
        this.powerPattern = /pow\(-?\d+(?:\.\d+)?(?:e[+-]\d+)?,-?\d+(?:\.\d+)?(?:e[+-]\d+)?\)/;

        /**
         * Natural root pattern, matches natural root function expressions in the form of root(x, n)
         * @type {RegExp}
         */
        this.naturalRootPattern = /root\(-?\d+(?:\.\d+)?(?:e[+-]\d+)?,\d+(?:.0)?\)/;

        /**
         * Factorial pattern, matches factorial function expressions in the form of x!
         * @type {RegExp}
         */
        this.factorialPattern = /(?<!\d+\.)\d+!/;

        /**
         * Logarithm pattern, matches logarithm function expressions in the form of log(base, x)
         * @type {RegExp}
         */
        this.logPattern = /log\(\d+(?:\.\d+)?(?:e\+\d+)?,\d+(?:\.\d+)?(?:e[+-]\d+)?\)/;

        /**
         * Complex math patterns, array of patterns for complex math operations
         * @type {Array<RegExp>}
         */
        this.complexMathPatterns = [
            this.powerPattern,
            this.naturalRootPattern,
            this.factorialPattern,
            this.logPattern
        ];

        /**
         * Debug mode, if true, debug messages are printed
         * @type {boolean}
         */
        this.debug = debug;
    }


    /**
     * Sum of two numbers
     * @description Adds two numbers, checks correct types of parameters.
     * @param {number} a - The first parameter of the sum
     * @param {number} b - The second parameter of the sum
     * @returns {number} The sum of a and b
     * @throws {TypeError} Thrown when parameters a or b are not numbers
     */
    _add(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('a and b must be numbers');
        }

        return a + b;
    }

    /**
     * Subtracts two numbers
     * @description Subtracts two numbers, checks correct types of parameters.
     * @param {number} a - The first parameter of the subtraction
     * @param {number} b - The second parameter of the subtraction
     * @returns {number} The difference of a and b
     * @throws {TypeError} Thrown when parameters a or b are not numbers
     */
    _subtract(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('a and b must be numbers');
        }

        return a - b;
    }

    /**
     * Multiplies two numbers
     * @description Multiplies two numbers, checks correct types of parameters.
     * @param {number} a - The first parameter of the product
     * @param {number} b - The second parameter of the product
     * @returns {number} The product of a and b
     * @throws {TypeError} Thrown when parameters a or b are not numbers
     */
    _multiply(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('a and b must be numbers');
        }

        return a * b;
    }

   /**
    * Divides two numbers
    * @description Divides two numbers, checks correct types of parameters and if the divisor is not zero.
    * @param {number} a - The dividend
    * @param {number} b - The divisor (must not be 0)
    * @returns {number} The quotient of a and b
    * @throws {TypeError} Thrown when parameters a or b are not numbers
    * @throws {DivisionByZeroError} Thrown when b is 0
    * @see DivisionByZeroError
    */
    _divide(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('a and b must be numbers');
        }

        if (b === 0) {
            throw new DivisionByZeroError('b must not be 0');
        }

        return a / b;
    }

    /**
     * Raises a number to the power of another number
     * @description Raises a number to the power of another number, checks correct types of parameters.
     * @param {number} base - The base to be raised to the power
     * @param {number} exponent - The exponent to raise the base to
     * @returns {number} The result of the base raised to the power of the exponent
     * @throws {ExponentTypeError} Thrown when base or exponent are not numbers
     * @see ExponentTypeError
     */
    _power(base, exponent) {
        if (typeof base !== 'number' || typeof exponent !== 'number') {
            throw new ExponentTypeError('base and exponent must be numbers');
        }

        return Math.pow(base, exponent);
    }

    /**
     * Calculates the natural root of a number
     * @description Calculates the natural root of a number, checks correct types of parameters.
     * @param {number} base - The base number (not negative if exponent is even) 
     * @param {number} exponent - The exponent (exponent >= 0)
     * @returns {number} The result of the natural root of base with exponent
     * @throws {ExponentTypeError} Thrown when base or exponent are not numbers, or if exponent is not an integer >= 0
     * @throws {RangeError} Thrown when base is negative and exponent is even
     * @see ExponentTypeError
     */
    natural_root(base, exponent) {
        if (typeof base !== 'number' || typeof exponent !== 'number') {
            throw new ExponentTypeError('base and exponent must be numbers');
        }
        if (!Number.isInteger(exponent)) {
            throw new ExponentTypeError('exponent must be an integer');
        }

        if (exponent <= 0) {
            throw new ExponentTypeError('exponent must be greater than or equal to 0');
        }

        if (base < 0 && exponent % 2 === 0) {
            throw new RangeError('base must be greater than or equal to 0 if exponent is even');
        }

        if (base < 0) {
            base *= -1;
            let result = Math.pow(base, 1/exponent);
            return result* -1;
        } 

        return Math.pow(base, 1/exponent);
    }

    /**
     * Calculates the factorial of a number
     * @description Calculates the factorial of a number, checks correct types of parameters.
     * @param {number} x - The number (integer x >= 0)
     * @returns {number} The factorial of x
     * @throws {FactorialValueError} Thrown when x is not an integer >= 0
     */
    _factorial(x) {
        if (typeof x !== 'number') {
            throw new FactorialValueError('x must be a number');
        }

        if (!Number.isInteger(x)) {
            throw new FactorialValueError('x must be an integer');
        }

        if (x < 0) {
            throw new FactorialValueError('x must be greater than or equal to 0');
        }

        let result = 1;
        for (let i = 2; i <= x; i++) {
            result *= i;
        }

        return result;
    }

    /**
     * Calculates the logarithm of a number
     * @description Calculates the logarithm of a number, checks correct types of parameters.
     * @param {number} base - The base of the logarithm (base > 0, base != 1)
     * @param {number} x - The number (x >= 0)
     * @returns {number} The logarithm of x with base
     * @throws {TypeError} Thrown when base or x are not numbers
     * @throws {RangeError} Thrown when base or x are not greater than 0 
     */
    _log(base, x) {

        if (typeof base !== 'number' || typeof x !== 'number') {
            throw new TypeError('base and x must be numbers');
        }

        if (x <= 0) {
            throw new RangeError('x must be greater than or equal to 0');
        }

        if (base <= 0 ) {
            throw new RangeError('base must be greater than or equal to 0');
        }

        return Math.log(x) / Math.log(base);
    }

    /**
     * Solves power operation
     * @description Solves power operation given as string
     * @param {string} eqv - Equation with power operation, represented as a string
     * @returns {number} The result of the power operation
     * @throws {EqvFormatError} Thrown when eqv is not a string with valid power operation format
     */
    _solvePow(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        const matches = [...eqv.matchAll(new RegExp(this.floatParamPattern.source, 'g'))].map(match => parseFloat(match[0]));
    
        if (matches.length !== 2) {
            throw new EqvFormatError('Invalid number of matches for pow operation');
        }
    
        const [base, exponent] = matches;
    
        return this._power(base, exponent);
    }
    
    /**
     * Solves natural root operation
     * @description Solves natural root operation given as string
     * @param {string} eqv - Equation with natural root operation, represented as a string
     * @returns {number} The result of the natural root operation
     * @throws {EqvFormatError} Thrown when eqv is not a string with valid natural root operation format
     * @throws {Error} Thrown when invalid number of reg exp matches for natural root operation is found
     * @see ExponentTypeError
     */
    _solveNaturalRoot(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        const matches = [...eqv.matchAll(new RegExp(this.floatParamPattern.source, 'g'))].map(match => parseFloat(match[0]));
    
        if (matches.length !== 2) {
            throw new Error('Invalid number of matches for natural root operation');
        }
    
        let [number, exponent] = matches;
        exponent = exponent.toString().replace('.0', '');
    
        return this.natural_root(number, parseInt(exponent));
    }
    
    /**
     * Solves factorial operation
     * @description Solves factorial operation given as string
     * @param {string} eqv - Equation with factorial operation, represented as a string
     * @returns {number} The result of the factorial operation
     * @throws {EqvFormatError} Thrown when eqv is not a string with valid factorial operation format
     * @throws {FactorialValueError} Thrown when invalid number of reg exp matches for factorial operation is found
     * @see FactorialValueError
     * @see EqvFormatError
     */
    _solveFactorial(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        const matches = [...eqv.matchAll(new RegExp(this.intPattern.source, 'g'))].map(match => parseInt(match[0]));
    
        if (matches.length !== 1) {
            throw new FactorialValueError('Invalid number of matches for factorial operation');
        }
    
        const [number] = matches;
    
        return this._factorial(number);
    }
    
    /**
     * Solves logarithm operation
     * @description Solves logarithm operation given as string
     * @param {string} eqv - Equation with logarithm operation, represented as a string
     * @returns {number} The result of the logarithm operation
     * @throws {EqvFormatError} Thrown when eqv is not a string with valid logarithm operation format
     * @throws {Error} Thrown when invalid number of reg exp matches for factorial operation is found
     * @see ExponentTypeError
     */
    _solveLog(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        const matches = [...eqv.matchAll(new RegExp(this.floatParamPattern.source, 'g'))].map(match => parseFloat(match[0]));
    
        if (matches.length !== 2) {
            throw new Error('Invalid number of matches for log operation');
        }
    
        const [base, number] = matches;
    
        return this._log(base, number);
    }
    
    /**
     * Solves complex equations
     * @description Solves complex equations with power, root, factorial and logarithm operations
     * @param {string} eqv - Equation with complex math operations, represented as a string
     * @returns {Array} Array with the result of the equation and a boolean value indicating if the equation was solved
     * @throws {EqvFormatError} Thrown when eqv is not a string
     * @see _solvePow
     * @see _solveNaturalRoot
     * @see _solveFactorial
     * @see _solveLog
     * @see EqvFormatError
     */
    _solveComplexEquations(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        const operations = [
            this._solvePow.bind(this),
            this._solveNaturalRoot.bind(this),
            this._solveFactorial.bind(this),
            this._solveLog.bind(this)
        ];
    
        let didSomething = false;
    
        // Match all the complex math patterns
        for (let idx = 0; idx < this.complexMathPatterns.length; idx++) {
            let pattern = this.complexMathPatterns[idx];
            let matches = [...eqv.matchAll(new RegExp(pattern, 'g'))].map(match => match[0]);
            if (matches.length > 0) {
                // Perform the relevant operation
                let fun = operations[idx];
                for (let match of matches) {
                    // Get the character preceding the match
                    var matchIndex = eqv.indexOf(match);
                    var precedingChar = eqv.charAt(matchIndex - 1);
                    var nextChar = eqv.charAt(matchIndex + match.length);
                    
                    // Check if the preceding character is one of +-*/ or ( and the next character is one of +-*/ or )
                    if (
                        (/[+\-*/()]/.test(precedingChar) || matchIndex === 0) && 
                        (/[+\-*/()]/.test(nextChar) || matchIndex + match.length === eqv.length)
                    ){
                        // Calculate the result of the operation
                        let result = fun(match);
                        // Replace the matched substring with the modified version
                        eqv = eqv.replace(match, String(result));
                        didSomething = true;
                    } else {
                        // Do something else, maybe throw an error or handle the case differently
                        throw new EqvFormatError('eqv must be a valid equation');
                    }
                }
            }
        }
        
        return [eqv, didSomething];
    }
    
    /**
     * Finds the lowest bracket in the equation
     * @description Finds the lowest bracket in the equation and returns it
     * @param {string} eqv - Equation with brackets, represented as a string
     * @returns {string} The lowest bracket in the equation
     * @throws {EqvFormatError} Thrown when eqv is not a string
     * @see EqvFormatError
     */
    _findLowestBracket(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        let lastKnownBracketIndex = -1;
        let idx = 0;
        for (idx = 0; idx < eqv.length; idx++) { // basically go, until we find the first ) or ] or }
            let letter = eqv[idx];
    
            if (letter === '(' || letter === '[' || letter === '{') 
                lastKnownBracketIndex = idx;
    
            if (letter === ')' || letter === ']' || letter === '}') 
                break;
        }
    
        let newEqv = eqv.substring(lastKnownBracketIndex, idx + 1);
    
        if (this.eqvPattern.test(newEqv)) 
            return newEqv;
    
        return null;
    }

    /**
     * Solves one equation with basic math operations
     * @description Solves one equation with basic math operations given as string
     * @param {string} eqv - Equation with basic math operations, represented as a string
     * @returns {number} The result of the equation
     * @throws {EqvFormatError} Thrown when eqv is not a string with valid equation format
     * @see EqvFormatError
     */
    _solveOneEquationBasicMath(eqv) {
        if (typeof eqv !== 'string') 
            throw new EqvFormatError('eqv must be a string');

        // since this function is used at the end, this could be the input, which needs to be valid
        if (eqv === "(NaN)" || eqv === "(Infinity)" || eqv === "(-Infinity)") 
            return eqv;
    
        if (!this.eqvPattern.test(eqv)) 
            throw new EqvFormatError('eqv must be a valid equation');
    
        let removeBrackets = eqv[0] in { '(': ')', '[': ']', '{': '}' } && this.matchingBrackets[eqv[0]] !== eqv.slice(-1);
        if (removeBrackets) {
            eqv = eqv.slice(1, -1);
        }
    
        var allNumbers = [...eqv.matchAll(new RegExp(this.floatPattern, 'g'))].map(match => parseFloat(match[0]));
        var allOperators = [...eqv.matchAll(new RegExp(this.basicOperatorPattern, 'g'))].map(match => match[0]);

        let idx = 0;
        let amountOfSteps = allOperators.length;

        // we need to check, if the user has added the sing inform of the first number
        if (allOperators.length == allNumbers.length) {

            // check if the first operator is * or /, which means, it is not valid
            if (allOperators[0] == '*' || allOperators[0] == '/') 
                throw new EqvFormatError('eqv must be a valid equation');
            
            // check if the first operator is - or +, which means, it is valid, update the first number
            allNumbers[0] = allNumbers[0] * (allOperators[0] == '-' ? -1 : 1);
            allOperators.splice(0, 1);
        }

        // calulate the eq, first the * and /
        for (let i = 0; i < amountOfSteps; i++) {
            let operator = allOperators[idx];
            let result;
            if (operator == '*' || operator == '*+') {
                result = this._multiply(allNumbers[idx], allNumbers[idx + 1]);
            } else if (operator == '/' || operator == '/+') {
                result = this._divide(allNumbers[idx], allNumbers[idx + 1]);
            } else if (operator == '*-') {
                result = this._multiply(allNumbers[idx], -allNumbers[idx + 1]);
            } else if (operator == '/-') {
                result = this._divide(allNumbers[idx], -allNumbers[idx + 1]);
            } else {
                idx++;
            }
            
            if (operator == '*' || operator == '/') {
                allNumbers[idx] = result;
                allNumbers.splice(idx + 1, 1);
                allOperators.splice(idx, 1);
            }
        }

        // now we can calculate the + and -
        let sum = parseFloat(allNumbers[0]);
        for (let i = 0; i < allOperators.length; i++) {
            let operator = allOperators[i];
    
            if (operator === '+') 
                sum = this._add(sum, parseFloat(allNumbers[i + 1]));
            else 
                sum = this._subtract(sum, parseFloat(allNumbers[i + 1]));
        }
        return sum;
    }

    /**
     * Solves an equation
     * @description Solves an equation given as string, uses built-in methods to solve complex math operations
     * @param {string} eqv - Equation to be solved, represented as a string
     * @returns {number} The result of the equation
     * @throws {EqvFormatError} Thrown when eqv is not a string with valid equation format
     * @throws {DivisionByZeroError} Thrown when division by zero is attempted
     * @throws {ExponentTypeError} Thrown when base or exponent of a power operation are not numbers
     * @throws {FactorialValueError} Thrown when the value of the factorial is not a number or is negative
     * @throws {RangeError} Thrown when base is negative and exponent is even
     * @see _findLowestBracket
     * @see _solveOneEquationBasicMath
     * @see _solveComplexEquations
     * @see EqvFormatError
     * @see DivisionByZeroError
     * @see ExponentTypeError
     * @see FactorialValueError
     * @see RangeError
     * @example
     * let mathEngine = new MathEngine();
     * mathEngine.solveEquation('2 + 3 * 4'); // -> 14
     * mathEngine.solveEquation('2 + 3 / 4'); // -> 2.75
     * mathEngine.solveEquation('pow(2, 3)'); // -> 8
     * ...
     */
    solveEquation(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        eqv = eqv.replace(/\s/g, ''); // replace all spaces with nothing
    
        if (this.debug) {
            console.log(`---------------\n${eqv}\n---------------\n`);
        }

        let counter = 0;

        // main loop
        while (true) {
            // find the lowest bracket, if found, solve it
            let bracketEqv = this._findLowestBracket(eqv);
            if (bracketEqv) {
                let result = this._solveOneEquationBasicMath(bracketEqv);
                eqv = eqv.replace(bracketEqv, String(result));
            }
            // solve complex equations
            let [newEqv, status] = this._solveComplexEquations(eqv);

            if (this.debug) 
                console.log(` - equation after round of processing -> ${newEqv}\n`);
            
            if (!status && !bracketEqv) 
                break;

            eqv = newEqv;
            if (counter > 100000) 
                throw new Error('Infinite loop detected');
            counter++;
        }

        // Nan

        let openingBracketIdx = 0;
        let closingBracketIdx = eqv.length - 1;

        // checking for bracktes formating
        while (true) {

            let con1 = false;
            let con2 = false;
            
            // find the firt bracket
            for (let j = openingBracketIdx; j < closingBracketIdx; j++) {
                if (['(', '[', '{'].includes(eqv[j])) {
                    openingBracketIdx = j;
                    con1 = true;
                    break;
                }
            }
            // find closing bracket
            for (let k = closingBracketIdx; k > openingBracketIdx; k--) {
                if ([')', ']', '}'].includes(eqv[k])) {
                    closingBracketIdx = k;
                    con2 = true;
                    break;
                }
            }

            if (!con1 && !con2)  // no more brackets found, defound exit
                break;
            
            if (con1 && con2) // in this case, the eqv might have the right brackets, but it may not be formated correctally
                break;

            if (openingBracketIdx > closingBracketIdx) // fist ) found before (
                throw new EqvFormatError('eqv must be a valid equation');

            if (!con1 || !con2) // one bracket found, but not the other
                throw new EqvFormatError('eqv must be a valid equation');
        }
        
        if (this.debug) 
            console.log('\n\nfinal equation -> ', eqv);
    
        return this._solveOneEquationBasicMath(`(${eqv})`);
    }
}

// Export the MathEngine class and custom exceptions as a CommonJS modules
module.exports = {MathEngine, EqvFormatError, DivisionByZeroError, ExponentTypeError};

