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

  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
            submenu: [
              {
                  label:'Home',
                  click() {
                    mainWindow.loadFile('src/index.html');
                  }
              },
              {
                  label:'About',
                  click() {
                    mainWindow.loadFile('src/about.html');
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
            mainWindow.loadFile('src/add_project.html');
          }
        },
        {
          label:'Update Project',
          click() {
              mainWindow.loadFile('src/update_show_projects.html');
          }
        },
        {
          label:'Project Report',
          click() {
            mainWindow.loadFile('src/show_projects.html');
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
            mainWindow.loadFile('src/add_transaction.html');
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
            mainWindow.loadFile('src/add_bill.html');
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
            mainWindow.loadFile('src/add_material.html');
          }
        },
        {
          label:'Add Material Stock',
          click() {
            mainWindow.loadFile('src/add_material_stock.html');
          }
        },
        {
          label:'Update Material',
          click() {
            mainWindow.loadFile('src/update_show_materials.html');
          }
        },
        {
          label:'Material List',
          click() {
            mainWindow.loadFile('src/show_materials.html');
          }
        },
        {
          label:'Material Stock List',
          click() {
            mainWindow.loadFile('src/show_material_stocks.html');
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
            mainWindow.loadFile('src/add_boq.html');
          }
        },
        {
          label:'Boq List',
          click() {
            mainWindow.loadFile('src/show_boqs.html');
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
            mainWindow.loadFile('src/add_payment_method.html');
          }
        },
        {
          label:'Payment Method List',
          click() {
            mainWindow.loadFile('src/show_payment_methods.html');
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
            mainWindow.loadFile('src/show_transactions.html');
          }
        },
        {
          label:'Bill Report',
          click() {
            mainWindow.loadFile('src/show_bills.html');
          }
        },
        {
          label:'Boq Reports',
          click() {
            mainWindow.loadFile('src/show_boq_reports.html');
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu); 
}

ipcMain.on('after-transaction', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-transaction-complete', message)
  });
})

ipcMain.on('after-transaction-update', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-transaction-update-complete', message)
  });
})

ipcMain.on('after-project-creation', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-project-creation-complete', message)
  });
})

ipcMain.on('after-payment-method-creation', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-payment-method-creation-complete', message)
  });
})

ipcMain.on('after-project-update', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-project-update-complete', message)
  });
})

ipcMain.on('after-bill', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-bill-complete', message)
  });
})

ipcMain.on('after-material', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-material-complete', message)
  });
})

ipcMain.on('after-material-update', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-material-update-complete', message)
  });
})

ipcMain.on('after-boq', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-boq-complete', message)
  });
})

ipcMain.on('after-boq-update', (event, message) => {
  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('after-boq-update-complete', message)
  });
})

ipcMain.on('call-project-update', (event, message) => {
  mainWindow.loadFile('src/update_project.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('update-project', message)
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

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
