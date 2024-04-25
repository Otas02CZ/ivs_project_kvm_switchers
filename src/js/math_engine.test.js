//FILE:           math_engine.test.js
//AUTHORS:        Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
//                Martin Mendl <x247581@stud.fit.vutbr.cz>
//                <>
//TEAM:           KVM Switchers FIT BUT
//LICENSE:        GNU GPL v3
//CREATED:        20/03/2024
//LAST MODIFIED:  16/04/2024
//DESCRIPTION:    Tests for calculator math library using the Jest testing framework

/*
Expects math_engine module with class MathEngine that has public method solveEquation
which takes a string representation of an equation and returns numeric result or throws Errors
It expects support of addition, subtraction, multiplication, division, factorial,
power [pow(base, exp)], natural root [root(base, exp)], natural logarithm [log(base, value)]
and can work with brackets
*/

// can be run with npm test in src directory

const {
  MathEngine,
  EqvFormatError,
  DivisionByZeroError,
  ExponentTypeError
} = require('./math_engine.js');

describe('MathObject', () => {
  let mathEngine;

  beforeEach(() => {
    mathEngine = new MathEngine(debug=false);
  });

  test("Invalid input test           ''         = error", () => {
    expect(() => mathEngine.solveEquation("")).toThrow(EqvFormatError);
  });

  test("Invalid input test         'asdf'       = error", () => {
    expect(() => mathEngine.solveEquation("asdf")).toThrow(EqvFormatError);
  });

  test("Invalid input test    '2 +a 3 + 4 + 5'  = error", () => {
    expect(() => mathEngine.solveEquation("2 +a 3 + 4 + 5")).toThrow(EqvFormatError);
  });

  test("Addition test         '2 + 10'          = 12", () => {
    const result = mathEngine.solveEquation("2 + 10");
    expect(result).toBe(12);
  });

  test("Addition test extreme '1+1+1+1+...+1+1' = 200", () => {
    const result = mathEngine.solveEquation("1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1")
  })

  test("Subtraction test      '5 - 3'           = 2", () => {
    const result = mathEngine.solveEquation("5 - 3");
    expect(result).toBe(2);
  });

  test("Multiplication test   '4 * 3'           = 12", () => {
    const result = mathEngine.solveEquation("4 * 3");
    expect(result).toBe(12);
  });

  test("Division test         '10 / 2'          = 5", () => {
    const result = mathEngine.solveEquation("10 / 2");
    expect(result).toBe(5);
  });

  test("Division by zero test '10 / 0'          = error", () => {
    expect(() => mathEngine.solveEquation("10 / 0")).toThrow(DivisionByZeroError);
  });

  test("Factorial test        '5!'              = 120", () => {
    const result = mathEngine.solveEquation("5!");
    expect(result).toBe(120);
  });

  test("Factorial test        '0!'              = 1", () => {
    const result = mathEngine.solveEquation("0!");
    expect(result).toBe(1);
  });

  test("Factorial wrong input '1.5!'            = error", () => {
    expect(() => mathEngine.solveEquation("1.5!")).toThrow(EqvFormatError);
  });

  test("Power test            'pow(4, 2)'       = 16", () => {
    const result = mathEngine.solveEquation("pow(4, 2)");
    expect(result).toBe(16);
  });

  test("Power test            'pow(4, 0)'       = 1", () => {
    const result = mathEngine.solveEquation("pow(4, 0)");
    expect(result).toBe(1);
  });

  test("Power test            'pow((-2+3), 2)'      = 4", () => {
    const result = mathEngine.solveEquation("pow((-2+3), -2)");
    expect(result).toBe(1);
  });

  test("Power test            'pow((-2), 2)'      = 4", () => {
    const result = mathEngine.solveEquation("pow((-2), 2)");
    expect(result).toBe(4);
  });

  test("Power test           'pow(2, -2)'      = 0.25", () => {
    const result = mathEngine.solveEquation("pow(2, -2)");
    expect(result).toBe(0.25);
  });
  
  test("Natural root test     'root(4, 2)'      = 2", () => {
    const result = mathEngine.solveEquation("root(4, 2)");
    expect(result).toBe(2);
  });

  test("Invalid root test     'root(4, -2.5)'   = error" , () => {
    expect(() => mathEngine.solveEquation("root(4, -2.5)")).toThrow(EqvFormatError)
  })

  test("Valid root    'root(-8, 3)'   = -2" , () => {
    const result = mathEngine.solveEquation("root(-8, 3)");
    expect(result).toBe(-2);
  })
  
  test("Natural root test     'root(4, 0)'      = error", () => {
    expect(() => mathEngine.solveEquation("root(4, 0)")).toThrow(ExponentTypeError);
  });

  test("Log test              'log(10, 100)'    = 2", () => {
    const result = mathEngine.solveEquation("log(10, 100)");
    expect(result).toBe(2);
  });

  test("Log test              'log(10, 1)'      = 0", () => {
    const result = mathEngine.solveEquation("log(10, 1)");
    expect(result).toBe(0);
  });

  test("Log test              'log(10, 0)'      = error", () => {
    expect(() => mathEngine.solveEquation("log(10, 0)")).toThrow(RangeError);
  });

  test("Log test              'log(0, 100)'     = error", () => {
    expect(() => mathEngine.solveEquation("log(0, 100)")).toThrow(RangeError);
  });

  test("Complex equation 1:   '2 + 3 * 4'           = 14", () => {
    const result = mathEngine.solveEquation("2 + 3 * 4");
    expect(result).toBe(14);
  });

  test("Comple equation 2:    '2*2*2*2*2*2*2*2'     = 256", () => {
    const result = mathEngine.solveEquation("2*2*2*2*2*2*2*2");
    expect(result).toBe(256);
  });

  test("Complex equation 2:   '5 - 2 / 2'           = 4", () => {
    const result = mathEngine.solveEquation("5 - 2 / 2");
    expect(result).toBe(4);
  });

  test("Complex equation 3:   '4 * (7 - 3)'         = 16", () => {
    const result = mathEngine.solveEquation("4 * (7 - 3)");
    expect(result).toBe(16);
  });

  test("Complex equation 4:   '10 / ((((3 + 1))))'        = 2.5", () => { 
    const result = mathEngine.solveEquation("10 / (3 + 1)");
    expect(result).toBe(2.5);
  });

  test("Invalid brackets:     '10 / ((((3 + 1))'         = error", () => {
    expect(() => mathEngine.solveEquation("10 / ((((3 + 1))")).toThrow(EqvFormatError);
  });

  test("Invalid brackets:     '10 / ((((3 + 1'         = error", () => {
    expect(() => mathEngine.solveEquation("10 / ((((3 + 1))")).toThrow(EqvFormatError);
  });

  test("Invalid brackets:     '10 / ((((3 + 1]}))'         = error", () => {
    expect(() => mathEngine.solveEquation("10 / ((((3 + 1))")).toThrow(EqvFormatError);
  });

  test("Invalid brackets:     '10 / [(((3 + 1))))'         = error", () => {
    expect(() => mathEngine.solveEquation("10 / ((((3 + 1))")).toThrow(EqvFormatError);
  });

  test("Complex equation 4:   '10 / (3 + 1)'        = 2.5", () => {
    const result = mathEngine.solveEquation("10 / (3 + 1)");
    expect(result).toBe(2.5);
  });

  test("Complex equation 5:   '2 + pow(3, 2) * root(16, 4)'             = 20", () => {
    const result = mathEngine.solveEquation("2 + pow(3, 2) * root(16, 4)");
    expect(result).toBe(20);
  });

  test("Complex equation 6:   '5 - log(100, 10) / 2'                    = 4.75", () => {
    const result = mathEngine.solveEquation("5 - log(100, 10) / 2");
    expect(result).toBe(4.75);
  });

  test("Complex equation 7:   '4 * (7 - 3!)'                            = 4", () => {
    const result = mathEngine.solveEquation("4 * (7 - 3!)");
    expect(result).toBe(4);
  });

  test("Complex equation 8:   '10 / (3 + 1) - pow(2, 3)'                = -5.5", () => {
    const result = mathEngine.solveEquation("10 / (3 + 1) - pow(2, 3)");
    expect(result).toBe(-5.5);
  });

  test("Complex equation 9:   '6 + 8 - log(100, 10) * (5 - 2)'          = 12.5", () => {
    const result = mathEngine.solveEquation("6 + 8 - log(100, 10) * (5 - 2)");
    expect(result).toBe(12.5);
  });

  test("Complex equation 10:  '2 + pow((3 + 2), 2) * root(16, (4 - 1))'       = 64.996052 (rounded to 6d)", () => {
    const result = mathEngine.solveEquation("2 + pow((3 + 2), 2) * root(16, (4 - 1))");
    expect(+result.toFixed(6)).toBe(64.996052);
  });

  test("Complex equation 11:  '5 - log(100, ((10 + 2) * 2)) / 2'              = 4.654947 (rounded to 6d)", () => {
    const result = mathEngine.solveEquation("5 - log(100, ((10 + 2) * 2)) / 2");
    expect(+result.toFixed(6)).toBe(4.654947);
  });

  test("Complex equation 12:  '4 * (7 - 3!) / (2 + pow(2, (3 - 1)))'          = 0.666667", () => {
    const result = mathEngine.solveEquation("4 * (7 - 3!) / (2 + pow(2, (3 - 1)))");
    expect(+result.toFixed(6)).toBe(0.666667);
  });

  test("Complex equation 13:  '(10 / (3 + 1)) - pow((2 + 1), 3)'           = -24.5", () => {
    const result = mathEngine.solveEquation("(10 / (3 + 1)) - pow((2 + 1), 3)");
    expect(result).toBe(-24.5);
  });

  test("Complex equation 14:  '(6 + 8) - log(100, (10 * (5 - 2)))'           = 13.261439", () => {
    const result = mathEngine.solveEquation("(6 + 8) - log(100, (10 * (5 - 2)))");
    expect(+result.toFixed(6)).toBe(13.261439);
  });

  test("Complex equation 15:  '2 + pow(((3 + 2) * 4 - 1), 2) * root(16, (4 - 1)) / (3 + 2)'                           = 183.932600 (rounded to 6d)", () => {
    const result = mathEngine.solveEquation("2 + pow(((3 + 2) * 4 - 1), 2) * root(16, (4 - 1)) / (3 + 2)");
    expect(+result.toFixed(6)).toBe(183.932600);
  });

  test("Complex equation 16:  '5 - log(100, ((10 + 2) * 2)) / (2 * 3) + 7!'                                           = 5044.884982 (rounded to 6d)", () => {
    const result = mathEngine.solveEquation("5 - log(100, ((10 + 2) * 2)) / (2 * 3) + 7!");
    expect(+result.toFixed(6)).toBe(5044.884982);
  });

  test("Complex equation 17:  '4 * (7 - 3!) / (2 + pow(2, (3 - 1))) - root(64, 3) + log(1000, (pow(3, 2) + 1))'       = -3.000000 (rounded to 6d)", () => {
    const result = mathEngine.solveEquation("4 * (7 - 3!) / (2 + pow(2, (3 - 1))) - root(64, 3) + log(1000, (pow(3, 2) + 1))");
    expect(+result.toFixed(6)).toBe(-3.000000);
  });

  test("Complex equation 18:  '(10 / (3 + 1)) - pow((2 + 1), 3) * root(64, (2 - 1)) + 5!'                             = -1605.5", () => {
    const result = mathEngine.solveEquation("(10 / (3 + 1)) - pow((2 + 1), 3) * root(64, (2 - 1)) + 5!");
    expect(result).toBe(-1605.5);
  });

  test("Complex equation 19:  '((6 + 8) - log(100, (10 * (5 - 2)))) * pow(2, 3) / (3 - 1)'                            = 53.045757 (rounded to 6d)", () => {
    const result = mathEngine.solveEquation("((6 + 8) - log(100, (10 * (5 - 2)))) * pow(2, 3) / (3 - 1)");
    expect(+result.toFixed(6)).toBe(53.045757);
  });

});