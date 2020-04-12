'use strict'

const path = require('path')
const { app, ipcMain, Menu } = require('electron')
const shell = require('electron').shell

const Window = require('./Window')

require('electron-reload')(__dirname)

let mainWindow
let updateProjectWin
let updateMaterialWin
let updateBoqWin

let submenu_win_width = 1300
let submenu_win_height = 800

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
        },
        {
          label:'Transaction Report',
          click() {
            mainWindow.loadFile('src/show_transactions.html');
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
        {
        label:'Bill Report',
        click() {
          mainWindow.loadFile('src/show_bills.html');
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
            mainWindow.loadFile('src/add_material.html');
          }
        },
        {
          label:'Update Material',
          click() {
            mainWindow.loadFile('src/update_show_materials.html');
          }
        },
        {
          label:'Material Report',
          click() {
            mainWindow.loadFile('src/show_materials.html');
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
          label:'Boq Report',
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

ipcMain.on('after-boq', (event, message) => {
  mainWindow.send('after-boq-complete', message)
})

ipcMain.on('after-boq-update', (event, message) => {
  mainWindow.send('after-boq-update-complete', message)
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


ipcMain.on('call-boq-update', (event, message) => {
  if(!updateBoqWin){
    updateBoqWin = new Window({
      file: path.join('src', 'update_boq.html'),
      width: submenu_win_width,
      height: submenu_win_height,
      // close with the main window
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // updateBoqWin.webContents.openDevTools()
    updateBoqWin.webContents.on('did-finish-load', () => {
      updateBoqWin.webContents.send('update-boq', message);
    });

    // cleanup
    updateBoqWin.on('closed', () => {
      updateBoqWin = null
    })
  }
})

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
