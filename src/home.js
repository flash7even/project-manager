'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

async function addProjectEvent(event){
  ipc.send('from-home-add-project', 'home')
}
async function updateProjectEvent(event){
  ipc.send('from-home-update-project', 'home')
}
async function showProjectEvent(event){
  ipc.send('from-home-show-project', 'home')
}


async function addTransactionEvent(event){
  ipc.send('from-home-add-transaction', 'home')
}
async function showTransactionEvent(event){
  ipc.send('from-home-show-transaction', 'home')
}


async function addBillEvent(event){
  ipc.send('from-home-add-bill', 'home')
}
async function showBillEvent(event){
  ipc.send('from-home-show-bill', 'home')
}


async function addMaterialEvent(event){
  ipc.send('from-home-add-material', 'home')
}
async function updateMaterialStockEvent(event){
  ipc.send('from-home-add-material-stock', 'home')
}
async function showMaterialStockEvent(event){
  ipc.send('from-home-show-material-stock', 'home')
}



async function addBOQEvent(event){
  ipc.send('from-home-add-boq', 'home')
}
async function showBOQListEvent(event){
  ipc.send('from-home-show-boq-list', 'home')
}
async function showBOQReportEvent(event){
  ipc.send('from-home-show-boq-report', 'home')
}



async function showGraphEvent(event){
  ipc.send('from-home-show-graph', 'home')
}
