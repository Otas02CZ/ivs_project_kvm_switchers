/**
 * @file profiling.js
 * @description Script for profiling the MathEngine class using standard deviation of numbers read from stdin.
 * @summary Script for profiling the MathEngine class.
 * @module profiling
 * @requires MathEngine
 * @requires readline
 * @author Martin Mendl
 * @author Otakar Kočí - only changes in documentation
 * @author Team KVM Switchers FIT BUT
 * @license GNU GPL v3
 */
//FILE:             profiling.js
//AUTHORS:          Martin Mendl <x247581@stud.fit.vutbr.cz>
//                  Otakar Kočí <xkocio00@stud.fit.vutbr.cz> only changes in documentation
//                  <>
//TEAM:             KVM Switchers FIT BUT
//LICENSE:          GNU GPL v3
//CREATED:          31/03/2024
//LAST MODIFIED:    15/04/2024
//DESCRIPTION:      Script for profiling the MathEngine class using standard deviation of numbers read from stdin.


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const {
    MathEngine,
    EqvFormatError,
    DivisionByZeroError,
    ExponentTypeError
  } = require('./math_engine.js');

const data = [];

if (process.stdin.isTTY) 
    console.log("Enter numbers (press enter without typing anything to finish):");


rl.on('line', (input) => {
    if (input === '') {
        rl.close(); // Close the readline interface when the user presses enter without typing anything
    } else {
        data.push(input);
    }
});

rl.on('close', () => {
    console.log("Numbers entered:", data);
    const mathEngine = new MathEngine(debug=false);

    // calculate x_not
    let x_not_eq = `((${data.join('+')})/${data.length})`;

    let deviation_eq = '(';
    for (let i = 0; i < data.length; i++) {
        if (i > 0) 
            deviation_eq += ' + ';
        deviation_eq += `pow(${data[i]}, 2)`
    }
    deviation_eq += `) - ${data.length} * pow(${x_not_eq}, -2)`;
    deviation_eq = `root( ( 1 / (${data.length} - 1) * (${deviation_eq})), 2)`
    
    console.log("full equasion", deviation_eq);
    let deviation = mathEngine.solveEquation(deviation_eq);
    console.log("Standard deviation:", deviation);
});
