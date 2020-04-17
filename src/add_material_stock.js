'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const material_server = require('../services/material_services')
const jshelper_services = require('../services/jshelper_services')

async function viewMaterialInMaterialStockForm() {
  var search_param = {
    'reference': 'ENTRY'
  }
  let material_list = await material_server.getMaterialList(search_param);
  console.log(JSON.stringify(material_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<material_list.length;idx++){
    var material = material_list[idx]
    html += `<option>${material['material_name']}</option>`
  }
  var materialListInMaterial = document.getElementById('materialListInMaterial')
  materialListInMaterial.innerHTML = html
}

async function viewProjectInMaterialForm() {
  let project_list = await project_server.getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInMaterial = document.getElementById('projectListInMaterial')
  projectListInMaterial.innerHTML = html
}


async function sendUpdateMaterialForm(event) {
  event.preventDefault() // stop the form from submitting
  var search_param = {
    'reference': 'ENTRY',
    'project_name': document.getElementById("projectListInMaterial").value
  }
  let material_list = await material_server.getMaterialList(search_param);
  console.log(JSON.stringify(material_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<material_list.length;idx++){
    var material = material_list[idx]
    html += `<option>${material['material_name']}</option>`
  }
  var materialListInMaterial = document.getElementById('materialListInMaterial')
  materialListInMaterial.innerHTML = html
}

async function sendAddMaterialForm(event) {
    event.preventDefault() // stop the form from submitting

    var material_data = {
      'material_name': document.getElementById("materialListInMaterial").value,
      'project_name': document.getElementById("projectListInMaterial").value,
      'unit': document.getElementById("unit").value,
      'unit_price': document.getElementById("unit_price").value,
      'quantity': document.getElementById("quantity").value,
      'total_price': document.getElementById("total_price").value,
      'supplier_name': document.getElementById("supplier_name").value,
      'voucher': document.getElementById("voucher").value,
      'stock': document.getElementById("stock").value,
      'remarks': document.getElementById("remarks").value,
      'reference': 'STOCK',
    }
    
    let data = await material_server.addMaterialToServer(material_data);
    var message = 'Material Successfull'
    if(data.status != 200 && data.status != 201){
      message = 'Material Failed'
    }
    ipc.send('after-material', message)
}

viewProjectInMaterialForm()
viewMaterialInMaterialStockForm()
