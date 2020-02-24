const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const axios = require('axios');
const ipc = electron.ipcRenderer

const addProject = document.getElementById('addProject')

addProject.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add_project.html')
    
    let win = new BrowserWindow({
        frame: false,
        width: 950,
        height: 750,
        webPreferences: {
          nodeIntegration: true
        }
      })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
    win.webContents.openDevTools()
  })

  const showProjects = document.getElementById('showProjects')

  showProjects.addEventListener('click', function (event) {
      const modalPath = path.join('file://', __dirname, 'show_projects.html')
      
      let win = new BrowserWindow({
          frame: false,
          width: 950,
          height: 750,
          webPreferences: {
            nodeIntegration: true
          }
        })
      win.on('close', function () { win = null })
      win.loadURL(modalPath)
      win.show()
      win.webContents.openDevTools()
    })

    const addTransaction = document.getElementById('addTransaction')
  
    addTransaction.addEventListener('click', function (event) {
        const modalPath = path.join('file://', __dirname, 'add_transaction.html')
        
        let win = new BrowserWindow({
            frame: false,
            width: 950,
            height: 750,
            webPreferences: {
              nodeIntegration: true
            }
          })
        win.on('close', function () { win = null })
        win.loadURL(modalPath)
        win.show()
        win.webContents.openDevTools()
      })
  
