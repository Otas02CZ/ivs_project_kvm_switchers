//FILE:           math_engine.js
//AUTHOR          Martin Mendl <x247581@stud.fit.vutbr.cz>
//TEAM            KVM Switchers FIT BUT
//CREATED:        21/03/2024
//LAST MODIFIED:  21/03/2024
//DESCRIPTION:    Math engine for solving equations and basic math operations, including complex math operations like power, root, factorial and logarithm

/*
The MathObject class is a class that contains methods for solving equations and basic math operations, including complex math operations like power, root, factorial and logarithm.
The main method of this class is solveEquation, which takes an equation as a string and returns the result of the equation as a number. or throws an error if the equation is invalid.
Usage:
    let mathEng = new MathEngine();
    mathEng.solveEquation('2 + 3 * 4'); // 14
    mathEng.solveEquation('2 + 3 / 4'); // 2.75
    ...
*/

class ExponentTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExponentTypeError'
    }
}

class EqvFormatError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EqvFormatError';
    }
}

class DivisionByZeroError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DivisionByZeroError';
    }
}

class FactorialValueError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FactorialValueError';
    }
}

class MathEngine {
    /*
    @brief Constructor for the MathObject class
    @param debug A boolean value to enable or disable debug mode
    @return None
    */
    constructor(debug = false) {
        this.matchingBrackets = {
            '(': ')',
            '[': ']',
            '{': '}'
        };

        // Matches equations in the form of (digits operator digits operator ...)
        this.eqvPattern = /[\(\{\[]\d+(?:\.\d+)?(?:e[+-]\d+)?([-+*/]\d+(?:\.\d+)?(?:e[+-]\d+)?)*[\)\}\]]/;
        
        // Matches only int numbers
        this.intPattern = /\d+(?!\.\d+)/;

        // Matches positive floating point numbers
        this.positiveFloatPattern = /\d+(?:\.\d+)?/;

        // Matches floating point numbers including negative numbers and exponential notation
        this.floatPattern = /\d+(?:\.\d+)?(?:e[+-]\d+)?/;

        // similar to ablove, but no including negative numbers
        this.floatParamPattern = /-?\d+(?:\.\d+)?(?:e[+-]\d+)?/;

        // Matches basic arithmetic operators: +, -, *, /
        this.basicOperatorPattern = /[-+*/]/;

        // Matches power function expressions in the form of pow(x, y)
        this.powerPattern = /pow\(-?\d+(?:\.\d+)?(?:e[+-]\d+)?,-?\d+(?:\.\d+)?(?:e[+-]\d+)?\)/;

        // Matches natural root function expressions in the form of root(x, n)
        this.naturalRootPattern = /root\(-?\d+(?:\.\d+)?(?:e[+-]\d+)?,\d+(?:.0)?\)/;

        // Matches factorial expressions like 5!
        this.factorialPattern = /(?<!\d+\.)\d+!/;

        // Matches logarithm function expressions in the form of log(base, x)
        this.logPattern = /log\(\d+(?:\.\d+)?(?:e\+\d+)?,\d+(?:\.\d+)?(?:e[+-]\d+)?\)/;


        this.complexMathPatterns = [
            this.powerPattern,
            this.naturalRootPattern,
            this.factorialPattern,
            this.logPattern
        ];

        this.debug = debug;
    }


    /*
    @brief Adds two numbers
    @param a The first number
    @param b The second number
    @return The sum of a and b
    */
    _add(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('a and b must be numbers');
        }

        return a + b;
    }

    /*
    @brief Subtracts two numbers
    @param a The first number
    @param b The second number
    @return The difference of a and b
    */
    _subtract(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('a and b must be numbers');
        }

        return a - b;
    }

    /*
    @brief Multiplies two numbers
    @param a The first number
    @param b The second number
    @return The product of a and b
    */
    _multiply(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('a and b must be numbers');
        }

        return a * b;
    }


    /*
    @brief Divides two numbers
    @param a The first number
    @param b The second number (not 0)
    @return The quotient of a and b
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

    /*
    @brief Raises a number to the power of another number
    @param base The base number
    @param exponent The exponent
    @return The result of base raised to the power of exponent
    */
    _power(base, exponent) {
        if (typeof base !== 'number' || typeof exponent !== 'number') {
            throw new ExponentTypeError('base and exponent must be numbers');
        }

        return base ** exponent;
    }


    /*
    @brief Calculates the natural root of a number
    @param base The base number (not negative if exponent is even)
    @param exponent The exponent (exponent >= 0)
    @return The result of the natural root of base with exponent
    */
    natural_root(base, exponent) {
        if (typeof base !== 'number' || typeof exponent !== 'number') {
            throw new ExponentTypeError('base and exponent must be numbers');
        }
        if (!Number.isInteger(exponent)) {
            throw new ExponentTypeError('exponent must be an integer');
        }

        if (exponent < 0) {
            throw new ExponentTypeError('exponent must be greater than or equal to 0');
        }

        if (base < 0 && exponent % 2 === 0) {
            throw new RangeError('base must be greater than or equal to 0 if exponent is even');
        }

        return base ** (1 / exponent);
    }

    /*
    @brief Calculates the factorial of a number
    @param x The number (x >= 0, x is an integer)
    @return The factorial of x
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

    /*
    @brief Calculates the logarithm of a number
    @param base The base of the logarithm (base > 0, base != 1)
    @param x The number (x >= 0)
    @return The logarithm of x with base
    */
    _log(base, x) {
        if (typeof base !== 'number' || typeof x !== 'number') {
            throw new TypeError('base and x must be numbers');
        }

        if (x < 0) {
            throw new RangeError('x must be greater than or equal to 0');
        }

        if (base <= 0 ) {
            throw new RangeError('base must be greater than or equal to 0');
        }

        return Math.log(x) / Math.log(base);
    }


    /*
    @brief Solves complex math operations in an equation
    @param eqv The equation
    @return The equation after solving the complex math operations and a boolean value indicating if any operation was performed
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
    
    /*
    @brief Solves natural root operations in an equation
    @param eqv The equation
    @return The equation after solving the natural root operations and a boolean value indicating if any operation was performed
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
    
    /*
    @brief Solves factorial operations in an equation
    @param eqv The equation
    @return The equation after solving the factorial operations and a boolean value indicating if any operation was performed
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
    
    /*
    @brief Solves logarithm operations in an equation
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
                    let result = fun(match);
                    // Replace the math with the result
                    eqv = eqv.replace(match, String(result));
                    didSomething = true;
                }
            }
        }
    
        return [eqv, didSomething];
    }
    

    _findLowestBracket(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        let lastKnownBracketIndex = -1;
        let idx = 0;
        for (idx = 0; idx < eqv.length; idx++) {
            let letter = eqv[idx];
    
            if (letter === '(' || letter === '[' || letter === '{') {
                lastKnownBracketIndex = idx;
            }
    
            if (letter === ')' || letter === ']' || letter === '}') {
                break;
            }
        }
    
        let newEqv = eqv.substring(lastKnownBracketIndex, idx + 1);
    
        if (this.eqvPattern.test(newEqv)) {
            return newEqv;
        }
    
        return null;
    }

    _solveOneEquationBasicMath(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        if (!this.eqvPattern.test(eqv)) {
            throw new EqvFormatError('eqv must be a valid equation');
        }
    
        let removeBrackets = eqv[0] in { '(': ')', '[': ']', '{': '}' } && this.matchingBrackets[eqv[0]] !== eqv.slice(-1);
        if (removeBrackets) {
            eqv = eqv.slice(1, -1);
        }
    
        var allNumbers = [...eqv.matchAll(new RegExp(this.floatPattern, 'g'))].map(match => parseFloat(match[0]));
        var allOperators = [...eqv.matchAll(new RegExp(this.basicOperatorPattern, 'g'))].map(match => match[0]);

        let idx = 0;
        let amountOfSteps = allOperators.length;
        for (let i = 0; i < amountOfSteps; i++) {
            let operator = allOperators[idx];
            let result;
            if (operator == '*') {
                result = this._multiply(allNumbers[idx], allNumbers[idx + 1]);
            } else if (operator == '/') {
                result = this._divide(allNumbers[idx], allNumbers[idx + 1]);
            } else {
                idx++;
            }

            if (operator == '*' || operator == '/') {
                allNumbers[idx] = result;
                allNumbers.splice(idx + 1, 1);
                allOperators.splice(idx, 1);
            }
        }

        let sum = parseFloat(allNumbers[0]);
    
        for (let i = 0; i < allOperators.length; i++) {
            let operator = allOperators[i];
    
            if (operator === '+') {
                sum = this._add(sum, parseFloat(allNumbers[i + 1]));
            } else {
                sum = this._subtract(sum, parseFloat(allNumbers[i + 1]));
            }
        }
    
        return sum;
    }

    solveEquation(eqv) {
        if (typeof eqv !== 'string') {
            throw new EqvFormatError('eqv must be a string');
        }
    
        eqv = eqv.replace(/\s/g, ''); // replace all spaces with nothing
    
        if (this.debug) {
            console.log(`---------------\n${eqv}\n---------------\n`);
        }

        let counter = 0;
    
        while (true) {
            let bracketEqv = this._findLowestBracket(eqv);
            if (bracketEqv) {
                let result = this._solveOneEquationBasicMath(bracketEqv);
                eqv = eqv.replace(bracketEqv, String(result));
            }
            let [newEqv, status] = this._solveComplexEquations(eqv);
    
            if (this.debug) {
                console.log(` - equation after round of processing -> ${newEqv}\n`);
            }
    
            if (!status && !bracketEqv) {
                break;
            }
            eqv = newEqv;
            if (counter > 10) {
                throw new Error('Infinite loop detected');
            }
            counter++;
        }

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

            if (!con1 && !con2) { // no more brackets found, defound exit
                break;
            }

            if (con1 && con2) // in this case, the eqv might have the right brackets, but it may not be formated correctally
                break ;

            if (openingBracketIdx > closingBracketIdx) // fist ) found before (
                throw new EqvFormatError('eqv must be a valid equation');

            if (!con1 || !con2) // one bracket found, but not the other
                throw new EqvFormatError('eqv must be a valid equation');

        }
        
        // need to test, if the equations has the same amount of opening and closing brackets ?

        if (this.debug) {
            console.log('\n\nfinal equation -> ', eqv);
        }
    
        return this._solveOneEquationBasicMath(`(${eqv})`);
    }

}

module.exports = {MathEngine, EqvFormatError, DivisionByZeroError};

