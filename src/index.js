//FILE:           index.js
//AUTHORS:        Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
//                <>
//TEAM            KVM Switchers FIT BUT
//CREATED:        31/03/2024
//LAST MODIFIED:  31/03/2024
//DESCRIPTION:    Electron application entry point

/*

*/

const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'js/preload.js')
        }
    });

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