'use strict'

const path = require('path')
const { app, ipcMain, Menu } = require('electron')
const shell = require('electron').shell

const Window = require('./Window')

require('electron-reload')(__dirname)

var submenu_win_height = 800
var submenu_win_width = 1400

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

/// -------------- CREATE WINDOWS --------------///

function create_add_project_window(){
  if (!addProjectWin) {
    addProjectWin = new Window({
      file: path.join('src', 'add_project.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showProjectsWin.webContents.openDevTools()
    addProjectWin.on('closed', () => {
      addProjectWin = null
    })
  }else{
    addProjectWin.loadFile('src/add_project.html');
  }
}

function create_update_project_window(){
  if (!updateProjectWin) {
    updateProjectWin = new Window({
      file: path.join('src', 'update_project.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    updateProjectWin.webContents.openDevTools()
    updateProjectWin.on('closed', () => {
      updateProjectWin = null
    })
  }else{
    updateProjectWin.loadFile('src/update_project.html');
  }
}

function create_update_show_project_window(){
  if (!updateShowProjectsWin) {
    updateShowProjectsWin = new Window({
      file: path.join('src', 'update_show_projects.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // updateShowProjectsWin.webContents.openDevTools()
    updateShowProjectsWin.on('closed', () => {
      updateShowProjectsWin = null
    })
  }else{
    updateShowProjectsWin.loadFile('src/update_show_projects.html');
  }
}

function create_show_project_window(){
  if (!showProjectsWin) {
    showProjectsWin = new Window({
      file: path.join('src', 'show_projects.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showProjectsWin.webContents.openDevTools()
    showProjectsWin.on('closed', () => {
      showProjectsWin = null
    })
  }else{
    showProjectsWin.loadFile('src/show_projects.html');
  }
}

function create_add_transaction_window(){
  if (!addTransactionWin) {
    addTransactionWin = new Window({
      file: path.join('src', 'add_transaction.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // addTransactionWin.webContents.openDevTools()
    addTransactionWin.on('closed', () => {
      addTransactionWin = null
    })
  }else{
    addTransactionWin.loadFile('src/add_transaction.html');
  }
}

function create_show_transaction_window(){
  if (!showTransactionsWin) {
    showTransactionsWin = new Window({
      file: path.join('src', 'show_transactions.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showProjectsWin.webContents.openDevTools()
    showTransactionsWin.on('closed', () => {
      showTransactionsWin = null
    })
  }else{
    showTransactionsWin.loadFile('src/show_transactions.html');
  }
}

function create_add_bill_window(){
  if (!addBillWin) {
    addBillWin = new Window({
      file: path.join('src', 'add_bill.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // addBillWin.webContents.openDevTools()
    addBillWin.on('closed', () => {
      addBillWin = null
    })
  }else{
    addBillWin.loadFile('src/add_bill.html');
  }
}

function create_show_bill_window(){
  if (!showBillsWin) {
    showBillsWin = new Window({
      file: path.join('src', 'show_bills.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showBillsWin.webContents.openDevTools()
    showBillsWin.on('closed', () => {
      showBillsWin = null
    })
  }else{
    showBillsWin.loadFile('src/show_bills.html');
  }
}

function create_add_boq_window(){
  if (!addBoqWin) {
    addBoqWin = new Window({
      file: path.join('src', 'add_boq.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // addBoqWin.webContents.openDevTools()
    addBoqWin.on('closed', () => {
      addBoqWin = null
    })
  }else{
    addBoqWin.loadFile('src/add_boq.html');
  }
}

function create_show_boq_list_window(){
  if (!showBoqsWin) {
    showBoqsWin = new Window({
      file: path.join('src', 'show_boqs.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showBoqsWin.webContents.openDevTools()
    showBoqsWin.on('closed', () => {
      showBoqsWin = null
    })
  }else{
    showBoqsWin.loadFile('src/show_boqs.html');
  }
}

function create_show_boq_report_window(){
  if (!showBoqReportsWin) {
    showBoqReportsWin = new Window({
      file: path.join('src', 'show_boq_reports.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showBoqReportsWin.webContents.openDevTools()
    showBoqReportsWin.on('closed', () => {
      showBoqReportsWin = null
    })
  }else{
    showBoqReportsWin.loadFile('src/show_boq_reports.html');
  }
}

function create_add_material_window(){
  if (!addMaterialWin) {
    addMaterialWin = new Window({
      file: path.join('src', 'add_material.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // addMaterialWin.webContents.openDevTools()
    addMaterialWin.on('closed', () => {
      addMaterialWin = null
    })
  }else{
    addMaterialWin.loadFile('src/add_material.html');
  }
}

function create_show_material_window(){
  if (!showMaterialsWin) {
    showMaterialsWin = new Window({
      file: path.join('src', 'show_materials.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showMaterialsWin.webContents.openDevTools()
    showMaterialsWin.on('closed', () => {
      showMaterialsWin = null
    })
  }else{
    showMaterialsWin.loadFile('src/show_materials.html');
  }
}

function create_add_material_stock_window(){
  if (!addMaterialStockWin) {
    addMaterialStockWin = new Window({
      file: path.join('src', 'add_material_stock.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // addMaterialStockWin.webContents.openDevTools()
    addMaterialStockWin.on('closed', () => {
      addMaterialStockWin = null
    })
  }else{
    addMaterialStockWin.loadFile('src/add_material_stock.html');
  }
}

function create_show_material_stock_window(){
  if (!showMaterialStockWin) {
    showMaterialStockWin = new Window({
      file: path.join('src', 'show_material_stocks.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showMaterialStockWin.webContents.openDevTools()
    showMaterialStockWin.on('closed', () => {
      showMaterialStockWin = null
    })
  }else{
    showMaterialStockWin.loadFile('src/show_material_stocks.html');
  }
}

function create_add_payment_method_window(){
  if (!addPaymentMethodWin) {
    addPaymentMethodWin = new Window({
      file: path.join('src', 'add_payment_method.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // addPaymentMethodWin.webContents.openDevTools()
    addPaymentMethodWin.on('closed', () => {
      addPaymentMethodWin = null
    })
  }else{
    addPaymentMethodWin.loadFile('src/add_payment_method.html');
  }
}

function create_show_payment_method_window(){
  if (!showPaymentMethodWin) {
    showPaymentMethodWin = new Window({
      file: path.join('src', 'show_payment_methods.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showPaymentMethodWin.webContents.openDevTools()
    showPaymentMethodWin.on('closed', () => {
      showPaymentMethodWin = null
    })
  }else{
    showPaymentMethodWin.loadFile('src/show_payment_methods.html');
  }
}

function create_show_balance_sheet_window(){
  if (!showBalanceSheetWin) {
    showBalanceSheetWin = new Window({
      file: path.join('src', 'show_balance_sheets.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showBalanceSheetWin.webContents.openDevTools()
    showBalanceSheetWin.on('closed', () => {
      showBalanceSheetWin = null
    })
  }else{
    showBalanceSheetWin.loadFile('src/show_balance_sheets.html');
  }
}

function create_show_graph_window(){
  if (!showGraphWin) {
    showGraphWin = new Window({
      file: path.join('src', 'index.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })
    // showGraphWin.webContents.openDevTools()
    showGraphWin.on('closed', () => {
      showGraphWin = null
    })
  }else{
    showGraphWin.loadFile('src/index.html');
  }
}


/// -------------- CREATE WINDOWS --------------///


function main () {
  mainWindow = new Window({
    file: path.join('./src/', 'home.html'),
    icon: './assets/img/icon_3.png'
  })
  mainWindow.webContents.openDevTools()

  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
            submenu: [
              {
                  label:'Home',
                  click() {
                    mainWindow.loadFile('src/home.html');
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
            create_add_project_window();
          }
        },
        {
          label:'Update Project',
          click() {
            create_update_show_project_window()
          }
        },
        {
          label:'Project Report',
          click() {
            create_show_project_window();
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
            create_add_transaction_window();
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
            create_add_bill_window();
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
            create_add_material_window();
          }
        },
        {
          label:'Add Material Stock',
          click() {
            create_add_material_stock_window();
          }
        },
        {
          label:'Material List',
          click() {
            create_show_material_window();
          }
        },
        {
          label:'Material Stock List',
          click() {
            create_show_material_stock_window();
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
            create_add_boq_window();
          }
        },
        {
          label:'BOQ List',
          click() {
            create_show_boq_list_window();
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
            create_add_payment_method_window();
          }
        },
        {
          label:'Payment Method List',
          click() {
            create_show_payment_method_window();
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
            create_show_transaction_window();
          }
        },
        {
          label:'Bill Report',
          click() {
            create_show_bill_window();
          }
        },
        {
          label:'BOQ Reports',
          click() {
            create_show_boq_report_window();
          }
        },
        {
          label:'Balance Sheet',
          click() {
            create_show_balance_sheet_window();
          }
        },
        {
          label:'Graphs',
          click() {
            create_show_graph_window();
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu); 
}

ipcMain.on('after-transaction', (event, message) => {
  create_show_transaction_window();
})

ipcMain.on('after-transaction-update', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-transaction-update-complete', message)
  });
})

ipcMain.on('after-project-creation', (event, message) => {
  create_show_project_window();
})

ipcMain.on('after-payment-method-creation', (event, message) => {
  create_show_payment_method_window();
})

ipcMain.on('after-project-update', (event, message) => {
  create_show_project_window();
})

ipcMain.on('after-bill', (event, message) => {
  create_show_bill_window();
})

ipcMain.on('after-material', (event, message) => {
  create_show_material_window();
})

ipcMain.on('after-material-stock', (event, message) => {
  create_show_material_stock_window();
})

ipcMain.on('after-material-update', (event, message) => {
  mainWindow.loadFile('src/show_materials.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-material-update-complete', message)
  });
})

ipcMain.on('after-boq', (event, message) => {
  create_show_boq_list_window();
})

ipcMain.on('after-boq-update', (event, message) => {
  mainWindow.loadFile('src/show_boqs.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-boq-update-complete', message)
  });
})

ipcMain.on('call-project-update', (event, message) => {
  create_update_project_window();
  updateProjectWin.webContents.on('did-finish-load', () => {
    updateProjectWin.send('update-project', message)
  });
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


ipcMain.on('from-home-add-project', (event, message) => {
  create_add_project_window();
})
ipcMain.on('from-home-update-project', (event, message) => {
  create_update_show_project_window();
})
ipcMain.on('from-home-show-project', (event, message) => {
  create_show_project_window();
})


ipcMain.on('from-home-add-transaction', (event, message) => {
  create_add_transaction_window()
})
ipcMain.on('from-home-show-transaction', (event, message) => {
  create_show_transaction_window();
})


ipcMain.on('from-home-add-bill', (event, message) => {
  create_add_bill_window();
})
ipcMain.on('from-home-show-bill', (event, message) => {
  create_show_bill_window();
})



ipcMain.on('from-home-add-material', (event, message) => {
  create_add_material_window();
})
ipcMain.on('from-home-add-material-stock', (event, message) => {
  create_add_material_stock_window();
})
ipcMain.on('from-home-show-material-stock', (event, message) => {
  create_show_material_stock_window();
})



ipcMain.on('from-home-add-boq', (event, message) => {
  create_add_boq_window();
})
ipcMain.on('from-home-show-boq-list', (event, message) => {
  create_show_boq_list_window();
})
ipcMain.on('from-home-show-boq-report', (event, message) => {
  create_show_boq_report_window();
})



ipcMain.on('from-home-show-graph', (event, message) => {
  create_show_graph_window();
})


app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
