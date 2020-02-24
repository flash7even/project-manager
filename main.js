'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')

const Window = require('./Window')

require('electron-reload')(__dirname)

var host_name = 'http://localhost:5000'

let mainWindow

function main () {
  mainWindow = new Window({
    file: path.join('src', 'index.html')
  })
  mainWindow.webContents.openDevTools()
}


let addProjectWin
let addTransactionWin
let showProjectsWin

ipcMain.on('add-transaction-window', () => {
  console.log('Create transaction window')
  if (!addTransactionWin) {
    addTransactionWin = new Window({
      file: path.join('src', 'add_transaction.html'),
      width: 1000,
      height: 700,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // addTransactionWin.webContents.openDevTools()

    // cleanup
    addTransactionWin.on('closed', () => {
      addTransactionWin = null
    })
  }
})

ipcMain.on('add-project-window', () => {
  if (!addProjectWin) {
    addProjectWin = new Window({
      file: path.join('src', 'add_project.html'),
      width: 1000,
      height: 700,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // showProjectsWin.webContents.openDevTools()

    // cleanup
    addProjectWin.on('closed', () => {
      addProjectWin = null
    })
  }
})

ipcMain.on('show-projects-window', () => {
  if (!showProjectsWin) {
    showProjectsWin = new Window({
      file: path.join('src', 'show_projects.html'),
      width: 1000,
      height: 700,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // showProjectsWin.webContents.openDevTools()

    // cleanup
    showProjectsWin.on('closed', () => {
      showProjectsWin = null
    })
  }
})

ipcMain.on('after-transaction', (event, message) => {
  mainWindow.send('after-transaction-complete', message)
})

ipcMain.on('after-project-creation', (event, message) => {
  mainWindow.send('after-project-creation-complete', message)
})

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})