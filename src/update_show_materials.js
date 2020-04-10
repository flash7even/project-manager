'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function deleteMaterialToServer(material_id) {
    var put_url = host_name + '/api/material/' + material_id
    let res = await axios.delete(put_url);
    return res
}

async function updateMaterialEvent(material_id) {
  ipc.send('call-material-update', material_id)
  var window = remote.getCurrentWindow();
  window.close();
}

async function deleteMaterialEvent(material_id) {
  var response = await deleteMaterialToServer(material_id)
  alert(JSON.stringify(response.data))
  var window = remote.getCurrentWindow();
  window.reload();
}

async function getMaterialList() {
  var page = 0
  var material_list = []
  while(1){
    var post_url = host_name + '/api/material/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, {});
    var cur_list = res.data
    if(cur_list.length == 0) break;
    material_list = material_list.concat(cur_list)
    page++
  }
  return material_list
}

async function showAllMaterials() {
  let material_list = await getMaterialList();
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
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Supplier Name</th>
                  <th>Voucher</th>
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
    cur_material += `<td>${material['quantity']}</td>`
    cur_material += `<td>${material['total_price']}</td>`
    cur_material += `<td>${material['supplier_name']}</td>`
    cur_material += `<td>${material['voucher']}</td>`
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