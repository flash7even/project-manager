'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function updateMaterialToServer(material_data, material_id) {
    var put_url = host_name + '/api/material/' + material_id
    let res = await axios.put(put_url, material_data);
    return res
}

async function sendUpdateMaterialForm(event) {
  event.preventDefault() // stop the form from submitting
  let material_id = document.getElementById("material_id").value

  var material_data = {
    'material_id': material_id,
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
  
  let data = await updateMaterialToServer(material_data, material_id);
  var message = 'Material Updated Successfully'
  if(data.status != 200 && data.status != 201){
    message = 'Material Update Failed'
  }
  ipc.send('after-material-update', message)

  var window = remote.getCurrentWindow();
  window.close();
}

ipc.on('update-material', function (event, message) {
  console.log('update-material: (update_material.js) ' + message)
  var material_id = document.getElementById('material_id')
  material_id.value = message
})
