/**
 * @file index.js
 * @description This file contains Electron application entry point.
 * And main electron configuration of the calculator. index.html is loaded
 * as main window of the application. The window is not resizable with fixed
 * dimensions 500x650.
 * @summary Electron application entry point.
 * @module index
 * @requires electron
 * @author Otakar Kočí
 * @author Team KVM Switchers FIT BUT
 * @license GNU GPL v3
 * @see renderer
 */
//FILE:           index.js
//AUTHORS:        Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
//                <>
//TEAM:           KVM Switchers FIT BUT
//LICENSE:        GNU GPL v3
//CREATED:        31/03/2024
//LAST MODIFIED:  24/04/2024
//DESCRIPTION:    Electron application entry point

const { app, BrowserWindow } = require('electron')
const path = require('node:path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 650,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            devTools: false,
            preload: path.join(__dirname, 'js/preload.js')
        }
    });
    // all target="_blank" links open in the default browser
    mainWindow.webContents.setWindowOpenHandler((details) => {
        require("electron").shell.openExternal(details.url);
        return { action: 'deny' }
      })
    // load index.html
    mainWindow.loadFile('public/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});