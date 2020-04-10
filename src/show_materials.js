'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'
let data_table_height = '200px'

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

async function findMaterialDataDT(){
  let material_list = await getMaterialList();
  console.log(JSON.stringify(material_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<material_list.length;idx++){
    var material = material_list[idx]
    var tran_data = [
      material['material_id'],
      material['material_name'],
      material['project_name'],
      material['unit'],
      material['unit_price'],
      material['quantity'],
      material['total_price'],
      material['supplier_name'],
      material['voucher'],
      material['stock'],
      material['remarks'],
    ]
    dt_list.push(tran_data)
  }
  return dt_list
}

  async function showAllMaterialsDT(){
    let dt_list = await findMaterialDataDT();
    $("#materialListTable").dataTable({
      "aaData": dt_list,
      paging: true,
      destroy: true,
      scrollY: data_table_height,
      scrollCollapse: true,
      dom: 'Bfrtip',
      buttons: [
        // Options: 'copy', 'csv', 'excel', 'pdf', 'print',
        {
            extend: 'excel',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'csv',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'copy',
            exportOptions: {
                columns: ':visible'
            }
        },
        'colvis'
        ],
        columnDefs: [ {
            targets: -1,
            visible: false
        } ]
    });
}

showAllMaterialsDT()
