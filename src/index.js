'use strict'

const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const axios = require('axios');
const ipc = electron.ipcRenderer

const addProject = document.getElementById('addProject')

addProject.addEventListener('click', function (event) {
  ipc.send('add-project-window')
})

const showProjects = document.getElementById('showProjects')

showProjects.addEventListener('click', function (event) {
  ipc.send('show-projects-window')
})

const addTransaction = document.getElementById('addTransaction')

addTransaction.addEventListener('click', function (event) {
  ipc.send('add-transaction-window')
})

ipc.on('after-transaction-complete', (event, message) => {
  alert(message)
})

ipc.on('after-project-creation-complete', (event, message) => {
  alert(message)
})