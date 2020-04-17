'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const boq_server = require('../services/boq_services')
const material_server = require('../services/material_services')
const jshelper_services = require('../services/jshelper_services')

async function viewProjectInBoqForm() {
  let project_list = await project_server.getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInBoq = document.getElementById('projectListInBoq')
  projectListInBoq.innerHTML = html
}

async function viewMaterialInBoqForm() {
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
  var materialListInBoq = document.getElementById('materialListInBoq')
  materialListInBoq.innerHTML = html
}

async function sendUpdateBoqForm(event) {
  event.preventDefault() // stop the form from submitting
  var search_param = {
    'reference': 'ENTRY',
    'project_name': document.getElementById("projectListInBoq").value
  }
  let material_list = await material_server.getMaterialList(search_param);
  console.log(JSON.stringify(material_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<material_list.length;idx++){
    var material = material_list[idx]
    html += `<option>${material['material_name']}</option>`
  }
  var materialListInBoq = document.getElementById('materialListInBoq')
  materialListInBoq.innerHTML = html
}

async function sendAddBoqForm(event) {
    event.preventDefault() // stop the form from submitting

    var boq_data = {
      'description': document.getElementById("description").value,
      'project_name': document.getElementById("projectListInBoq").value,
      'material_name': document.getElementById("materialListInBoq").value,
      'unit': document.getElementById("unit").value,
      'unit_price': document.getElementById("unit_price").value,
      'quantity': document.getElementById("quantity").value,
      'total_price': document.getElementById("total_price").value,
      'quoted_price': document.getElementById("quoted_price").value,
      'profit': document.getElementById("profit").value,
      'issue_date': document.getElementById("issue_date").value,
      'issue_quantity': document.getElementById("issue_quantity").value,
      'issue_voucher': document.getElementById("issue_voucher").value,
      'stock_in_hand': document.getElementById("stock_in_hand").value,
    }
    
    let data = await boq_server.addBoqToServer(boq_data);
    var message = 'Boq Successfull'
    if(data.status != 200 && data.status != 201){
      message = 'Boq Failed'
    }
    ipc.send('after-boq', message)
}

document.getElementById("issue_date").value = jshelper_services.get_current_date();

viewProjectInBoqForm()
viewMaterialInBoqForm()