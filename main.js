'use strict'

const path = require('path')
const { app, ipcMain, Menu } = require('electron')
const shell = require('electron').shell

const Window = require('./Window')

require('electron-reload')(__dirname)

let mainWindow

function main () {
  mainWindow = new Window({
    file: path.join('src', 'index.html')
  })
  mainWindow.webContents.openDevTools()

let addProjectWin
let addTransactionWin
let showProjectsWin
let showTransactionsWin
let showBillsWin

  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
            submenu: [
              {
                  label:'About'
              },
              {type:'separator'},
              {
                  label:'Exit', 
                  click() { 
                      app.quit() 
                  } 
              }
        ]
    },
    {
      label: 'Project',
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
          label:'Project List',
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
        }
      ]
    },
    {
      label: 'Transactions',
      submenu: [
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
          label:'Transaction History',
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
        }
      ]
    },
    {
      label: 'Bills',
      submenu: [{
        label:'Bill History',
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
      }
      ]
    }
  ])
  Menu.setApplicationMenu(menu); 
}

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