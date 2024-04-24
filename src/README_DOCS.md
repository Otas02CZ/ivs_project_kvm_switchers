# Calculator by KVM Switchers
This is code documentation for the Calculator app made by team KVM Switchers as part of subject IVS at BUT FIT.

## Project Homepage

Project resides here - [Calculator - KVM Switchers](https://github.com/Otas02CZ/ivs_project_kvm_switchers)

## Authors

-   **Otakar Kočí** known as [Otas02CZ](https://github.com/Otas02CZ) | *xkocio00*
-   **Kryštof Valenta** known as [chadmee](https://github.com/chadmee) | *xvalenk00*
-   **Martin Mendl** known as [Mr-Annonym](https://github.com/Mr-Annonym) | *xmendlm00*

## Information about the project

Our calculator is an Electron application that is using our library MathEngine.

Currently only a minimal subset of features that Electron provides is used, as our app is just a self contained webpage that uses Electron
to run as desktop application. 

## MathEngine library

Math engine library evaluates string based equations with support for these operations:

Operation           |   Format      
--------------      |-------------------
addition            | 6 + 1
subtraction         | 5 - 4
multiplication      | 12 * 2
division            | 6 / 2
power               | pow(base, exponent)
natural root        | root(base, exponent)
factorial           | 6!
natural logarithm   | log(base, value)

### Math engine library interface

Is implemented in file ```/src/js/math_engine.js```
```javascript
class MathEngine {

  ...
  // inner implementation
  ...

  //takes equation defined in string and returns string with result or throws an error
  solveEquation(equation) {
    return string_with_result;
  }

  ...
  // inner implementation
  ...

}

...

modules.exports = MathEngine;
```
Exceptions in the Math Engine Library:

| Exception | Error Message |
|-----------|---------------|
| EqvFormatError | equation format must be valid |
| RangeError | value must be within a range |
| DivisionByZeroError | divisor value must not be 0 |
| TypeError | values must be numbers |
| FactorialValueError | incorrect input for factorial |