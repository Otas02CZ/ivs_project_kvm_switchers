
# User Documentation

---

***Welcome to the User Docs of the Calculator app made by team KVM Switchers!***

Simplified and shortened version of this documentation is accessible in-app as the built-in help.
This full version can be accessed [online](https://otas02cz.github.io/ivs_project_kvm_switchers/) as well.

## Table of Contents

- [Functionality and Features](#functionality-and-features)
- [Requirements](#requirements)
- [Installation and Removal](#installation-and-removal)
- [Quick Overview](#quick-overview)
- [Input](#input)
- [Supported Input Syntax](#supported-input-syntax)
- [Example usage](#example-usage)
- [Usage tips](#usage-tips)

## Functionality and Features

The calculator supports these operations:

- addition
- subtraction
- multiplication
- division
- factorial
- power (with natural exponent)
- root
- logarithm

The calculator also supports brackets and calculation of nested expressions.
Example: `log(10, (20+60+(10+10)))*2^2`

Supported bracket types:

- `( )`
- `[ ]`
- `{ }`

For advanced function calls only `( )` brackets can be used.

Built-in constants:

- `pi`
- `e`

For more information see [input](#input), [supported syntax](#supported-input-syntax) and [example usage](#example-usage).

## Requirements

This is an Electron application mainly developed for Ubuntu 22.04 and Fedora 39, but there should not be any obstacle in running the app on other platforms. See [dev requirements](#development-requirements) and [manual installation and building](#manual-installation-and-building).

The installed application needs around 250 - 300 MB of storage space. The installers are below 100 MB.

If you choose to install the app via the packages available at [Project Realeases](https://github.com/Otas02CZ/ivs_project_kvm_switchers/releases), then there are no dependencies as the app is self contained.

#### Development requirements

If you would choose to build and or install the app manually, then the main dependency is the `nodejs` environment (using v20). For building and package creation you will also need `dpkg`, `rpm`, `make` and `fakeroot`. More at [manual installation and building](#manual-installation-and-building).

## Installation and removal

#### Using prebuilt packages

You can easily install the prebuilt packages for your system:

1. Download the package for your system (Ubuntu/Fedora) from [realeases](https://github.com/Otas02CZ/ivs_project_kvm_switchers/releases).
2. Open terminal in the folder with the downloaded packages.
3. On Ubuntu you can use command `sudo dpkg -i [package-name]`, authorize the action and confirm by `y` or `yes` if asked.
4. On Fedora you can use command `sudo dnf install [package-name]`, authorize the action and confirm by `y` or `yes` if asked.

Uninstallation can be done this way:

1. Open terminal window.
2. On Ubuntu type `sudo apt remove calculator_kvm_switchers`, authorize the action and confirm by `y` or `yes` if asked.
3. On Fedora type `sudo dnf remove calculator_kvm_switchers`, authorize the action and confirm by `y` or `yes` if asked.

#### Manual installation and building

These steps are written only for Ubuntu (v22.04). It is highly probable that these commands won't work as expected on other versions of Ubuntu or on different platforms. Please consult the documentation of your distribution or platform.

##### Resolving dependencies

Installing dependencies:

1. Open your terminal.
2. Run this command `sudo apt install curl dpkg fakeroot rpm make`, authorize the action and confirm by `y` or `yes` if asked.

If you have older version of nodejs (older than v20), uninstall it and then install version 20 by following this tutorial:

1. Open terminal
2. Run this command `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`. This is installation script for installing NVM (Node version manager).
3. Reopen your terminal or try this command for reloading the `PATH`: `source ~./.bashrc`.
4. Install nodejs v20 via this command: `nvm install 20`.

##### Building and creating packages

1. Download or clone the repository, navigate into the `/src` folder in the project and open terminal.
2. Run command `npm install`.
3. If you wish to launch and use the app in dev environment use `npm start`
4. In order to generate binary and packages run `npm run make`. If an error is shown indicating missing tools, please install them.
5. Now there are binaries and packages in folder `/dist` in the project folder. In subfolder starting with `calculator...` there is the application with its main runnable binary and in subfolder `make` there are packages for fedora and ubuntu.

##### Manual installation using the contents of the generated .deb file

Open the generated .deb package that can be found in `/dist/make/deb/x64/....name...deb` using archive manager that supports `.deb` files and extract it. Among the extracted files and folders should be folder `data.tar.zst` and in it at path `./` folder `usr`. Copy this folder as super user to the root of your filesystem. Your extracted `/usr` folder should overlap the root `/usr` folder.

You can also install it manually without the need of the `.deb` file. You will need to copy the contents of the folder with the generated binary (`/dist/calculator.../` in the project folder) to `/usr/lib/calculator-kvm-switchers`.

Then create a link to the binary `/usr/lib/calculator-kvm-switchers/calculator-kvm-switchers` in folder `/usr/bin/` of the same name (`calculator-kvm-switchers`).

Like this `sudo ln -s /usr/lib/calculator-kvm-switchers/calculator-kvm-switchers calculator-kvm-switchers`.

Make sure that all users have the rights to execute the binary (`sudo chmod 777 calculator-kvm-switchers`).

Then create file `/usr/share/applications/calculator-kvm-switchers.desktop` with these contents:

```
[Desktop Entry]
Name=calculator_kvm_switchers
Comment=Calculator app made in Electron. Created by team KVM Switchers
GenericName=calculator_kvm_switchers
Exec=calculator-kvm-switchers %U
Icon=calculator-kvm-switchers
Type=Application
StartupNotify=true
Categories=GNOME;GTK;Utility;
```

And also copy the icon from `/src/assets/icon.png` in project folder to folder `/usr/share/pixmaps/` and rename it to `calculator-kvm-switchers.png`.

For manual uninstallation simply remove all the created files.

##### Makefile

You can also use `make` to simplify this process.

1. Open terminal in project folder `/src` and run command `make install-dep`.
2. Reload your terminal `PATH` (for example by closing and reopening your terminal window).
3. Run command `make install` to install required node packages.
4. Now you can run `make run` to run the app in dev mode or `make build` to produce binaries and ubuntu/fedora packages.


## Quick overview

The main window consists of these parts (Top to Bottom):

- The top bar with the menu icon
- Input, result and history panel
- Basic operation panel
- Toggle for advanced operations panel

#### Menu

The menu toggle displays the following menu:

- **About** - shows basic info about the app
- **Help**  - shows built-in help page
- **User Docs** - links to these user docs
- **Clear history** - clears history records

#### Input, Results and History

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
root | root(value, n) | root(4, 2)
fac | x! | 6|
log | log(base, value) | log(10, 100)

The brackets must be closed with the same type. For functions only `()` brackets can be used.
If you want to add a sub expression into a function call you must enclose it with brackets. More info can be found [here](#example-usage).

Constants:

- ***Pi*** - as `pi`, `Pi` or `PI`
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
5*(5^(2!)) | 125
125*root(4, 2)+(2*2+1)! | 370
10 / (3 + 1) - 2^3 | -5.5
5 - log(100, ((10 + 2) * 2)) / (2 * 3) + 7! | 5044.884982...

## Usage tips

The buttons that insert the power operator `^` are context aware and reposition the cursor before the caret symbol only in case of no number or bracket being already present before it.

You can always use the Enter key to submit the calculation.

---