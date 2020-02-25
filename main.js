'use strict'

const path = require('path')
const { app, ipcMain, Menu } = require('electron')
const shell = require('electron').shell

const Window = require('./Window')

require('electron-reload')(__dirname)

var host_name = 'http://tarangopc:5000'

let mainWindow

function main () {
  mainWindow = new Window({
    file: path.join('src', 'index.html')
  })
  mainWindow.webContents.openDevTools()

  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
            submenu: [
              {
                label:'Add Project',
                click() {
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
                }
              },
              {
                label:'Add Transaction',
                click() {
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
                }
              },
              {
                label:'Projects',
                click() {
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
                }
              },
              {
                label:'Show Bills',
                click() {
                  if (!showBillsWin) {
                    showBillsWin = new Window({
                      file: path.join('src', 'show_bills.html'),
                      width: 1000,
                      height: 700,
                      // close with the main window
                      parent: mainWindow,
                      webPreferences: {
                        nodeIntegration: true
                      }
                    })
                
                    // showBillsWin.webContents.openDevTools()
                
                    // cleanup
                    showBillsWin.on('closed', () => {
                      showBillsWin = null
                    })
                  }
                }
              },
              {
                label:'Show Transactions',
                click() {
                  if (!showTransactionsWin) {
                    showTransactionsWin = new Window({
                      file: path.join('src', 'show_transactions.html'),
                      width: 1000,
                      height: 700,
                      // close with the main window
                      parent: mainWindow,
                      webPreferences: {
                        nodeIntegration: true
                      }
                    })
                
                    // showTransactionsWin.webContents.openDevTools()
                
                    // cleanup
                    showTransactionsWin.on('closed', () => {
                      showTransactionsWin = null
                    })
                  }
                }
              },
              {
                  label:'CoinMarketCap',
                  click() { 
                      shell.openExternal('http://coinmarketcap.com')
                  },
                  accelerator: 'CmdOrCtrl+Shift+C'
              },
              {type:'separator'},
              {
                  label:'Exit', 
                  click() { 
                      app.quit() 
                  } 
              }
        ]
    }
  ])
  Menu.setApplicationMenu(menu); 
}


let addProjectWin
let addTransactionWin
let showProjectsWin
let showTransactionsWin
let showBillsWin

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

ipcMain.on('show-transactions-window', () => {
  if (!showTransactionsWin) {
    showTransactionsWin = new Window({
      file: path.join('src', 'show_transactions.html'),
      width: 1000,
      height: 700,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // showTransactionsWin.webContents.openDevTools()

    // cleanup
    showTransactionsWin.on('closed', () => {
      showTransactionsWin = null
    })
  }
})

ipcMain.on('show-bills-window', () => {
  if (!showBillsWin) {
    showBillsWin = new Window({
      file: path.join('src', 'show_bills.html'),
      width: 1000,
      height: 700,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // showBillsWin.webContents.openDevTools()

    // cleanup
    showBillsWin.on('closed', () => {
      showBillsWin = null
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