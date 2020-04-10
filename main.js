'use strict'

const path = require('path')
const { app, ipcMain, Menu } = require('electron')
const shell = require('electron').shell

const Window = require('./Window')

require('electron-reload')(__dirname)

let mainWindow

let addProjectWin
let updateProjectWin
let updateShowProjectsWin
let showProjectsWin

let addBillWin
let showBillsWin

let addTransactionWin
let showTransactionsWin
let updateTransactionWin
let updateShowTransactionWin

let aboutWin

let addPaymentMethodWin
let paymentMethodListWin

let addMaterialWin
let showMaterialsWin
let updateShowMaterialWin
let updateMaterialWin

let submenu_win_width = 1350
let submenu_win_height = 780

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
          label:'Project Report',
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
          
              //addTransactionWin.webContents.openDevTools()
          
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
          label:'Transaction Report',
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
          
              //showTransactionsWin.webContents.openDevTools()
          
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
        label:'Bill Report',
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
    ,
    {
      label: 'Material',
      submenu: [
        {
          label:'Add Material',
          click() {
            if (!addMaterialWin) {
              addMaterialWin = new Window({
                file: path.join('src', 'add_material.html'),
                width: submenu_win_width,
                height: submenu_win_height,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              //addMaterialWin.webContents.openDevTools()
          
              // cleanup
              addMaterialWin.on('closed', () => {
                addMaterialWin = null
              })
            }
          }
        },
        {
          label:'Update Material',
          click() {
            if (!updateShowMaterialWin) {
              updateShowMaterialWin = new Window({
                file: path.join('src', 'update_show_materials.html'),
                width: submenu_win_width,
                height: submenu_win_height,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              // updateShowMaterialWin.webContents.openDevTools()
          
              // cleanup
              updateShowMaterialWin.on('closed', () => {
                updateShowMaterialWin = null
              })
            }
          }
        },
        {
          label:'Material Report',
          click() {
            if (!showMaterialsWin) {
              showMaterialsWin = new Window({
                file: path.join('src', 'show_materials.html'),
                width: submenu_win_width,
                height: submenu_win_height,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              //showMaterialsWin.webContents.openDevTools()
          
              // cleanup
              showMaterialsWin.on('closed', () => {
                showMaterialsWin = null
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
        },
        {
          label:'Payment Method List',
          click() {
            if (!paymentMethodListWin) {
              paymentMethodListWin = new Window({
                file: path.join('src', 'show_payment_methods.html'),
                width: submenu_win_width,
                height: submenu_win_height,
                // close with the main window
                parent: mainWindow,
                webPreferences: {
                  nodeIntegration: true
                }
              })
          
              // paymentMethodListWin.webContents.openDevTools()
          
              // cleanup
              paymentMethodListWin.on('closed', () => {
                paymentMethodListWin = null
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

ipcMain.on('after-material', (event, message) => {
  mainWindow.send('after-material-complete', message)
})

ipcMain.on('after-material-update', (event, message) => {
  mainWindow.send('after-material-update-complete', message)
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


ipcMain.on('call-material-update', (event, message) => {
  if(!updateMaterialWin){
    updateMaterialWin = new Window({
      file: path.join('src', 'update_material.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // updateMaterialWin.webContents.openDevTools()
    updateMaterialWin.webContents.on('did-finish-load', () => {
      updateMaterialWin.webContents.send('update-material', message);
    });

    // cleanup
    updateMaterialWin.on('closed', () => {
      updateMaterialWin = null
    })
  }
})

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})