'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function getProjectList() {
  var page = 0
  var project_list = []
  while(1){
    var post_url = host_name + '/api/project/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, {});
    var cur_list = res.data
    if(cur_list.length == 0) break;
    project_list = project_list.concat(cur_list)
    page++
  }
  return project_list
}

async function viewProjectInMaterialForm() {
  let project_list = await getProjectList();
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

async function addMaterialToServer(material_data) {
    var post_url = host_name + '/api/material/'
    let res = await axios.post(post_url, material_data);
    return res
}

async function sendAddMaterialForm(event) {
    event.preventDefault() // stop the form from submitting

    var material_data = {
      'material_id': document.getElementById("material_id").value,
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
    
    let data = await addMaterialToServer(material_data);
    var message = 'Material Successfull'
    if(data.status != 200 && data.status != 201){
      message = 'Material Failed'
    }
    ipc.send('after-material', message)

    var window = remote.getCurrentWindow();
    window.close();
}

viewProjectInMaterialForm()