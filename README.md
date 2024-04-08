<h1 align="center">IVS Project 2</h1>

<p align="center">
    <img alt="Static Badge" src="https://img.shields.io/badge/-Python_3-blue?style=flat&logo=python&logoColor=white&labelColor=black">
    <img alt="Static Badge" src="https://img.shields.io/badge/-Electron-blue?style=flat&logo=electron&logoColor=white&labelColor=black">
    <img alt="Static Badge" src="https://img.shields.io/badge/-HTML5-blue?style=flat&logo=html5&logoColor=white&labelColor=black">
    <img alt="Static Badge" src="https://img.shields.io/badge/-CSS-blue?style=flat&logo=css3&logoColor=white&labelColor=black">
    <img alt="Static Badge" src="https://img.shields.io/badge/-JavaScript-blue?style=flat&logo=javascript&logoColor=white&labelColor=black">
    <img alt="Static Badge" src="https://img.shields.io/badge/license-GNU--GPL_v3-blue?style=flat&logo=gpl3&logoColor=white&labelColor=black">
    <br>
    <h4 align="center">Environment</h3>
    <p align="center">
        <img alt="Static Badge" src="https://img.shields.io/badge/-Ubuntu_64--bit-blue?style=flat&logo=ubuntu&logoColor=white&labelColor=black">
    </p>
    <br>
</p>

<p align="center">Our take on the second project from the Practical Aspects of Software Design subject.</p>
<br>

## Authors
Team KVM Switchers
- [xvalenk00 | @chadmee](https://www.github.com/chadmee)
- [xkocio00 | @Otas02CZ](https://www.github.com/Otas02CZ)
- [xmendlm00 | @Mr-Annonym](https://www.github.com/Mr-Annonym)


## Documentation
This section provides a concise overview of the project's functionality and features. It outlines how to use the calculator, including descriptions of supported mathematical operations such as addition, subtraction, multiplication, and division. Additionally, it covers more advanced functionalities like factorial computation, exponentiation with natural exponents, and general root extraction.

Find the documentation [here.](https://www.google.com/)

## Math engine library

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

To be implemented in file ```/src/math_engine.js```
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

### Testing the library

Unit tests for the specified library interface are written using Jest framework in file ```/src/math_engine.test.js```. 

The tests can be run using ```npx jest``` when in the ```src``` directory. Dependencies defined in ```package.json``` must be installed using ```npm install``` in order to run these tests.


Currently only tests for basic and complex features are written. Testing for edge cases and exceptions will come in the future.


## Environment

Using CommonJS module format.

<!---

To integrate the math engine, follow the example usage below:

```javascript
var dopln();
```

## Deployment

To successfully deploy the project from the source-code, run:

```bash
  npm run deploy
```

## Demo

Add demo gifs/pictures here.
-->

## Miscellaneous

[Project motivation](https://youtu.be/UR7tujNjfo4)

<iframe width="560" height="315" src="https://www.youtube.com/embed/UR7tujNjfo4?si=VYwEp-ytMsbVFIvd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>