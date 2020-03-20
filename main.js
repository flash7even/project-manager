'use strict'

const path = require('path')
const { app, ipcMain, Menu } = require('electron')
const shell = require('electron').shell

const Window = require('./Window')

require('electron-reload')(__dirname)

let mainWindow

let addProjectWin
let aboutWin
let addTransactionWin
let showProjectsWin
let updateShowProjectsWin
let showTransactionsWin
let addBillWin
let showBillsWin
let updateProjectWin
let updateTransactionWin
let updateShowTransactionWin
let addPaymentMethodWin

let submenu_win_width = 1200
let submenu_win_height = 700

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
                  label:'About',
                  click() {
                    if (!aboutWin) {
                      aboutWin = new Window({
                        file: path.join('src', 'about.html'),
                        width: submenu_win_width,
                        height: submenu_win_height,
                        // close with the main window
                        parent: mainWindow,
                        webPreferences: {
                          nodeIntegration: true
                        }
                      })
                  
                      // aboutWin.webContents.openDevTools()
                  
                      // cleanup
                      aboutWin.on('closed', () => {
                        aboutWin = null
                      })
                    }
                  }
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
                width: submenu_win_width,
                height: submenu_win_height,
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
                width: submenu_win_width,
                height: submenu_win_height,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              // updateShowProjectsWin.webContents.openDevTools()
          
              // cleanup
              updateShowProjectsWin.on('closed', () => {
                updateShowProjectsWin = null
              })
            }
          }
        },
        {
          label:'Project Stats',
          click() {
            if (!showProjectsWin) {
              showProjectsWin = new Window({
                file: path.join('src', 'show_projects.html'),
                width: submenu_win_width,
                height: submenu_win_height,
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
                width: submenu_win_width,
                height: submenu_win_height,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              addTransactionWin.webContents.openDevTools()
          
              // cleanup
              addTransactionWin.on('closed', () => {
                addTransactionWin = null
              })
            }
          }
        },
        /*
        {
          label:'Update Transaction',
          click() {
            if (!updateShowTransactionWin) {
              updateShowTransactionWin = new Window({
                file: path.join('src', 'update_show_transactions.html'),
                width: submenu_win_width,
                height: submenu_win_height,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              updateShowTransactionWin.webContents.openDevTools()
          
              // cleanup
              updateShowTransactionWin.on('closed', () => {
                updateShowTransactionWin = null
              })
            }
          }
        },
        */
        {
          label:'Transaction Stats',
          click() {
            if (!showTransactionsWin) {
              showTransactionsWin = new Window({
                file: path.join('src', 'show_transactions.html'),
                width: submenu_win_width,
                height: submenu_win_height,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              showTransactionsWin.webContents.openDevTools()
          
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
                width: submenu_win_width,
                height: submenu_win_height,
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
        label:'Bill Stats',
        click() {
          if (!showBillsWin) {
            showBillsWin = new Window({
              file: path.join('src', 'show_bills.html'),
              width: submenu_win_width,
              height: submenu_win_height,
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
    {
      label: 'Payment Method',
      submenu: [
        {
          label:'Add Payment Method',
          click() {
            if (!addPaymentMethodWin) {
              addPaymentMethodWin = new Window({
                file: path.join('src', 'add_payment_method.html'),
                width: submenu_win_width,
                height: submenu_win_height,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              // addPaymentMethodWin.webContents.openDevTools()
          
              // cleanup
              addPaymentMethodWin.on('closed', () => {
                addPaymentMethodWin = null
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

ipcMain.on('after-transaction-update', (event, message) => {
  mainWindow.send('after-transaction-update-complete', message)
})

ipcMain.on('after-project-creation', (event, message) => {
  mainWindow.send('after-project-creation-complete', message)
})

ipcMain.on('after-payment-method-creation', (event, message) => {
  mainWindow.send('after-payment-method-creation-complete', message)
})

ipcMain.on('after-project-update', (event, message) => {
  mainWindow.send('after-project-update-complete', message)
})

ipcMain.on('after-bill', (event, message) => {
  mainWindow.send('after-bill-complete', message)
})

ipcMain.on('call-project-update', (event, message) => {
  if(!updateProjectWin){
    updateProjectWin = new Window({
      file: path.join('src', 'update_project.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // updateProjectWin.webContents.openDevTools()
    updateProjectWin.webContents.on('did-finish-load', () => {
      updateProjectWin.webContents.send('update-project', message);
    });

    // cleanup
    updateProjectWin.on('closed', () => {
      updateProjectWin = null
    })
  }
})

ipcMain.on('call-transaction-update', (event, message) => {
  if(!updateTransactionWin){
    updateTransactionWin = new Window({
      file: path.join('src', 'update_transaction.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // updateProjectWin.webContents.openDevTools()
    updateTransactionWin.webContents.on('did-finish-load', () => {
      updateTransactionWin.webContents.send('update-transaction', message);
    });

    // cleanup
    updateTransactionWin.on('closed', () => {
      updateTransactionWin = null
    })
  }
})

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})