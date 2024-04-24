# Help
---

This is short built-in help page covering only the basic usage of the calculator. Please visit the online [user docs](https://github.com) for more detailed overview of features and capabilities of this app.

## Table of Contents
- [Functionality](#functionality)
- [Quick Overview](#quick-overview)
- [Input](#input)
- [Example usage](#example-usage)
- [Usage tips](#usage-tips)


## Functionality
Supported operations:
- addition
- subtraction
- multiplication
- division
- factorial
- power (nat exp)
- root
- logarithm

This application also supports brackets and calculation of nested expressions.

Supported bracket types:
- `( )`
- `[ ]`
- `{ }`

For advanced function calls only `( )` brackets can be used.

Built-in constants:
- `pi`
- `e`

## Quick overview
The main window consists of these parts (Top to Bottom):
- The top bar with the menu icon
- Input, result and history panel
- Basic operation panel
- Toggle for advanced operations panel

### Menu
The menu toggle displays the following menu:
- **About** - shows basic info about the app
- **Help**  - shows this help page
- **User Docs** - link to website with user docs
- **Clear history** - clears history records

### Input, Results and History
- Above the operations panel is an input field for your expressions.
- Above it resides a history and results panel. The last result is always viewed at the bottom. The results panel is also used to display errors.
- The panel of basic (and advanced) operations allows the user to easily insert mathematical expressions into the input field.


## Input
The calculator accepts inputs from the operations panels and from keyboard.
If for any reason you can not input by typing on the keyboard, try clicking into the input field once.

All the buttons from panels and keyboard inputs insert at the position of your cursor in the input panel. To move the cursor use either arrow keys or your mouse.

Buttons for advanced operations (power, root and logarithm) always reposition your cursor to the place where the input number for the given operation is expected. Feel free to change the default exponents or bases of these operations.

## Supported Input Syntax
Calculator supports nested brackets and functions. Additional spaces are ommited.

Syntax of operations:

Operation | Syntax | Example
--- | --- | ---
add | x + y | 1 + 2
sub | x - y | 2 - 1
mul | x * y | 3 * 6
div | x / y | 2 * 42
pow | x^y | 2^2
root | root(base, exp) | root(4, 2)
fac | x! | 6|
log | log(base, value) | log(10, 100)

The brackets must be closed with the same type. For functions only `()` brackets can be used.
If you want to add a sub expression into a function call you must enclose it with brackets. More info can be found [here](#example-usage).

Constants:
- ***Pi*** - as `pi`, `π`, `Pi` or `PI`
- ***E*** - as `Eu`, `eu` or `EU`

## Example usage
A table with valid inputs with solutions:

Input | Result
--- | ---
(2*3)-(4/2) | 4
2*(3*(10+2)) | 72
1.6*2 | 3.25808
2^2 | 4
root(16, 2) | 4
log(10, 100) | 2
10! | 3628800
log(10, (10^2)) | 2
2*root((log(10, (4+6))+15), 2) | 8

## Usage tips
The buttons that insert the power operator `^` are context aware and reposition the cursor before the caret symbol only in case of no number or bracket being already present before it.

---



