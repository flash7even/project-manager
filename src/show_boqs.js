'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const boq_server = require('../services/boq_services')

let data_table_height = '200px'

async function findBoqDataDT(){
  let boq_list = await boq_server.getBoqList();
  console.log(JSON.stringify(boq_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<boq_list.length;idx++){
    var boq = boq_list[idx]
    var tran_data = [
      boq['boq_id'],
      boq['description'],
      boq['project_name'],
      boq['unit'],
      boq['unit_price'],
      boq['quantity'],
      boq['total_price'],
      boq['quoted_price'],
      boq['profit'],
      boq['issue_date'],
      boq['issue_quantity'],
      boq['issue_voucher'],
      boq['stock_in_hand'],
    ]
    dt_list.push(tran_data)
  }
  return dt_list
}

  async function showAllBoqsDT(){
    let dt_list = await findBoqDataDT();
    $("#boqListTable").dataTable({
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

showAllBoqsDT()
