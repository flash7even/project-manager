'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const material_server = require('../services/material_services')
const dimensions = require('../services/dimensions')

async function findMaterialDataDT(){
  var search_param = {
    'reference': 'ENTRY'
  }
  let material_list = await material_server.getMaterialList(search_param);
  console.log(JSON.stringify(material_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<material_list.length;idx++){
    var material = material_list[idx]
    var tran_data = [
      material['material_id'],
      material['material_name'],
      material['project_name'],
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
      scrollY: dimensions.data_table_height,
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
