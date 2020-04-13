'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const material_server = require('../services/material_services')

async function updateMaterialEvent(material_id) {
  ipc.send('call-material-update', material_id)
}

async function deleteMaterialEvent(material_id) {
  var response = await material_server.deleteMaterialToServer(material_id)
  var window = remote.getCurrentWindow();
  window.reload();
}

async function showAllMaterials() {
  let material_list = await material_server.getMaterialList();
  console.log(JSON.stringify(material_list))

  var html = ''

  var thead = `<thead>
                <tr>
                  <th># </th>
                  <th class="site_name">Material ID</th>
                  <th>Material Name</th>
                  <th>Project Name</th>
                  <th>Unit</th>
                  <th>Unit Price</th>
                  <th>Stock</th>
                  <th>Remarks</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>`
  
  html += thead

  html += `<tbody>`

  var idx = 0

  for(idx = 0;idx<material_list.length;idx++){
    var material = material_list[idx]
    var cur_material = '<tr>'
    cur_material += `<th scope="row">${idx.toString()}</th>`
    cur_material += `<td>${material['material_id']}</td>`
    cur_material += `<td>${material['material_name']}</td>`
    cur_material += `<td>${material['project_name']}</td>`
    cur_material += `<td>${material['unit']}</td>`
    cur_material += `<td>${material['unit_price']}</td>`
    cur_material += `<td>${material['stock']}</td>`
    cur_material += `<td>${material['remarks']}</td>`
    var material_id = material['id']
    var btn1 = '<input type="button" onClick="updateMaterialEvent(\'' + material_id + '\')" value="Update"/>'
    var btn3 = '<input type="button" onClick="deleteMaterialEvent(\'' + material_id + '\')" value="Delete"/>'
    cur_material += `<td>${btn1}</td>`
    cur_material += `<td>${btn3}</td>`
    cur_material += '</tr>'
    html += cur_material
  }
  html += `</tbody>`
  var materialListTable = document.getElementById('materialListTable')
  materialListTable.innerHTML = html
}

showAllMaterials()

ipc.on('update-material', function (event, message) {
  console.log('update-material: (update_material.js) ' + message)
  var material_id = document.getElementById('material_id')
  material_id.value = message
})