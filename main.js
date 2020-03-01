'use strict'

const path = require('path')
const { app, ipcMain, Menu } = require('electron')
const shell = require('electron').shell

const Window = require('./Window')

require('electron-reload')(__dirname)

let mainWindow

let addProjectWin
let addTransactionWin
let showProjectsWin
let updateShowProjectsWin
let showTransactionsWin
let addBillWin
let showBillsWin
let updateProjectWin

function main () {
  mainWindow = new Window({
    file: path.join('src', 'index.html')
  })
  //mainWindow.webContents.openDevTools()

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
          label:'Update Project',
          click() {
            if (!updateShowProjectsWin) {
              updateShowProjectsWin = new Window({
                file: path.join('src', 'update_show_projects.html'),
                width: 1000,
                height: 700,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              updateShowProjectsWin.webContents.openDevTools()
          
              // cleanup
              updateShowProjectsWin.on('closed', () => {
                updateShowProjectsWin = null
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
      submenu: [  
        {
          label:'Add Bill',
          click() {
            if (!addBillWin) {
              addBillWin = new Window({
                file: path.join('src', 'add_bill.html'),
                width: 1000,
                height: 700,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              // addBillWin.webContents.openDevTools()
          
              // cleanup
              addBillWin.on('closed', () => {
                addBillWin = null
              })
            }
          }
        },
        {
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
    },
  ])
  Menu.setApplicationMenu(menu); 
}

ipcMain.on('after-transaction', (event, message) => {
  mainWindow.send('after-transaction-complete', message)
})

ipcMain.on('after-project-creation', (event, message) => {
  mainWindow.send('after-project-creation-complete', message)
})

ipcMain.on('after-bill', (event, message) => {
  mainWindow.send('after-bill-complete', message)
})

ipcMain.on('update-project-from-index', (event, message) => {
  console.log('update-project-from-index: (main.js) ' + message)
  updateProjectWin.send('update-project', message)
})

ipcMain.on('call-project-update', (event, message) => {
  
  console.log('ipc main received')
  console.log(message)
  if(!updateProjectWin){
    updateProjectWin = new Window({
      file: path.join('src', 'update_project.html'),
      width: 1000,
      height: 700,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    mainWindow.send('update-project-index', message)
    console.log('project-update send to renderer')

    updateProjectWin.webContents.openDevTools()

    // cleanup
    updateProjectWin.on('closed', () => {
      updateProjectWin = null
    })
  }
})

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})