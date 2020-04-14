'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const material_server = require('../services/material_services')

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
  let material_id = document.getElementById("material_id").value

  var material_data = {
    'material_name': document.getElementById("material_name").value,
    'project_name': document.getElementById("projectListInMaterial").value,
    'unit': document.getElementById("unit").value,
    'unit_price': document.getElementById("unit_price").value,
    'quantity': document.getElementById("quantity").value,
    'total_price': document.getElementById("total_price").value,
    'supplier_name': document.getElementById("supplier_name").value,
    'voucher': document.getElementById("voucher").value,
    'stock': document.getElementById("stock").value,
    'remarks': document.getElementById("remarks").value,
  }
  
  let data = await material_server.updateMaterialToServer(material_data, material_id);
  var message = 'Material Updated Successfully'
  if(data.status != 200 && data.status != 201){
    message = 'Material Update Failed'
  }
  ipc.send('after-material-update', message)
}

ipc.on('update-material', function (event, message) {
  console.log('update-material: (update_material.js) ' + message)
  var material_id = document.getElementById('material_id')
  material_id.value = message
})

viewProjectInMaterialForm()