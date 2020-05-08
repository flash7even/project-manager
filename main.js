'use strict'

const path = require('path')
const { app, ipcMain, Menu } = require('electron')
const shell = require('electron').shell

const Window = require('./Window')

require('electron-reload')(__dirname)

var submenu_win_height = 800
var submenu_win_width = 1200

let mainWindow

let addProjectWin
let updateProjectWin
let updateShowProjectsWin
let showProjectsWin
let showGraphWin

let addBillWin
let showBillsWin

let addTransactionWin
let showTransactionsWin
let showBalanceSheetWin

let addPaymentMethodWin
let showPaymentMethodWin

let addMaterialWin
let showMaterialsWin
let addMaterialStockWin
let showMaterialStockWin

let addBoqWin
let showBoqsWin
let showBoqReportsWin

var subwindows = new Array(20);

function createBrowserWindow(sub_window, page_name) {
  if (!sub_window) {
    sub_window = new Window({
      file: path.join('src', page_name),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showProjectsWin.webContents.openDevTools()
    sub_window.on('closed', () => {
      sub_window = null
    })
  }
}


function main () {
  mainWindow = new Window({
    file: path.join('./', 'home.html'),
    icon: './assets/img/icon_3.png'
  })
 // mainWindow.webContents.openDevTools()

  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
            submenu: [
              {
                  label:'Home',
                  click() {
                    mainWindow.loadFile('home.html');
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
            createBrowserWindow(addProjectWin, 'add_project.html')
          }
        },
        {
          label:'Update Project',
          click() {
            createBrowserWindow(updateShowProjectsWin, 'update_show_projects.html')
          }
        },
        {
          label:'Project Report',
          click() {
            createBrowserWindow(showProjectsWin, 'show_projects.html')
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
            createBrowserWindow(addTransactionWin, 'add_transaction.html')
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
            createBrowserWindow(addBillWin, 'add_bill.html')
          }
        },
      ]
    },
    ,
    {
      label: 'Material',
      submenu: [
        {
          label:'Add Material',
          click() {
            createBrowserWindow(addMaterialWin, 'add_material.html')
          }
        },
        {
          label:'Add Material Stock',
          click() {
            createBrowserWindow(addMaterialStockWin, 'add_material_stock.html')
          }
        },
        {
          label:'Material List',
          click() {
            createBrowserWindow(showMaterialsWin, 'show_materials.html')
          }
        },
        {
          label:'Material Stock List',
          click() {
            createBrowserWindow(showMaterialStockWin, 'show_material_stocks.html')
          }
        }
      ]
    },
    {
      label: 'BOQ',
      submenu: [
        {
          label:'Add BOQ',
          click() {
            createBrowserWindow(addBoqWin, 'add_boq.html')
          }
        },
        {
          label:'Boq List',
          click() {
            createBrowserWindow(showBoqsWin, 'show_boqs.html')
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
            createBrowserWindow(addPaymentMethodWin, 'add_payment_method.html')
          }
        },
        {
          label:'Payment Method List',
          click() {
            createBrowserWindow(showPaymentMethodWin, 'show_payment_methods.html')
          }
        }
      ]
    },
    {
      label: 'Reports',
      submenu: [
        {
          label:'Transaction Report',
          click() {
            createBrowserWindow(showTransactionsWin, 'show_transactions.html')
          }
        },
        {
          label:'Bill Report',
          click() {
            createBrowserWindow(showBillsWin, 'show_bills.html')
          }
        },
        {
          label:'Boq Reports',
          click() {
            createBrowserWindow(showBoqReportsWin, 'show_boq_reports.html')
          }
        },
        {
          label:'Balance Sheet',
          click() {
            createBrowserWindow(showBalanceSheetWin, 'show_balance_sheets.html')
          }
        },
        {
          label:'Graphs',
          click() {
            createBrowserWindow(showGraphWin, 'index.html')
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu); 
}

ipcMain.on('after-transaction', (event, message) => {
  addTransactionWin = null;
  createBrowserWindow(showTransactionsWin, 'show_transactions.html')
})

ipcMain.on('after-transaction-update', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-transaction-update-complete', message)
  });
})

ipcMain.on('after-project-creation', (event, message) => {
  addProjectWin = null;
  createBrowserWindow(showProjectsWin, 'show_projects.html')
})

ipcMain.on('after-payment-method-creation', (event, message) => {
  addPaymentMethodWin = null;
  createBrowserWindow(showPaymentMethodWin, 'show_payment_methods.html')
})

ipcMain.on('after-project-update', (event, message) => {
  updateProjectWin = null;
  createBrowserWindow(showProjectsWin, 'show_projects.html')
})

ipcMain.on('after-bill', (event, message) => {
  addBillWin = null;
  createBrowserWindow(showBillsWin, 'show_bills.html')
})

ipcMain.on('after-material', (event, message) => {
  addMaterialWin = null;
  createBrowserWindow(showMaterialsWin, 'show_materials.html')
})

ipcMain.on('after-material-stock', (event, message) => {
  addMaterialStockWin = null;
  createBrowserWindow(showMaterialStockWin, 'show_material_stocks.html')
})

ipcMain.on('after-material-update', (event, message) => {
  mainWindow.loadFile('src/show_materials.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-material-update-complete', message)
  });
})

ipcMain.on('after-boq', (event, message) => {
  addBoqWin = null;
  createBrowserWindow(showBoqsWin, 'show_boqs.html')
})

ipcMain.on('after-boq-update', (event, message) => {
  mainWindow.loadFile('src/show_boqs.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-boq-update-complete', message)
  });
})

ipcMain.on('call-project-update', (event, message) => {
  createBrowserWindow(updateProjectWin, 'update_project.html')
})

ipcMain.on('call-material-update', (event, message) => {
  mainWindow.loadFile('src/update_material.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('update-material', message)
  });
})

ipcMain.on('call-boq-update', (event, message) => {
  mainWindow.loadFile('src/update_boq.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('update-boq', message)
  });
})

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
