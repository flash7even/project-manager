'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const material_server = require('../services/material_services')
const jshelper_services = require('../services/jshelper_services')

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

async function sendAddMaterialForm(event) {
    event.preventDefault() // stop the form from submitting

    var material_data = {
      'material_name': document.getElementById("material_name").value,
      'project_name': document.getElementById("projectListInMaterial").value,
      'remarks': document.getElementById("remarks").value,
      'reference': 'ENTRY',
    }
    
    let data = await material_server.addMaterialToServer(material_data);
    var message = 'Material Successfull'
    if(data.status != 200 && data.status != 201){
      message = 'Material Failed'
    }
    ipc.send('after-material', message)
    
    var window = remote.getCurrentWindow();
    window.close();
}

viewProjectInMaterialForm()
